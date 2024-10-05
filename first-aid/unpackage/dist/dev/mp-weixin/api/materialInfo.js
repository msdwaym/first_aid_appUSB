"use strict";
const util_request = require("../util/request.js");
function getMaterialInfo(data) {
  return util_request.request({
    url: `medicalTrolley/getMedicalTrolleyTierDetailByTierId/${data}`,
    method: "GET"
  });
}
function getMaterialUsed(data) {
  return util_request.request({
    url: "/inventoryRecord/getConsumeRecordByPage",
    method: "GET",
    data
  });
}
exports.getMaterialInfo = getMaterialInfo;
exports.getMaterialUsed = getMaterialUsed;
