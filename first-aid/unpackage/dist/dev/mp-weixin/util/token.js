"use strict";
const common_vendor = require("../common/vendor.js");
const setToken = (token) => {
  common_vendor.index.setStorageSync("token", token);
};
const getToken = () => {
  return common_vendor.index.getStorageSync("token");
};
const removeToken = () => {
  common_vendor.index.setStorageSync("token", "");
};
exports.getToken = getToken;
exports.removeToken = removeToken;
exports.setToken = setToken;
