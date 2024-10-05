"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "InfoCardBox",
  props: {
    /* 输入文字 */
    btnText: {
      type: String,
      default: "查看详情"
    },
    viewText: {
      type: String,
      default: "科室"
    },
    viewDate: {
      type: String,
      default: ""
    },
    view1Text: {
      type: String,
      default: "编号"
    },
    view1Date: {
      type: String,
      default: ""
    },
    view2Text: {
      type: String,
      default: "登记时间"
    },
    view2Date: {
      type: String,
      default: "暂无数据"
    },
    showDetail: Function,
    showData: {
      type: Boolean,
      default: true
    },
    showBtn: {
      type: Boolean,
      default: true
    },
    usedNum: {
      type: Number,
      default: 0
    },
    type: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(props.viewText),
        b: common_vendor.t(props.viewDate),
        c: common_vendor.t(props.btnText),
        d: common_vendor.o((...args) => props.showDetail && props.showDetail(...args)),
        e: props.showBtn,
        f: common_vendor.t(props.view1Text),
        g: common_vendor.t(props.view1Date),
        h: props.showData
      }, props.showData ? {
        i: common_vendor.t(props.view2Text),
        j: common_vendor.t(props.view2Date)
      } : {
        k: common_vendor.t(props.usedNum),
        l: common_vendor.t(props.type)
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "G:/firstAidProject/app/FIRST-AID/first-aid/components/InfoCardBox/InfoCardBox.vue"]]);
wx.createComponent(Component);
