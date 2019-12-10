<template>
  <div class="sysConfig hw100">
    <div class="sysConfig-title">
      <ul>
        <li
          :class="{'sysConfig-title-active': onlineRe }"
          @click="onlineRecharge()"
          id="title1"
        >在线充值</li>
        <li
          id="title2"
          :class="{'sysConfig-title-active': publicRem }"
          @click="publicRemittance()"
        >对公汇款</li>
      </ul>
    </div>

    <div class="sysConfig-content">
      <div class="sysConfig-content-bg">
        <div class="content-box" v-show="lineRecharge">
          <el-row class="step-line">
            <el-col :span="2">
              <div class="grid-content bg-purple">充值账户</div>
            </el-col>
            <el-col :span="22">
              <div class="grid-content bg-purple-light acount">zhangshan</div>
            </el-col>
          </el-row>
          <el-row class="step-line">
            <el-col :span="2">
              <div class="grid-content bg-purple">账户余额</div>
            </el-col>
            <el-col :span="22">
              <div class="grid-content bg-purple-light">
                <span class="balance">0.00元</span>
                <span class="yellow-hignline">充值金额消费后才可开具发票</span>
              </div>
            </el-col>
          </el-row>
          <el-row class="step-line">
            <el-col :span="2">
              <div class="grid-content bg-purple">充值金额</div>
            </el-col>
            <el-col :span="22">
              <div class="grid-content bg-purple-light">
                <el-input placeholder="请输入金额" v-model="reChargeNum" clearable></el-input>元
              </div>
            </el-col>
          </el-row>
          <el-row class="step-line">
            <el-col :span="2">
              <div class="grid-content bg-purple lable-explain">充值说明</div>
            </el-col>
            <el-col :span="22">
              <div class="grid-content bg-purple-light">
                在线充值不能抵扣垫付未回款，如需抵扣请使用对公汇款;
                <br />元国际信用卡支付渠道已已下线，请使用微信支付代替,详情查看
                <router-link to="/CaInfo/recharge">
                  <span class="blue-hignline">微信国际卡支付指引</span>
                </router-link>。
              </div>
            </el-col>
          </el-row>
          <el-row class="step-line">
            <el-col :span="2">
              <div class="grid-content bg-purple" style="height:20px"></div>
            </el-col>
            <el-col :span="22">
              <div class="grid-content bg-purple-light">
                <router-link to="/CaInfo/payment">
                <el-button size="small" type="primary">立即充值</el-button>
                </router-link>
                <router-link to="/CaInfo/rechargeRecord">
                  <el-button size="small" class="content-title-btn" style="margin-left:20px">充值记录</el-button>
                </router-link>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="content-box" v-show="publicRecharge">
          <el-row class="step-line">
            <el-col :span="2">
              <div class="grid-content bg-purple">充值账户</div>
            </el-col>
            <el-col :span="22">
              <div class="grid-content bg-purple-light acount">zhangsan</div>
            </el-col>
          </el-row>
          <el-row class="step-line">
            <el-col :span="2">
              <div class="grid-content bg-purple">账户余额</div>
            </el-col>
            <el-col :span="22">
              <div class="grid-content bg-purple-light">
                <span class="balance">0.00元</span>
                <span class="yellow-hignline">充值金额消费后才可开具发票</span>
              </div>
            </el-col>
          </el-row>
          <el-row class="step-line">
            <el-col :span="2">
              <div class="grid-content bg-purple">汇款流程</div>
            </el-col>
            <el-col :span="22" style="padding-left:16px">
              <div class="grid-content bg-purple-light process-box">
                <div class="process-content">
                  <div class="process-title">
                    <span class="process-num">1</span>
                    添加汇款时使用的银行卡开户名
                  </div>
                  <div>
                    <p>
                      可使用任意银行卡汇款，
                      <span class="yellow-hignline">实际汇款户名必须以下任意户名一致</span>，才可充值到账。最多添加5个户名。
                    </p>
                    <div class="tag-box">
                      <el-tag
                        :key="tag"
                        v-for="tag in dynamicTags"
                        closable
                        :disable-transitions="false"
                        @close="handleClose(tag)"
                      >{{tag}}</el-tag>
                      <el-input
                        class="input-new-tag"
                        v-if="inputVisible"
                        v-model="inputValue"
                        ref="saveTagInput"
                        size="small"
                        @keyup.enter.native="handleInputConfirm"
                        @blur="handleInputConfirm"
                      ></el-input>
                      <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加</el-button>
                    </div>
                  </div>
                  <div class="process-title">
                    <span class="process-num">2</span>
                    通过上面添加的开户卡汇款至您的腾讯云专属收款账号：
                  </div>
                  <div>
                    <div class="acoun-bg-box">
                      <p>zhangsan专属收款账号</p>
                      <el-row>
                        <el-col :span="3">
                          <div class="grid-content bg-purple">收款户名</div>
                        </el-col>
                        <el-col :span="19">
                          <div class="grid-content bg-purple-light">腾讯云计算(北京)有限公司</div>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="3">
                          <div class="grid-content bg-purple">收款银行</div>
                        </el-col>
                        <el-col :span="19">
                          <div class="grid-content bg-purple-light">招商银行北京上地支行</div>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="3">
                          <div class="grid-content bg-purple">收款账号</div>
                        </el-col>
                        <el-col :span="19">
                          <div class="grid-content bg-purple-light">11023 26561 66652 98982 656567</div>
                        </el-col>
                      </el-row>
                    </div>
                    <p class="sendMsg">
                      将以上专属账号信息免费发送至手机：180****1676
                      <span class="blue-hignline">发送短信</span>
                    </p>
                  </div>
                  <div class="process-title">
                    <span class="process-num">3</span>
                    等待
                    <span class="yellow-hignline">2~24</span>小时后汇款金额充值到账
                  </div>
                  <div>
                    <p>
                      汇款户名、银行信息正确的情况下
                      <span class="yellow-hignline">1天内可到账，最快2小时</span>，请耐心等待。
                      <br />我们将通过短信、邮件、站内信的方式向您反馈充值结果，也可前往
                      <router-link to="/CaInfo/pubRecRecord">
                        <span class="blue-hignline">对公汇款记录</span>
                      </router-link>页面查看汇款进度。
                    </p>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
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
    return {
      onlineRe: true,
      publicRem: false,
      reChargeNum: "",
      lineRecharge: true,
      publicRecharge: false,
      dynamicTags: ["张三", "李四", "王五"],
      inputVisible: false,
      inputValue: ""
    };
  },
  mounted() {},
  computed: {},
  watch: {
    screenHeight: function() {
      //监听屏幕高度变化
      var oIframe = document.getElementById("sysConfig-content");
      // oIframe.style.height ="100%";
    }
  },
  methods: {
    onlineRecharge() {
      this.onlineRe = true;
      this.publicRem = false;
      this.lineRecharge = true;
      this.publicRecharge = false;
    },
    publicRemittance() {
      this.publicRem = true;
      this.onlineRe = false;
      this.lineRecharge = false;
      this.publicRecharge = true;
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    }
  }
};
</script>

