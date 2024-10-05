<template>
	<view class="content">
		<u-button type="primary" text="按钮" @click="handleButton()"></u-button>
		<u-button type="primary" text="初始化扫描" @click="handleInitButton()"></u-button>
		<u-button type="primary" text="开始扫描" @click="handleStartButton()"></u-button>
		<u-button type="primary" text="获取标签" @click="handleTagsButton()"></u-button>
		<u-button type="primary" text="停止扫描" @click="handleStopButton()"></u-button>
		<u-button type="primary" text="结束扫描" @click="handleEndButton()"></u-button>
		<u-button type="primary" text="读取标签" @click="handleReadButton()"></u-button>
		<u-button type="primary" text="写标签" @click="handleWriteButton()"></u-button>
		<u-button type="primary" text="写标签EPC" @click="handleWriteEPCButton()"></u-button>
		<u-button type="primary" text="标签上锁" @click="handleLockButton()"></u-button>
		<u-button type="primary" text="标签解锁" @click="handleUnlockButton()"></u-button>
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
	</view>
</template>

<script>
	import { getAppInfo } from "../../api/appInfo.js";
import {
	testMachine,
	initMachine,
	startMachine,
	getTagsMachine,
	stopMachine,
	endMachine,
	readMachine,
	writeMachine ,
	writeEPCMachine,
	lockTagMachine,
	} from "../../util/machine.js";
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {
			handleButton() {
				getAppInfo().then(res => {
					console.log(res);
				})
			},
			handleInitButton() {
				console.log(JSON.stringify(initMachine()));
			},
			handleStartButton() {
				console.log(JSON.stringify(startMachine()));
			},
			handleStopButton() {
				console.log(JSON.stringify(stopMachine()));
			},
			handleEndButton() {
				console.log(JSON.stringify(endMachine()));
			},
			handleTagsButton() {
				console.log(JSON.stringify(getTagsMachine()));
			},
			handleReadButton() {
				console.log(JSON.stringify(readMachine(0,null,2,6,1)));
			},
			handleWriteButton() {
				console.log(JSON.stringify(writeMachine(0,"4A0101010101010000030001",null,2,1)));
			},
			handleWriteEPCButton() {
				console.log(JSON.stringify(writeEPCMachine(0, "4A0101010101010000030002", null)));
			},
			handleLockButton() {
				console.log(JSON.stringify(lockTagMachine(2, 1, null)));
			},
			handleUnlockButton() {
				console.log(JSON.stringify(lockTagMachine(2, 0, null)));
			},
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
