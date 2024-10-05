const setToken = (token) => {
    uni.setStorageSync('token', token);
}

const getToken = () => {
	return uni.getStorageSync('token');
}

const removeToken = () => {
    uni.setStorageSync('token', '');
}

const getMacAddress = () =>{
	return uni.getStorageSync('MacAddress');
}
export {setToken,getToken,removeToken,getMacAddress}