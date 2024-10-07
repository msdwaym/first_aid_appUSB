import { request } from "../util/request";

export function getInventoryRecord(data) {
	return request({
		url: "/inventoryRecord/getInventoryRecordByPage",
		method: "GET",
		data:data
	
	})
}