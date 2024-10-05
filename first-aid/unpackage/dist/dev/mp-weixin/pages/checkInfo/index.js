"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const api_checkInfo = require("../../api/checkInfo.js");
const util_machine = require("../../util/machine.js");
const api_userInfo = require("../../api/userInfo.js");
const util_encode = require("../../util/encode.js");
if (!Array) {
  const _easycom_up_button2 = common_vendor.resolveComponent("up-button");
  const _easycom_uni_data_select2 = common_vendor.resolveComponent("uni-data-select");
  const _easycom_up_modal2 = common_vendor.resolveComponent("up-modal");
  const _easycom_up_icon2 = common_vendor.resolveComponent("up-icon");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  const _easycom_u_form_item2 = common_vendor.resolveComponent("u-form-item");
  const _easycom_u_form2 = common_vendor.resolveComponent("u-form");
  const _easycom_up_overlay2 = common_vendor.resolveComponent("up-overlay");
  const _easycom_up_radio2 = common_vendor.resolveComponent("up-radio");
  const _easycom_up_radio_group2 = common_vendor.resolveComponent("up-radio-group");
  (_easycom_up_button2 + _easycom_uni_data_select2 + _easycom_up_modal2 + _easycom_up_icon2 + _easycom_u_button2 + _easycom_u_form_item2 + _easycom_u_form2 + _easycom_up_overlay2 + _easycom_up_radio2 + _easycom_up_radio_group2)();
}
const _easycom_up_button = () => "../../node-modules/uview-plus/components/u-button/u-button.js";
const _easycom_uni_data_select = () => "../../uni_modules/uni-data-select/components/uni-data-select/uni-data-select.js";
const _easycom_up_modal = () => "../../node-modules/uview-plus/components/u-modal/u-modal.js";
const _easycom_up_icon = () => "../../node-modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_u_button = () => "../../node-modules/uview-plus/components/u-button/u-button.js";
const _easycom_u_form_item = () => "../../node-modules/uview-plus/components/u-form-item/u-form-item.js";
const _easycom_u_form = () => "../../node-modules/uview-plus/components/u-form/u-form.js";
const _easycom_up_overlay = () => "../../node-modules/uview-plus/components/u-overlay/u-overlay.js";
const _easycom_up_radio = () => "../../node-modules/uview-plus/components/u-radio/u-radio.js";
const _easycom_up_radio_group = () => "../../node-modules/uview-plus/components/u-radio-group/u-radio-group.js";
if (!Math) {
  (_easycom_up_button + _easycom_uni_data_select + _easycom_up_modal + _easycom_up_icon + _easycom_u_button + _easycom_u_form_item + _easycom_u_form + _easycom_up_overlay + _easycom_up_radio + _easycom_up_radio_group)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const medicalTrolleyCode = common_vendor.ref(null);
    const id = common_vendor.ref(null);
    const userInfo = common_vendor.ref(null);
    const columns = common_vendor.ref([]);
    const selection = common_vendor.ref(null);
    const tierInfoList = common_vendor.ref([]);
    const scanningState = common_vendor.ref(false);
    const overCheckingState = common_vendor.ref(false);
    const confirmShow = common_vendor.ref(false);
    const detailInfo = common_vendor.ref({});
    const showInfo = common_vendor.ref(false);
    common_vendor.ref(null);
    const isLongPress = common_vendor.ref(false);
    const showUnchecked = common_vendor.ref(false);
    const uncheckedType = common_vendor.ref("1");
    const editingUncheckedData = common_vendor.ref(null);
    const uncheckedTypes = common_vendor.ref([
      {
        name: "1",
        label: "过期注销",
        disabled: false
      },
      {
        name: "2",
        label: "异常缺失注销",
        disabled: false
      },
      {
        name: "0",
        label: "取消",
        disabled: false
      }
    ]);
    common_vendor.index.createSelectorQuery().in(this);
    const filetArr = common_vendor.ref([]);
    const selectIndex = common_vendor.ref(0);
    const intoIndex = common_vendor.ref("");
    const record = common_vendor.ref(null);
    const checkingTimer = common_vendor.ref(0);
    const checkedArr = common_vendor.ref([]);
    const uncheckedArr = common_vendor.ref([]);
    const getCheckedState = (detail) => {
      if (detail.checkedState.toString() === "0") {
        return { unCheckedItem: true };
      } else if (detail.checkedState.toString() === "1" && !getPassedState(detail)) {
        return { checkedItem: true };
      } else if (detail.checkedState.toString() === "1") {
        return { nearlyPassItem: true };
      } else if (detail.checkedState.toString() === "2") {
        return { passedItem: true };
      } else if (detail.checkedState.toString() === "3") {
        return { lackedItem: true };
      }
    };
    const getPassedState = (detail) => {
      const expirationDate = Date.parse(new Date(detail.expirationDate).toString());
      const currentDate = Date.parse((/* @__PURE__ */ new Date()).toString());
      return expirationDate - currentDate > 864e5;
    };
    const startScan = () => {
      tierInfoList.value = tierInfoList.value.map((item) => {
        item.show = true;
        return item;
      });
      util_machine.initMachine();
      util_machine.startMachine();
      checkingTimer.value = setInterval(() => {
        const scannerData = util_machine.getTagsMachine().data;
        if (scannerData && scannerData.length > 0) {
          for (const item of scannerData) {
            if (!checkedArr.value.includes(item)) {
              checkedArr.value = [...checkedArr.value, item];
              checkedArr.value = [...new Set(checkedArr.value)];
              getUncheckedInfoList2nd(item);
            }
          }
        }
      }, 250);
      scanningState.value = !scanningState.value;
    };
    const finishScan = () => {
      clearInterval(checkingTimer.value);
      util_machine.stopMachine();
      util_machine.endMachine();
      scanningState.value = !scanningState.value;
    };
    const showAll = () => {
      const isShow = getShowNum();
      tierInfoList.value = tierInfoList.value.map((tier) => {
        tier.show = !isShow;
        return tier;
      });
    };
    const getShowNum = () => {
      return tierInfoList.value.every((item) => item.show);
    };
    const getUncheckedInfoList2nd = (value) => {
      tierInfoList.value = tierInfoList.value.map((tier) => {
        tier.medicalConfigs = tier.medicalConfigs.map((medical, index) => {
          medical.medicalDetails = medical.medicalDetails.map((detail) => {
            const state = detail.checkedState === 1 ? 1 : detail.code === util_encode.restoreString(value) ? 1 : 0;
            return { ...detail, checkedState: state, canChangeState: state !== 1 };
          });
          return medical;
        });
        return tier;
      });
    };
    const showItemInfo = (medical, detail) => {
      if (!isLongPress.value && overCheckingState.value) {
        showInfo.value = true;
        api_checkInfo.getMedicalByCode({ code: detail.code }).then((res) => {
          if (res.data.code === 200) {
            detailInfo.value = {
              medicalName: res.data.data.name,
              specification: res.data.data.specification,
              unitNum: medical.unitNum,
              available: res.data.data.available,
              code: detail.code,
              count: detail.count,
              expirationDate: res.data.data.expirationDate,
              total: detail.total,
              used: detail.used
            };
          }
        });
      }
    };
    const confirmEndScan = () => {
      showLoading("保存中...");
      api_checkInfo.addInventoryRecord({ medicalTrolleyId: id.value }).then((res) => {
        if (res.data.code === 200) {
          record.value = res.data.data;
          common_vendor.index.hideLoading();
          confirmShow.value = false;
          overCheckingState.value = true;
          scanningState.value = !scanningState.value;
        } else {
          errorLoad("保存失败");
        }
      });
    };
    const getPre = () => {
      if (filetArr.value.length === 0) {
        return;
      }
      common_vendor.nextTick$1(() => {
        if (selectIndex.value > filetArr.value.length - 1 || selectIndex.value < 0) {
          selectIndex.value = 0;
        }
        intoIndex.value = "item" + filetArr.value[selectIndex.value].id.substr(-6, 6);
        selectIndex.value = selectIndex.value - 1;
      });
    };
    const getNext = () => {
      if (filetArr.value.length === 0) {
        return;
      }
      common_vendor.nextTick$1(() => {
        if (selectIndex.value > filetArr.value.length - 1) {
          selectIndex.value = 0;
        }
        intoIndex.value = "item" + filetArr.value[selectIndex.value].id.substr(-6, 6);
        selectIndex.value = selectIndex.value + 1;
      });
    };
    const getDetailItemInfo = (tierName, medicalName, ordinal) => {
      const target = columns.value.find((item) => item.value === medicalName);
      return "item" + target.items.find((item) => item.tierName === tierName).id.substr(-6, 6);
    };
    const selectionChange = (value) => {
      selection.value = value;
      const target = columns.value.find((item) => {
        return item.value === value;
      });
      if (target) {
        filetArr.value = target.items;
      } else {
        filetArr.value = [];
      }
      selectIndex.value = 0;
    };
    const changeUnchecked = () => {
      editingUncheckedData.value.checkedState = (parseInt(uncheckedType.value) + 1).toString();
      api_checkInfo.addConsume({
        code: editingUncheckedData.value.code,
        type: uncheckedType.value,
        num: "1"
      }).then((res) => {
        if (res.data.code === 200) {
          showUnchecked.value = false;
        } else {
          errorLoad("保存失败");
        }
      });
    };
    const initData = () => {
      showLoading("正在加载中...");
      api_checkInfo.getCheckInfoList({ code: medicalTrolleyCode.value }).then((res) => {
        if (res.data.code === 200) {
          tierInfoList.value = [...res.data.data];
          tierInfoList.value = tierInfoList.value.map((tier) => {
            tier.medicalConfigs = tier.medicalConfigs.map((medical, index) => {
              medical.medicalDetails = medical.medicalDetails.map((detail) => {
                return { checkedState: 0, canChangeState: true, ...detail };
              }).filter((item) => item.used === 0 && item.available === 0);
              if (!columns.value.some((item) => item.value === medical.medicalName)) {
                columns.value = [{
                  value: medical.medicalName,
                  text: medical.medicalName,
                  items: [{
                    tierName: tier.tierName,
                    index: 0,
                    id: medical.medicalConfigId
                  }]
                }, ...columns.value];
              } else {
                const target = columns.value.find((item) => item.value === medical.medicalName).items;
                target.push({
                  tierName: tier.tierName,
                  index: target.length,
                  id: medical.medicalConfigId
                });
              }
              medical.medicalDetails.sort((detail1, detail2) => detail1.code.substr(-6, 6) - detail2.code.substr(-6, 6));
              return medical;
            });
            return { ...tier, show: false };
          });
          tierInfoList.value.sort((item1, item2) => item1.ordinal - item2.ordinal);
          common_vendor.index.hideLoading();
        }
      });
    };
    const changeState = (info) => {
      if (overCheckingState.value && info.canChangeState) {
        isLongPress.value = true;
        showUnchecked.value = true;
        editingUncheckedData.value = info;
      }
    };
    const itemTouched = () => {
      setTimeout(() => {
        isLongPress.value = false;
      }, 250);
    };
    const overCheck = () => {
      const notPass = tierInfoList.value.some((tier) => {
        return tier.medicalConfigs.some((medical, index) => {
          return medical.medicalDetails.some((detail) => {
            return detail.checkedState === 0;
          });
        });
      });
      if (notPass) {
        common_vendor.index.showToast({
          title: "请完成遗漏物资的处理",
          icon: "error"
        });
      } else {
        api_checkInfo.addWarning({
          inventoryId: record.value,
          medicalTrolleyId: id.value,
          warnings: [...uncheckedArr.value]
        }).then((res) => {
          if (res.data.code === 200) {
            overCheckingState.value = true;
            common_vendor.index.hideLoading();
            common_vendor.index.navigateBack({
              delta: 1
              //返回层数，2则上上页
            });
          } else {
            errorLoad("保存失败");
          }
        });
      }
    };
    const finishCheck = () => {
      if (scanningState.value) {
        common_vendor.index.showToast({
          title: "请先完成扫描",
          icon: "error"
        });
      } else {
        confirmShow.value = true;
      }
    };
    const getUserData = () => {
      api_userInfo.getNurseInfo().then((res) => {
        if (res.data.code === 200) {
          userInfo.value = res.data.data;
        } else {
          common_vendor.index.showToast({
            title: "请先完成盘点",
            icon: "error"
          });
        }
      });
    };
    const errorLoad = (words) => {
      common_vendor.index.showToast({
        title: words,
        icon: "error"
      });
      common_vendor.index.hideLoading();
    };
    const showLoading = (words) => {
      common_vendor.index.showLoading({
        title: words,
        mask: true
      });
    };
    common_vendor.onMounted(() => {
      initData();
      getUserData();
    });
    common_vendor.onLoad((options) => {
      medicalTrolleyCode.value = options.code;
      id.value = options.id;
    });
    common_vendor.onUnload((options) => {
      clearInterval(checkingTimer.value);
      util_machine.stopMachine();
      util_machine.endMachine();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(medicalTrolleyCode.value),
        b: common_vendor.o(showAll),
        c: common_vendor.p({
          text: getShowNum() ? "全部收起" : "全部展开"
        }),
        d: common_vendor.o(selectionChange),
        e: common_vendor.o(($event) => selection.value = $event),
        f: common_vendor.p({
          localdata: columns.value,
          placeholder: "请选择药品",
          type: "text",
          modelValue: selection.value
        }),
        g: common_vendor.o(getPre),
        h: common_vendor.p({
          text: "上一个"
        }),
        i: common_vendor.o(getNext),
        j: common_vendor.p({
          text: "下一个"
        }),
        k: common_vendor.f(tierInfoList.value, (tier, k0, i0) => {
          return {
            a: common_vendor.t(tier.tierName),
            b: common_vendor.o(($event) => tier.show = !tier.show),
            c: "82513661-4-" + i0,
            d: common_vendor.f(tier.medicalConfigs, (medical, index, i1) => {
              return {
                a: common_vendor.t(medical.medicalName),
                b: getDetailItemInfo(tier.tierName, medical.medicalName, tier.ordinal),
                c: selection.value === medical.medicalName ? 1 : "",
                d: common_vendor.f(medical.medicalDetails, (detail, k2, i2) => {
                  return common_vendor.e({
                    a: common_vendor.t(detail.code.substr(-6, 6)),
                    b: detail.checkedState.toString() === "1" && !getPassedState(detail)
                  }, detail.checkedState.toString() === "1" && !getPassedState(detail) ? {
                    c: common_assets._imports_0$2
                  } : {}, {
                    d: detail.checkedState.toString() === "3"
                  }, detail.checkedState.toString() === "3" ? {
                    e: common_assets._imports_1
                  } : {}, {
                    f: common_vendor.o(($event) => showItemInfo(medical, detail)),
                    g: common_vendor.o(($event) => changeState(detail)),
                    h: common_vendor.n(getCheckedState(detail))
                  });
                })
              };
            }),
            e: tier.show
          };
        }),
        l: common_vendor.p({
          text: "展开"
        }),
        m: common_vendor.o(itemTouched),
        n: intoIndex.value,
        o: !overCheckingState.value
      }, !overCheckingState.value ? {
        p: common_vendor.o(() => {
          if (scanningState.value) {
            finishScan();
          } else {
            startScan();
          }
        }),
        q: common_vendor.p({
          text: scanningState.value ? "结束扫描" : "开始扫描",
          type: scanningState.value ? "error" : "success"
        })
      } : {}, {
        r: common_vendor.o(() => {
          if (overCheckingState.value) {
            overCheck();
          } else {
            finishCheck();
          }
        }),
        s: common_vendor.p({
          text: overCheckingState.value ? "退出盘点" : "完成盘点",
          type: "primary"
        }),
        t: common_vendor.o(confirmEndScan),
        v: common_vendor.o(() => {
          confirmShow.value = false;
        }),
        w: common_vendor.p({
          show: confirmShow.value,
          title: "确认通知",
          content: "确认结束盘点扫描吗?",
          showCancelButton: true
        }),
        x: common_vendor.p({
          name: "close",
          color: "#ffffff"
        }),
        y: common_vendor.o(($event) => showInfo.value = false),
        z: common_vendor.t(detailInfo.value.medicalName),
        A: common_vendor.p({
          label: "名称:"
        }),
        B: common_vendor.t(detailInfo.value.code),
        C: common_vendor.p({
          label: "编码:"
        }),
        D: common_vendor.t(userInfo.value.department),
        E: common_vendor.p({
          label: "科室:"
        }),
        F: common_vendor.t(medicalTrolleyCode.value),
        G: common_vendor.p({
          label: "所属急救车:"
        }),
        H: common_vendor.t(detailInfo.value.specification),
        I: common_vendor.p({
          label: "规格:"
        }),
        J: common_vendor.t(detailInfo.value.expirationDate),
        K: common_vendor.p({
          label: "有效期:"
        }),
        L: common_vendor.p({
          labelWidth: "175upx"
        }),
        M: common_vendor.p({
          show: showInfo.value
        }),
        N: common_vendor.p({
          name: "close",
          color: "#ffffff"
        }),
        O: common_vendor.o(($event) => showUnchecked.value = false),
        P: common_vendor.f(uncheckedTypes.value, (item, index, i0) => {
          return {
            a: index,
            b: "82513661-22-" + i0 + ",82513661-21",
            c: common_vendor.p({
              customStyle: {
                marginBottom: "8px"
              },
              label: item.label,
              name: item.name
            })
          };
        }),
        Q: common_vendor.o(($event) => uncheckedType.value = $event),
        R: common_vendor.p({
          placement: "column",
          modelValue: uncheckedType.value
        }),
        S: common_vendor.o(changeUnchecked),
        T: common_vendor.p({
          text: "确认",
          type: "primary"
        }),
        U: common_vendor.o(($event) => showUnchecked.value = false),
        V: common_vendor.p({
          text: "取消",
          type: "primary"
        }),
        W: common_vendor.p({
          show: showUnchecked.value
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-82513661"], ["__file", "G:/firstAidProject/app/FIRST-AID/first-aid/pages/checkInfo/index.vue"]]);
wx.createPage(MiniProgramPage);
