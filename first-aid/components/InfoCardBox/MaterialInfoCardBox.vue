<script setup>
	import { computed } from 'vue';
	const props = defineProps({    
		/* 输入文字 */    
		btnText: {    
			type: String,    
			default: "查看详情"    
		},    
		views: {    
			type: Array,    
			default: () => [
				{ text: "物资名称", date: "" , isInline: false},
				{ text: "编号", date: "" , isInline: false},
				{ text: "规格", date: "暂无数据", isInline: true },
				{ text: "剩余数量", date: "", isInline: true },
				{ text: "有效期", date: "" , isInline: false},
			]    
		},    
		showDetail: Function,    
		showBtn: {    
			type: Boolean,    
			default: true    
		}    
	});  
  
	// 计算属性，用于筛选 isInline: false 的项目  
	const nonInlineViews = computed(() => {  
		return props.views.filter(view => !view.isInline);
	});  
  
	// 计算属性，用于筛选 isInline: true 的项目  
	const inlineViews = computed(() => {
		return props.views.filter(view => view.isInline);  
	});
</script>  
  
<template>      
	<view class="medicalTrolleyInfoBoxCss">    
		<!-- 只循环渲染 isInline: false 的盒子 -->    
		<view v-for="(view, index) in nonInlineViews" :key="index" >    
			<view>      
				<view class="ellipsis-text">      
					{{ view.text }}:      
				</view>      
				<view class="ellipsis-text1">      
					{{ view.date }}      
				</view>      
				<view style="display: inline-block; float: right;" v-if="index === 0">  
					<button      
						class="buttonCss"      
						size="mini"      
						@click="props.showDetail"      
						v-show="props.showBtn"      
					>      
						{{ props.btnText }}  
					</button>  
				</view>  
			</view>  
		</view>  
  
		<!-- 只循环渲染 isInline: true 的盒子 -->    
		<view style="display: inline-block;" >
			<view v-for="(view, index) in inlineViews" :key="index" :class="['inline-container', { 'float-right': index === 1 }]">    
				<view class="ellipsis-text">      
					{{ view.text }}:      
				</view>      
				<view class="ellipsis-text1">      
					{{ view.date }}      
				</view>      
			</view>    
		</view>  
	</view>      
</template>  
  
<style lang="scss">    
	@import '@/common/styles/color/color.scss';    
	.medicalTrolleyInfoBoxCss {    
		background-color: $main-blue;    
		color: white;    
		border-radius: 2%;    
		height: fit-content;    
		margin: 20rpx 0;    
		padding: 20rpx;    
	}    
	.medicalTrolleyInfoBoxCss view {    
		margin: 3 5rpx;    
	}      
	.single-line-container {    
		// 添加针对非同行元素的特定样式  
	}    
	.buttonCss {    
		display: flex;    
		background-color: $main-blue;    
		color: white;    
		border: 1px solid white;    
		height: 43rpx;    
		padding: 0 30rpx;    
		align-items: center;    
	}    
	.ellipsis-text {    
		max-width: 200rpx;    
		white-space: nowrap;    
		overflow: hidden;    
		text-overflow: ellipsis;    
		padding-right: 10rpx;    
		display: inline-block;    
	}    
	.ellipsis-text1 {    
		max-width: 400rpx;    
		white-space: nowrap;    
		overflow: hidden;    
		text-overflow: ellipsis;    
		padding-right: 10rpx;    
		display: inline-block;    
	}
	.inline-container{
		display: inline-block;
	}
	.float-right {  
	    float: right;
		margin-left: 100rpx;
	}
</style>