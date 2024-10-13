import {request} from "../util/request";

export function getAppInfo(data) {
    return request({
        url: "app/appVersion",
        method: "POST",
		data:data
    })
}