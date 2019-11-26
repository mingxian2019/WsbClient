<template>
  <div class="readMeter hw100">
    <vxe-toolbar :data="meterValData" setting>
      <template v-slot:buttons>
        <span>数据类型</span>
        <!-- <template"> -->
          <!-- <input type="type" v-for="(option, index) in column.filters" :key="index" v-model="option.data" @input="context.changeOption($event, !!option.data, option)"> -->
          <el-select v-model="valType" placeholder="请选择" @change='valTypeChange' size='small'>
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.value"
              :value="item.id">
            </el-option>
          </el-select>
        <!-- </template> -->
        <span>数据时间</span>
        <el-date-picker v-model="dateTime" align="right" type="date" placeholder="选择日期" size='small'></el-date-picker>
        <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="searchText" size='small'></el-input>
        <!-- <vxe-input placeholder="请输入内容" type="search" v-model="searchText" ></vxe-input> -->
        <el-button @click="initTable" size="small"  icon="el-icon-search">查询</el-button>
        <!-- <vxe-button @click="readDataFromJzq()">刷新</vxe-button> -->
        <el-button size="small" @click="readCurrentMeter" icon="el-icon-circle-check">抄选中</el-button>
        <el-button size="small" @click="readEmptyMeter" icon="el-icon-warning-outline">抄漏抄</el-button>

        <el-button @click="$refs.showGraph.show()" size="small"  icon="el-icon-data-line">单表能耗曲线</el-button>
        
      </template>
    </vxe-toolbar>
    <vxe-table
      ref="xTableEL"
      border
      highlight-hover-row
      highlight-current-row
      resizable
      @cell-click='handleCurrentChange'
      :tree-config="{key: 'Addr', children: 'children', trigger: 'cell'}"
      :radio-config="{labelField: 'Mobile'}"
      :data.sync="list"
      @select-all="selectAllEvent"
      @select-change="selectChangeEvent"
      :customs.sync="customColumns">
      <vxe-table-column  type="selection" width="50" fixed="left"></vxe-table-column>
      <vxe-table-column  field="Addr" width="300" title="表地址" sortable tree-node>
        <template v-slot="{ row }">
          <span v-html="row.Addr"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column  field="UserName" title="用户表名" sortable>
        <template v-slot="{ row }">
          <span v-html="row.UserName"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column  field="UserNo" title="用户表号" sortable >
        <template v-slot="{ row }">
          <span v-html="row.UserNo"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column  field="Mobile" title="手机号" sortable>
        <template v-slot="{ row }">
          <span v-html="row.Mobile"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="UserType" title="用户类型">
        <template v-slot="{ row }">
          <span v-html="row.UserType"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column  field="ValTime" title="示值时间" sortable>
        <template v-slot="{ row }">
          <span v-html="row.ValTime"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="Val0" title="总示值">
        <template v-slot="{ row }">
          <span v-html="row.Val0"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="Val5" title="日用量">
        <template v-slot="{ row }">
          <span v-html="row.Val5"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="ReadTime" title="抄表时间" sortable>
        <template v-slot="{ row }">
          <span v-html="row.ReadTime"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column width="300" field="Site" title="安装地址" sortable>
        <template v-slot="{ row }">
          <span v-html="row.Site"></span>
        </template>
      </vxe-table-column>
    </vxe-table>

    <el-pagination
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
          <el-radio label="用户类型">用户类型</el-radio>
          <!-- <el-radio label="终端地址">终端地址</el-radio> -->
        </el-radio-group>
        <div class="tBtns">
          <el-button size="mini" type="text" @click="reset">重置</el-button>
          <el-button type="text" size="mini" @click='grouping(radio)'>确定</el-button>
        </div>
        </template>
        <el-button slot="reference" size="small"  class='group btn-fun' icon="el-icon-document-copy">分组</el-button>
        </el-popover>
        <el-button size="small"  @click="downloadFile(origin)" class="btn-export btn-fun" icon="el-icon-upload2">导出</el-button>
    <Graph ref="showGraph" :currentMeter = "currentMeter"/>
  </div>