<style lang='less' scoped>
@import "../../css/sysConfig.less";

.sysConfig-content {
  overflow: hidden !important;
  .sysConfig-content-bg {
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    background-color: #fff;
  }
  .sysConfig-content-bg::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    background-color: #f5f5f5;
  }
  .sysConfig-content-bg::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #f5f5f5;
  }
  .sysConfig-content-bg::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: rgb(223, 221, 221);
  }
  .content-box {
    background-color: #fff;
    padding: 30px;
    padding-top: 0;
    .step-line {
      margin: 30px 0;
      .el-input {
        width: 200px;
        margin-right: 5px;
      }
      .balance,
      .acount {
        font-weight: 600;
        margin-right: 15px;
        color: #333;
      }
      .balance {
        border-bottom: 1px dashed #000;
      }
      .yellow-hignline {
        color: rgb(255, 157, 1);
      }
      .blue-hignline {
        color: #409eff;
      }
      .lable-explain {
        background: rgb(255, 245, 228);
        width: 80px;
        text-align: center;
        padding: 5px 0;
        color: rgb(192, 119, 19);
      }
      .process-box {
        border-left: 1.5px solid #ccc;
        padding-left: 40px;
        .process-num {
          display: inline-block;
          float: left;
          margin-left: -59px;
          width: 35px;
          height: 35px;
          line-height: 35px;
          text-align: center;
          background: rgb(229, 241, 255);
          color: #409eff;
          border-radius: 20px;
        }
        .process-title {
          font-size: 18px;
          font-weight: 600;
          line-height: 37px;
          color: #333;
        }
        p {
          line-height: 50px;
        }
        .tag-box {
          padding-bottom: 40px;
          .el-tag + .el-tag {
            margin-left: 10px;
          }
          .button-new-tag {
            margin-left: 10px;
            height: 32px;
            line-height: 30px;
            padding-top: 0;
            padding-bottom: 0;
          }
          .input-new-tag {
            width: 90px;
            margin-left: 10px;
            vertical-align: bottom;
          }
        }
        .acoun-bg-box {
          background: rgb(241, 241, 241);
          width: 80%;
          padding-left: 15px;
          padding-bottom: 10px;
          .el-row {
            padding: 5px 0;
            .el-col-3 {
              color: #999;
            }
          }
        }
        .sendMsg {
          line-height: 70px;
          padding-bottom: 20px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
