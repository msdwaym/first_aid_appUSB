"use strict";
const util_request = require("../util/request.js");
function getInventoryRecord(data) {
  return util_request.request({
    url: "/inventoryRecord/getInventoryRecordByPage",
    method: "GET",
    data
  });
}
exports.getInventoryRecord = getInventoryRecord;
