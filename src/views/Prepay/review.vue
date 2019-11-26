<template>
  <el-dialog
    class="prepaid-review"
    title="现金收款审核"
    modal='false'
    append-to-body ='true'
    :visible.sync="formVisible"
    :close-on-click-modal='false'
    :before-close="handleClose">
    <el-form :model="meter" label-position="left"  label-width="100px" >
      <div class="grouping">
        <span class="grouping-title">现金收款信息</span>
        <el-form-item label="手机号">
          <el-input v-model="meter.Mobile" size="small" disabled></el-input>
        </el-form-item>
        <el-form-item label="用户表名">
          <el-input v-model="meter.UserName" size="small" disabled></el-input>
        </el-form-item>
        <el-form-item label="表地址">
          <el-input v-model="meter.Addr" size="small" disabled></el-input>
        </el-form-item>
        <el-form-item label="金额（元）">
          <el-input v-model="meter.Fee" size="small" disabled></el-input>
        </el-form-item>
        <el-form-item label="充值前余量">
          <el-input v-model="meter.Left" size="small" disabled></el-input>
        </el-form-item>
        <el-form-item label="充值后余量">
          <el-input v-model="meter.PayLeft" size="small" disabled></el-input>
        </el-form-item>
      </div>
      <div class="grouping">
        <span class="grouping-title">审核信息</span>
        <el-form-item label="审核员">
          <el-select v-model="meter.AuditorPw" size="small">
            <el-option
              v-for="item in auditor"
              :key="item.name"
              :label="item.name"
              :value="item.pw">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="meter.Pw" placeholder="请输入密码" size="small"></el-input>
        </el-form-item>
      </div>

    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="formVisible = false" size='small'>取 消</el-button>
      <el-button type="primary" @click="submitReview" size='small'>确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import * as Config from '@/config.js'
import store from '@/store/store'
import protoRoot from '@/proto/WsMsg.js'
import { spliceData } from '@/utils/send.js'
import { sendSock } from '@/utils/websocket.js'
import { getFlagError } from '../../error'
import { Notify } from '../../utils/commUtil'

export default {
  data () {
    return {
      formVisible: false,
      meter: {
        Mobile: '',
        UserName: '',
        Addr: '',
        Fee: '',
        Left: '',
        PayLeft: '',
        AuditorPw: '',
        Pw: null
      },
      auditor: [],
      protopayLogAddIn: protoRoot.lookup('WsMsg.PayLog')
    }
  },
  props: ['auditorArray', 'currentMeter', 'meterInfo', 'cause'],
  methods: {
    show () {
      this.fillValue()
      this.formVisible = true
    },
    fillValue () {
      this.meter.Mobile = this.meterInfo.Mobile
      this.meter.UserName = this.meterInfo.UserName
      this.meter.Addr = this.meterInfo.Addr
      this.meter.Fee = Number(this.meterInfo.Fee).toFixed(2)
      this.meter.Left = Number(this.meterInfo.Left).toFixed(2)
      this.meter.PayLeft = Number(this.meterInfo.PayLeft).toFixed(2)
      this.auditor = this.auditorArray
      // 默认值
      this.meter.AuditorPw = this.auditorArray[0].pw
    },
    handleClose () {
      this.formVisible = false
    },
    submitReview () {
      // 审核成功
      let amount = Number(this.meterInfo.Fee) * 100 /
                    store.getters.getFeePriceByUserType(this.meterInfo.UserType) * 100
      let obj = this.auditor.find((item) => {
        return item.pw === this.meter.AuditorPw
      })
      if (obj === undefined) {
        Notify('系统异常', 'error')
        return
      }
      if (this.meter.Pw === this.meter.AuditorPw) {
        let payLogAddIn = {
          VirAddr: this.currentMeter.VirAddr,
          Cause: parseInt(this.cause),
          Fee: Number(this.meterInfo.Fee) * 100,
          Amount: amount,
          PayTime: Date.parse(new Date()) / 1000,
          PayWay: this.meterInfo.PayWay,
          Receiver: store.state.glSysOpr.OprName,
          TradeNo: new Date((new Date().setMonth(new Date().getMonth() + 1))).Format('yyyyMMddHHmmss') + new Date().getMilliseconds(),
          Auditor: obj.name
        }

        let createProto = this.protopayLogAddIn.create(payLogAddIn)
        let encodeData = this.protopayLogAddIn.encode(createProto).finish()
        let initialData = spliceData(encodeData.length, Config.WsCmd.payLogAdd, encodeData)
        sendSock(initialData, Config.WsCmd.payLogAdd, serverData => {
          if (serverData.flag === 0) {
            let act = parseInt(this.cause)
            let msg = (act === 1) ? '开户' : (act === 2) ? '充值' : '销户'
            Notify(msg + '成功', 'success')
          } else {
            Notify(getFlagError(serverData.flag), 'error')
          }
        })
        this.formVisible = false
      } else {
        Notify('密码不正确', 'error')
      }
    }
  }
}
</script>

<style lang='less' type='text/css'>
@import '../../css/prepaid-review.less';
</style>
