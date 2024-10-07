import { request } from "../util/request";

export function getInvebtoryRecord(data) {
	// console.log(data);
	return request({
		url: "inventoryRecord/getInventoryRecordByPage",
		method: "GET",
		data:data
	})
}