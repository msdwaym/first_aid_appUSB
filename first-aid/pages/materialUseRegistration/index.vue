<template>
  <firstAidNavigation :nav-text="'物资耗用'" @return="backToHome" @toLabelRecords="getToRecords" :isReturn="true" :isShowLabelInfo="true" />
  <view class="main">
    <view class="header margin-bottom16">
      <text>
        急救车: {{medicalTrolleyCode}}
      </text>

      <text style="font-size: 24upx">
        本次累计消耗标签数: {{totalNum}}
      </text>
    </view>

    <view class="body">
      <view class="content margin-bottom16">
		  <!-- 物资使用信息盒子 -->
		  
		  <view v-show="noData" class="noDataCss">
				请按下扫描枪按钮，开始扫描物资并使用
		  </view>
		  <view v-show="!noData">
			  <MaterialInfoCardBox btnText="撤销使用" :views="viewsData.value"  />
		  </view>
        <!-- <uni-forms :modelValue="formData" label-position="top" ref="form">
          <uni-forms-item  label="物资" name="name">
            <input type="text" v-model="formData.name" disabled/>
          </uni-forms-item>

          <uni-forms-item label="物资编码" name="code">
            <input type="text" v-model="formData.code" disabled/>
          </uni-forms-item>

          <uni-forms-item label="规格" name="specification">
            <input type="text" v-model="formData.specification" disabled/>
          </uni-forms-item>

          <uni-forms-item label="剩余数量" name="num">
            <input type="text" v-model="formData.count" disabled/>
          </uni-forms-item>

          <uni-forms-item label="有效期" name="date">
            <input type="text" v-model="formData.expirationDate" disabled/>
          </uni-forms-item>
        </uni-forms> -->
      </view>
    </view>

    <view class="footer">
      <view class="header">
        <view :style="{color: '#ff000090', fontSize: '72upx'}">
          {{scanStateText}}
        </view>
      </view>
      <view class="header">
        <view>
          请按下扫描枪按钮
        </view>
        <view>
          进行重新扫描操作
        </view>
      </view>

      <view class="button-group">
<!--        <up-button-->
<!--            text="重新扫描"-->
<!--            type="success"-->
<!--            @click="onScan"-->
<!--        ></up-button>-->
<!--        <up-button-->
<!--            text="保存"-->
<!--            type="primary"-->
<!--            @click="onSave"-->
<!--        ></up-button>-->
<!--      </view>-->
    </view>
  </view>

  </view>

  <up-overlay :show="showTips">
    <view class="warp">
      <view class="header">
        <text>扫描标签</text>
        <u-button @click="showTips = false">
          <up-icon name="close" color="#ffffff" size="36"></up-icon>
        </u-button>
      </view>
      <view class="body">
        <view style="margin: auto 0">
          <text>请扫描物资标签以继续操作</text>
        </view>
        <view class="imgCss" style="margin: 25upx 0">
          <image src="../../static/deviceInstruction.png" style="width:600upx; height: 500upx; margin: 0 auto"></image>
        </view>
      </view>
      <view class="footer">
        <view class="header">
          <view>
            <text style="font-size: 36upx">
              耗用扫描范围为：
            </text>
            <text style="color: #ff0000; font-size: 36upx">
              20厘米
            </text>
          </view>
        </view>
      </view>
    </view>
  </up-overlay>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import UniForms from "../../uni_modules/uni-forms/components/uni-forms/uni-forms.vue";
import UniFormsItem from "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.vue";
import MaterialInfoCardBox from "@/components/InfoCardBox/MaterialInfoCardBox.vue";
import {
  endMachine,
  initMachine,
  readMachine,
  setPower,
  stopMachine,
} from "../../util/machine";
import {addConsume, getMedicalByCode} from "../../api/materialUseRegistration";
import {restoreString} from "../../util/encode";
import {onLoad, onUnload,onShow,onHide} from '@dcloudio/uni-app'
import FirstAidNavigation from "../../components/first-aid-navigation/first-aid-navigation.vue";
import {voiceBroadcast,stopVoice} from '@/util/VoiceBroadcast.js'
import {revertMaterial} from "@/api/materialInfo.js"
import {TagScanAgent} from "../../util/agent/TagScanAgent";
import store from "../../store";

