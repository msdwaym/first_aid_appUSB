"use strict";
const common_vendor = require("../common/vendor.js");
const util_token = require("./token.js");
let baseURL = "http://192.168.169.159:11307/";
const request = (options) => {
  return new Promise((resolve, reject) => {
    let token = util_token.getToken();
    common_vendor.index.request({
      timeout: 1e4,
      url: baseURL + options.url,
      // method 有效值必须大写 GET/POST/PUT/DELETE
      method: options.method || "GET",
      data: options.data || {},
      header: {
        "Authorization": token,
        "macAddress": "macAddressTest",
        ...options.params
      },
      success: (res) => {
        const callback = res.data;
        console.log(callback);
        if (callback && callback.data && callback.data.token) {
          util_token.setToken(callback.data.token);
        }
        resolve(res);
      },
      fail: (err) => {
        console.log(err);
        reject(err);
      }
    });
  });
};
exports.request = request;
