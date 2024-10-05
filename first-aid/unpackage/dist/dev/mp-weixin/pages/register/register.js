"use strict";
const common_vendor = require("../../common/vendor.js");
const common_enum_enum = require("../../common/enum/enum.js");
const util_router = require("../../util/router.js");
const api_register = require("../../api/register.js");
const util_MAC = require("../../util/MAC.js");
const firstAidNavigation = () => "../../components/first-aid-navigation/first-aid-navigation.js";
const _sfc_main = {
  components: {
    firstAidNavigation
  },
  computed: {
    navEnum() {
      return common_enum_enum.navEnum;
    }
  },
  data() {
    return {
      macAddress: "",
      isNeedMac: false,
      formData: {
        name: "",
        jobNumber: "",
        account: "",
        password: "",
        confirmPassword: "",
        hospitalId: "",
        departmentId: "",
        phoneNumber: ""
      },
      formDataChange: {
        name: false,
        jobNumber: false,
        account: false,
        password: false,
        confirmPassword: false,
        hospitalId: false,
        departmentId: false,
        phoneNumber: false
      },
      formErrors: {},
      hospitalSelectValue: "",
      hospitalSelectRange: [],
      departmentSelectValue: "",
      departmentSelectRange: []
    };
  },
  mounted() {
    api_register.getHospitalList().then((res) => {
      if (res.data.code === 200) {
        for (let i = 0; i < res.data.data.length; i++) {
          res.data.data[i].value = res.data.data[i].id;
          res.data.data[i].text = res.data.data[i].hospitalName;
        }
        this.hospitalSelectRange = res.data.data;
      }
    });
  },
  methods: {
    Return: util_router.Return,
    checkForm(newData) {
      if (newData.name === "" && this.formDataChange.name === true) {
        this.formErrors.name = "姓名不能为空";
      } else if (newData.name !== "") {
        if (!/^[\u4E00-\u9FA5A-Za-z\s\-']{2,30}$/.test(this.formData.name)) {
          this.formErrors.name = "请输入合法姓名";
        } else {
          delete this.formErrors.name;
        }
        this.formDataChange.name = true;
      }
      if (newData.jobNumber === "" && this.formDataChange.jobNumber === true) {
        this.formErrors.jobNumber = "工号不能为空";
      } else if (newData.jobNumber !== "") {
        if (this.formData.jobNumber.length < 4) {
          this.formErrors.jobNumber = "工号长度不能少于4位";
        } else {
          delete this.formErrors.jobNumber;
        }
        this.formDataChange.jobNumber = true;
      }
      if (newData.account === "" && this.formDataChange.account === true) {
        this.formErrors.account = "账号不能为空";
      } else if (newData.account !== "") {
        if (!/^(?=.*[0-9])(?=.*[a-zA-Z])[0-9a-zA-Z]{4,11}$/.test(this.formData.account)) {
          this.formErrors.account = "账号必须由数字和字母组成且长度至少为4位,不多于11位";
        } else {
          delete this.formErrors.account;
        }
        this.formDataChange.account = true;
      }
      if (this.formData.password === "" && this.formDataChange.password === true) {
        this.formErrors.password = "密码不能为空";
      }
      if (this.formData.password !== "") {
        if (!/^(?=.*[0-9])(?=.*[a-zA-Z])[0-9a-zA-Z]{6,16}$/.test(this.formData.password)) {
          this.formErrors.password = "密码必须由数字和字母组成且长度至少为6位，不多于16位";
        } else {
          delete this.formErrors.password;
        }
        this.formDataChange.password = true;
      }
      if (this.formData.confirmPassword === "" && this.formDataChange.confirmPassword === true) {
        this.formErrors.confirmPassword = "请确认密码";
      }
      if (this.formData.confirmPassword !== "") {
        if (this.formData.confirmPassword !== this.formData.password && newData.confirmPassword !== "") {
          this.formErrors.confirmPassword = "两次输入的密码不一致";
        } else {
          delete this.formErrors.confirmPassword;
        }
        this.formDataChange.confirmPassword = true;
      }
      if (this.formData.hospitalId === "" && this.formDataChange.hospitalId === true) {
        this.formErrors.hospitalId = "请选择所属医院";
      }
      if (this.formData.hospitalId !== "") {
        delete this.formErrors.hospitalId;
        this.formDataChange.hospitalId = true;
      }
      if (this.formData.departmentId === "" && this.formDataChange.departmentId === true) {
        this.formErrors.departmentId = "请选择所属科室";
      }
      if (this.formData.departmentId !== "") {
        delete this.formErrors.departmentId;
        this.formDataChange.departmentId = true;
      }
      if (this.formData.phoneNumber === "" && this.formDataChange.phoneNumber === true) {
        this.formErrors.phoneNumber = "手机号码不能为空";
      }
      if (this.formData.phoneNumber !== "") {
        if (!/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(this.formData.phoneNumber)) {
          this.formErrors.phoneNumber = "请输入有效的手机号码";
        } else {
          delete this.formErrors.phoneNumber;
        }
        this.formDataChange.phoneNumber = true;
      }
    },
    register() {
      this.formErrors = {};
      if (!this.formData.name) {
        this.formErrors.name = "姓名不能为空";
      } else if (!/^[\u4E00-\u9FA5A-Za-z\s\-']{2,30}$/.test(this.formData.name)) {
        this.formErrors.name = "请输入合法姓名";
      }
      if (!this.formData.jobNumber) {
        this.formErrors.jobNumber = "工号不能为空";
      } else if (this.formData.jobNumber.length < 4) {
        this.formErrors.jobNumber = "工号长度不能少于4位";
      }
      if (!this.formData.account) {
        this.formErrors.account = "账号不能为空";
      } else if (!/^(?=.*[0-9])(?=.*[a-zA-Z])[0-9a-zA-Z]{4,11}$/.test(this.formData.account)) {
        this.formErrors.account = "账号必须由数字和字母组成且长度至少为4位，不多于11位";
      }
      if (!this.formData.password) {
        this.formErrors.password = "密码不能为空";
      } else if (!/^(?=.*[0-9])(?=.*[a-zA-Z])[0-9a-zA-Z]{6,16}$/.test(this.formData.password)) {
        this.formErrors.password = "密码必须由数字和字母组成且长度至少为6位，不多于16位";
      }
      if (!this.formData.confirmPassword) {
        this.formErrors.confirmPassword = "请确认密码";
      } else if (this.formData.confirmPassword !== this.formData.password) {
        this.formErrors.confirmPassword = "两次输入的密码不一致";
      }
      if (this.formData.hospitalId === "") {
        this.formErrors.hospitalId = "请选择所属医院";
      }
      if (this.formData.departmentId === "") {
        this.formErrors.departmentId = "请选择所属科室";
      }
      if (!this.formData.phoneNumber) {
        this.formErrors.phoneNumber = "手机号码不能为空";
      } else if (!/^1[3456789]\d{9}$/.test(this.formData.phoneNumber)) {
        this.formErrors.phoneNumber = "请输入有效的手机号码";
      }
      if (Object.keys(this.formErrors).length === 0) {
        const opts = { ...this.formData };
        delete opts.confirmPassword;
        if (util_MAC.Mac.address() !== "02:00:00:00:00:00" || this.macAddress !== "") {
          api_register.userRegister(opts, this.macAddress !== "" ? this.macAddress : util_MAC.Mac.address()).then((res) => {
            if (res.data.code === 200) {
              common_vendor.index.showToast({
                title: "注册成功",
                icon: "success"
              });
              this.backLogin();
            } else if (res.data.code !== 200) {
              common_vendor.index.showToast({
                title: "Error:" + res.data.message,
                icon: "none"
              });
            } else {
              common_vendor.index.showToast({
                title: "Error:注册出错",
                icon: "none"
              });
            }
          }).catch(
            (error) => console.log(error)
          );
        } else {
          common_vendor.index.showToast({
            title: "Error:未连接到指定局域网无法获取当前设备mac地址，请手动输入mac地址",
            icon: "none"
          });
          this.isNeedMac = true;
        }
      }
    },
    backLogin() {
      common_vendor.index.navigateBack();
    },
    hospitalSelectChange(e) {
      api_register.getDepartmentList({ hospitalId: e }).then((res) => {
        for (let i = 0; i < res.data.data.length; i++) {
          res.data.data[i].value = res.data.data[i].id;
          res.data.data[i].text = res.data.data[i].departmentName;
        }
        this.departmentSelectRange = res.data.data;
      });
    }
  },
  watch: {
    formData: {
      handler(newData) {
        this.checkForm(newData);
      },
      deep: true
      // 深度监听对象内部值的变化
    }
  }
};
if (!Array) {
  const _component_firstAidNavigation = common_vendor.resolveComponent("firstAidNavigation");
  const _easycom_uni_data_select2 = common_vendor.resolveComponent("uni-data-select");
  (_component_firstAidNavigation + _easycom_uni_data_select2)();
}
const _easycom_uni_data_select = () => "../../uni_modules/uni-data-select/components/uni-data-select/uni-data-select.js";
if (!Math) {
  _easycom_uni_data_select();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o(($event) => $options.backLogin()),
    b: common_vendor.p({
      ["nav-text"]: $options.navEnum.register
    }),
    c: $data.formData.account,
    d: common_vendor.o(($event) => $data.formData.account = $event.detail.value),
    e: $data.formErrors.account
  }, $data.formErrors.account ? {
    f: common_vendor.t($data.formErrors.account)
  } : {}, {
    g: $data.formData.password,
    h: common_vendor.o(($event) => $data.formData.password = $event.detail.value),
    i: $data.formErrors.password
  }, $data.formErrors.password ? {
    j: common_vendor.t($data.formErrors.password)
  } : {}, {
    k: $data.formData.confirmPassword,
    l: common_vendor.o(($event) => $data.formData.confirmPassword = $event.detail.value),
    m: $data.formErrors.confirmPassword
  }, $data.formErrors.confirmPassword ? {
    n: common_vendor.t($data.formErrors.confirmPassword)
  } : {}, {
    o: $data.formData.name,
    p: common_vendor.o(($event) => $data.formData.name = $event.detail.value),
    q: $data.formErrors.name
  }, $data.formErrors.name ? {
    r: common_vendor.t($data.formErrors.name)
  } : {}, {
    s: $data.formData.jobNumber,
    t: common_vendor.o(($event) => $data.formData.jobNumber = $event.detail.value),
    v: $data.formErrors.jobNumber
  }, $data.formErrors.jobNumber ? {
    w: common_vendor.t($data.formErrors.jobNumber)
  } : {}, {
    x: $data.formData.phoneNumber,
    y: common_vendor.o(($event) => $data.formData.phoneNumber = $event.detail.value),
    z: $data.formErrors.phoneNumber
  }, $data.formErrors.phoneNumber ? {
    A: common_vendor.t($data.formErrors.phoneNumber)
  } : {}, {
    B: common_vendor.o($options.hospitalSelectChange),
    C: common_vendor.o(($event) => $data.formData.hospitalId = $event),
    D: common_vendor.p({
      localdata: $data.hospitalSelectRange,
      placeholder: "请选择所属医院",
      required: true,
      type: "text",
      modelValue: $data.formData.hospitalId
    }),
    E: $data.formErrors.hospitalId
  }, $data.formErrors.hospitalId ? {
    F: common_vendor.t($data.formErrors.hospitalId)
  } : {}, {
    G: common_vendor.o(($event) => $data.formData.departmentId = $event),
    H: common_vendor.p({
      localdata: $data.departmentSelectRange,
      placeholder: "请选择所属科室",
      required: true,
      type: "text",
      modelValue: $data.formData.departmentId
    }),
    I: $data.formErrors.departmentId
  }, $data.formErrors.departmentId ? {
    J: common_vendor.t($data.formErrors.departmentId)
  } : {}, {
    K: $data.isNeedMac
  }, $data.isNeedMac ? {} : {}, {
    L: $data.isNeedMac
  }, $data.isNeedMac ? {
    M: $data.macAddress,
    N: common_vendor.o(($event) => $data.macAddress = $event.detail.value)
  } : {}, {
    O: common_vendor.o((...args) => $options.register && $options.register(...args)),
    P: common_vendor.o(($event) => $options.backLogin())
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "G:/firstAidProject/app/FIRST-AID/first-aid/pages/register/register.vue"]]);
wx.createPage(MiniProgramPage);
