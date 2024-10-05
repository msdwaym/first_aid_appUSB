"use strict";
const util_request = require("../util/request.js");
function getInvebtoryRecord(data) {
  return util_request.request({
    url: "inventoryRecord/getInventoryRecordByPage",
    method: "GET",
    data
  });
}
exports.getInvebtoryRecord = getInvebtoryRecord;
