<script setup>
	import firstAidNavigation from "@/components/first-aid-navigation/first-aid-navigation.vue";
	import {navEnum} from "@/common/enum/enum.js";
	import {onLoad} from '@dcloudio/uni-app' 
	import {Return} from "@/util/router.js";
	// import { addFeedbackInfo } from "@/api/feedback";
	import { getToken } from "@/util/token.js";
	import { ref ,onMounted,computed} from 'vue';
	
	const fileList1 = ref([]);//文件路径数组
	const value2 = ref(''); // 问题和意见的输入框的v-model绑定值  
	const contactInfo = ref('');//联系方式
	const nurseId = ref('')//护士id
	//判断内容是否为空，作为提交按钮的禁用状态
	const isSubmitDisabled = computed(() => {  
		  return !fileList1.value.length && !value2.value.trim() && !contactInfo.value.trim();  
	}); 
	
	onLoad((options)=>{
		nurseId.value = options.nurseId;
		// console.log(nurseId.value);
	})
	// 删除图片
	const deletePic = (event) => {
	  fileList1.value.splice(event.index, 1);
	};
	
	// 新增图片
	const afterRead = async (event) => {
	  // lists获取用户选择的图片信息
	  let lists = [].concat(event.file);
	  let fileListLen = fileList1.value.length;

	  lists.map((item) => {
	    fileList1.value.push({
	      ...item,
	    });
	  });
	 
	};
	
	
	const handleSubmit=async()=>{
		const submitData = {
		   description: value2.value, // 问题和意见  
		   phoneNumber: contactInfo.value, // 联系方式
						nurseId:nurseId.value,
		};
		// console.log(submitData)
		 if (!submitData.description.trim() || !submitData.phoneNumber.trim() || !submitData.nurseId) {
       // console.log(submitData)
		    uni.showToast({  
		      title: '请完善表单内容',  
		      icon: 'none',  
		      duration: 2000  
		    });  
		    return; // 退出函数，不执行后续代码  
		  }  
		 try{
			
			let token = getToken();
			fileList1.value.forEach(item=>{
				// console.log(item);
				uni.uploadFile({
					url: 'http://192.168.169.159:11307/assistance/addAssistance',
					filePath: item.url,
					name: 'img',
					formData: {  //这里是上传图片时一起上传的数据
						description: submitData.description,
						phoneNumber: submitData.phoneNumber,
						nurseId:submitData.nurseId,
					},
					header: {
						'Authorization': token,
						MacAddress:"12121221"
					},
					success: (resp) => {
						console.log(resp);
					},
					fail: (res) => {  //失败
						console.log(res);
					}
				});
			})
			 uni.showToast({
				title: '反馈提交成功',
				icon: 'success',
				duration: 2000
			})
			 uni.switchTab({
			 	url:'/pages/userInfo/userInfo'
			 })
		 }catch(e){
			 console.log(e);
		 }
	}
	
</script>

<template>
	<view style="overflow: hidden;">
		<firstAidNavigation
		 :nav-text=navEnum.feedback
		 @return="Return"
		/>
		
		<view style="margin:180rpx 50rpx 0 50rpx;">
			<!-- 问题和意见 -->
			<view>
				<view class="titleCss">
					问题和意见:
				</view>
				<!-- 文本域 -->
				<view style="margin:50rpx 20rpx ;">
					<up-textarea v-model="value2" placeholder="请输入内容" count ></up-textarea>
				</view>
			</view>
			
			<!-- 附件（图片视频） -->
			<view >
				<view class="titleCss">
					上传图片:
				</view>
				<view style="margin:50rpx 20rpx ;">
					<up-upload
							:fileList="fileList1"
							name="1"
							multiple 
							:maxCount="1"
							@afterRead="afterRead" 
							@delete="deletePic"
						></up-upload>
				</view>
			</view>
			
			<!-- 联系方式(电话) -->
			<view>
				<view class="titleCss">
					联系方式:
				</view>
				
				<view style="margin:50rpx 20rpx ;">
					<up-input
					    placeholder="请输入内容"
					    border="surround"
					    clearable
						maxlength="11"
						type="number"
						v-model="contactInfo"
					  ></up-input>
				</view>
			</view>
			
			<!-- 提交 -->
			<view style="margin: 130rpx 0;">
				<up-button type="primary"  :disabled="isSubmitDisabled" class="submitBtn" text="确定" @click="handleSubmit()"></up-button>
			</view>
		</view>
	</view>
	
</template>

<style lang="scss" scoped>
	@import '@/common/styles/color/color.scss';  
.titleCss{
color: $main-blue;
font-weight: bolder;
}
.submitBtn{
	background-color:$main-blue;
	font-weight: bolder;
	width: 400rpx;
}

</style>
