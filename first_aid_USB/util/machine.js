import {createAudioPlayer} from '@/util/audioPlayer.js'
import {padString, restoreString} from "./encode";
// const MachineModule = uni.requireNativePlugin("MachineModule")
const MachineModule = uni.requireNativePlugin("USBMachineModule")

/**
 * 测试插件连接
 */
export function testMachine() {
	
	return MachineModule.test();
}

/**
 * 初始化扫描
 */
export function initMachine() {
	return MachineModule.init();
}

/**
 * 开始扫描
 */
export function startMachine() {
	return MachineModule.start();
}

/**
 * 停止扫描
 */
export function stopMachine() {
	return MachineModule.stop();
}

/**
 * 结束扫描
 */
export function endMachine(voice = true) {
	try{
		if (voice) {
			const src = '/static/voice/beep.wav'
			const sound = createAudioPlayer(src)
			sound.play()
		}
	} catch(err) {
		console.log(err);
	}
	const response = MachineModule.end();
	if (response.code === 200) {
		response.data = response.data.map((item) => restoreString(item));
	}
	return response;
}

/**
 * 获取标签
 */
export function getTagsMachine() {
	const response = MachineModule.getTags();
	if (response.code === 200) {
		response.data = response.data.map((item) => restoreString(item));
	}
	return response;
}

/**
 * 读取信号最大最强的标签
 */
export function readMachine( isLoop = false) {
	/**
	 * type     写入方式 0: HEX编码 1: ASCII编码 2或者其他 : utf8
	 * password 密码
	 * index    起始地址 默认2
	 * block    块数 默认 6
	 * area     区域 默认 1  0-保留区 1-EPC区 2-TID区 3-USER区
	 */
	let response = null;
	if(isLoop){
		response = MachineModule.loopRead();
		// if (response.code === 200) {
			// response.data = restoreString(response.data);
		// }
	}else{
		response = MachineModule.singleRead();
		// if (response.code === 200) {
			// response.data = restoreString(response.data);
		// }
	}
	return response;
}

/**
 * 写标签
 * @param str 标签值
 */
export function writeMachine(str) {
	/**
	 * @param type     写入方式 0: HEX编码 1: ASCII编码 2或者其他 : utf8
	 * @param str 标签值
	 * @param password 密码
	 * @param index    起始地址
	 * @param area     区域 默认 1  0-保留区 1-EPC区 2-TID区 3-USER区
	 */
	return MachineModule.writeEPC(0, padString(str), null);
}

/**
 * 设置扫描范围
 * @param power
 */
export function setPower(power) {
	return MachineModule.setPower(power);
}

/**
 * 获取扫描范围
 */
export function getPower() {
	return MachineModule.getPower();
}

/**
 * 设置提示音
 * @param context 上下文
 */
export function beep(context) {
	return MachineModule.beep(context);
}
