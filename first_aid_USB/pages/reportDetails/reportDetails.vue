<script setup>
	import {onLoad} from '@dcloudio/uni-app'
	import {navEnum} from "@/common/enum/enum.js";
	import { ref } from 'vue';
	import InfoCardBoxVue from "@/components/InfoCardBox/InfoCardBox.vue";
	import {Return} from "@/util/router.js";
	import firstAidNavigation from "@/components/first-aid-navigation/first-aid-navigation.vue";
	import {getInfoByInventoryId} from '@/api/materialInfo.js'
	import {getMedicalByDetailId} from '@/api/materialUseRegistration.js'
	
	
	const medicalTrolleyCode = ref('');
	const inventoryRecordId = ref('');
	const reportInfo = ref({})
	const visibleMaterials = ref('')
	const currentPage = ref(1)  // 当前页码
	const pageSize = ref(10)  // 每页显示的记录数
	const showDetailInfo = ref(false)	// 信息弹窗状态
	const materialInfo = ref('')
	const input = ref()
	onLoad(async (options)=>{
		inventoryRecordId.value = options.id
		medicalTrolleyCode.value = options.medicalTrolleyCode
		getMaterialInfoById()
	})
	async function getMaterialInfoById(data){
		const data1 = {
			pageNum:currentPage.value,
			pageSize:pageSize.value,
			inventoryRecordId:inventoryRecordId.value,
			message:data
		}
		const res = await getInfoByInventoryId(data1)
		console.log(res);
		visibleMaterials.value = res.data.data.result.map(item => ({  
	      name: item.name,
	      nurseName: item.nurseName,  
	      num: item.num,   
	      type: getTypeDescription(item.type),
	      consumeTime: item.consumeTime,
		  id:item.id,
		  nurseId:item.nurseId,
		  medicalDetailId:item.medicalDetailId,
		  code:item.code
	    }));
	}
	function getTypeDescription(type) {
	  switch (type) {  
	    case 0:  
	      return '盘点时标记为正常使用';  
	    case 1:  
	      return '盘点时标记为过期注销';  
	    case 2:  
	      return '盘点时标记为异常缺失'; 
		case 4:
		  return '已还原'
	    default:  
	      return '未知类型';
	  }  
	}
	
	const showMes = async(data) =>{
		showDetailInfo.value = true
		await getMedicalByDetailId(data.medicalDetailId).then((res)=>{
			materialInfo.value = {
				...data,
				code:res.data.data.medicalDetailCode,
				count:res.data.data.count,
				specification:res.data.data.specification,
				consumeTime:data.consumeTime,
				expirationDate:res.data.data.expirationDate
			}
		})
	}
	
	function clear(e){
		input.value=undefined
		getMaterialInfoById(e.value)
	}
	function search(e){
		// console.log(e);
		getMaterialInfoById(e.value)
	}
</script>

<template>
	<view style="overflow: hidden;">
		<firstAidNavigation
		 :nav-text=navEnum.reportDetail
		 @return="Return"
		/>
		<view class="contentBox">
			<view>
				<span class="titleCss">{{navEnum.medicalTrolley}}:</span>
				 {{medicalTrolleyCode}}
				 <span class="titleCss" style="margin-left: 50rpx;">已处理物资数量:</span>
				 {{visibleMaterials.length}}
			</view>
			<uni-search-bar  @confirm="search"
							 @input="input"
							 @clear="clear"
							 v-model="input"
							 cancelButton="none"
							 radius="100"
							 placeholder="请输入盘点人姓名,物资名或物资编码"
							 class="SearchBoxCss">
			</uni-search-bar>
			<view class="contentTotalBox">
				<view v-if="visibleMaterials.length === 0" class="no-data-message">  
				        暂无处理数据的记录
				</view>
			      <InfoCardBoxVue  
			        v-for="(material, index) in visibleMaterials"  
			        :key="index"  
					:showBtn="false"
			        :showData="false"  
			        viewText="物资"  
			        :view1Text="material.nurseName"  
			        :view1Date="material.consumeTime"  
			        :viewDate="material.name"  
			        :usedNum="material.num"  
			        :type="material.type"
					:showView3=true
					view3Text="物资编码"
					:view3Date="material.code"
					@click="showMes(material)"
			      />  
			    </view>  
			  
			   <!-- <view v-if="materials.length > 10" class="showMoreButton">  
			      <u-button  
			        class="pageButtonCss"  
			        size="mini"  
			        :text="showAllMaterials ? '收起' : '显示更多'"  
			        @click="toggleShowAll"  
			      />  
			    </view> --> 
			
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
									{{materialInfo.name}}
								</u-form-item>
											
								<u-form-item label="编码:">
									{{materialInfo.code}}
								</u-form-item>
											
								<u-form-item label="所属急救车:">
									{{medicalTrolleyCode}}
								</u-form-item>
											
								<u-form-item label="规格:">
									{{materialInfo.specification}}
								</u-form-item>
											
								<u-form-item label="使用情况:">
									{{materialInfo.type}}
								</u-form-item>
								
								<u-form-item label="使用时间:">
									{{materialInfo.consumeTime}}
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
	.contentBox{
		margin:180rpx 50rpx;
	}
	.no-data-message {
		margin-top: 100rpx;
	    text-align: center;  
	    color: $main-blue; 
	    padding: 20rpx;  
	}
	.titleCss{
	color: $main-blue;
	font-weight: bolder;
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
