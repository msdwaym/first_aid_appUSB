import {
	endMachine,
	initMachine,
	readMachine,
	setPower,
	startMachine,
	stopMachine,
} from "./machine";

export class TagUtil {
	constructor() {
		// 0-单个读取 1-多个读取
		this.mode = 0;
		// this.power = 2000;
		this.dataListener = null;
		this.keyDownListener = null;
		this.keyUpListener = null;
		this.time = 1;
		this.keyDownHandle = this.keyDownHandle.bind(this);  
		this.keyUpHandle = this.keyUpHandle.bind(this);  
	}

	setMode(newMode) {
		this.mode = newMode;
	}

	setPower(newPower = 2000) {
		setPower(newPower, newPower)
	}

	setDataListener(listener) {
		this.dataListener = listener;
	}

	setTime(time) {
		this.time = time
	}

	setKeyDownListener(keyDownListener) {
		this.keyDownListener = keyDownListener
	}

	setKeyUpListener(keyUpListener) {
		this.keyUpListener = keyUpListener
	}

	init() {
		initMachine()
	}

	start() {
		plus.key.addEventListener('keydown', this.keyDownHandle);
		plus.key.addEventListener('keyup', this.keyUpHandle);
	}

	destory(voice = true) {
		plus.key.removeEventListener('keydown', this.keyDownHandle)
		plus.key.removeEventListener('keyup', this.keyUpHandle);
		endMachine(voice);
	}

	keyDownHandle(event) {
		if (this.time === 1 && event.keyCode === 134) {
			this.time++;
			if (this.dataListener) {
				//清除监听器（避免重复执行）
				if (this.mode) {
					startMachine();
				}
			}

			if (this.keyDownListener) {
				this.keyDownListener()
			}
		}
	}

	keyUpHandle(event) {
		if(event.keyCode === 134) {
			this.time = 1;
			if (this.dataListener) {
				if (this.mode) {
					stopMachine();
				}
				let data = this.mode ? endMachine():readMachine();
				this.dataListener.callback(data);
			}
			
			if (this.keyUpListener) {
				this.keyUpListener();
			}
		}
	}
}
