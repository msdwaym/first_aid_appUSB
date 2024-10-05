"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const util_getVersion = require("./util/getVersion.js");
if (!Math) {
  "./pages/login/login.js";
  "./pages/index/index.js";
  "./pages/homepage/homepage.js";
  "./pages/MaterialModule/MaterialModule.js";
  "./pages/MaterialUsedRecord/MaterialUsedRecord.js";
  "./pages/register/register.js";
  "./pages/userInfo/userInfo.js";
  "./pages/report/report.js";
  "./pages/feedback/feedback.js";
  "./pages/userInfo/revisePart/revisePart.js";
  "./pages/medicalTrolleyRecord/medicalTrolleyRecord.js";
  "./pages/medicalInfo/index.js";
  "./pages/checkInfo/index.js";
  "./pages/materialUseRegistration/index.js";
  "./pages/materialInfoRegistration/index.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
    util_getVersion.getVersion();
  },
  onHide: function() {
    console.log("App Hide");
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "G:/firstAidProject/app/FIRST-AID/first-aid/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
