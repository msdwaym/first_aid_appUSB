<template>
	<view class="main">
		<view class="header margin-bottom16">
			<view>
				急救车: {{medicalTrolleyCode}}
			</view>

      <text style="line-height: 80upx; margin-left: 10upx">
        {{handelNum + '/' + totalNum}}
      </text>

      <up-button :text="showSearch ? '收起查询' : '展开查询'" @click="showSearch = !showSearch"></up-button>
		</view>

		<view class="body">
			<view class="operation-group margin-bottom16" v-if="showSearch">
        <view :style="{display: 'flex',justifyContent: 'space-between',verticalAlign: 'center'}">
          <uni-data-select v-model="keyword" :localdata="searchArr" placeholder="请选择类型"
                           class="picker" type="text" @change="selectionChange"></uni-data-select>
          <text style="line-height: 80upx; margin-left: 10upx">
            {{(selectIndex + (filetArr.length ? 1 : 0)) + '/' + filetArr.length}}
          </text>

          <view class="button-group">
            <view class="icons" style="margin-right: 10upx" @click="getPre">
              <uni-icons type="up" size="20" color="#000000" class="openIcon"></uni-icons>
            </view>
            <view class="icons">
              <uni-icons type="down" size="20" @click="getNext"></uni-icons>
            </view>
          </view>
        </view>
			</view>

			<view class="content margin-bottom16" :style="{height: showSearch ? '905upx' : '1005upx'}">
				<scroll-view
				scroll-y="true"
				class="scroll-view-main"
				:scroll-into-view="intoIndex"
				>
					<view class="tier-list margin-bottom16 box-shadow5" v-for="tier in tierInfoList">
            <view class="header">
              <view class="item-info">
                <view class="item-name">
                  {{tier.tierName}}
                  <image style="width: 35upx; height: 35upx; clip-path: circle(50% at 50% 50%); margin-bottom: -5upx" src="../../static/ItemState/checkedItem.png" shape="circle"
                         v-if="getAllCheckedMedicals(tier)"/>
                </view>

                <view class="scanned-total">
                  {{tier.total ? (tier.handledNum + '/' + tier.total) : '0/0'}}
                </view>
              </view>

              <up-button :text="tier.show ? '收起' : '展开'" @click="tierDetailsShow(tier)"></up-button>
            </view>

            <view class="tier-content box-shadow5"
                  v-for="(medical, index) in tier.medicalConfigs"
            >
              <image src="../../static/ItemState/checkedItem.png" shape="circle" v-if="getAllCheckedDetails(medical)"/>
              <!--       展示数据名称       -->
              <view class="content-header">
                <view
                    :id=" 'item' + medical.medicalConfigId.substr(-6, 6)"
                    class="item-info box-shadow5 itemName"
                    ref="testList"
                    @click="showMedical(medical)"
                    :class="{checkedItem: medical.handledNum === medical.medicalDetails.length || medical.medicalDetails.length === 0}"
                >
                  <view class="item-name">
                    {{medical.medicalName}}
                  </view>

                  <view class="scanned-total">
                    {{medical.medicalDetails.length ? (medical.handledNum + '/' + medical.medicalDetails.length) : '0'}}
                  </view>
                </view>

                <view class="icons" @click="medicalDetailsShow(medical, tier)" v-if="medical.unitNum > 7">
                  <uni-icons type="down" size="20" v-if="!medical.show" color="#000000" @click="" class="openIcon"></uni-icons>
                  <uni-icons type="up" size="20" v-else></uni-icons>
                </view>
              </view>

              <view class="info-content" v-if="!medical.show">
                <!--       显示应有项数据       -->
                <view class="item box-shadow5"
                      @click="showItemInfo(medical, detail)"
                      :class="getCheckedState(detail)"
                    @longpress="changeState(detail, medical, tier)"
                    @touchend="itemTouched"
                      v-for="(detail, indexD) in medical.medicalDetails.slice(0, medical.medicalDetails.length > 5 ? 5 : medical.medicalDetails.length)"
                >
                  <!--         缺失         -->
                  <up-icon :style="{backgroundColor: '#8f939c'}" name="close" color="#ffffff"  v-if="(detail.handled && detail.checkedState.toString() === '3')"></up-icon>
                  <!--         检查         -->
                  <up-icon :style="{backgroundColor: '#4cd96485'}" name="checkmark" color="#ffffff"  v-if="(detail.checkedState.toString() === '1')"></up-icon>
                  <!--         未录入         -->
                  <up-icon :style="{backgroundColor: '#8f939c40'}" name="error" color="#ffffff"  v-if="(detail.checkedState.toString() === '0')"></up-icon>
                  <!--         过期         -->
                  <up-icon :style="{backgroundColor: '#ff000090'}" name="clock" color="#ffffff"  v-if="((!detail.handled) && detail.checkedState.toString() === '2')"></up-icon>
                  <!--         过期处理         -->
                  <up-icon :style="{backgroundColor: '#ff000090'}" name="close" color="#ffffff"  v-if="(detail.handled && detail.checkedState.toString() === '2')"></up-icon>
                  <!--         即将过期         -->
                  <up-icon :style="{backgroundColor: '#FFA50090'}" name="clock" color="#ffffff"  v-if="((!detail.handled) && detail.checkedState.toString() === '4')"></up-icon>
                  <!--         即将过期处理         -->
                  <up-icon :style="{backgroundColor: '#FFA50090'}" name="close" color="#ffffff"  v-if="(detail.handled && detail.checkedState.toString() === '4')"></up-icon>
                </view>

                <view
                    class="item box-shadow5 unCheckedItem"
                    v-if="medical.unitNum"
                    v-for="indexN in (medical.medicalDetails.length > 5 ? 0 : ((medical.unitNum - medical.medicalDetails.length) > 5 ?
                    (5 - medical.medicalDetails.length) : (medical.unitNum - medical.medicalDetails.length)))"
                >
                  {{'---'}}
                </view>

                <!--      显示还有更多数据可以展示        -->
                <view
                    class="item box-shadow5 addItem"
                    v-if="medical.unitNum > 7"
                >
                  {{'···'}}
                </view>
              </view>

              <view class="info-content" v-else>
                <view
                    class="item box-shadow5"
                    @click="showItemInfo(medical, detail)"
                    v-for="(detail, indexD) in medical.medicalDetails"
                    @longpress="changeState(detail, medical, tier)"
                    @touchend="itemTouched"
                    :class="getCheckedState(detail)"
                    :id="getDetailID(detail)"
                >
                  <!--         缺失         -->
                  <up-icon :style="{backgroundColor: '#8f939c'}" name="close" color="#ffffff"  v-if="(detail.handled && detail.checkedState.toString() === '3')"></up-icon>
                  <!--         检查         -->
                  <up-icon :style="{backgroundColor: '#4cd96485'}" name="checkmark" color="#ffffff"  v-if="(detail.checkedState.toString() === '1')"></up-icon>
                  <!--         未录入         -->
                  <up-icon :style="{backgroundColor: '#8f939c40'}" name="error" color="#ffffff"  v-if="(detail.checkedState.toString() === '0')"></up-icon>
                  <!--         过期         -->
                  <up-icon :style="{backgroundColor: '#ff000090'}" name="clock" color="#ffffff"  v-if="((!detail.handled) && detail.checkedState.toString() === '2')"></up-icon>
                  <!--         过期处理         -->
                  <up-icon :style="{backgroundColor: '#ff000090'}" name="close" color="#ffffff"  v-if="(detail.handled && detail.checkedState.toString() === '2')"></up-icon>
                  <!--         即将过期         -->
                  <up-icon :style="{backgroundColor: '#FFA50090'}" name="clock" color="#ffffff"  v-if="((!detail.handled) && detail.checkedState.toString() === '4')"></up-icon>
                  <!--         即将过期处理         -->
                  <up-icon :style="{backgroundColor: '#FFA50090'}" name="close" color="#ffffff"  v-if="(detail.handled && detail.checkedState.toString() === '4')"></up-icon>
                </view>

                <view
                    class="item box-shadow5 unCheckedItem"
                    v-if="medical.unitNum"
                    v-for="indexN in (medical.unitNum - (medical.medicalDetails ? medical.medicalDetails.length : 0))"
                >
                  {{'---'}}
                </view>
              </view>
            </view>
					</view>
				</scroll-view>
			</view>
		</view>

		<view class="footer">

			<view class="button-group">
				<up-button
				text="完成盘点"
				type="primary"
				@click="finishCheck"
        :disabled="finishState"
				></up-button>
			</view>
		</view>
	</view>

	<up-modal
	:show="confirmShow"
	title="确认通知"
	content='确认结束盘点吗?'
	:showCancelButton='true'
	@confirm="confirmEndScan"
	@cancel="() => {confirmShow = false}"
	/>

  <up-modal
      :show="confirmLogout"
      title="注销通知"
      content='确认注销吗?'
      :showCancelButton='true'
      @confirm="logout"
      @cancel="() => {confirmLogout = false}"
  />

  <up-overlay :show="showMedicalInfo">
    <view class="warp">
      <view class="header">
        <text>物资信息</text>
        <u-button @click="showMedicalInfo = false">
          <up-icon name="close" color="#ffffff" size="36"></up-icon>
        </u-button>
      </view>
      <view class="body">
        <u-form labelWidth="175upx">

          <u-form-item label="物资名称:">
            {{medicalInfo.medicalName}}
          </u-form-item>

          <u-form-item label="应有数量:">
            {{medicalInfo.unitNum}}
          </u-form-item>

          <u-form-item label="已有数量:">
            {{medicalInfo.medicalDetails ? medicalInfo.medicalDetails.length : 0}}
          </u-form-item>

          <u-form-item label="过期数量:">
            {{medicalInfo.passedItemNum ? medicalInfo.passedItemNum : 0}}
          </u-form-item>

          <u-form-item label="需补充数量:">
            {{medicalInfo.unitNum - (medicalInfo.medicalDetails ? medicalInfo.medicalDetails.length : 0)}}
          </u-form-item>
        </u-form>
      </view>
    </view>
  </up-overlay>

	<up-overlay :show="showInfo">
		<view class="warp">
			<view class="header">
				<text>物资信息</text>
				<u-button @click="() => {showInfo = false; uncheckedType = '1'; isSetUsed = false}" v-if="!isInitLabel">
					<up-icon name="close" color="#ffffff" size="36"></up-icon>
				</u-button>
			</view>
			<view class="body">
				<u-form labelWidth="175upx">

					<u-form-item label="名称:">
						{{detailInfo.medicalName}}
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

          <uni-forms :modelValue="formData" label-position="top" :rules="rules" ref="form" v-if="isSetUsed">
            <uni-forms-item label="耗用人员：" name="nurse"  style="margin-bottom: 35upx">
              <uni-data-select v-model="formData.nurseId" :localdata="nurseList" placeholder="请选择耗用人员"
                               class="picker" type="text"></uni-data-select>
            </uni-forms-item>

            <uni-forms-item label="使用日期：" name="expirationDate"  style="margin-bottom: 35upx">
              <uni-datetime-picker
                  @click="() => {showTime = true}"
                  ref="datetimePickerRef"
                  :show="showTime"
                  v-model="formData.expirationDate"
                  type="date"
                  placeholder="请选择使用日期"
              ></uni-datetime-picker>
            </uni-forms-item>
          </uni-forms>

				</u-form>
			</view>
      <view class="footer" v-if="isInitLabel || isSetUsed">
        <view style="margin: auto 0; color: #00b2ff" v-if="isInitLabel">
          <text>{{tipsText}}</text>
        </view>

        <view class="button-group">
          <up-button
              text="使用登记"
              type="primary"
              @click="setUsedState"
              v-if="isSetUsed"
          ></up-button>
        </view>
      </view>
		</view>
	</up-overlay>

  <up-overlay :show="showUnchecked">
    <view class="warp">
      <view class="header">
        <text>类型选择</text>
        <u-button @click="closeUncheckedConfirm">
          <up-icon name="close" color="#ffffff" size="36"></up-icon>
        </u-button>
      </view>
      <view class="body">
        <up-radio-group
            v-model="uncheckedType"
            placement="column"
        >
          <up-radio
              :customStyle="{marginBottom: '8px'}"
              v-for="(item, index) in uncheckedTypes"
              :key="index"
              :label="item.label"
              :name="item.name"
              @change="radioChange"
          >
          </up-radio>
        </up-radio-group>
      </view>
      <view class="footer">
        <view class="button-group">
          <up-button
              text="取消"
              type="primary"
              @click="closeUncheckedConfirm"
          ></up-button>
          <up-button
              text="确认"
              type="primary"
              @click="changeUnchecked"
          ></up-button>
        </view>
      </view>
    </view>
  </up-overlay>

  <up-overlay :show="showTips">
    <view class="warp">
      <view class="header">
        <text>{{ tipsTitle }}</text>
        <u-button @click="showTips = false">
          <up-icon name="close" color="#ffffff" size="36"></up-icon>
        </u-button>
      </view>
      <view class="body">
        <view style="margin: auto 0">
          <text>{{ tipsText }}</text>
        </view>
        <view class="imgCss" style="margin: 25upx 0">
          <image src="../../static/deviceInstruction.png" style="width:600upx; height: 500upx; margin: 0 auto"></image>
        </view>
      </view>
      <view class="footer">
        <view class="header">
          <view>
            <text style="font-size: 36upx">
              盘点扫描范围为：
            </text>
            <text style="color: #ff0000; font-size: 36upx">
              2米
            </text>
          </view>
        </view>
      </view>
    </view>
  </up-overlay>
