import { request } from "@/util/request";

export function getTerminalInfoByAccountId(data) {
	return request({
		url: `terminal/getMacInfoByAccountId?accountId=${data}`,
		method: "GET",
		params:{
			MacAddress:""
		}
		// data 请求体 header 请求头
	})
}