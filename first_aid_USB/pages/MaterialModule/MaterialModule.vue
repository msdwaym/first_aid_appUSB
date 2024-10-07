<script setup>
	import firstAidNavigation from "@/components/first-aid-navigation/first-aid-navigation.vue";
	import {navEnum} from "@/common/enum/enum.js";
	import {ReturnHomepage} from "@/util/router.js";
	import {ref,computed} from "vue";
	import {getInvebtoryRecord} from "@/api/inventoryInfo.js"
	import dayjs from 'dayjs';
	import {getMaterialInfo} from "@/api/materialInfo.js"
	import {onLoad,onShow} from '@dcloudio/uni-app'

	const medicalTrolleyCode = ref();
	const isLoading = ref(true);
	const id = ref();
	onLoad((options)=>{
		// console.log(options.code);
		medicalTrolleyCode.value=options.code
		id.value = options.id
		getInfo()
	})
	onShow(()=>{
		getInfo()
	})
	const inventoryRecords = ref([]);// 用于存储盘点记录数据
	const materialInfoValue = ref({ // 用于存储获取的物资信息
	  countShould: 0, // 应有物资数
	  countNow: 0, // 现有物资数
	  supplementNum: '', // 应补充数
	  expiredCloseNum: 0, // 即将过期数
	  expiredNum: 0 // 已过期数
	});


	async function  getTakeStockInfo() {
	  const data = {
	    medicalTrolleyCode: medicalTrolleyCode.value
	  };
	    await getInvebtoryRecord(data).then(res => {
		  inventoryRecords.value = res.data.data.result;
	    }).catch(error => {
	      console.error('Failed to fetch inventory record:', error);
	    });
    }
	function navTest() {
    uni.navigateTo({
      url:`/pages/checkInfo/index?code=${medicalTrolleyCode.value}&id=${id.value}`
    })
	}
	function handleInitialize(){
		uni.navigateTo({
		  url:`/pages/initLabelRegistration/initLabelRegistration?code=${medicalTrolleyCode.value}&id=${id.value}`
		})
	}
  function navToDetailInfo() {
    uni.navigateTo({
      url:`/pages/medicalInfo/index?code=${medicalTrolleyCode.value}&id=${id.value}`
    })
  }
	 function handleUse() {
	   uni.navigateTo({
		 url: `/pages/materialUseRegistrationPass/materialUseRegistrationPass?code=${medicalTrolleyCode.value}&id=${id.value}`
	   });
	 }

  function handleInfo() {
    uni.navigateTo({
      url: `/pages/materialInfoRegistrationPass/materialInfoRegistrationPass?code=${medicalTrolleyCode.value}&id=${id.value}`
    });
  }
	async function getMInfo(){//获取物资信息
	const data = {
	  code: medicalTrolleyCode.value
	};
		const res = await getMaterialInfo(data.code)

		processInventoryData(res.data.data)
	}

	function getInfo(){
		getMInfo()
		getTakeStockInfo()

	}

	function processInventoryData(data) {

	  if (!data || !Array.isArray(data) || data.length === 0) {
	    materialInfoValue.value = {
	      countShould: 0,
	      countNow: 0,
	      supplementNum: '',
	      expiredCloseNum: 0,
	      expiredNum: 0
	    };
	    return; // 提前退出函数
	  }

	  let countShould = 0;
	  let countNow = 0;
	  let expiredCloseNum = 0;
	  let expiredNum = 0;

	try{
		data.forEach(tier => {
			tier.medicalConfigs.forEach(config => {
				countShould += config.unitNum;
			  config.medicalDetails.forEach(detail => {
				if (!detail || typeof detail.total !== 'number' || typeof detail.count !== 'number' || !detail.expirationDate) {
				  console.error('Detail data is incomplete or invalid.');
				  return; // 跳过当前详情
				}


				countNow += detail.count;

				const expirationDate = dayjs(detail.expirationDate);
				if (!expirationDate.isValid()) {
				  console.error('Expiration date is invalid.');
				  return; // 跳过当前日期的处理
				}

				const now = dayjs();
				const diff = expirationDate.diff(now, 'day');

				if (detail.used === 0 && detail.available === 0) {
					if (diff < 0) { // 已过期
					  expiredNum++;
					} else if (diff < 7 && diff >= 0) { // 即将过期
					  expiredCloseNum++;
					}
				}
			  });
			});
		  });
	}catch(e){
		console.log(e);
	}

	materialInfoValue.value = {
	  countShould,
	  countNow,
	  supplementNum: countShould - countNow + expiredNum, // 计算应补充数
	  expiredCloseNum,
	  expiredNum
	};
	isLoading.value = false
	
}

