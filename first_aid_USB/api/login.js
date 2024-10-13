import {request} from "../util/request";

export function userLogin(data, macAddress) {
    return request({
        url: "user/login",
        method: "POST",
        data: data,
        params: {
            macAddress: "c4:6e:33:83:6b:1f"
        }
    })
}
