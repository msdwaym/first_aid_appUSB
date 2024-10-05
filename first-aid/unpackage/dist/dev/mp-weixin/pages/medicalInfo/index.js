"use strict";
const common_vendor = require("../../common/vendor.js");
const api_checkInfo = require("../../api/checkInfo.js");
const api_userInfo = require("../../api/userInfo.js");
if (!Array) {
  const _easycom_up_button2 = common_vendor.resolveComponent("up-button");
  const _easycom_uni_data_select2 = common_vendor.resolveComponent("uni-data-select");
  const _easycom_up_modal2 = common_vendor.resolveComponent("up-modal");
  const _easycom_up_icon2 = common_vendor.resolveComponent("up-icon");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  const _easycom_u_form_item2 = common_vendor.resolveComponent("u-form-item");
  const _easycom_u_form2 = common_vendor.resolveComponent("u-form");
  const _easycom_up_overlay2 = common_vendor.resolveComponent("up-overlay");
  (_easycom_up_button2 + _easycom_uni_data_select2 + _easycom_up_modal2 + _easycom_up_icon2 + _easycom_u_button2 + _easycom_u_form_item2 + _easycom_u_form2 + _easycom_up_overlay2)();
}
const _easycom_up_button = () => "../../node-modules/uview-plus/components/u-button/u-button.js";
const _easycom_uni_data_select = () => "../../uni_modules/uni-data-select/components/uni-data-select/uni-data-select.js";
const _easycom_up_modal = () => "../../node-modules/uview-plus/components/u-modal/u-modal.js";
const _easycom_up_icon = () => "../../node-modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_u_button = () => "../../node-modules/uview-plus/components/u-button/u-button.js";
const _easycom_u_form_item = () => "../../node-modules/uview-plus/components/u-form-item/u-form-item.js";
const _easycom_u_form = () => "../../node-modules/uview-plus/components/u-form/u-form.js";
const _easycom_up_overlay = () => "../../node-modules/uview-plus/components/u-overlay/u-overlay.js";
if (!Math) {
  (_easycom_up_button + _easycom_uni_data_select + _easycom_up_modal + _easycom_up_icon + _easycom_u_button + _easycom_u_form_item + _easycom_u_form + _easycom_up_overlay)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const userInfo = common_vendor.ref(null);
    const columns = common_vendor.ref([]);
    const showDetailInfo = common_vendor.ref(false);
    const showMedicalInfo = common_vendor.ref(false);
    const medicalInfo = common_vendor.ref(null);
    const endShow = common_vendor.ref(false);
    common_vendor.index.createSelectorQuery().in(this);
    const medicalTrolleyCode = common_vendor.ref(null);
    const id = common_vendor.ref(null);
    common_vendor.ref([]);
    const tierInfoList = common_vendor.ref([]);
    const detailInfo = common_vendor.ref(null);
    const filetArr = common_vendor.ref([]);
    const selectIndex = common_vendor.ref(0);
    const intoIndex = common_vendor.ref("");
    const selection = common_vendor.ref(null);
    const showItemInfo = (medical, detail) => {
      showDetailInfo.value = true;
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
    };
    const showMedical = (medical) => {
      showMedicalInfo.value = true;
      medicalInfo.value = medical;
    };
    const confirmEnd = () => {
      endShow.value = false;
      common_vendor.index.navigateTo({
        url: "/pages/MaterialModule/MaterialModule"
      });
    };
    const navToRecord = () => {
      common_vendor.index.navigateTo({
        url: `/pages/MaterialUsedRecord/MaterialUsedRecord?medicalTrolleyCode=${medicalTrolleyCode.value}`
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
    const initData = () => {
      showLoading("正在加载中...");
      api_checkInfo.getCheckInfoList({ code: medicalTrolleyCode.value }).then((res) => {
        if (res.data.code === 200) {
          tierInfoList.value = [...res.data.data];
          tierInfoList.value = tierInfoList.value.map((tier) => {
            tier.medicalConfigs = tier.medicalConfigs.map((medical, index) => {
              let passedItemNum = 0;
              medical.unitNum = medical.unitNum === null ? 0 : medical.unitNum;
              medical.medicalDetails = medical.medicalDetails.map((detail) => {
                const expirationDate = Date.parse(new Date(detail.expirationDate).toString());
                const currentDate = Date.parse((/* @__PURE__ */ new Date()).toString());
                const state = expirationDate < currentDate ? 0 : 1;
                passedItemNum = expirationDate < currentDate ? passedItemNum : passedItemNum + 1;
                return { checkedState: state, ...detail };
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
              return { ...medical, passedItemNum };
            });
            return { ...tier, show: false };
          });
          tierInfoList.value.sort((item1, item2) => item1.ordinal - item2.ordinal);
          common_vendor.index.hideLoading();
        }
      });
    };
    const getUserData = () => {
      api_userInfo.getNurseInfo().then((res) => {
        if (res.data.code === 200) {
          userInfo.value = res.data.data;
        }
      });
    };
    const showLoading = (words) => {
      common_vendor.index.showLoading({
        title: words,
        mask: true
      });
    };
    const getCheckedState = (detail) => {
      const expirationDate = Date.parse(new Date(detail.expirationDate).toString());
      const currentDate = Date.parse((/* @__PURE__ */ new Date()).toString());
      const notPassed = expirationDate - currentDate > 864e5;
      if (detail.checkedState.toString() === "0" && notPassed) {
        return { checkedItem: true };
      } else if (detail.checkedState.toString() === "0") {
        return { nearlyPassItem: true };
      } else if (detail.checkedState.toString() === "1") {
        return { passedItem: true };
      } else if (detail.checkedState.toString() === "2") {
        return { lackedItem: true };
      }
    };
    common_vendor.onMounted(() => {
      initData();
      getUserData();
    });
    common_vendor.onLoad((options) => {
      medicalTrolleyCode.value = options.code;
      id.value = options.id;
    });
    return (_ctx, _cache) => {
      return {
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
            c: "4c7070ab-4-" + i0,
            d: common_vendor.f(tier.medicalConfigs, (medical, index, i1) => {
              return common_vendor.e({
                a: common_vendor.t(medical.medicalName),
                b: getDetailItemInfo(tier.tierName, medical.medicalName, tier.ordinal),
                c: common_vendor.o(($event) => showMedical(medical)),
                d: selection.value === medical.medicalName ? 1 : "",
                e: common_vendor.f(medical.medicalDetails, (detail, k2, i2) => {
                  return {
                    a: common_vendor.t(detail.code.substr(-6, 6)),
                    b: common_vendor.o(($event) => showItemInfo(medical, detail)),
                    c: common_vendor.n(getCheckedState(detail))
                  };
                }),
                f: medical.unitNum
              }, medical.unitNum ? {
                g: common_vendor.f(medical.unitNum - (medical.medicalDetails ? medical.medicalDetails.length : 0), (item, k2, i2) => {
                  return {};
                }),
                h: common_vendor.t("---")
              } : {});
            }),
            e: tier.show
          };
        }),
        l: common_vendor.p({
          text: "展开"
        }),
        m: intoIndex.value,
        n: common_vendor.o(navToRecord),
        o: common_vendor.p({
          text: "信息记录",
          type: "primary"
        }),
        p: common_vendor.o(confirmEnd),
        q: common_vendor.o(() => {
          endShow.value = false;
        }),
        r: common_vendor.p({
          show: endShow.value,
          title: "确认完成盘点吗？",
          content: "确认完成盘点吗?",
          showCancelButton: true
        }),
        s: common_vendor.p({
          name: "close",
          color: "#ffffff"
        }),
        t: common_vendor.o(($event) => showDetailInfo.value = false),
        v: common_vendor.t(detailInfo.value.medicalName),
        w: common_vendor.p({
          label: "名称:"
        }),
        x: common_vendor.t(detailInfo.value.code),
        y: common_vendor.p({
          label: "编码:"
        }),
        z: common_vendor.t(userInfo.value.department),
        A: common_vendor.p({
          label: "科室:"
        }),
        B: common_vendor.t(medicalTrolleyCode.value),
        C: common_vendor.p({
          label: "所属急救车:"
        }),
        D: common_vendor.t(detailInfo.value.specification),
        E: common_vendor.p({
          label: "规格:"
        }),
        F: common_vendor.t(detailInfo.value.expirationDate),
        G: common_vendor.p({
          label: "有效期:"
        }),
        H: common_vendor.p({
          labelWidth: "175upx"
        }),
        I: common_vendor.p({
          show: showDetailInfo.value
        }),
        J: common_vendor.p({
          name: "close",
          color: "#ffffff"
        }),
        K: common_vendor.o(($event) => showMedicalInfo.value = false),
        L: common_vendor.t(medicalInfo.value.medicalName),
        M: common_vendor.p({
          label: "物资名称:"
        }),
        N: common_vendor.t(medicalInfo.value.unitNum),
        O: common_vendor.p({
          label: "应有数量:"
        }),
        P: common_vendor.t(medicalInfo.value.medicalDetails ? medicalInfo.value.medicalDetails.length : 0),
        Q: common_vendor.p({
          label: "已有数量:"
        }),
        R: common_vendor.t(medicalInfo.value.passedItemNum),
        S: common_vendor.p({
          label: "过期数量:"
        }),
        T: common_vendor.t(medicalInfo.value.unitNum - (medicalInfo.value.medicalDetails ? medicalInfo.value.medicalDetails.length : 0)),
        U: common_vendor.p({
          label: "需补充数量:"
        }),
        V: common_vendor.p({
          labelWidth: "175upx"
        }),
        W: common_vendor.p({
          show: showMedicalInfo.value
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4c7070ab"], ["__file", "G:/firstAidProject/app/FIRST-AID/first-aid/pages/medicalInfo/index.vue"]]);
wx.createPage(MiniProgramPage);
