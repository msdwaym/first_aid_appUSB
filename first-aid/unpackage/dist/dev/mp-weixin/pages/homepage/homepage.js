"use strict";
const common_vendor = require("../../common/vendor.js");
const common_enum_enum = require("../../common/enum/enum.js");
const util_router = require("../../util/router.js");
const api_userInfo = require("../../api/userInfo.js");
const api_medicalTrolleyInfo = require("../../api/medicalTrolleyInfo.js");
const util_machine = require("../../util/machine.js");
const util_encode = require("../../util/encode.js");
const common_assets = require("../../common/assets.js");
const firstAidNavigation = () => "../../components/first-aid-navigation/first-aid-navigation.js";
const InfoCardBoxVue = () => "../../components/InfoCardBox/InfoCardBox.js";
const _sfc_main = {
  components: {
    firstAidNavigation,
    InfoCardBoxVue
  },
  computed: {
    navEnum() {
      return common_enum_enum.navEnum;
    },
    materialEnum() {
      return common_enum_enum.materialEnum;
    },
    mainBlue() {
      return colorsTotal.mainBlue;
    }
  },
  data() {
    return {
      isActive: null,
      // 可以是 'prev', 'next', 或 null  
      items: [],
      departmentName: "",
      searchInput: "",
      filteredItems: [],
      showHighlight: false,
      steps: [
        {
          class: ".SearchBoxCss",
          text: "操作一：你好，这是第一次提示。"
        }
      ]
    };
  },
  methods: {
    Return: util_router.Return,
    showDetail(items) {
      common_vendor.index.navigateTo({
        url: `/pages/MaterialModule/MaterialModule?code=${items.medicalTrolleyCode}&id=${items.id}`
      });
    },
    getAmbulanceInfo: async function() {
      try {
        const data = await api_userInfo.getNurseInfo();
        this.departmentName = data.data.data.department;
        const res = await api_medicalTrolleyInfo.getMedicalTrolleyInfo();
        const sortedItems = res.data.data.sort((a, b) => new Date(b.registrationTime) - new Date(a.registrationTime));
        this.items = sortedItems;
        this.filteredItems = sortedItems;
      } catch (error) {
        console.error("Failed to fetch medical trolley info:", error);
      }
    },
    toMedicalTrolleyRecord() {
      common_vendor.index.navigateTo({
        url: `/pages/medicalTrolleyRecord/medicalTrolleyRecord`
      });
    },
    handleScan: async function() {
      common_vendor.index.showLoading({
        title: "正在扫描标签，请稍后",
        mask: true
        // 显示遮罩层，防止用户进行其他操作  
      });
      util_machine.initMachine();
      const readMachineData = util_machine.readMachine(0, null, 2, 6, 1);
      if (readMachineData.data === "CMD_NO_TAG_ERROR") {
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: "未扫描到标签",
          icon: "none",
          duration: 2e3
        });
        util_machine.endMachine();
      } else {
        try {
          const restoreCode = util_encode.restoreString(readMachineData.data);
          const matchedItem = this.items.find((item) => item.medicalTrolleyCode === restoreCode);
          if (matchedItem) {
            common_vendor.index.navigateTo({
              url: `/pages/MaterialModule/MaterialModule?code=${matchedItem.medicalTrolleyCode}&id=${matchedItem.id}`
            });
          } else {
            common_vendor.index.showToast({
              title: "未扫描到所在科室的急救车编码",
              icon: "none",
              duration: 2e3
            });
          }
          common_vendor.index.hideLoading();
          util_machine.endMachine();
        } catch (error) {
          console.error("扫描过程中发生错误:", error);
          common_vendor.index.hideLoading();
          util_machine.endMachine();
        }
      }
    },
    handleInput(value) {
      this.searchInput = value;
      if (value == "" || value == null) {
        this.filteredItems = this.items;
      }
    },
    handleSearchConfirm() {
      this.filteredItems = this.items.filter((item) => item.medicalTrolleyCode === this.searchInput);
    }
  },
  onShow() {
    this.searchInput = "";
    this.getAmbulanceInfo();
  },
  onReady() {
    this.$refs.step.start();
  }
  // created() {  
  // 	Vue.$on('update:highlight', (highlight) => {  
  // 		this.showHighlight = highlight;  
  // 	});  
  // },  
  // beforeDestroy() {  
  //     // 组件销毁前移除事件监听器，防止内存泄漏  
  //     Vue.$off('update:highlight');  
  // }
};
if (!Array) {
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  const _component_InfoCardBoxVue = common_vendor.resolveComponent("InfoCardBoxVue");
  const _easycom_yi_step_tip2 = common_vendor.resolveComponent("yi-step-tip");
  (_easycom_uni_search_bar2 + _component_InfoCardBoxVue + _easycom_yi_step_tip2)();
}
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
const _easycom_yi_step_tip = () => "../../uni_modules/yi-step-tip/components/yi-step-tip/yi-step-tip.js";
if (!Math) {
  (_easycom_uni_search_bar + _easycom_yi_step_tip)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_assets._imports_0$1,
    b: common_vendor.o($options.handleSearchConfirm),
    c: common_vendor.o($options.handleInput),
    d: $data.showHighlight ? 1 : "",
    e: common_vendor.o(($event) => $data.searchInput = $event),
    f: common_vendor.p({
      radius: "100",
      placeholder: "请输入急救车编号",
      cancelButton: "none",
      modelValue: $data.searchInput
    }),
    g: common_vendor.f($data.filteredItems, (item, index, i0) => {
      return {
        a: "602faf90-1-" + i0,
        b: common_vendor.p({
          showDetail: () => $options.showDetail(item),
          viewDate: $data.departmentName,
          view1Date: item.medicalTrolleyCode,
          view2Date: item.registrationTime
        }),
        c: index,
        d: common_vendor.o(() => $options.showDetail(item), index)
      };
    }),
    h: $data.filteredItems.length === 0
  }, $data.filteredItems.length === 0 ? {} : {}, {
    i: common_vendor.sr("step", "602faf90-2"),
    j: common_vendor.p({
      steps: $data.steps
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-602faf90"], ["__file", "G:/firstAidProject/app/FIRST-AID/first-aid/pages/homepage/homepage.vue"]]);
wx.createPage(MiniProgramPage);
