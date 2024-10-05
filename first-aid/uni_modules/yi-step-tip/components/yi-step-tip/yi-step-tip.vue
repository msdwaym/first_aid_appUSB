<template>
	<view class="yi-step">
		<view class="yi-step-mask" v-if="showMask"></view>
		<view class="yi-step-guide" v-if="showMask && steps[currentStep]" :style="tooltipStyle+' width:'+width+'rpx;'">
			<view class="yi-step-text">
				<text>{{ steps[currentStep].text }}</text>
			</view>
			<view class="yi-step-button" @click="nextStep">{{ currentStep === steps.length - 1 ? completeText : nextText }}</view>
		</view>
	</view>
</template>

<script>
	// import Vue from 'vue'
	export default {
		props: {
			/**
			 * @description 下一步的按钮文字
			 */
			nextText: {
				type: String,
				default: '下一步',
			},
			/**
			 * @description 最后一步的按钮文字
			 */
			completeText: {
				type: String,
				default: '教学完成',
			},
			/**
			 * @description { class: '独立的类名或id', text: '提示内容' }[]
			 */
			steps: {
				type: Array,
				default: [],
			},
			/**
			 * @description 间距 px
			 */
			spacing: {
				type: Number,
				default: 5,
			},
			/**
			 * @description 提示框宽度 rpx
			 */
			width: {
				type: Number,
				default: 300,
			}
		},
		data() {
			return {
				showMask: false,
				currentStep: -1,
				tooltipStyle: '',
				rects: []
			};
		},
		methods: {
			start(){
				Promise.all(this.steps.map(v => this.getClassReact(v.class))).then((v) => {
					this.rects = v;
					this.nextStep();
				})
			},
			getClassReact(className) {
				const query = uni.createSelectorQuery();
				return new Promise((resvole) => {
					query.select(className).boundingClientRect((rect) => {
						resvole(rect)
					}).exec();
				})
			},
			nextStep() {
				const query = uni.createSelectorQuery().in(this);
				if (this.currentStep < this.steps.length - 1) {
					this.currentStep++;
					this.showMask = true;
					this.$nextTick(() => {
						query.select('.yi-step-guide').boundingClientRect(rect => {
							this.calculateTooltipPosition(this.rects[this.currentStep], rect);
						}).exec();
					})
				} else {
					this.currentStep = -1;
					this.showMask = false;
				}
			},
			scrollTo(top){
				const screenHeight = uni.getSystemInfoSync().windowHeight;
				if (top > (screenHeight / 2)) {
					uni.pageScrollTo({ scrollTop: top - 20, duration: 200 });
				}
				if(top < (screenHeight / 2)){
					uni.pageScrollTo({ scrollTop: 0, duration: 200 });
				}
			},
			calculateTooltipPosition(targetRect, tooltipRect) {
				const screenWidth = uni.getSystemInfoSync().windowWidth;
				const screenHeight = uni.getSystemInfoSync().windowHeight;
				let left = targetRect.left + targetRect.width / 2 - tooltipRect.width / 2;
				let top = targetRect.top - tooltipRect.height - this.spacing;
				if (left < 0) {
					left = this.spacing;
				} else if (left + tooltipRect.width > screenWidth) {
					left = screenWidth - tooltipRect.width - this.spacing;
				}
				if (top < 0) {
					top = targetRect.bottom + this.spacing;
				}
				this.scrollTo(top);
				this.tooltipStyle = `left: ${left}px; top: ${top}px;`;
			},
			// showMask() {
			//   this.show = true; // 假设 show 是控制掩码显示的数据属性  
			//   Vue.$emit('update:highlight', true); // 触发事件，传递高亮状态  
			// },  
			// hideMask() {
			//   this.show = false;  
			//   Vue.$emit('update:highlight', false);  
			// }  
		}
	}
</script>

<style lang="scss">
	.yi-step {
		.yi-step-mask {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background-color: rgba(0, 0, 0, 0.5);
			z-index: 999;
		}
	
		.yi-step-guide {
			box-sizing: border-box;
			position: absolute;
			background-color: #fff;
			padding: 15rpx;
			border-radius: 12rpx;
			z-index: 1000;
			text-align: center;
			width: 300rpx;
			font-size: 12px;
			
			.yi-step-text{
				font-size: 12px;
				padding-bottom: 20rpx;
			}
	
			.yi-step-button {
				margin: 0 auto;
				padding: 10rpx 20rpx;
				background-color: #409EFF;
				color: #FFF;
				border-radius: 5px;
				font-size: 12px;
				&:active {
					background-color: #1e4d7b;
				}
			}
		}
	}
</style>
