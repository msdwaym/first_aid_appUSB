"use strict";
const util_request = require("../util/request.js");
function reviseName(name) {
  return util_request.request({
    url: "/nurse/modifyName",
    method: "POST",
    data: name
  });
}
function getNurseInfo() {
  return util_request.request({
    url: "/nurse/getNurse",
    method: "GET",
    params: {
      MacAddress: ""
    }
  });
}
function revisePassword(data) {
  return util_request.request({
    url: "/user/password",
    method: "POST",
    data
  });
}
function LoginOut() {
  return util_request.request({
    url: "user/logout",
    method: "GET",
    params: {
      MacAddress: "12121221"
    }
  });
}
exports.LoginOut = LoginOut;
exports.getNurseInfo = getNurseInfo;
exports.reviseName = reviseName;
exports.revisePassword = revisePassword;
