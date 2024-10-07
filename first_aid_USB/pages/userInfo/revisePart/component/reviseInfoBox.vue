<script setup>
	const props = defineProps({
		reviseData:{
			type:String,
			default:""
		},
		title:{
			type:String,
			default:""
		}
	});
</script>

<template>
	<view>
		<uni-forms ref="form" :value="formData" validate-trigger="submit" err-show-type="toast">
			<uni-forms-item name="name">
				<text class="text_inputBox">{{props.title}}</text>
				
				<up-input inputAlign="right" placeholder="请输入姓名" clearable='true'
					shape="circle" class="test1" :focus="focusCode" @blur="focusCode =false"
					v-model="props.reviseData" trim="both" fontSize="30rpx" maxlength="10">
				</up-input>
			</uni-forms-item>
			
		</uni-forms>
	</view>
</template>

<style lang="scss" scoped>
	.formBoxCss{
		margin-top: 16rpx;
		width: 100%;
	}
	.text_inputBox{
		position: absolute;
		z-index: 1;
		margin: 20rpx 40rpx;
		font-weight: bolder;
		font-size:30rpx;
	}
	.test1{
		background-color: #f3f3f3;
		height: 60rpx;
		width: 96%;
		border: 2rpx solid #f3f3f3;
		border-radius:90rpx ;
		border: transparent;
	}
</style>
