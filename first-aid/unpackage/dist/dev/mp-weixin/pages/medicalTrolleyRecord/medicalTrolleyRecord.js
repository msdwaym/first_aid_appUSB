"use strict";
const common_vendor = require("../../common/vendor.js");
const common_enum_enum = require("../../common/enum/enum.js");
const util_router = require("../../util/router.js");
const api_register = require("../../api/register.js");
const api_userInfo = require("../../api/userInfo.js");
const api_medicalTrolleyInfo = require("../../api/medicalTrolleyInfo.js");
const util_encode = require("../../util/encode.js");
const util_machine = require("../../util/machine.js");
if (!Array) {
  const _easycom_uni_data_select2 = common_vendor.resolveComponent("uni-data-select");
  const _easycom_up_button2 = common_vendor.resolveComponent("up-button");
  (_easycom_uni_data_select2 + _easycom_up_button2)();
}
const _easycom_uni_data_select = () => "../../uni_modules/uni-data-select/components/uni-data-select/uni-data-select.js";
const _easycom_up_button = () => "../../node-modules/uview-plus/components/u-button/u-button.js";
if (!Math) {
  (firstAidNavigation + _easycom_uni_data_select + _easycom_up_button)();
}
const firstAidNavigation = () => "../../components/first-aid-navigation/first-aid-navigation.js";
const _sfc_main = {
  __name: "medicalTrolleyRecord",
  setup(__props) {
    const formData = common_vendor.ref({
      hospitalId: "",
      departmentId: "",
      configId: "",
      medicalTrolleyCode: ""
    });
    const hospitalSelectRange = common_vendor.ref([]);
    common_vendor.ref("");
    const departmentSelectRange = common_vendor.ref([]);
    common_vendor.ref("");
    const isCodeFetched = common_vendor.ref(false);
    const disableSelect = common_vendor.ref(false);
    common_vendor.ref({
      name: false,
      jobNumber: false,
      account: false,
      password: false,
      confirmPassword: false,
      hospitalId: false,
      departmentId: false,
      phoneNumber: false
    });
    common_vendor.ref(false);
    async function getHospital() {
      api_register.getHospitalList().then((res) => {
        if (res.data.code === 200) {
          res.data.data.forEach((item) => {
            item.value = item.id;
            item.text = item.hospitalName;
          });
          hospitalSelectRange.value = res.data.data;
        }
      });
    }
    async function getnurseInfo() {
      const res = await api_userInfo.getNurseInfo();
      if (res.data.data.hospitalId && res.data.data.departmentId) {
        getHospital();
        hospitalSelectChange(res.data.data.hospitalId);
        formData.value.hospitalId = res.data.data.hospitalId;
        formData.value.departmentId = res.data.data.departmentId;
        disableSelect.value = true;
      } else {
        disableSelect.value = false;
      }
    }
    function hospitalSelectChange(e) {
      api_register.getDepartmentList({ hospitalId: e.value }).then((res) => {
        if (res.data.code === 200) {
          res.data.data.forEach((item) => {
            item.value = item.id;
            item.text = item.departmentName;
          });
          departmentSelectRange.value = res.data.data;
        }
      });
    }
    async function getMedicalTrolleyCode() {
      const data = {
        hospitalId: formData.value.hospitalId,
        departmentId: formData.value.departmentId
      };
      if (!data.hospitalId || !data.departmentId) {
        common_vendor.index.showToast({
          title: "请先选择所属医院和科室",
          icon: "none",
          duration: 2e3
        });
        return;
      }
      const res = await api_medicalTrolleyInfo.getCode(data);
      if (res && res.data && res.data.code === 200) {
        formData.value.medicalTrolleyCode = res.data.data;
        isCodeFetched.value = true;
        common_vendor.index.showToast({
          title: "获取急救车编码成功",
          icon: "success",
          duration: 2e3
        });
      } else {
        common_vendor.index.showToast({
          title: "获取急救车编码失败,请稍后再试，或联系管理员",
          icon: "none",
          duration: 2e3
        });
      }
    }
    async function handleWrite() {
      common_vendor.index.showLoading({
        title: "正在写入标签，请稍后",
        mask: true
        // 显示遮罩层，防止用户进行其他操作  
      });
      if (isCodeFetched.value) {
        const code = util_encode.padString(formData.value.medicalTrolleyCode);
        try {
          const re = util_machine.initMachine();
          if (re.code == 200) {
            const re1 = util_machine.writeEPCMachine(0, code, null);
            if (re1.code == 200) {
              const res = await api_medicalTrolleyInfo.addMedicalTrolley(formData.value);
              if (res.data.code === 200) {
                common_vendor.index.hideLoading();
                common_vendor.index.showToast({
                  title: "写入成功",
                  icon: "success",
                  duration: 2e3
                });
                common_vendor.index.switchTab({
                  url: "/pages/homepage/homepage"
                });
              } else {
                common_vendor.index.hideLoading();
                common_vendor.index.showToast({
                  title: "数据存入失败，请稍后重试",
                  icon: "none",
                  duration: 2e3
                });
              }
            } else {
              common_vendor.index.hideLoading();
              common_vendor.index.showToast({
                title: "标签写入失败，请对准标签，重新尝试扫描",
                icon: "none",
                duration: 2e3
              });
            }
          } else {
            common_vendor.index.hideLoading();
            common_vendor.index.showToast({
              title: "标签初始化失败，请重新尝试",
              icon: "none",
              duration: 2e3
            });
          }
        } catch (e) {
          console.log(e);
        }
      } else {
        common_vendor.index.showToast({
          title: "请先获取急救车编码",
          icon: "none",
          //显示持续时间为 2秒
          duration: 2e3
        });
      }
    }
    common_vendor.onMounted(() => {
      getHospital();
      getnurseInfo();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(common_vendor.unref(util_router.Return)),
        b: common_vendor.p({
          ["nav-text"]: common_vendor.unref(common_enum_enum.navEnum).medicalTrolleyRecord
        }),
        c: common_vendor.o(hospitalSelectChange),
        d: common_vendor.o(($event) => formData.value.hospitalId = $event),
        e: common_vendor.p({
          localdata: hospitalSelectRange.value,
          placeholder: "请选择所属医院",
          required: true,
          disabled: disableSelect.value,
          type: "text",
          clear: !disableSelect.value,
          modelValue: formData.value.hospitalId
        }),
        f: common_vendor.o(($event) => formData.value.departmentId = $event),
        g: common_vendor.p({
          localdata: departmentSelectRange.value,
          placeholder: "请选择所属科室",
          required: true,
          type: "text",
          disabled: disableSelect.value,
          clear: !disableSelect.value,
          modelValue: formData.value.departmentId
        }),
        h: formData.value.medicalTrolleyCode,
        i: common_vendor.o(($event) => formData.value.medicalTrolleyCode = $event.detail.value),
        j: common_vendor.p({
          size: "large",
          shape: "circle"
        }),
        k: common_vendor.o(getMedicalTrolleyCode),
        l: common_vendor.p({
          size: "large",
          shape: "circle",
          color: "rgba(137, 207, 251, 1)"
        }),
        m: common_vendor.o(handleWrite)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1ecb3e42"], ["__file", "G:/firstAidProject/app/FIRST-AID/first-aid/pages/medicalTrolleyRecord/medicalTrolleyRecord.vue"]]);
wx.createPage(MiniProgramPage);
