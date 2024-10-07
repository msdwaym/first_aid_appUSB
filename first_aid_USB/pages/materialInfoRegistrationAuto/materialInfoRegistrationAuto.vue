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
          <uni-forms-item  label="层级" name="tier"  style="margin-bottom: 35upx">
            <!--            <input type="text" v-model="formData.material" placeholder="请输入层级"/>-->
            <uni-data-select v-model="formData.tierId" :localdata="tierList" placeholder="请选择层级"
                             class="picker" type="text" @change="tierChange"></uni-data-select>
          </uni-forms-item>

          <uni-forms-item label="物资类型" name="medicalConfigId" style="margin-bottom: 35upx">
            <!--            <input type="text" v-model="formData.materialCode" placeholder="请输入物资类型"/>-->
            <uni-data-select v-model="formData.medicalConfigId" :localdata="typeList" placeholder="请选择物资类型"
                             class="picker" type="text" @change="typeChange" ></uni-data-select>
          </uni-forms-item>

          <uni-forms-item label="规格" name="specification"  style="margin-bottom: 35upx">
            <input type="text" v-model="formData.specification" placeholder="请选择物资类型" disabled/>
          </uni-forms-item>

          <uni-forms-item label="数量" name="num"  style="margin-bottom: 35upx">
            <input type="text" v-model="formData.num" placeholder="请输入消耗数量" disabled/>
          </uni-forms-item>

          <uni-forms-item label="有效期" name="expirationDate"  style="margin-bottom: 35upx">
            <uni-datetime-picker
                @click="() => {showTime = true}"
                ref="datetimePickerRef"
                :show="showTime"
                v-model="formData.expirationDate"
                type="date"
                placeholder="请选择有效期"
            ></uni-datetime-picker>
          </uni-forms-item>

          <uni-forms-item label="应有数量" style="margin-top: 40upx; margin-bottom: 35upx">
            <input type="text" v-model="formData.total" disabled/>
          </uni-forms-item>

          <uni-forms-item label="已有数量"  style="margin-bottom: 35upx">
            <input type="text" v-model="formData.currency" disabled/>
          </uni-forms-item>

          <uni-forms-item label="物资编码"  style="margin-bottom: 35upx">
            <input type="text" v-model="preCode" disabled placeholder="写入标签后显示"/>
          </uni-forms-item>
        </uni-forms>
      </view>
    </view>

    <view class="footer">
      <view class="button-group">
        <up-button
            text="写入标签"
            type="primary"
            @click="onSaveClick()"
        ></up-button>
      </view>
    </view>
  </view>

  <up-overlay :show="showDetailInfo">
    <view class="warp">
      <view class="header">
        <text>物资信息</text>
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

          <u-form-item label="科室:">
            {{userInfo.department}}
          </u-form-item>

          <u-form-item label="所属急救车:">
            {{medicalTrolleyCode}}
          </u-form-item>

          <u-form-item label="规格:">
            {{detailInfo.specification}}
          </u-form-item>

          <u-form-item label="有效期:">
            {{detailInfo.expirationDate}}
          </u-form-item>
        </u-form>
      </view>

      <view class="footer">
        <view class="button-group">
          <up-button
              text="下一个"
              type="primary"
              @click="showDetailInfo = false"
          ></up-button>
          <up-button
              text="退出"
              type="primary"
              @click="backToHome"
          ></up-button>
        </view>
      </view>
    </view>
  </up-overlay>

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
import { ref } from 'vue';
import UniForms from "../../uni_modules/uni-forms/components/uni-forms/uni-forms.vue";
import UniFormsItem from "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.vue";
import {getCheckInfoList, getMedicalMedicalConfigInfoByTierId, getTierListInfo} from "../../api/checkInfo";
import {addMaterial, getMedicalEncode} from "../../api/materialInfoRegistration";
import {
  endMachine,
  initMachine, setPower,
  startMachine,
  stopMachine,
  writeMachine
} from "../../util/machine";
import {padString} from "../../util/encode";
import {onLoad,onShow,onHide,onUnload} from '@dcloudio/uni-app'
import FirstAidNavigation from "../../components/first-aid-navigation/first-aid-navigation.vue";
import {getNurseInfo} from "../../api/userInfo";

const medicalTrolleyCode = ref(null);
const id = ref(null)
const userInfo = ref(null)

const totalNum = ref(0)
const preCode = ref('')

// 层级信息
const tierList = ref([])
// 类型信息
const typeList = ref([])

