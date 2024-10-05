<template>
  <firstAidNavigation :nav-text="'物资登记'" @return="backToHome" @toLabelRecords="getToRecords" :isReturn="true" :isShowLabelInfo="true" />
  <view class="main">
    <view class="header margin-bottom16">
      <text>
        急救车: {{medicalTrolleyCode}}
      </text>

      <text style="font-size: 24upx">
        本次累计登记标签数: {{totalNum}}
      </text>
    </view>

    <view class="body">
      <view class="content margin-bottom16">
        <uni-forms :modelValue="formData" label-position="top" :rules="rules" ref="form">
          <!-- <uni-forms-item  label="层级" name="tier"> -->
<!--            <input type="text" v-model="formData.material" placeholder="请输入层级"/>-->
            <!-- <uni-data-select v-model="formData.tierId" :localdata="tierList" placeholder="请选择层级"
                             class="picker" type="text" @change="tierChange" disabled="true"></uni-data-select>
          </uni-forms-item> -->

          <uni-forms-item label="物资类型" name="name" style="margin-bottom: 35upx">
<!--            <input type="text" v-model="formData.materialCode" placeholder="请输入物资类型"/>-->
				    <input type="text" v-model="formData.name" placeholder="请扫描物资编码" disabled/>
          </uni-forms-item>

          <uni-forms-item label="编码" name="code" disabled="true"  style="margin-bottom: 35upx">
            <input type="text" v-model="formData.code" placeholder="请扫描物资编码" disabled/>
          </uni-forms-item>

          <uni-forms-item label="规格" name="specification" disabled="true"  style="margin-bottom: 35upx">
            <input type="text" v-model="formData.specification" placeholder="请扫描物资编码" disabled/>
          </uni-forms-item>

          <uni-forms-item label="数量" name="num"  style="margin-bottom: 35upx">
            <input type="number" v-model="formData.num" placeholder="请扫描物资编码" disabled/>
          </uni-forms-item>

          <uni-forms-item label="有效期" name="expirationDate">
            <uni-datetime-picker
				        @click="() => {showTime = true}"
                ref="datetimePickerRef"
                :show="showTime"
                v-model="formData.expirationDate"
                type="date"
				        placeholder="请选择有效期"
            ></uni-datetime-picker>
          </uni-forms-item>
        </uni-forms>
      </view>
    </view>

<!--    <view class="footer">-->
<!--      <view class="button-group">-->
<!--        <up-button-->
<!--            text="登记"-->
<!--            type="primary"-->
<!--            @click="onSave"-->
<!--        ></up-button>-->
<!--      </view>-->
<!--    </view>-->
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
          <text>请扫描物资标签以完成物资登记操作</text>
        </view>
        <view class="imgCss" style="margin: 25upx 0">
          <image src="../../static/deviceInstruction.png" style="width:600upx; height: 500upx; margin: 0 auto"></image>
        </view>
      </view>
      <view class="footer">
        <view class="header">
          <view>
            <text style="font-size: 36upx">
              登记扫描范围为：
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
import { onMounted, ref } from 'vue';
import UniForms from "../../uni_modules/uni-forms/components/uni-forms/uni-forms.vue";
import UniFormsItem from "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.vue";
import {getCheckInfoList, getTierListInfo} from "../../api/checkInfo";
import {addMaterial, getMedicalEncode, getMedicalByCode, modifyInvoked} from "../../api/materialInfoRegistration";
import {
  endMachine,
  initMachine, readMachine,
  stopMachine,
  writeMachine,
  setPower
} from "../../util/machine";
import {padString, restoreString} from "../../util/encode";
import {onLoad,onShow,onHide,onUnload} from '@dcloudio/uni-app'
import {getNurseInfo} from "../../api/userInfo";
import FirstAidNavigation from "../../components/first-aid-navigation/first-aid-navigation.vue";
import {TagScanAgent} from "../../util/agent/TagScanAgent";
import store from "../../store";

const medicalTrolleyCode = ref(null);
const id = ref(null)
const userInfo = ref(null)

const totalNum = ref(0)

// 单件信息
const showDetailInfo = ref(false)
const detailInfo = ref(null)

// 层级信息
const tierList = ref([])
// 类型信息
const typeList = ref([])

const form = ref(null)
const showTime = ref(false)

const showTips = ref(true)

let tagScanAgent = null

const formData = ref({
  medicalConfigId: '',
  specification: '',
  num: '1',
  name: '',
  code: '',
  expirationDate: ''
  // total: 0,
  // currency: 0,
})

const rules = ref({
  num: {
    rules: [{
      required: true,
      errorMessage: '请输入消耗数量',
      trigger: ['blur', "change"]
    }]
  },
  expirationDate: {
    rules: [{
      required: true,
      errorMessage: '请选择有效期',
      trigger: ['blur', "change"]
    }]
  }
})

