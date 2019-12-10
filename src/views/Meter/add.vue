<template>
  <el-dialog
    class="meter-add"
    title="新增表计"
    :visible.sync="modelShow"
    :close-on-click-modal='false'
    :before-close="handleClose">
    <el-form ref="rules" :model="meter" label-position="top" status-icon :rules="rules" >
      <div class="grouping m0">
        <span class="grouping-title">通信参数</span>
        <div class='grouping-content clearfix'>
          <el-form-item label="表地址" prop="Addr" class='el-item50'>
            <el-input v-model="meter.Addr" size='small' @input="addrChanged"></el-input>
          </el-form-item>
          <el-form-item label="通信协议" prop="Protocol" class='el-item50 mr0'>
            <el-select @change="protocolChanged" v-model="meter.Protocol" size='small'>
              <el-option
                v-for="item in meterProtocol"
                :key="item.id"
                :label="item.value"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="密码密级" prop="CtrlPw" class='el-item50'>
            <el-input v-model="meter.CtrlPw" size='small'></el-input>
          </el-form-item>
          <el-form-item label="集中器地址" prop="JzqAddr" class='el-item50 mr0'>
            <el-select v-model="meter.JzqAddr" filterable @blur="selectBlur" size='small' :disabled="isJzqProtocol" >
              <el-option
                v-for="item in jzqAddrs"
                :key="item.id"
                :label="item.label"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="表计序号" prop="SeqId" class='el-item50'>
            <el-input v-model="meter.SeqId" size='small' :disabled="isJzqProtocol"></el-input>
          </el-form-item>
          <el-form-item label="端口" prop="Port" class='el-item50 mr0'>
            <el-select v-model="meter.Port" size='small' :disabled="isJzqProtocol" >
              <el-option
                v-for="item in meterPort"
                :key="item.id"
                :label="item.value"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
      </div>
      <div class="grouping">
        <span class="grouping-title">用户信息</span>
        <div class='grouping-content clearfix'>
          <el-form-item label="用户表名" prop="UserName" class="el-item50">
            <el-input v-model="meter.UserName" size="small" ></el-input>
          </el-form-item>
          <el-form-item label="用户表号" prop="UserNo" class="el-item50 mr0">
            <el-input v-model="meter.UserNo" size="small" ></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="Mobile" class="el-item50">
            <el-input v-model="meter.Mobile" size="small" ></el-input>
          </el-form-item>
          <el-form-item label="计费标准" prop="UserType" class="el-item50 mr0">
            <el-select v-model="meter.UserType" size="small" >
              <el-option
                v-for="item in userTypes"
                :key="item.id"
                :label="item.value"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="表计类型" prop="MeterType" class="el-item50">
            <el-select v-model="meter.MeterType" size="small" >
              <el-option
                v-for="item in meterType"
                :key="item.id"
                :label="item.value"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="倍率" prop="PtCt" class="el-item50 mr0">
            <el-input v-model="meter.PtCt" size="small"></el-input>
          </el-form-item>
          <el-form-item label="日用量下限" prop="MinVal" class="el-item50">
            <el-input v-model="meter.MinVal" size="small"></el-input>
          </el-form-item>
          <el-form-item label="日用量上限" prop="MaxVal" class="el-item50 mr0">
            <el-input v-model="meter.MaxVal" size="small"></el-input>
          </el-form-item>
          <el-form-item label='位置' prop="Site" class="last-w" style="padding-bottom:25px;margin-bottom:0!important">
            <el-input v-model="meter.Site" size="small"></el-input>
          </el-form-item>
        </div>
      </div>
    </el-form>
    <span slot="footer" class="dialog-footer" style="padding-top:25px">
      <el-button @click="modelShow = false" size='small'>取 消</el-button>
      <el-button type="primary" @click="addMeter('rules')" size='small'>确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { ProtocolMeter, WsCmd, PortMeter, MeterTypes, UserTypes } from '../../config'
import store from '@/store/store'
import protoRoot from '@/proto/WsMsg.js'
import * as Pro3761 from '@/pro/pro3761.js'
import * as Pro645 from '@/pro/pro645.js'
import { spliceData } from '@/utils/send.js'
import { sendSock } from '@/utils/websocket.js'
import * as Config from '@/config.js'
import { getMeterAddError } from '../../error'
import { Notify } from '../../utils/commUtil'
import * as Validate from '../../utils/validate.js'

