import {request} from "../util/request";

export function getHospitalList() {
    return request({
        url: "hospital/list",
        method: "GET",
    })
}

export function getDepartmentList(opts) {
    return request({
        url: "department/getDepartmentList",
        method: "GET",
        data: opts
    })
}

export function userRegister(opts, macAddress) {
    return request({
        url: "nurse/register",
        method: "POST",
        data: opts,
        params: {macAddress}
    })
}