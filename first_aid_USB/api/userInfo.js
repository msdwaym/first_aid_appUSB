import { request } from "@/util/request"


// 修改护士姓名
export function reviseName(name){
	return request({
		url:'/nurse/modifyName',
		method:'POST',
		data:name
	})
}

// 获取护士信息
export function getNurseInfo(){
	return request({
		url:'/nurse/getNurse',
		method:'GET',
		params:{
			MacAddress:""
		}
	})
}

//修改密码
export function revisePassword(data){
	return request({
		url:'/user/password',
		method:'POST',
		data:data
	})
}

//退出登录
export function LoginOut(){
	return request({
		url:'user/logout',
		method:'GET'
	})
}

//获取账号信息
export function getAccountInfo(){
	return request({
		url:'user/getLoginAccount',
		method:'GET'
	})
}