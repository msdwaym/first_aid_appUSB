// 填充方法
function padString(str) {
    let paddingLength = 24 - str.length;
    let padding = '';
    for (let i = 0; i < paddingLength; i++) {
        padding += '0';
    }
    return padding + str;
}

// 还原方法
function restoreString(paddedStr) {
    try{
    	const data = paddedStr.replace(/^0+/, '');
    	return data;
    }catch{
    	return paddedStr;
    }
}

export {
    padString,
    restoreString,
}