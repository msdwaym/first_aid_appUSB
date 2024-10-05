import {createAudioPlayer} from '@/util/audioPlayer.js'
import {padString, restoreString} from "./encode";
import { error } from 'uview-plus';

let MachineModule = null;
  
export async function initializeMachineModule() {
  try {
    const systemInfo = await uni.getSystemInfo();
    if (systemInfo.model === 'R800C') {
      MachineModule = uni.requireNativePlugin("MachineModule");
	  return "MachineModule";
    } else {
      MachineModule = uni.requireNativePlugin("G1MachineModule");
	  return "G1MachineModule";
    }
  } catch (error) {
    console.error("Failed to initialize machine module:", error);
  }
}  
/**
 * 测试插件连接
 */
export  function testMachine() {
	
	return MachineModule.test();
}

/**
 * 初始化扫描
 */
export  function initMachine() {
	return MachineModule.init();
}

/**
 * 开始扫描
 */
export  function startMachine() {
	const res = MachineModule.start()
	console.log(res);
	return res;
}

/**
 * 停止扫描
 */
export  function stopMachine() {
	
	return MachineModule.stop();
}

/**
 * 结束扫描
 */
export  function endMachine(voice = true) {
	
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
	try{
		if (response.code === 200) {
			response.data = response.data.map((item) => restoreString(item));
		}
	}catch(error){
		console.log(error);
	}
	console.log("end");
	return response;
}

/**
 * 获取标签
 */
export  function getTagsMachine() {
	
	const response = MachineModule.getTags();
	if (response.code === 200) {
		response.data = response.data.map((item) => restoreString(item));
	}
	console.log(response);
	return response;
}

/**
 * 读取信号最大最强的标签
 */
export  function readMachine() {
	/**
	 * type     写入方式 0: HEX编码 1: ASCII编码 2或者其他 : utf8
	 * password 密码
	 * index    起始地址 默认2
	 * block    块数 默认 6
	 * area     区域 默认 1  0-保留区 1-EPC区 2-TID区 3-USER区
	 */
	let response = null;
	try {
		response = MachineModule.read(0,null,2,6,1);
		if (response.code === 200) {
			response.data = restoreString(response.data);
		}
	}catch(err){
		console.log(err);
	}
	return response;
}

/**
 * 写标签
 * @param str 标签值
 */
export  function writeMachine(str) {
	/**
	 * @param type     写入方式 0: HEX编码 1: ASCII编码 2或者其他 : utf8
	 * @param str 标签值
	 * @param password 密码
	 * @param index    起始地址
	 * @param area     区域 默认 1  0-保留区 1-EPC区 2-TID区 3-USER区
	 */
	
	return MachineModule.write(0, padString(str), null, 2, 1);
}

/**
 * 写标签(EPC区)
 *
 */
export  function writeEPCMachine(str) {
	/**
	 * @param type 写入方式 0: HEX编码 1: ASCII编码 2或者其他 : utf8
	 * @param str 标签值
	 * @param password 密码
	 */
	
	return MachineModule.writeEPC(0, padString(str), null);
}

/**
 * 锁标签
 * @param lbank 锁 0-访问密码 1-销毁密码 2-EPC 3-TID 4-USER
 * @param ltype 0-解锁定 1-暂时锁定 2-永久锁定
 * @param password 密码
 */
export  function lockTagMachine(lbank, ltype, password) {
	
	return MachineModule.lockTag(lbank, ltype, password);
}

/**
 * 设置扫描范围
 * @param power
 */
export  function setPower(power) {
	
	if(power>=500&&power<=3300){
		return MachineModule.setPower(power, power);
	}else{
		return "功率最小为500，最大为3300"
	}
}

/**
 * 获取扫描范围
 */
export  function getPower() {
	
	return MachineModule.getPower();
}

/**
 * 设置提示音
 * @param context 上下文
 */
export  function di(context) {
	
	return MachineModule.di(context);
}