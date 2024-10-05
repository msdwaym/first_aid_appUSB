"use strict";
const common_vendor = require("../../common/vendor.js");
const api_checkInfo = require("../../api/checkInfo.js");
const api_materialInfoRegistration = require("../../api/materialInfoRegistration.js");
const util_machine = require("../../util/machine.js");
const util_encode = require("../../util/encode.js");
if (!Array) {
  const _easycom_uni_data_select2 = common_vendor.resolveComponent("uni-data-select");
  const _easycom_uni_datetime_picker2 = common_vendor.resolveComponent("uni-datetime-picker");
  const _easycom_up_button2 = common_vendor.resolveComponent("up-button");
  (_easycom_uni_data_select2 + _easycom_uni_datetime_picker2 + _easycom_up_button2)();
}
const _easycom_uni_data_select = () => "../../uni_modules/uni-data-select/components/uni-data-select/uni-data-select.js";
const _easycom_uni_datetime_picker = () => "../../uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.js";
const _easycom_up_button = () => "../../node-modules/uview-plus/components/u-button/u-button.js";
if (!Math) {
  (_easycom_uni_data_select + UniFormsItem + _easycom_uni_datetime_picker + UniForms + _easycom_up_button)();
}
const UniForms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
const UniFormsItem = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const medicalTrolleyCode = common_vendor.ref(null);
    const id = common_vendor.ref(null);
    const tierList = common_vendor.ref([]);
    const typeList = common_vendor.ref([]);
    const form = common_vendor.ref(null);
    const showTime = common_vendor.ref(false);
    const formData = common_vendor.ref({
      tierId: "",
      medicalConfigId: "",
      specification: "",
      num: "1",
      expirationDate: "",
      total: 0,
      currency: 0
    });
    const rules = common_vendor.ref({
      tierId: {
        rules: [{
          required: true,
          errorMessage: "请选择层级",
          trigger: ["blur", "change"]
        }]
      },
      medicalConfigId: {
        rules: [{
          required: true,
          errorMessage: "请选择物资类型",
          trigger: ["blur", "change"]
        }]
      },
      specification: {
        rules: [{
          required: true,
          errorMessage: "请输入规格",
          trigger: ["blur", "change"]
        }]
      },
      num: {
        rules: [{
          required: true,
          errorMessage: "请输入消耗数量",
          trigger: ["blur", "change"]
        }]
      },
      expirationDate: {
        rules: [{
          required: true,
          errorMessage: "请选择有效期",
          trigger: ["blur", "change"]
        }]
      }
    });
    const typeChange = (value) => {
      const target = typeList.value.find(
        (item) => item.value === value
      );
      formData.value.specification = target.specification;
      formData.value.total = target.total;
      formData.value.currency = target.currency;
    };
    const tierChange = (value) => {
      if (value) {
        typeList.value = tierList.value.find(
          (item) => item.value === value
        ).typeList;
        formData.value.specification = "";
      } else {
        typeList.value = [];
        formData.value.specification = "";
      }
      formData.value.currency = 0;
      formData.value.total = 0;
    };
    const onSave = () => {
      if (formData.value.total - formData.value.currency <= 0) {
        common_vendor.index.showToast({
          title: "数量已达上限",
          icon: "error"
        });
        return;
      }
      form.value.validate().then((value) => {
        common_vendor.index.showLoading({
          title: "写入中...",
          mask: true
        });
        api_materialInfoRegistration.getMedicalEncode({ ...formData.value, medicalTrolleyId: id.value }).then((res) => {
          if (res.data.code === 200) {
            util_machine.initMachine();
            const result = util_machine.writeMachine(0, util_encode.padString(res.data.data), null, 2, 1);
            if (result.code === "200") {
              api_materialInfoRegistration.addMaterial({
                code: res.data.data,
                expirationDate: formData.value.expirationDate,
                medicalTrolleyId: id.value,
                medicalConfigId: formData.value.medicalConfigId,
                name: typeList.value.filter((item) => item.value === formData.value.medicalConfigId)[0].text,
                total: formData.value.num
              }).then((res2) => {
                if (res2.data.code === 200) {
                  common_vendor.index.showToast({
                    title: "写入成功",
                    icon: "success"
                  });
                  common_vendor.index.hideLoading();
                  util_machine.stopMachine();
                  util_machine.endMachine();
                  initData();
                  formData.value.currency = formData.value.currency + 1;
                } else {
                  endLoad();
                }
              });
            } else {
              endLoad();
            }
          } else {
            endLoad();
          }
        });
      }).catch((error) => {
        endLoad();
      });
    };
    const initData = () => {
      showLoading("正在加载中...");
      api_checkInfo.getCheckInfoList({ code: medicalTrolleyCode.value }).then((res) => {
        if (res.data.code === 200) {
          for (let item of res.data.data) {
            tierList.value.push({
              value: item.tierId,
              text: item.tierName,
              typeList: item.medicalConfigs.map((item2) => {
                return {
                  value: item2.medicalConfigId,
                  text: item2.medicalName,
                  specification: item2.specification,
                  total: item2.unitNum,
                  currency: item2.medicalDetails.filter((pro) => pro.used === 0 && pro.available === 0).length
                };
              })
            });
          }
          common_vendor.index.hideLoading();
        } else {
          errorLoad(res.data.data);
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
    const endLoad = () => {
      common_vendor.index.showToast({
        title: "写入失败",
        icon: "error"
      });
      common_vendor.index.hideLoading();
    };
    common_vendor.onLoad((options) => {
      medicalTrolleyCode.value = options.code;
      id.value = options.id;
      initData();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(medicalTrolleyCode.value),
        b: common_vendor.o(tierChange),
        c: common_vendor.o(($event) => formData.value.tierId = $event),
        d: common_vendor.p({
          localdata: tierList.value,
          placeholder: "请选择层级",
          type: "text",
          modelValue: formData.value.tierId
        }),
        e: common_vendor.p({
          label: "层级",
          name: "tier"
        }),
        f: common_vendor.o(typeChange),
        g: common_vendor.o(($event) => formData.value.medicalConfigId = $event),
        h: common_vendor.p({
          localdata: typeList.value,
          placeholder: "请选择物资类型",
          type: "text",
          modelValue: formData.value.medicalConfigId
        }),
        i: common_vendor.p({
          label: "物资类型",
          name: "medicalConfigId"
        }),
        j: formData.value.specification,
        k: common_vendor.o(($event) => formData.value.specification = $event.detail.value),
        l: common_vendor.p({
          label: "规格",
          name: "specification"
        }),
        m: formData.value.num,
        n: common_vendor.o(($event) => formData.value.num = $event.detail.value),
        o: common_vendor.p({
          label: "数量",
          name: "num"
        }),
        p: common_vendor.sr("datetimePickerRef", "3c959388-8,3c959388-7"),
        q: common_vendor.o(() => {
          showTime.value = true;
        }),
        r: common_vendor.o(($event) => formData.value.expirationDate = $event),
        s: common_vendor.p({
          show: showTime.value,
          type: "date",
          placeholder: "请选择有效期",
          modelValue: formData.value.expirationDate
        }),
        t: common_vendor.p({
          label: "有效期",
          name: "expirationDate"
        }),
        v: formData.value.total,
        w: common_vendor.o(($event) => formData.value.total = $event.detail.value),
        x: common_vendor.p({
          label: "应有数量"
        }),
        y: formData.value.currency,
        z: common_vendor.o(($event) => formData.value.currency = $event.detail.value),
        A: common_vendor.p({
          label: "已有数量"
        }),
        B: common_vendor.sr(form, "3c959388-0", {
          "k": "form"
        }),
        C: common_vendor.p({
          modelValue: formData.value,
          ["label-position"]: "top",
          rules: rules.value
        }),
        D: common_vendor.o(onSave),
        E: common_vendor.p({
          text: "写入标签",
          type: "primary"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-3c959388"], ["__file", "G:/firstAidProject/app/FIRST-AID/first-aid/pages/materialInfoRegistration/index.vue"]]);
wx.createPage(MiniProgramPage);
