import { request } from "../util/request";

export function getMedicalByCode(data) {
    return request({
        url: "material/getMedicalByCode/" + data.code,
        method: "GET"
    })
}

export function addConsume(data) {
    return request({
        url: "material/addConsume",
        method: "POST",
        data: data
    })
}

export function addConsumeListWithUpdate(data) {
    return request({
        url: "material/addConsumeListWithUpdate",
        method: "POST",
        data: data
    })
}

export function getMedicalByDetailId(data){
	return request({
		url:`material/getMedicalForInventoryRecord/${data}`,
		method:'GET'
	})
}
