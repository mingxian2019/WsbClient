<template>
  <div class='forgetPW hw100'>
    <div class='header'>
      <div class="header-logo">
        <img src='../../../public/LOGO2.jpg'>
      </div>
      <h2 class='header-title'>
        <h2>七叶云抄表</h2>
        <div class='shu'></div>
        <span>中国第一免费抄表云平台</span>
      </h2>
      <ul class='header-nav'>
        <li><el-link type="info" :underline="false">企业抄表</el-link></li>
        <li><el-link type="info" :underline="false">家庭抄表</el-link></li>
        <li><el-link type="info" :underline="false">微信公众号</el-link></li>
        <li><el-link type="info" :underline="false">会员中心</el-link></li>
        <li><el-link type="info" :underline="false">帮助中心</el-link></li>
      </ul>
    </div>
    <div class='content'>
      <el-steps :active="active"  finish-status="success" simple>
        <el-step title="确认账号" icon="el-icon-s-custom"></el-step>
        <el-step title="安全验证" icon="el-icon-lock"></el-step>
        <el-step title="重置密码" icon="el-icon-refresh"></el-step>
      </el-steps>
      <el-form
        :model="forgetPWData"
        status-icon
        :rules="rules"
        ref="forgetPWFromEl"
        label-width="50px"
        label-position="top">

      <div v-if='active === 0' class='form-item'>
        <el-form-item label="请输入要重置密码的账号" prop="Phone">
          <el-input placeholder="请输入手机号" v-model.number='forgetPWData.confirm' clearable prefix-icon="el-icon-user-solid" autocomplete="off"></el-input>
        </el-form-item>
      </div>
      <div v-if='active === 1' class='form-item'>
        <el-form-item label="您可以通过安全手机进行账户修复" prop="VFCode">
          <el-input v-model='forgetPWData.verification' placeholder="请输入验证码" clearable autocomplete="off"></el-input> <el-button  type="primary">点击获取验证码</el-button>
        </el-form-item>
      </div>
      <!-- <div  class='form-item'> -->
        <el-form-item label="请设置新密码" v-if='active === 2' prop="Password">
          <el-input v-model='forgetPWData.reset' placeholder="请输入新密码"></el-input>
        </el-form-item>
      <!-- </div> -->
      </el-form>
      <div class='btns'>
        <el-button style="margin-top: 12px;" @click="prev">上一步</el-button>
        <el-button type="success" @click="next" v-if='active < 2'>下一步</el-button>
        <el-button type="primary"  v-if='active === 2' @click="goLogin">提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { websocketclose } from '@/utils/websocket.js'
export default {
  data () {
    let checkMobile = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入手机号'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字'))
        } else {
          if (value.toString().length < 11 || value.toString().length > 11) {
            callback(new Error('请输入正确格式'))
          } else {
            callback()
          }
        }
      }, 500)
    }
    let checkVFCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    let checkPassword = (rule, value, callback) => {
      console.log(rule)
      if (!value) {
        return callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      active: 0,
      forgetPWData: {
        confirm: '',
        verification: '',
        reset: ''
      },
      rules: {
        Phone: [{ validator: checkMobile, trigger: 'blur' }],
        VFCode: [{ validator: checkVFCode, trigger: 'blur' }],
        Password: [{ validator: checkPassword, trigger: 'blur' }]
      }
    }
  },
  methods: {
    prev () {
      this.active--
      if (this.active < 0) this.active = 0
    },
    next () {
      if (this.active++ > 2) this.active = 0
    },
    goLogin () {
      websocketclose()
      this.$router.replace('/login')
    }
  }
}
</script>

<style lang='less' type='text/css'>
@import '../../css/forgetPW.less';
</style>
