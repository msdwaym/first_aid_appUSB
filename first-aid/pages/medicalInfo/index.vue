<template>
	<view class="main">
		<view class="header margin-bottom16">
			<view>
				急救车: {{medicalTrolleyCode}}
			</view>

      <up-button :text="showSearch ? '收起查询' : '展开查询'" @click="showSearch = !showSearch"></up-button>
		</view>

		<view class="body">
			<view class="operation-group margin-bottom16" v-if="showSearch">
        <view :style="{display: 'flex', justifyContent: 'space-between'}">
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
                  <text>{{tier.tierName}}</text>
                </view>

                <view class="nums">
                  {{tier.tierPassedNum + '/' + tier.tierNearlyPassedNum}}
                </view>
              </view>

              <up-button :text="tier.show ? '收起' : '展开'" @click="tierDetailsShow(tier)"></up-button>
            </view>

            <view class="tier-content box-shadow5"
                  v-for="(medical, index) in tier.medicalConfigs"
            >
              <!--       展示数据名称       -->
              <view class="content-header">
                <view class="item-info box-shadow5 itemName"
                    @click="showMedical(medical)"
                    @longpress="deleteItemShow({...medical}, 0)"
                    @touchend="itemTouched"
                    :class="{needSupply: medical.unitNum > medical.medicalDetails.length}"
                >
                  <view class="item-name">
                    <text>{{medical.medicalName}}</text>
                  </view>

                  <view class="nums">
                    {{medical.passedItemNum + '/' + medical.nearlyPassedNum}}
                  </view>
                </view>

                <view class="icons" @click="medicalDetailsShow(medical, tier)" v-if="medical.unitNum > 7">
                  <uni-icons type="down" size="20" v-if="!medical.show" color="#000000" @click="" class="openIcon"></uni-icons>
                  <uni-icons type="up" size="20" v-else></uni-icons>
                </view>
              </view>


              <view class="info-content" v-show="!medical.show">
                <!--       显示应有项数据       -->
                <view class="item box-shadow5"
                    @click="showItemInfo(medical, detail)"
                    :class="getCheckedState(detail)"
                    v-for="(detail, indexD) in medical.medicalDetails.slice(0, medical.medicalDetails.length > 5 ? 5 : medical.medicalDetails.length)"
                    @touchend="itemTouched"
                >
                  {{indexD + 1}}
                </view>

                <view
                    class="item box-shadow5 unCheckedItem"
                    v-if="medical.unitNum"
                    @longpress="deleteItemShow({
                  id: medical.medicalConfigId,
                  medicalName: medical.medicalName,
                  tierId: tier.tierId,
                  unitNum: medical.unitNum,
                  medicalDetailsNum: medical.medicalDetails.length}, 1)"
                    v-for="indexN in (medical.medicalDetails.length > 5 ? 0 : ((medical.unitNum - medical.medicalDetails.length) > 5 ? 5
                    : (medical.unitNum - medical.medicalDetails.length)))"
                >
                  {{indexN + medical.medicalDetails.length}}
                </view>

                <!--      显示还有更多数据可以展示        -->
                <view
                    class="item box-shadow5"
                    v-if="medical.unitNum > 5"
                >
                  {{'···'}}
                </view>

                <view
                    class="item box-shadow5 addItem"
                    v-if="medical.unitNum < 8"
                    @click="addMedicalItem({
                  id: medical.medicalConfigId,
                  medicalName: medical.medicalName,
                  tierId: tier.tierId,
                  unitNum: medical.unitNum,
                  medicalDetailsNum: medical.medicalDetails.length})"
                >
                  {{'+'}}
                </view>
              </view>

              <view class="info-content" v-show="medical.show">
                <view
                    class="item box-shadow5"
                    @click="showItemInfo(medical, detail)"
                    v-for="(detail, indexD) in medical.medicalDetails"
                    @touchend="itemTouched"
                    :id="getDetailID(detail)"
                    :class="getCheckedState(detail)"
                >
                  {{indexD + 1}}
                </view>

                <view
                    class="item box-shadow5 unCheckedItem"
                    v-if="medical.unitNum"
                    @longpress="deleteItemShow({
                  id: medical.medicalConfigId,
                  medicalName: medical.medicalName,
                  tierId: tier.tierId,
                  unitNum: medical.unitNum,
                  medicalDetailsNum: medical.medicalDetails.length}, 1)"
                    v-for="indexN in (medical.unitNum - (medical.medicalDetails ? medical.medicalDetails.length : 0))"
                >
                  {{indexN + medical.medicalDetails.length}}
                </view>

                <view
                    class="item box-shadow5 addItem"
                    v-if="medical.unitNum"
                    @click="addMedicalItem({
                  id: medical.medicalConfigId,
                  medicalName: medical.medicalName,
                  tierId: tier.tierId,
                  unitNum: medical.unitNum,
                  medicalDetailsNum: medical.medicalDetails.length})"
                >
                  {{'+'}}
                </view>
              </view>
            </view>

            <!--      记录10：46      -->

            <view
                class="box-shadow5 addTier"
                @click="addMedicalShow(tier)"
            >
              {{'+'}}
            </view>
					</view>
				</scroll-view>
			</view>
		</view>

		<view class="footer">
			<view class="button-group">
				<up-button
				text="使用记录"
				type="primary"
				@click="navToRecord(0)"
				></up-button>
				<up-button
				text="过期注销记录"
				type="primary"
				@click="navToRecord(1)"
				></up-button>
				<up-button
				text="异常缺失记录"
				type="primary"
				@click="navToRecord(2)"
				></up-button>
			</view>
		</view>
	</view>

  <up-modal
      :show="deleteShow"
      title="删除通知"
      content='确认删除该物资吗?'
      :showCancelButton='true'
      @confirm="confirmDelete"
      @cancel="() => {deleteShow = false}"
  />

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
				</u-form>
			</view>
		</view>
	</up-overlay>

  <up-overlay :show="showMedicalInfo">
    <view class="warp">
      <view class="header">
        <text>物资信息</text>
        <u-button @click="showMedicalInfo = false">
          <up-icon name="close" color="#ffffff"></up-icon>
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
            {{medicalInfo.passedItemNum}}
          </u-form-item>

          <u-form-item label="需补充数量:">
            {{medicalInfo.unitNum - (medicalInfo.medicalDetails ? medicalInfo.medicalDetails.length : 0)}}
          </u-form-item>
        </u-form>
      </view>
    </view>
  </up-overlay>

  <up-overlay :show="showMedicalAction">
    <view class="warp">
      <view class="header">
        <text>新增物资</text>
        <u-button @click="onCloseAddMedical">
          <up-icon name="close" color="#ffffff"></up-icon>
        </u-button>
      </view>
      <view class="body">
        <uni-forms :modelValue="medicalFormData" label-position="top" :rules="medicalAddRules" ref="medicalForm">
          <uni-forms-item  label="物资" name="medicalId">
