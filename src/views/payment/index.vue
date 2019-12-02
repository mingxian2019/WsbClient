<template>
  <div class="payment hw100">
    <p>
      <span class="blacktitle">商品订单：</span>2256335559666666666666666596
    </p>
    <div>
      <span class="blacktitle">支付金额：</span>
      <span class="price">￥122.00</span>
      <el-collapse>
        <el-collapse-item title="订单详情" name="1">
          <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
          <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <p style="padding-top:30px">
      <span class="blacktitle">支付方式：</span>
    </p>
    <div class="pay-way">
      <el-radio v-model="radio2" label="1" border>网银支付</el-radio>
      <el-radio v-model="radio2" label="2" border>微信支付</el-radio>
    </div>
    <el-row class="step-line">
      <el-col :span="2">
        <div class="grid-content bg-purple">银行类型：</div>
      </el-col>
      <el-col :span="22">
        <div class="grid-content bg-purple-light">
            <el-radio-group v-model="radio" @change="NatureOfbanks">
            <el-radio label="1">个人银行</el-radio>
            <el-radio label="2">企业银行</el-radio>
             </el-radio-group>
        </div>
      </el-col>
    </el-row>
    <el-row class="step-line">
      <el-col :span="2">
        <div class="grid-content bg-purple">选择银行：</div>
      </el-col>
      <el-col :span="22">
        <div class="grid-content bg-purple-light">
          <el-radio-group v-model="radio3" @change="bankType">
            <el-radio label="1" border>工商银行</el-radio>
            <el-radio label="2" border>农业银行</el-radio>
            <el-radio label="3" border>招商银行</el-radio>
            <el-radio label="4" border>建设银行</el-radio>
            <el-radio label="5" border>中国银行</el-radio>
            <el-radio label="6" border>邮政银行</el-radio>
            <el-radio label="7" border>交通银行</el-radio>
            <el-radio label="8" border>广发银行</el-radio>
          </el-radio-group>
        </div>
      </el-col>
    </el-row>
    <el-row class="step-line">
      <el-col :span="2">
        <div class="grid-content bg-purple">银行卡种：</div>
      </el-col>
      <el-col :span="22">
        <div class="grid-content bg-purple-light">
          <template>
            <el-radio v-model="radio4" label="1">储蓄卡</el-radio>
            <el-radio v-model="radio4" label="2">信用卡</el-radio>
          </template>
        </div>
      </el-col>
    </el-row>
    <el-button type="primary" class="payBtn">立即支付</el-button>
  </div>
</template>

<script>
import protoRoot from "@/proto/WsMsg.js";
import store from "@/store/store.js";
import { spliceData } from "@/utils/send.js";
import { sendSock } from "@/utils/websocket.js";
import { getToken } from "@/utils/auth.js";
import { Base64 } from "js-base64";
import { WsCmd } from "@/config.js";
import { getFlagError } from "../../error";
import { Notify } from "../../utils/commUtil";
import * as Validate from "../../utils/validate.js";

export default {
  name: "payment",
  data() {
    return {
      radio: "1",
      radio2: "1",
      radio3: "1",
      radio4: "1"
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    // handleChange(val) {
    //   console.log(val);
    // },
    bankType(val){
      console.log(val);
    }
  }
};
</script>

<style lang='less' scope>
.payment {
  padding: 20px;
  font-size: 17px;
  p {
    line-height: 50px;
  }
  .blacktitle {
    font-size: 18px;
    font-weight: 600;
    color: #333;
  }
  .payBtn {
    width: 140px;
    height: 54px;
    font-size: 20px;
  }
  .price {
    font-size: 30px;
    font-weight: 600;
    color: rgb(10, 195, 100);
  }
  .el-collapse {
    border-top: none;
  }
  .el-collapse-item__header {
    width: 100px;
  }
  .pay-way {
    padding-bottom: 40px;
  }
  .step-line {
    padding: 15px 0;
  }
  .payBtn {
    margin-top: 30px;
  }
  .el-radio {
    margin-right: 20px;
  }
}
</style>
