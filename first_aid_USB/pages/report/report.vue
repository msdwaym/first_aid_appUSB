<script>
	import firstAidNavigation from "@/components/first-aid-navigation/first-aid-navigation.vue";
	import dataTimePicker from "@/uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.vue"
	import {navEnum} from "@/common/enum/enum.js";
	import {getInventoryRecord} from "@/api/report.js";
	import { getNurseInfo} from "@/api/userInfo";
	import { ref ,onMounted} from 'vue';
	export default{
		components:{
			firstAidNavigation,dataTimePicker
		},
		computed: {
		  navEnum() {
		    return navEnum
		  }
		},
		methods:{
			getInventory:async function(data1){
				try {  
					// 本地缓存内不存在用户医院id数据，故而重新获取
					
				      const res = await getInventoryRecord(data1);  
					console.log(res);
				      const data = await getNurseInfo();  
 
				  
				      // 检查两个响应是否都成功返回，并且包含有效的data对象  
				      if (res.data && data.data && res.data.data && data.data.data) {  
				        // 比较两个hospitalName字段  
				        if (res.data.data.result.hospitalName === data.data.data.hospitalName) {  
				          if (res.data.code === 200) {  
				            this.inventoryRecords = res.data.data.result; // 更新库存记录
							this.totalRecords = res.data.data.total;
				          } else {  
				            console.error('获取库存记录失败，状态码：', res.data.code);  
				          }  
				        } else {  
				          console.warn('暂未获取到该医院下的报表');  
				        }  
				      } else {  
				        console.error('数据不完整，无法处理');  
				      }  
				    } catch (error) {  
				      console.error('获取数据时发生错误：', error);  
				    }  
			},
			search(res) {
				const data = {
					medicalTrolleyCode:res.value,
					...this.dateTimeData
				}
			    this.getInventory(data)
			},
			clear(res){
				this.getInventory()
			},
			change(e){
				const data = {
					startTime:e[0],
					endTime:e[1]
				}
				this.getInventory(data)
			},
			tabChange(index) {  
					this.datetimerange = '';
			        let startTime1, endTime1;  
			        const now = new Date();  
			        const year = now.getFullYear();  
			        const month = now.getMonth() + 1;  
			        const day = now.getDate();
					let data;
			        switch (index.index) {  
			            case 1: // 今日  
			                startTime1 = new Date(year, month - 1, day, 0+8, 0, 0);
							endTime1 = new Date(year, month - 1, day, 23+8, 59, 59); 
			                break;  
			            case 2: // 本周  
			                const startDayOfWeek = now.getDate() - now.getDay() + (now.getDay() === 0 ? -6 : 0); // 确保周日为一周的第一天
			                startTime1 = new Date(year, month - 1, startDayOfWeek, 0+8, 0, 0);  
							endTime1 = new Date(year, month - 1, startDayOfWeek + 6, 23+8, 59, 59); // 本周最后一天（周六）  
			                break;  
			            case 3: // 本月  
			                startTime1 = new Date(year, month - 1, 1, 0+8, 0, 0);  
			                endTime1 = new Date(year, month, 0, 23+8, 59, 59); // 本月最后一天的日期和时间  
			                break;  
			            default:  
			                // 默认或“全部”选项，不设置时间
			                startTime1 = '';  
			                endTime1 = '';  
			                break;  
			        }  
			        if(index.index!=0){
						 data = {
						    startTime: this.formatDateTime(startTime1.toISOString()),  
						    endTime: this.formatDateTime(endTime1.toISOString())  
						};
					}else if(index.index==0){
						 data = {
						    startTime: startTime1,  
						    endTime: endTime1  
						};
					}
					this.dateTimeData = data
			        this.getInventory(data);
			},
			formatDateTime(dateTimeStr) {  
			      const match = dateTimeStr.match(/^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}:\d{2})(?:\.\d+)?(Z?)$/);  
			      if (!match) {  
			        throw new Error('Invalid date-time format');  
			      }  
			      return `${match[1]} ${match[2]}`;  
			},
			async nextPage() {  
				if (this.currentPage < Math.ceil(this.totalRecords / this.pageSize)) {  
					this.currentPage++;  
					// 构建分页参数，这里简单假设data中包含了分页信息  
					const data = {  
						pageNum: this.currentPage,  
						pageSize: this.pageSize,
						...this.dateTimeData
					};
					await this.getInventory(data);  
				}
			},
			async returnPage() {
				if (this.currentPage > 1) {  
					this.currentPage--;  
					// 构建分页参数，这里简单假设data中包含了分页信息  
					const data = {  
						pageNum: this.currentPage,  
						pageSize: this.pageSize,
						...this.dateTimeData
					};  
					await this.getInventory(data);  
				}else{
					
				}  
			},
			checkInfo(data) {
				console.log(data);
				uni.navigateTo({
					url:`/pages/reportDetails/reportDetails?id=${data.id}&medicalTrolleyCode=${data.medicalTrolleyCode}`
				})
			}
		},
		data() {
		    return {  
		      isActive: null,
			  tabsList:([
				  {
					name: "全部",
				  },
				  {
					name:"今日",
				  },
				  {
					name:"本周",
				  },
				  {
					name:"本月",
				  }
				]),
				inventoryRecords: [],
				datetimerange: '',
				searchValue:'',
				currentPage: 1,  // 当前页码  
				pageSize: 10,   // 每页显示的记录数  
				totalRecords: 0,
				dateTimeData:{}
		    };  
		} ,
		onShow() {
			this.searchValue='';
			this.getInventory();
		} 
	}
