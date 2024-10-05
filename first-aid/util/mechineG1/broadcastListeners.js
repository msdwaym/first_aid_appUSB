export class broadcastListeners {
	constructor(tagUtil) {
		this.tagUtil = tagUtil;
		this.main = plus.android.runtimeMainActivity();
		this.EVENT = {
			keyCode: 134
		};
	}
	initReceivers() {
		const IntentFilter = plus.android.importClass('android.content.IntentFilter');
		const scanFilter = new IntentFilter();
		const stopFilter = new IntentFilter();
		scanFilter.addAction("com.rfid.SCAN_CMD");
		stopFilter.addAction("com.rfid.STOP_SCAN");
		// 扫描命令接收器  
		this.receiver = plus.android.implements('io.dcloud.feature.internal.reflect.BroadcastReceiver', {
			onReceive: (intent) => {
				console.log("监听已触发");
				setTimeout(() => {
					this.tagUtil.keyDownHandle(this.EVENT);
				}, 0);
			}
		});
		// 停止扫描接收器
		this.receiverEnd = plus.android.implements('io.dcloud.feature.internal.reflect.BroadcastReceiver', {
			onReceive: (intent) => {
				console.log("停止扫描的监听器已触发");
				setTimeout(() => {
					this.tagUtil.keyUpHandle(this.EVENT);
				}, 0);
			}
		});
		this.main.registerReceiver(this.receiver, scanFilter);
		this.main.registerReceiver(this.receiverEnd, stopFilter);
	}

	removeBroadcastListener() {
		if (this.receiver) {
			this.main.unregisterReceiver(this.receiver);
			this.receiver = null;
		}
		if (this.receiverEnd) {
			this.main.unregisterReceiver(this.receiverEnd);
			this.receiverEnd = null;
		}
	}

	removeListener(receiver) {
		let main = plus.android.runtimeMainActivity();
		main.unregisterReceiver(receiver);
		receiver = null;
	}

	destroy() {
		this.removeBroadcastListener();
	}
}