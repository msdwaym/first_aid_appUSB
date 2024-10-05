"use strict";
const common_vendor = require("../../common/vendor.js");
const common_enum_enum = require("../../common/enum/enum.js");
const util_router = require("../../util/router.js");
const api_materialInfo = require("../../api/materialInfo.js");
if (!Array) {
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  (_easycom_uni_search_bar2 + _easycom_u_button2)();
}
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
const _easycom_u_button = () => "../../node-modules/uview-plus/components/u-button/u-button.js";
if (!Math) {
  (firstAidNavigation + _easycom_uni_search_bar + InfoCardBoxVue + _easycom_u_button)();
}
const firstAidNavigation = () => "../../components/first-aid-navigation/first-aid-navigation.js";
const InfoCardBoxVue = () => "../../components/InfoCardBox/InfoCardBox.js";
const _sfc_main = {
  __name: "MaterialUsedRecord",
  setup(__props) {
    const medicalTrolleyCode = common_vendor.ref("");
    const materials = common_vendor.ref([
      // { name: '医疗物资1', nurseName: '张三' ,num:0 ,type:'正常使用',consumeTime:'11:11:11'},  
      // { name: '医疗物资2', nurseName: '李四' ,num:0 ,type:'过期注销',consumeTime:'11:11:11'},   
    ]);
    const showAllMaterials = common_vendor.ref(false);
    const input = common_vendor.ref("");
    const visibleMaterials = common_vendor.computed(() => {
      if (showAllMaterials.value) {
        return materials.value;
      } else {
        return materials.value.slice(0, 10);
      }
    });
    common_vendor.onLoad((options) => {
      medicalTrolleyCode.value = options.medicalTrolleyCode;
      getRecordInfo();
    });
    const toggleShowAll = () => {
      showAllMaterials.value = !showAllMaterials.value;
    };
    async function getRecordInfo(data) {
      const data1 = {
        medicalTrolleyCode: medicalTrolleyCode.value,
        nurseName: data
      };
      const res = await api_materialInfo.getMaterialUsed(data1);
      if (res.data.code === 200 && res.data.data && res.data.data.result) {
        materials.value = res.data.data.result.map((item) => ({
          name: item.name,
          // 注意：这里可能需要更具体的名称，但当前数据未提供  
          nurseName: item.nurseName,
          num: item.num,
          type: getTypeDescription(item.type),
          // 使用辅助函数获取类型描述  
          consumeTime: item.consumeTime
          // 其他需要的字段...  
        }));
      } else {
        console.error("Failed to fetch material used records:", res.message || "Unknown error");
      }
    }
    function search(e) {
      getRecordInfo(e.value);
    }
    function clear(e) {
      getRecordInfo(e.value);
    }
    function getTypeDescription(type) {
      switch (type) {
        case 0:
          return "正常使用";
        case 1:
          return "过期注销";
        case 2:
          return "异常缺失";
        default:
          return "未知类型";
      }
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(common_vendor.unref(util_router.Return)),
        b: common_vendor.p({
          ["nav-text"]: common_vendor.unref(common_enum_enum.navEnum).materialUsed
        }),
        c: common_vendor.t(common_vendor.unref(common_enum_enum.navEnum).medicalTrolley),
        d: common_vendor.t(medicalTrolleyCode.value),
        e: common_vendor.o(search),
        f: common_vendor.o(input.value),
        g: common_vendor.o(clear),
        h: common_vendor.p({
          cancelButton: "none",
          radius: "100",
          placeholder: "请输入盘点人姓名"
        }),
        i: visibleMaterials.value.length === 0
      }, visibleMaterials.value.length === 0 ? {} : {}, {
        j: common_vendor.f(visibleMaterials.value, (material, index, i0) => {
          return {
            a: index,
            b: "44b6636b-2-" + i0,
            c: common_vendor.p({
              showBtn: false,
              showData: false,
              viewText: "医疗物资",
              view1Text: material.nurseName,
              view1Date: material.consumeTime,
              viewDate: material.name,
              usedNum: material.num,
              type: material.type
            })
          };
        }),
        k: materials.value.length > 10
      }, materials.value.length > 10 ? {
        l: common_vendor.o(toggleShowAll),
        m: common_vendor.p({
          size: "mini",
          text: showAllMaterials.value ? "收起" : "显示更多"
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-44b6636b"], ["__file", "G:/firstAidProject/app/FIRST-AID/first-aid/pages/MaterialUsedRecord/MaterialUsedRecord.vue"]]);
wx.createPage(MiniProgramPage);