</script>

<template>
  <firstAidNavigation
      :isReturn="false"
      :nav-text=navEnum.report
  />

  <view style="margin-top:160rpx ;">
    <view class="tabs">
      <uni-search-bar v-model="searchValue"
                      class="SearchBoxCss"
                      placeholder="请输入急救车编码"
                      radius="100"
                      cancelButton="none"
                      @clear="clear"
                      @confirm="search"
                      @input="input">
      </uni-search-bar>
      <view>
        <u-tabs :activeStyle="{
				            color: 'rgba(137, 207, 251, 1)',
				            fontWeight: 'bold',
				            transform: 'scale(1.05)'
				        }"
                :inactiveStyle="{
				            color: '#606266',
				            transform: 'scale(1)'
				        }"
                :list="tabsList"
                lineColor="rgba(137, 207, 251, 1)"
                style="display: inline-block;width: 400rpx;"
                @change="tabChange">
        </u-tabs>
        <view style="margin: 20rpx 13rpx; width: 351px;">
          <uni-section :title="'日期时间范围用法：' + '[' + datetimerange + ']' " type="line"></uni-section>
          <view class="example-body">
            <uni-datetime-picker v-model="datetimerange" rangeSeparator="至" type="datetimerange" @change="change"/>
          </view>
        </view>
      </view>
      <view class="tableBoxCss">
        <uni-table border emptyText="暂无更多数据" stripe style="font-size: 10rpx;">
          <!-- 表头行 -->
          <uni-tr>

            <uni-th align="center" style="width: 40rpx;">盘点时间</uni-th>
            <uni-th align="center" style="width: 80rpx;">盘点人</uni-th>
            <uni-th align="center" style="width: 12rpx;">急救车</uni-th>
            <uni-th align="center" style="width: 60rpx;">已处理</uni-th>
          </uni-tr>
          <!-- 表格数据行 -->
          <uni-tr v-for="record in inventoryRecords" :key="record.id" @click="checkInfo(record)">

            <uni-td align="center">{{ record.inventoryTime }}</uni-td>
            <uni-td align="center">{{ record.nurseName }}</uni-td>
            <uni-td align="center">{{ record.medicalTrolleyCode }}</uni-td>
            <uni-td align="center">{{ record.totalNum }}</uni-td> <!-- 如果为null则显示'无' -->
          </uni-tr>

        </uni-table>
      </view>
	<view class="pageButtonCss">
		<view class="returnPageCss">
			<view @click="returnPage">上一页</view>
		</view>
		
		<view class="nextPageCss">
			<view @click="nextPage">下一页</view>
		</view>  
	</view>
	<view class="pageInfoCss">
		<span>第<span class="fontColor">{{currentPage}}</span>页</span>
		<span>共<span class="fontColor">{{totalRecords}}</span>条</span>
	</view>

    </view>
  </view>
</template>

<style lang="scss" scoped>
	@import '@/common/styles/color/color.scss'; 
.tableBoxCss{
	width: 700rpx;
	font-size: 10rpx;
	margin-left: 15rpx;
}
.tableBoxCss uni-table uni-th{
	width: 100rpx;
}
.pageButtonCss{
	display: inline-block;
	margin: 50rpx 60rpx;
	color: white;
	font-weight: bolder;
	height: 50rpx;
	width: 50%;
	padding: 8rpx;
}
.returnPageCss{
	width:150rpx;
	float: left;
	background-color:$main-blue;
	text-align: center;
}
.nextPageCss{
	width: 150rpx;
	float:right;
	background-color:$main-blue;
	text-align: center;
}
.pageInfoCss{
	padding-top: 6rpx;
	height: 50rpx;
	width: 30%;
	float: right;
	text-align: center;
	display: inline-block;
	margin: 50rpx 0;
}
.fontColor{
	color:$main-blue;
}
</style>
