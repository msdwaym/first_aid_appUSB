"use strict";
const util_request = require("../util/request.js");
function getAppInfo() {
  return util_request.request({
    url: "app/getAppInfo",
    method: "GET"
    // data 请求体 header 请求头
  });
}
exports.getAppInfo = getAppInfo;
