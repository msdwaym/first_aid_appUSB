<script setup>
	import firstAidNavigation from "@/components/first-aid-navigation/first-aid-navigation.vue";
	import {navEnum} from "@/common/enum/enum.js";
	import {Return} from "@/util/router.js";
	import { ref ,onMounted,computed} from 'vue';
	import {getHospitalList,getDepartmentList} from "../../api/register";
	import { getNurseInfo } from "../../api/userInfo";
	import { getCode ,addMedicalTrolley ,getConfigTemplateList } from "../../api/medicalTrolleyInfo";
	import {padString} from "@/util/encode.js"
	import {writeEPCMachine,initMachine, endMachine} from "@/util/machine.js";
	import {onLoad, onUnload,onShow,onHide} from '@dcloudio/uni-app'
	import {TagScanAgent} from "../../util/agent/TagScanAgent";
	import store from "../../store";
	
	const formData= ref({
		hospitalId: "",
		departmentId: "",
		configId: "",
		medicalTrolleyCode:""
	})
	const hospitalSelectRange = ref([]);
	const hospitalSelectValue = ref('');
	const departmentSelectRange = ref([]);
	const configSelectRange = ref([]);
	const departmentSelectValue = ref('');
	const isCodeFetched = ref(false);
	const disableSelect = ref(false);
	let tagScanAgent = null
	const formDataChange= ref( {
        name: false,
        jobNumber: false,
        account: false,
        password: false,
        confirmPassword: false,
        hospitalId: false,
        departmentId: false,
        phoneNumber: false,
		ConfigTemplateId:''
      });
	const isReviseData = ref(false);
	async function getHospital() {  
	  getHospitalList().then(res => {  
	    if (res.data.code === 200) {  
	      res.data.data.forEach(item => {  
	        item.value = item.id;  
	        item.text = item.hospitalName;  
	      });  
	      hospitalSelectRange.value = res.data.data;
	    }  
	  });  
	}
	
	async function getnurseInfo(){
	  const res = await getNurseInfo();  
	  if(res.data.data.hospitalId && res.data.data.departmentId){
		  getHospital()
		  hospitalSelectChange(res.data.data.hospitalId)
		  formData.value.hospitalId = res.data.data.hospitalId
		  formData.value.departmentId = res.data.data.departmentId
		  disableSelect.value = true;
		  getConfigList(res.data.data.hospitalId)
	  }else{
		  disableSelect.value = false;
	  }
	}
	
	function hospitalSelectChange(e) {  
	  getDepartmentList({ hospitalId: e.value }).then(res => { 
	    if (res.data.code === 200) {  
	      res.data.data.forEach(item => {  
	        item.value = item.id;  
	        item.text = item.departmentName;  
	      });  
	      departmentSelectRange.value = res.data.data;
	    }
	  });  
	}
	function getConfigList(id){
		getConfigTemplateList(id).then(res=>{
		  if(res.data.code === 200){
			  res.data.data.forEach(item=>{
				  item.value = item.id;
				  item.text = item.medicalTrolleyName
			  })
			  configSelectRange.value = res.data.data
		  }
		})
	}
	async function getMedicalTrolleyCode(){

		const data = {
			hospitalId:formData.value.hospitalId,
			departmentId:formData.value.departmentId
		}
		// console.log(data);
		if (!data.hospitalId || !data.departmentId) {  
		    uni.showToast({  
		      title: '请先选择所属医院和科室',  
		      icon: 'none',  
		      duration: 2000  
		    });  
		    return; // 如果有空值，则退出函数  
		} 
		const res =  await getCode(data)
		if (res && res.data && res.data.code === 200) {  
		  formData.value.medicalTrolleyCode = res.data.data;
		  isCodeFetched.value = true;
		  uni.showToast({
		  	title: '获取急救车编码成功',
		  	icon: 'success',
		  	duration: 2000
		  })
		} else {  
			uni.showToast({
				title: '获取急救车编码失败,请稍后再试，或联系管理员',
				icon: 'none',
				duration: 2000
			})
		}
	}
	
	async function handleWrite(){
		uni.showLoading({
		        title: '正在写入标签，请稍后',  
		        mask: true // 显示遮罩层，防止用户进行其他操作  
		});
		if(isCodeFetched.value){
			//格式化急救车编码
			const code = padString(formData.value.medicalTrolleyCode)
			console.log(code);
			try{
				//初始化标签
				 initMachine()
					//写入标签操作
					const re1 = writeEPCMachine(code)
					console.log(re1);
					if(re1.code == 200){
						//添加入数据库
						const res = await addMedicalTrolley(formData.value)

						if(res.data.code === 200){
							uni.hideLoading();
							uni.showToast({
								title: '写入成功',
								icon: 'success',
								duration: 2000
							})
							uni.switchTab({
								url:'/pages/homepage/homepage'
							})
						}else{
							uni.hideLoading();
							uni.showToast({
								title: '数据存入失败，请稍后重试',
								icon: 'none',
								duration: 2000
							})
						}
					}else{
						uni.hideLoading();
						uni.showToast({
							title: '标签写入失败，请对准标签，重新尝试扫描',
							icon: 'none',
							duration: 2000
						})
					}
					endMachine()
			}catch(e){
				console.log(e);
				endMachine()
			}
		}else{
			endMachine()
			uni.showToast({
				title: '请先获取急救车编码',
				icon: 'none',
				//显示持续时间为 2秒
				duration: 2000
			})
		}
		
	}
	onMounted(() => {
		getHospital()
		getnurseInfo()
	});
	onLoad(()=>{
		
	})
	function handleScan(event){
		if(event.keyCode === 134){
			plus.key.removeEventListener('keydown',handleScan)
			getMedicalTrolleyCode().then(()=>{
				handleWrite()
			})
		}
	}
	function handleStop(event){
		if(event.keyCode === 134){
			plus.key.addEventListener('keydown',handleScan)
		}
	}
	onUnload((options) => {
	  plus.key.removeEventListener('keydown',handleScan)
	  plus.key.removeEventListener('keyup',handleStop)
	  endMachine(false)
	  tagScanAgent.destory(false)
	})
	onShow(()=>{
		plus.key.addEventListener('keydown',handleScan)
		plus.key.addEventListener('keyup',handleStop)
		tagScanAgent = new TagScanAgent(store.state.tagUtil)
		// tagScanAgent.setKeyDownListener(beforeHandleStart)
		tagScanAgent.init(500)
		tagScanAgent.setCallBackFn(handleWrite)
	})
	onHide(()=>{
		plus.key.removeEventListener('keydown',handleScan)
		plus.key.removeEventListener('keyup',handleStop)
		tagScanAgent.destory(false)
	})
