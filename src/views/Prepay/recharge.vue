<template>
  <el-dialog
    class="prepaid-form"
    title="充值"
    :close-on-click-modal='false'
    :visible.sync="formVisible"
    :before-close="handleClose">
    <el-form :model="meter" label-position="left" label-width="80px" :rules="rules">
      <div class="grouping m0">
        <span class="grouping-title">基础信息</span>
        <div class='grouping-content clearfix'>
          <el-form-item label="手机号" class='mr30'>
            <el-input v-model="meter.Mobile" placeholder="请输入手机号" size="small"></el-input>
          </el-form-item>
          <el-button @click="getMetersByMobile" type="primary" size="small">查找</el-button>
          <el-button @click="showNextMeter" type="primary" size="small">下一个</el-button>
          <el-form-item label="表地址" class='mr30'>
            <el-input v-model="meter.Addr" placeholder="请输入表地址" size="small" disabled></el-input>
          </el-form-item>
          <el-form-item label="用户表号">
            <el-input v-model="meter.UserNo" placeholder="请输入表号" size="small" disabled></el-input>
          </el-form-item>
        </div>
      </div>

      <div class="grouping m0">
        <span class="grouping-title">预付费信息</span>
        <div class='grouping-content clearfix'>
          <el-form-item label="预付费类型" prop="PrePayType" class='mr30'>
            <el-select v-model="meter.PayType"  size="small">
            <el-option
              v-for="item in type"
              :key="item.id"
              :label="item.value"
              :value="item.id">
            </el-option>
          </el-select>
          </el-form-item>
          <el-form-item label="预警量" prop="AlarmVal" class="warning">
            <el-input v-model="meter.AlarmVal" size="small"></el-input>
          </el-form-item>
          <el-button @click="setPrepayInfo" type="primary" size="small">&emsp;设置&emsp;</el-button>
          <el-form-item label="计费标准" prop="userTypes" class='mr30'>
              <el-select v-model="meter.UserType" @change="userTypeChanged" size="small">
              <el-option
                v-for="item in userTypes"
                :key="item.id"
                :label="item.value"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-button type="primary" size="small">刷新单价</el-button>
          <el-button type="primary" size="small" class='but-left'>单价下载</el-button>
          <div class='unit'>
            单位(分)
            <span class='unit-label'>尖：</span><span>{{ meter.Fp1 }}</span>
            <span class='unit-label'>峰：</span><span>{{ meter.Fp2 }}</span>
            <span class='unit-label'>平：</span><span>{{ meter.Fp3 }}</span>
            <span class='unit-label'>谷：</span><span>{{ meter.Fp4 }}</span>
          </div>
        </div>
      </div>

      <div class="grouping">
        <span class="grouping-title">开户--请先设置预付费类型与有效单价</span>
        <div  class='grouping-content clearfix'>
          <el-form-item label="支付方式" prop="Pay" class='mr30'>
            <el-select v-model="meter.PayWay" size="small" :disabled="chargeEnable">
              <el-option
                v-for="item in payWay"
                :key="item.id"
                :label="item.value"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="金额(元)" prop="Fee" size="small" class="warning" >
            <el-input v-model="meter.Fee" @input="moneyChanged" :disabled="chargeEnable" ></el-input>
          </el-form-item>
          <el-button @click="charge" type="primary" size="small" :disabled="chargeEnable">充值</el-button>
          <el-form-item label="当前表底" prop="CalVal" size="small" class='mr30'>
            <el-input v-model="meter.CalVal" disabled></el-input>
          </el-form-item>
          <el-form-item label="购电次数" prop="PayCount" size="small">
            <el-input v-model="meter.PayCount" disabled></el-input>
          </el-form-item>
          <el-form-item label="当前余量" prop="Left" size="small" class='mr30'>
            <el-input v-model="meter.Left" disabled></el-input>
          </el-form-item>
          <el-form-item label="充值后余量" prop="PayLeft" size="small">
            <el-input v-model="meter.PayLeft" disabled></el-input>
          </el-form-item>
        </div>
      </div>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="formVisible = false" size='small'>取 消</el-button>
      <el-button type="primary" @click="addPrePay" size='small'>确 定</el-button>
    </span>
    <review ref="showReview" :auditorArray="auditorArray" :meterInfo="meter" :currentMeter="currentMeter" :cause="2"/>
  </el-dialog>
  <!-- </Modal> -->
</template>

