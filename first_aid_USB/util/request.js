import { getToken, setToken, getMacAddress} from "./token";

let baseURL = 'http://8.137.126.114/api/';
// let baseURL = 'http://121.37.171.243:11307/';

export const request = (options) => {
	return new Promise((resolve, reject) => {
		// 检查是否有 token ，并且不是登录注册页面的请求
		let token = getToken();

		uni.request({
			timeout: 5000,
			url: baseURL + options.url,
			// method 有效值必须大写 GET/POST/PUT/DELETE
			method: options.method || 'GET',
			data: options.data || {},
			header: {
				'macAddress': 'macAddressTest',
				'Authorization': getToken(),
				...options.params,
			},
			success: (res) => {
				// 检查接口返回中是否有新的 token
				const callback = res.data;
				console.log(callback);
				if (callback && callback.data && callback.data.token) {
					setToken(callback.data.token);
				}
				resolve(res);
			},
			fail: (err) => {
				console.log(err);
				reject(err);
			}
		});
	});
}