export default {
  data () {
    return {
      modelShow: false,
      meter: {
        Addr: null,
        Protocol: 11,
        MeterType: 0,
        CtrlPw: null,
        PtCt: null,
        AreaId: null,
        VirAddr: null,
        Port: 2,
        Mobile: null,
        UserType: 1,
        UserNo: null,
        UserName: null,
        Site: null,
        MinVal: 0.00,
        MaxVal: 0.00,
        SeqId: 1,
        JzqAddr: null
      },
      meterProtocol: ProtocolMeter,
      meterType: MeterTypes,
      jzqAddrs: [],
      meterPort: PortMeter,
      userTypes: UserTypes,
      isJzqProtocol: false,
      rules: {
        Addr: [{ validator: Validate.validateMeterAddr, trigger: 'blur' }],
        CtrlPw: [{ validator: Validate.validateMeterPw, trigger: 'blur' }],
        PtCt: [{ validator: Validate.validateMeterPtCt, trigger: 'blur' }],
        Mobile: [{ validator: Validate.validateMobile, trigger: 'blur' }],
        MinVal: [{ validator: Validate.validateMeterMaxVal, trigger: 'blur' }],
        MaxVal: [{ validator: Validate.validateMeterMinVal, trigger: 'blur' }],
        SeqId: [{ validator: Validate.validateMeterSeqId, trigger: 'blur' }],
        UserNo: [{ validator: Validate.validateMeterNo, trigger: 'blur' }],
        UserName: [{ validator: Validate.validateMeterName, trigger: 'blur' }]
      },
      protoMeterAddIn: protoRoot.lookup('WsMsg.Meter')
    }
  },
  props: ['meterData'],
  methods: {
    show () {
      // get current area
      if ((store.state.currentAreaTerNode.id === undefined) 
        && (store.state.currentAreaTerNode.areaId === undefined)) {
        Notify('请选择左侧树节点', 'info')
        return
      }

      this.modelShow = true
      this.getAllJzq()
      this.modifyUserTypeName()
    },
    addMeter (pRules) {
      console.log(this.$refs[pRules])
      this.$refs[pRules].validate(async valid => {
        if (valid) {
          if (this.meter.Protocol === 1) { // 3761
            let strAddr = Pro645.AddrUiStrToProInt(this.meter.Addr)
            if (store.state.currentAreaTerNode.isTer) {
              this.meter.AreaId = store.state.currentAreaTerNode.areaId
            } else {
              this.meter.AreaId = store.state.currentAreaTerNode.id
            }
            this.meter.VirAddr = parseInt(strAddr) * 1024 + parseInt(this.meter.SeqId)
          } else {
            let strAddr = Pro3761.AddrProIntToUiStr(this.meter.JzqAddr)
            let obj = this.jzqAddrs.find((e) => { return e.label === strAddr })
            this.meter.AreaId = obj.value
            this.meter.VirAddr = parseInt(this.meter.JzqAddr * 1024) + parseInt(this.meter.SeqId)
          }

          this.meter.Addr = parseInt(this.meter.Addr, 16)
          let createProto = this.protoMeterAddIn.create(this.meter)
          let encodeData = this.protoMeterAddIn.encode(createProto).finish()
          let initialData = spliceData(encodeData.length, WsCmd.meterAdd, encodeData)
          sendSock(initialData, WsCmd.meterAdd, serverData => {
            if ((serverData.flag === 0) || (serverData.flag === 1)) {
              let tmpMeter = JSON.parse(JSON.stringify(this.meter))
              tmpMeter.CtrlPw = ('00000000' + tmpMeter.CtrlPw.toString(16)).slice(-8)
              tmpMeter.Addr = tmpMeter.Addr.toString(16)
              if (this.meter.Protocol === 1) { // 3761
                tmpMeter.JzqAddr = this.meter.Addr
              } else {
                tmpMeter.JzqAddr = Pro3761.VirAddrProIntToUiStr(tmpMeter.VirAddr)
              }
              tmpMeter.SeqId = this.meter.SeqId
              tmpMeter.Protocol = Config.getMeterProtocolValue(tmpMeter.Protocol)
              tmpMeter.MeterType = Config.getMeterTypeValue(tmpMeter.MeterType)
              tmpMeter.Port = Config.getPortValue(tmpMeter.Port)
              tmpMeter.UserType = tmpMeter.UserType
              tmpMeter.UserTypeText = store.getters.getFeeNameByUserType(tmpMeter.UserType, Config)
              this.meterData.push(tmpMeter)
              Notify('添加成功', 'success')
              this.modelShow = false
            } else {
              Notify(getMeterAddError(serverData.flag), 'error')
            }
          })
          // 地址还原为 10 进制显示
          this.meter.Addr = this.meter.Addr.toString(16)
        } else {
          this.formVisible = true
        }
      })
    },
    getAllJzq () {
      this.jzqAddrs = []
      if (store.state.currentAreaTerNode.isTer) {
        let proAddr = store.state.currentAreaTerNode.addr
        let strAddr = Pro3761.AddrProIntToUiStr(proAddr)
        this.jzqAddrs.push({ id: proAddr, label: strAddr, value: store.state.currentAreaTerNode.areaId })
      } else {
        this.findTerminals(store.state.currentAreaTerNode.children)
        if (this.jzqAddrs.length > 0) {
          this.meter.JzqAddr = this.jzqAddrs[0].id
        }
      }
    },
    handleClose () {
      this.modelShow = false
    },
    selectBlur (e) {
      this.meter.JzqAddr = e.target.value
    },
    findTerminals (pVec) {
      for (let i = 0; i < pVec.length; i++) {
        if (pVec[i].isTer) {
          let proAddr = pVec[i].addr
          let strAddr = Pro3761.AddrProIntToUiStr(proAddr)
          this.jzqAddrs.push({
            id: proAddr,
            label: strAddr,
            value: pVec[i].areaId
          })
          continue
        } else if (pVec[i].children && pVec[i].children.length > 0) {
          this.findTerminals(pVec[i].children)
        }
      }
    },
    modifyUserTypeName () {
      for (let i = 0; i < this.userTypes.length; i++) {
        let type = this.userTypes[i]
        type.value = store.getters.getFeeNameByUserType(type.id, Config)
      }
    },
    addrChanged () {
      if (this.meter.Protocol === 1) { // 3761
        this.meter.JzqAddr = this.meter.Addr
      }
      this.meter.UserNo = this.meter.Addr
    },
    protocolChanged () {
      if (this.meter.Protocol === 1) { // 3761
        this.isJzqProtocol = true
        this.meter.Port = 1 // 交采
        this.meter.SeqId = 1 // 序号
        this.meter.JzqAddr = this.meter.Addr // 地址
      } else {
        this.isJzqProtocol = false
        this.meter.JzqAddr = this.jzqAddrs[0].id
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../css/meter-add.less";
</style>
