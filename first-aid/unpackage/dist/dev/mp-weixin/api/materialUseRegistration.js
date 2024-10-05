"use strict";
const util_request = require("../util/request.js");
function getMedicalByCode(data) {
  return util_request.request({
    url: "material/getMedicalByCode/" + data.code,
    method: "GET"
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
exports.getMedicalByCode = getMedicalByCode;
