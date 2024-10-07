export class TagScanAgent {
    constructor(tagUtil) {
        this.tagUtil = tagUtil;
        this.keyDown = null;
		this.callbackfn = null;
    }

    callback(data) {
        if(this.callbackfn) {
			this.callbackfn(data)
		}
    }
	
	setKeyDownListener(listener) {
		this.tagUtil.setKeyDownListener(listener);
	}

    init(power = 500, mode = 1) {
        power = power === null ? 500 : power
        mode = mode === null ? 1 : mode
        this.tagUtil.setPower(power)
        this.tagUtil.setMode(mode)
        this.tagUtil.setDataListener(this)
        this.tagUtil.start()
    }

    destory(voice = true) {
        if (this.tagUtil) {
            this.tagUtil.setDataListener(null)
			this.tagUtil.setKeyDownListener(null)
            this.tagUtil.destory(voice)
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

}
