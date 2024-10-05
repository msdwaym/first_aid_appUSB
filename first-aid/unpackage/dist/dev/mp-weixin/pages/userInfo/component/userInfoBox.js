"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "userInfoBox",
  props: {
    titleText: {
      type: String,
      default: ""
    },
    valueText: {
      type: String,
      default: ""
    },
    isExpand: {
      type: Boolean,
      default: false
    }
  },
  emits: ["torevisePart"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const isShow = props.isExpand;
    console.log(isShow);
    const emit = __emit;
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(props.titleText),
        b: common_vendor.unref(isShow)
      }, common_vendor.unref(isShow) ? {
        c: common_vendor.o(($event) => emit("torevisePart")),
        d: common_vendor.p({
          type: "right",
          size: "21",
          color: "rgba(137, 207, 251, 1)"
        })
      } : {}, {
        e: !props.isExpand
      }, !props.isExpand ? {} : {}, {
        f: common_vendor.t(props.valueText)
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-17e98392"], ["__file", "G:/firstAidProject/app/FIRST-AID/first-aid/pages/userInfo/component/userInfoBox.vue"]]);
wx.createComponent(Component);