</template>

<script setup>
import { nextTick, onMounted, ref } from 'vue';
import {
  getCheckInfoList,
  addInventoryRecord,
  addWarning,
  getMedicalByCode,
  addConsumeList, getNurseInfoList, inventoryComplete
} from '../../api/checkInfo';
import {
  endMachine,
  getTagsMachine,
  initMachine,
  setPower,
  startMachine,
  stopMachine,
  writeMachine
} from "../../util/machine";
import {onLoad, onUnload,onShow,onHide} from '@dcloudio/uni-app'
import {getNurseInfo} from "../../api/userInfo";
import {padString, restoreString} from "../../util/encode";
import UniFormsItem from "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.vue";
import UniForms from "../../uni_modules/uni-forms/components/uni-forms/uni-forms.vue";
import {addConsumeListWithUpdate} from "../../api/materialUseRegistration";
import UniIcons from "../../uni_modules/uni-icons/components/uni-icons/uni-icons.vue";
import {TagScanAgent} from "@/util/agent/TagScanAgent";
import store from "../../store";

const medicalTrolleyCode = ref(null);
const id = ref(null)
const userInfo = ref(null)

const WEEK = 1000 * 60 * 60 * 24 * 7

const showSearch = ref(false)
// 选项
const keyword = ref('')
// 提示用语
const tipsText = ref('持续长按按键以进行盘点信息读取')
const tipsTitle = ref('物资盘点')

