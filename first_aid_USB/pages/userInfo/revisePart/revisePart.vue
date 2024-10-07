<script setup>
import { defineProps, ref,onMounted,watchEffect  } from 'vue';
// import { useRoute } from 'vue-router'; 
import firstAidNavigation from "@/components/first-aid-navigation/first-aid-navigation.vue";
import {navEnum} from "@/common/enum/enum.js";
import {Return} from "@/util/router.js";
import {reviseName,revisePassword} from "@/api/userInfo.js"
import {onLoad} from '@dcloudio/uni-app'

const localTitle = ref('');  
const reviseData = ref(''); 
// const route = useRoute(); 

onLoad((options)=>{
	localTitle.value = options.label
	reviseData.value = options.value
	if (localTitle.value==="姓名") {
	 formData.name = reviseData.value;

	}
})

const formData = {
  name: "",
  oldPassword: "",
  newPassword: "",
  newPasswordConfirm:"",
  department: ""
}

const  Submit=async()=>{

	 if (localTitle.value === "姓名" && formData.name === "") {
	     uni.showToast({
	       title: '姓名不能为空',
	       icon: 'none',
	       duration: 2000
	     });
	     return; // 如果姓名为空，则停止执行后续代码
	}
	if (localTitle.value === "密码") {
	    // 检查旧密码、新密码和确认密码
	    if (formData.oldPassword === "") {
	      uni.showToast({
	        title: '原密码不能为空',
	        icon: 'none',
	        duration: 2000
	      });
	      return; // 如果旧密码为空，则停止执行后续代码
	    }

	    if (formData.newPassword === "") {
	      uni.showToast({
	        title: '新密码不能为空',
	        icon: 'none',
	        duration: 2000
	      });
	      return; // 如果新密码为空，则停止执行后续代码
	    }

	    if (formData.newPasswordConfirm === "") {
	      uni.showToast({
	        title: '确认密码不能为空',
	        icon: 'none',
	        duration: 2000
	      });

	      return; // 如果确认密码为空，则停止执行后续代码
	    }

	    // 比较新密码和确认密码（之前已经添加过这部分逻辑）
	    else if (formData.newPassword !== formData.newPasswordConfirm) {
	      uni.showToast({
	        title: '两次输入的新密码不一致',
	        icon: 'none',
	        duration: 2000
	      });
	      return; // 如果密码不一致，则停止执行后续代码
	    }
	  }
	  if (localTitle.value === "收货地址" && formData.deliveryAddress === "") {
	       uni.showToast({
	         title: '收货地址不能为空',
	         icon: 'none',
	         duration: 2000
	       });
	       return; // 如果收货地址为空，则停止执行后续代码
	  }
	 try{
		 if(localTitle.value==="姓名"){
			const res = await reviseName(formData)

			if(res.data.code===200){
				uni.showToast({
				 		  	title: '修改成功',
				 		  	icon: 'success',
				 		  	duration: 2000
				})
				  uni.switchTab({
				 		url: '/pages/userInfo/userInfo'
				  });
			}else if(res.data.code===20002){
				uni.showToast({
					title: '护士姓名不能为空，请重新输入',
					icon: 'none',
					duration: 2000
				})
			}
			else{
				uni.showToast({
					title: '修改失败，请重新尝试',
					icon: 'none',
					duration: 2000
				})
			}
		 }else if(localTitle.value==="密码"){
			const res = await revisePassword(formData)

			if(res.data.code==200){
				uni.showToast({
				 		  	title: '修改成功',
				 		  	icon: 'success',
				 		  	duration: 2000
				})
				  uni.switchTab({
				 		url: '/pages/userInfo/userInfo'
				  });
			}else if(res.data.code==20002){
				uni.showToast({
					title: '原密码输入不正确，请重新输入',
					icon: 'none',
					duration: 2000
				})
			}else{
				uni.showToast({
					title: '修改失败，请稍后尝试',
					icon: 'none',
					duration: 2000
				})
			}
		 }else if(localTitle.value==="收货地址"){
			 // 接口修改
			const res = await reviseName(formData)

			if(res.data.code===200){
				uni.showToast({
				 		  	title: '修改成功',
				 		  	icon: 'success',
				 		  	duration: 2000
				})
				  uni.switchTab({
				 		url: '/pages/userInfo/userInfo'
				  });
			}else if(res.data.code===20002){
				uni.showToast({
					title: '收货地址不能为空，请重新输入',
					icon: 'none',
					duration: 2000
				})
			}
			else{
				uni.showToast({
					title: '修改失败，请重新尝试',
					icon: 'none',
					duration: 2000
				})
			}
		 }

	 }catch(e){
		 console.log(e);
		 uni.showToast({
		       title: '修改失败，请稍后再试',
		       icon: 'none',
		       duration: 2000
		     });
	 }
};
  
