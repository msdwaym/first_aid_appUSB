<script setup>
/* 传参 */
const props = defineProps({
  txColor: { /* 文字颜色 */
    type: String,
    default: "white"
  },
  icColor: { /* 图标颜色 */
    type: String,
    default: "white"
  },
  bgColor: { /* 背景颜色 */
    type: String,
    default: "rgba(0, 170, 255, 1.0)"
  },
  navText: { /* 输入文字 */
    type: String,
    default: ""
  },
  isReturn: { /* 是否需要返回图标 */
    type: Boolean,
    default: true
  },
  submitText: { /* 完成按钮文字 */
    type: String,
    default: "完成"
  },
  isShowSubmit: { /* 是否显示完成按钮 */
    type: Boolean,
    default: false
  },
  isShowScan: {
    type: Boolean,
    default: false
  },
  isShowLabelInfo: {
    type: Boolean,
    default: false
  }
});

/* 传递函数 */
const emit = defineEmits(["return", "submit", "scan", "toLabelRecords"]); /* 点击按钮函数 */
</script>

<template>
  <!-- 导航栏盒子 -->
  <view :style="{'background-color': props.bgColor}" class="nav">
    <!-- 距顶高度 -->
    <view class="top"/>

    <!-- 名字 -->
    <view :style="{'color': props.txColor}" class="name">
      <text>{{ props.navText }}</text>
    </view>

    <!-- 返回图标 -->
    <view v-show="props.isReturn" class="nav-icon">
      <!-- 图标 -->
      <uni-icons :bold="true" color="white" size="23" type="left" @click="emit('return')"></uni-icons>
    </view>

    <!-- 完成按钮 -->
    <view v-show="props.isShowSubmit" class="nav-submit" @click="emit('submit')">
      <!-- 图标或文字 -->
      <text>{{ props.submitText }}</text>
    </view>

    <view v-show="props.isShowScan" class="nav-submit" @click="emit('scan')">
      <!-- 扫描图标 -->
      <up-icon color="white" name="scan" size="28"></up-icon>
    </view>

    <view v-show="props.isShowLabelInfo" class="nav-submit" @click="emit('toLabelRecords')">
      <!-- 详细图标 -->
      <up-icon name="list-dot" color="#ffffff" size="28"></up-icon>
    </view>

  </view>
</template>

<style lang="scss" scoped>
/* 导航栏盒子 */
.nav {
  padding-top: var(--status-bar-height); //给组件加个上边距
  width: 100vw;
  padding-top: var(--status-bar-height);
  height: calc(88rpx);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .top {
    width: 100vw;
  }

  /* 导航栏文字 */
  .name {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    align-items: center;

    text {
      /* 文字省略 */
      width: fit-content;
      height: fit-content;
      max-width: 10em;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      /* 文字格式 */
      font-size: 40rpx;
      font-weight: 600;
      font-family: PingFang SC, system-ui;
    }
  }

  /* 返回图标和完成按钮 */
  .nav-icon {
    width: 88rpx;
    height: 88rpx;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.nav-submit {
  right: 0;
  color: white;
  width: 80rpx;
}
</style>