// 层级数据集合
const tierInfoList = ref([])
const totalNum = ref(0)
const handelNum = ref(0)

//
const showTime = ref(false)
const nurseList = ref([])
const form = ref(null)
const formData = ref({
  nurseId: '',
  expirationDate: ''
})
const rules = ref({
  expirationDate: {
    rules: [{
      required: true,
      errorMessage: '请选择有效期',
      trigger: ['blur', "change"]
    }]
  }
})

// 盘点状态
const scanningState = ref(false)
const overCheckingState = ref(false)
const finishState = ref(false)

// 盘点结束确认
const confirmShow = ref(false)
const isChecking = ref(false)

// 注销通知
const confirmLogout = ref(false)

// 正在编辑的数据
const detailInfo = ref({})
// 信息弹窗状态
const showInfo = ref(false)
const isInitLabel = ref(false)
const isSetUsed = ref(false)
const showTips = ref(false)

// 长按与点击事件的状态
const isLongPress = ref(false)

// 注销的标签
const logoutData = ref(null)

// 未扫描的标签处理
const showUnchecked = ref(false)
const uncheckedType = ref('1')
const editingUncheckedData = ref(null)
const uncheckedTypes = ref([
  {
    name: '1',
    label: '物资丢失',
    disabled: false,
  },
  {
    name: '2',
    label: '标签损坏',
    disabled: false,
  },
  {
    name: '3',
    label: '已使用',
    disabled: false,
  }
])

