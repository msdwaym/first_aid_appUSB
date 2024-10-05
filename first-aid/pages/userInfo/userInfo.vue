<script>
	import firstAidNavigation from "@/components/first-aid-navigation/first-aid-navigation.vue";
	import userInfoBox from "@/pages/userInfo/component/userInfoBox.vue"
	import {navEnum} from "@/common/enum/enum.js";
	import { removeToken } from "@/util/token";
	import { getNurseInfo ,LoginOut,getAccountInfo} from "@/api/userInfo";
	import { ref } from "vue";
	export default{
		components:{
			firstAidNavigation,userInfoBox
		},
		computed: {
		  navEnum() {
		    return navEnum
		  }
		},
		data() {  
			return {  
			  items: [
				{ label: "姓名", value: "", isExpand: true },  
				{ label: "密码", value: "", isExpand: true },  
				{ label: "医院", value: "", isExpand: false },
				{ label: "科室", value: "", isExpand: false },
				{ label: "收货地址", value: "", isExpand: true },
			  ],
			show : ref(false),
			nurseId:'',
			integral : ref()//用户积分
			};  
		},
		onShow() {  
		    this.getInfo();
	    }, 
		methods:{
			getInfo:async function(){
				const res = await getNurseInfo()
				const rs = await getAccountInfo()
				this.integral=rs.data.data.integral
				// console.log(res.data);
				this.nurseId=res.data.data.id;
				// console.log(this.nurseId);
				const userData = res.data.data;  
				    this.items.forEach(item => {  
				      switch (item.label) {  
				        case '姓名':  
				          item.value = userData.nurseName || '';  
				          break;  
				        case '收货地址':  
				          item.value = userData.deliveryAddress;  
				          break;  
				        case '密码':  
				          // 注意：出于安全考虑，前端通常不处理或显示密码  
				          item.value = '******';  
				          break;  
				        case '医院':  
				          item.value = userData.hospital;  
				          break;  
				        case '科室':  
				          item.value = userData.department;  
				          break;  
				        default:  
				          item.value = '';  
				      }  
				    });

			},
			toFeedback(){
				uni.navigateTo({
					// 需要nurseId
					url:`/pages/feedback/feedback?nurseId=${this.nurseId}`
				})
			},
			 torevisePart(index) {
			    const item = this.items[index];  
			    uni.navigateTo({  
			      url: `/pages/userInfo/revisePart/revisePart?label=${item.label}&value=${item.value}`  
			    });  
			},
			handleLoginOut(){
				this.openPop()
			},
			closePop(){
				this.show = false;  
			},
			openPop(){
				this.show = true;  
			},
			confirmLoginOut:async function(){
				this.closePop()

				await LoginOut()
				removeToken()
				uni.reLaunch({
					url:'/pages/login/login'
				})
			}
			
		}
	}
</script>

<template>

  <view style="overflow: hidden;">
    <firstAidNavigation
        :isReturn="false"
        :nav-text="navEnum.userInfo"
    />

    <!-- 用户信息 -->
    <view style="margin-top: 160rpx;">
		<!-- 积分商城 -->
		<view>
			<view class="integralBoxCss">
			  <text>我的积分:<text class="integralCss">{{integral}}</text></text>
			  <view style="float: right;display: flex;align-items: center;justify-content: center;">
			  	<image src="../../static/userInfo/pointsMall.png" style="width: 50rpx; height: 50rpx;" mode=""></image>
			  	<text class="textCss">积分商城</text>
			  </view>
			</view>
		</view>
      <view v-for="(item, index) in items" :key="index">
        <userInfoBox :isExpand="item.isExpand" :titleText="item.label" :valueText="item.value"
                     @torevisePart="torevisePart(index)"/>
      </view>
      <view class="loginOutBtnBox">
        <view class="loginOutBtn" @click="handleLoginOut()">
          退出登录
        </view>
      </view>
      <view class="feedbackBtn" @click="toFeedback">
        有问题？去反馈！
      </view>

      <up-popup :round="10" :show="show" mode="bottom" @close="closePop()" @open="openPop()">
        <view class="popBoxCss">
          <view>
            <view class="handleLoginoutCss" @click="confirmLoginOut()">
              退出登录
            </view>
          </view>
          <view style="height: 30rpx; background-color:#f1f4f9;"></view>
          <view style="margin: 0 0 50rpx 0;">
            <view class="handleLoginoutCss" @click="closePop()">
              取消
            </view>
          </view>
        </view>
      </up-popup>
    </view>
  </view>
</template>

<style lang="scss" scoped>
	@import '@/common/styles/color/color.scss'; 
.InfoBoxCss{
	padding: 20rpx 10rpx;
	border-bottom: 2rpx solid lightgray;
}
.spanCss{
	display: inline-block;
	margin: 5rpx 40rpx;
}
.feedbackBtn{
	color: $main-blue;
	font-size: 30rpx;
	margin-top: 80rpx;
	display: flex;
	justify-content: center; 
	align-items: center;
}
.loginOutBtnBox{
	margin-top: 20rpx;
	height: 100rpx;
	// margin-top: 60rpx;
	display: flex;
	justify-content: center; 
	align-items: center;
}
.loginOutBtn{
	color: #ff4e6e;
}
.handleLoginoutCss{
	height: 100rpx;
	display: flex;  
	justify-content: center; 
	align-items: center;
	border-bottom: 2rpx solid lightgray;
	background-color: #fff;
}
body{
	height: fit-content;
}
.login_img {
  width: 100%;
  height: auto;
  margin-top: 220upx;
}
.integralBoxCss{
	padding: 20rpx 50rpx ;
	border-bottom: 2rpx solid lightgray;
}
.login_img text{
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
}
.textCss{
	color:  $main-blue;
	font-weight: bolder;
	margin-left: 20rpx;
}
.integralCss{
	color:  $main-blue;
	font-weight: bolder;
	font-size: 40rpx;
	padding: 10rpx;
}
</style>
