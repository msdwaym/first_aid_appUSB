<script setup>
	import firstAidNavigation from "@/components/first-aid-navigation/first-aid-navigation.vue";
	import {Return} from "@/util/router.js";
	import {ref,watch} from 'vue';
	import {onLoad,onHide,onShow,onUnload} from '@dcloudio/uni-app';
	import {getMedicalByCode} from '@/api/materialUseRegistration.js'
	import {getMedicalTrolleyInfo} from '@/api/medicalTrolleyInfo.js'
	import {restoreString} from "@/util/encode.js"
	import { endMachine, getTagsMachine, initMachine,readMachine, startMachine ,stopMachine} from "../../util/machine";

	const isLoading = ref(false);
	const titleText = ref("");
	const remindText = ref("");
	const index = ref();
	const items = ref();
	const materialInfo = ref({
		medicalName: '',//物品名称
		specification: '',//规格
		code: '',//物资编码
		expirationDate: '',//有效期
		medicalTrolleyCode: ''//急救车编码
	})
	// 信息弹窗状态
	const showDetailInfo = ref(false)
	const scanningState = ref(false)
  // 创建代理对象
  let tagScanAgent = null

	onLoad((options)=>{
		titleText.value = options.title;
		index.value = options.index;
		switch(options.index){
			case "0" :
			case "1" :
				remindText.value = "急救车";
				break;
			case "2" :
				remindText.value = "物资";
				break;
			case "3" :
				remindText.value = "急救车或物资"
				break;
			case "4" :
				remindText.value = "急救车";
				break;
			default:
				console.log("error")
				console.log("页面管理异常，请尝试重新登录或者联系管理员")
				break;
		}
	})
  // 开始扫描
	const handleStart = (data)=>{
		switch(index.value){
			case "0" :
			case "1" :
			case "4" :
			case "5" :
				handleScan(data)
				break;
			case "2" :
				uni.showLoading({
					title: '正在扫描物资标签，请稍后',
					mask: true
				});
				isLoading.value = true
				handleScanMaterial(data)
				break;
			case "3":
				checkInfo(data)
				break;
		}
	}
	let intervalID;
	let timeoutID;
	const TIMEOUT_DURATION = 2000;
	function executeSequence() {
	  readMachine();
	  const res = getTagsMachine();
	  if (res.code === "200" && !(res.data.length === 0)) {
	    clearInterval(intervalID);
	    clearTimeout(timeoutID);
	    handleStart(res.data)
	  }
	}

	const beginScan = () =>{
		startMachine();
		stopMachine()
		uni.showLoading({
			title: '正在扫描标签，请稍后',
			mask: true
		});
		intervalID = setInterval(executeSequence, 500);
		timeoutID = setTimeout(() => {
		clearInterval(intervalID);
		  uni.showToast({
		    title: '未扫描到标签，请重新尝试',
		    icon: 'none',
		    duration: 2000
		  });
		}, TIMEOUT_DURATION);
	}

	// 扫描急救车标签
	const handleScan = async (data) => {
		let code=null;
		if(data.length!==10||data.data.length!==10){
			 code = toFindCode(data,10)
		}else{
			 code = data
		}
		if (!code) {
			remind(data)
			hideAllLoading()
			return
		} else {
			try{
				const data = restoreString(code)
				const res = await getMedicalTrolleyInfo();//查找急救车
				items.value = res.data.data;
				const matchedItem = items.value.find(item => item.medicalTrolleyCode === data);
				if (matchedItem) {
					navTo(matchedItem,true)
				} else {
					remind("未扫描到所在科室的急救车标签,请确保10厘米内，无其他标签干扰")
					hideAllLoading()
				}
			} catch (error) {
				console.log('扫描过程中发生错误:', error);
				hideAllLoading()
			}
		}
	}


		//扫描物资标签
	const handleScanMaterial = async(data) =>{
			let code=null;
			if(data.length!==20||data.data.length!==20){
				 code = toFindCode(data,20)
			}else{
				 code = data
			}
			if(!code){
				hideAllLoading()
				remind("未扫描到物资标签,请确保10厘米内，无其他标签干扰")
				return;
			}
			try {
				const restoreCode = restoreString(code)
				//根据获取到的物资编码，查询物资信息
				const data = {
					code:restoreCode
				}
				const res =  await getMedicalByCode(data)
				if (res.data.data) {
					const rs = res.data.data
					const medicalTrolleyInfoList = await getMedicalTrolleyInfo();
					// 遍历 items 数组，查找匹配的 medicalTrolleyCode
					const matchedItem = medicalTrolleyInfoList.data.data.find(item => item.id === rs.medicalTrolleyId);
					if(index.value === "3"){
						showDetailInfo.value = true
						materialInfo.value = {
							medicalName: rs.name,//物品名称
							specification: rs.specification,//规格
							code: rs.code,//物资编码
							expirationDate: rs.expirationDate,//有效期
							medicalTrolleyCode: matchedItem.medicalTrolleyCode,//急救车编码
							used:rs.used===0?"未使用":"已使用",//使用情况
							count:rs.count//剩余数量
						}
					}else if(index.value === "2"){
						// tagScanAgent.destory(false)
						//跳转到使用物资页面
						uni.navigateTo({
						  url: `/pages/materialUseRegistration/index?code=${matchedItem.medicalTrolleyCode}&id=${matchedItem.id}`
						});
					}else if(index.value === "1"){
						// tagScanAgent.destory(false)
						uni.navigateTo({
						  url: `/pages/materialInfoRegistration/index?code=${matchedItem.medicalTrolleyCode}&id=${matchedItem.id}`
						});
					}
				} else {
					uni.showToast({
						title: '暂无此标签数据',
						icon: 'none',
						duration: 2000
					});
				}
				hideAllLoading()
			} catch (error) {
				console.error('扫描过程中发生错误:', error);
				hideAllLoading()
				}
			}

	const handleReturn = ()=>{
		Return()
	}

	const remind = (text)=>{
		uni.showToast({
			title: text,
			icon: 'none',
			duration: 2000
		});
	}
