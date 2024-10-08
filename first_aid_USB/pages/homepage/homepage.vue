<script>
	import firstAidNavigation from "@/components/first-aid-navigation/first-aid-navigation.vue";
	import InfoCardBoxVue from "@/components/InfoCardBox/InfoCardBox.vue";
	import {navEnum,materialEnum} from "@/common/enum/enum.js";
	import {Return} from "@/util/router.js";
	import {getNurseInfo} from "@/api/userInfo";
	import {getMedicalTrolleyInfo} from "@/api/medicalTrolleyInfo";
	import {initMachine,readMachine,endMachine,testMachine, startMachine} from "@/util/machine.js";
	import {restoreString} from "@/util/encode.js"
	import {TagUtil} from "../../util/TagUtil";
	export default {
		components: {
			firstAidNavigation,
			InfoCardBoxVue
		},
		computed: {
			navEnum() {
				return navEnum
			},
			materialEnum() {
				return materialEnum
			},
			mainBlue() {
				return colorsTotal.mainBlue;
			}
		},
		data() {
			const tagUtil = new TagUtil();
			// const SixUniTts = uni.requireNativePlugin("SmallSix-SixUniTts")
			// SixUniTts.initSixUniTts()
			tagUtil.init()
			return {
        connectedState: false,
				text:'氧气枕,氧气枕',
				isActive: null, // 可以是 'prev', 'next', 或 null
				items: [],
				// SixUniTts,
				departmentName: '',
				searchInput: '',
				filteredItems: [],
				showHighlight: false,
				steps: [
                    {
                        class: '.SearchBoxCss',
                        text: '操作一：你好，这是第一次提示。'
                    }
                ],
				iconTextPairs: [
					{
						icon: '../../static/homepage/Inventory.png',
						text: '盘点物资',
						index:0
					},
					{
						icon:'../../static/homepage/addMaterial.png',
						text:'补充物资',
						index:1
					},
					{
						icon:'../../static/homepage/useMaterial.png',
						text:'使用物资',
						index:2
					},
					{
						icon:'../../static/homepage/checkInfo.png',
						text:'查看信息',
						index:3
					},
					{
						icon:'../../static/homepage/InitializeTag.png',
						text:'初始标签',
						index:4
					}
				]
			};
		},
		methods: {
			Return,
			showDetail(items) {
				uni.navigateTo({
					url: `/pages/MaterialModule/MaterialModule?code=${items.medicalTrolleyCode}&id=${items.id}`
				})
			},
			getAmbulanceInfo: async function() {
				try {
					// 获取用户的科室名
					const data = await getNurseInfo();
					this.departmentName = data.data.data.department

					const res = await getMedicalTrolleyInfo();
					const sortedItems = res.data.data.sort((a, b) => new Date(b.registrationTime) - new Date(a
						.registrationTime));
					const processedItems = sortedItems.map(item => {  
						const date = new Date(item.registrationTime);  
						const formattedDate = date.toISOString().slice(0, 10);  
						return { ...item, registrationTime: formattedDate };  
					});
					this.items = processedItems; // 将排序后的数据赋值给items
					this.filteredItems = processedItems;
					console.log(this.filteredItems);
				} catch (error) {
					console.error('Failed to fetch medical trolley info:', error);
				}
			},
			toMedicalTrolleyRecord() {
				uni.navigateTo({
					url: `/pages/medicalTrolleyRecord/medicalTrolleyRecord`
				})
			},
			handleScan: async function() {
				uni.showLoading({
					title: '正在扫描标签，请稍后',
					mask: true // 显示遮罩层，防止用户进行其他操作
				});
				initMachine(); // 初始化标签
				const readMachineData = readMachine(0, null, 2, 6, 1)
				if (readMachineData.data === "CMD_NO_TAG_ERROR") {
					uni.hideLoading();
					uni.showToast({
						title: '未扫描到标签',
						icon: 'none',
						duration: 2000
					});
					endMachine(); // 结束扫描
				} else {

					try {
						const restoreCode = restoreString(readMachineData.data)
						// 遍历 items 数组，查找匹配的 medicalTrolleyCode
						const matchedItem = this.items.find(item => item.medicalTrolleyCode === restoreCode);

						if (matchedItem) {
							// 找到匹配的项，导航到 MaterialModule 页面并传递参数
							uni.navigateTo({
								url: `/pages/MaterialModule/MaterialModule?code=${matchedItem.medicalTrolleyCode}&id=${matchedItem.id}`
							});
						} else {
							uni.showToast({
								title: '未扫描到所在科室的急救车编码',
								icon: 'none',
								duration: 2000
							});
						}
						uni.hideLoading();
						endMachine(); // 结束扫描
					} catch (error) {
						console.error('扫描过程中发生错误:', error);
						uni.hideLoading();
						endMachine(); // 即使超时，也结束扫描
					}
				}

			},
			handleInput(value) {
				this.searchInput = value; // 更新输入值
				if (value == '' || value == null) {
					this.filteredItems = this.items
				}
			},
			handleSearchConfirm() {
				this.filteredItems = this.items.filter(item => item.medicalTrolleyCode === this.searchInput);
			},
			handleError(event) {
			    console.error('图片加载失败:', event.target.src);
			},
			handleScanBtn(value){
				uni.navigateTo({
					url:`/pages/scanpage/scanpage?title=${value.text}&index=${value.index}`
				})
			},
			connect() {
				initMachine()
				 const res1 = startMachine()
				 this.connectedState = res1.state
				 if(this.connectedState){
					 uni.showToast({
						title: '设备连接成功',
						icon: 'none',
						duration: 2000
					});
				 }else{
					 uni.showToast({
						title: '设备连接失败，请检查设备连接是否正常',
						icon: 'none',
						duration: 2000
					});
				 }
			},
			disConnect(){
				uni.showModal({
				    title: '关闭连接',
				    content: '是否需要断开设备连接',
				    success: function (res) {
				        if (res.confirm) {
				            endMachine(false)
				            uni.showToast({
				            	title: '设备已断开连接',
				            	icon: 'none',
				            	duration: 2000
				            });
							this.connectedState = false
				        }
				    }.bind(this)
				});
			},
		},
		onShow() {
			this.searchInput = ''
			this.getAmbulanceInfo();
			initMachine()
			const res = startMachine()
			this.connectedState = res.state
		},
		onLoad(){
			const res = startMachine()
			this.connectedState = res.state
		}
	}
