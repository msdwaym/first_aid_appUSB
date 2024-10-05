"use strict";
const common_enum_enum = require("../../common/enum/enum.js");
const api_report = require("../../api/report.js");
const api_userInfo = require("../../api/userInfo.js");
const common_vendor = require("../../common/vendor.js");
const firstAidNavigation = () => "../../components/first-aid-navigation/first-aid-navigation.js";
const dataTimePicker = () => "../../uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.js";
const _sfc_main = {
  components: {
    firstAidNavigation,
    dataTimePicker
  },
  computed: {
    navEnum() {
      return common_enum_enum.navEnum;
    }
  },
  methods: {
    getInventory: async function(data1) {
      try {
        const res = await api_report.getInventoryRecord(data1);
        const data = await api_userInfo.getNurseInfo();
        if (res.data && data.data && res.data.data && data.data.data) {
          if (res.data.data.result.hospitalName === data.data.data.hospitalName) {
            if (res.data.code === 200) {
              this.inventoryRecords = res.data.data.result;
              this.totalRecords = res.data.data.total;
            } else {
              console.error("获取库存记录失败，状态码：", res.data.code);
            }
          } else {
            console.warn("暂未获取到该医院下的报表");
          }
        } else {
          console.error("数据不完整，无法处理");
        }
      } catch (error) {
        console.error("获取数据时发生错误：", error);
      }
    },
    search(res) {
      const data = {
        medicalTrolleyCode: res.value
      };
      this.getInventory(data);
    },
    clear(res) {
      this.getInventory();
    },
    change(e) {
      const data = {
        startTime: e[0],
        endTime: e[1]
      };
      this.getInventory(data);
    },
    tabChange(index) {
      this.datetimerange = "";
      let startTime1, endTime1;
      const now = /* @__PURE__ */ new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1;
      const day = now.getDate();
      let data;
      switch (index.index) {
        case 1:
          startTime1 = new Date(year, month - 1, day, 0 + 8, 0, 0);
          endTime1 = new Date(year, month - 1, day, 23 + 8, 59, 59);
          break;
        case 2:
          const startDayOfWeek = now.getDate() - now.getDay() + (now.getDay() === 0 ? -6 : 0);
          startTime1 = new Date(year, month - 1, startDayOfWeek, 0 + 8, 0, 0);
          endTime1 = new Date(year, month - 1, startDayOfWeek + 6, 23 + 8, 59, 59);
          break;
        case 3:
          startTime1 = new Date(year, month - 1, 1, 0 + 8, 0, 0);
          endTime1 = new Date(year, month, 0, 23 + 8, 59, 59);
          break;
        default:
          startTime1 = "";
          endTime1 = "";
          break;
      }
      if (index.index != 0) {
        data = {
          startTime: this.formatDateTime(startTime1.toISOString()),
          endTime: this.formatDateTime(endTime1.toISOString())
        };
      } else if (index.index == 0) {
        data = {
          startTime: startTime1,
          endTime: endTime1
        };
      }
      this.getInventory(data);
    },
    formatDateTime(dateTimeStr) {
      const match = dateTimeStr.match(/^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}:\d{2})(?:\.\d+)?(Z?)$/);
      if (!match) {
        throw new Error("Invalid date-time format");
      }
      return `${match[1]} ${match[2]}`;
    },
    async nextPage() {
      if (this.currentPage < Math.ceil(this.totalRecords / this.pageSize)) {
        this.currentPage++;
        const data = {
          // ... 其他分页参数，比如 pageSize, pageNumber（这里为 currentPage）  
          pageNum: this.currentPage,
          pageSize: this.pageSize
        };
        await this.getInventory(data);
      }
    },
    async returnPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        const data = {
          // ... 其他分页参数，比如 pageSize, pageNumber（这里为 currentPage）  
          pageNum: this.currentPage,
          pageSize: this.pageSize
        };
        await this.getInventory(data);
      }
    }
  },
  data() {
    return {
      isActive: null,
      // 可以是 'prev', 'next', 或 null  
      tabsList: [
        {
          name: "全部"
        },
        {
          name: "今日"
        },
        {
          name: "本周"
        },
        {
          name: "本月"
        }
      ],
      inventoryRecords: [],
      datetimerange: "",
      searchValue: "",
      currentPage: 1,
      // 当前页码  
      pageSize: 10,
      // 每页显示的记录数  
      totalRecords: 0
    };
  },
  onShow() {
    this.searchValue = "";
    this.getInventory();
  }
};
if (!Array) {
  const _component_firstAidNavigation = common_vendor.resolveComponent("firstAidNavigation");
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  const _easycom_u_tabs2 = common_vendor.resolveComponent("u-tabs");
  const _component_uni_section = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_datetime_picker2 = common_vendor.resolveComponent("uni-datetime-picker");
  const _easycom_uni_th2 = common_vendor.resolveComponent("uni-th");
  const _easycom_uni_tr2 = common_vendor.resolveComponent("uni-tr");
  const _easycom_uni_td2 = common_vendor.resolveComponent("uni-td");
  const _easycom_uni_table2 = common_vendor.resolveComponent("uni-table");
  (_component_firstAidNavigation + _easycom_uni_search_bar2 + _easycom_u_tabs2 + _component_uni_section + _easycom_uni_datetime_picker2 + _easycom_uni_th2 + _easycom_uni_tr2 + _easycom_uni_td2 + _easycom_uni_table2)();
}
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
const _easycom_u_tabs = () => "../../node-modules/uview-plus/components/u-tabs/u-tabs.js";
const _easycom_uni_datetime_picker = () => "../../uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.js";
const _easycom_uni_th = () => "../../uni_modules/uni-table/components/uni-th/uni-th.js";
const _easycom_uni_tr = () => "../../uni_modules/uni-table/components/uni-tr/uni-tr.js";
const _easycom_uni_td = () => "../../uni_modules/uni-table/components/uni-td/uni-td.js";
const _easycom_uni_table = () => "../../uni_modules/uni-table/components/uni-table/uni-table.js";
if (!Math) {
  (_easycom_uni_search_bar + _easycom_u_tabs + _easycom_uni_datetime_picker + _easycom_uni_th + _easycom_uni_tr + _easycom_uni_td + _easycom_uni_table)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      isReturn: false,
      ["nav-text"]: $options.navEnum.report
    }),
    b: common_vendor.o($options.clear),
    c: common_vendor.o($options.search),
    d: common_vendor.o(_ctx.input),
    e: common_vendor.o(($event) => $data.searchValue = $event),
    f: common_vendor.p({
      placeholder: "请输入急救车编码",
      radius: "100",
      cancelButton: "none",
      modelValue: $data.searchValue
    }),
    g: common_vendor.o($options.tabChange),
    h: common_vendor.p({
      activeStyle: {
        color: "rgba(137, 207, 251, 1)",
        fontWeight: "bold",
        transform: "scale(1.05)"
      },
      inactiveStyle: {
        color: "#606266",
        transform: "scale(1)"
      },
      list: $data.tabsList,
      lineColor: "rgba(137, 207, 251, 1)"
    }),
    i: common_vendor.p({
      title: "日期时间范围用法：[" + $data.datetimerange + "]",
      type: "line"
    }),
    j: common_vendor.o($options.change),
    k: common_vendor.o(($event) => $data.datetimerange = $event),
    l: common_vendor.p({
      rangeSeparator: "至",
      type: "datetimerange",
      modelValue: $data.datetimerange
    }),
    m: common_vendor.p({
      align: "center"
    }),
    n: common_vendor.p({
      align: "center"
    }),
    o: common_vendor.p({
      align: "center"
    }),
    p: common_vendor.p({
      align: "center"
    }),
    q: common_vendor.f($data.inventoryRecords, (record, k0, i0) => {
      return {
        a: common_vendor.t(record.inventoryTime),
        b: "12a8021c-12-" + i0 + "," + ("12a8021c-11-" + i0),
        c: common_vendor.t(record.nurseName),
        d: "12a8021c-13-" + i0 + "," + ("12a8021c-11-" + i0),
        e: common_vendor.t(record.medicalTrolleyCode),
        f: "12a8021c-14-" + i0 + "," + ("12a8021c-11-" + i0),
        g: common_vendor.t(record.warningRecordId || "无"),
        h: "12a8021c-15-" + i0 + "," + ("12a8021c-11-" + i0),
        i: record.id,
        j: "12a8021c-11-" + i0 + ",12a8021c-5"
      };
    }),
    r: common_vendor.p({
      align: "center"
    }),
    s: common_vendor.p({
      align: "center"
    }),
    t: common_vendor.p({
      align: "center"
    }),
    v: common_vendor.p({
      align: "center"
    }),
    w: common_vendor.p({
      border: true,
      emptyText: "暂无更多数据",
      stripe: true
    }),
    x: common_vendor.o((...args) => $options.returnPage && $options.returnPage(...args)),
    y: common_vendor.o((...args) => $options.nextPage && $options.nextPage(...args)),
    z: common_vendor.t($data.currentPage),
    A: common_vendor.t($data.totalRecords)
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-12a8021c"], ["__file", "G:/firstAidProject/app/FIRST-AID/first-aid/pages/report/report.vue"]]);
wx.createPage(MiniProgramPage);