// 获取节点信息
const query = uni.createSelectorQuery().in(this)
// 搜索相关操作的数据
const filetArr = ref([])
const selectIndex = ref(0)
const intoIndex = ref('')

const record = ref(null)

// 扫描标签获取
// 定时器
const checkingTimer = ref(0)
// 记录已扫描标签的值
const checkedArr = ref([])
// 记录未扫描的值
const uncheckedArr = ref([])

// 药品数据展示
const showMedicalInfo = ref(false)
const medicalInfo = ref(null)

const handledInfoList = ref([])

const searchArr = ref([
  {
    value: 0,
    text: '未处理'
  },
  {
    value: 4,
    text: '即将过期'
  },
  {
    value: 2,
    text: '已过期'
  }
])

let tagScanAgent = null

const radioChange = (value) => {
  uncheckedType.value = value
}

const tierDetailsShow = (tier) => {
  tier.show = !tier.show
  tier.medicalConfigs = tier.medicalConfigs.map(medical => {
    medical.medicalDetails.map(detail => {
      return {...detail, show: tier.show}
    })

    return {...medical, show: tier.show}
  })
}

const medicalDetailsShow = (medical, tier) => {
  medical.show = !medical.show
  tier.show = tier.medicalConfigs.every(medical => medical.show)
}

const getDetailID = (detail) => {
  return 'item' + detail.materialId.substr(-6, 6)
}

const getTargetState = (detail) => {
  return filetArr.value.length ? detail.materialId.substr(-6, 6) === filetArr.value[selectIndex.value].target : false
}

// 扫描状态
const getCheckedState = (detail) => {
  if (detail.checkedState.toString() === '0') {
		return {unCheckedItem: true,
      selected: keyword.value === detail.checkedState,
      target: getTargetState(detail)}
	} else if (detail.checkedState.toString() === '1') {
		return {checkedItem: true,
      target: getTargetState(detail)}
  } else if (detail.checkedState.toString() === '2') {
		return {
      passedItem: detail.handled,
      unHandled: !detail.handled,
      selected: keyword.value === detail.checkedState || (keyword.value && (keyword.value.toString() === '0' && detail.canChangeState && !detail.handled)),
      target: getTargetState(detail)
    }
  } else if (detail.checkedState.toString() === '3') {
		return {
      lackedItem: true,
      target: getTargetState(detail)}
  } else if (detail.checkedState.toString() === '4') {
    return {nearlyPassItem: true,
      selected: keyword.value === detail.checkedState,
      target: getTargetState(detail)}
  }
}

const getPassedState = (detail) => {
  const expirationDate = Date.parse(new Date(detail.expirationDate).toString());
  const currentDate = Date.parse(new Date().toString())
  return expirationDate - currentDate < WEEK && (detail.checkedState === 2 || detail.checkedState === 4)
}

const getAllCheckedDetails = (medical) => {
  if (medical.medicalDetails.length === 0) {
    return true
  } else {
    return !medical.medicalDetails.some(detail => {
      return detail.checkedState.toString() === '0' || (detail.checkedState.toString() === '2' && detail.handled === false)
    })
  }
}

const getAllCheckedMedicals = (tier) => {
  if (tier.medicalConfigs.length === 0) {
    return true
  } else {
    return !tier.medicalConfigs.some(medical => {
      return medical.medicalDetails.some(detail => {
        return detail.checkedState.toString() === '0'
      })
    })
  }
}

const startScan = () => {
	isChecking.value = true
	scanningState.value = !scanningState.value
  initMachine()
  setPower(3000)
  startMachine()
  tierInfoList.value = tierInfoList.value.map(item => {
    tierDetailsShow(item)
    return item
  })
  checkingTimer.value = setInterval(() => {
	  const scannerData = getTagsMachine().data
    if (scannerData && scannerData.length > 0) {
      for (const item of scannerData) {
        if (!checkedArr.value.includes(item)) {
          checkedArr.value = [...checkedArr.value, item]
          checkedArr.value = [...new Set(checkedArr.value)]
          getUncheckedInfoList2nd(item)
        }
      }
    }
  }, 250)
}

const finishScan = () => {
	isChecking.value = false
	scanningState.value = !scanningState.value
  finishState.value = getFinishState()
  clearInterval(checkingTimer.value)
  stopMachine()
  endMachine()
  selectionChange(keyword.value, selectIndex.value)
}

const getUncheckedInfoList2nd = (value) => {
  tierInfoList.value = tierInfoList.value.map(tier => {
    tier.medicalConfigs = tier.medicalConfigs.map((medical, index) => {
      medical.medicalDetails = medical.medicalDetails.map(detail => {
        if (detail.code === restoreString(value)) {
          const expirationDate = Date.parse(new Date(detail.expirationDate).toString());
          const currentDate = Date.parse(new Date().toString())
          const passedState = expirationDate - currentDate
          // 时间比较
          // notPassed > 0: 没有过期，正常状态，标记为1
          // notPassed > 86400000: 过期，过期状态，标记为2
          // notPassed > 0 && < 86400000: 即将过期状态，标记为4
          const state = passedState < 0 ? 2 : (passedState > WEEK ? 1 : 4)

          // 设置扫描状态
          medical.handledNum += state !== 2 ? 1 : 0
          tier.handledNum += state !== 2 ? 1 : 0
          handelNum.value += state !== 2 ? 1 : 0
          return {...detail, checkedState: state, canChangeState: state !== 1, handled: false}
        }
        return detail
      })
      return medical
    })
    return tier
  })
}

