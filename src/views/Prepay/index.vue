<template>
  <div class="prepay hw100">
    <vxe-toolbar :data="meters" setting>
      <template v-slot:buttons>
          <el-select v-model="feeState" placeholder="用户类型" size='small'>
            <el-option
              v-for="item in usrFeeState"
              :key="item.id"
              :label="item.value"
              :value="item.id">
            </el-option>
          </el-select>
          <el-input placeholder="请输入关键字" prefix-icon="el-icon-search" v-model="searchText" size='small'></el-input>
          <el-button size="small" icon="el-icon-search">查询</el-button>
          <el-button size="small" icon="el-icon-document-add" @click="$refs.showOpen.show()">开户</el-button>
          <el-button size="small" icon="el-icon-money" @click="$refs.showRecharge.show()">充值</el-button>
          <el-button size="small" icon="el-icon-document-delete" @click="$refs.showDestroy.show()">销户</el-button>
          <el-button @click="cutMeter" size="small" icon="el-icon-open">拉闸</el-button>
          <el-button @click="closeMeter" class='mr10' size="small"  icon="el-icon-turn-off">合闸</el-button>
          <el-button class='btn-SMS' size="small"  icon="el-icon-chat-dot-round">短信催费</el-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      ref="xTable"
      border
      highlight-hover-row
      highlight-current-row
      :loading="loading"
      resizable
      @cell-click='handleCurrentChange'
      :tooltip-config="{theme: 'light'}"
      :tree-config="{key: 'Addr', children: 'children', trigger: 'cell'}"
      :radio-config="{labelField: 'Addr'}"
      :data.sync="list"
      :optimization ="{scrollY: {gt: 500, oSize: 10, rSize: 30}}"
      :customs.sync="customColumns">
      <vxe-table-column field="Addr" width="260" title="表地址" fixed="left" tree-node>
        <template v-slot="{ row }">
          <span v-html="row.Addr"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="Mobile" title="手机号" :filters="moubileFilters" :filter-method="filterHandler">
        <template v-slot="{ row }">
          <span v-html="row.Mobile"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="UserName" title="用户表名">
        <template v-slot="{ row }">
          <span v-html="row.UserName"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="UserNo" title="用户表号">
        <template v-slot="{ row }">
          <span v-html="row.UserNo"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="UserTypeText" title="计费标准">
        <template v-slot="{ row }">
          <span v-html="row.UserTypeText"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="PayTypeText" title="预付费类型">
        <template v-slot="{ row }">
          <span v-html="row.PayTypeText"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="AlarmVal"  title='预警量'>
        <template v-slot="{ row }">
          <span v-html="row.AlarmVal"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="SwitchSta" title="通断状态">
        <template v-slot="{ row }">
          <span v-html="row.SwitchSta"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="PayLeft"  title="剩余量">
        <template v-slot="{ row }">
          <span v-html="row.PayLeft"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="CalVal"  title="抄表扣费表底">
        <template v-slot="{ row }">
          <span v-html="row.CalVal"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="ValTime" title="抄表扣费时间">
        <template v-slot="{ row }">
          <span v-html="row.ValTime"></span>
        </template>
      </vxe-table-column>
            <vxe-table-column field="FeeTime"  title="最近充值时间">
        <template v-slot="{ row }">
          <span v-html="row.FeeTime"></span>
        </template>
      </vxe-table-column>
    </vxe-table>

    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handlePageChange"
      :pager-count="5"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      layout="total, prev, pager, next, jumper"
      :total="origin.length">
    </el-pagination>
    <a id="downlink"></a>
      <el-popover
        placement="bottom"
        trigger="click"
        v-model="visible">
        <template>
          <el-radio-group v-model="radio">
            <el-radio label="预付费类型">预付费类型</el-radio>
          </el-radio-group>

          <div class="tBtns">
            <el-button size="mini" type="text" @click="reset">重置</el-button>
            <el-button type="text" size="mini" @click='grouping(radio)'>确定</el-button>
          </div>
        </template>
        <el-button class='group btn-fun'  slot="reference" size="small"  icon="el-icon-document-copy">分组</el-button>
      </el-popover>
      <el-button class="btn-fun btn-export" size="small"  @click="downloadFile(origin)"  icon="el-icon-upload2">导出</el-button>
    <Open ref="showOpen" :currentMeter="currentMeter" :meters="meters"/>
    <Recharge ref="showRecharge" :currentMeter="currentMeter" :meters="meters"/>
    <Destroy ref="showDestroy" :currentMeter="currentMeter" :meters="meters"/>
  </div>
