"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_enum_enum = require("../../../common/enum/enum.js");
const util_router = require("../../../util/router.js");
const api_userInfo = require("../../../api/userInfo.js");
if (!Array) {
  const _easycom_up_input2 = common_vendor.resolveComponent("up-input");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_data_select2 = common_vendor.resolveComponent("uni-data-select");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_up_input2 + _easycom_uni_forms_item2 + _easycom_uni_data_select2 + _easycom_uni_forms2)();
}
const _easycom_up_input = () => "../../../node-modules/uview-plus/components/u-input/u-input.js";
const _easycom_uni_forms_item = () => "../../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_data_select = () => "../../../uni_modules/uni-data-select/components/uni-data-select/uni-data-select.js";
const _easycom_uni_forms = () => "../../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (firstAidNavigation + _easycom_up_input + _easycom_uni_forms_item + _easycom_uni_data_select + _easycom_uni_forms)();
}
const firstAidNavigation = () => "../../../components/first-aid-navigation/first-aid-navigation.js";
const _sfc_main = {
  __name: "revisePart",
  setup(__props) {
    const localTitle = common_vendor.ref("");
    const reviseData = common_vendor.ref("");
    common_vendor.onLoad((options) => {
      localTitle.value = options.label;
      reviseData.value = options.value;
      if (localTitle.value === "姓名") {
        formData.name = reviseData.value;
      }
    });
    const formData = {
      name: "",
      oldPassword: "",
      newPassword: "",
      newPasswordConfirm: "",
      department: ""
    };
    const Submit = async () => {
      if (localTitle.value === "姓名" && formData.name === "") {
        common_vendor.index.showToast({
          title: "姓名不能为空",
          icon: "none",
          duration: 2e3
        });
        return;
      }
      if (localTitle.value === "密码") {
        if (formData.oldPassword === "") {
          common_vendor.index.showToast({
            title: "原密码不能为空",
            icon: "none",
            duration: 2e3
          });
          return;
        }
        if (formData.newPassword === "") {
          common_vendor.index.showToast({
            title: "新密码不能为空",
            icon: "none",
            duration: 2e3
          });
          return;
        }
        if (formData.newPasswordConfirm === "") {
          common_vendor.index.showToast({
            title: "确认密码不能为空",
            icon: "none",
            duration: 2e3
          });
          return;
        } else if (formData.newPassword !== formData.newPasswordConfirm) {
          common_vendor.index.showToast({
            title: "两次输入的新密码不一致",
            icon: "none",
            duration: 2e3
          });
          return;
        }
      }
      try {
        if (localTitle.value === "姓名") {
          const res = await api_userInfo.reviseName(formData);
          if (res.data.code === 200) {
            common_vendor.index.showToast({
              title: "修改成功",
              icon: "success",
              duration: 2e3
            });
            common_vendor.index.switchTab({
              url: "/pages/userInfo/userInfo"
            });
          } else if (res.data.code === 20002) {
            common_vendor.index.showToast({
              title: "护士姓名不能为空，请重新输入",
              icon: "none",
              duration: 2e3
            });
          } else {
            common_vendor.index.showToast({
              title: "修改失败，请重新尝试",
              icon: "none",
              duration: 2e3
            });
          }
        } else if (localTitle.value === "密码") {
          const res = await api_userInfo.revisePassword(formData);
          if (res.data.code == 200) {
            common_vendor.index.showToast({
              title: "修改成功",
              icon: "success",
              duration: 2e3
            });
            common_vendor.index.switchTab({
              url: "/pages/userInfo/userInfo"
            });
          } else if (res.data.code == 20002) {
            common_vendor.index.showToast({
              title: "原密码输入不正确，请重新输入",
              icon: "none",
              duration: 2e3
            });
          } else {
            common_vendor.index.showToast({
              title: "修改失败，请稍后尝试",
              icon: "none",
              duration: 2e3
            });
          }
        }
      } catch (e) {
        console.log(e);
        common_vendor.index.showToast({
          title: "修改失败，请稍后再试",
          icon: "none",
          duration: 2e3
        });
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(common_vendor.unref(util_router.Return)),
        b: common_vendor.o(Submit),
        c: common_vendor.p({
          ["nav-text"]: common_vendor.unref(common_enum_enum.navEnum).reviseInfo,
          isShowSubmit: true
        }),
        d: localTitle.value === "姓名"
      }, localTitle.value === "姓名" ? {
        e: common_vendor.o(($event) => _ctx.focusCode = false),
        f: common_vendor.o(($event) => formData.name = $event),
        g: common_vendor.p({
          inputAlign: "right",
          placeholder: "请输入姓名",
          clearable: "true",
          shape: "circle",
          focus: _ctx.focusCode,
          trim: "both",
          fontSize: "30rpx",
          maxlength: "10",
          modelValue: formData.name
        }),
        h: common_vendor.o(($event) => formData.name = $event),
        i: common_vendor.p({
          name: "name",
          modelValue: formData.name
        })
      } : {}, {
        j: localTitle.value === "密码"
      }, localTitle.value === "密码" ? {
        k: common_vendor.o(($event) => _ctx.focusPassword = false),
        l: common_vendor.o(($event) => formData.oldPassword = $event),
        m: common_vendor.p({
          inputAlign: "right",
          placeholder: "请输入原密码",
          clearable: "true",
          shape: "circle",
          trim: "both",
          focus: _ctx.focusPassword,
          fontSize: "30rpx",
          type: "password",
          modelValue: formData.oldPassword
        }),
        n: common_vendor.o(($event) => formData.oldPassword = $event),
        o: common_vendor.p({
          name: "password",
          modelValue: formData.oldPassword
        })
      } : {}, {
        p: localTitle.value === "密码"
      }, localTitle.value === "密码" ? {
        q: common_vendor.o(($event) => _ctx.focusPassword2 = false),
        r: common_vendor.o(($event) => formData.newPassword = $event),
        s: common_vendor.p({
          inputAlign: "right",
          placeholder: "请输入新密码",
          clearable: "true",
          trim: "both",
          focus: _ctx.focusPassword2,
          shape: "circle",
          fontSize: "30rpx",
          type: "password",
          modelValue: formData.newPassword
        }),
        t: common_vendor.o(($event) => formData.newPassword = $event),
        v: common_vendor.p({
          name: "password2",
          modelValue: formData.newPassword
        })
      } : {}, {
        w: localTitle.value === "密码"
      }, localTitle.value === "密码" ? {
        x: common_vendor.o(($event) => _ctx.focusPasswordConfirm = false),
        y: common_vendor.o(($event) => formData.newPasswordConfirm = $event),
        z: common_vendor.p({
          inputAlign: "right",
          placeholder: "请再次输入新密码",
          clearable: "true",
          trim: "both",
          shape: "circle",
          fontSize: "30rpx",
          type: "password",
          modelValue: formData.newPasswordConfirm
        }),
        A: common_vendor.o(($event) => formData.newPasswordConfirm = $event),
        B: common_vendor.p({
          name: "password3",
          modelValue: formData.newPasswordConfirm
        })
      } : {}, {
        C: localTitle.value === "科室"
      }, localTitle.value === "科室" ? {
        D: common_vendor.o(($event) => formData.departmentId = $event),
        E: common_vendor.p({
          localdata: _ctx.departmentSelectRange,
          placeholder: "请选择所属科室",
          required: true,
          type: "text",
          modelValue: formData.departmentId
        }),
        F: common_vendor.o(($event) => formData.department = $event),
        G: common_vendor.p({
          name: "department",
          modelValue: formData.department
        })
      } : {}, {
        H: common_vendor.sr("form", "729bbba7-1"),
        I: common_vendor.p({
          value: formData,
          ["validate-trigger"]: "submit",
          ["err-show-type"]: "toast"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-729bbba7"], ["__file", "G:/firstAidProject/app/FIRST-AID/first-aid/pages/userInfo/revisePart/revisePart.vue"]]);
wx.createPage(MiniProgramPage);
