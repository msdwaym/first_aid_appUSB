"use strict";
const common_vendor = require("../../common/vendor.js");
const util_machine = require("../../util/machine.js");
const api_materialUseRegistration = require("../../api/materialUseRegistration.js");
const util_encode = require("../../util/encode.js");
if (!Array) {
  const _easycom_up_button2 = common_vendor.resolveComponent("up-button");
  _easycom_up_button2();
}
const _easycom_up_button = () => "../../node-modules/uview-plus/components/u-button/u-button.js";
if (!Math) {
  (UniFormsItem + UniForms + _easycom_up_button)();
}
const UniForms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
const UniFormsItem = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const form = common_vendor.ref(null);
    const formData = common_vendor.ref({
      name: "",
      code: "",
      specification: "",
      num: "1",
      expirationDate: ""
    });
    common_vendor.ref({
      num: {
        rules: [{
          required: true,
          errorMessage: "请选择消耗数量",
          trigger: ["blur", "change"]
        }]
      }
    });
    const medicalTrolleyCode = common_vendor.ref(null);
    const id = common_vendor.ref(null);
    common_vendor.ref([]);
    common_vendor.ref(false);
    const checkingTimer = common_vendor.ref(0);
    const onSave = () => {
      common_vendor.index.showLoading({
        title: "保存中...",
        mask: true
      });
      form.value.validate().then((value) => {
        api_materialUseRegistration.addConsume({
          code: formData.value.code,
          type: 0,
          num: formData.value.num
        }).then((res) => {
          if (res.data.code === 200) {
            common_vendor.index.showToast({
              title: "保存成功",
              icon: "success"
            });
            common_vendor.index.navigateTo({
              url: `/pages/MaterialModule/MaterialModule?code=${medicalTrolleyCode.value}&id=${id.value}`
            });
            common_vendor.index.hideLoading();
          } else {
            endLoad(res.data.message);
          }
        });
      }).catch((error) => {
        endLoad("保存失败");
      });
    };
    const endLoad = (words) => {
      common_vendor.index.showToast({
        title: words,
        icon: "error"
      });
      common_vendor.index.hideLoading();
    };
    const onScan = () => {
      util_machine.initMachine();
      showLoading("正在扫描中...");
      const res = util_machine.readMachine(0, null, 2, 6, 1);
      if (res.code === "200" && !(res.data === "CMD_NO_TAG_ERROR")) {
        const data = res.data;
        api_materialUseRegistration.getMedicalByCode({
          code: util_encode.restoreString(data)
        }).then((res2) => {
          if (res2.data.code === 200 && res2.data.data) {
            formData.value.code = res2.data.data.code;
            formData.value.specification = res2.data.data.specification;
            formData.value.name = res2.data.data.name;
            formData.value.expirationDate = res2.data.data.expirationDate;
          } else {
            errorLoad("暂无标签数据");
            util_machine.stopMachine();
            util_machine.endMachine();
          }
          common_vendor.index.hideLoading();
          util_machine.stopMachine();
          util_machine.endMachine();
        });
      } else {
        errorLoad("扫描失败，请重新尝试");
        util_machine.stopMachine();
        util_machine.endMachine();
        common_vendor.index.hideLoading();
      }
    };
    const initData = () => {
      onScan();
    };
    const showLoading = (words) => {
      common_vendor.index.showLoading({
        title: words,
        mask: true
      });
    };
    const errorLoad = (words) => {
      common_vendor.index.showToast({
        title: words,
        icon: "error"
      });
      common_vendor.index.hideLoading();
    };
    common_vendor.onMounted(() => {
      initData();
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
      return {
        a: common_vendor.t(medicalTrolleyCode.value),
        b: formData.value.name,
        c: common_vendor.o(($event) => formData.value.name = $event.detail.value),
        d: common_vendor.p({
          label: "物资",
          name: "name"
        }),
        e: formData.value.code,
        f: common_vendor.o(($event) => formData.value.code = $event.detail.value),
        g: common_vendor.p({
          label: "物资编码",
          name: "code"
        }),
        h: formData.value.specification,
        i: common_vendor.o(($event) => formData.value.specification = $event.detail.value),
        j: common_vendor.p({
          label: "规格",
          name: "specification"
        }),
        k: formData.value.num,
        l: common_vendor.o(($event) => formData.value.num = $event.detail.value),
        m: common_vendor.p({
          label: "消耗数量",
          name: "num"
        }),
        n: formData.value.expirationDate,
        o: common_vendor.o(($event) => formData.value.expirationDate = $event.detail.value),
        p: common_vendor.p({
          label: "有效期",
          name: "date"
        }),
        q: common_vendor.sr(form, "945a1ab5-0", {
          "k": "form"
        }),
        r: common_vendor.p({
          modelValue: formData.value,
          ["label-position"]: "top"
        }),
        s: common_vendor.o(onScan),
        t: common_vendor.p({
          text: "重新扫描",
          type: "success"
        }),
        v: common_vendor.o(onSave),
        w: common_vendor.p({
          text: "保存",
          type: "primary"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-945a1ab5"], ["__file", "G:/firstAidProject/app/FIRST-AID/first-aid/pages/materialUseRegistration/index.vue"]]);
wx.createPage(MiniProgramPage);
