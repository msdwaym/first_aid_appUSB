<template>
  <view>
    <view class="tabs">
      <view class="tableBoxCss">
		<!-- 物资使用记录信息盒子 -->
		<view class="MaterialInfoBoxCss" v-for="(record,index) in consumeRecords" :key="index" @click="showInfo(record)">
			<InfoCardBoxVue :showBtn="false" viewText="物资名称" view1Text="编码" 
				view2Text="消耗时间" :showView3=true view3Text="所属急救车" :viewData="record.name" :view1Data=record.code 
				:view2Data=record.consumeTime :view3Data=record.medicalTrolleyCode>
				
			</InfoCardBoxVue>
		</view>
		
		<view v-show="noConsumeRecords" class="noDataCss">
			暂无数据
		</view>
      </view>
     <!-- <view class="pageButtonCss">
        <view class="returnPageCss">
          <view @click="prePage">上一页</view>
        </view>

        <view class="nextPageCss">
          <view @click="nextPage">下一页</view>
        </view>
      </view>
      <view class="pageInfoCss">
        <span>第<span class="fontColor">{{page.pageNum}}</span>页</span>
        <span>共<span class="fontColor">{{page.total}}</span>条</span>
      </view> -->

    </view>
  </view>

  <up-overlay :show="showDetailInfo">
    <view class="warp">
      <view class="header">
        <text>记录信息</text>
        <u-button @click="showDetailInfo = false">
          <up-icon name="close" color="#ffffff" size="36"></up-icon>
        </u-button>
      </view>
      <view class="body">
        <u-form labelWidth="175upx">

          <u-form-item label="名称:">
            {{detailInfo.name}}
          </u-form-item>

          <u-form-item label="编码:">
            {{detailInfo.code}}
          </u-form-item>

          <u-form-item label="耗用人:">
            {{detailInfo.nurseName}}
          </u-form-item>

          <u-form-item label="耗用时间:">
            {{detailInfo.consumeTime}}
          </u-form-item>

          <u-form-item label="科室:">
            {{detailInfo.departmentName}}
          </u-form-item>

          <u-form-item label="所属急救车:">
            {{medicalTrolleyCode}}
          </u-form-item>
        </u-form>
      </view>

      <view class="footer">
        <view class="button-group">
          <up-button
              v-if="detailInfo.nurseId === userInfo.id"
              text="撤销"
              type="primary"
              @click="rollback(detailInfo)"
          ></up-button>
          <up-button
              text="确认"
              type="primary"
              @click="showDetailInfo = false"
          ></up-button>
        </view>
      </view>
    </view>
  </up-overlay>
</template>

<script setup>

import {getNurseInfo} from "../../api/userInfo";
import {getConsumeRecordByPage, revertMaterial} from "../../api/records";
import {onLoad} from '@dcloudio/uni-app'
import { ref } from 'vue';
import InfoCardBoxVue from "@/components/InfoCardBox/InfoCardBox.vue";

const medicalTrolleyCode = ref(null);
const id = ref(null)
const userInfo = ref(null)

const consumeRecords = ref([])

const showDetailInfo = ref(false)
const detailInfo = ref(null)
const noConsumeRecords = ref(true)

const page = ref({
  pageSize: 10,
  pageNum: 1,
  total: 0
})

const showInfo = (detail) => {
  showDetailInfo.value = true
  detailInfo.value = detail
}

const nextPage = () => {
  if (page.value.pageNum !== Math.ceil(page.value.total / page.value.pageSize)) {
    page.value.pageNum += 1
    initData()
  }
}

const prePage = () => {
  if (page.value.pageNum !== 1) {
    page.value.pageNum -= 1
    initData()
  }
}

const initData = async () => {
  const res = await getNurseInfo()
  if (res.data.code === 200) {
    userInfo.value = res.data.data
    const res2 = await getConsumeRecordByPage({
      pageSize: page.value.pageSize,
      pageNum: page.value.pageNum,
      departmentId: res.data.data.departmentId,
      type: 0
    })

    if (res2.data.code === 200) {
      page.value.total = res2.data.data.total
      consumeRecords.value = res2.data.data.result.filter(item => item.type === 0)
	  noConsumeRecords.value = consumeRecords.value==null||consumeRecords.value.length == 0
    } else {
      errorLoad('加载数据失败')
    }
    uni.hideLoading();
  }
}

const getUserData = () => {
  // getNurseInfo().then(res => {
  //   if (res.data.code === 200) {
  //     userInfo.value = res.data.data
  //     console.log(userInfo.value)
  //   }
  // })
}

const rollback = async (detail) => {
  const res = await revertMaterial({
    nurseId: userInfo.value.id,
    consumeRecordId: detail.id,
    medicalConfigId: detail.medicalConfigId
  })

  if (res.data.code === 200) {
    showLoading('操作成功')
    showDetailInfo.value = false
    initData()
  } else {
    errorLoad(res.data.message)
  }
}

const showLoading = (words) => {
  uni.showLoading({
    title: words,
    mask: true
  });
}

const errorLoad = (words) => {
  uni.showToast({
    title: words,
    icon: 'error'
  });
  uni.hideLoading();
}

onLoad((options) => {
  medicalTrolleyCode.value = options.code
  id.value = options.id
  initData()
  getUserData()
})
</script>

<style lang="scss" scoped>
@import '@/common/styles/color/color.scss';

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

.tableBoxCss{
  width: 700rpx;
  // font-size: 10rpx;
  margin: 15rpx;
  padding-top: 50rpx;
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

.uni-table-th {
  height: 75upx;
  line-height: 75upx;
}

.uni-table-td {
  height: 60upx;
  line-height: 60upx;
}

.MaterialInfoBoxCss{
	margin: 40rpx;
}
.noDataCss {
	margin: 200rpx 0 0 300rpx;
	color: $main-blue;
}
</style>
