<script setup>
	import firstAidNavigation from "@/components/first-aid-navigation/first-aid-navigation.vue";
	import {navEnum} from "@/common/enum/enum.js";
	import {Return} from "@/util/router.js";
	import InfoCardBoxVue from "@/components/InfoCardBox/InfoCardBox.vue";
	import { ref ,computed} from 'vue';
	import {getMaterialUsed,revertMaterial} from "@/api/materialInfo.js"
	import {onLoad} from '@dcloudio/uni-app'
	import {getNurseInfo} from '@/api/userInfo.js';
	
	const medicalTrolleyCode = ref('');
	const materials = ref([]);
	const materialData = ref();
	const showAllMaterials = ref(false);
	const input = ref('');
	const nowNurseId = ref();
	const showConfirm = ref();
	const textRemind = ref('确认还原该物资吗');
	const visibleMaterials = computed(() => {  
	  let filteredMaterials = [];  
	  if (showAllMaterials.value) {  
	    filteredMaterials = materials.value.map(material => ({  
	      ...material,  
	      showBtn: !(material.type === '已还原' || (nowNurseId.value !== null && material.nurseId !== nowNurseId.value))  
	    }));  
	  } else {  
	    filteredMaterials = materials.value.slice(0, 10).map(material => ({  
	      ...material,  
	      showBtn: !(material.type === '已还原' || (nowNurseId.value !== null && material.nurseId !== nowNurseId.value))  
	    }));  
	  }  
	  return filteredMaterials;  
	});
	const searchArr = ref([
	  {
	    value: 0,
	    text: '物资使用记录'
	  },
	  {
	    value: 1,
	    text: '过期注销记录'
	  },
	  {
	    value: 2,
	    text: '异常缺失记录'
	  }
	])
	const pageTitle = ref('')
	
	onLoad(async (options)=>{
		medicalTrolleyCode.value=options.medicalTrolleyCode
		getRecordInfo(null,options.type)
		pageTitle.value = searchArr.value[options.type]
		const res = await getNurseInfo()
		nowNurseId.value = res.data.data.id
	})

	const toggleShowAll = () => {  
	  showAllMaterials.value = !showAllMaterials.value;  
	};
	
	async function getRecordInfo(data,targetType) {
		const data1 = {
			medicalTrolleyCode:medicalTrolleyCode.value,
			message:data
		}
	  const res = await getMaterialUsed(data1);//查看res是否返回物资编码；
	  console.log(res);
	  if (res.data.code === 200 && res.data.data && res.data.data.result) {
	    materials.value = res.data.data.result.filter(item => item.type === Number(targetType)).map(item => ({  
	      name: item.name,
	      nurseName: item.nurseName,  
	      num: item.num,   
	      type: getTypeDescription(item.type),
	      consumeTime: item.consumeTime,
		  id:item.id,
		  nurseId:item.nurseId,
		  code:item.code
	    }));
	  } else {  
	    console.error('Failed to fetch material used records:', res.message || 'Unknown error');  
	  }  
	}
	
	function search(e){
		// console.log(e);
		getRecordInfo(e.value,pageTitle.value.value)
	}
	
	function clear(e){
		getRecordInfo(e.value,pageTitle.value.value)
	}
	
	function getTypeDescription(type) {  
	  switch (type) {  
	    case 0:  
	      return '正常使用';  
	    case 1:  
	      return '过期注销';  
	    case 2:  
	      return '异常缺失'; 
		case 4:
		  return '已还原'
	    default:  
	      return '未知类型';
	  }  
	}
	
	async function returnOperation(){
		const data = {
			consumeRecordId:materialData.value.id,
			nurseId:materialData.value.nurseId
		}
		const res = await revertMaterial(data)
		if(res.data.code === 70009){
			uni.showToast({
				title: res.data.message,
				icon: 'none',
				duration: 2000
			});
		}
		getRecordInfo(null,pageTitle.value.value)
		showConfirm.value = false;
	}
	
	function showModal(data){
		showConfirm.value = true;
		materialData.value = data
	}
	
	async function selectionChange(value){
	  getRecordInfo(null,value)
	  pageTitle.value = searchArr.value[value]
	  const res = await getNurseInfo()
	  nowNurseId.value = res.data.data.id
	  input.value = undefined
	}
	
