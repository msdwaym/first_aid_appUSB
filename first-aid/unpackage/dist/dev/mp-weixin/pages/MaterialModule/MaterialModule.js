"use strict";
const common_vendor = require("../../common/vendor.js");
const common_enum_enum = require("../../common/enum/enum.js");
const util_router = require("../../util/router.js");
const api_inventoryInfo = require("../../api/inventoryInfo.js");
const api_materialInfo = require("../../api/materialInfo.js");
if (!Array) {
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  _easycom_u_button2();
}
const _easycom_u_button = () => "../../node-modules/uview-plus/components/u-button/u-button.js";
if (!Math) {
  (firstAidNavigation + _easycom_u_button)();
}
const firstAidNavigation = () => "../../components/first-aid-navigation/first-aid-navigation.js";
const _sfc_main = {
  __name: "MaterialModule",
  setup(__props) {
    const medicalTrolleyCode = common_vendor.ref();
    const id = common_vendor.ref();
    common_vendor.onLoad((options) => {
      medicalTrolleyCode.value = options.code;
      id.value = options.id;
    });
    const inventoryRecords = common_vendor.ref([]);
    const materialInfoValue = common_vendor.ref({
      // 用于存储获取的物资信息
      countShould: 0,
      // 应有物资数
      countNow: 0,
      // 现有物资数
      supplementNum: "",
      // 应补充数
      expiredCloseNum: 0,
      // 即将过期数
      expiredNum: 0
      // 已过期数
    });
    common_vendor.onMounted(() => {
      getInfo();
    });
    async function getTakeStockInfo() {
      const data = {
        medicalTrolleyCode: medicalTrolleyCode.value
      };
      await api_inventoryInfo.getInvebtoryRecord(data).then((res) => {
        inventoryRecords.value = res.data.data.result;
      }).catch((error) => {
        console.error("Failed to fetch inventory record:", error);
      });
    }
    function navTest() {
      common_vendor.index.navigateTo({
        url: `/pages/checkInfo/index?code=${medicalTrolleyCode.value}&id=${id.value}`
      });
    }
    function navToDetailInfo() {
      common_vendor.index.navigateTo({
        url: `/pages/medicalInfo/index?code=${medicalTrolleyCode.value}&id=${id.value}`
      });
    }
    function handleUse() {
      common_vendor.index.navigateTo({
        url: `/pages/materialUseRegistration/index?code=${medicalTrolleyCode.value}&id=${id.value}`
      });
    }
    function handleInfo() {
      common_vendor.index.navigateTo({
        url: `/pages/materialInfoRegistration/index?code=${medicalTrolleyCode.value}&id=${id.value}`
      });
    }
    async function getMInfo() {
      const data = {
        code: medicalTrolleyCode.value
      };
      const res = await api_materialInfo.getMaterialInfo(data.code);
      processInventoryData(res.data.data);
    }
    function getInfo() {
      getMInfo();
      getTakeStockInfo();
    }
    function processInventoryData(data) {
      if (!data || !Array.isArray(data) || data.length === 0) {
        materialInfoValue.value = {
          countShould: 0,
          countNow: 0,
          supplementNum: "",
          expiredCloseNum: 0,
          expiredNum: 0
        };
        return;
      }
      let countShould = 0;
      let countNow = 0;
      let expiredCloseNum = 0;
      let expiredNum = 0;
      try {
        data.forEach((tier) => {
          tier.medicalConfigs.forEach((config) => {
            countShould += config.unitNum;
            config.medicalDetails.forEach((detail) => {
              if (!detail || typeof detail.total !== "number" || typeof detail.count !== "number" || !detail.expirationDate) {
                console.error("Detail data is incomplete or invalid.");
                return;
              }
              countNow += detail.count;
              const expirationDate = common_vendor.dayjs(detail.expirationDate);
              if (!expirationDate.isValid()) {
                console.error("Expiration date is invalid.");
                return;
              }
              const now = common_vendor.dayjs();
              const diff = expirationDate.diff(now, "day");
              if (detail.used === 0 && detail.available === 0) {
                if (diff < 0) {
                  expiredNum++;
                } else if (diff < 7 && diff >= 0) {
                  expiredCloseNum++;
                }
              }
            });
          });
        });
      } catch (e) {
        console.log(e);
      }
      materialInfoValue.value = {
        countShould,
        countNow,
        supplementNum: countShould - countNow + expiredNum,
        // 计算应补充数  
        expiredCloseNum,
        expiredNum
      };
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(common_vendor.unref(util_router.ReturnHomepage)),
        b: common_vendor.p({
          ["nav-text"]: common_vendor.unref(common_enum_enum.navEnum).medicalTrolleyInfo
        }),
        c: common_vendor.t(common_vendor.unref(common_enum_enum.navEnum).medicalTrolley),
        d: common_vendor.t(medicalTrolleyCode.value),
        e: common_vendor.t(common_vendor.unref(common_enum_enum.navEnum).materiralInfo),
        f: common_vendor.t(materialInfoValue.value.countShould),
        g: common_vendor.t(materialInfoValue.value.countNow),
        h: common_vendor.t(materialInfoValue.value.countShould - materialInfoValue.value.countNow + materialInfoValue.value.expiredNum),
        i: common_vendor.t(materialInfoValue.value.expiredCloseNum),
        j: common_vendor.t(materialInfoValue.value.expiredNum),
        k: common_vendor.o(navToDetailInfo),
        l: common_vendor.t(common_vendor.unref(common_enum_enum.navEnum).takeStock),
        m: inventoryRecords.value.length > 0
      }, inventoryRecords.value.length > 0 ? {
        n: common_vendor.f(inventoryRecords.value, (record, k0, i0) => {
          return {
            a: common_vendor.t(record.nurseName),
            b: common_vendor.t(record.inventoryTime),
            c: record.id
          };
        })
      } : {}, {
        o: common_vendor.o(navTest),
        p: common_vendor.o(handleInfo),
        q: common_vendor.o(handleUse)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-df85aa54"], ["__file", "G:/firstAidProject/app/FIRST-AID/first-aid/pages/MaterialModule/MaterialModule.vue"]]);
wx.createPage(MiniProgramPage);