<script>
import * as Config from '@/config.js'
import store from '@/store/store'
import protoRoot from '@/proto/WsMsg.js'
import { spliceData } from '@/utils/send.js'
import { sendSock } from '@/utils/websocket.js'
import { Notify } from '../../utils/commUtil'
import { getFlagError } from '../../error'
import * as Validate from '../../utils/validate.js'
import review from './review'
export default {
  data () {
    return {
      formVisible: false,
      meter: {
        Mobile: null,
        Addr: null,
        UserNo: null,
        UserName: null,
        PayType: 0,
        AlarmVal: 0,
        UserType: 1,
        PayWay: 1,
        Fp1: 0,
        Fp2: 0,
        Fp3: 0,
        Fp4: 0,
        CalVal: 0,
        PayCount: 0,
        Left: '0.00',
        PayLeft: '0.00',
        Fee: ''
      },
      payWay: Config.PayWay,
      userTypes: Config.UserTypes,
      type: Config.PrePayType,
      chargeEnable: false,
      protofeePriceGetOut: protoRoot.lookup('WsMsg.FeePriceGetOut'),
      protometerSetPrepayIn: protoRoot.lookup('WsMsg.MeterSetPrepayIn'),
      protometerInitPrepayIn: protoRoot.lookup('WsMsg.MeterInitPrepayIn'),
      protosysOprGetByRoleIn: protoRoot.lookup('WsMsg.RoleRightGetIn'),
      protosysOprGetByRoleOut: protoRoot.lookup('WsMsg.SysOprGetAllOut'),
      rules: {
        Fee: [{ validator: Validate.validateMoney, trigger: 'blur' }],
        PayLeft: [{ validator: Validate.validatePayLeft, trigger: 'blur' }]
      },
      auditorArray: [],
      targetMeters: []
    }
  },
  props: ['currentMeter', 'meters'],
  methods: {
    show () {
      this.modifyUserTypeName()
      this.fillValue()
      this.changeUi()
      this.formVisible = true
    },
    fillValue () {
      this.meter.Mobile = this.currentMeter.Mobile
      this.meter.Addr = this.currentMeter.Addr
      this.meter.UserNo = this.currentMeter.UserNo
      this.meter.UserName = this.currentMeter.UserName
      this.meter.PayType = this.currentMeter.PayType
      this.meter.AlarmVal = this.currentMeter.AlarmVal
      this.meter.UserType = this.currentMeter.UserType
      this.meter.CalVal = this.currentMeter.CalVal
      this.meter.PayCount = this.currentMeter.PayCount

      this.showFeePrice(this.currentMeter.UserType)
    },
    handleClose () {
      this.formVisible = false
    },
    addPrePay () {
      this.formVisible = false
    },
    requestFeePrice () {
      let initialData = spliceData(0, Config.WsCmd.feePriceGet, null)
      sendSock(initialData, Config.WsCmd.feePriceGet, serverData => {
        if (serverData.flag === 1) {
          let aMsg = this.protofeePriceGetOut.decode(serverData.data)
          let feePriceArray = []
          for (let i = 0; i < aMsg.Vec.length; i++) {
            let price = aMsg.Vec[i].Price
            let alias = (aMsg.Vec[i].Alias === '') ? Config.getUserTypeValue(aMsg.Vec[i].Type) : aMsg.Vec[i].Alias
            feePriceArray.push({
              Type: aMsg.Vec[i].Type,
              Fp1: price & 0xffff,
              Fp2: (price / 65536) & 0xffff,
              Fp3: (price / 4294967296) & 0xffff,
              Fp4: (price / 281474976710656) & 0xffff,
              Alias: alias
            })
          }
          store.commit('setFeePrice', feePriceArray)
          this.showFeePrice(this.currentMeter.UserType)
        } else {
          Notify(getFlagError(serverData.flag), 'error')
        }
      })
    },
    showFeePrice (pUserType) {
      let priceArray = store.getters.getFeePrice4ByUserType(pUserType)
      if (priceArray.length !== 4) {
        priceArray = [0, 0, 0, 0]
      }
      this.meter.Fp1 = priceArray[0]
      this.meter.Fp2 = priceArray[1]
      this.meter.Fp3 = priceArray[2]
      this.meter.Fp4 = priceArray[3]
    },
    userTypeChanged (pUserType) {
      this.showFeePrice(pUserType)
    },
    setPrepayInfo () {
      let meterSetPrepayIn = {
        VirAddr: this.currentMeter.VirAddr,
        UserType: this.meter.UserType,
        PayType: this.meter.PayType,
        AlarmVal: this.meter.AlarmVal * 100
      }

      let createProto = this.protometerSetPrepayIn.create(meterSetPrepayIn)
      let encodeData = this.protometerSetPrepayIn.encode(createProto).finish()
      let initialData = spliceData(encodeData.length, Config.WsCmd.meterSetPrepay, encodeData)
      sendSock(initialData, Config.WsCmd.meterSetPrepay, serverData => {
        if (serverData.flag === 1) {
          this.currentMeter.UserType = this.meter.UserType
          this.currentMeter.UserTypeText = store.getters.getFeeNameByUserType(this.meter.UserType, Config)
          this.currentMeter.PayType = this.meter.PayType
          this.currentMeter.PayTypeText = Config.getPrePayTypeValue(this.meter.PayType)
          this.currentMeter.AlarmVal = this.meter.AlarmVal
          this.changeUi()
          Notify('设置成功', 'success')
        } else {
          Notify(getFlagError(serverData.flag), 'error')
        }
      })
    },
    moneyChanged () {
      let price = store.getters.getFeePriceByUserType(this.currentMeter.UserType)
      if (price <= 0) {
        Notify('系统异常', 'error')
        return
      }
      let left = this.meter.Fee * 100 / price
      this.meter.PayLeft = (left < 0.01 ? 0 : left.toFixed(2))
    },
    changeUi () {
      if (this.currentMeter.PayType === 0) {
        this.chargeEnable = true
        return
      } else {
        if (store.getters.getFeePriceByUserType(this.currentMeter.UserType) <= 0) {
          this.chargeEnable = true
          return
        }
      }
      this.chargeEnable = false
    },
    meterInitPrepay () {
      let meterInitPrepayIn = {
        VirAddr: this.currentMeter.VirAddr,
        SwitchSta: 0,
        PayLeft: this.meter.Left * 100,
        CalVal: this.meter.CalVal * 100,
        PayCount: this.meter.PayCount
      }

      let createProto = this.protometerInitPrepayIn.create(meterInitPrepayIn)
      let encodeData = this.protometerInitPrepayIn.encode(createProto).finish()
      let initialData = spliceData(encodeData.length, Config.WsCmd.meterInitPrepay, encodeData)
      sendSock(initialData, Config.WsCmd.meterInitPrepay, serverData => {
        if (serverData.flag === 1) {
          this.currentMeter.CalVal = this.meter.CalVal
          this.currentMeter.PayLeft = this.meter.Left
          this.currentMeter.PayCount = this.meter.PayCount

          // 预设置完毕，开始读取审核员
          this.getAuditorByRole()
        } else {
          Notify(getFlagError(serverData.flag), 'error')
        }
      })
    },
    getAuditorByRole () {
      let sysOprGetByRoleIn = {
        RoleId: 4
      }

      let createProto = this.protosysOprGetByRoleIn.create(sysOprGetByRoleIn)
      let encodeData = this.protosysOprGetByRoleIn.encode(createProto).finish()
      let initialData = spliceData(encodeData.length, Config.WsCmd.sysOprGetByRole, encodeData)
      sendSock(initialData, Config.WsCmd.sysOprGetByRole, serverData => {
        const aMsg = this.protosysOprGetByRoleOut.decode(serverData.data)
        if (serverData.flag === 1) {
          if (aMsg.Vec.length === 0) {
            let fee = Number(this.meter.Fee).toFixed(2)
            this.$confirm(`确认为用户 ${this.meter.UserName} 表计 ${this.meter.Addr} 充值 ${fee}元？`, '确认', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              Notify('充值成功', 'success')
            }).catch(() => {})
          } else {
            // 审核窗口
            this.auditorArray.length = 0
            for (let i = 0; i < aMsg.Vec.length; i++) {
              this.auditorArray.push({ name: aMsg.Vec[i].Name, pw: aMsg.Vec[i].Password })
            }
            this.$refs.showReview.show()
          }
        } else {
          Notify(getFlagError(serverData.flag), 'error')
        }
      })
    },
    charge () {
      this.meterInitPrepay()
    },
    modifyUserTypeName () {
      for (let i = 0; i < this.userTypes.length; i++) {
        let type = this.userTypes[i]
        type.value = store.getters.getFeeNameByUserType(type.id, Config)
      }
    },
    getMetersByMobile () {
      this.targetMeters = this.meters.filter((element, index, array) => {
        return element.Mobile === this.meter.Mobile
      })

      if (this.targetMeters.length === 0) {
        this.currentMeter = {}
      } else {
        this.currentMeter = this.targetMeters[0]
      }
      this.fillValue()
      this.changeUi()
    },
    showNextMeter () {
      let index = this.targetMeters.findIndex((item) => {
        return this.meter.Addr === item.Addr
      })
      if ((index + 1) < this.targetMeters.length) {
        this.currentMeter = this.targetMeters[index + 1]
        this.fillValue()
        this.changeUi()
      } else {
        Notify('没有下一个了', 'info')
      }
    }
  },
  components: {
    review
  }
}
</script>

<style lang='less'>
@import '../../css/prepaid-form.less';
</style>
