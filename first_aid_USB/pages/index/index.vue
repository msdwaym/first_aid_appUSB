<template>
	<view class="content">
		<u-button type="primary" text="按钮" @click="handleButton()"></u-button>
		<u-button type="primary" text="初始化扫描" @click="handleInitButton()"></u-button>
		<u-button type="primary" text="开始扫描" @click="handleStartButton()"></u-button>
    <u-button type="primary" text="读取标签" @click="handleReadButton()"></u-button>
		<u-button type="primary" text="停止扫描" @click="handleStopButton()"></u-button>
		<u-button type="primary" text="写标签" @click="handleWriteButton()"></u-button>
    <u-button type="primary" text="获取标签" @click="handleTagsButton()"></u-button>
    <u-button type="primary" text="结束扫描" @click="handleEndButton()"></u-button>
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
	writeMachine
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
        this.title = testMachine()
			},
			handleInitButton() {
        this.title = JSON.stringify(initMachine())
			},
			handleStartButton() {
        this.title = JSON.stringify(startMachine())
			},
			handleStopButton() {
        this.title = JSON.stringify(stopMachine())
			},
			handleEndButton() {
        this.title = JSON.stringify(endMachine())
			},
			handleTagsButton() {
        this.title = JSON.stringify(getTagsMachine())
			},
			handleReadButton() {
        this.title = JSON.stringify(readMachine(0,null,2,6,1))
			},
			handleWriteButton() {
        this.title = JSON.stringify(writeMachine("00004A010101010101038888"))
			}
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
