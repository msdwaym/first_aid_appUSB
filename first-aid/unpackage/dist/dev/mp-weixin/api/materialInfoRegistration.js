"use strict";
const util_request = require("../util/request.js");
function getMedicalEncode(data) {
  return util_request.request({
    url: "/encode/getMedicalEncode",
    method: "POST",
    data
  });
}
function addMaterial(data) {
  return util_request.request({
    url: "material/add/",
    method: "POST",
    data
  });
}
exports.addMaterial = addMaterial;
exports.getMedicalEncode = getMedicalEncode;