</script>

<template>
	<view style="overflow: hidden;">
		<view>
			<firstAidNavigation
			 :nav-text=navEnum.reviseInfo
			 @return="Return"
			 :isShowSubmit="true"
			 @submit="Submit"
			/>
		</view>
		<view style="margin:180rpx 0;">
			<view>
				<uni-forms ref="form" :value="formData" validate-trigger="submit" err-show-type="toast">
					<uni-forms-item name="name" v-model="formData.name" v-if="localTitle === '姓名'">
						<text class="text_inputBox">姓名</text>

						<up-input inputAlign="right" placeholder="请输入姓名" :clearable='true'
							shape="circle" class="test1" 
							v-model="formData.name" trim="both" fontSize="30rpx" maxlength="10">
						</up-input>
					</uni-forms-item>
					<uni-forms-item name="password" v-model="formData.oldPassword" v-if="localTitle === '密码'">
							<text class="text_inputBox">原密码</text>
							<up-input inputAlign="right" placeholder="请输入原密码" :clearable='true'
							shape="circle" class="test1" trim="both" :focus="focusPassword" fontSize="30rpx"
							@blur="focusPassword = false" v-model="formData.oldPassword" type="password"
							></up-input>
					</uni-forms-item>
					<uni-forms-item name="password2" v-model="formData.newPassword" v-if="localTitle === '密码'">
						<text class="text_inputBox">新密码</text>
						<up-input inputAlign="right" placeholder="请输入新密码" :clearable="true"
								 class="test1" trim="both" :focus="focusPassword2" shape="circle" fontSize="30rpx"
								@blur="focusPassword2 =false" v-model="formData.newPassword" type="password"></up-input>
					</uni-forms-item>
					<uni-forms-item name="password3" v-model="formData.newPasswordConfirm" v-if="localTitle === '密码'">
					  <text class="text_inputBox">确认密码</text>
					  <up-input inputAlign="right" placeholder="请再次输入新密码" :clearable="true"
					           class="test1" trim="both" shape="circle" fontSize="30rpx"
					           @blur="focusPasswordConfirm = false" v-model="formData.newPasswordConfirm" type="password"></up-input>
					</uni-forms-item>
					
					<uni-forms-item name="department" v-model="formData.department" v-if="localTitle === '科室'">
						<view class="register_form_input">
						  <text class="text_inputBox1">科室</text>
						  <view class="register_form_fun">
						    <uni-data-select v-model="formData.departmentId" :localdata="departmentSelectRange"
						                     placeholder="请选择所属科室" required type="text"  style="text-align: right;"></uni-data-select>
						  </view>
						</view>
					</uni-forms-item>
					
					<uni-forms-item name="deliveryAddress" v-model="formData.deliveryAddress" v-if="localTitle === '收货地址'">
						<text class="text_inputBox">收货地址</text>
					
						<up-input inputAlign="right" placeholder="请输入收货地址" :clearable='true'
							shape="circle" class="test1" 
							v-model="formData.deliveryAddress" trim="both" fontSize="30rpx" maxlength="10">
						</up-input>
					</uni-forms-item>
				</uni-forms>
			</view>
		</view>
	</view>
	
</template>

<style lang="scss" scoped>
	@import '@/common/styles/color/color.scss';
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
		color: $main-blue;
	}
	.test1{
		background-color: #f3f3f3;
		height: 60rpx;
		width: 96%;
		border: 2rpx solid #f3f3f3;
		border-radius:90rpx ;
		border: transparent;
	}
	.text_inputBox1{
		position: absolute;
		z-index: 1;
		margin: 15rpx 25rpx;
		font-weight: bolder;
		font-size:28rpx;
	}
</style>
