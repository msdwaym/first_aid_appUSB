
export class TagScanAgent {
    constructor(tagUtil) {
        this.tagUtil = tagUtil;
        this.keyDown = null;
		this.callbackfn = null;
		
		this.scanning = false; 
		this.scanInterval = null;
    }

    callback(data) {
        if(this.callbackfn) {
			this.callbackfn(data)
		}
    }
	
	setKeyDownListener(listener) {
		if(typeof this.tagUtil.setKeyDownListener === 'function'){
			this.tagUtil.setKeyDownListener(listener);
		}
	}
	setKeyUpListener(listener) {
		if(typeof this.tagUtil.setKeyUpListener === 'function'){
			this.tagUtil.setKeyUpListener(listener);
		}
	}

    init(power = 500, mode = 1) {
        power = power === null ? 500 : power
        mode = mode === null ? 1 : mode
        // this.tagUtil.setPower(power)
        this.tagUtil.setMode(mode)
        this.tagUtil.setDataListener(this)
        this.tagUtil.start()
    }

    destory(voice = true) {
        if (this.tagUtil) {
            this.tagUtil.setDataListener(null)
			if (typeof this.tagUtil.setKeyDownListener === 'function') {
			    this.tagUtil.setKeyDownListener(null);
				this.tagUtil.destory(voice)
			}else{
				this.tagUtil.destory()
			}
        } else {
            console.log("TagUtil undefined")
        }
    }

    // 用于修改模式
    setMode(mode) {
        this.tagUtil.setMode(mode)
    }

    setPower(power) {
        this.tagUtil.setPower(power)
    }

    setCallBackFn(callback) {
        this.callbackfn = callback
    }
	
	
	startScanning() {
		if (!this.scanning) {
			this.scanning = true;  
			this.scanInterval = setInterval(() => {
				const data = this.tagUtil.read(); 
				this.callback(data);
			}, 1000);
		}  
	}  
  
	// 停止扫描  
	stopScanning() {
		if (this.scanning) {
			this.scanning = false;  
			clearInterval(this.scanInterval);
			this.scanInterval = null;  
		}  
	}  
  
	// 设置按键监听器
	setKeyDownListener1(listener) {
	    this.tagUtil.setKeyDownListener((event) => {
	        if (event.keyCode === 134) {
	            if (this.scanning) {
	                this.stopScanning();
	            } else {
	                this.startScanning();  
	            }
	        }    
	        if (listener) {  
	            listener(event);
	        }  
	    });  
	}
}