onShow(() => {
	initMachine()
})
onUnload(()=>{
	endMachine(false)
})
onHide(()=>{
	endMachine(false)
})


  const navTo = (matchedItem,isCar)=>{
	hideAllLoading()
	if(isCar){
		// tagScanAgent.destory(false)
		uni.navigateTo({
			url:`/pages/MaterialModule/MaterialModule?code=${matchedItem.medicalTrolleyCode}&id=${matchedItem.id}`
		})
	}
  	if(index.value === "0"){
		// tagScanAgent.destory(false)
  		//跳转盘点页面
  		uni.navigateTo({
  		  url:`/pages/checkInfo/index?code=${matchedItem.medicalTrolleyCode}&id=${matchedItem.id}`
  		});
  	}else if(index.value === "1"){
		// tagScanAgent.destory(false)
  		//跳转补充物资页面
  		uni.navigateTo({
  		  url: `/pages/materialInfoRegistration/index?code=${matchedItem.medicalTrolleyCode}&id=${matchedItem.id}`
  		});
  	}else if(index.value === "4"){
		// tagScanAgent.destory(false)
  		//跳转补充物资页面
  		uni.navigateTo({
  		  url: `/pages/initLabelRegistration/initLabelRegistration?code=${matchedItem.medicalTrolleyCode}&id=${matchedItem.id}`
  		});
  	}else if(index.value === "5"){
		// tagScanAgent.destory(false)
  		//跳转急救车信息页面
  		uni.navigateTo({
  		  url: `/pages/MaterialModule/MaterialModule?code=${matchedItem.medicalTrolleyCode}&id=${matchedItem.id}`
  		});
  	}
  }

  const checkInfo = (data) => {
	  let rs =  toFindCode(data,10)
	   if(rs){//查看急救车信息
		   handleScan(data)
	   }else{
		   let rs1 = toFindCode(data,20)
		   if(rs1){
			   handleScanMaterial(data)
		   }else{
			   remind("未扫描到符合的标签，请确保10厘米内无其他标签干扰，并且对准标签后重新尝试")
			   hideAllLoading()
		   }
	   }
  }
  const toFindCode = (codes,length) =>{
	  if(!codes.data){
		  const data = codes.find(item =>restoreString(item).length === length)
		  if(data){
		  		  return restoreString(data)
		  }else{
		  		  return null
		  }
	  }else{
		  const data = codes.data.find(item =>restoreString(item).length === length)
		  if(data){
		  		  return restoreString(data)
		  }else{
		  		  return null
		  }
	  }
  }
  const hideAllLoading = () =>{
	  uni.hideLoading()
	  isLoading.value = false
  }
</script>

