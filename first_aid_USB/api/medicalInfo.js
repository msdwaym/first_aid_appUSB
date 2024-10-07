import {request} from "../util/request";

// 获取物资类型
export function getMedicalList(){
    return request({
        url:`/medicalTrolley/getMedicalIdAndName`,
        method:"GET"
    })
}

export function addDetailConfig(data) {
    return request({
        url:`/medicalTrolley/addDetailConfig`,
        method:"post",
        data
    })
}

// 新增/删除物资项目栏位使用，删除时需要判断是否达到最大值
export function reviseMedical(data){
    console.log(data)
    return request({
        url:`/medicalTrolley/updateMedicalConfig`,
        method:"put",
        data
    })
}

// 删除类型，需要判断是否存在具体物资
export function deleteMedicalById(id){
    return request({
        url:`/medicalTrolley/deleteMedical/${id}`,
        method:"delete"
    })
}

export function getMedicalByCode(data) {
    return request({
        url: "material/getMedicalByCode/" + data.code,
        method: "GET"
    })
}