import { request } from "../util/request";

export function getMaterialInfo(data) {
	// console.log(data);
	return request({
		url: `medicalTrolley/getMedicalTrolleyTierDetailByTierId/${data}`,
		method: "GET"
	})
}

//物资消耗记录查询
export function getMaterialUsed(data){
	// console.log(data);
	return request({
		url:'inventoryRecord/getConsumeRecordByPage',
		method:'GET',
		data
	})
}

//物资消耗操作还原
export function revertMaterial(data){
	return request({
		url:'material/revertMaterial',
		method:'POST',
		data
	})
}

//根据盘点记录id查询消耗物资信息
export function getInfoByInventoryId(data){
	return request({
		url:'inventoryRecord/getInfoByInventoryId',
		method:'GET',
		data
	})
}
