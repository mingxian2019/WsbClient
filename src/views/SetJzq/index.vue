<template>
  <div class='jzqConfig hw100'>
    <div class='jzqConfig-title'>
      <ul id='js_list'>
        <li class='jzqConfig-title-active' id='js_list_time'>获取集中器时间</li>
        <li id='js_list_reset'>复位命令</li>
        <li id='js_list_edition'>版本信息</li>
        <li id='js_list_online'>上线连接参数</li>
        <li id='js_list_status'>抄表状态</li>
        <li id='js_list_frozen'>定时主动上报日冻结设置</li>
      </ul>
    </div>
    <div class='jzqConfig-content' id="js-scroll">
      <el-form :model="JzqConfigData" class="clearfix " ref="rules" :rules="rules" >
        <div class='jzqConfig-content-item'>
          <h3 class='jzqConfig-content-item-label'>时间</h3>
          <div class='jzqConfig-content-item-children'>
            <el-form-item prop="JzqTime">
              <el-input v-model="JzqConfigData.JzqTime" size="small"></el-input>
            </el-form-item>
            <el-checkbox v-model="JzqConfigData.systemTime">取系统时间</el-checkbox>
            <el-button type="primary" size="small" @click="getJzqDateTime">召读</el-button>
            <el-button type="primary" size="small" @click="setJzqDateTime('rules')">对时</el-button>
          </div>
        </div>
        <div class='jzqConfig-content-item'>
          <h3 class='jzqConfig-content-item-label'>复位命令</h3>
          <div class='jzqConfig-content-item-children'>
            <el-form-item>
              <el-select v-model="JzqResetFn" size='small'>
                <el-option
                  v-for="item in resetCommand"
                  :key="item.id"
                  :label="item.value"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-button type="primary" size="small" @click="runJzqCmd">执行</el-button>
          </div>
        </div>
        <div class='jzqConfig-content-item'>
          <h3 class='jzqConfig-content-item-label'>版本信息</h3>
          <div class='jzqConfig-content-item-children'>
            <el-form-item>
              <el-input v-model="JzqConfigData.vendor" size="small" disabled></el-input>
            </el-form-item>
            <el-form-item>
              <el-input  v-model="JzqConfigData.protocol" size="small" disabled></el-input>
            </el-form-item>
            <el-form-item >
              <el-input v-model="JzqConfigData.software" size="small" disabled></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="JzqConfigData.releaseDate" size="small" disabled></el-input>
            </el-form-item>
            <el-button type="primary" size="small" @click='getJzqVersion'>召读</el-button>
          </div>
        </div>
        <div class='jzqConfig-content-item'>
          <h3 class='jzqConfig-content-item-label'>上线连接参数</h3>
          <div class='jzqConfig-content-item-children tow-line'>
            <el-form-item prop="FesIp">
              <el-input class='item3-input' v-model="JzqConfigData.FesIp" placeholder="请输入前置机IP" size="small"></el-input>
            </el-form-item>
            <el-form-item prop="FesPort">
              <el-input class='item3-input' v-model="JzqConfigData.FesPort" placeholder="请输入前置机端口号" size="small"></el-input>
            </el-form-item>
            <el-form-item prop="Heartbeat">
              <el-input class='item3-input' v-model="JzqConfigData.Heartbeat" placeholder="请输入心跳周期" size="small"></el-input>
            </el-form-item>
            <el-button type="primary" size="mini" class='btn-left' @click="getDefaults">默认值</el-button>
            <el-button type="primary" size="mini" @click="getJzqOnlineParm">召读</el-button><br/>
            <el-form-item prop="Apn">
              <el-input class='item3-input' v-model="JzqConfigData.Apn"  placeholder="请输入APN" size="small"></el-input>
            </el-form-item>
            <el-form-item prop="JzqUserName">
              <el-input class='item3-input' v-model="JzqConfigData.JzqUserName" placeholder="请输入APN用户名" size="small"></el-input>
            </el-form-item>
            <el-form-item prop="JzqUserPw">
              <el-input class='item3-input' v-model="JzqConfigData.JzqUserPw" placeholder="请输入APN密码" size="small"></el-input>
            </el-form-item>
            <el-button type="primary" size="mini" class='btn-left1' @click="setJzqOnlineParm('rules')">设置</el-button>
          </div>
        </div>
        <div class='jzqConfig-content-item'>
          <h3 class='jzqConfig-content-item-label'>抄表状态</h3>
          <div class='jzqConfig-content-item-children'>
            <el-form-item>
              <el-input v-model="JzqConfigData.localNumber" placeholder="请输入本地端口总表数" size="small" disabled></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="JzqConfigData.localAchieve" placeholder="请输入本地端口已抄数" size="small" disabled></el-input>
            </el-form-item>
            <el-form-item>
              <el-input  v-model="JzqConfigData.rs485Number" placeholder="请输入485端口总表数"  size="small" disabled></el-input>
            </el-form-item>
              <el-form-item>
              <el-input v-model="JzqConfigData.rs485Achieve" placeholder="请输入485端口已抄数" size="small" disabled></el-input>
            </el-form-item>
            <el-button type="primary" size="mini" @click="getJzqMeterState">召读</el-button>
          </div>
        </div>
        <div class='jzqConfig-content-item'>
          <h3 class='jzqConfig-content-item-label'>定时主动上报日冻结设置</h3>
          <div class='jzqConfig-content-item-children'>
              <el-checkbox v-model="JzqConfigData.autoReport">使能定时上报</el-checkbox>
            <el-form-item>
              <el-input class='item4-input' v-model="JzqConfigData.taskId"  placeholder="请输入任务号" size="small"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input class='item4-input' v-model="JzqConfigData.sendCycleTiming" placeholder="请输入定时发送周期" size="small"></el-input>
            </el-form-item>
            <el-select class='item4-input' placeholder="请输入单位" v-model="unitId" size='mini'>
              <el-option
                v-for="item in unit"
                :key="item.id"
                :label="item.label"
                :value="item.id"
              ></el-option>
            </el-select>
            <el-button type="primary" size="mini" @click="getJzqTaskData">召读</el-button><br/>
            <el-form-item>
              <el-date-picker  v-model="JzqConfigData.sendBaseTime" type="datetime" placeholder="选择日期时间" size="small"></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-input placeholder="请输入数据曲线抽取倍率" v-model="JzqConfigData.dataZoom" size="small"></el-input>
            </el-form-item>
            <el-button type="primary" size="mini" @click="setJzqTaskData">设置</el-button>
          </div>
        </div>

      </el-form>
      <el-button type="primary" size='medium' @click='goJzq'>返回集中器管理</el-button>
    </div>
  </div>
