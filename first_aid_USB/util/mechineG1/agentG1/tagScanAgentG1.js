export class tagScanAgentG1 {
    constructor(tagUtilG1) {
        this.tagUtilG1 = tagUtilG1;
        this.keyDown = null;
		this.callbackfn = null;
    }

    callback(data) {
        if(this.callbackfn) {
			this.callbackfn(data)
		}
    }
	
	setKeyDownListener(listener) {
		this.tagUtilG1.setKeyDownListener(listener);
	}

    init(power = 500, mode = 1) {
        power = power === null ? 500 : power
        mode = mode === null ? 1 : mode
        this.tagUtilG1.setPower(power)
        this.tagUtilG1.setMode(mode)
        this.tagUtilG1.setDataListener(this)
        this.tagUtilG1.start()
    }

    destory(voice = true) {
        if (this.tagUtilG1) {
            this.tagUtilG1.setDataListener(null)
			this.tagUtilG1.setKeyDownListener(null)
            this.tagUtilG1.destory(voice)
        } else {
            console.log("TagUtil undefined")
        }
    }

    // 用于修改模式
    setMode(mode) {
        this.tagUtilG1.setMode(mode)
    }

    setPower(power) {
        this.tagUtilG1.setPower(power)
    }

    setCallBackFn(callback) {
        this.callbackfn = callback
    }

}