const form = ref(null)

const formData = ref({
  name: '',
  code: '',
  specification: '',
  num: '1',
  expirationDate: ''
})

const rules = ref({
  num: {
    rules: [{
      required: true,
      errorMessage: '请选择消耗数量',
      trigger: ['blur', "change"]
    }]
  }
})
const medicalTrolleyCode = ref(null);
const id =ref(null)

// 记录已扫描标签的值
const checkedArr = ref([])

const timer = ref(null)

const totalNum = ref(0)

// 定时器
const checkingTimer = ref(0)

const showTips = ref(true)

const contentText = ref({contentdown: "等待扫描标签",contentrefresh: "正在扫描标签中...",contentnomore: "暂无标签数据"})

const scanStateText = ref('')

const noData = ref(true)

const nurseInfo = ref([])

const consumeRecordId = ref("")

const viewsData = computed(() => [
  { text: "物资名称11", date: formData.value.name, isInline: false },
  { text: "编号", date: formData.value.code, isInline: false },
  { text: "规格", date: formData.value.specification, isInline: true },
  { text: "剩余数量", date: formData.value.count, isInline: true },
  { text: "有效期", date: formData.value.expirationDate, isInline: false }
]);

let tagScanAgent = null

const backToHome = () => {
  uni.navigateBack({
    delta:1,//返回层数，2则上上页
  })
}

const getToRecords = () => {
  uni.navigateTo({
    url: `/pages/consumeRecords/consumeRecords?code=${medicalTrolleyCode.value}&id=${id.value}`
  });
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

const onSave = () => {
  uni.showLoading({
    title: '保存中...',
    mask: true
  });
  form.value.validate().then((value) => {
    addConsume({
      code: formData.value.code,
      type: 0,
      num: formData.value.num
    }).then(res => {
      if (res.data.code === 200) {
        uni.hideLoading();
        // 添加提示
        uni.showToast({
          title: '保存成功',
          icon: 'success'
        });
        scanStateText.value = '耗用成功'
        totalNum.value = totalNum.value + 1
        formData.value.count = formData.value.count - 1
		noData.value = formData.value == null
		consumeRecordId.value = res.id
      } else {
        scanStateText.value = '耗用失败'
        endLoad('剩余数量不足')
      }
    })
  }).catch(error => {
    scanStateText.value = '耗用失败'
    endLoad('保存失败')
  })
}

const endLoad = (words) => {
  uni.showToast({
    title: words,
    icon: 'error'
  });
  uni.hideLoading();
}

const onScan = () => {
  // 接口调用获取数据待补充
  initMachine()
  setPower(500,500)
  showLoading('正在扫描中...')
  const res = readMachine(0,null,2,6,1)
  if (res.code === "200" && !(res.data==="CMD_NO_TAG_ERROR")) {
    const data = res.data
    getMedicalByCode({
      code: restoreString(data)
    }).then(res => {
      if (res.data.code === 200 && res.data.data && res.data.data.expirationDate) {
        formData.value.code = res.data.data.code
        formData.value.specification = res.data.data.specification
        formData.value.name = res.data.data.name
        formData.value.expirationDate = res.data.data.expirationDate
        formData.value.count = res.data.data.count
        showTips.value = false
        onSave()
		voiceBroadcast(formData.value.name).then(()=>{
			stopVoice()
		})
      } else if (res.data.code === 200 && res.data.data && !res.data.data.expirationDate) {
        errorLoad('该标签物资未补充')
        stopMachine()
        // endMachine()
      } else {
        errorLoad('暂无标签数据')
        stopMachine()
        // endMachine()
      }
      uni.hideLoading();
      stopMachine()
      endMachine(false)
    })
  } else {
    errorLoad('扫描失败')
    stopMachine()
    // endMachine()
    uni.hideLoading();
  }
}

// 数据初始化
const initData = () => {
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

onLoad((options)=> {
  medicalTrolleyCode.value = options.code
  id.value = options.id
})

onUnload((options) => {
  clearInterval(checkingTimer.value)
  stopMachine()
  plus.key.removeEventListener('keyup',handleScan)
  endMachine(false)
  tagScanAgent.destory(false)
})

function handleScan(event){
	if(event.keyCode === 134){
		onScan()
	}
}
function handleScanModel(){
	const event = {
		keyCode:134
	}
	handleScan(event)
}

onShow(() => {
	plus.key.addEventListener('keyup',handleScan)
	tagScanAgent = new TagScanAgent(store.state.tagUtil)
	tagScanAgent.setKeyUpListener(handleScanModel)
	tagScanAgent.init(500)
	// tagScanAgent.setCallBackFn(handleScanModel)
})
onHide(()=>{
	plus.key.removeEventListener('keyup',handleScan)
  tagScanAgent.destory(false)
})

</script>

<style scoped lang="scss">
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

    //:deep(.uni-forms-item) {
    //  padding: 0;
    //  margin-bottom: 50upx;
    //}

    :deep(.uni-forms-item__content) {
      border: 2upx solid #00000040;
      padding: 5upx 10upx;
      border-radius: 5upx;
      height: 60upx;
      background-color: black;
    }
  }
}

