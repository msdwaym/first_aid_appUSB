<template>
  <view class="content">
    <firstAidNavigation
        :nav-text=navEnum.register
        @return="backLogin()"
    />

    <view class="register_form">
      <form>
        <view class="register_form_separator_account">账号信息</view>
        <view class="register_form_input">
          <view class="register_form_name"><span style="color: red;">*</span>账号</view>
          <view class="register_form_fun">
            <input v-model="formData.phoneNumber" name="phoneNumber" placeholder="请输入手机号" required type="text">
          </view>
        </view>
		<span v-if="formErrors.phoneNumber" class="error_message">{{ formErrors.phoneNumber }}</span>
		
        <view class="register_form_input">
          <view class="register_form_name"><span style="color: red;">*</span>密码</view>
          <view class="register_form_fun">
            <input v-model="formData.password" name="password" placeholder="请输入登录密码" required type="password">
          </view>
        </view>
        <span v-if="formErrors.password" class="error_message">{{ formErrors.password }}</span>

        <view class="register_form_input">
          <view class="register_form_name"><span style="color: red;">*</span>密码确认</view>
          <view class="register_form_fun">
            <input v-model="formData.confirmPassword" name="confirmPassword" placeholder="请再次输入登录密码"
                   required type="password">
          </view>
        </view>
        <span v-if="formErrors.confirmPassword" class="error_message">{{ formErrors.confirmPassword }}</span>

        <view class="register_form_separator_person">
          <text style="position: relative;top: 35upx;">个人信息</text>
        </view>
        <view class="register_form_input">
          <view class="register_form_name"><span style="color: red;">*</span>姓名</view>
          <view class="register_form_fun">
            <input v-model="formData.name" name="name" placeholder="请输入姓名" required type="text">
          </view>
        </view>
        <span v-if="formErrors.name" class="error_message">{{ formErrors.name }}</span>

        <view class="register_form_input">
          <view class="register_form_name"><span style="width: 15rpx;display: inline-block;"> </span>工号</view>
          <view class="register_form_fun">
            <input v-model="formData.jobNumber" name="jobNumber" placeholder="请输入工号"  type="text">
          </view>
        </view>
        <span v-if="formErrors.jobNumber" class="error_message">{{ formErrors.jobNumber }}</span>

        <view class="register_form_input">
          <view class="register_form_name"><span style="color: red;">*</span>收货地址</view>
          <view class="register_form_fun">
            <input v-model="formData.deliveryAddress" name="deliveryAddress" placeholder="请输入标签收货地址" required type="text">
          </view>
        </view>
        

        <view class="register_form_input">
          <view class="register_form_name"><span style="color: red;">*</span>所属医院</view>
          <view class="register_form_fun">
            <uni-data-select v-model="formData.hospitalId" :localdata="hospitalSelectRange" placeholder="请选择所属医院"
                             required
                             type="text" @change="hospitalSelectChange"></uni-data-select>
          </view>
        </view>
        <span v-if="formErrors.hospitalId" class="error_message">{{ formErrors.hospitalId }}</span>

        <view class="register_form_input">
          <view class="register_form_name"><span style="color: red;">*</span>所属科室</view>
          <view class="register_form_fun">
            <uni-data-select v-model="formData.departmentId" :localdata="departmentSelectRange"
                             placeholder="请选择所属科室" required type="text"></uni-data-select>
          </view>
        </view>
        <span v-if="formErrors.departmentId" class="error_message">{{ formErrors.departmentId }}</span>

        <view v-if="isNeedMac" class="register_form_separator_person">
          <text style="position: relative;top: 35upx;">设备信息</text>
        </view>
        <view v-if="isNeedMac" class="register_form_input">
          <view class="register_form_name">mac地址</view>
          <view class="register_form_fun">
            <input v-model="macAddress" placeholder="手动输入设备mac地址" type="text"></input>
          </view>
        </view>

        <view class="register_form_register">
          <button @click="register">注册</button>
        </view>
      </form>
    </view>


    <view class="backLogin">
      <view class="logo_text">已经有账号？
        <text @click="backLogin()">立即登录</text>
      </view>
    </view>

  </view>

</template>

<script>
import firstAidNavigation from "@/components/first-aid-navigation/first-aid-navigation.vue";
import {navEnum} from "@/common/enum/enum.js";
import {Return} from "@/util/router.js";
import {getDepartmentList, getHospitalList, userRegister} from "../../api/register";
import mac from '../../util/MAC'