// const typeChange = (value) => {
//   const target = typeList.value.find(item =>
//       item.value === value
//   )
//   formData.value.specification = target.specification
//
//   formData.value.total = target.total
//
//   formData.value.currency = target.currency
// }


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

const confirmScanData = () => {
  if (formData.value.code) {
    showTips.value = false
  } else {
    uni.showToast({
      title: '请扫描标签',
      icon: 'error'
    });
  }
}

const onSave = () => {
  modifyInvoked({
    code: restoreString(formData.value.code),
    expirationDate: formData.value.expirationDate,
    num: formData.value.num,
    medicalConfigId: formData.value.medicalConfigId
  }).then(res => {
    if (res.data.code === 200) {
      uni.hideLoading();
      uni.showToast({
        title: '登记成功',
        icon: 'success'
      });
      totalNum.value = totalNum.value + 1
      stopMachine()
      endMachine()
      showTips.value = false
    } else {
      uni.hideLoading();
      endLoad(res.data.message)
      stopMachine()
      endMachine()
    }
  })
}

// 数据初始化
const initData = () => {
  showLoading('正在加载中...')
  getTierListInfo({code: medicalTrolleyCode.value}).then(res => {
    if (res.data.code === 200) {
		tierList.value = []
      for (let item of res.data.data) {
        tierList.value.push({
          value: item.tierId,
          text: item.tierName,
          typeList: item.medicalConfigs.map(item => {
            return {
              value: item.medicalConfigId,
              text: item.medicalName,
              specification: item.specification,
              total: 0,
              currency: 0
            }
          })
        })
      }
      uni.hideLoading();
    } else {
      errorLoad(res.data.message)
    }
  })
}

const errorLoad = (words) => {
  uni.showToast({
    title: words,
    icon: 'error'
  });
  uni.hideLoading();
}

const showLoading = (words) => {
  uni.showLoading({
    title: words,
    mask: true
  });
}

const endLoad = (words) => {
  uni.showToast({
    title: words,
    icon: 'error'
  });
  uni.hideLoading();
}

onLoad((options)=> {
  medicalTrolleyCode.value = options.code
  id.value = options.id
  initData()
})

function wrightIn(event) {
  showTips.value = false
  form.value.validate().then((value) => {
    if(event.keyCode === 134){
      // 获取编码
      // 扫描获取编码, 新增数据
      initMachine()
      setPower(500)
      showLoading('扫描中...')
      const res = readMachine()
      if (res.code === "200" && !(res.data === "CMD_NO_TAG_ERROR")) {
        const scannedCode = restoreString(res.data);
        if (scannedCode.length === 20) {
          getMedicalByCode(scannedCode).then(res2 => {
            if (res2.data.code === 200 && res2.data.data && res2.data.data.invoked.toString() === '0') {
              formData.value.code = res2.data.data.code
              formData.value.medicalConfigId = res2.data.data.medicalConfigId
              formData.value.specification = res2.data.data.specification
              formData.value.name = res2.data.data.name
              formData.value.code = scannedCode

              onSave()
            } else if (res2.data.code === 200 && res2.data.data && res2.data.data.invoked.toString() === '1') {
              errorLoad('当前物资已存在')
              stopMachine()
              uni.hideLoading();
              endMachine(false)
            } else {
              uni.showToast({
                title: '非物资标签，请重新扫描',
                icon: 'none'
              });
              stopMachine()
              // endMachine()
            }
          })
        } else {
          uni.showToast({
            title: '非物资标签，请重新扫描',
            icon: 'none'
          });
          stopMachine()
          // endMachine()
        }
      } else {
        errorLoad('扫描失败')
        stopMachine()
        // endMachine()
      }
    }
  }).catch(error => {
    endLoad('基础信息未填写')
  })
  endMachine()
}

const getUserData = () => {
  getNurseInfo().then(res => {
    if (res.data.code === 200) {
      userInfo.value = res.data.data
    }
  })
}
const handleWrightIn = ()=>{
	const event = {
		keyCode:134
	}
	wrightIn(event)
}

onShow(()=>{
	plus.key.addEventListener('keyup',wrightIn)
	tagScanAgent = new TagScanAgent(store.state.tagUtil)
	tagScanAgent.setKeyUpListener(handleWrightIn)
	tagScanAgent.init(500)
})
onHide(()=>{
	plus.key.removeEventListener('keyup',wrightIn)
	tagScanAgent.destory(false)
})
onUnload(()=>{
	plus.key.removeEventListener('keyup',wrightIn)
	tagScanAgent.destory(false)
})
</script>

<style scoped lang="scss">
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

    .header {
      height: 150upx;
      display: flex;
      flex-direction: column;
      text-align: center;
      justify-content: center;
      color: #0033cc;
    }

    .button-group {
      display: flex;
      justify-content: center;
      width: 100%;

      .u-button {
        width: 50%;
        height: 100upx;
        color: #ffffff;
        border-radius: 10upx;
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
</style>