// 点击进入数据视察页面
const showItemInfo = (medical, detail) => {
	if (!isLongPress.value) {
    getDetailInfo(detail)
	}
}

const getDetailInfo = (detail, callback) => {
  getMedicalByCode({code: detail.code}).then(res => {
    if (res.data.code === 200) {
      showInfo.value = true
      detailInfo.value = {
        medicalName: res.data.data.name,
        specification: res.data.data.specification,
        available: res.data.data.available,
        code: detail.code,
        count: detail.count,
        expirationDate: res.data.data.expirationDate,
        total: detail.total,
        used: detail.used
      }

      if (callback) {
        callback()
      }
    } else {
      errorLoad('加载失败')
	  }
  })
}

// 标签损坏再登记操作
const labelRegister = (event) => {
  if (showInfo.value && event.keyCode === 134) {
    showTips.value = false
    showLoading('正在写入中...')
    initMachine()
    setPower(500)
    // 改写编码
    const result = writeMachine(padString(detailInfo.value.code))

    if (result.code === "200") {
      handledInfoList.value = handledInfoList.value.filter(item => item.code !== detailInfo.value.code)
      isInitLabel.value = false
      showInfo.value = false
      uni.showToast({
        title: '写入成功',
        icon: 'success'
      });
      changeStateRe(false)
      plus.key.removeEventListener('keydown', labelRegister);
      plus.key.addEventListener('keydown', keydownScan); // 移除监听器
      plus.key.addEventListener('keyup', keyupScan);
    }  else {
      errorLoad('写入失败')
    }
    setPower(3000)
    uni.hideLoading();
    endMachine()
  }
}

const setUsedState = () => {
  if (showInfo.value) {
    form.value.validate().then(async () => {
      handledInfoList.value = handledInfoList.value.filter(item => item.code !== detailInfo.value.code)
      handledInfoList.value.push({
        code: detailInfo.value.code,
        usedUpdate: true,
        expirationDate: formData.value.expirationDate,
        nurseId: formData.value.nurseId,
        type: "1",
        num: "1"
      })
      showInfo.value = false
      isSetUsed.value = false
      formData.value.expirationDate = ''
      formData.value.nurseId = ''
      // 层级等已处理数量增加
      changeStateRe(true)
    })
  }
}

const logout = () => {
  // showLoading('操作中...')
  handledInfoList.value = [...handledInfoList.value, {
    code: logoutData.value.info.code,
    type: "1",
    num: "1"
  }]
  logoutData.value.info.handled = (logoutData.value.info.checkedState.toString() === '1' || logoutData.value.info.checkedState.toString() === '4')
  // 层级等已处理数量增加
  logoutData.value.tier.handledNum += logoutData.value.info.handled ? 0 : 1
  logoutData.value.medical.handledNum += logoutData.value.info.handled ? 0 : 1
  handelNum.value += logoutData.value.info.handled ? 0 : 1
  logoutData.value.info.handled = true
  logoutData.value.info.canChangeState = false
  confirmLogout.value = false
  finishState.value = getFinishState()
}

// 确认结束盘点
const confirmEndScan = async () => {
  showLoading('保存中...')
	const res1 = await addInventoryRecord({medicalTrolleyId: id.value})
  if (res1.data.code === 200) {
    record.value = res1.data.data
    handledInfoList.value = handledInfoList.value.filter(item => item.type.toString() !== '3')
    handledInfoList.value.forEach(item => {
      item.inventoryRecordId = res1.data.data;
    });
    const updateList = handledInfoList.value.filter(item => item.usedUpdate)
    const addConsumed = handledInfoList.value.filter(item => !item.usedUpdate)
    const res2 = await inventoryComplete({
      inventoryId: record.value,
      medicalTrolleyId: id.value,
      warnings: [...uncheckedArr.value],
      consumeDTOList: addConsumed,
      consumeWithUpdateDTOList: updateList
    })
    if (res2.data.code === 200) {
      confirmShow.value = false
      // overCheckingState.value = true
      uni.hideLoading();
      scanningState.value = ! scanningState.value
      uni.showToast({
        title: '保存成功',
        icon: 'success'
      });
      uni.navigateBack({
        delta:1,//返回层数，2则上上页
      })
    } else {
      errorLoad('保存失败')
    }
  } else {
    errorLoad('保存失败')
  }
}

const getPre = () => {
  if (filetArr.value.length === 0) {
    return
  }

  nextTick(() => {
    selectIndex.value = selectIndex.value - 1
    if (selectIndex.value > (filetArr.value.length - 1) || selectIndex.value < 0) {
      selectIndex.value = filetArr.value.length - 1
    }
    intoIndex.value = 'item' + filetArr.value[selectIndex.value].parent
  })
}

const getNext = () => {
  if (filetArr.value.length === 0) {
    return
  }

  nextTick(() => {
    selectIndex.value = selectIndex.value + 1
    if (selectIndex.value > (filetArr.value.length - 1) || selectIndex.value < 0) {
      selectIndex.value = 0
    }
    intoIndex.value = 'item' + filetArr.value[selectIndex.value].parent
  })
}

