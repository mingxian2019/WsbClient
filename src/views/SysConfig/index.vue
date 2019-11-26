<template>
  <div class='sysConfig hw100'>
    <div class='sysConfig-title'>
      <ul id='js_list'>
        <li class='sysConfig-title-active' id='title1'>抄表采集服务设置</li>
        <li id='title2'>终端表计通信连接参数</li>
        <li id='title3'>终端表计通信连接参数</li>
      </ul>
    </div>

    <div class='sysConfig-content' id="js-scroll">
      <div class='sysConfig-content-item'>
        <h3 class='sysConfig-content-item-title'>采集存储间隔</h3>
        <el-radio-group class='ml20 sysConfig-content-item-children' v-model="sysConfigData.collectStorageinterval" >
          <el-radio :label="0">每天采集冻结<i style='color:#0366d6'> 1 </i>个点的数据 </el-radio>
          <span class='directions s_ml1'>服务费：<i> 免费</i></span><br/>
          <el-radio :label="1" >每天采集冻结<i style='color:#0366d6'> 24 </i>个点的数据</el-radio>
          <span class='directions s_ml1'>服务费：<i> 0.01 </i>元每块表每天</span><br/>
          <el-radio :label="2" class='lastbm0'>每天采集冻结<i style='color:#0366d6'> 96 </i>个点的数据</el-radio>
          <span class='directions s_ml1'>服务费：<i> 0.02 </i>元每块表每天</span><br/>
        </el-radio-group>
      </div>

      <div class='sysConfig-content-item'>
        <h3 class='sysConfig-content-item-title'>采集数据项</h3>
        <div class='sysConfig-content-item-children'>
          <el-checkbox class='ml20 childLabel ' v-model="sysConfigData.meterValue">表底</el-checkbox>
          <span class='directions s_ml2'>服务费： <i>免费</i></span>
        </div>
        <div class='sysConfig-content-item-children'>
          <el-checkbox class='ml20 childLabel lastbm0' v-model="sysConfigData.other">其它（电流、电流、功率、需量、温湿度等）</el-checkbox>
          <span class='directions s_ml2'>服务费：<i> 0.01 </i>元每块表每天</span>
        </div>
      </div>

      <div class='sysConfig-content-item'>
        <div class='sysConfig-content-item-children'>
          <el-checkbox class='sysConfig-content-item-title lastbm0' v-model="sysConfigData.prepaid">预付费</el-checkbox>
          <span class='directions s_ml3'>含计费、收费、开户、充值、拉合闸等功能。<span style='margin-right: 75px'></span> 服务费：<i> 0.01 </i>元每块表每天</span>
        </div>
      </div>

      <div class='sysConfig-content-item' >
        <div class='sysConfig-content-item-children'>
          <el-checkbox class='sysConfig-content-item-title lastbm0' v-model="sysConfigData.NoPublic">公众号或小程序</el-checkbox>
          <span class='directions s_ml2'>服务费：<i> 0.01 </i>元每块表每天</span>
        </div>
      </div>

      <div class='sysConfig-content-item'>
        <div class='sysConfig-content-item-children'>
          <el-checkbox class='sysConfig-content-item-title lastbm0' v-model="sysConfigData.ESAM">ESAM表计</el-checkbox>
          <span class='directions s_ml3'>表计的充值、拉合闸等功能需要硬件ESAM安全认证。<span style='margin-right: 35px'></span> 服务费：<i> 0.01 </i>元每块表每天</span>
        </div>
      </div>

      <div class='sysConfig-content-item'>
        <div class='sysConfig-content-item-children'>
          <el-checkbox class='sysConfig-content-item-title lastbm0' v-model="sysConfigData.perceiveTerminalOnlineStatus">客户端实时感知终端在线状态</el-checkbox>
          <span class='directions s_ml3'>未选择时为客户端<i>每小时</i>刷新 <i> 1 </i> 次在线状态的<i>免费</i>服务。<span style='margin-right: 20px'></span> 服务费：<i> 0.01 </i>元每块表每天</span>
        </div>
      </div>
      <div class='sysConfig-content-item'>
        <h3 class='sysConfig-content-item-title'>短信</h3>
        <el-radio-group class='ml20 sysConfig-content-item-children' @change="sourceFilter" v-model="sysConfigData.SMS">
          <el-radio :label="0">不使用</el-radio>
          <el-radio :label="1">使用抄表云短信</el-radio>
          <span class='directions s_ml1'>服务费：<i>0.05</i> 元每条</span>
          <br/>
          <el-radio :label="2" class='lastbm0'>使用第三方短信服务</el-radio>
          <span class='directions s_ml1'>服务费：<i>0.01</i> 元每条</span>
        </el-radio-group>
        <div class='ml20' v-show='setSmsShow'>
          <span class='input_label' style='margin-right: 37px'>余量预警时间</span>
          <el-input class='mr10 input-time' size="mini" v-model='sysConfigData.alarmTime'> </el-input>
          <span class='input_label'>时</span>
          <el-input class='mr10 input-time' size="mini" v-model='sysConfigData.alarmMinute'></el-input>
          <span class='input_label'>分</span>
          <div class='clearfix' >
            <span class='input_label'>预警催费短信模板</span>
            <el-input class='input-SetSMS' size="mini" v-model='sysConfigData.SmsTplIds'></el-input>
          </div>

        </div>
        <div class='ml20'  v-show='setShowId'>
          <span class='input_label app'>AppId</span><el-input class='input-time mr10' size="small" v-model='sysConfigData.SmsAppId'></el-input>
          <span class='input_label'>AppKey</span><el-input class='input-time' size="small" v-model='sysConfigData.SmsAppKey'></el-input>
        </div>
      </div>

      <div class='sysConfig-content-item online1'>
        <span class='input_label sysConfig-content-item-title'>前置机IP</span>
        <el-input size="small" v-model='sysConfigData.FrontIp' :disabled="true"></el-input>
        <span class='input_label sysConfig-content-item-title'>前置机端口</span>
        <el-input size="small" v-model='sysConfigData.FrontPort' :disabled="true"></el-input>
      </div>

      <div class='sysConfig-content-item timing'>
        <span class='input_label sysConfig-content-item-title item1'>欠费停电执行时间段</span>
        <el-input size="small" v-model='sysConfigData.time'></el-input><span class='mr10'>--</span>
        <el-input size="small" v-model='sysConfigData.time'></el-input>
        <span class='input_label'>重试间隔</span>
        <el-input size="small" v-model='sysConfigData.time' :disabled="true"></el-input>
        <span class='input_label'>分钟</span>
        <br/>
        <span class='input_label sysConfig-content-item-title item2'>表计充值失败重试时间段</span>
        <el-input size="small" v-model='sysConfigData.time' :disabled="true"></el-input> <span  class='mr10'>--</span>
        <el-input size="small" v-model='sysConfigData.time' :disabled="true"></el-input>
        <span class='input_label'>重试间隔</span>
        <el-input  size="small" v-model='sysConfigData.time' :disabled="true"></el-input>
        <span class='input_label'>分钟</span>
        <br/>
        <span class='input_label sysConfig-content-item-title item3'>自动补抄时间段</span>
        <el-input size="small" v-model='sysConfigData.time' :disabled="true"></el-input> <span class='mr10'>--</span>
        <el-input size="small" v-model='sysConfigData.time' :disabled="true"></el-input>
        <span class='input_label'>重试间隔</span>
        <el-input size="small" v-model='sysConfigData.time' :disabled="true"></el-input>
        <span class='input_label'>分钟</span>
      </div>
      <el-button size="small" type='primary' @click='editConfig'>保存修改</el-button>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { spliceData } from '@/utils/send.js'
