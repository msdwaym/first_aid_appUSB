"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  props: {
    /**
     * @description 下一步的按钮文字
     */
    nextText: {
      type: String,
      default: "下一步"
    },
    /**
     * @description 最后一步的按钮文字
     */
    completeText: {
      type: String,
      default: "教学完成"
    },
    /**
     * @description { class: '独立的类名或id', text: '提示内容' }[]
     */
    steps: {
      type: Array,
      default: []
    },
    /**
     * @description 间距 px
     */
    spacing: {
      type: Number,
      default: 5
    },
    /**
     * @description 提示框宽度 rpx
     */
    width: {
      type: Number,
      default: 300
    }
  },
  data() {
    return {
      showMask: false,
      currentStep: -1,
      tooltipStyle: "",
      rects: []
    };
  },
  methods: {
    start() {
      Promise.all(this.steps.map((v) => this.getClassReact(v.class))).then((v) => {
        this.rects = v;
        this.nextStep();
      });
    },
    getClassReact(className) {
      const query = common_vendor.index.createSelectorQuery();
      return new Promise((resvole) => {
        query.select(className).boundingClientRect((rect) => {
          resvole(rect);
        }).exec();
      });
    },
    nextStep() {
      const query = common_vendor.index.createSelectorQuery().in(this);
      if (this.currentStep < this.steps.length - 1) {
        this.currentStep++;
        this.showMask = true;
        this.$nextTick(() => {
          query.select(".yi-step-guide").boundingClientRect((rect) => {
            this.calculateTooltipPosition(this.rects[this.currentStep], rect);
          }).exec();
        });
      } else {
        this.currentStep = -1;
        this.showMask = false;
      }
    },
    scrollTo(top) {
      const screenHeight = common_vendor.index.getSystemInfoSync().windowHeight;
      if (top > screenHeight / 2) {
        common_vendor.index.pageScrollTo({ scrollTop: top - 20, duration: 200 });
      }
      if (top < screenHeight / 2) {
        common_vendor.index.pageScrollTo({ scrollTop: 0, duration: 200 });
      }
    },
    calculateTooltipPosition(targetRect, tooltipRect) {
      const screenWidth = common_vendor.index.getSystemInfoSync().windowWidth;
      common_vendor.index.getSystemInfoSync().windowHeight;
      let left = targetRect.left + targetRect.width / 2 - tooltipRect.width / 2;
      let top = targetRect.top - tooltipRect.height - this.spacing;
      if (left < 0) {
        left = this.spacing;
      } else if (left + tooltipRect.width > screenWidth) {
        left = screenWidth - tooltipRect.width - this.spacing;
      }
      if (top < 0) {
        top = targetRect.bottom + this.spacing;
      }
      this.scrollTo(top);
      this.tooltipStyle = `left: ${left}px; top: ${top}px;`;
    }
    // showMask() {
    //   this.show = true; // 假设 show 是控制掩码显示的数据属性  
    //   Vue.$emit('update:highlight', true); // 触发事件，传递高亮状态  
    // },  
    // hideMask() {
    //   this.show = false;  
    //   Vue.$emit('update:highlight', false);  
    // }  
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.showMask
  }, $data.showMask ? {} : {}, {
    b: $data.showMask && $props.steps[$data.currentStep]
  }, $data.showMask && $props.steps[$data.currentStep] ? {
    c: common_vendor.t($props.steps[$data.currentStep].text),
    d: common_vendor.t($data.currentStep === $props.steps.length - 1 ? $props.completeText : $props.nextText),
    e: common_vendor.o((...args) => $options.nextStep && $options.nextStep(...args)),
    f: common_vendor.s($data.tooltipStyle + " width:" + $props.width + "rpx;")
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "G:/firstAidProject/app/FIRST-AID/first-aid/uni_modules/yi-step-tip/components/yi-step-tip/yi-step-tip.vue"]]);
wx.createComponent(Component);
