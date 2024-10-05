"use strict";
function padString(str) {
  let paddingLength = 24 - str.length;
  let padding = "";
  for (let i = 0; i < paddingLength; i++) {
    padding += "0";
  }
  return padding + str;
}
function restoreString(paddedStr) {
  return paddedStr.replace(/^0+/, "");
}
exports.padString = padString;
exports.restoreString = restoreString;
