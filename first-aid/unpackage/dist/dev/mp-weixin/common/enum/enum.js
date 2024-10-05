"use strict";
const errorEnum = {
  JUMP: "跳转失败",
  LOAD: "本地加载失败",
  NET_WORK: "网路异常",
  LOGIN: "登录失效",
  NONE: "输入值不能为空",
  CACHE_NONE: "缓存失效，请重新进入",
  MAX_SIZE: "输入文件最大\n不能超过100M"
};
const navEnum = {
  EVENT_FILTER: "事件过滤器",
  TITLE: "主题/标题",
  register: "用户注册",
  medicalTrolleyInfo: "急救车信息",
  medicalTrolley: "急救车",
  materiralInfo: "物资信息",
  takeStock: "盘点情况",
  materialUsed: "物资使用记录",
  userInfo: "个人信息",
  report: "报表",
  feedback: "反馈",
  reviseInfo: "信息修改",
  medicalTrolleyRecord: "急救车登记",
  /* 加载中 */
  DATA_LOADING: "数据构造中"
};
const materialEnum = {
  materialUseNum: "用量",
  //物资使用量
  materialRemainingNum: "剩余"
  //物资剩余量
};
exports.errorEnum = errorEnum;
exports.materialEnum = materialEnum;
exports.navEnum = navEnum;