<!--            <input type="text" v-model="medicalFormData.name"/>-->
            <uni-data-select
                v-model="medicalFormData.medicalId"
                :localdata="medicalList"
            ></uni-data-select>
          </uni-forms-item>

          <uni-forms-item label="数量" name="num">
            <input type="number" v-model="medicalFormData.num" :min="0" :max="9"/>
          </uni-forms-item>
        </uni-forms>
      </view>
      <view class="footer">
        <view class="button-group">
          <up-button
              text="确认"
              type="primary"
              @click="onSaveAddMedical"
          ></up-button>
          <up-button
              text="取消"
              type="primary"
              @click="onCloseAddMedical"
          ></up-button>
        </view>
      </view>
    </view>
  </up-overlay>
</template>

<script setup>
import { nextTick, onMounted, ref } from 'vue';
import {getCheckInfoList, getMedicalByCode} from '../../api/checkInfo';
import {onLoad} from '@dcloudio/uni-app'
import {getNurseInfo} from "../../api/userInfo";
import UniForms from "../../uni_modules/uni-forms/components/uni-forms/uni-forms.vue";
import UniFormsItem from "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.vue";
import {addDetailConfig, deleteMedicalById, getMedicalList, reviseMedical} from "../../api/medicalInfo";

const WEEK = 1000 * 60 * 60 * 24 * 7

const medicalTrolleyCode = ref(null);
const id = ref(null)
const userInfo = ref(null)

