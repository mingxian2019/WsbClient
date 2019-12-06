<template>
  <div class="recharge hw100" ref="recharge">
    <div class="head-content">
      <span class="title">预付余额:</span>
      <span class="charge">&yen;2.00</span>
      <router-link to="/CaInfo/rechargeRecord">
        <el-button type="primary" class="rechargeRecord content-title-btn">充值记录</el-button>
      </router-link>
      <router-link to="/CaInfo/invoiceInquiry">
        <el-button type="primary" class="rechargeRecord content-title-btn" style="margin-right: 20px;">开票查询</el-button>
      </router-link>
    </div>
    <template>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <!-- <el-tab-pane label="余额转出" name="first">余额转出</el-tab-pane> -->
        <el-tab-pane label="在线充值" name="second">
          <div class="content-box" :style="height">
            <div class="recharge-box">
              <el-form
                :label-position="labelPosition"
                label-width="80px"
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
              >
                <el-form-item label="充值金额" prop="reChargeNum">
                  <el-input v-model="ruleForm.reChargeNum" clearable></el-input>
                </el-form-item>
              </el-form>
              <!-- <span>充值金额</span>
              <el-input placeholder="请输入金额" v-model="reChargeNum" clearable></el-input>-->
              <!-- <span class="description">您需要支付<span>&yen;{{reChargeNum}}</span>，请选择付款银行</span> -->
            </div>
            <div class="payType-box" ref="payTypeBox">
              <div class="payType-title">网银支付</div>
              <div class="bank-box">
                <el-radio-group v-model="radio3">
                  <el-radio label="1">个人支付</el-radio>
                  <el-radio label="2">企业支付</el-radio>
                </el-radio-group>
                <div class="bank-btn">
                  <ul v-show="this.radio3==1?true:false">
                    <li
                      v-for="(item,index) in bankPersonal"
                      :key="index"
                      @click="selectPersonal(index)"
                      :class="{active:index==isActive}"
                    >
                      <img class="bank-icon" :src="item.src" />
                      <img
                        class="yh-select-icon"
                        v-if="isActive === index"
                        src="../../../public/bank-icon/yh-select-icon.png"
                      />
                    </li>
                  </ul>
                  <ul v-show="this.radio3==2?true:false">
                    <li
                      v-for="(item,index) in bankEnterprise"
                      :key="index"
                      @click="selectEnterprise(index)"
                      :class="{active:index==idActiveEn}"
                    >
                       <img class="bank-icon" :src="item.src" />
                      <img
                        class="yh-select-icon"
                        v-if="idActiveEn === index"
                        src="../../../public/bank-icon/yh-select-icon.png"
                      />
                    </li>
                  </ul>
                  <div class="clear"></div>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="线下对公充值" name="third" class="public">
          <div class="content-box" :style="height">
            <p class="p-title">说明：</p>
            <p>
              1）线下充值必须先填写银行转款信息并提交（如下），资金到账后，系统将自动充值，方便快捷！
              <br />2）您可以使用公司银行账号或个人银行账号转账。
              <br />3）仅支持汇款到民生银行或工商银行账户，请勿打入我司其他银行账户。
              <br />4）特别注意：填写本打款申请并不会扣除您银行的款项，本申请仅供系统核查您是否已经转账。提交打款申请后， 您还需要在银行转账后系统才会充值到预付余额账号。
            </p>
            <el-form
              :label-position="labelPosition"
              label-width="152px"
              :model="ruleFormPublic"
              :rules="rulesPublic"
              ref="ruleFormPublic"
            >
              <el-form-item label="充值人手机号：" prop="phone">
                <el-input v-model="ruleFormPublic.phone" clearable></el-input>
              </el-form-item>
              <el-form-item label="打款账户开户名：" prop="accountName">
                <el-input v-model="ruleFormPublic.accountName" clearable></el-input>
              </el-form-item>
              <el-form-item label="打款账号：" prop="account">
                <el-input v-model="ruleFormPublic.account" clearable></el-input>
              </el-form-item>
              <el-form-item label="打款银行：" prop="bankName">
                <el-input v-model="ruleFormPublic.bankName" clearable></el-input>
              </el-form-item>
              <el-form-item label="充值金额：" prop="reChargeNum2">
                <el-input v-model="ruleFormPublic.reChargeNum2" clearable></el-input>
              </el-form-item>
            </el-form>
            <div>
              <label>收款账户支行:</label>
              <el-radio-group v-model="radio2">
                <el-radio label="1">民生银行深圳福田支行</el-radio>
                <el-radio label="2">中国工商银行深圳市华联支行</el-radio>
              </el-radio-group>
            </div>
            <p>收款银行账户： 七叶电子商务有限公司 696119527</p>
          </div>
        </el-tab-pane>
      </el-tabs>
    </template>
    <el-button
      v-show="activeName=='second'?true:false"
      class="nextbtn"
      type="primary"
      @click="payFun('ruleForm')"
    >下一步</el-button>
    <el-button
      v-show="activeName=='third'?true:false"
      class="nextbtn"
      type="primary"
      @click="publicPayFun('ruleFormPublic')"
    >确定</el-button>
  </div>