</script>

<template>
	<view style="overflow: hidden;">
		<firstAidNavigation
		 :nav-text="pageTitle.text"
		 @return="Return"
		/>
		<view class="contentBox">
			<view>
				<span class="titleCss">{{navEnum.medicalTrolley}}:</span>
				 {{medicalTrolleyCode}}
				<view style="width: 40%; display: inline-block;float: right;">
					<uni-data-select
						v-model="pageTitle.value" :localdata="searchArr"
						class="picker" type="text" :clear="false" @change="selectionChange">
					</uni-data-select>
				</view>
			</view>
			<uni-search-bar  @confirm="search"
							 @input="input"
							 @clear="clear"
							 v-model="input"
							 cancelButton="none"
							 radius="100"
							 placeholder="请输入使用人姓名,物资名或物资编码"
							 class="SearchBoxCss">
			</uni-search-bar>
			<view class="contentTotalBox">
				<view v-if="visibleMaterials.length === 0" class="no-data-message">  
				        暂无数据  
				</view>
			      <InfoCardBoxVue  
			        v-for="(material, index) in visibleMaterials"  
			        :key="index"  
			        :showBtn="material.showBtn"  
			        :showData="false"  
			        viewText="医疗物资"  
			        :view1Text="material.nurseName"  
			        :view1Date="material.consumeTime"  
			        :viewDate="material.name"  
			        :usedNum="material.num"  
			        :type="material.type"
					btnText="还原"
					:showView3=true
					view3Text="物资编码"
					:view3Date="material.code"
					:showDetail="() => showModal(material)"
			      />  
				  <!-- 弹窗确认 -->
				 <up-modal
				     :show="showConfirm"
				     title="还原通知"
				     content='确认还原该物资吗?'
				     :showCancelButton='true'
				     @confirm="() => returnOperation(material)"
				     @cancel="() => {showConfirm = false}"
				 />
				 </view>  
			  
			    <view v-if="materials.length > 10" class="showMoreButton">  
			      <u-button  
			        class="pageButtonCss"  
			        size="mini"  
			        :text="showAllMaterials ? '收起' : '显示更多'"  
			        @click="toggleShowAll"  
			      />  
			    </view> 
			
			<view>
			</view>
		</view>
	</view>
</template>

<style lang="scss" scoped>
	@import '@/common/styles/color/color.scss';  
.contentBox{
	margin:180rpx 50rpx;
}
.Inventory{
	width: 325rpx;  
	height: 280rpx;  
	display: flex;
	justify-content: center; // 水平居中  
	align-items: center; // 垂直居中  
}
.elseButton{
	width: 325rpx;
	height: 139rpx;
	display: flex;
	justify-content: center; // 水平居中
	align-items: center; // 垂直居中 
}
.MaterialInfoBox{
	margin: 50rpx 0;
}
.TakeStockBox{
	margin: 50rpx 0;
}
.SearchBoxCss{
	margin:25rpx;
}
.contentEachBox{
	padding: 20rpx 50rpx;
	margin:100rpx 50rpx;
	border: 1px solid lightgray;
}
.contentEachBox view{
	margin-bottom:20rpx ;
}
.pageButtonCss{
	display: inline-block;
	margin: 50rpx 85rpx;
	background-color:$main-blue;
	color: white;
	font-weight: bolder;
	width: 150rpx;
	height: 50rpx;
	padding: 8rpx;
}
.active-button {  
  background-color: $main-blue;  
  color: white;  
}
.titleCss{
color: $main-blue;
font-weight: bolder;
}
.showMoreButton {  
  margin-top: 20rpx;  
  text-align: center;  
}
.no-data-message {  
    text-align: center;  
    color: $main-blue; 
    padding: 20rpx;  
}

</style> 