</script>

<template>

	<view style="overflow: hidden;">
		<firstAidNavigation :nav-text=navEnum.medicalTrolley :isReturn="false" :isShowConnection="true" :isConnected="connectedState"
                        @disConnect="disConnect" @connect="connect"/>
		<view style="margin: 180rpx 0 0 40rpx;display: flex; align-items: center;">
			<view v-for="(pair, index) in iconTextPairs" :key="index" class="icon-text-pair" @click="() => handleScanBtn(pair)">
				<view class="imgCss">
					<image :src="pair.icon" @error="handleError" style="width: 60rpx; height: 60rpx;" @click="() => handleScanBtn(pair)" mode=""></image>
				</view>
				<text>{{ pair.text }}</text>
			</view>
		</view>
		<view class="contentBox">

			<uni-search-bar @confirm="handleSearchConfirm" @input="handleInput" radius="100" placeholder="请输入急救车编号"
				class="SearchBoxCss" :class="{'highlight': showHighlight}"   v-model="searchInput" cancelButton='none'>
			</uni-search-bar>


			<!-- 急救车信息盒子 -->
			<view style="margin: 50rpx 0;" v-for="(item, index) in filteredItems" :key="index"
				@click="() => showDetail(item)">
				<InfoCardBoxVue :showDetail="() => showDetail(item)" :viewDate="departmentName"
					:view1Date=item.medicalTrolleyCode :view2Date=item.registrationTime :showView3=true view3Text="负责人" :view3Date=item.nurseName>
				</InfoCardBoxVue>
			</view>
			<view v-if="filteredItems.length === 0" class="noDataCss">暂无数据</view>
			<view style="margin: 50rpx 0;font-weight: bolder;">
				<button style="height: 180rpx; width: 650rpx;color:rgba(137, 207, 251, 1) ;padding: 35rpx;" @click="toMedicalTrolleyRecord">+登记急救车</button>
			</view>
			<!-- 底部tabbar -->
		</view>
		<!-- 引导提示 -->
		<!-- <yi-step-tip ref="step" :steps="steps"></yi-step-tip> -->
	</view>
</template>

<style lang="scss" scoped>
	@import '@/common/styles/color/color.scss';

	.SearchBoxCss {
		margin: 25rpx;
	}

	.contentBox {
		margin: 50rpx 50rpx;
	}

	.buttonCss {
		display: inline-block;
		background-color: $main-blue;
		color: white;
		border: 1px solid white;
		height: 48rpx;
		margin-left: 280rpx;
		text-align: center;
	}

	.tabs {
		height: 100rpx;
	}

	.noDataCss {
		margin: 100rpx 260rpx;
		color: $main-blue;
	}
	.imgCss{
		background-color: #00b2ff;
		width: 90rpx;
		height: 90rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 20rpx;
	}
	.icon-text-pair{
		margin: 0 20rpx;
		font-size: 22rpx;
		align-items: center;
		justify-content: center;
	}
</style>
