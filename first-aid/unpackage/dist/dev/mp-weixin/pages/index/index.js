"use strict";
const api_appInfo = require("../../api/appInfo.js");
const util_machine = require("../../util/machine.js");
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      title: "Hello"
    };
  },
  onLoad() {
  },
  methods: {
    handleButton() {
      api_appInfo.getAppInfo().then((res) => {
        console.log(res);
      });
    },
    handleInitButton() {
      console.log(JSON.stringify(util_machine.initMachine()));
    },
    handleStartButton() {
      console.log(JSON.stringify(util_machine.startMachine()));
    },
    handleStopButton() {
      console.log(JSON.stringify(util_machine.stopMachine()));
    },
    handleEndButton() {
      console.log(JSON.stringify(util_machine.endMachine()));
    },
    handleTagsButton() {
      console.log(JSON.stringify(util_machine.getTagsMachine()));
    },
    handleReadButton() {
      console.log(JSON.stringify(util_machine.readMachine(0, null, 2, 6, 1)));
    },
    handleWriteButton() {
      console.log(JSON.stringify(util_machine.writeMachine(0, "4A0101010101010000030001", null, 2, 1)));
    },
    handleWriteEPCButton() {
      console.log(JSON.stringify(util_machine.writeEPCMachine(0, "4A0101010101010000030002", null)));
    },
    handleLockButton() {
      console.log(JSON.stringify(util_machine.lockTagMachine(2, 1, null)));
    },
    handleUnlockButton() {
      console.log(JSON.stringify(util_machine.lockTagMachine(2, 0, null)));
    }
  }
};
if (!Array) {
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  _easycom_u_button2();
}
const _easycom_u_button = () => "../../node-modules/uview-plus/components/u-button/u-button.js";
if (!Math) {
  _easycom_u_button();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $options.handleButton()),
    b: common_vendor.p({
      type: "primary",
      text: "按钮"
    }),
    c: common_vendor.o(($event) => $options.handleInitButton()),
    d: common_vendor.p({
      type: "primary",
      text: "初始化扫描"
    }),
    e: common_vendor.o(($event) => $options.handleStartButton()),
    f: common_vendor.p({
      type: "primary",
      text: "开始扫描"
    }),
    g: common_vendor.o(($event) => $options.handleTagsButton()),
    h: common_vendor.p({
      type: "primary",
      text: "获取标签"
    }),
    i: common_vendor.o(($event) => $options.handleStopButton()),
    j: common_vendor.p({
      type: "primary",
      text: "停止扫描"
    }),
    k: common_vendor.o(($event) => $options.handleEndButton()),
    l: common_vendor.p({
      type: "primary",
      text: "结束扫描"
    }),
    m: common_vendor.o(($event) => $options.handleReadButton()),
    n: common_vendor.p({
      type: "primary",
      text: "读取标签"
    }),
    o: common_vendor.o(($event) => $options.handleWriteButton()),
    p: common_vendor.p({
      type: "primary",
      text: "写标签"
    }),
    q: common_vendor.o(($event) => $options.handleWriteEPCButton()),
    r: common_vendor.p({
      type: "primary",
      text: "写标签EPC"
    }),
    s: common_vendor.o(($event) => $options.handleLockButton()),
    t: common_vendor.p({
      type: "primary",
      text: "标签上锁"
    }),
    v: common_vendor.o(($event) => $options.handleUnlockButton()),
    w: common_vendor.p({
      type: "primary",
      text: "标签解锁"
    }),
    x: common_vendor.t($data.title)
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "G:/firstAidProject/app/FIRST-AID/first-aid/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