<template>
	<view style="overflow: hidden;">
		<firstAidNavigation :nav-text=titleText :isReturn="true" @return="handleReturn"  />
		<view class="contentBox">
			<view style="margin: 20rpx 0 0 50rpx; font-weight: bolder; font-size: 40rpx;">
				<text>请扫描<text style="color:rgba(137, 207, 251, 1);font-weight: bolder;">{{remindText}}</text>标签</text>
			</view>
			<view class="imgCss">
				<image src="../../static/deviceInstruction.png" mode=""></image>

				<!-- 加载状态 -->
				<view class="loadingBox">
					<up-loading-icon :show="isLoading" text="扫描中" textSize="18"></up-loading-icon>
				</view>
			</view>

			<view class="returnBtnBox">
				<view class="returnBtnCss">
					<view @click="beginScan()">扫描</view>
				</view>
				<view class="returnBtnCss">
					<view @click="handleReturn">返回</view>
				</view>
				<!-- <view class="button-group">
					<up-button
						text="扫描"
						:type="scanningState ? 'error' : 'success'"
						@click="() => {beginScan()}"
					></up-button>
				</view> -->
			</view>
			<!-- 弹窗（查看物资信息） -->
			<up-overlay :show="showDetailInfo">
				<view class="warp">
					<view class="header">
						<text>物资信息</text>
						<u-button @click="showDetailInfo = false">
							<up-icon name="close" color="#ffffff"></up-icon>
						</u-button>
					</view>
					<view class="body">
						<u-form labelWidth="175upx">

							<u-form-item label="名称:">
								{{materialInfo.medicalName}}
							</u-form-item>

							<u-form-item label="编码:">
								{{materialInfo.code}}
							</u-form-item>

							<u-form-item label="所属急救车:">
								{{materialInfo.medicalTrolleyCode}}
							</u-form-item>

							<u-form-item label="规格:">
								{{materialInfo.specification}}
							</u-form-item>

							<u-form-item label="使用情况:">
								{{materialInfo.used}}
							</u-form-item>

							<u-form-item label="剩余数量:">
								{{materialInfo.count}}
							</u-form-item>

							<u-form-item label="有效期:">
								{{materialInfo.expirationDate}}
							</u-form-item>
						</u-form>
					</view>
				</view>
			</up-overlay>
		</view>
	</view>
</template>

<style lang="scss" scoped>
@import '@/common/styles/color/color.scss';

	.contentBox {
		margin: 180rpx 50rpx;
	}
	.imgCss{
		margin-top: 100rpx;
	}
	.returnBtnBox{
		margin-top: 200rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.returnBtnCss{
		width: 280rpx;
		background-color:$main-blue;
		text-align: center;
		color: white;
		font-weight: bolder;
		border-radius: 20rpx;
		display: inline-block;
		padding: 25rpx 0;
		margin: 0 5rpx;
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
	  border-radius: 50upx;
	  box-shadow: 0 0 10upx;
	  padding-left: 30upx;
	  padding-bottom: 30upx;
	  border: #8f939c 5upx solid;

	  .header {
	    display: flex;
	    justify-content: space-between;
	    width: 100%;
	    height: fit-content;

	    text {
	      padding-top: 20upx;
	      font-size: 52upx;
	      font-weight: 700;
	    }

	    button {
	      width: 100upx;
	      height: 100upx;
	      margin: 0;
	      background-color: #32b5f0;
	      border-radius: 50upx;
	    }
	  }

	  .body {
	    margin-top: 5upx;
	    margin-right: 20upx;
	    margin-bottom: 50upx;

	    :deep(.u-form-item__body) {
	      padding: 45upx 0 0 0;
	      //box-shadow: 1upx 1upx 1upx 1px rgba(0, 0, 255, .2);
	    }

	    :deep(.u-form-item__body__left__content) {
	      border-bottom: #32b5f0 solid 2upx;
	      font-weight: 500;
	      width: fit-content;
	    }

	    :deep(.u-form-item__body__right) {
	      //box-shadow: 0 0 3upx;
	      margin-left: 15upx;
	      border-bottom: #8f939c80 solid 2upx;
	      //border-radius: 10upx;
	      margin-right: 10upx;
	      padding-left: 10upx;
	      min-width: 100upx;
	    }
	  }

	  .footer {
	    display: flex;
	    justify-content: center;
	    font-weight: 400;

	    .button-group {
	      display: flex;
	      justify-content: space-between;

	      .u-button {
	        width: 150upx;
	        height: 80upx;
	        background-color: #32b5f0;
	        color: #ffffff;
	        border-radius: 10upx;

	        &:nth-child(2) {
	          margin-left: 50upx;
	        }
	      }
	    }

	    .header {
	      height: fit-content;
	      margin: 20upx 0;
	      display: flex;
	      text-align: center;
	      justify-content: center;
	      color: #0033cc;
	    }
	  }

	  .uni-forms {
	    :deep(.uni-forms-item__label) {
	      padding: 0;
	    }

	    :deep(.uni-forms-item) {
	      padding: 0;
	      margin-bottom: 20upx;
	    }

	    :deep(.uni-forms-item__content) {
	      border: 2upx solid #00000040;
	      padding: 5upx 10upx;
	      border-radius: 5upx;
	    }
	  }
	}
	u-form-item {
	  border: none;
	  padding-top: 20upx;
	}
</style>
