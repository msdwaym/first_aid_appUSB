"use strict";
const util_request = require("../util/request.js");
function getAppInfo() {
  return util_request.request({
    url: "app/getAppInfo",
    method: "GET"
  });
}
exports.getAppInfo = getAppInfo;