</template>

<script>
import Graph from './graph'
import protoRoot from '@/proto/WsMsg.js'
import { spliceData } from '@/utils/send.js'
import { sendSock } from '@/utils/websocket.js'
import * as Pro3761 from '@/pro/pro3761.js'
import * as Config from '@/config.js'
import store from '@/store/store'
import { get3761Error, getFlagError } from '../../error'
import { Notify, downloadExl } from '../../utils/commUtil'

import XEUtils from 'xe-utils'
export default {
  name: 'readMeter',
  data () {
    return {
      options: Config.ReadCtrls,
      aaa: 'false',
      outFile: '',
      valType: 1,
      dateTime: 0,
      meterValData: [],
      searchText: '',
      visible: false,
      currentPage: 1,
      pageSize: 13,
      customColumns: [],
      origin: [],
      radio: '',
      protoMeterValGridIn: protoRoot.lookup('WsMsg.MeterValGridIn'),
      protoMeterValGridOut: protoRoot.lookup('WsMsg.MeterValGridOut'),
      protoToFesIn: protoRoot.lookup('WsMsg.ToFesIn'),
      protoToFesOut: protoRoot.lookup('WsMsg.ToFesOut'),
      toFesIn: {
        Fes: 0,
        SpanSec: 5,
        Type: 0
      },
      currentMeter: null,
      // * 1 抄读任务
      jzqTask: [],
      meterCopy: [],
      MAXREAD: 25
      // *1
    }
  },
  computed: {
    selectArea () {
      return this.$store.state.currentAreaTerNode
    },
    list () {
      let filterName = XEUtils.toString(this.searchText).trim().toLowerCase()
      if (filterName) {
        let filterRE = new RegExp(filterName, 'gi')
        let options = { children: 'children' }
        let searchProps = [
          'Addr',
          'UserName',
          'UserNo',
          'Mobile',
          'UserType',
          'ValTime',
          'Val0',
          'Val5',
          'ReadTime',
          'Site'
        ]
        let rest = XEUtils.searchTree(this.meterValData, item => searchProps.some(key => XEUtils.toString(item[key]).toLowerCase().indexOf(filterName) > -1), options)
        XEUtils.eachTree(rest, item => {
          searchProps.forEach(key => {
            item[key] = XEUtils.toString(item[key]).replace(filterRE, match => `<span class="keyword-lighten">${match}</span>`)
          })
        }, options)
        return rest
      }
      return this.meterValData
    }
  },
  watch: {
    selectArea: function (selectNode) {
      this.initTable()
    },
    deep: true
  },
  mounted () {
    this.dateTime = new Date(new Date(new Date().getTime() - 86400000).toDateString())
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
      this.meterValData = jiequ
    },
    initTable () {
      if ((store.state.currentAreaTerNode.id === undefined) &&
          (store.state.currentAreaTerNode.areaId === undefined)) return
      let meterValGridIn = {
        FromTime: 0,
        EndTime: 0,
        ValType: 1,
        AreaId: 0,
        TerminalAddr: 0
      }
      if (store.state.currentAreaTerNode.isTer) {
        meterValGridIn.AreaId = -1
        meterValGridIn.TerminalAddr = store.state.currentAreaTerNode.addr
      } else {
        meterValGridIn.AreaId = store.state.currentAreaTerNode.id
        meterValGridIn.TerminalAddr = -1
      }
      meterValGridIn.FromTime = Date.parse(this.dateTime) / 1000
      meterValGridIn.EndTime = Date.parse(this.dateTime) / 1000
      let createProto = this.protoMeterValGridIn.create(meterValGridIn)
      let encodeData = this.protoMeterValGridIn.encode(createProto).finish()
      let initialData = spliceData(encodeData.length, Config.WsCmd.meterValGridGet, encodeData)
      sendSock(initialData, Config.WsCmd.meterValGridGet, serverData => {
        const aMsg = this.protoMeterValGridOut.decode(serverData.data)
        if (serverData.flag === 1) {
          this.meterValData = []
          for (let i = 0; i < aMsg.Vec.length; i++) {
            this.meterValData.push({
              Addr: aMsg.Vec[i].Addr.toString(16),
              UserName: aMsg.Vec[i].UserName,
              UserNo: aMsg.Vec[i].UserNo,
              Mobile: aMsg.Vec[i].Mobile,
              UserType: store.getters.getFeeNameByUserType(aMsg.Vec[i].UserType, Config),
              ValTime: (aMsg.Vec[i].ValTime !== 4294967295) ? new Date(new Date(aMsg.Vec[i].ValTime * 1000)).Format('yyyy-MM-dd') : '--',
              Val0: (aMsg.Vec[i].Val0 !== 4294967295) ? (parseInt(aMsg.Vec[i].Val0.toString(16)) / 100).toFixed(2) : '--',
              Val5: (aMsg.Vec[i].Val5 !== -1) ? (aMsg.Vec[i].Val5 / 100).toFixed(2) : '--',
              ReadTime: (aMsg.Vec[i].ReadTime !== 4294967295) ? new Date(new Date(aMsg.Vec[i].ReadTime * 1000)).Format('yyyy-MM-dd HH:mm') : '--',
              Site: aMsg.Vec[i].Site,
              JzqAddr: parseInt(aMsg.Vec[i].VirAddr / 1024),
              SeqId: aMsg.Vec[i].VirAddr & 0x3ff,
              Port: aMsg.Vec[i].Port,
              Protocol: aMsg.Vec[i].Protocol,
              VirAddr: aMsg.Vec[i].VirAddr
            })
            this.origin = Config.deepClone(this.meterValData)
            this.meterValData = this.origin.slice(0, this.pageSize)
          }
        } else {
          Notify(getFlagError(serverData.flag), 'error')
        }
      })
      this.currentMeter = null
    },
    readCurrentMeter () {
      if (this.currentMeter === null) {
        Notify('请选择一块表计', 'info')
        return
      }
      this.jzqTask.length = 0
      this.meterCopy.length = 0
      this.jzqTask.push(this.currentMeter.JzqAddr)
      this.meterCopy.push(JSON.parse(JSON.stringify(this.currentMeter)))
      if (this.valType === 1) {
        this.readDataFromJzq()
      } else if (this.valType === 2) {
        this.readDataFromMeter()
      }
    },
    readEmptyMeter () {
      if (this.valType === 2) {
        Notify('不支持此类数据的漏抄', 'error')
        return
      }
      this.jzqTask.length = 0
      this.meterCopy.length = 0
      // 查找所有存在空数据的集中器
      for (let i = 0; i < this.meterValData.length; i++) {
        if (this.jzqTask.indexOf(this.meterValData[i].JzqAddr) < 0) {
          if (this.meterValData[i].Val0.toString() === '--') {
            this.jzqTask.push(this.meterValData[i].JzqAddr)
          }
        }
      }
      this.meterCopy = JSON.parse(JSON.stringify(this.meterValData))
      this.readDataFromJzq()
    },
    readDataFromJzq () {
      if (this.jzqTask.length === 0) {
        Notify('抄读完成', 'success')
        return
      }
      let jzqAddr = this.jzqTask[0]
      var meterTask = (this.valType === 1) ? this.getMeters(jzqAddr) : this.getEmptyMeters(jzqAddr)
      if (meterTask.length === 0) {
        this.jzqTask.shift()
        this.readDataFromJzq()
        return
      }
      let pack = new ArrayBuffer(7 * meterTask.length)
      var dataUnit = new DataView(pack)
      let day = parseInt(this.dateTime.getDate(), 16)
      let month = parseInt(this.dateTime.getMonth() + 1, 16)
      let year = parseInt(this.dateTime.getFullYear() - 2000, 16)
      this.toFesIn.Addr = jzqAddr
      this.toFesIn.Fes = store.getters.getTerminalFesByAddr(this.toFesIn.Addr)
      if (this.toFesIn.Fes === -1) {
        Notify('集中器 ' + Pro3761.AddrProIntToUiStr(jzqAddr) + '离线', 'info')
        this.jzqTask.shift()
        this.readDataFromJzq()
        return
      }
      for (let i = 0; i < meterTask.length; i++) {
        dataUnit.setUint16(i * 7, Pro3761.SeqIdToPn(meterTask[i].SeqId), true)
        dataUnit.setUint16(2 + i * 7, Pro3761.Fn(161), true)
        dataUnit.setUint8(4 + i * 7, day)
        dataUnit.setUint8(5 + i * 7, month)
        dataUnit.setUint8(6 + i * 7, year)
      }
      this.toFesIn.Pack = Pro3761.BuildPack(0x4b, this.toFesIn.Addr, this.toFesIn.Fes, Pro3761.ProAfn.Afn_AskPastVal, 0x60 + store.getters.getTerminalSeqByAddr(this.toFesIn.Addr), dataUnit, pack.byteLength)
      let createProto = this.protoToFesIn.create(this.toFesIn)
      let encodeData = this.protoToFesIn.encode(createProto).finish()
      let initialData = spliceData(encodeData.length, Config.WsCmd.terminalComm, encodeData)
      sendSock(initialData, Config.WsCmd.terminalComm, serverData => {
        // const mesBody = this.protoToFesOut.decode(serverData.data)
        if (serverData.flag === 1) {
          let response = this.protoToFesOut.decode(serverData.data)
          if (response.ErrCode === 0) {
            if (response.Pack.length <= 22) {
              Notify('读取数据失败', 'error')
              this.readDataFromJzq()
              return
            }
            let dataView = new DataView(new Uint8Array(response.Pack).buffer)
            let strTerAddr = ('0000' + dataView.getUint16(7, true).toString(16)).slice(-4) + ('00000' + ((dataView.getUint32(9, true) & 0xffffff).toString(10))).slice(-5)
            let jzqAddr = Pro3761.AddrUiStrToProInt(strTerAddr)
            for (let index = 14; (index + 38) < dataView.byteLength; index = index + 38) {
              let seqId = Pro3761.PnToSeqId(dataView.getUint16(index, true))
              let obj = this.meterValData.find(function (element) {
                return element.VirAddr === (jzqAddr * 1024 + seqId)
              })
              if (obj === undefined) {
                continue
              }
              // 回复 ee 表示无数据
              if (parseInt(dataView.getUint8(index + 11)) === 0xee) {
                // 提示无有效数据
                Notify('集中器未找到有效数据', 'info')
                continue
              }
              obj.ValTime = (new Date((2000 + parseInt(dataView.getUint8(index + 6).toString(16))),
                (dataView.getUint8(index + 5) - 1).toString(16),
                dataView.getUint8(index + 4).toString(16))).Format('yyyy-MM-dd')
              obj.Val0 = parseInt(dataView.getUint8(index + 17).toString(16) * 100000000) + parseInt(dataView.getUint8(index + 16).toString(16) * 1000000) + parseInt(dataView.getUint8(index + 15).toString(16) * 10000) + parseInt(dataView.getUint8(index + 14).toString(16) * 100) + parseInt(dataView.getUint8(index + 13).toString(16))
              obj.Val0 = (obj.Val0 / 10000).toFixed(2)
              obj.ReadTime = (new Date((2000 + parseInt(dataView.getUint8(index + 11).toString(16))),
                (dataView.getUint8(index + 10) - 1).toString(16),
                dataView.getUint8(index + 9).toString(16),
                dataView.getUint8(index + 8).toString(16),
                dataView.getUint8(index + 7).toString(16))).Format('yyyy-MM-dd HH:mm')
            }
          } else {
            Notify(get3761Error(response.ErrCode), 'error')
          }
        } else {
          Notify(getFlagError(serverData.flag), 'error')
        }
        this.readDataFromJzq()
        // return
      })
    },
    readDataFromMeter () {
      let jzqAddr = this.jzqTask[0]
      var meterTask = this.getMeters(jzqAddr)
      if (meterTask.length === 0) {
        Notify('系统异常', 'error')
        return
      }
      let pack = new ArrayBuffer(4)
      var dataUnit = new DataView(pack)
      this.toFesIn.Addr = jzqAddr
      this.toFesIn.Fes = store.getters.getTerminalFesByAddr(this.toFesIn.Addr)
      if (this.toFesIn.Fes === -1) {
        Notify('集中器 ' + Pro3761.AddrProIntToUiStr(jzqAddr) + '离线', 'info')
        return
      }
      dataUnit.setUint16(0, Pro3761.SeqIdToPn(meterTask[0].SeqId), true)
      dataUnit.setUint16(2, Pro3761.Fn(129), true)
      this.toFesIn.Pack = Pro3761.BuildPack(0x4b, this.toFesIn.Addr, this.toFesIn.Fes,
        Pro3761.ProAfn.Afn_AskNowVal,
        0x60 + store.getters.getTerminalSeqByAddr(this.toFesIn.Addr), dataUnit, pack.byteLength)
      let createProto = this.protoToFesIn.create(this.toFesIn)
      let encodeData = this.protoToFesIn.encode(createProto).finish()
      let initialData = spliceData(encodeData.length, Config.WsCmd.terminalComm, encodeData)
      sendSock(initialData, Config.WsCmd.terminalComm, serverData => {
        // const mesBody = this.protoToFesOut.decode(serverData.data)
        if (serverData.flag === 1) {
          let response = this.protoToFesOut.decode(serverData.data)
          if (response.ErrCode === 0) {
            if (response.Pack.length === 20) {
              Notify('读取数据失败', 'error')
              return
            }

            let dataView = new DataView(new Uint8Array(response.Pack).buffer)
            let strTerAddr = ('0000' + dataView.getUint16(7, true).toString(16)).slice(-4) +
                              ('00000' + ((dataView.getUint32(9, true) & 0xffffff).toString(10))).slice(-5)
            let jzqAddr = Pro3761.AddrUiStrToProInt(strTerAddr)
            let seqId = Pro3761.PnToSeqId(dataView.getUint16(14, true))
            let obj = this.meterValData.find(function (element) {
              return element.VirAddr === (jzqAddr * 1024 + seqId)
            })
            if (obj === undefined) {
              return
            }
            // 回复 ee 表示无数据
            if (parseInt(dataView.getUint8(18)) === 0xee) {
              // 提示无有效数据
              Notify('集中器未找到有效数据', 'info')
              return
            }
            obj.ValTime = (new Date((2000 + parseInt(dataView.getUint8(22).toString(16))),
              (dataView.getUint8(21) - 1).toString(16),
              dataView.getUint8(20).toString(16))).Format('yyyy-MM-dd')
            obj.Val0 = parseInt(dataView.getUint8(28).toString(16) * 100000000) + parseInt(dataView.getUint8(27).toString(16) * 1000000) + parseInt(dataView.getUint8(26).toString(16) * 10000) + parseInt(dataView.getUint8(25).toString(16) * 100) + parseInt(dataView.getUint8(24).toString(16))
            obj.Val0 = (obj.Val0 / 10000).toFixed(2)
            obj.ReadTime = (new Date((2000 + parseInt(dataView.getUint8(22).toString(16))),
              (dataView.getUint8(21) - 1).toString(16),
              dataView.getUint8(20).toString(16),
              dataView.getUint8(19).toString(16),
              dataView.getUint8(18).toString(16))).Format('yyyy-MM-dd HH:mm')
          } else {
            Notify(get3761Error(response.ErrCode), 'error')
          }
        } else {
          Notify(getFlagError(serverData.flag), 'error')
        }
        Notify('抄读完成', 'success')
      })
    },
    getMeters (pJzqAddr) {
      var meters = []
      for (let i = 0; i < this.meterCopy.length; i++) {
        if (meters.length === this.MAXREAD) {
          return meters
        }
        if (this.meterCopy[i].JzqAddr === pJzqAddr) {
          meters.push(this.meterCopy[i])
          this.meterCopy.splice(i, 1)
          i--
        }
      }
      return meters
    },
    getEmptyMeters (pJzqAddr) {
      var meters = []
      for (let i = 0; i < this.meterCopy.length; i++) {
        if (meters.length === this.MAXREAD) {
          return meters
        }
        if ((this.meterCopy[i].JzqAddr === pJzqAddr) && (this.meterCopy[i].Val0.toString() === '--')) {
          meters.push(this.meterCopy[i])
          this.meterCopy.splice(i, 1)
          i--
        }
      }
      return meters
    },
    getFilterData () {
    },
    grouping (value) {
      let groupData = []
      let k = 0
      let userTypes = []
      for (let m = 0; m < this.origin.length; m++) {
        userTypes.push(this.origin[m].UserType)
      }
      if (value === '用户类型') {
        groupData = []
        for (let i = 0; i < userTypes.length; i++) {
          let sysOpr = {}
          sysOpr.Addr = k++
          sysOpr.UserType = userTypes[i]
          sysOpr.children = []
          groupData.push(sysOpr)
          for (let b = 0; b < this.origin.length; b++) {
            let aValue = userTypes[i]
            if (this.origin[b].UserType === aValue) {
              if (!isEmpty(groupData)) {
                for (let j = 0; j < groupData.length; j++) {
                  if (!isEmpty(groupData)) {
                    if (groupData[j].UserType === this.origin[b].UserType) {
                      // this.origin[b].Addr = groupData[j].Addr + '-' + this.origin[b].Addr
                      groupData[j].children.push(this.origin[b])
                    }
                  }
                }
              }
            }
          }
        }
        getSummaries(groupData, 'UserType')
        if (this.$refs.xTableEL) {
          this.meterValData = groupData
          this.$refs.xTableEL.loadData(this.meterValData)
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
      data[0].UserName = '用户表名'
      data[0].UserNo = '用户表号'
      data[0].Mobile = '手机号'
      data[0].UserType = '用户类型'
      data[0].ValTime = '示值时间'
      data[0].Val0 = '总示值'
      data[0].Val5 = '日用量'
      data[0].ReadTime = '抄表时间'
      data[0].Site = '安装地址'
      delete data[0].JzqAddr
      delete data[0].SeqId
      delete data[0].Port
      delete data[0].Protocol
      delete data[0].VirAddr
      downloadExl(data, '水电抄读表', 10, this.outFile)
    },
    reset () {
      this.meterValData = this.origin
      this.visible = false
      this.radio = ''
    },
    selectAllEvent ({ checked }) {
      console.log(checked ? '所有勾选事件' : '所有取消事件')
    },
    selectChangeEvent ({ checked, row }) {
      console.log(checked ? '勾选事件' : '取消事件')
    },
    valTypeChange (val) {
      if (val === 1) {
        this.initTable()
      } else if (val === 2) {
        for (let i = 0; i < this.meterValData.length; i++) {
          this.meterValData[i].ValTime = '--'
          this.meterValData[i].Val0 = '--'
          this.meterValData[i].ReadTime = '--'
        }
      }
    }
  },
  components: {
    Graph
  }
}
</script>

<style lang='less' >
@import "../../css/readMeter.less";
</style>