.main {
  margin: 20vw 10upx 10upx 10upx;
  padding: 15upx 25upx;
  height: 85%;
  width: 680upx;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 3upx #00000075;
  position: absolute;

  .header {
    font-size: 16px;
  	display: flex;
  	justify-content: space-between;
  }

  .body {
    flex: 1;
    display: flex;
    flex-direction: column;

    .operation-group {
      height: fit-content;
      display: flex;
      justify-content: space-between;

      .button-group {
        display: flex;
        justify-content: space-between;

        .u-button {
          width: 120upx;
          height: 60upx;
          background-color: #32b5f035;
          color: #ffffff;
          border-radius: 10upx;
          margin-left: 5upx;
        }
      }
    }

    .content {
      flex: 1;

      .uni-forms {
        :deep(.uni-forms-item__label) {
          padding: 0;
          line-height: 24upx;
          font-size: 28upx;
          height: 35upx;
          border-bottom: #32b5f0 solid 2upx;
          margin-bottom: 15upx;
        }

        :deep(.uni-forms-item) {
          padding: 0;
          font-size: 28upx;
          border-bottom: #8f939c40 solid 2upx;
          margin: 20upx 0;
        }

        :deep(.uni-forms-item__content) {
          width: 100%;
          //height: 45upx;
          height: fit-content;
          border: none;
          //border: 2upx solid #00000040;
          //padding: 5upx 10upx;
          border-radius: 5upx;
          font-size: 28upx;
        }

        :deep(.uni-input-input) {
          padding-left: 0;
          font-size: 28upx;
        }
      }
    }
  }

  .footer {
    display: flex;
    justify-content: center;
    margin-top: 15upx;
    height: 250upx;
    flex-direction: column;

    .header {
      height: 300upx;
      display: flex;
      flex-direction: column;
      text-align: center;
      justify-content: center;
      color: #0033cc;
    }

    .button-group {
      display: flex;
      justify-content: center;
      margin: auto;
      width: 100%;

      .u-button {
        width: 50%;
        height: 100upx;
        color: #ffffff;
        border-radius: 10upx;
        margin: auto 0;

        &:nth-child(2) {
          margin-left: 50upx;
        }
      }
    }
  }
}

.margin-bottom16 {
  margin-bottom: 16upx;
}

.scroll-Y {
  height: 700rpx;
}

.scroll-view_H {
  white-space: nowrap;
  width: 100%;
}

.box-shadow5 {
  box-shadow: 0upx 0upx 5upx #00000075;
}

:deep(.uni-select) {
  border: none;
  padding-left: 0;
  font-size: 28upx;
  height: 45upx;
}

:deep(.uni-input-input) {
  border: none;
  font-size: 28upx;
  padding-bottom: 0;
}

input {
  border: none;
  padding-bottom: 0;
  font-size: 36upx;
}

:deep(.uni-select__input-box) {
  padding-left: 0;
  font-size: 28upx;
  line-height: 45upx;
}

:deep(.uni-input-placeholder) {
  font-size: 28upx;
  padding-left: 0;
}

:deep(.uni-select__input-placeholder) {
  font-size: 28upx;
  padding-left: 0;
}
.noDataCss {
	margin: 200rpx 50rpx ;
	color: $main-blue;
}
</style>
