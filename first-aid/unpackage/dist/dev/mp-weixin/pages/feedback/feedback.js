"use strict";
const common_vendor = require("../../common/vendor.js");
const common_enum_enum = require("../../common/enum/enum.js");
const util_router = require("../../util/router.js");
const util_token = require("../../util/token.js");
if (!Array) {
  const _easycom_up_textarea2 = common_vendor.resolveComponent("up-textarea");
  const _easycom_up_upload2 = common_vendor.resolveComponent("up-upload");
  const _easycom_up_input2 = common_vendor.resolveComponent("up-input");
  const _easycom_up_button2 = common_vendor.resolveComponent("up-button");
  (_easycom_up_textarea2 + _easycom_up_upload2 + _easycom_up_input2 + _easycom_up_button2)();
}
const _easycom_up_textarea = () => "../../node-modules/uview-plus/components/u-textarea/u-textarea.js";
const _easycom_up_upload = () => "../../node-modules/uview-plus/components/u-upload/u-upload.js";
const _easycom_up_input = () => "../../node-modules/uview-plus/components/u-input/u-input.js";
const _easycom_up_button = () => "../../node-modules/uview-plus/components/u-button/u-button.js";
if (!Math) {
  (firstAidNavigation + _easycom_up_textarea + _easycom_up_upload + _easycom_up_input + _easycom_up_button)();
}
const firstAidNavigation = () => "../../components/first-aid-navigation/first-aid-navigation.js";
const _sfc_main = {
  __name: "feedback",
  setup(__props) {
    const fileList1 = common_vendor.ref([]);
    const value2 = common_vendor.ref("");
    const contactInfo = common_vendor.ref("");
    const nurseId = common_vendor.ref("");
    const isSubmitDisabled = common_vendor.computed(() => {
      return !fileList1.value.length && !value2.value.trim() && !contactInfo.value.trim();
    });
    common_vendor.onLoad((options) => {
      nurseId.value = options.nurseId;
    });
    const deletePic = (event) => {
      fileList1.value.splice(event.index, 1);
    };
    const afterRead = async (event) => {
      let lists = [].concat(event.file);
      fileList1.value.length;
      lists.map((item) => {
        fileList1.value.push({
          ...item
        });
      });
    };
    const handleSubmit = async () => {
      const submitData = {
        description: value2.value,
        // 问题和意见  
        phoneNumber: contactInfo.value,
        // 联系方式
        nurseId: nurseId.value
      };
      if (!submitData.description.trim() || !submitData.phoneNumber.trim() || !submitData.nurseId) {
        common_vendor.index.showToast({
          title: "请完善表单内容",
          icon: "none",
          duration: 2e3
        });
        return;
      }
      try {
        let token = util_token.getToken();
        fileList1.value.forEach((item) => {
          common_vendor.index.uploadFile({
            url: "http://192.168.169.159:11307/assistance/addAssistance",
            filePath: item.url,
            name: "img",
            formData: {
              //这里是上传图片时一起上传的数据
              description: submitData.description,
              phoneNumber: submitData.phoneNumber,
              nurseId: submitData.nurseId
            },
            header: {
              "Authorization": token,
              MacAddress: "12121221"
            },
            success: (resp) => {
              console.log(resp);
            },
            fail: (res) => {
              console.log(res);
            }
          });
        });
        common_vendor.index.showToast({
          title: "反馈提交成功",
          icon: "success",
          duration: 2e3
        });
        common_vendor.index.switchTab({
          url: "/pages/userInfo/userInfo"
        });
      } catch (e) {
        console.log(e);
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(common_vendor.unref(util_router.Return)),
        b: common_vendor.p({
          ["nav-text"]: common_vendor.unref(common_enum_enum.navEnum).feedback
        }),
        c: common_vendor.o(($event) => value2.value = $event),
        d: common_vendor.p({
          placeholder: "请输入内容",
          count: true,
          modelValue: value2.value
        }),
        e: common_vendor.o(afterRead),
        f: common_vendor.o(deletePic),
        g: common_vendor.p({
          fileList: fileList1.value,
          name: "1",
          multiple: true,
          maxCount: 1
        }),
        h: common_vendor.o(($event) => contactInfo.value = $event),
        i: common_vendor.p({
          placeholder: "请输入内容",
          border: "surround",
          clearable: true,
          maxlength: "11",
          type: "number",
          modelValue: contactInfo.value
        }),
        j: common_vendor.o(($event) => handleSubmit()),
        k: common_vendor.p({
          type: "primary",
          disabled: isSubmitDisabled.value,
          text: "确定"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a24b82f2"], ["__file", "G:/firstAidProject/app/FIRST-AID/first-aid/pages/feedback/feedback.vue"]]);
wx.createPage(MiniProgramPage);