// 查询相关内容
const showSearch = ref(false)
const columns = ref([]);
const filetArr = ref([])
const selectIndex = ref(0)
const intoIndex = ref('')
const searchArr = ref([
  {
    value: 3,
    text: '即将过期'
  },
  {
    value: 1,
    text: '已过期'
  }
])

// 单件信息
const showDetailInfo = ref(false)
const detailInfo = ref(null)

// 物资信息
const showMedicalInfo = ref(false)
const medicalInfo = ref(null)

// 盘点结束确认
const deleteShow = ref(false)

// 获取节点信息
const query = uni.createSelectorQuery().in(this);

// 层级数据集合
const tierInfoList = ref([])

// 基础选项
const baseMedicalList = ref(null)
// 选项
const keyword = ref(null)

// 长按删除相关
const isLongPress = ref(false)
const deleteItemInfo = ref(null)
const deleteType = ref(0)

// 新增物资
const showMedicalAction = ref(false)
const medicalForm = ref(null)
const medicalList = ref(null)
const medicalFormData = ref({
  medicalId: '',
  num: '',
  tierId: '',
  medicalTrolleyId: id.value
})
const medicalAddRules = ref({
  medicalId: {
    rules: [{
      required: true,
      errorMessage: '请选择类型',
      trigger: ['blur', "change"]
    }]
  },
  num: {
    rules: [{
      required: true,
      errorMessage: '请填写数量',
      trigger: ['blur', "change"]
    }]
  }
})

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

// 点击进入数据视察页面
const showItemInfo = (medical, detail) => {
  getMedicalByCode({code: detail.code}).then(res => {
    if (res.data.code === 200) {
      detailInfo.value = {
        medicalName: res.data.data.name,
        specification: res.data.data.specification,
        unitNum: medical.unitNum,
        available: res.data.data.available,
        code: detail.code,
        count: detail.count,
        expirationDate: res.data.data.expirationDate,
        total: detail.total,
        used: detail.used
      }
	  showDetailInfo.value = true
    }
  })
}

const showMedical = (medical) => {
  showMedicalInfo.value = true
  medicalInfo.value = medical
}

const addMedicalItem = (info) => {
  const medicalId = baseMedicalList.value.find(item => item.text === info.medicalName).value
  reviseMedical({
    id: info.id,
    medicalId: medicalId,
    unitNum: info.unitNum + 1,
    tierId: info.tierId
  }).then(res => {
    if (res.data.code === 200) {
      uni.showToast({
        title: '操作成功',
        icon: 'success'
      });
      uni.hideLoading();
      deleteShow.value = false
      initData(true)
    } else {
      errorLoad('操作失败')
    }
  })
}

// 确认删除物资
const confirmDelete = () => {
  if (deleteType.value === 0) {
    // 删除的是药品
    if (deleteItemInfo.value.medicalDetails.length === 0) {
      deleteMedicalById(deleteItemInfo.value.medicalConfigId).then(res => {
        if (res.data.code === 200) {
          uni.showToast({
            title: '操作成功',
            icon: 'success'
          });
          uni.hideLoading();
          deleteShow.value = false
          initData(true)
        } else {
          errorLoad('操作失败')
        }
      })
    } else {
      uni.showToast({
        title: '剩余待处理物资',
        icon: 'error'
      });
    }
  } else {
    // 删除的层级
    if (deleteItemInfo.value.unitNum > deleteItemInfo.value.medicalDetailsNum) {
      reviseMedical({
        id: deleteItemInfo.value.id,
        medicalId: deleteItemInfo.value.medicalId,
        unitNum: deleteItemInfo.value.unitNum - 1,
        tierId: deleteItemInfo.value.tierId
      }).then(res => {
        if (res.data.code === 200) {
          uni.showToast({
            title: '操作成功',
            icon: 'success'
          });
          uni.hideLoading();
          deleteShow.value = false
          initData(true)
        } else {
          errorLoad('操作失败')
        }
      })
    } else {
      uni.showToast({
        title: '剩余可填充数量不足',
        icon: 'error'
      });
    }
  }
}