</script>

<template>
	<view style="overflow: hidden;">
		<firstAidNavigation
		 :nav-text=navEnum.medicalTrolleyRecord
		 @return="Return"
		/>
		
		<view class="contentBox">
			
			<form>
				<view class="register_form_input">
				  <view class="register_form_name"><span style="color: red;">*</span>所属医院</view>
				  <view class="register_form_fun">
				    <uni-data-select v-model="formData.hospitalId" :localdata="hospitalSelectRange" placeholder="请选择所属医院"
				                     required :disabled="disableSelect"
				                     type="text" @change="hospitalSelectChange" :clear="!disableSelect"></uni-data-select>
				  </view>
				</view>
				
				
				<view class="register_form_input">
				  <view class="register_form_name"><span style="color: red;">*</span>所属科室</view>
				  <view class="register_form_fun">
				    <uni-data-select v-model="formData.departmentId" :localdata="departmentSelectRange"
				                     placeholder="请选择所属科室" required type="text" 
									 :disabled="disableSelect" :clear="!disableSelect"></uni-data-select>
				  </view>
				</view>
				
				<view class="register_form_input">
				  <view class="register_form_name"><span style="color: red;">*</span>所属模板</view>
				  <view class="register_form_fun">
				    <uni-data-select v-model="formData.configId" :localdata="configSelectRange"
				                     placeholder="请选择所属模板" required type="text" 
									  :clear="!disableSelect" ></uni-data-select>
				  </view>
				</view>
				
				<view class="register_form_input">
				  <view class="register_form_name"><span style="color: red;">*</span>急救车编码</view>
				  <view class="register_form_fun">
				    <input v-model="formData.medicalTrolleyCode" class="fontColor" name="medicalTrolleyCode" placeholder="" disabled="true" required type="text">
				  </view>
				</view>
				<!-- <view class="register_form_register">
				  <button @click="getMedicalTrolleyCode"></button>
				</view> -->
				<view class="register_form_register"  @click="getMedicalTrolleyCode" >
					<up-button size="large" shape="circle">
						获取急救车编码
					</up-button>
				</view>
			</form>
			
			<!-- <view class="writeIn"  @click="handleWrite" >
				<up-button size="large" shape="circle"  color="rgba(137, 207, 251, 1)">
					写入标签
				</up-button>
			</view> -->
		</view>
	</view>
</template>

<style lang="scss" scoped>
	@import '@/common/styles/color/color.scss';
	.contentBox{
		margin:180rpx 50rpx;
	}
	.fontColor{
		font-weight: bolder;
		color: $main-blue;
	}
.register_form_input {
  width: 100%;
  height: 25px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px #eee solid;
  padding: 50upx 0px;
  margin: 0px auto;
}
.register_form_name {
  width: 30%;
}
.register_form_fun {
  width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
.register_form_register {
  width: 100%;
  // height: 50px;
  line-height: 50px;
  margin-top: 100upx;
}
.writeIn{
	width: 100%;
	color: $main-blue;
	margin-top: 100upx;
	float: right;
	font-weight: bolder;
}

</style>