</template>

<script>
import { Resets, WsCmd, getPortId, JzqTaskUnit } from '../../config'
import protoRoot from '@/proto/WsMsg.js'
import { spliceData } from '@/utils/send.js'
import * as Pro3761 from '@/pro/pro3761.js'
import { sendSock } from '@/utils/websocket.js'
import store from '@/store/store'
import { get3761Error, getFlagError } from '../../error'
import { Notify } from '../../utils/commUtil'
import * as Validate from '../../utils/validate.js'
import _ from 'lodash'

export default {
  name: 'setJzq',
  data () {
    return {
      formVisible: false,
      labelPosition: 'right',
      JzqConfigData: {
        JzqTime: '', // 时间
        systemTime: false, // 是否取系统时间
        vendor: '', // 厂商号
        protocol: '', // 通信协议版本号
        software: '', // 软件版本号
        releaseDate: '', // 发布日期
        FesIp: '', // 前置机IP
        FesPort: '', // 前置机端口
        Heartbeat: '', // 心跳周期
        localNumber: '', // 本地端口总表数
        localAchieve: '', // 本地端口已抄数
        rs485Number: '', // 485端口总表数
        rs485Achieve: '', // 485端口总表数
        autoReport: false, // 是否定时上报
        taskId: '', // 任务号
        sendCycleTiming: '', // 定时发送周期
        sendBaseTime: '', // 发送基准时间
        date: '', // 日期
        dataZoom: '', // 数据曲线抽取倍率,
        Apn: '',
        JzqUserName: '',
        JzqUserPw: ''
      },
      resetCommand: Resets,
      value: '',
      JzqResetFn: 1,
      unit: JzqTaskUnit,
      unitId: 0,
      rules: {
        JzqTime: [{ validator: Validate.validateTime, trigger: 'blur' }],
        FesIp: [{ validator: Validate.validateIp, trigger: 'blur' }],
        FesPort: [{ validator: Validate.validatePort, trigger: 'blur' }],
        Heartbeat: [{ validator: Validate.validateHeart, trigger: 'blur' }],
        Apn: [{ validator: Validate.validateApn, trigger: 'blur' }],
        JzqUserName: [{ validator: Validate.validateJzqUserName, trigger: 'blur' }],
        JzqUserPw: [{ validator: Validate.validateJzqUserPw, trigger: 'blur' }]
      },
      protoToFesIn: protoRoot.lookup('WsMsg.ToFesIn'),
      protoToFesOut: protoRoot.lookup('WsMsg.ToFesOut'),
      toFesIn: {
        Fes: 0,
        SpanSec: 5,
        Type: 0
      }
    }
  },
  props: ['selectedData'],
  mounted () {
    const LIST = document.getElementById('js_list')
    const LIST_ITEMS = document.querySelectorAll('#js_list li')
    console.log(LIST_ITEMS)
    const SCROLLDOM = document.getElementById('js-scroll')
    LIST.addEventListener('click', (e) => {
      for (let i = 0; i < LIST_ITEMS.length; i++) {
        LIST_ITEMS[i].classList.remove('jzqConfig-title-active')
      }

      if (e.target.id === 'js_list_time') {
        console.log(11)
        SCROLLDOM.scrollTop = 0
      } else if (e.target.id === 'js_list_reset') {
        SCROLLDOM.scrollTop = 100
      } else if (e.target.id === 'js_list_edition') {
        SCROLLDOM.scrollTop = 200
      } else if (e.target.id === 'js_list_online') {
        SCROLLDOM.scrollTop = 330
      } else if (e.target.id === 'js_list_status') {
        SCROLLDOM.scrollTop = 330
      } else if (e.target.id === 'js_list_frozen') {
        SCROLLDOM.scrollTop = 330
      }
    })
    SCROLLDOM.addEventListener('scroll', _.throttle(function (e) {
      // LIST_ITEMS[0].classList.remove('jzqConfig-title-active')
      if (SCROLLDOM.scrollTop > 0 && SCROLLDOM.scrollTop < 100) {
        for (let i = 0; i < LIST_ITEMS.length; i++) {
          LIST_ITEMS[i].classList.remove('jzqConfig-title-active')
          if (i === 0) {
            LIST_ITEMS[0].classList.add('jzqConfig-title-active')
            continue
          }
        }
      } else if (SCROLLDOM.scrollTop >= 100 && SCROLLDOM.scrollTop < 200) {
        for (let i = 0; i < LIST_ITEMS.length; i++) {
          LIST_ITEMS[i].classList.remove('jzqConfig-title-active')
          if (i === 1) {
            LIST_ITEMS[1].classList.add('jzqConfig-title-active')
            continue
          }
        }
      } else if (SCROLLDOM.scrollTop >= 200 && SCROLLDOM.scrollTop < 300) {
        for (let i = 0; i < LIST_ITEMS.length; i++) {
          LIST_ITEMS[i].classList.remove('jzqConfig-title-active')
          if (i === 2) {
            LIST_ITEMS[2].classList.add('jzqConfig-title-active')
            continue
          }
        }
      } else if (SCROLLDOM.scrollTop > 300) {
        for (let i = 0; i < LIST_ITEMS.length; i++) {
          LIST_ITEMS[i].classList.remove('jzqConfig-title-active')
          if (i === 3) {
            LIST_ITEMS[3].classList.add('jzqConfig-title-active')
            continue
          }
        }
      }
    }, 200))
  },
  created () {
    // let Apn = [90, 87, 88, 89,25,25,25,25,25]
    // let text = ''
    // for(let i = 0; i < Apn.length; i++) {
    //   if(Apn[i] === 0) {
    //     continue
    //   }
    //   text +=String.fromCharCode(Apn[i])
    // }
    // // console.log(String.fromCharCode(Apn))
    // this.JzqConfigData.Apn = text
    // // console.log(String.fromCharCode.apply(null, Apn))
  },
  methods: {
    show () {
      if (store.state.currentTerAddr === undefined) {
        Notify('系统异常', 'error')
        return
      }
      let addr = store.state.currentTerAddr
      let fes = store.getters.getTerminalFesByAddr(addr)
      console.log('fes', fes)
      if (fes < 0) {
        Notify('集中器不在线', 'info')
        return
      }
      this.formVisible = true
      this.JzqResetFn = 1
    },
    checkValue () { // 加上错误提示
      if (store.state.currentTerAddr === undefined) {
        return false
      }
      this.toFesIn.Addr = store.state.currentTerAddr
      let fes = store.getters.getTerminalFesByAddr(store.state.currentTerAddr)
      if (fes < 0) {
        Notify('集中器离线', 'error')
        return false
      }
      this.toFesIn.Fes = fes
      return true
    },
    getJzqDateTime () { // 读取集中器时间
      let pack = new ArrayBuffer(4)
      var dataUnit = new DataView(pack)
      dataUnit.setUint16(0, 0, true)
      dataUnit.setUint16(2, Pro3761.Fn(2), true)
      if (!this.checkValue()) return
      this.toFesIn.Pack = Pro3761.BuildPack(0x4B, this.toFesIn.Addr, this.toFesIn.Fes,
        Pro3761.ProAfn.Afn_AskNowVal,
        0x60 + store.getters.getTerminalSeqByAddr(this.toFesIn.Addr), dataUnit, pack.byteLength)
      let createProto = this.protoToFesIn.create(this.toFesIn)
      let encodeData = this.protoToFesIn.encode(createProto).finish()
      let initialData = spliceData(encodeData.length, WsCmd.terminalComm, encodeData)
      sendSock(initialData, WsCmd.terminalComm, serverData => {
        if (serverData.flag === 1) {
          let response = this.protoToFesOut.decode(serverData.data)
          if (response.ErrCode === 0) {
            if (response.Pack[6] !== 136) {
              this.$message.error(get3761Error(-7))
            } else {
              this.JzqConfigData.JzqTime = (new Date(
                (2000 + parseInt(response.Pack[23].toString(16))), (response.Pack[22] & 0x1f).toString(16) - 1,
                response.Pack[21].toString(16), response.Pack[20].toString(16),
                response.Pack[19].toString(16), response.Pack[18].toString(16))).Format('yyyy-MM-dd HH:mm:ss')
            }
          } else {
            Notify(get3761Error(response.ErrCode), 'error')
          }
        } else {
          Notify(getFlagError(serverData.flag), 'error')
        }
      })
    },
    setJzqDateTime (pRules) { // 设置集中器时间
      this.$refs[pRules].validateField('JzqTime', errorMessage => {
        if (errorMessage !== '') {
          return false
        }
        let pack = new ArrayBuffer(26)
        var dataUnit = new DataView(pack)
        dataUnit.setUint16(0, 0, true)
        dataUnit.setUint16(2, Pro3761.Fn(31), true)
        if (!this.checkValue()) return
        let date = new Date(this.JzqConfigData.JzqTime)
        this.JzqConfigData.JzqTime = date.Format('yyyy-MM-dd HH:mm:ss')
        let reg = /(\d{4})-(\d{1,2})-(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})/
        let timeArray = reg.exec(this.JzqConfigData.JzqTime)
        dataUnit.setUint8(4, parseInt(timeArray[6], 16))
        dataUnit.setUint8(5, parseInt(timeArray[5], 16))
        dataUnit.setUint8(6, parseInt(timeArray[4], 16))
        dataUnit.setUint8(7, parseInt(timeArray[3], 16))
        dataUnit.setUint8(8, parseInt(timeArray[2], 16))
        dataUnit.setUint8(9, parseInt(timeArray[1], 16))

        this.toFesIn.Pack = Pro3761.BuildPack(0x4A, this.toFesIn.Addr, this.toFesIn.Fes,
          Pro3761.ProAfn.Afn_Ctrl, 0x70, dataUnit, pack.byteLength)
        let createProto = this.protoToFesIn.create(this.toFesIn)
        let encodeData = this.protoToFesIn.encode(createProto).finish()
        let initialData = spliceData(encodeData.length, WsCmd.terminalComm, encodeData)
        sendSock(initialData, WsCmd.terminalComm, serverData => {
          if (serverData.flag === 1) {
            let response = this.protoToFesOut.decode(serverData.data)
            if (response.ErrCode === 0) {
              let dataView = new DataView(new Uint8Array(response.Pack).buffer)
              let code = dataView.getUint16(16, true)
              this.errorInfo(code, '对时成功')
            } else {
              Notify(get3761Error(response.ErrCode), 'error')
            }
          } else {
            Notify(getFlagError(serverData.flag), 'error')
          }
        })
      })
    },
    runJzqCmd () {
      let pack = new ArrayBuffer(20)
      var dataUnit = new DataView(pack)
      dataUnit.setUint16(0, 0, true)
      dataUnit.setUint16(2, Pro3761.Fn(this.JzqResetFn), true)
      if (!this.checkValue()) return

      this.toFesIn.Pack = Pro3761.BuildPack(0x41, this.toFesIn.Addr, this.toFesIn.Fes,
        Pro3761.ProAfn.Afn_Reset, 0x70, dataUnit, pack.byteLength)
      let createProto = this.protoToFesIn.create(this.toFesIn)
      let encodeData = this.protoToFesIn.encode(createProto).finish()
      let initialData = spliceData(encodeData.length, WsCmd.terminalComm, encodeData)
      sendSock(initialData, WsCmd.terminalComm, serverData => {
        if (serverData.flag === 1) {
          let response = this.protoToFesOut.decode(serverData.data)
          if (response.ErrCode === 0) {
            let dataView = new DataView(new Uint8Array(response.Pack).buffer)
            let code = dataView.getUint16(16, true)
            this.errorInfo(code, '操作成功')
          } else {
            Notify(get3761Error(response.ErrCode), 'error')
          }
        } else {
          Notify(getFlagError(serverData.flag), 'error')
        }
      })
    },
    getJzqVersion () { // 读取集中器版本信息
      let pack = new ArrayBuffer(4)
      var dataUnit = new DataView(pack)
      dataUnit.setUint16(0, 0, true)
      dataUnit.setUint16(2, Pro3761.Fn(1), true)
      if (!this.checkValue()) return
      this.toFesIn.Pack = Pro3761.BuildPack(0x4B, this.toFesIn.Addr, this.toFesIn.Fes,
        Pro3761.ProAfn.Afn_AskTerminalConfig, 0x61, dataUnit, 4)

      let createProto = this.protoToFesIn.create(this.toFesIn)
      let encodeData = this.protoToFesIn.encode(createProto).finish()
      let initialData = spliceData(encodeData.length, WsCmd.terminalComm, encodeData)
      sendSock(initialData, WsCmd.terminalComm, serverData => {
        if (serverData.flag === 1) {
          let response = this.protoToFesOut.decode(serverData.data)
          if (response.ErrCode === 0) {
            this.JzqConfigData.vendor = String.fromCharCode.apply(null, response.Pack.slice(18, 22)).replace(/[\x00-\x1f]+/g, '')
            this.JzqConfigData.protocol = String.fromCharCode.apply(null, response.Pack.slice(48, 52)).replace(/[\x00-\x1f]+/g, '')
            this.JzqConfigData.software = String.fromCharCode.apply(null, response.Pack.slice(30, 34)).replace(/[\x00-\x1f]+/g, '')
            this.JzqConfigData.releaseDate = ('00' + response.Pack[36].toString(16)).slice(-2) + '-' +
                                             ('00' + response.Pack[35].toString(16)).slice(-2) + '-' +
                                             ('00' + response.Pack[34].toString(16)).slice(-2)
          } else {
            Notify(get3761Error(response.ErrCode), 'error')
          }
        } else {
          Notify(getFlagError(serverData.flag), 'error')
        }
      })
    },
    getJzqOnlineParm () { // 读取上线连接参数
      let pack = new ArrayBuffer(12)
      var dataUnit = new DataView(pack)
      dataUnit.setUint16(0, 0, true)
      dataUnit.setUint16(2, Pro3761.Fn(1), true)

      dataUnit.setUint16(4, 0, true)
      dataUnit.setUint16(6, Pro3761.Fn(3), true)

      dataUnit.setUint16(8, 0, true)
      dataUnit.setUint16(10, Pro3761.Fn(16), true)
      if (!this.checkValue()) return
      this.toFesIn.Pack = Pro3761.BuildPack(0x4B, this.toFesIn.Addr, this.toFesIn.Fes,
        Pro3761.ProAfn.Afn_ReadParam, 0x61, dataUnit, 12)

      let createProto = this.protoToFesIn.create(this.toFesIn)
      let encodeData = this.protoToFesIn.encode(createProto).finish()
      let initialData = spliceData(encodeData.length, WsCmd.terminalComm, encodeData)
      sendSock(initialData, WsCmd.terminalComm, serverData => {
        if (serverData.flag === 1) {
          let response = this.protoToFesOut.decode(serverData.data)
          if (response.ErrCode === 0) {
            let dataView = new DataView(new Uint8Array(response.Pack).buffer)
            this.JzqConfigData.Heartbeat = dataView.getUint8(23)
            this.JzqConfigData.FesIp = dataView.getUint8(28) + '.' + dataView.getUint8(29) + '.' + dataView.getUint8(30) + '.' + dataView.getUint8(31)
            this.JzqConfigData.FesPort = dataView.getUint16(32, true)
            this.JzqConfigData.Apn = String.fromCharCode.apply(null, response.Pack.slice(40, 56)).replace(/[\x00-\x1f]+/g, '')
            this.JzqConfigData.JzqUserName = String.fromCharCode.apply(null, response.Pack.slice(60, 76)).replace(/[\x00-\x1f]+/g, '')
            this.JzqConfigData.JzqUserPw = String.fromCharCode.apply(null, response.Pack.slice(92, 108)).replace(/[\x00-\x1f]+/g, '')
          } else {
            Notify(get3761Error(response.ErrCode), 'error')
          }
        } else {
          Notify(getFlagError(serverData.flag), 'error')
        }
      })
    },
    setJzqOnlineParm (pRules) {
      this.$refs[pRules].validateField(['FesIp', 'FesPort', 'Heartbeat', 'Apn', 'JzqUserName', 'JzqUserPw'], errorMessage => {
        if (errorMessage !== '') {
          return false
        }
        let pack = new ArrayBuffer(12 + 98 + 16)
        var dataUnit = new DataView(pack)
        if (!this.checkValue()) return
        dataUnit.setUint16(0, 0, true)
        dataUnit.setUint16(2, Pro3761.Fn(1), true)
        dataUnit.setUint8(9, this.JzqConfigData.Heartbeat)

        let reg = /(\d+).(\d+).(\d+).(\d+)/
        let ipArray = reg.exec(this.JzqConfigData.FesIp)
        dataUnit.setUint16(10, 0, true)
        dataUnit.setUint16(12, Pro3761.Fn(3), true)
        dataUnit.setUint8(14, parseInt(ipArray[1]))
        dataUnit.setUint8(15, parseInt(ipArray[2]))
        dataUnit.setUint8(16, parseInt(ipArray[3]))
        dataUnit.setUint8(17, parseInt(ipArray[4]))

        dataUnit.setUint16(18, this.JzqConfigData.FesPort, true)
        for (let i = 0; i < this.JzqConfigData.Apn.length; i++) {
          dataUnit.setUint8(26 + i, this.JzqConfigData.Apn.charCodeAt(i))
        }

        dataUnit.setUint16(42, 0, true)
        dataUnit.setUint16(44, Pro3761.Fn(16), true)

        for (let i = 0; i < this.JzqConfigData.JzqUserName.length; i++) {
          dataUnit.setUint8(46 + i, this.JzqConfigData.JzqUserName.charCodeAt(i))
        }

        for (let i = 0; i < this.JzqConfigData.JzqUserPw.length; i++) {
          dataUnit.setUint8(78 + i, this.JzqConfigData.JzqUserPw.charCodeAt(i))
        }

        this.toFesIn.Pack = Pro3761.BuildPack(0x4B, this.toFesIn.Addr, this.toFesIn.Fes,
          Pro3761.ProAfn.Afn_SetParam,
          0x70 + store.getters.getTerminalSeqByAddr(this.toFesIn.Addr), dataUnit, pack.byteLength)
        let createProto = this.protoToFesIn.create(this.toFesIn)
        let encodeData = this.protoToFesIn.encode(createProto).finish()
        let initialData = spliceData(encodeData.length, WsCmd.terminalComm, encodeData)
        sendSock(initialData, WsCmd.terminalComm, serverData => {
          if (serverData.flag === 1) {
            let response = this.protoToFesOut.decode(serverData.data)
            if (response.ErrCode === 0) {
              let dataView = new DataView(new Uint8Array(response.Pack).buffer)
              let code = dataView.getUint16(16, true)
              this.errorInfo(code, '设置完成')
            } else {
              Notify(get3761Error(response.ErrCode), 'error')
            }
          } else {
            Notify(getFlagError(serverData.flag), 'error')
          }
        })
      })
    },
    getJzqMeterState () { // 读取本地端口和485端口的表计数量和抄读状态
      let pack = new ArrayBuffer(4)
      var dataUnit = new DataView(pack)
      dataUnit.setUint16(0, 0, true)
      dataUnit.setUint16(2, Pro3761.Fn(11), true)
      if (!this.checkValue()) return

      this.toFesIn.Pack = Pro3761.BuildPack(0x4B, this.toFesIn.Addr, this.toFesIn.Fes,
        Pro3761.ProAfn.Afn_AskNowVal, 0x61, dataUnit, 4)

      let createProto = this.protoToFesIn.create(this.toFesIn)
      let encodeData = this.protoToFesIn.encode(createProto).finish()
      let initialData = spliceData(encodeData.length, WsCmd.terminalComm, encodeData)
      sendSock(initialData, WsCmd.terminalComm, serverData => {
        if (serverData.flag === 1) {
          let response = this.protoToFesOut.decode(serverData.data)
          if (response.ErrCode === 0) {
            // 直接使用 response.Pack.buffer 不正确，回复的数据中 buffer 属性存在未知错误
            let dataView = new DataView(new Uint8Array(response.Pack).buffer)
            let dataBlockNumber = dataView.getUint8(18)
            let portLocal = getPortId('本地') // 获取配置文件中配置的端口号 485 存在 1 和 2 ，暂未处理
            let port485 = getPortId('485')
            for (let i = 0; i < dataBlockNumber; i++) {
              let port = dataView.getUint8(19 + 19 * i)
              if (port === portLocal) {
                this.JzqConfigData.localNumber = dataView.getUint16(20 + 19 * i, true) // true 参数表示数据按照大端字节序处理
                this.JzqConfigData.localAchieve = dataView.getUint16(23 + 19 * i, true)
              }
              if (port === port485) {
                this.JzqConfigData.rs485Number = dataView.getUint16(20 + 19 * i, true)
                this.JzqConfigData.rs485Achieve = dataView.getUint16(23 + 19 * i, true)
              }
            }
          } else {
            Notify(get3761Error(response.ErrCode), 'error')
          }
        } else {
          Notify(getFlagError(serverData.flag), 'error')
        }
      })
    },
    getJzqTaskData () {
      let pack = new ArrayBuffer(8)
      var dataUnit = new DataView(pack)
      dataUnit.setUint16(0, Pro3761.SeqIdToPn(1), true)
      dataUnit.setUint16(2, Pro3761.Fn(66), true)

      dataUnit.setUint16(4, Pro3761.SeqIdToPn(1), true)
      dataUnit.setUint16(6, Pro3761.Fn(68), true)
      if (!this.checkValue()) return
      this.toFesIn.Pack = Pro3761.BuildPack(0x4B, this.toFesIn.Addr, this.toFesIn.Fes,
        Pro3761.ProAfn.Afn_ReadParam,
        0x60 + store.getters.getTerminalSeqByAddr(this.toFesIn.Addr), dataUnit, pack.byteLength)

      let createProto = this.protoToFesIn.create(this.toFesIn)
      let encodeData = this.protoToFesIn.encode(createProto).finish()
      let initialData = spliceData(encodeData.length, WsCmd.terminalComm, encodeData)
      sendSock(initialData, WsCmd.terminalComm, serverData => {
        if (serverData.flag === 1) {
          let response = this.protoToFesOut.decode(serverData.data)
          if (response.ErrCode === 0) {
            let dataView = new DataView(new Uint8Array(response.Pack).buffer)
            let fn = dataView.getUint16(16, true)
            // F68 位置
            let indexF68 = 0
            if (fn === Pro3761.Fn(66)) {
              this.JzqConfigData.taskId = Pro3761.PnToSeqId(dataView.getUint16(14, true))
              let cicleDate = dataView.getUint8(18, true)
              this.JzqConfigData.sendCycleTiming = cicleDate & 0x3f
              this.JzqConfigData.sendBaseTime = (new Date(
                (2000 + parseInt(response.Pack[24].toString(16))), (response.Pack[23] & 0x1f).toString(16),
                response.Pack[22].toString(16), response.Pack[21].toString(16),
                response.Pack[20].toString(16), response.Pack[19].toString(16))).Format('yyyy-MM-dd HH:mm:ss')

              indexF68 = 35
              this.unitId = cicleDate >> 6
              this.JzqConfigData.dataZoom = dataView.getUint8(22, true)
            } else if (fn === Pro3761.Fn(68)) {
              indexF68 = 18
            }

            let stateAuto = dataView.getUint8(indexF68)
            this.JzqConfigData.autoReport = (stateAuto === 0x55)
          } else {
            Notify(get3761Error(response.ErrCode), 'error')
          }
        } else {
          Notify(getFlagError(serverData.flag), 'error')
        }
      })
    },
    setJzqTaskData () {
      let pack = new ArrayBuffer(4 * 2 + 13 + 1 + 16)
      var dataUnit = new DataView(pack)
      dataUnit.setUint16(0, Pro3761.SeqIdToPn(1), true)
      dataUnit.setUint16(2, Pro3761.Fn(66), true)

      let jzqAddr = this.toFesIn.Addr
      dataUnit.setUint8(4, 129)
      dataUnit.setUint8(5, parseInt((new Date()).getSeconds(), 16))
      dataUnit.setUint8(6, parseInt((jzqAddr % 100) % 60, 16))
      dataUnit.setUint8(7, parseInt(((jzqAddr % 10) % 2) + 6, 16))
      dataUnit.setUint8(8, 1)
      dataUnit.setUint8(9, 1)
      dataUnit.setUint8(10, parseInt(18, 16))
      dataUnit.setUint8(11, 1)
      dataUnit.setUint8(12, 1)
      dataUnit.setUint16(13, 0xffff, true)
      dataUnit.setUint16(15, Pro3761.Fn(161), true)

      dataUnit.setUint16(17, Pro3761.SeqIdToPn(1), true)
      dataUnit.setUint16(19, Pro3761.Fn(68), true)
      dataUnit.setUint8(21, this.JzqConfigData.autoReport ? 0x55 : 0xAA)

      if (!this.checkValue()) return
      this.toFesIn.Pack = Pro3761.BuildPack(0x4B, this.toFesIn.Addr, this.toFesIn.Fes,
        Pro3761.ProAfn.Afn_SetParam,
        0x70 + store.getters.getTerminalSeqByAddr(this.toFesIn.Addr), dataUnit, pack.byteLength)

      let createProto = this.protoToFesIn.create(this.toFesIn)
      let encodeData = this.protoToFesIn.encode(createProto).finish()
      let initialData = spliceData(encodeData.length, WsCmd.terminalComm, encodeData)
      sendSock(initialData, WsCmd.terminalComm, serverData => {
        if (serverData.flag === 1) {
          this.setAutoReport()
          // this.$notify({
          //   title: '提示',
          //   message: '修改成功',
          //   type: 'success',
          //   position: 'bottom-right'
          // })
          Notify('修改成功', 'success')
        } else {
          Notify(get3761Error(response.ErrCode), 'error')
        }
      })
    },
    setAutoReport () {
      let pack = new ArrayBuffer(4 + 16)
      var dataUnit = new DataView(pack)
      dataUnit.setUint16(0, 0, true)
      dataUnit.setUint16(2, Pro3761.Fn(29), true)

      if (!this.checkValue()) return
      this.toFesIn.Pack = Pro3761.BuildPack(0x41, this.toFesIn.Addr, this.toFesIn.Fes,
        Pro3761.ProAfn.Afn_Ctrl,
        0x70 + store.getters.getTerminalSeqByAddr(this.toFesIn.Addr), dataUnit, pack.byteLength)

      let createProto = this.protoToFesIn.create(this.toFesIn)
      let encodeData = this.protoToFesIn.encode(createProto).finish()
      let initialData = spliceData(encodeData.length, WsCmd.terminalComm, encodeData)
      sendSock(initialData, WsCmd.terminalComm, serverData => {
        if (serverData.flag === 1) {
          // this.$message({ message: '主动上报设置成功！', type: 'success' })
        } else {
          Notify(getFlagError(serverData.flag), 'error')
        }
      })
    },
    goJzq () {
      this.$router.replace('/file/concentrantor')
    },
    getDefaults () {},
    errorInfo (pCode, pString) {
      if (pCode === 1) {
        Notify(pString, 'success')
      } else if (pCode === 2) {
        Notify('命令无效', 'error')
      } else {
        Notify('未知的情况', 'info')
      }
    }
  }
}
</script>

<style lang='less' scoped>
@import "../../css/jzqConfig.less";
</style>