const navToRecord = (type) => {
  uni.navigateTo({
    url: `/pages/MaterialUsedRecord/MaterialUsedRecord?medicalTrolleyCode=${medicalTrolleyCode.value}&type=${type}`
  });
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
    intoIndex.value = 'item' + filetArr.value[selectIndex.value]
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
    intoIndex.value = 'item' + filetArr.value[selectIndex.value]
  })
}

const getDetailID = (detail) => {
  return 'item' + detail.materialId.substr(-6, 6)
}

// 暂定
const selectionChange = (value) => {
  keyword.value = value
  selectIndex.value = 0
  filetArr.value = []
  tierInfoList.value.map(tier => {
    tier.medicalConfigs.map(medical => {
      medical.medicalDetails.map(detail => {
        if (detail.checkedState === value) {
          medical.show = true
          filetArr.value.push(detail.materialId.substr(-6, 6))
        }
      })
    })
  })
  intoIndex.value = filetArr.value.length ? 'item' + filetArr.value[0] : ''
}

// 新增物资
const addMedicalShow = (tier) => {
  showMedicalAction.value = true
  medicalFormData.value.tierId = tier.tierId
  const tierMedicalData = tier.medicalConfigs.map(item => item.medicalName)
  medicalList.value = baseMedicalList.value.filter(item => !tierMedicalData.includes(item.text))
}

const onSaveAddMedical = () => {
  medicalForm.value.validate().then(res => {
    uni.showLoading({
      title: '保存中...',
      mask: true
    });

    const data = {
      config:{
        medicalId: medicalFormData.value.medicalId,
        tierId: medicalFormData.value.tierId,
        num: medicalFormData.value.num,
        extra:1
      },
      medicalTrolleyId: medicalFormData.value.medicalTrolleyId
    }

    addDetailConfig(data).then(res => {
      if (res.data.code === 200) {
        uni.showToast({
          title: '保存成功',
          icon: 'success'
        });
        medicalFormData.value.medicalId = ''
        medicalFormData.value.tierId = ''
        medicalFormData.value.num = ''
        showMedicalAction.value = false
        initData(true)
        uni.hideLoading();
      } else {
        errorLoad('加载失败')
      }
    })
  })
}

const onCloseAddMedical = () => {
  showMedicalAction.value = false
  medicalFormData.value.tierId = ''
  medicalFormData.value.num = ''
  medicalFormData.value.medicalId = ''
}

const initData = (show) => {
  showLoading('正在加载中...')
  getCheckInfoList({code: medicalTrolleyCode.value}).then(res => {
    if (res.data.code === 200) {
      tierInfoList.value = [...res.data.data]
      tierInfoList.value = tierInfoList.value.map(tier => {
        let tierPassedNum = 0
        let tierNearlyPassedNum = 0
        tier.medicalConfigs = tier.medicalConfigs.map((medical, index) => {
          let passedItemNum = 0
          let nearlyPassedNum = 0
          medical.unitNum = medical.unitNum === null ? 0 : medical.unitNum
          medical.medicalDetails = medical.medicalDetails.map(detail => {
            const expirationDate = Date.parse(new Date(detail.expirationDate).toString());
            const currentDate = Date.parse(new Date().toString())
            const passedState = expirationDate - currentDate
            // 时间比较
            // notPassed > 0: 没有过期，正常状态，标记为0
            // notPassed > 86400000: 过期，过期状态，标记为1
            // notPassed > 0 && < 86400000: 即将过期状态，标记为3
            const state = passedState < 0 ? 1 : (passedState > WEEK ? 0 : 3)
            if (detail.used === 0 && detail.vailable === 0) {
              passedItemNum += state === 1 ? 1 : 0
              tierPassedNum += passedItemNum
              nearlyPassedNum += state === 3 ? 1 : 0
              tierNearlyPassedNum += nearlyPassedNum
            }
            return {checkedState: state, ...detail}
          }).filter(item => item.used === 0 && item.available === 0)
          // 数据预备处理
          // 2024/8/8 11.37 删除查询记录集合
          medical.medicalDetails.sort((detail1, detail2) => detail1.code.substr(-6, 6) - detail2.code.substr(-6, 6))
          return {...medical, passedItemNum: passedItemNum, show: show, nearlyPassedNum: nearlyPassedNum}
        })
        return {...tier, show: show, tierNearlyPassedNum, tierPassedNum}
      })
      tierInfoList.value.sort((item1, item2) => item1.ordinal - item2.ordinal)
      uni.hideLoading();
    }
  })
}
const getUserData = () => {
  getNurseInfo().then(res => {
    if (res.data.code === 200) {
      userInfo.value = res.data.data
    }
  })
}

