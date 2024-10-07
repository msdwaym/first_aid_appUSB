<template>
  <firstAidNavigation :nav-text="'物资登记'" @return="backToHome" @toLabelRecords="getToRecords" :isReturn="true" :isShowLabelInfo="true" />
  <view style="overflow: hidden;">
    <view class="contentBox">
      <view style="margin: 20rpx auto 0 50rpx; font-size: 40rpx;">
        <text style="color: #00b2ff">直接登记</text>
        <text style="font-size: 28upx">
          为初始化标签并进行物资登记操作
        </text>
      </view>
      <view style="margin: 20rpx auto 0 50rpx; font-size: 40rpx;">
        <text style="color: #00b2ff">补充登记</text>
        <text style="font-size: 28upx">
          为已初始化标签进行物资信息绑定
        </text>
      </view>
      <view class="imgCss">
        <image src="../../static/deviceInstruction.png"></image>
      </view>

      <view class="returnBtnBox">
        <view class="returnBtnCss">
          <view @click="navigate('/pages/materialInfoRegistrationAuto/materialInfoRegistrationAuto')">直接登记</view>
        </view>
        <view class="returnBtnCss">
          <view @click="navigate('/pages/materialInfoRegistration/index')">补充登记</view>
        </view>
        <view class="returnBtnCss">
          <view @click="Return">返回</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import {Return} from "../../util/router";
import {ref} from "vue";
import {onLoad} from '@dcloudio/uni-app'
import FirstAidNavigation from "../../components/first-aid-navigation/first-aid-navigation.vue";

const medicalTrolleyCode = ref(null)
const id = ref(null)

function navigate(path) {
  uni.navigateTo({
    url: path + `?code=${medicalTrolleyCode.value}&id=${id.value}`
  })
}

const backToHome = () => {
  uni.navigateBack({
    delta:1,//返回层数，2则上上页
  })
}

const getToRecords = () => {
  uni.navigateTo({
    url: `/pages/invokedInitLabelRecords/invokedInitLabelRecords?code=${medicalTrolleyCode.value}&id=${id.value}`
  });
}

onLoad((options)=> {
  medicalTrolleyCode.value = options.code
  id.value = options.id
})
</script>

<style lang="scss" scoped>
@import '@/common/styles/color/color.scss';

.contentBox {
  margin: 25vw 20rpx 0 30rpx;
  height: fit-content;
  position: absolute;
}
.imgCss{
  margin-top: 100rpx;
}
.returnBtnBox{
  margin-top: 300rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 50upx;
}
.returnBtnCss{
  width: 200rpx;
  background-color:$main-blue;
  text-align: center;
  color: white;
  font-weight: bolder;
  border-radius: 20rpx;
  display: inline-block;
  padding: 25rpx 0;
  margin-left: 20upx;

  //&:nth-child(3) {
  //  margin-left: 0;
  //}
}
.scanBtnCss{
  width: 300rpx;
  background-color:$main-blue;
  text-align: center;
  color: white;
  font-weight: bolder;
  border-radius: 20rpx;
  display: inline-block;
  padding: 25rpx 0;
}
.loadingBox{
  margin-top: 50rpx;
  height: 50rpx;
}
.warp {
  width: 600upx;
  height: fit-content;
  background-color: #ffffff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10upx;
  box-shadow: 0 0 10upx;
  padding-left: 30upx;
  padding-bottom: 30upx;

  .header {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: fit-content;

    text {
      font-size: 36upx;
      font-weight: 700;
    }

    button {
      width: 150upx;
      height: 60upx;
      margin: 0;
      background-color: #32b5f0;
    }
  }

  .modalCss {
    margin-top: 15upx;
    margin-right: 20upx;

    :deep(.u-form-item__body) {
      padding: 20upx 0 0 0;
    }

    :deep(.u-form-item__body__right) {
      margin-right: 10upx;
      padding-left: 10upx;
      min-width: 100upx;
      line-height: 60upx;
    }
  }

}
u-form-item {
  border: none;
  padding-top: 20upx;
}
</style>
