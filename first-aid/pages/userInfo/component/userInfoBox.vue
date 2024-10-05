<script setup>
	import { ref ,watch} from "vue";
	const props = defineProps( {
		titleText:{
			type:String,
			default:""
		},
		valueText:{
			type:String,
			default:""
		},
		isExpand:{
			type:Boolean,
			default:false
		}
	} )
	const isShow = props.isExpand; 
	const emit = defineEmits(["torevisePart"]);
</script>

<template>
	<view class="InfoBoxCss">
		<view class="spanCss" style="color: black;">{{props.titleText}}</view>
		<view  style="float: right;margin-left: 20rpx;">
			<view style="display: inline-block; float: right; " v-if="isShow">
				<uni-icons type="right" size="21" color="rgba(137, 207, 251, 1)" @click="emit('torevisePart')"></uni-icons>
			</view>
			<view style="display: inline-block;float: right; height: 42rpx; width: 42rpx;" v-if="!props.isExpand">
				
			</view>
		</view>
		<view class="beyondHide" style="float: right;">
			{{props.valueText}}
		</view>
	</view>
</template>



<style lang="scss" scoped>
	@import '@/common/styles/color/color.scss'; 
	.InfoBoxCss{
		padding: 20rpx 0 ;
		border-bottom: 2rpx solid lightgray;
		color: $main-blue;
	}
	.spanCss{
		display: inline-block;
		margin: 5rpx 40rpx;
	}
	.beyondHide{
		width: calc(50% - 140rpx); // Adjust this width according to your design needs  
		white-space: nowrap;  
		overflow: hidden;  
		text-overflow: ellipsis;
		text-align: right;
		justify-content: center;
		font-size: 34rpx;
	}
</style>