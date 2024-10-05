import { request } from "../util/request";

export function getCheckInfoList(data) {
    return request({
        url: "medicalTrolley/getMedicalTrolleyTierDetailByTierId/" + data.code,
        method: "GET"
    })
}

export function getTierListInfo(data) {
    return request({
        url: "medicalTrolley/getMedicalTrolleyTierInfoByTierId/" + data.code,
        method: "GET"
    })
}

export function getMedicalByCode(data) {
    return request({
        url: "material/getMedicalByCode/" + data.code,
        method: "GET"
    })
}

export function getMedicalMedicalConfigInfoByTierId(data) {
    return request({
        url: "medicalTrolley/getMedicalMedicalConfigInfoByTierId/" + data,
        method: "GET"
    })
}

export function getNurseInfoList() {
    return request({
        url: "nurse/list",
        method: "GET"
    })
}

export function addInventoryRecord(data) {
    return request({
        url: "inventoryRecord/addInventory",
        method: "POST",
		data: data
    })
}

export function inventoryComplete(data) {
    return request({
        url: "inventoryRecord/inventoryComplete",
        method: "POST",
        data: data
    })
}

export function addWarning(data) {
    return request({
        url: "warningRecord/addWarning",
        method: "POST",
        data: data
    })
}

export function addConsumeList(data) {
    return request({
        url: "material/addConsumeList",
        method: "POST",
        data: data
    })
}
