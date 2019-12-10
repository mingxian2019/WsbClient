<template>
  <div class='registered hw100'>
    <div class='header'>
      <div class="header-logo">
        <img src='../../../public/LOGO2.jpg'>
      </div>
      <div class='header-title'>
        <h2>七叶云抄表</h2>
        <div class='shu'></div>
        <span>中国第一免费抄表云平台</span>
      </div>
      <ul class='header-nav'>
        <li><el-link type="info" :underline="false">会员中心</el-link></li>
        <li><el-link type="info" :underline="false">帮助中心</el-link></li>
        <li><el-link type="info" :underline="false">物业中心</el-link></li>
      </ul>
    </div>

    <div class="registered-content">
      <h1>账号注册</h1>
      <div class='registered-content-form'>
        <!-- <div class='registered-content-form-title'>
          <i class="fa fa-phone-square"></i>
          <span>手机号码注册</span>
        </div> -->
        <el-form
        :model="registeredData"
        status-icon
        :rules="rules"
        ref="loginFormEl"
        label-position="left">
        <el-form-item label="" prop="Mobile">
          <!-- <el-tooltip class="item" effect="dark" content="手机号将作为您的云账户ID使用" placement="left"> -->
          <el-input type="text" v-model.number="registeredData.Id" placeholder="账户标识，使用者手机号" clearable prefix-icon="el-icon-mobile-phone" autocomplete="off" ></el-input>
          <!-- </el-tooltip> -->
        </el-form-item>

        <el-form-item label="" prop="Name">
          <el-input type="text" v-model.number="registeredData.Name" placeholder="企业名称" clearable prefix-icon="el-icon-user-solid" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="" prop="City">
          <el-cascader v-model='location' placeholder="试试搜索：武汉" :options="city" filterable></el-cascader>
          <!-- <span class="inCity">当前所在城市：{{ inCity }} </span> -->
        </el-form-item>
        <el-form-item label="" prop="Password">
          <el-input type="text" v-model.number="registeredData.Password" placeholder="密码" clearable prefix-icon="el-icon-lock" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="" prop="ConfirmPW">
          <el-input type="text" v-model.number="ConfirmPW" placeholder="确认密码" clearable prefix-icon="el-icon-lock" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item class='el-item50' label="" prop="VFCode">
          <el-input type="text" v-model.number="VFCode" placeholder="验证码" clearable prefix-icon="el-icon-key" autocomplete="off" ></el-input>
        </el-form-item>
        <el-button class='el-item50 el-btn' @click='getVFcode'>获取验证码</el-button><br/>
        <!-- <div class='dividing'>
        </div> -->

        <div class='form-btns'>
          <el-checkbox v-model="agreeAgreement">我已阅读并同意</el-checkbox>
          <router-link to='/pact' class='loginform-btns-link'>七叶云服务协议</router-link>
          <span class=''> 和 </span>
          <router-link to='/state' class='loginform-btns-link'>七叶云隐私声明</router-link>
          <!-- <el-link type="primary" :underline="false" class='registered' @click.prevent="goRegistered">注册</el-link> -->
        </div>
        <el-button class='submit' type="primary" @click="regSubmit" :disabled='VFSubmit'>同意协议并提交</el-button><br/>
      </el-form>
    </div>

    </div>

  </div>
</template>

<script>
import { spliceData } from '@/utils/send.js'
import { sendSock } from '@/utils/websocket.js'
import protoRoot from '@/proto/WsMsg.js'
import { regionData } from 'element-china-area-data'
export default {
  data () {
    return {
      active: 0,
      registeredData: {
        Name: '',
        Password: '',
        Id: ''
      },
      ConfirmPW: '',
      VFCode: '',
      location: [],
      city: regionData,
      rules: {
      },
      agreeAgreement: false,
      sendSMSIn: protoRoot.lookup('WsMsg.SendSmsIn'),
      sendSMSOut: protoRoot.lookup('WsMsg.SendSmsMsgOut'),
      WsRegIn: protoRoot.lookup('WsMsg.WorkStation'),
      WsRegOut: protoRoot.lookup('WsMsg.WsRegOut')
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
    regSubmit () {
      // websocketclose()
      // this.registeredData.Name = '某物业'
      // this.registeredData.Id = 17371226666
      // this.registeredData.Password = '123456'
      this.registeredData.DistrictId = '湖北省武汉市洪山区'
      this.registeredData.Type = 0
      this.registeredData.State = 0
      let createProto = this.WsRegIn.create(this.registeredData)
      let encodeData = this.WsRegIn.encode(createProto).finish()
      let initialData = spliceData(encodeData.length, 100, 0, encodeData)
      sendSock(initialData, 100, (serverData) => {
        if (serverData.flag === 0) {
          this.$notify({
            title: '提示',
            message: '注册成功！',
            type: 'success',
            position: 'bottom-right'
          })
        } else {
          this.$notify.error({
            title: '提示',
            message: '服务器繁忙！ 请稍后重试',
            position: 'bottom-right'
          })
        }
      })
      this.$router.replace('/login')
    },
    getVFcode () {
      // let resIn = {

      //   NationCode: '86',
      //   // Mobiles: ['18327887102'],
      //   Mobiles: this.registeredDat.Id,
      //   TemplateId: 381319,
      //   // Params: ['','2019-01-02', '1245', '2456'],
      //   Params: '',
      //   Ext: '1234'
      // }
      let resIn = { }
      resIn.NationCode = '86'
      resIn.Mobiles = this.registeredData.Id
      resIn.TemplateId = 381319
      resIn.Params = ''
      resIn.Ext = Math.random().toString().slice(-6)

      let createProto = this.sendSMSIn.create(resIn)
      let encodeData = this.sendSMSIn.encode(createProto).finish()
      let initialData = spliceData(encodeData.length, 3, 0, encodeData)
      sendSock(initialData, 3, (serverData) => {
        const MESBODY = this.sendSMSOut.decode(serverData.data)
        if (this.VFCode === serverData.Ext) {
          this.agreeAgreement ? this.VFSubmit = true : this.VFSubmit = false
        } else {
          this.$notify.error({
            title: '提示',
            message: '验证码错误！ 请重新输入',
            position: 'bottom-right'
          })
        }
      })
    }
  }
}
</script>

<style lang='less' type='text/css'>
@import '../../css/registered.less';
</style>