</template>
  </div>
</template>

<script>
import _ from "lodash";
import { spliceData } from "@/utils/send.js";
import { sendSock } from "@/utils/websocket.js";
import protoRoot from "@/proto/WsMsg.js";
// import { regionData } from 'element-china-area-data'
export default {
  data() {
    //在线支付验证
    let checkRecharge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请填写充值金额"));
      }
      let amtreg = /^\d+(\.\d{1,2})?$/;
      if (!amtreg.test(value)) {
        return callback(new Error("请输入正确的金额格式！"));
      }
    };
    //线下对公验证
    let checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请填写手机号码"));
      }
      setTimeout(() => {
        let amtreg = /^1[3456789]\d{9}$/;
        if (!amtreg.test(value)) {
          return callback(new Error("请填写正确的手机号码"));
        } else {
          callback();
        }
      }, 1000);
    };
    let checkAccountName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请填写打款账户开户名"));
      } else {
        callback();
      }
    };
    let checkAccount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请填写打款账户"));
      }
      setTimeout(() => {
        let amtreg = /^([1-9]{1})(\d{11}|\d{15}|\d{16}|\d{17}|\d{18})$/;
        if (!amtreg.test(value)) {
          return callback(new Error("请填写正确的打款账户"));
        } else {
          callback();
        }
      }, 1000);
    };
    let checkBankName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请填写打款银行"));
      } else {
        callback();
      }
    };
    let checkRecharge2 = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请填写充值金额"));
      }
      setTimeout(() => {
        let amtreg = /^\d+(\.\d{1,2})?$/;
        if (!amtreg.test(value)) {
          return callback(new Error("请输入正确的金额格式！"));
        } else {
          callback();
        }
      }, 1000);
    };
    return {
      activeName: "second",
      ruleForm: {
        reChargeNum: ""
      },
      labelPosition: "left",
      rules: {
        reChargeNum: [{ validator: checkRecharge, trigger: "blur" }]
      },
      radio2: "1",
      radio3: "1",
      bankPersonal: [
        { src: require("../../../public/bank-icon/gongshang.jpg") },
        { src: require("../../../public/bank-icon/nongye.jpg") },
        { src: require("../../../public/bank-icon/jianshe.jpg") },
        { src: require("../../../public/bank-icon/pufa.jpg") },
        { src: require("../../../public/bank-icon/xingye.jpg") },
        { src: require("../../../public/bank-icon/zhaoshang.jpg") },
        { src: require("../../../public/bank-icon/zhongguo.jpg") }
      ],
      bankEnterprise: [
         { src: require("../../../public/bank-icon/gongshang-qi.jpg") },
        { src: require("../../../public/bank-icon/nongye-qi.jpg") },
        { src: require("../../../public/bank-icon/jianshe-qi.jpg") },
        { src: require("../../../public/bank-icon/pufa-qi.jpg") },
        { src: require("../../../public/bank-icon/xingye-qi.jpg") },
        { src: require("../../../public/bank-icon/zhaoshang-qi.jpg") },
        { src: require("../../../public/bank-icon/zhongguo-qi.jpg") }
      ],
      isActive: null,
      idActiveEn:null,
      height: {
        height: ""
      },
      ruleFormPublic: {
        phone: "",
        accountName: "",
        account: "",
        bankName: "",
        reChargeNum2: ""
      },
      rulesPublic: {
        phone: [{ required: true, validator: checkPhone, trigger: "blur" }],
        accountName: [
          { required: true, validator: checkAccountName, trigger: "blur" }
        ],
        account: [{ required: true, validator: checkAccount, trigger: "blur" }],
        bankName: [
          { required: true, validator: checkBankName, trigger: "blur" }
        ],
        reChargeNum2: [
          { required: true, validator: checkRecharge2, trigger: "blur" }
        ]
      },
      screenHeight: document.documentElement.clientHeight //屏幕高度
    };
  },
  mounted() {
    this.hh();
    // var _this = this;
    // window.onresize = function() {
    //   // 定义窗口大小变更通知事件
    //   _this.screenHeight = document.documentElement.clientHeight; //窗口高度
    // };
  },
  computed: {},
  watch: {
    'radio3': function(newVal){
          this.isActive=null;
          this.idActiveEn=null;
     },
    // screenHeight: function(val) {
    //   //监听屏幕高度变化
    //   this.height.height = Number(val) - 361 + "px"; //'120'是页面布局调整，可去除
    // }
  },
  methods: {
    hh() {
      // console.log(this.$refs.element.offsetHeight);
      this.height.height = this.screenHeight - 397 + "px";
      this.$refs.payTypeBox.style.height = this.screenHeight - 537 + "px";
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    selectPersonal(index) {
      this.isActive = index;
    },
    selectEnterprise(index) {
      this.idActiveEn = index;
    },
    payFun(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    publicPayFun(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$alert(
            `<div>
              <div class="success-tips">
                <i class="el-icon-success"></i><span>您的转账信息已提交<span>
              </div>
              <p class="success-msg">
                本次充值金额：<span class="p-title">` +
              this.ruleFormPublic.reChargeNum2 +
              `</span>元
                (请人工记录收款账号一边打款，为了以防诈骗，手机短信中不含有账号信息！)
              </p>
              <p class="success-msg">
                开户名：武汉七叶电子科技有限公司
              </p>
              <p class="success-msg">
                账号：696119527
              </p>
              <p class="success-msg">
                开户行：民生银行湖北武汉支行
              </p>
            </div>`,
            "线下对公充值",
            {
              dangerouslyUseHTMLString: true,
              callback: () => {
                this.$message({
                  message: "充值成功",
                  type: "success"
                });
              }
            }
          );
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang='less' scope>
.recharge {
  padding: 15px;
  position: relative;
  .head-content {
    padding-left: 40px;
    position: absolute;
    width: 100%;
    .title {
      font-size: 22px;
      font-weight: 600;
      color: #444;
      padding-top: 23px;
      padding-bottom: 23px;
      float: left;
      span {
        float: left;
        margin-top: 7px;
      }
    }
    .charge {
      font-size: 36px;
      font-weight: bolder;
      color: #ff7800;
      margin-left: 30px;
      margin-top: 12px !important;
      float: left;
    }
    .rechargeRecord {
      float: right;
      margin: 35px 56px 0 0;
      color: #409eff;
      background: #ecf5ff;
      border-color: #b3d8ff;
    }
    .rechargeRecord:active,
    .rechargeRecord:hover {
      background: #3a8ee6;
      border-color: #3a8ee6;
      color: #fff;
      outline: none;
    }
  }
  .el-tabs {
    height: 100%;
    padding-top: 100px;
    .el-tab-pane {
      position: relative;
    }
    .el-tabs__header {
      margin: 0;
    }
    .content-box {
      border-left: 1px solid #e4e7ed;
      padding: 20px;
      .el-input {
        width: 200px;
        margin-left: 24px;
      }
      .recharge-box {
        padding: 20px 0 20px 44px;
        background: #f5f5f5;
        .el-form-item {
          margin: 0;
        }
        .description {
          margin-left: 35px;
          span {
            color: #ff7800;
          }
        }
        .el-form-item__error {
          top: 50%;
          left: 244px;
        }
      }
      .el-radio-group {
        padding: 30px 0;
      }
      .bank-btn {
        margin-top: 2px;
        li {
          float: left;
          width: 154px;
          box-sizing: border-box;
          height: 62px;
          border: 1px solid #e3e3e3;
          margin-right: 26px;
          margin-bottom: 26px;
          text-align: center;
          cursor: pointer;
          position: relative;
          .bank-icon {
            border: 0;
            vertical-align: top;
            width: 150px;
          }
          .yh-select-icon {
            width: 17px;
            position: absolute;
            bottom: -1px;
            right: 0;
          }
        }
        .active {
          border-color: transparent;
          border: 2px solid #0193e6;
        }
        .clear {
          clear: both;
        }
      }
      .payType-box {
        overflow-y: auto;
        margin-top: 20px;
        border-top: 1px solid #e4e7ed;
        border-left: 1px solid #e4e7ed;
        padding-left: 20px;
        .payType-title {
          display: inline-block;
          height: 38px;
          line-height: 38px;
          text-align: center;
          padding: 0 20px;
          border-right: 1px solid #e4e7ed;
          margin-left: -20px;
          border-top: 1px solid #409eff;
          color: #409eff;
          width: 116px;
        }
      }
    }
    .content-box::-webkit-scrollbar {
      width: 6px;
      height: 6px;
      background-color: #f5f5f5;
    }
    .content-box::-webkit-scrollbar-track {
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      border-radius: 10px;
      background-color: #f5f5f5;
    }
    .content-box::-webkit-scrollbar-thumb {
      border-radius: 10px;
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      background-color: rgb(223, 221, 221);
    }
    .el-tabs__item {
      font-size: 17px;
    }
    .public {
      .content-box{
        overflow-y: auto;
      }
      .el-form--label-left .el-form-item__label {
        text-align: right;
      }
      .el-input {
        width: 400px !important;
      }
      p {
        line-height: 32px;
      }
      .p-title {
        color: #f00 !important;
        line-height: 50px;
        font-weight: 600;
      }

      .el-radio-group {
        padding: 15px 0;
        margin-left: 17px;
      }
      .el-form {
        margin-top: 16px;
        .el-form-item {
          margin-bottom: 16px;
        }
        .el-input__inner {
          height: 36px;
          line-height: 36px;
        }
        .el-form-item__error {
          top: 50%;
          left: 444px;
        }
      }
    }
    .el-tabs {
      position: relative;
    }
  }
  .nextbtn {
    width: 154px;
    height: 56px;
    border-radius: 3px;
    // background: #ff7900;
    color: #fff;
    line-height: 36px;
    border: 0;
    font-size: 20px;
    font-weight: 600;
    position: absolute;
    bottom: 30px;
    left: 50%;
    margin-left: -77px;
  }
}
.el-message-box {
  width: 800px;
  .success-msg {
    margin: 20px 0;
  }
  .el-icon-success:before {
    font-size: 55px;
    color: rgb(13, 164, 1);
  }
  .success-tips {
    padding-left: 20px;
    height: 83px;
    border-bottom: 1px solid #eee;
    margin-bottom: 30px;
    .el-icon-success {
      float: left;
      margin: 20px 20px 0 0;
      display: inline-block;
    }
    span {
      margin-top: 36px;
      font-size: 23px;
      display: inline-block;
      color: rgb(13, 164, 1);
    }
  }
  .success-msg {
    padding-left: 20px;
    .p-title {
      color: #f00 !important;
    }
  }
}
</style>
