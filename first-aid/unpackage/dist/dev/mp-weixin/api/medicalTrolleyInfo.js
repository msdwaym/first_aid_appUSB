"use strict";
const util_request = require("../util/request.js");
function getMedicalTrolleyInfo() {
  return util_request.request({
    url: "medicalTrolley/getMedicalTrolley",
    method: "GET"
  });
}
function getCode(data) {
  return util_request.request({
    url: "/encode/getTrolleyEncode",
    method: "GET",
    data
  });
}
function addMedicalTrolley(data) {
  return util_request.request({
    url: "medicalTrolley/addMedicalTrolley",
    method: "POST",
    data
  });
}
exports.addMedicalTrolley = addMedicalTrolley;
exports.getCode = getCode;
exports.getMedicalTrolleyInfo = getMedicalTrolleyInfo;