const form = ref(null)
const showTime = ref(false)

const showTips = ref(true)

const showDetailInfo = ref(null)
const detailInfo = ref(null)

const formData = ref({
  tierId: '',
  medicalConfigId: '',
  specification: '',
  num: '1',
  expirationDate: '',
  total: 0,
  currency: 0
})

const rules = ref({
  tierId: {
    rules: [{
      required: true,
      errorMessage: '请选择层级',
      trigger: ['blur', "change"]
    }]
  },
  medicalConfigId: {
    rules: [{
      required: true,
      errorMessage: '请选择物资类型',
      trigger: ['blur', "change"]
    }]
  },
  specification: {
    rules: [{
      required: true,
      errorMessage: '请输入规格',
      trigger: ['blur', "change"]
    }]
  },
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
  },
})

const typeChange = async (value) => {
  const target = typeList.value.find(item =>
      item.value === value
  )
  const res = await getMedicalMedicalConfigInfoByTierId(value)

  if (res.data.code === 200) {
    formData.value.specification = target.specification
    formData.value.total = res.data.data.total
    formData.value.currency = res.data.data.current
  } else {
    errorLoad(res.data.message)
  }
}

const tierChange = (value) => {
  if (value) {
    typeList.value = tierList.value.find(item =>
        item.value === value
    ).typeList
  } else {
    typeList.value = []
  }

    formData.value.medicalConfigId = ''
	formData.value.specification = ''
	formData.value.currency = 0
	formData.value.total = 0

}

const onSaveClick = () =>{
	const event = {keyCode:134}
	onSave(event)
}

const onSave = (event) => {
  if(event.keyCode === 134){
    if (formData.value.total - formData.value.currency <= 0) {
      uni.showToast({
        title: '可补充数量不足',
        icon: 'error'
      });
      return
    }

    form.value.validate().then(async () => {
      uni.showLoading({
        title: '写入中...',
        mask: true
      });
      // 获取编码
      plus.key.removeEventListener('keyup',onSave)
      const res2 = await getMedicalEncode({...formData.value, medicalTrolleyId: id.value})
      if (res2.data.code === 200) {
        setPower(500)
		const res = startMachine()
		console.log(res);
        // 改写编码
        const result = writeMachine(padString(res2.data.data))
		console.log(result);
        if (result.code === "200") {
          const data = {
            code: res2.data.data,
            expirationDate: formData.value.expirationDate,
            medicalTrolleyId: id.value,
            medicalConfigId: formData.value.medicalConfigId,
            name: typeList.value.filter(item => item.value === formData.value.medicalConfigId)[0].text,
            total: formData.value.num,
            initialized: 1,
            specification: formData.value.specification
          }
          const res3 = await addMaterial(data)
          if (res3.data.code === 200) {
            showDetailInfo.value = true
            preCode.value = res2.data.data
            detailInfo.value = {...data}
            // 提示添加
            uni.showToast({
              title: '写入成功',
              icon: 'success'
            });
            totalNum.value = totalNum.value + 1
            uni.hideLoading();
            stopMachine()
            endMachine()
            initData()
            formData.value.currency = formData.value.currency + 1
          }
        } else {
          endLoad()
        }
      } else {
        endLoad()
      }
      plus.key.addEventListener('keyup',onSave)
    }).catch(error => {
      console.log(error)
      endLoad()
    })
  }
}

// 数据初始化
const initData = () => {
  showLoading('正在加载中...')
  getTierListInfo({code: medicalTrolleyCode.value}).then(res => {
    if (res.data.code === 200) {
		tierList.value = []
      uni.hideLoading();
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
    } else {
      errorLoad(res.data.data)
    }
  })
}

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

const endLoad = () => {
  uni.showToast({
    title: '写入失败',
    icon: 'error'
  });
  uni.hideLoading();
}

onLoad((options)=> {
  medicalTrolleyCode.value = options.code
  id.value = options.id
  initData()
  getUserData()
})

const getUserData = () => {
  getNurseInfo().then(res => {
    if (res.data.code === 200) {
      userInfo.value = res.data.data
    }
  })
}

onShow(()=>{
  plus.key.addEventListener('keyup',onSave)
  initMachine()
})
onHide(()=>{
  plus.key.removeEventListener('keyup',onSave)
})
onUnload(()=>{
  plus.key.removeEventListener('keyup',onSave)
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
          margin-bottom: 10upx;
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
        height: 120upx;
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
