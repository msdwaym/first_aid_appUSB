import { request } from "@/util/request"
export function getMedicalTrolleyInfo() {
    return request({
		url:'medicalTrolley/getMedicalTrolley',
		method:'GET',
	})
}

//获取急救车编码
export function getCode(data){
	return request({
		url:'/encode/getTrolleyEncode',
		method:'GET',
		data:data
	})
}

//新增急救车
export function addMedicalTrolley(data){
	return request({
		url:'medicalTrolley/addMedicalTrolley',
		method:'POST',
		data:data
	})
}

//获取模板信息
export function getConfigTemplateList(id){
    return request({
        url:`/medicalTrolley/getConfigTemplate/list?hospitalId=${id}`,
        method:"get"
    })
}