import { sendSock } from '@/utils/websocket.js'
import protoRoot from '@/proto/WsMsg.js'
// import { regionData } from 'element-china-area-data'
export default {
  data () {
    return {
      sysConfigData: {
        collectStorageinterval: 1,
        meterValue: false,
        other: false,
        prepaid: false,
        NoPublic: false,
        ESAM: false,
        perceiveTerminalOnlineStatus: false,
        SMS: 0,
        SmsAppId: '',
        SmsAppKey: '',
        alarmTime: '',
        alarmMinute: '',
        SmsTplIds: '',
        FrontIp: '127.0.0.1',
        FrontPort: '8080',
        OweSwitchTime: '',
        RechargeTime: '',
        AutoReadTime: '',
        time: '00'
      },
      smsShow: false,
      showId: false,
      tabs: '',
      SysConfig: protoRoot.lookup('WsMsg.SysConfig')
    }
  },
  mounted () {
    const SCROLLDOM = document.getElementById('js-scroll')
    const TITLE1 = document.getElementById('title1')
    const TITLE2 = document.getElementById('title2')
    const TITLE3 = document.getElementById('title3')
    SCROLLDOM.addEventListener('scroll', _.throttle(function () {
      if (SCROLLDOM.scrollTop >= 0 && SCROLLDOM.scrollTop < 200) {
        TITLE3.classList.remove('sysConfig-title-active')
        TITLE1.classList.add('sysConfig-title-active')
        TITLE2.classList.remove('sysConfig-title-active')
      } else if (SCROLLDOM.scrollTop >= 200 && SCROLLDOM.scrollTop < 300) {
        TITLE1.classList.remove('sysConfig-title-active')
        TITLE2.classList.add('sysConfig-title-active')
        TITLE3.classList.remove('sysConfig-title-active')
      } else if (SCROLLDOM.scrollTop >= 300) {
        TITLE2.classList.remove('sysConfig-title-active')
        TITLE3.classList.add('sysConfig-title-active')
        TITLE1.classList.remove('sysConfig-title-active')
      }
    }, 200))
    const LIST = document.getElementById('js_list')
    const LIST_ITEMS = document.querySelectorAll('.sysConfig-title ul li')
    LIST.addEventListener('click', (e) => {
      for (let i = 0; i < LIST_ITEMS.length; i++) {
        LIST_ITEMS[i].classList.remove('sysConfig-title-active')
      }
      e.target.classList.add('sysConfig-title-active')
      if (e.target.id === 'title1') {
        SCROLLDOM.scrollTop = 0
      } else if (e.target.id === 'title2') {
        SCROLLDOM.scrollTop = 200
      } else if (e.target.id === 'title3') {
        SCROLLDOM.scrollTop = 310
      }
    })
    //this.loadConfigData()
  },
  computed: {
    setSmsShow () {
      if (this.sysConfigData.SMS === 0) {
        return false
      } else if (this.sysConfigData.SMS === 1) {
        return true
      } else {
        return true
      }
    },
    setShowId () {
      if (this.sysConfigData.SMS === 0) {
        return false
      } else if (this.sysConfigData.SMS === 1) {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    loadConfigData () {
      let createProto = this.SysConfig.create()
      let encodeData = this.SysConfig.encode(createProto).finish()
      let initialData = spliceData(encodeData.length, 120, encodeData)
      sendSock(initialData, 120, (serverData) => {
        const MESBODY = this.SysConfig.decode(serverData.data)
        console.log(MESBODY)
        if (serverData.flag > 0) {
          // this.sysConfigData { SmsTplIds, SmsAppKey, SmsAppId} = MESBODY
          this.sysConfigData.SmsTplIds = MESBODY.SmsTplIds
          this.sysConfigData.SmsAppKey = MESBODY.SmsAppKey
          this.sysConfigData.SmsAppId = MESBODY.SmsAppId
          if ((MESBODY.Services & 3) === 1) {
            this.sysConfigData.collectStorageinterval = 0
          } else if ((MESBODY.Services & 3) === 2) {
            this.sysConfigData.collectStorageinterval = 1
          } else if ((MESBODY.Services & 3) === 3) {
            this.sysConfigData.collectStorageinterval = 2
          }
          if ((MESBODY.Services & 4) === 4) {
            this.sysConfigData.meterValue = true
          }
          if ((MESBODY.Services & 8) === 8) {
            this.sysConfigData.other = true
          }
          if ((MESBODY.Services & 12) === 12) {
            this.sysConfigData.meterValue = true
            this.sysConfigData.other = true
          }
          if ((MESBODY.Services & 64) === 64) {
            this.sysConfigData.prepaid = true
          }

          if ((MESBODY.Services & 128) === 128) {
            this.sysConfigData.NoPublic = true
          }

          if ((MESBODY.Services & 512) === 512) {
            this.sysConfigData.ESAM = true
          }
          if ((MESBODY.Services & 1024) === 1024) {
            this.sysConfigData.perceiveTerminalOnlineStatus = true
          }
          if ((MESBODY.Services & 6144) === 2048) {
            this.sysConfigData.SMS = 0
          } else if ((MESBODY.Services & 6144) === 4096) {
            this.sysConfigData.SMS = 1
          } else if ((MESBODY.Services & 6144) === 6144) {
            this.sysConfigData.SMS = 2
          }
        } else {
          this.$notify.error({
            title: '提示',
            message: '服务器繁忙！ 请稍后重试',
            position: 'bottom-right'
          })
        }
      })
    },
    sourceFilter (data) {
    },
    editConfig () {
      let interval = ''
      switch (this.sysConfigData.collectStorageinterval) {
        case 0:
          interval = '01'
          break
        case 1:
          interval = '10'
          break
        case 2:
          interval = '11'
          break
      }
      let dataItem = ''
      if (this.sysConfigData.meterValue && this.sysConfigData.other === false) {
        dataItem = '0001'
      }
      if (this.sysConfigData.meterValue === false && this.sysConfigData.other) {
        dataItem = '0010'
      }
      if (this.sysConfigData.meterValue && this.sysConfigData.other) {
        dataItem = '0011'
      } else {
        dataItem = '0000'
      }
      let prepaid = ''
      this.sysConfigData.prepaid ? prepaid = '1' : prepaid = '0'
      let NoPublic = ''
      this.sysConfigData.NoPublic ? NoPublic = '01' : NoPublic = '00'
      let ESAM = ''
      this.sysConfigData.ESAM ? ESAM = '1' : ESAM = '0'
      let perceiveTerminalOnlineStatus = ''
      this.sysConfigData.perceiveTerminalOnlineStatus ? perceiveTerminalOnlineStatus = '1' : perceiveTerminalOnlineStatus = '0'
      let SMS = ''
      switch (this.sysConfigData.SMS) {
        case 0:
          SMS = '01'
          break
        case 1:
          SMS = '10'
          break
        case 2:
          SMS = '11'
          break
      }
      // let num = `${interval}${dataItem}${prepaid}${NoPublic}${ESAM}${perceiveTerminalOnlineStatus}${SMS}`
      let num = `${SMS}${perceiveTerminalOnlineStatus}${ESAM}${NoPublic}${prepaid}${dataItem}${interval}`
      let services = parseInt(num, 2)
      console.log(num)
      let SysConfigUpdateData = {
        Services: services,
        SmsAppId: this.sysConfigData.SmsAppId,
        SmsAppKey: this.sysConfigData.SmsAppKey,
        SmsTplIds: this.sysConfigData.SmsTplIds,
        SmsTime: '',
        AutoReadTime: '',
        RechargeTime: '',
        LastLoginTime: '',
        LastOnlineTime: ''
      }
      let createProto = this.SysConfig.create(SysConfigUpdateData)
      let encodeData = this.SysConfig.encode(createProto).finish()
      let initialData = spliceData(encodeData.length, 121, encodeData)
      sendSock(initialData, 121, (serverData) => {
        // console.log(serverData)
        if (serverData.flag > 0) {
          this.$notify({
            message: '修改成功',
            type: 'success'
          })
        }
      })
    }
  }
}
</script>

<style lang='less'>
@import '../../css/sysConfig.less';
</style>
