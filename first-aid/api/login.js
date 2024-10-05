import {request} from "../util/request";

export function userLogin(data, macAddress) {
    return request({
        url: "user/login",
        method: "POST",
        data: data,
        params: {
            macAddress: 12121221
        }
    })
}