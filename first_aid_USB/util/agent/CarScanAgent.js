import {TagUtil} from "../TagUtil";

export class CarScanAgent {
    constructor() {
        this.tagUtil = null;
        this.data = null;
		this.onDataChangeCallback = null;
    }

    init() {
        this.tagUtil.setMachinePower(500);
        this.tagUtil.setMode(1);
        this.tagUtil.setDataListener(this);
    }

    callback(data) {
        this.data = data;
		if (typeof this.onDataChangeCallback === 'function') {  
			this.onDataChangeCallback(data); // 调用回调并传递新数据  
		}  
    }

    play() {
        this.tagUtil = new TagUtil();
		this.init();
        this.tagUtil.init();
    }

    destory() {
        if (this.tagUtil) {
            this.tagUtil.destory();
            this.tagUtil.setDataListener(null);
        } else {
            console.log("TagUtil undefined")
        }
    }
	
	setOnDataChangeCallback(callback) {  
		this.onDataChangeCallback = callback;  
	} 
	
}
