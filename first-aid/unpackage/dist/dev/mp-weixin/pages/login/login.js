"use strict";
const common_vendor = require("../../common/vendor.js");
const api_login = require("../../api/login.js");
const util_getVersion = require("../../util/getVersion.js");
const util_MAC = require("../../util/MAC.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      isRemember: false,
      account: "",
      password: "",
      macAddress: "",
      isNeedMac: false
    };
  },
  onLoad() {
    const rememberedAccount = common_vendor.index.getStorageSync("rememberedAccount");
    const rememberedPassword = common_vendor.index.getStorageSync("rememberedPassword");
    if (rememberedAccount && rememberedPassword) {
      this.account = rememberedAccount;
      this.password = rememberedPassword;
      this.isRemember = true;
    }
  },
  methods: {
    changeRemember() {
      this.isRemember = !this.isRemember;
    },
    login() {
      if (!this.account || !this.password) {
        common_vendor.index.showToast({
          title: "账号和密码不能为空",
          icon: "none"
        });
        return;
      }
      if (common_vendor.index.getStorageSync("isCouldLogin") === false) {
        util_getVersion.getVersion();
        return;
      }
      if (util_MAC.Mac.address() === "02:00:00:00:00:00" && this.macAddress === "") {
        common_vendor.index.showToast({
          title: "Error:未连接到指定局域网无法获取当前设备mac地址，请手动输入mac地址",
          icon: "none"
        });
        this.isNeedMac = true;
        return;
      }
      common_vendor.index.showLoading({
        title: "登录中...",
        mask: true
      });
      api_login.userLogin({ account: this.account, password: this.password }, this.macAddress).then(async (res) => {
        if (res.data.code === 200) {
          if (this.isRemember) {
            common_vendor.index.setStorageSync("rememberedAccount", this.account);
            common_vendor.index.setStorageSync("rememberedPassword", this.password);
          } else {
            common_vendor.index.removeStorageSync("rememberedAccount");
            common_vendor.index.removeStorageSync("rememberedPassword");
          }
          common_vendor.index.setStorageSync("MacAddress", this.macAddress);
          common_vendor.index.showToast({
            title: "登录成功",
            icon: "success"
          });
          common_vendor.index.hideLoading();
          common_vendor.index.switchTab({
            url: "/pages/homepage/homepage"
          });
        } else {
          common_vendor.index.hideLoading();
          common_vendor.index.showToast({
            title: "Error:" + res.data.message || "登录失败",
            icon: "none"
          });
        }
      }).catch((error) => {
        console.error("登录失败", error);
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: "Error:登录失败，请稍后重试",
          icon: "none"
        });
      });
    },
    register() {
      common_vendor.index.navigateTo({
        url: "/pages/register/register"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_assets._imports_0,
    b: $data.account,
    c: common_vendor.o(($event) => $data.account = $event.detail.value),
    d: $data.password,
    e: common_vendor.o(($event) => $data.password = $event.detail.value),
    f: $data.isNeedMac
  }, $data.isNeedMac ? {
    g: $data.macAddress,
    h: common_vendor.o(($event) => $data.macAddress = $event.detail.value)
  } : {}, {
    i: common_vendor.n($data.isRemember ? "cuIcon-squarecheckfill" : "cuIcon-square"),
    j: common_vendor.o((...args) => $options.changeRemember && $options.changeRemember(...args)),
    k: common_vendor.o((...args) => $options.changeRemember && $options.changeRemember(...args)),
    l: common_vendor.o(($event) => $options.login()),
    m: common_vendor.o(($event) => $options.register())
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "G:/firstAidProject/app/FIRST-AID/first-aid/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);
