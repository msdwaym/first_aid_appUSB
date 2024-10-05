<script setup>
	const props=defineProps ({
		/* 输入文字 */
		btnText:{
			type:String,
			default:"查看详情"
		},
		viewText:{
			type:String,
			default:"科室"
		},
		viewDate:{
			type:String,
			default:""
		},
		view1Text:{
			type:String,
			default:"编号"
		},
		view1Date:{
			type:String,
			default:""
		},
		view2Text:{
			type:String,
			default:"登记时间"
		},
		view2Date:{
			type:String,
			default:"暂无数据"
		},
		showDetail: Function,
		showData:{
			 type:Boolean,
			 default:true
		},
		showBtn:{
			type:Boolean,
			default:true
		},
		usedNum:{
			type:Number,
			default:0
		},
		type:{
			type:String,
			default:''
		},
		showView3:{
			type:Boolean,
			default:false
		},
		view3Text:{
			type:String,
			default:''
		},
		view3Date:{
			type:String,
			default:''
		},
	})
</script>
<template>
	<view class="medicalTrolleyInfoBoxCss">
		<view >
			<view class="ellipsis-text" style="display: inline-block;" id="view">
				{{props.viewText}}:
				</view>
					
			<view class="ellipsis-text1">{{props.viewDate}}
			</view>
			<view style="display: inline-block;float: right;">
				<button
				class="buttonCss"
				size="mini"
				@click="props.showDetail"
				v-show="props.showBtn">
					{{props.btnText}}
				</button>
			</view>
		</view>
		
		<view id="view1" >
			<view class="ellipsis-text">
				{{props.view1Text}}:
			</view>
			<view class="ellipsis-text1">
				{{props.view1Date}}
			</view>
		</view>
		
		<view id="view2" v-show="props.showView3" >
			<view class="ellipsis-text">
				{{props.view3Text}}:
			</view>
			<view class="ellipsis-text1">
				{{props.view3Date}}
			</view>
		</view>
		
		
		<view v-if="props.showData" style="font-weight: bolder; height:40rpx;" id="view3">
				<view style="float: right;">{{ props.view2Text }}:{{ props.view2Date }} </view> 
		</view>
		<view v-else>
			<view style='display:inline-block;'>用量:{{ props.usedNum }}</view>  
			<view style='display:inline-block;float: right;'>{{ props.type }}</view>  
		</view>  
		
	</view>
</template>



<style lang="scss">
	@import '@/common/styles/color/color.scss';  
.medicalTrolleyInfoBoxCss{
	background-color: $main-blue;  
	color: white;
	border-radius: 2%;
	// min-height: 200rpx;
	height: fit-content;
	margin: 20rpx 0;
	padding: 20rpx;
}
.medicalTrolleyInfoBoxCss view{
	margin: 3 5rpx;
}
.buttonCss{
	display: flex;
	background-color: $main-blue;  
	color: white;
	border: 1px solid white;
	height:43rpx;
	padding: 0 30rpx;
	align-items: center;
}
.ellipsis-text {   
        max-width: 200rpx;
        // 防止文本换行  
        white-space: nowrap;  
        // 隐藏超出部分的内容  
        overflow: hidden;  
        // 显示省略号  
        text-overflow: ellipsis;  
        padding-right: 10rpx;
		display: inline-block;
}
.ellipsis-text1 {   
        max-width: 400rpx; 
        // 防止文本换行  
        white-space: nowrap;  
        // 隐藏超出部分的内容  
        overflow: hidden;  
        // 显示省略号  
        text-overflow: ellipsis;  
        padding-right: 10rpx;
		display: inline-block;
}
</style>