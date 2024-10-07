<template>
  <view class="content">

    <view class="login_img">
      <image mode="aspectFill" src="@/static/login.jpg"></image>
    </view>

    <view class="login_from">

      <view class="login_from_input">
        <view class="login_from_name">账号</view>
        <view class="login_from_fun"><input v-model='account' placeholder="请输入账号或者手机号码" type="text"></view>
      </view>

      <view class="login_from_input">
        <view class="login_from_name">密码</view>
        <view class="login_from_fun"><input v-model='password' password="true" placeholder="请输入登录密码"
                                            type="password"></view>
      </view>

      <view v-if="isNeedMac" class="login_from_input">
        <view class="login_from_name">mac地址</view>
        <view class="login_from_fun"><input v-model='macAddress' placeholder="手动输入mac地址"
                                            type="text"></view>
      </view>

      <view class="operation">
        <label :class="isRemember?'cuIcon-squarecheckfill':'cuIcon-square'" @click="changeRemember"></label>
        <view class="operation_remember" @click="changeRemember">记住我</view>
        <view class="operation_forget">忘记密码?</view>
      </view>

      <view class="login_from_login">
        <button @click="login()">登录</button>
      </view>

      <view class="register">
        <view class="logo_text">还没有账号？
          <text class="register_click" @click="register()">立即注册</text>
        </view>
      </view>

    </view>

  </view>
</template>

<script>
import {userLogin} from '../../api/login';
import {getVersion} from '../../util/getVersion';
import mac from '../../util/MAC'

export default {
  data() {
    return {
      isRemember: false,
      account: '',
      password: '',
      macAddress: '',
      isNeedMac: true,
    };
  },
  onLoad() {
    // 页面加载时从本地缓存中读取记住的账号和密码
    const rememberedAccount = uni.getStorageSync('rememberedAccount');
    const rememberedPassword = uni.getStorageSync('rememberedPassword');
    if (rememberedAccount && rememberedPassword) {
      this.account = rememberedAccount;
      this.password = rememberedPassword;
      this.isRemember = true;
    }
  },
  methods: {
    changeRemember() {
      this.isRemember = !this.isRemember;
    },
    login() {
      if (!this.account || !this.password) {
        uni.showToast({
          title: '账号和密码不能为空',
          icon: 'none'
        });
        return;
      }
      if (uni.getStorageSync('isCouldLogin') === false) {
        // getVersion()
        // return;
      }
      this.macAddress = mac.address();
      if (mac.address() === "02:00:00:00:00:00" && this.macAddress === '') {
        uni.showToast({
          title: 'Error:未连接到指定局域网无法获取当前设备mac地址，请手动输入mac地址',
          icon: 'none'
        });
        this.isNeedMac = true;
        return;
      }
      uni.showLoading({
        title: '登录中...',
        mask: true
      });

      userLogin({account: this.account, password: this.password}, this.macAddress)
          .then(async res => {
            if (res.data.code === 200) {
              // 如果记住我被勾选，则保存账号和密码到本地缓存
              if (this.isRemember) {
                uni.setStorageSync('rememberedAccount', this.account);
                uni.setStorageSync('rememberedPassword', this.password);
              } else {
                uni.removeStorageSync('rememberedAccount');
                uni.removeStorageSync('rememberedPassword');
              }
              uni.setStorageSync('MacAddress', this.macAddress);
              uni.showToast({
                title: '登录成功',
                icon: 'success'
              });
              uni.hideLoading();
              uni.switchTab({
                url: '/pages/homepage/homepage'
              });
            } else {
              uni.hideLoading();
              uni.showToast({
                title: 'Error:' + res.data.message || '登录失败',
                icon: 'none'
              });
            }
          })
          .catch(error => {
            console.error('登录失败', error);
            uni.hideLoading();
            uni.showToast({
              title: 'Error:登录失败，请稍后重试',
              icon: 'none'
            });
          });
    },
    register() {
      uni.navigateTo({
        url: '/pages/register/register'
      });
    }
  }
};
</script>

<style>

page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #fff;
  font-family: arial, verdana, helvetica, 'PingFang SC', 'HanHei SC', STHeitiSC-Light, Microsoft Yahei, sans-serif;
}


.login_img {
  width: 100%;
  height: auto;
  margin-top: 220upx;
}

.login_img image {
  width: 200upx;
  height: 200upx;
  display: block;
  margin: 0px auto;
  border-radius: 50%;
}

.login_from {
  width: 100%;
  height: auto;
  box-sizing: border-box;
  padding: 40upx 8%;
  margin-top: 80upx;
}

.login_from_input {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px #eee solid;
  padding: 50upx 0px;
  margin: 0px auto;
}

.login_from_name {
  width: 30%;
}

.login_from_fun {
  width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

.login_from_fun input {
  width: 100%;
  text-align: left;
  font-size: 14px;
}


.login_from_login {
  width: 100%;
  height: 50px;
  line-height: 50px;
  margin-top: 120upx;
}

.login_from_login button {
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #007AFF;
  color: #fff;
  border-radius: 0px;
}

.operation {
  width: 100%;
  height: 20px;
  line-height: 40px;
  display: flex;
  flex-direction: row;
  margin-top: 60upx;
  align-items: center;
  color: #444;
  font-size: 14px;
  justify-content: center;
}

.operation label {
  font-size: 18px;
  margin-right: 1%;
  display: block;
  width: 15px;
  height: 15px;
}

.cuIcon-squarecheckfill {
  color: #007AFF;
}

.operation_remember {
  position: relative;
  float: left;
  margin-right: auto; /* 左对齐 */
}

.operation_forget {
  position: relative;
  float: left;
  margin-left: auto; /* 右对齐 */
}

.cuIcon-squarecheckfill {
  background: #007AFF;
  position: relative;
  border: 2px #ccc solid;
  box-sizing: border-box;
  border-radius: 3px;
  float: left;
  margin-right: auto; /* 左对齐 */
}


.cuIcon-square {
  background: #fff;
  border: 2px #ccc solid;
  box-sizing: border-box;
  border-radius: 3px;
  position: relative;
  float: left;
  margin-right: auto; /* 左对齐 */
}

.register {
  width: 100%;
  height: 10px;
  line-height: 40px;
  display: flex;
  flex-direction: row;
  margin-top: 100upx;
  align-items: center;
  color: #444;
  font-size: 14px;
  justify-content: center;
}

.register_click {
  color: #007AFF;
}


</style>