const getMedicalListData = () => {
  getMedicalList().then(res => {
    if (res.data.code === 200) {
      baseMedicalList.value = res.data.data.map(item => {
        return {
          value: item.id,
          text: item.medicalName
        }
      })
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

const getTargetState = (detail) => {
  return filetArr.value.length ? 'item' + detail.materialId.substr(-6, 6) === intoIndex.value : false
}

const getCheckedState = (detail) => {
  if (detail === undefined || detail === null) {
    return null
  } else if (detail.checkedState.toString() === '0') {
    return {checkedItem: true, selected: keyword.value === detail.checkedState, target: getTargetState(detail)}
  } else if (detail.checkedState.toString() === '1') {
    return {passedItem: true, selected: keyword.value === detail.checkedState, target: getTargetState(detail)}
  } else if (detail.checkedState.toString() === '2') {
    return {lackedItem: true, selected: keyword.value === detail.checkedState, target: getTargetState(detail)}
  } else if (detail.checkedState.toString() === '3') {
    return {nearlyPassItem: true, selected: keyword.value === detail.checkedState, target: getTargetState(detail)}
  }
}

// 长按状态更改
const deleteItemShow = (info, type) => {
  const medicalId = baseMedicalList.value.find(item => item.text === info.medicalName).value
  deleteShow.value = true
  isLongPress.value = true
  deleteItemInfo.value = {...info, medicalId}
  deleteType.value = type
}

// 长按失焦导致的状态变更
const itemTouched = () => {
  setTimeout(() => {
    isLongPress.value = false
  }, 250)
}

onLoad((options)=> {
  medicalTrolleyCode.value = options.code
  id.value = options.id
  initData(false)
  getUserData()
  getMedicalListData()
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
      height: 75upx;

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
				background-color: #32b5f050;
				border-radius: 10upx;
				padding: 10upx 25upx 25upx 25upx;
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
            margin: 0 auto 15upx auto;
            cursor: pointer;
            display: flex;
            justify-content: space-between;

            .item-name {
              width: 90%;

              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
            }

            .nums {
              width: 10%;
              font-size: 24upx;
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
                width: 90%;

                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
              }

              .nums {
                width: 10%;
                font-size: 24upx;
              }
            }

            .icons {
              width: 60upx;
              height: 60upx;
              border-radius: 10upx;
              padding: 0 5upx;
              background-color: #32b5f0;
              margin-left: 15upx;

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
              position: absolute;
              width: 20upx;
              height: 20upx;
              top: 0;
              right: 0;
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
        width: 30%;
        height: 80upx;
        color: #ffffff;
        border-radius: 10upx;
        margin: auto 10rpx;
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
  //border-right: 5px #ffffff solid !important;
  background-color: #32b5f075;
}

.needSupply {
  background-color: #ff000080;
  color: #ffffff;
}

// 单件物资相关
.checkedItem {
  //border-right: 5px #ffffff solid !important;
}

.passedItem {
  //border-right: 5px #ffffff solid !important;
  background-color: #ff000090 !important;
}

.lackedItem {
  //border-right: 5px #ffffff solid !important;
}

.unCheckedItem {
  //border-right: 5px #ffffff solid !important;
  background-color: #8f939c40 !important;
  color: #00000060;
}

.nearlyPassItem {
  //border-right: 5px #ffffff solid !important;
  background-color: #FFA50090 !important;
}

.selected {
  background-color: #ffff00 !important;
}

.target {
  color: black !important;
  background: -webkit-radial-gradient( circle closest-side, #c7ba64 85%, #00000075 85%) !important;
}

.addItem {
  //border-right: 5px #ffffff solid !important;
  text-align: center;
  color: #000000;
  font-weight: 700;
  background-color: rgba(123, 104, 238, 0.55) !important;
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
</style>
