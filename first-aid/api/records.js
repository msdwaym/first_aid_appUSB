import {request} from "../util/request";

export function getAdditionRecordByPage(data) {
    return request({
        url: "/inventoryRecord/getAdditionRecordByPage",
        method: "GET",
        data: data
    })
}

export function getConsumeRecordByPage(data) {
    return request({
        url: "/inventoryRecord/getConsumeRecordByPage",
        method: "GET",
        data: data
    })
}

// 初始标签
export function deleteCode(data) {
    return request({
        url: "/material/deleteById",
        method: "DELETE",
        data: data
    })
}

// 撤销使用物资
export function revertMaterial(data) {
    return request({
        url: "/material/revertMaterial",
        method: "POST",
        data: data
    })
}

// 撤销补充物资
export function modifyUnInvoked(data) {
    return request({
        url: "/material/modifyUnInvoked?id=" + data.id,
        method: "POST"
    })
}
