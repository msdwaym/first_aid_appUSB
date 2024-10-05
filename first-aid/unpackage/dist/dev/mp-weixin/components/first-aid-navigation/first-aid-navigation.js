"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_up_icon2 = common_vendor.resolveComponent("up-icon");
  (_easycom_uni_icons2 + _easycom_up_icon2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_up_icon = () => "../../node-modules/uview-plus/components/u-icon/u-icon.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_up_icon)();
}
const _sfc_main = {
  __name: "first-aid-navigation",
  props: {
    txColor: {
      /* 文字颜色 */
      type: String,
      default: "white"
    },
    icColor: {
      /* 图标颜色 */
      type: String,
      default: "white"
    },
    bgColor: {
      /* 背景颜色 */
      type: String,
      default: "rgba(0, 170, 255, 1.0)"
    },
    navText: {
      /* 输入文字 */
      type: String,
      default: ""
    },
    isReturn: {
      /* 是否需要返回图标 */
      type: Boolean,
      default: true
    },
    submitText: {
      /* 完成按钮文字 */
      type: String,
      default: "完成"
    },
    isShowSubmit: {
      /* 是否显示完成按钮 */
      type: Boolean,
      default: false
    },
    isShowScan: {
      type: Boolean,
      default: false
    }
  },
  emits: ["return", "submit", "scan"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(props.navText),
        b: props.txColor,
        c: common_vendor.o(($event) => emit("return")),
        d: common_vendor.p({
          bold: true,
          color: "white",
          size: "23",
          type: "left"
        }),
        e: props.isReturn,
        f: common_vendor.t(props.submitText),
        g: props.isShowSubmit,
        h: common_vendor.o(($event) => emit("submit")),
        i: common_vendor.p({
          color: "white",
          name: "scan",
          size: "28"
        }),
        j: props.isShowScan,
        k: common_vendor.o(($event) => emit("scan")),
        l: props.bgColor
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d6562c4e"], ["__file", "G:/firstAidProject/app/FIRST-AID/first-aid/components/first-aid-navigation/first-aid-navigation.vue"]]);
wx.createComponent(Component);
