const G1MachineModule = uni.requireNativePlugin('G1MachineModule')
/**
 * 初始化
 */
export function initMachine() {
	return G1MachineModule.init();
}

/**
 * 开始扫描
 */
export function startMachine() {
	return G1MachineModule.start();
}

/**
 * 停止扫描
 */
export function stopMachine() {
	return G1MachineModule.stop();
}

/**
 * 结束扫描
 */
// export function endMachine(voice = true) {
// 	try{
// 		if (voice) {
// 			const src = '/static/voice/beep.wav'
// 			const sound = createAudioPlayer(src)
// 			sound.play()
// 		}
// 	} catch(err) {
// 		console.log(err);
// 	}
// 	// const response = MachineModule.end();
// 	if (response.code === 200) {
// 		response.data = response.data.map((item) => restoreString(item));
// 	}
// 	return response;
// }

/**
 * 读取信号最大最强的标签
 */
export function readMachine() {
	// const response = MachineModule.read(0,null,2,6,1);
	if (response.code === 200) {
		response.data = restoreString(response.data);
	}
	return response;
}

/**
 * 写标签(EPC区)
 */
export function writeEPCMachine(str) {
	// return MachineModule.writeEPC(0, padString(str), null);
}