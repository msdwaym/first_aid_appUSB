"use strict";
const util_request = require("../util/request.js");
function getHospitalList() {
  return util_request.request({
    url: "hospital/list",
    method: "GET"
  });
}
function getDepartmentList(opts) {
  return util_request.request({
    url: "department/getDepartmentList",
    method: "GET",
    data: opts
  });
}
function userRegister(opts, macAddress) {
  return util_request.request({
    url: "nurse/register",
    method: "POST",
    data: opts,
    params: { macAddress }
  });
}
exports.getDepartmentList = getDepartmentList;
exports.getHospitalList = getHospitalList;
exports.userRegister = userRegister;
