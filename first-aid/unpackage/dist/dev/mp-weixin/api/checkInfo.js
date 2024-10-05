"use strict";
const util_request = require("../util/request.js");
function getCheckInfoList(data) {
  return util_request.request({
    url: "medicalTrolley/getMedicalTrolleyTierDetailByTierId/" + data.code,
    method: "GET"
  });
}
function getMedicalByCode(data) {
  return util_request.request({
    url: "material/getMedicalByCode/" + data.code,
    method: "GET"
  });
}
function addInventoryRecord(data) {
  return util_request.request({
    url: "inventoryRecord/addInventory",
    method: "POST",
    data
  });
}
function addWarning(data) {
  return util_request.request({
    url: "warningRecord/addWarning",
    method: "POST",
    data
  });
}
function addConsume(data) {
  return util_request.request({
    url: "material/addConsume",
    method: "POST",
    data
  });
}
exports.addConsume = addConsume;
exports.addInventoryRecord = addInventoryRecord;
exports.addWarning = addWarning;
exports.getCheckInfoList = getCheckInfoList;
exports.getMedicalByCode = getMedicalByCode;