</template>

<script>
import Open from './open'
import Recharge from './recharge'
import Destroy from './destroy'
import XEUtils from 'xe-utils'
import * as Config from '@/config.js'
import store from '@/store/store'
import protoRoot from '@/proto/WsMsg.js'
import { spliceData } from '@/utils/send.js'
import { sendSock } from '@/utils/websocket.js'
import { get3761Error, getFlagError } from '../../error'
import { Notify, downloadExl } from '../../utils/commUtil'

export default {
  data () {
    return {
      outFile: '', // 导出文件
      options: [],
      feeState: 0,
      usrFeeState: Config.UsrFeeState,
      currentPage: 1,
      pageSize: 13,
      currentMeter: null,
      meters: [],
      visible: false,
      loading: false,
      radio: '',
      customColumns: [],
      searchText: '',
      origin: [],
      moubileFilters: [],
      protoPrepayGetIn: protoRoot.lookup('WsMsg.PrepayGetIn'),
      protoPrepayGetOut: protoRoot.lookup('WsMsg.PrepayGetOut'),
      protoToFesIn: protoRoot.lookup('WsMsg.ToFesIn'),
      protoToFesOut: protoRoot.lookup('WsMsg.ToFesOut'),
      toFesIn: {
        SpanSec: 15,
        Type: 0
      }
    }
  },
  computed: {
    list () {
      let filterName = XEUtils.toString(this.searchText).trim().toLowerCase()
      if (filterName) {
        let filterRE = new RegExp(filterName, 'gi')
        let options = { children: 'children' }
        let searchProps = [
          'Addr',
          'Protocol',
          'CtrlPw',
          'PtCt',
          'VirAddr',
          'Port',
          'Mobile',
          'UserType',
          'UserName',
          'UserNo',
          'PayType',
          'AlarmVal',
          'SwitchSta',
          'PayLeft',
          'FeeTime',
          'CalVal',
          'ValTime',
          'PayCount'
        ]

        let rest = XEUtils.searchTree(this.meters, item => searchProps.some(key => XEUtils.toString(item[key]).toLowerCase().indexOf(filterName) > -1), options)
        XEUtils.eachTree(rest, item => {
          searchProps.forEach(key => {
            item[key] = XEUtils.toString(item[key]).replace(filterRE, match => `<span class="keyword-lighten">${match}</span>`)
          })
        }, options)
        return rest
      }
      return this.meters
    },
    getAreaTerSelected () {
      return store.state.currentAreaTerNode
    }
  },
  watch: {
    getAreaTerSelected () {
      this.initTable()
    },
    deep: true
  },
  mounted () {
    this.initTable()
    this.outFile = document.getElementById('downlink')
  },
  methods: {
    handleCurrentChange (row) {
      this.currentMeter = row.row
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handlePageChange (val) {
      const jiequ = this.origin.slice((this.pageSize * (val - 1)), (val * this.pageSize))
      this.meters = jiequ
    },
    initTable () {
      // get current area
      if ((store.state.currentAreaTerNode.id === undefined) && (store.state.currentAreaTerNode.areaId === undefined)) return
      let prepayGetIn = {}
      if (store.state.currentAreaTerNode.isTer) {
        prepayGetIn.AreaId = -1
        prepayGetIn.TerminalAddr = store.state.currentAreaTerNode.addr
      } else {
        prepayGetIn.AreaId = store.state.currentAreaTerNode.id
        prepayGetIn.TerminalAddr = -1
      }

      let createProto = this.protoPrepayGetIn.create(prepayGetIn)
      let encodeData = this.protoPrepayGetIn.encode(createProto).finish()
      let initialData = spliceData(encodeData.length, Config.WsCmd.prepayGet, encodeData)
      sendSock(initialData, Config.WsCmd.prepayGet, serverData => {
        const aMsg = this.protoPrepayGetOut.decode(serverData.data)
        if (serverData.flag === 1) {
          this.meters = []
          for (let i = 0; i < aMsg.Vec.length; i++) {
            this.meters.push({
              Addr: aMsg.Vec[i].Addr.toString(16),
              Protocol: Config.getMeterProtocolValue(aMsg.Vec[i].Protocol),
              CtrlPw: ('00000000' + aMsg.Vec[i].CtrlPw.toString(16)).slice(-8),
              Mobile: aMsg.Vec[i].Mobile,
              UserTypeText: store.getters.getFeeNameByUserType(aMsg.Vec[i].UserType, Config),
              UserName: aMsg.Vec[i].UserName,
              UserNo: aMsg.Vec[i].UserNo,
              PayTypeText: Config.getPrePayTypeValue(aMsg.Vec[i].PayType),
              AlarmVal: (aMsg.Vec[i].AlarmVal / 100).toFixed(2),
              SwitchSta: parseInt(aMsg.Vec[i].SwitchSta) > 0 ? '通' : '断',
              PayLeft: (aMsg.Vec[i].PayLeft / 100).toFixed(2),
              CalVal: (aMsg.Vec[i].CalVal / 100).toFixed(2),
              FeeTime: (aMsg.Vec[i].FeeTime === 0) ? '--' : (new Date(aMsg.Vec[i].FeeTime * 1000)).Format('yyyy-MM-dd HH:mm'),
              ValTime: (aMsg.Vec[i].ValTime === 0) ? '--' : (new Date(aMsg.Vec[i].ValTime * 1000)).Format('yyyy-MM-dd HH:mm'),
              // 隐藏数据项
              PayType: aMsg.Vec[i].PayType,
              UserType: aMsg.Vec[i].UserType,
              VirAddr: aMsg.Vec[i].VirAddr,
              PayCount: aMsg.Vec[i].PayCount,
              Port: aMsg.Vec[i].Port,
              PtCt: aMsg.Vec[i].PtCt
            })
            this.origin = Config.deepClone(this.meters)
            this.meters = this.origin.slice(0, this.pageSize)
          }
        } else {
          Notify(getFlagError(serverData.flag), 'error')
        }
      })
    },
    build645Pack (pVal) {
      let buffer = new ArrayBuffer(37)
      let viewPack = new DataView(buffer)

      viewPack.setUint8(0, 1) // ter pro
      viewPack.setUint8(1, 1) // meter pro
      let meterAddr = parseInt(this.currentMeter.Addr, 16)
      viewPack.setUint32(2, meterAddr, true)
      viewPack.setUint16(6, meterAddr / 4294967295, true)
      viewPack.setUint8(8, this.currentMeter.Port)
      viewPack.setUint32(9, parseInt(this.currentMeter.CtrlPw, 16), true)
      viewPack.setUint32(13, pVal, true)
      viewPack.setUint16(17, this.currentMeter.PayCount, true)

      let userNo = parseInt(this.currentMeter.UserNo)
      viewPack.setUint32(19, userNo, true)
      viewPack.setUint16(23, userNo / 4294967295, true)

      let virAddr = parseInt(this.currentMeter.VirAddr)
      viewPack.setUint32(25, virAddr, true)
      viewPack.setUint32(30, virAddr / 4294967295, true)
      return new Uint8Array(buffer)
    },
    // 拉闸
    cutMeter () {
      if (this.currentMeter === null) {
        Notify('请选择一块表计', 'info')
        return
      }
      this.toFesIn.Addr = parseInt(this.currentMeter.VirAddr) / 1024
      this.toFesIn.Fes = store.getters.getTerminalSeqByAddr((this.currentMeter.VirAddr) / 1024)
      this.toFesIn.Type = 3 // 拉闸
      this.toFesIn.Pack = this.build645Pack(0) // 0 拉闸

      let createProto = this.protoToFesIn.create(this.toFesIn)
      let encodeData = this.protoToFesIn.encode(createProto).finish()
      let initialData = spliceData(encodeData.length, Config.WsCmd.terminalComm, encodeData)
      sendSock(initialData, Config.WsCmd.terminalComm, serverData => {
        if (serverData.flag === 1) {
          let response = this.protoToFesOut.decode(serverData.data)
          if (response.ErrCode === 0) {
            Notify('拉闸成功', 'success')
          } else {
            Notify(get3761Error(response.ErrCode), 'error')
          }
        } else {
          Notify(getFlagError(serverData.flag), 'error')
        }
      })
    },
    // 合闸
    closeMeter () {
      if (this.currentMeter === null) {
        Notify('请选择一块表计', 'info')
        return
      }
      this.toFesIn.Addr = parseInt(this.currentMeter.VirAddr) / 1024
      this.toFesIn.Fes = store.getters.getTerminalSeqByAddr((this.currentMeter.VirAddr) / 1024)
      this.toFesIn.Type = 4 // 拉闸
      this.toFesIn.Pack = this.build645Pack(1) // 1 合闸

      let createProto = this.protoToFesIn.create(this.toFesIn)
      let encodeData = this.protoToFesIn.encode(createProto).finish()
      let initialData = spliceData(encodeData.length, Config.WsCmd.terminalComm, encodeData)
      sendSock(initialData, Config.WsCmd.terminalComm, serverData => {
        if (serverData.flag === 1) {
          let response = this.protoToFesOut.decode(serverData.data)
          if (response.ErrCode === 0) {
            Notify('合闸成功', 'success')
          } else {
            Notify(get3761Error(response.ErrCode), 'error')
          }
        } else {
          Notify(getFlagError(serverData.flag), 'error')
        }
      })
    },
    // 筛选
    getFilterData () {
      const moubileData = Config.deepClone(this.origin)
      for (let i = 0; i < moubileData.length; i++) {
        this.moubileFilters.push({
          label: moubileData[i].Moubile,
          value: moubileData[i].Moubile
        })
      }
    },
    // 分组
    grouping (value) {
      let groupData = []
      let k = 0
      let PayTypeTexts = []
      for (let m = 0; m < Config.PrePayType.length; m++) {
        PayTypeTexts.push(Config.PrePayType[m].value)
      }
      if (value === '预付费类型') {
        groupData = []
        for (let i = 0; i < PayTypeTexts.length; i++) {
          let meterOpr = {}
          meterOpr.Addr = k++
          meterOpr.PayTypeText = PayTypeTexts[i]
          meterOpr.children = []
          groupData.push(meterOpr)
          for (let b = 0; b < this.origin.length; b++) {
            let aValue = PayTypeTexts[i]
            if (this.origin[b].PayTypeText === aValue) {
              if (!isEmpty(groupData)) {
                for (let j = 0; j < groupData.length; j++) {
                  if (!isEmpty(groupData)) {
                    if (groupData[j].PayTypeText === this.origin[b].PayTypeText) {
                      // this.origin[b].Addr = groupData[j].Addr + '-' + this.origin[b].Addr
                      groupData[j].children.push(this.origin[b])
                    }
                  }
                }
              }
            }
          }
        }
        getSummaries(groupData, 'PayTypeText')
        if (this.$refs.xTable) {
          this.meters = groupData
          this.$refs.xTable.loadData(this.meters)
        }
      }
      function isEmpty (param) {
        if (param === '' || param === 'undefined' || param === undefined || param === null || param === 'null') {
          return true
        } else {
          return false
        }
      }
      function getSummaries (data, key) {
        for (let i = 0; i < data.length; i++) {
          data[i][key] = `${data[i][key]}(${data[i].children.length}位)`
        }
      }
      this.visible = false
    },
    filterHandler ({ value, row, column }) {
      let property = column['property']
      return row[property] === value
    },
    downloadFile: function (rs) { // 点击导出按钮
      let data = [{}]
      for (let k in rs[0]) {
        data[0][k] = k
      }
      data = data.concat(rs)
      data[0].Addr = '表地址'
      data[0].Mobile = '手机号'
      data[0].UserName = '用户表名'
      data[0].UserNo = '表号'
      data[0].UserTypeText = '计费标准'
      data[0].PayTypeText = '预付费类型'
      data[0].AlarmVal = '预警量'
      data[0].SwitchSta = '通断状态'
      data[0].PayLeft = '剩余量'
      data[0].CalVal = '抄表扣费表底'
      data[0].ValTime = '抄表扣费时间'
      data[0].FeeTime = '最近充值时间'

      delete data[0].Protocol
      delete data[0].CtrlPw
      delete data[0].VirAddr
      delete data[0].PayCount
      delete data[0].Port
      delete data[0].PtCt
      delete data[0].PayType
      delete data[0].UserType
      downloadExl(data, '预付管理表', 13, this.outFile)
    },
    reset () {
            console.log(this.origin)
      this.meters = this.origin
      this.visible = false
      this.radio = ''
    }
  },
  components: {
    Open,
    Recharge,
    Destroy
  }
}
</script>

<style lang='less'>
@import '../../css/prepay.less';
</style>
