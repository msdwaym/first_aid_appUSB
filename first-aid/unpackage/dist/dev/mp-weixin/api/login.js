"use strict";
const util_request = require("../util/request.js");
function userLogin(data, macAddress) {
  return util_request.request({
    url: "user/login",
    method: "POST",
    data,
    params: {
      Macaddress: macAddress
    }
  });
}
exports.userLogin = userLogin;