// 选项变更
const selectionChange = (value, index = 0) => {
  keyword.value = value
  selectIndex.value = index
  filetArr.value = []
  tierInfoList.value.map(tier => {
    tier.medicalConfigs.map(medical => {
      medical.medicalDetails.map(detail => {
        if (detail.checkedState === value) {
          medical.show = true
          filetArr.value.push({
            parent: medical.medicalConfigId.substr(-6, 6),
            target: detail.materialId.substr(-6, 6)
          })
        }

        if (value === 0 && detail.canChangeState && detail.checkedState.toString() === '2' && !detail.handled) {
          medical.show = true
          filetArr.value.push({
            parent: medical.medicalConfigId.substr(-6, 6),
            target: detail.materialId.substr(-6, 6)
          })
        }
      })
    })
  })
  intoIndex.value = filetArr.value.length ? 'item' + filetArr.value[0].parent : ''
}

const changeStateRe = (canChangeState) => {
  editingUncheckedData.value.info.checkedState = uncheckedType.value.toString() === '1' ? '3' : '1'
  editingUncheckedData.value.tier.handledNum += editingUncheckedData.value.info.handled ? 0 : 1
  editingUncheckedData.value.medical.handledNum += editingUncheckedData.value.info.handled ? 0 : 1
  handelNum.value += editingUncheckedData.value.info.handled ? 0 : 1
  editingUncheckedData.value.info.canChangeState = canChangeState
  editingUncheckedData.value.info.handled = true
  finishState.value = getFinishState()
}

// 改变未检测标签的状态
const changeUnchecked = () => {
  if (uncheckedType.value === '2' || uncheckedType.value === '3') {
    getDetailInfo(editingUncheckedData.value.info, () => {
      isInitLabel.value = uncheckedType.value === '2'
      isSetUsed.value = uncheckedType.value === '3'
      if (isInitLabel.value) {
        showUnchecked.value = false
        tipsText.value = '请选择一张标签并进行扫描登记操作'
        tipsTitle.value = '标签登记'
        showTips.value = true
        plus.key.removeEventListener('keydown', keydownScan); // 移除监听器
        plus.key.removeEventListener('keyup', keyupScan);
        plus.key.addEventListener('keydown', labelRegister);
      } else if (isSetUsed.value) {
        showUnchecked.value = false
      }
    })
  } else {
    handledInfoList.value = handledInfoList.value.filter(item => item.code !== editingUncheckedData.value.info.code)
    handledInfoList.value = [...handledInfoList.value, {
      code: editingUncheckedData.value.info.code,
      type: uncheckedType.value,
      num: "1"
    }]
    showUnchecked.value = false
    changeStateRe(true)
    selectionChange(keyword.value, selectIndex.value)
  }
}

const closeUncheckedConfirm = () => {
  showUnchecked.value = false
  uncheckedType.value = '1'
}

// 药品数据展示
const showMedical = (medical) => {
  showMedicalInfo.value = true
  medicalInfo.value = medical
}

// 数据初始化
const initData = () => {
  showLoading('正在加载中...')
	getCheckInfoList({code: medicalTrolleyCode.value}).then(res => {
    if (res.data.code === 200) {
      totalNum.value = 0
      handelNum.value = 0
      tierInfoList.value = [...res.data.data]
      tierInfoList.value = tierInfoList.value.map(tier => {
        let total = 0
        tier.medicalConfigs = tier.medicalConfigs.map((medical, index) => {
          medical.medicalDetails = medical.medicalDetails.map(detail => {
            return {checkedState: 0, canChangeState: true, handled: false, ...detail}
          }).filter(item => item.used === 0 && item.available === 0)
          total += medical.medicalDetails.length
          medical.medicalDetails.sort((detail1, detail2) => detail1.code.substr(-6, 6) - detail2.code.substr(-6, 6))
          return {...medical, allChecked: false, handledNum: 0, passedNum: 0, nearlyPassNum: 0}
        })
        totalNum.value += total
        return {...tier, show: false, allChecked: false, total: total, handledNum: 0, passedNum: 0, nearlyPassNum: 0}
      })
      tierInfoList.value.sort((item1, item2) => item1.ordinal - item2.ordinal)
      finishState.value = getFinishState()
      showTips.value = true
      uni.hideLoading();
    }
	})
}

const getNurseList = async () => {
  const res = await getNurseInfoList()
  if (res.data.code === 200) {
    nurseList.value = []
    for (const item of res.data.data) {
      nurseList.value.push({
        text: item.nurseName,
        value: item.id
      })
    }
  }
}

// 长按状态更改
const changeState = (info, medical, tier) => {
  if (info.canChangeState) {
    if ((info.checkedState.toString() === '2' && getPassedState(info)) || info.checkedState.toString() === '4') {
      confirmLogout.value = true
      logoutData.value = {info, medical, tier}
    } else {
      isLongPress.value = true
      showUnchecked.value = true
      editingUncheckedData.value = {info, medical, tier}
    }
  }
}

// 长按失焦导致的状态变更
const itemTouched = () => {
	 setTimeout(() => {
		isLongPress.value = false
	}, 250)
}

