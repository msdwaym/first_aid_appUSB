import {request} from "../util/request";

export function getCheckInfoList(data) {
    return request({
        url: "medicalTrolley/getMedicalTrolleyTierDetailByTierId/" + data.code,
        method: "GET"
    })
}

export function getMedicalEncode(data) {
    return request({
        url: "/encode/getMedicalEncode",
        method: "POST",
        data: data
    })
}

export function addMaterial(data) {
    return request({
        url: "material/add/",
        method: "POST",
        data: data
    })
}

export function modifyInvoked(data) {
    return request({
        url: "material/modifyInvoked/",
        method: "POST",
        data: data
    })
}

export function getMedicalByCode(data) {
    return request({
        url: "material/getMedicalByCode/" + data,
        method: "GET"
    })
}
