"use strict";
const common_vendor = require("../../common/vendor.js");
const common_enum_enum = require("../../common/enum/enum.js");
const util_token = require("../../util/token.js");
const api_userInfo = require("../../api/userInfo.js");
const firstAidNavigation = () => "../../components/first-aid-navigation/first-aid-navigation.js";
const userInfoBox = () => "./component/userInfoBox.js";
const _sfc_main = {
  components: {
    firstAidNavigation,
    userInfoBox
  },
  computed: {
    navEnum() {
      return common_enum_enum.navEnum;
    }
  },
  data() {
    return {
      items: [
        { label: "姓名", value: "", isExpand: true },
        { label: "工号", value: "", isExpand: false },
        { label: "密码", value: "", isExpand: true },
        { label: "医院", value: "", isExpand: false },
        { label: "科室", value: "", isExpand: false }
      ],
      show: common_vendor.ref(false),
      nurseId: ""
    };
  },
  onShow() {
    this.getInfo();
  },
  methods: {
    getInfo: async function() {
      const res = await api_userInfo.getNurseInfo();
      this.nurseId = res.data.data.id;
      const userData = res.data.data;
      this.items.forEach((item) => {
        switch (item.label) {
          case "姓名":
            item.value = userData.nurseName || "";
            break;
          case "工号":
            item.value = userData.jobNumber;
            break;
          case "密码":
            item.value = "******";
            break;
          case "医院":
            item.value = userData.hospital;
            break;
          case "科室":
            item.value = userData.department;
            break;
          default:
            item.value = "";
        }
      });
    },
    toFeedback() {
      common_vendor.index.navigateTo({
        // 需要nurseId
        url: `/pages/feedback/feedback?nurseId=${this.nurseId}`
      });
    },
    torevisePart(index) {
      const item = this.items[index];
      common_vendor.index.navigateTo({
        url: `/pages/userInfo/revisePart/revisePart?label=${item.label}&value=${item.value}`
      });
    },
    handleLoginOut() {
      this.openPop();
    },
    closePop() {
      this.show = false;
    },
    openPop() {
      this.show = true;
    },
    confirmLoginOut: async function() {
      this.closePop();
      await api_userInfo.LoginOut();
      util_token.removeToken();
      common_vendor.index.reLaunch({
        url: "/pages/login/login"
      });
    }
  }
};
if (!Array) {
  const _component_firstAidNavigation = common_vendor.resolveComponent("firstAidNavigation");
  const _component_userInfoBox = common_vendor.resolveComponent("userInfoBox");
  const _easycom_up_popup2 = common_vendor.resolveComponent("up-popup");
  (_component_firstAidNavigation + _component_userInfoBox + _easycom_up_popup2)();
}
const _easycom_up_popup = () => "../../node-modules/uview-plus/components/u-popup/u-popup.js";
if (!Math) {
  _easycom_up_popup();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      isReturn: false,
      ["nav-text"]: $options.navEnum.userInfo
    }),
    b: common_vendor.f($data.items, (item, index, i0) => {
      return {
        a: common_vendor.o(($event) => $options.torevisePart(index), index),
        b: "875c692e-1-" + i0,
        c: common_vendor.p({
          isExpand: item.isExpand,
          titleText: item.label,
          valueText: item.value
        }),
        d: index
      };
    }),
    c: common_vendor.o(($event) => $options.handleLoginOut()),
    d: common_vendor.o((...args) => $options.toFeedback && $options.toFeedback(...args)),
    e: common_vendor.o(($event) => $options.confirmLoginOut()),
    f: common_vendor.o(($event) => $options.closePop()),
    g: common_vendor.o(($event) => $options.closePop()),
    h: common_vendor.o(($event) => $options.openPop()),
    i: common_vendor.p({
      round: 10,
      show: $data.show,
      mode: "bottom"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-875c692e"], ["__file", "G:/firstAidProject/app/FIRST-AID/first-aid/pages/userInfo/userInfo.vue"]]);
wx.createPage(MiniProgramPage);
