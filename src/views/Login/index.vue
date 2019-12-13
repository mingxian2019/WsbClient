<template>
  <div class="login hw100">
    <div class="header">
      <div class="header-logo">
        <img src="../../../public/LOGO2.jpg" />
      </div>
      <div class="header-title">
        <h2>七叶云抄表</h2>
        <div class="shu"></div>
        <span>中国第一免费抄表云平台</span>
      </div>

      <ul class="header-nav">
        <li>
          <el-link type="info" :underline="false">会员中心</el-link>
        </li>
        <li>
          <el-link type="info" :underline="false">帮助中心</el-link>
        </li>
        <li>
          <el-link type="info" :underline="false">物业中心</el-link>
        </li>
      </ul>
    </div>
    <div class="login-content">
      <!-- <img src="../../../public/login_20180101.jpg"> -->
    </div>
    <!-- <el-carousel indicator-position="outside">
      <el-carousel-item v-for="item in 4" :key="item">
        <h3>{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>-->

    <div class="loginform">
      <h3 class="loginform-title">操作员登录</h3>
      <el-form
        :model="LoginData"
        status-icon
        :rules="rules"
        ref="loginFormEl"
        label-position="left"
      >
        <el-form-item label prop="Property">
          <i class="fa fa-address-card item1-icon" aria-hidden="true"></i>
          <el-select v-model="PropertyText" clearable placeholder="请选择物业" filterable>
            <el-option
              v-for="item in Property"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="" prop="City" class='item-location'>
          <el-cascader v-model='location'  @change='aa' placeholder="试试搜索：武汉" :options="city" filterable></el-cascader>
          <span class="inCity">当前所在城市：{{ inCity }} </span>
        </el-form-item>-->
        <el-form-item label prop="Mobile">
          <el-input
            type="text"
            v-model.number="LoginData.Mobile"
            placeholder="请输入手机号"
            clearable
            prefix-icon="el-icon-user-solid"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label prop="Password">
          <el-input
            type="password"
            v-model="LoginData.Password"
            placeholder="请输入密码"
            clearable
            prefix-icon="el-icon-lock"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-checkbox v-model="autoLogin">一周内自动登录</el-checkbox>
        <el-button type="primary" @click.prevent="throttle">登录</el-button>
        <br />
      </el-form>
      <div class="loginform-btns">
        <router-link to="/registered" class="loginform-btns-link">注册</router-link>
        <span class="float-r splitter">|</span>
        <router-link to="/forgetPW" class="loginform-btns-link">忘记密码</router-link>
        <el-button type="text" style="padding: 0" @click="OnTrialLogin">试用账号登陆</el-button>

        <!-- <el-link type="primary" :underline="false" class='registered' @click.prevent="goRegistered">注册</el-link> -->
      </div>
    </div>

    <div class="login-bottom">
      <p>
        <el-link type="info" :underline="false">在线客服</el-link>|
        <router-link target="_blank" to="/pact" style="color: #909399">服务协议</router-link>|
        <router-link target="_blank" to="/state" style="color: #909399">用户隐私声明</router-link>|
        <router-link target="_blank" to="/legalNotices" style="color: #909399">法律声明</router-link>|
        <el-link type="info" :underline="false">版权声明</el-link>|
        <el-link type="info" :underline="false">Copyright © 2011-2019 七叶电子 Powered by 21CN</el-link>
        <br />云服务经营许可证A2.B1.B2-20090001 文网文[2008]053号 | 京ICP备09031924号
      </p>
    </div>
  </div>
</template>

<script>
import protoRoot from "@/proto/WsMsg.js";
import { spliceData } from "@/utils/send.js";
import { sendSock, initWebSocket } from "@/utils/websocket.js";
import { setToken } from "@/utils/auth.js";
import { Base64 } from "js-base64";
// import { regionData } from 'element-china-area-data'
import store from "@/store/store";
import { getLoginFlagError } from "../../error";
import _ from "lodash";
export default {
  name: "Login",
  inject: ["reload"],
  data() {
    let checkProperty = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入用户名"));
      }
    };

    let checkCity = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入所在城市"));
      }
    };
    let checkMobile = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入手机号"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字"));
        } else {
          if (value.toString().length < 11 || value.toString().length > 11) {
            callback(new Error("请输入正确格式"));
          } else {
            callback();
          }
        }
      }, 500);
    };
    let checkPassword = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      PropertyText: "",
      autoLogin: false,
      Property: [],
      // city: regionData,
      location: [],
      LoginData: {
        WsId: 0,
        // WsPw: '',
        Mobile: 18602746360,
        Password: "123456"
      },
      rules: {
        Property: [{ validator: checkProperty, trigger: "blur" }],
        City: [{ validator: checkCity, trigger: "blur" }],
        Mobile: [{ validator: checkMobile, trigger: "blur" }],
        Password: [{ validator: checkPassword, trigger: "blur" }]
      },
      loignIn: protoRoot.lookup("WsMsg.SysOprLoginIn"),
      loginOut: protoRoot.lookup("WsMsg.SysOprLoginOut"),
      inCity: "北京市"
    };
  },
  created() {
    //   initWebSocket();
  },
  mounted() {
    this.getCity();
    console.log(document.documentElement.clientWidth);
  },
  methods: {
    handleLogin(obj) {
      let createProto = this.loignIn.create(this.LoginData);
      let encodeData = this.loignIn.encode(createProto).finish();
      let initialData = spliceData(encodeData.length, 15, encodeData);
      sendSock(initialData, 15, serverData => {
        const aMsg = this.loginOut.decode(serverData.data);
        store.commit("setSysOpr", aMsg);
        if (serverData.flag === 1) {
          this.$notify({
            type: "success",
            message: "登录成功！",
            position: "bottom-right"
          });
          let MsysOpr = {
            Mobile: this.LoginData.Mobile,
            Name: aMsg.OprName,
            AreaId: aMsg.AreaId,
            RoleId: aMsg.RoleId,
            Password: this.LoginData.Password
          };
          setToken(Base64.encode(JSON.stringify(MsysOpr)));
          const REDIRECTURL = this.$route.query.redirect || "/home";
          this.$router.replace(REDIRECTURL);
        } else {
          this.$notify.error({
            title: "提示",
            message: getLoginFlagError(serverData.flag),
            position: "bottom-right"
          });
          this.$router.replace("/login");
        }
      });
    },
    // 节流开关
    throttle: _.throttle(function() {
      this.handleLogin();
    }, 1000),
    goRegistered() {
      this.$router.replace("/registered");
    },
    OnTrialLogin() {
      this.LoginData.Mobile = 18040571676;
      this.LoginData.Password = "123";
      this.handleLogin();
    },
    getCity() {
      // var map = new AMap.Map('container', {
      //   resizeEnable: true
      // })
      // let that = this
      // AMap.plugin('AMap.CitySearch', function () {
      //   var citySearch = new AMap.CitySearch()
      //   citySearch.getLocalCity(function (status, result) {
      //     if (status === 'complete' && result.info === 'OK') {
      //       // 查询成功，result即为当前所在城市信息
      //       // that.inCity = result.city
      //     }
      //   })
      // })
    },
  }
};
</script>

<style  lang='less'>
@import "../../css/login.less";
</style>