// 结束盘点
const finishCheck = () => {
  // 需要处于扫描完成状态
  if (scanningState.value) {
    // 正在处于扫描
    uni.showToast({
      title: '请先完成扫描',
      icon: 'error'
    });
    return false
  } else {
    const notPass = tierInfoList.value.some(tier => {
      return tier.medicalConfigs.some((medical, index) => {
        return medical.medicalDetails.some(detail => {
          return detail.checkedState === 0 || (detail.checkedState === 2 && !detail.handled)
        })
      })
    })
    if (notPass) {
      uni.showToast({
        title: '剩余物资待处理',
        icon: 'error'
      });
      return false
    } else {
      // 展开确认弹窗
      confirmShow.value = true
      return true
    }
  }
}

const getFinishState = () => {
  uncheckedType.value = '1'
  selectionChange(keyword.value, selectIndex.value)
  return tierInfoList.value.some(tier => {
    return tier.medicalConfigs.some((medical, index) => {
      return medical.medicalDetails.some(detail => {
        return detail.checkedState === 0 || (detail.checkedState === 2 && !detail.handled)
      })
    })
  })
}

const getUserData = () => {
  getNurseInfo().then(res => {
    if (res.data.code === 200) {
      userInfo.value = res.data.data
    } else {
      uni.showToast({
        title: '请先完成盘点',
        icon: 'error'
      });
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

const isIn = ref(true)
function keydownScan(event){
	if((event.keyCode === 134 || event.keyCode === 4) && !showTips.value){
    showTips.value = false
		plus.key.removeEventListener('keydown', keydownScan); // 移除监听器
		if(isIn.value){
			if (!scanningState.value) {
				startScan()
			}else {
				finishScan()
			}
			isIn.value = false
		}
	} else {
    showTips.value = false
  }
}
function keyupScan(event){
	if((event.keyCode === 134 || event.keyCode === 4) && !showTips.value){
		plus.key.addEventListener('keydown',keydownScan)
		if(!isIn.value){
			isIn.value = true
			finishScan()
		}
	}
}

onShow(()=>{
  plus.key.addEventListener('keydown',keydownScan)
  plus.key.addEventListener('keyup', keyupScan);
  tagScanAgent = new TagScanAgent(store.state.tagUtil)
  tagScanAgent.setKeyUpListener(finishScan)
  tagScanAgent.init(500)
  tagScanAgent.setCallBackFn(startScan)
})

onHide(() => {
	plus.key.removeEventListener('keydown', keydownScan); // 移除监听器
	plus.key.removeEventListener('keyup', keyupScan);
	tagScanAgent.destory(false)
	stopMachine()
	endMachine(false)
});

onMounted(() => {
  initData()
  getUserData()
  getNurseList()
})

onLoad((options)=> {
  medicalTrolleyCode.value = options.code
  id.value = options.id
})

onUnload((options) => {
  showInfo.value = false
  showTips.value = false
  plus.key.removeEventListener('keydown', keydownScan); // 移除监听器
  plus.key.removeEventListener('keyup', keyupScan); // 移除监听器
  plus.key.removeEventListener('keydown', labelRegister);
  clearInterval(checkingTimer.value)
  stopMachine()
  endMachine(false)
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
    }

    :deep(.u-form-item__body__left__content) {
      border-bottom: #32b5f0 solid 2upx;
      font-weight: 500;
      width: fit-content;
    }

    :deep(.u-form-item__body__right__content) {
      height: 100%;
    }

    :deep(.u-form-item__body__right__content__slot) {
      height: 100%;
      font-size: inherit;
      margin-bottom: -10upx;
    }

    :deep(.u-form-item__body__right) {
      margin-left: 15upx;
      border-bottom: #8f939c80 solid 2upx;
      margin-right: 10upx;
      padding-left: 10upx;
      min-width: 100upx;
    }

    :deep(.uni-forms-item__label) {
      margin: 45upx 0 10upx 0;
      padding: 0;
      height: 42upx !important;
      width: 175upx !important;
      line-height: 31upx !important;
      font-size: 31upx;
      border-bottom: #32b5f0 solid 2upx;
      color: #000000;
    }

    :deep(.uni-forms-item) {
      padding: 0;
      margin: 0 !important;
    }

    :deep(.uni-forms-item__content) {
      border-bottom: 2upx solid #00000040;
      padding: 0;
      border-radius: 5upx;
    }

    :deep(.u-form-item__body__left__content) {
      border-bottom: #32b5f0 solid 2upx;
      font-weight: 500;
      width: fit-content;
    }

    :deep(.u-form-item__body__right) {
      margin-left: 15upx;
      border-bottom: #8f939c80 solid 2upx;
      margin-right: 10upx;
      padding-left: 10upx;
      min-width: 100upx;
    }

    :deep(.uni-select__input-text) {
      height: 64upx;
      line-height: 81upx !important;
    }

    :deep(.uni-date__x-input) {
      height: 64upx;
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
}

.main {
	margin: 10upx;
	padding: 15upx 25upx;
	height: 95%;
	display: flex;
	flex-direction: column;
	box-shadow: 0 0 3upx #00000075;

	.header {
		font-size: 16px;
    display: flex;
    justify-content: space-between;

    uni-view {
      line-height: 75upx;
    }

    .u-button {
      width: 150upx;
      height: 75upx;
      background-color: #32b5f0;
      color: #ffffff;
      border-radius: 10upx;
      margin: 0;
    }
	}

	.body {
		flex: 1;
		display: flex;
		flex-direction: column;

		.operation-group {
      height: fit-content;
      vertical-align: center;

			.picker {
				width: 400upx;
				border-radius: 10upx;
				height: 75upx;

				:deep(.uni-select__input-box) {
					height: 75upx;
				}
			}

			.button-group {
				display: flex;
				justify-content: space-between;
        margin-left: 30upx;
        height: fit-content;

        .icons {
          width: 75upx;
          height: 75upx;
          background-color: #32b5f0;
          clip-path: circle(50% at 50% 50%);
          margin: 0;

          position: relative;

          .uni-icons {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #ffffff !important;
          }
        }
			}
		}

		.content {
      box-shadow: 0upx 0upx 5upx #00000075;

      .scroll-view-main {
        height: 100%;
      }

			.tier-list {
				height: fit-content;
				background-color: #ffffff;
				border-radius: 10upx;
				padding: 20upx 25upx 25upx 25upx;
        background-color: #32b5f050;
				margin: 5upx;
				border-top: 5px #32b5f0 solid;
        margin-bottom: 15upx;

        .header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 15upx;

          .item-info {
            width: 100%;
            height: 60upx;
            padding: 0 10upx;
            border-radius: 10upx;
            line-height: 60upx;
            margin: 0 auto;
            cursor: pointer;
            display: flex;
            justify-content: space-between;

            .item-name {
              width: 85%;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
              line-height: 60upx;
            }

            .scanned-total {
              width: 15%;
              font-size: 24upx;
              line-height: 60upx;
            }
          }

          .u-button {
            width: 150upx;
            height: 60upx;
            background-color: #32b5f0;
            color: #ffffff;
            border-radius: 10upx;
            margin: 0;
          }
        }

        .tier-content {
          background-color: #ffffff;
          height: fit-content;
          border-radius: 10upx;
          padding: 15upx 20upx;
          margin-bottom: 15upx;
          position: relative;

          image {
            clip-path: circle(50% at 50% 50%);
            width: 25upx;
            height: 25upx;

            position: absolute;
            left: 5upx;
            top: 8upx;
          }

          .content-header {
            display: flex;
            justify-content: space-between;
            height: fit-content;

            .item-info {
              width: 100%;
              height: 60upx;
              padding: 0 10upx;
              border-radius: 10upx;
              line-height: 60upx;
              margin: 0 auto 15upx auto;
              cursor: pointer;
              display: flex;
              justify-content: space-between;

              .item-name {
                width: 85%;

                line-height: 60upx;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
              }

              .scanned-total {
                width: 15%;
                font-size: 24upx;
                line-height: 60upx;
              }
            }

            .icons {
              width: 60upx;
              height: 60upx;
              border-radius: 10upx;
              background-color: #32b5f0;
              padding: 0 5upx;
              margin-left: 15upx;

              position: relative;

              image {
                clip-path: circle(50% at 50% 50%);
                position: absolute;
                width: 25upx;
                height: 25upx;
                top: 35upx;
                left: 130upx;
              }

              .uni-icons {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                color: #ffffff !important;
              }
            }
          }

          .info-content {
            display: grid;
            grid-template-columns: repeat(6, 1fr);
            grid-row-gap: 10upx;
          }

          .item {
            width: 80upx;
            height: 80upx;
            clip-path: circle(50% at 50% 50%);
            background-color: #00b2ff40;

            //padding: 0 10upx;
            border-radius: 10upx;
            line-height: 80upx;
            margin: auto auto 10upx auto;
            vertical-align: middle;
            cursor: pointer;
            text-align: center;

            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;

            position: relative;

            image {
              clip-path: circle(50% at 50% 50%);
              width: 100%;
              height: 100%;
            }

            .top {
              position: absolute;
              width: 25upx;
              height: 25upx;
              top: 0;
              left: 130upx;
            }

            .u-icon {
              width: 80upx;
              height: 80upx;

              :deep(.u-icon__icon) {
                line-height: 80upx !important;
                font-size: 72upx!important;
                width: 80upx;
                text-align: center;
                margin-bottom: -5upx;
                margin-left: 4upx;
              }
            }
          }
        }
			}
		}
	}

  .footer {
    display: flex;
    justify-content: center;
    margin-top: 15upx;
    height: 80upx;

    .button-group {
      display: flex;
      justify-content: center;
      margin: auto 0;
      border-radius: 10upx;
      width: 100%;

      .u-button {
        width: 50%;
        height: 80upx;
        color: #ffffff;
        border-radius: 10upx;
        margin: auto 0;
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

// 物资名称相关
.itemName {
  background-color: #32b5f075;
}

.needSupply {
  background-color: #ff000090 !important;
  color: #ffffff !important;
}

// 单件物资相关
.checkedItem {
  background-color: #4cd96485 !important;
}

.passedItem {
  background-color: #ff000090 !important;
}

.lackedItem {
  background-color: #ff000090 !important;
}

.unCheckedItem {
  background-color: #8f939c40 !important;
  color: #00000060;
}

.nearlyPassItem {
  background-color: #FFA50090 !important;
}

.selected {
  background-color: #ffff00 !important;
}

.unHandled {
  //background: -webkit-radial-gradient( circle closest-side, #ff000090 85%, #000000 85%) !important;
  background-color: #ff000090;
}

.target {
  color: black !important;
  background: -webkit-radial-gradient( circle closest-side, #c7ba64 85%, #00000075 85%) !important;
}

.addItem {
  text-align: center;
  color: #000000;
  font-weight: 700;
}

.addTier {
  text-align: center;
  color: #000000;
  font-weight: 700;
  background-color: #ffffff;
  height: fit-content;
  border-radius: 10upx;
  padding: 15upx 20upx;
}

.line-through {
  text-decoration: line-through;
  color: #00000050 !important;
}
</style>
