import { request } from "@/util/request";

export function getAppInfo() {
	return request({
		url: "app/getAppInfo",
		method: "GET"
	})
}