export default {
  components: {
    firstAidNavigation
  },
  computed: {
    navEnum() {
      return navEnum
    }
  },
  data() {
    return {
      macAddress: '',
      isNeedMac: false,
      formData: {
        name: '',
        jobNumber: null,
        account: '',
        password: '',
        confirmPassword: '',
        hospitalId: '',
        departmentId: '',
        phoneNumber: '',
		deliveryAddress:null
      },
      formDataChange: {
        name: false,
        jobNumber: false,
        account: false,
        password: false,
        confirmPassword: false,
        hospitalId: false,
        departmentId: false,
        phoneNumber: false,
		deliveryAddress:false
      },
      formErrors: {},
      hospitalSelectValue: '',
      hospitalSelectRange: [],
      departmentSelectValue: '',
      departmentSelectRange: [],
    }
  },
  mounted() {
    getHospitalList().then(res => {
      if (res.data.code === 200) {
        for (let i = 0; i < res.data.data.length; i++) {
          res.data.data[i].value = res.data.data[i].id;
          res.data.data[i].text = res.data.data[i].hospitalName;
        }
        this.hospitalSelectRange = res.data.data
      }
    })
  },
  methods: {
    Return,
    checkForm(newData) {

      // Validate fields
      if (newData.name === '' && this.formDataChange.name === true) {
        this.formErrors.name = '姓名不能为空';
      } else if (newData.name !== '') {
        if (!/^[\u4E00-\u9FA5A-Za-z\s\-']{2,30}$/.test(this.formData.name)) {
          this.formErrors.name = '请输入合法姓名';
        } else {
          delete this.formErrors.name
        }
        this.formDataChange.name = true
      }

      // if (newData.jobNumber === '' && this.formDataChange.jobNumber === true) {
      //   this.formErrors.jobNumber = '工号不能为空';
      // } else if (newData.jobNumber !== '') {
      //   if (this.formData.jobNumber.length < 4) {
      //     this.formErrors.jobNumber = '工号长度不能少于4位';
      //   } else {
      //     delete this.formErrors.jobNumber
      //   }
      //   this.formDataChange.jobNumber = true
      // }

      // if (newData.account === '' && this.formDataChange.account === true) {
      //   this.formErrors.account = '账号不能为空';
      // } else if (newData.account !== '') {
      //   if (!/^(?=.*[0-9])(?=.*[a-zA-Z])[0-9a-zA-Z]{4,11}$/.test(this.formData.account)) {
      //     this.formErrors.account = '账号必须由数字和字母组成且长度至少为4位,不多于11位';
      //   } else {
      //     delete this.formErrors.account
      //   }
      //   this.formDataChange.account = true
      // }

      if (this.formData.password === '' && this.formDataChange.password === true) {
        this.formErrors.password = '密码不能为空';
      }
      if (this.formData.password !== '') {
        if (!/^(?=.*[0-9])(?=.*[a-zA-Z])[0-9a-zA-Z]{6,16}$/.test(this.formData.password)) {
          this.formErrors.password = '密码必须由数字和字母组成且长度至少为6位，不多于16位';
        } else {
          delete this.formErrors.password
        }
        this.formDataChange.password = true
      }

      if (this.formData.confirmPassword === '' && this.formDataChange.confirmPassword === true) {
        this.formErrors.confirmPassword = '请确认密码';
      }
      if (this.formData.confirmPassword !== '') {
        if (this.formData.confirmPassword !== this.formData.password && newData.confirmPassword !== '') {
          this.formErrors.confirmPassword = '两次输入的密码不一致';
        } else {
          delete this.formErrors.confirmPassword
        }
        this.formDataChange.confirmPassword = true
      }

      if (this.formData.hospitalId === '' && this.formDataChange.hospitalId === true) {
        this.formErrors.hospitalId = '请选择所属医院';
      }
      if (this.formData.hospitalId !== '') {
        delete this.formErrors.hospitalId
        this.formDataChange.hospitalId = true
      }

      if (this.formData.departmentId === '' && this.formDataChange.departmentId === true) {
        this.formErrors.departmentId = '请选择所属科室';
      }
      if (this.formData.departmentId !== '') {
        delete this.formErrors.departmentId
        this.formDataChange.departmentId = true
      }

      if (this.formData.phoneNumber === '' && this.formDataChange.phoneNumber === true) {
        this.formErrors.phoneNumber = '手机号码/账号 不能为空';
      }
      if (this.formData.phoneNumber !== '') {
        if (!/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(this.formData.phoneNumber)) {
          this.formErrors.phoneNumber = '请输入有效的手机号码/账号';
        } else {
          delete this.formErrors.phoneNumber
        }
        this.formDataChange.phoneNumber = true
      }
    },
    register() {
	  this.formData.account = this.formData.phoneNumber;
	  console.log(this.formData.account);
      this.formErrors = {}; // Reset formErrors

      // Validate fields
      if (!this.formData.name) {
        this.formErrors.name = '姓名不能为空';
      } else if (!/^[\u4E00-\u9FA5A-Za-z\s\-']{2,30}$/.test(this.formData.name)) {
        this.formErrors.name = '请输入合法姓名';
      }

      // if (!this.formData.jobNumber) {
      //   this.formErrors.jobNumber = '工号不能为空';
      // } else if (this.formData.jobNumber.length < 4) {
      //   this.formErrors.jobNumber = '工号长度不能少于4位';
      // }

      if (!this.formData.account) {
        this.formErrors.account = '账号不能为空';
      } else if (!/^(?=.*[0-9])(?=.*[a-zA-Z])[0-9a-zA-Z]{4,11}$/.test(this.formData.account)) {
        this.formErrors.account = '账号必须由数字和字母组成且长度至少为4位，不多于11位';
      }

      if (!this.formData.password) {
        this.formErrors.password = '密码不能为空';
      } else if (!/^(?=.*[0-9])(?=.*[a-zA-Z])[0-9a-zA-Z]{6,16}$/.test(this.formData.password)) {
        this.formErrors.password = '密码必须由数字和字母组成且长度至少为6位，不多于16位';
      }

      if (!this.formData.confirmPassword) {
        this.formErrors.confirmPassword = '请确认密码';
      } else if (this.formData.confirmPassword !== this.formData.password) {
        this.formErrors.confirmPassword = '两次输入的密码不一致';
      }

      if (this.formData.hospitalId === '') {
        this.formErrors.hospitalId = '请选择所属医院';
      }

      if (this.formData.departmentId === '') {
        this.formErrors.departmentId = '请选择所属科室';
      }

      // if (!this.formData.phoneNumber) {
      //   this.formErrors.phoneNumber = '手机号码不能为空';
      // } else if (!/^1[3456789]\d{9}$/.test(this.formData.phoneNumber)) {
      //   this.formErrors.phoneNumber = '请输入有效的手机号码';
      // }

      if (Object.keys(this.formErrors).length === 0) {

        const opts = {...this.formData}; // 复制对象以避免直接修改原始数据

        delete opts.confirmPassword; // 删除对象中的 confirmPassword 属性
		console.log(opts);

        if (mac.address() !== "02:00:00:00:00:00" || this.macAddress !== '') {
          userRegister(opts, this.macAddress !== '' ? this.macAddress : mac.address()).then(res => {
            if (res.data.code === 200) {
              uni.showToast({
                title: '注册成功',
                icon: 'success'
              })
              this.backLogin()
            } else if (res.data.code !== 200) {
              uni.showToast({
                title: 'Error:' + res.data.message,
                icon: 'none'
              });
            } else {
              uni.showToast({
                title: 'Error:注册出错',
                icon: 'none'
              });
            }
          }).catch(error =>
              console.log(error)
          )
        } else {
          uni.showToast({
            title: 'Error:未连接到指定局域网无法获取当前设备mac地址，请手动输入mac地址',
            icon: 'none'
          });
          this.isNeedMac = true
        }
      }

    },
    backLogin() {
      uni.navigateBack()
    },
    hospitalSelectChange(e) {
      getDepartmentList({hospitalId: e}).then(res => {
        for (let i = 0; i < res.data.data.length; i++) {
          res.data.data[i].value = res.data.data[i].id;
          res.data.data[i].text = res.data.data[i].departmentName;
        }
        this.departmentSelectRange = res.data.data
      })
    },
  },
  watch: {
    formData: {
      handler(newData) {
        this.checkForm(newData);
      },
      deep: true // 深度监听对象内部值的变化
    },
  },
}
</script>

<style>
page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #fff;
  font-family: arial, verdana, helvetica, 'PingFang SC', 'HanHei SC', STHeitiSC-Light, Microsoft Yahei, sans-serif;
}

.register_form {
  width: 100%;
  height: auto;
  box-sizing: border-box;
  padding: 50upx 8%;
  margin-top: 145upx;
}

.register_form_input {
  width: 100%;
  height: 25px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px #eee solid;
  padding: 50upx 0px;
  margin: 0px auto;
  position: relative;
}

.uni-select__input-box[data-v-ddf9e0a2] {
  height: 25px;
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
}

.uni-select[data-v-ddf9e0a2] {
  font-size: 14px;
  border: 1px solid #e5e5e5;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 0 5px;
  padding-left: 10px;
  position: relative;
  display: flex;
  -webkit-user-select: none;
  user-select: none;
  flex-direction: row;
  align-items: center;
  border-bottom: solid 1px #e5e5e5;
  width: 100%;
  flex: 1;
  height: 25px;
}

.register_form_name {
  width: 30%;
}

.register_form_fun {
  width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

.register_form_fun input {
  width: 100%;
  text-align: left;
  font-size: 12px;
  top: 2px;
  position: relative;
}


.register_form_register {
  width: 100%;
  height: 50px;
  line-height: 50px;
  margin-top: 80upx;
}

.register_form_register button {
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #007AFF;
  color: #fff;
  border-radius: 0px;
}

.logo_text text {
  color: #007AFF;
}

.backLogin {
  width: 100%;
  height: 10px;
  line-height: 40px;
  display: flex;
  flex-direction: row;
  margin-top: 50upx;
  align-items: center;
  color: #444;
  font-size: 14px;
  justify-content: center;
}

.error_message {
  color: red;
  position: relative;
  width: 400upx;
  left: 0;
  box-sizing: border-box;
  font-size: 14px;
}

.register_form_separator_account {
  width: 100%;
  height: 80upx;
  position: relative;
  color: #999;
  font-weight: bold;
  border-bottom: 1px #eee solid;
}

.register_form_separator_person {
  width: 100%;
  height: 120upx;
  position: relative;
  top: 10upx;
  color: #999;
  font-weight: bold;
  border-bottom: 1px #eee solid;
}

</style>
