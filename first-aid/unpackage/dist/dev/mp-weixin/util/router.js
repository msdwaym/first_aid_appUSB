"use strict";
const common_vendor = require("../common/vendor.js");
const common_enum_enum = require("../common/enum/enum.js");
function Return() {
  if (getCurrentPages().length === 1) {
    common_vendor.index.switchTab({
      url: "/pages/index/index",
      fail: function() {
        common_vendor.index.showToast({
          title: common_enum_enum.errorEnum.JUMP,
          icon: "error"
        });
      }
    });
    return;
  }
  common_vendor.index.navigateBack();
}
function ReturnHomepage() {
  common_vendor.index.switchTab({
    url: "/pages/homepage/homepage",
    fail: function() {
      common_vendor.index.showToast({
        title: common_enum_enum.errorEnum.JUMP,
        icon: "error"
      });
    }
  });
}
exports.Return = Return;
exports.ReturnHomepage = ReturnHomepage;
