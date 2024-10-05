import {
	endMachine,
	initMachine,
	readMachine,
	setPower,
	startMachine,
	stopMachine,
} from "@/util/machine.js";
import {broadcastListeners} from "@/util/mechineG1/broadcastListeners.js"

export class TagUtilG1 {
	constructor() {
		// 0-单个读取 1-多个读取
		this.mode = 0;
		this.power = 2000;
		this.dataListener = null;
		this.keyDownListener = null;
		this.keyUpListener = null;
		this.time = 1;
		this.keyDownHandle = this.keyDownHandle.bind(this);
		this.keyUpHandle = this.keyUpHandle.bind(this);
		this.broadcastListeners = new broadcastListeners(this);
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
	
	setKeyDownListener(keyDownListener) {
		this.keyDownListener = keyDownListener
	}
	
	setKeyUpListener(keyUpListener) {
		this.keyUpListener = keyUpListener
	}

	setTime(time) {
		this.time = time
	}

	init() {
		initMachine()
		setPower(1000)
	}

	start() {
		//添加广播监听
		this.broadcastListeners.initReceivers();
	}

	destory() {
		this.broadcastListeners.removeBroadcastListener();
	}

	keyDownHandle(event) {
		if (event.keyCode !== 134) return;  
		  
		this.invokeKeyDownListener();
  
		if (this.dataListener && this.mode) {  
			startMachine();  
		}
	}

	keyUpHandle(event) {
		if (event.keyCode !== 134) return;  
		  
		let data;  
		if (this.dataListener) {  
			data = this.mode ? endMachine(true) : readMachine();  
			this.dataListener.callback(data);  
			if (this.mode) {  
				stopMachine();  
			}  
		}  
  
		this.invokeKeyUpListener();
	}
	
	invokeKeyDownListener() {  
		if (this.keyDownListener) {  
			this.keyDownListener();  
		}  
	}  
	  
	invokeKeyUpListener() {  
		if (this.keyUpListener) {  
			this.keyUpListener();  
		}  
	}
	read(){
		return readMachine(0, null, 2, 6, 1);
	}
	startRead() {
	    const that = this;  
	    plus.key.addEventListener('keydown', function(event) {
	        if (that.time === 1 && event.keyCode === 134) {
	            that.time++;  
	            that.read();  
	            if (that.keyDownListener) {
	                that.keyDownListener(event);
	            }
	        }  
	    });  
	}
	
	// triggerKeyDown() {  
	// 	const event = { keyCode: 134 };
	// 	this.keyDownHandle(event);
	// }  
	// triggerKeyUp() {  
	// 	const event = { keyCode: 134 };  
	// 	this.keyUpHandle(event);  
	// }
}