function inventoryDetail(data){
	console.log(data);
	uni.navigateTo({
		url:`/pages/reportDetails/reportDetails?id=${data.id}&medicalTrolleyCode=${data.medicalTrolleyCode}`
	})
}
</script>

<template>
	<view style="overflow: hidden;">
			<firstAidNavigation
			 :nav-text=navEnum.medicalTrolleyInfo
			 @return="ReturnHomepage"
			/>

			<view class="contentBox">
				<view>
					<span class="titleCss">
						{{navEnum.medicalTrolley}}:
					</span>  {{medicalTrolleyCode}}
				</view>
				<view class="MaterialInfoBox" @click="navToDetailInfo">
					<span class="titleCss">{{navEnum.materiralInfo}} :</span>
					<span class="titleCss" style="float: right;">查看详情</span>
					<scroll-view class="scroll-container1" scroll-y="true">
						<view v-show="!isLoading">
							<view>
								<span>应有物资总量：</span> {{ materialInfoValue.countShould }}
							</view>
							<view>
								<span>现有物资数量：</span> {{ materialInfoValue.countNow }}
							</view>
							<view>
								<span>应补充物资数量：</span> {{ materialInfoValue.countShould - materialInfoValue.countNow + materialInfoValue.expiredNum}}
							</view>
							<view>
								<span>即将过期数量：</span> {{ materialInfoValue.expiredCloseNum }}
							</view>
							<view>
								<span>已过期数量：</span> {{ materialInfoValue.expiredNum }}
							</view>
						</view>
						<view style="margin-top: 100rpx;">
							<up-loading-icon :show="isLoading" text="加载中" textSize="18"></up-loading-icon>
						</view>
					</scroll-view>
				</view>
				<view class="TakeStockBox">
				    <span class="titleCss">{{ navEnum.takeStock }} :</span>
					<scroll-view v-if="inventoryRecords.length > 0" class="scroll-container" scroll-y="true">
						<view class="inventory-record" v-for="record in inventoryRecords" :key="record.id" @click="inventoryDetail(record)">
							<view style="display: inline-block;margin-right: 40rpx;">
								{{ record.nurseName }}
							</view>
							<view style="display: inline-block;">
								{{ record.inventoryTime }}
							</view>
						</view>
					</scroll-view>
					<view v-else class="showNoData">暂无数据</view>
				</view>
				<view style="margin: 100rpx auto 0 auto;display: flex;">
					<view style="display: inline-block;">
						<u-button class="elseButton" @click="navTest">盘点</u-button>
						<u-button class="elseButton" @click="handleInitialize">初始标签</u-button>
					</view>

					<view style="display: inline-block;">
						<u-button class="elseButton" @click="handleInfo">补充物资</u-button>
						<u-button class="elseButton" @click="handleUse">使用物资</u-button>
					</view>
				</view>
			</view>
	</view>

</template>

<style lang="scss" scoped>
	@import '@/common/styles/color/color.scss';
.contentBox{
	margin:180rpx 50rpx 0 50rpx;
}
.Inventory{
	width: 325rpx;
	height: 280rpx;
	display: flex;
	justify-content: center; // 水平居中
	align-items: center; // 垂直居中
	background-color:$main-blue;
	color: white;
	font-weight: bolder;
}
.elseButton{
	width: 325rpx;
	height: 139rpx;
	display: flex;
	justify-content: center; // 水平居中
	align-items: center; // 垂直居中
	background-color:$main-blue;
	color: white;
	font-weight: bolder;
}
.MaterialInfoBox{
	margin: 50rpx 0;
}
.TakeStockBox{
	margin: 50rpx 0;
}
.navBoxCss{
	height: 700px;
	width: 100%;
	box-sizing: border-box;
	margin-top: 180upx;
}
.titleCss{
	color: $main-blue;
	font-weight: bolder;
}
.textAreaCss{
	margin: 10rpx 0;
	width: 552rpx;
	border: 1px solid lightgray;
	padding: 10rpx 40rpx;
}
 .inventory-record {
    margin: 20rpx;
  }
 .scroll-container {
    height: 200rpx; /* 设置一个固定的高度 */
    border: 1px solid lightgray;
    padding: 10rpx;
  }
  .scroll-container1{
	  height: 300rpx; /* 设置一个固定的高度 */
	  border: 1px solid lightgray;
	  padding: 10rpx;
  }
  .scroll-container1 view{
	   margin: 10rpx;
  }
.inventory-record > view:first-child {  // 选择第一个view，即nurseName所在的view
    display: inline-block;
    width: calc(50% - 110rpx);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-right: 40rpx;
  }
  .inventory-record > view:nth-child(2) {
      display: inline-block;
      width: calc(60% - 50rpx);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-right: 40rpx;
    }
	.showNoData{
		margin: 50rpx 240rpx;
		color: $main-blue;
	}
</style>
