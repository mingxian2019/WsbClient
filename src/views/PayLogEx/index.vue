<template>
<!-- 充值异常管理 -->
  <div class="payLogEx">
    <vxe-toolbar :data="meters" setting>
      <template v-slot:buttons>
        <span>起始时间</span>
        <el-date-picker
          v-model="dateFrom"
          type="date"
          size='small'
          placeholder="选择日期">
        </el-date-picker>
        <span>结束时间</span>
        <el-date-picker
          v-model="dateEnd"
          type="date"
          size='small'
          placeholder="选择日期">
        </el-date-picker>
        <el-select v-model="prePayEx" placeholder="请选择" @change="payExChanged"  size='small'>
          <el-option
            v-for="item in prePayExArray"
            :key="item.id"
            :label="item.value"
            :value="item.id">
          </el-option>
        </el-select>
        <el-button @click="charge" size="small" icon="el-icon-finished">再次执行</el-button>
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
      :tree-config="{key: 'TradeNo', children: 'children', trigger: 'cell'}"
      :radio-config="{labelField: 'Addr'}"
      :data.sync="list"
      :optimization ="{scrollY: {gt: 500, oSize: 10, rSize: 30}}"
      :customs.sync="customColumns">
      <vxe-table-column field="TradeNo" title="交易单号" width="190" show-overFlow>
        <template v-slot="{ row }">
          <span v-html="row.TradeNo"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="Addr" title="表地址" fixed="left" width="180" tree-node  show-overflow>
        <template v-slot="{ row }">
          <span v-html="row.Addr"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="UserName" title="用户表名"  width="130" show-overflow>
        <template v-slot="{ row }">
          <span v-html="row.UserName"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="Mobile" title="手机号" width="130" show-overflow>
        <template v-slot="{ row }">
          <span v-html="row.Mobile"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="PrePayType" title="预付费类型" width="130" show-overflow>
        <template v-slot="{ row }">
          <span v-html="row.PrePayType"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="PayTime" title="收费时间" width="190" show-overflow>
        <template v-slot="{ row }">
          <span v-html="row.PayTime"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="PayWay" title="收费方式" width="130"  show-overflow>
        <template v-slot="{ row }">
          <span v-html="row.PayWay"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="Fee" title="金额" width="130" show-overflow>
        <template v-slot="{ row }">
          <span v-html="row.Fee"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="Cause" title="款项" width="130" show-overFlow>
        <template v-slot="{ row }">
          <span v-html="row.Cause"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="Receiver" title="收款员" width="130" show-overFlow>
        <template v-slot="{ row }">
          <span v-html="row.Receiver"></span>
        </template>
      </vxe-table-column>

      <vxe-table-column field="ActRet" title="执行失败次数" width="130" show-overFlow>
        <template v-slot="{ row }">
          <span v-html="row.ActRet"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="ActTime" title="最近执行时间" width="160" show-overFlow>
        <template v-slot="{ row }">
          <span v-html="row.ActTime"></span>
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
        <el-radio-group v-model="radio" >
          <el-radio label="收费方式">收费方式</el-radio>
          <el-radio label="预付费类型">预付费类型</el-radio>
        </el-radio-group>

        <div class="tBtns">
          <el-button size="mini" type="text" @click="reset">重置</el-button>
          <el-button type="text" size="mini" @click='grouping(radio)'>确定</el-button>
        </div>
      </template>
      <el-button slot="reference" class='group btn-fun' size="small"  icon="el-icon-document-copy">分组</el-button>
    </el-popover>
    <el-button @click="downloadFile(origin)" class="btn-export btn-fun" size="small" icon="el-icon-upload2">导出</el-button>
  </div>
</template>

<script>
import * as Config from '@/config.js'
// import XEUtils from 'xe-utils'
import store from '@/store/store'
import protoRoot from '@/proto/WsMsg.js'
import { spliceData } from '@/utils/send.js'
import { sendSock } from '@/utils/websocket.js'
import { Notify, downloadExl } from '../../utils/commUtil'
import { getChargeFlagError, getFlagError } from '../../error'

export default {
  data () {
    return {
      outFile: '', // 导出文件
      prePayExArray: Config.PrePayEx,
      prePayEx: 0,
      meters: [],
      currentMeter: null,
      customColumns: [],
      radio: '',
      origin: [],
      currentPage: 1,
      pageSize: 13,
      loading: false,
      visible: false,
      dateFrom: null,
      dateEnd: null,
      protopayLogExtGetIn: protoRoot.lookup('WsMsg.PayLogExtGetIn'),
      protopayLogExtGetOut: protoRoot.lookup('WsMsg.PayLogExtGetOut'),
      protopayExRetryIn: protoRoot.lookup('WsMsg.PayExRetryIn')

    }
  },
  computed: {
    list () {
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
    let date = new Date()
    this.dateFrom = new Date(date.getFullYear(), date.getMonth(), 1)
    this.dateEnd = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    this.initTable()
    this.outFile = document.getElementById('downlink')
  },
  methods: {
    handleCurrentChange (val) {
      this.currentMeter = val.row
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handlePageChange (val) {
      const jiequ = this.origin.slice((this.pageSize * (val - 1)), (val * this.pageSize))
      this.meters = jiequ
    },
    initTable () {
      if ((store.state.currentAreaTerNode.id === undefined) && (store.state.currentAreaTerNode.areaId === undefined)) {
        Notify('请选择左侧树节点', 'info')
        return
      }
      let payLogExtGetIn = {
        FromTime: 0,
        EndTime: 0,
        Mobile: null,
        AreaId: null,
        TerminalAddr: null,
        IsOnlyEx: true
      }
      if (store.state.currentAreaTerNode.isTer) {
        payLogExtGetIn.AreaId = -1
        payLogExtGetIn.TerminalAddr = store.state.currentAreaTerNode.addr
      } else {
        payLogExtGetIn.AreaId = store.state.currentAreaTerNode.id
        payLogExtGetIn.TerminalAddr = -1
      }
      payLogExtGetIn.FromTime = Date.parse(this.dateFrom) / 1000
      payLogExtGetIn.EndTime = (Date.parse(this.dateEnd) + 86400000) / 1000 - 1
      let createProto = this.protopayLogExtGetIn.create(payLogExtGetIn)
      let encodeData = this.protopayLogExtGetIn.encode(createProto).finish()
      let initialData = spliceData(encodeData.length, Config.WsCmd.payLogExtGet, encodeData)
      sendSock(initialData, Config.WsCmd.payLogExtGet, serverData => {
        const aMsg = this.protopayLogExtGetOut.decode(serverData.data)
        if (serverData.flag === 1) {
          this.meters = []
          for (let i = 0; i < aMsg.Vec.length; i++) {
            this.meters.push({
              Addr: aMsg.Vec[i].MeterAddr.toString(16),
              UserName: aMsg.Vec[i].UserName,
              PrePayType: Config.getPrePayTypeValue(aMsg.Vec[i].PayType),
              PayTime: (new Date(aMsg.Vec[i].PayTime * 1000)).Format('yyyy-MM-dd HH:mm:ss'),
              PayWay: Config.getPayWayValue(aMsg.Vec[i].PayWay),
              Fee: (parseInt(aMsg.Vec[i].Fee) / 100).toFixed(2),
              Cause: Config.getPayCauseValue(aMsg.Vec[i].Cause),
              UserType: aMsg.Vec[i].UserType,
              TradeNo: aMsg.Vec[i].TradeNo,
              Receiver: aMsg.Vec[i].Receiver,
              ActRet: aMsg.Vec[i].ActRet,
              ActTime: (new Date(aMsg.Vec[i].ActTime * 1000)).Format('yyyy-MM-dd HH:mm:ss'),
              Mobile: aMsg.Vec[i].Mobile,
              VirAddr: aMsg.Vec[i].VirAddr
            })
          }
          this.origin = Config.deepClone(this.meters)
          this.meters = this.origin.slice(0, this.pageSize)
        } else {
          Notify(getFlagError(serverData.flag), 'error')
        }
      })
    },
    charge () {
      if (this.currentMeter === null) {
        Notify('请选择一块表计', 'info')
        return
      }
      let prePayType = Config.getPrePayTypeId(this.currentMeter.PrePayType)
      if (prePayType === 0) { // 非预付费
        Notify('非预付费用户无法充值', 'info')
        return
      }

      let payExRetryIn = {
        PayTime: 0,
        VirAddr: 0,
        Val: 0,
        PayType: 0
      }

      payExRetryIn.PayTime = Date.parse(new Date(this.currentMeter.PayTime))
      payExRetryIn.VirAddr = this.currentMeter.VirAddr
      payExRetryIn.PayType = this.currentMeter.PayType

      if (prePayType === 1) {
        payExRetryIn.Val = this.currentMeter.Fee * 100
      } else {
        let price = store.getters.getFeePriceByUserType(this.currentMeter.UserType)
        if (price < 0) {
          Notify('请先设置此类用户电价', 'info')
          return
        }
        payExRetryIn.Val = this.currentMeter.Fee * 100 / price
      }

      let createProto = this.protopayExRetryIn.create(payExRetryIn)
      let encodeData = this.protopayExRetryIn.encode(createProto).finish()
      let initialData = spliceData(encodeData.length, Config.WsCmd.payExRetry, encodeData)
      sendSock(initialData, Config.WsCmd.payExRetry, serverData => {
        if (serverData.flag >= 0) {
          let index = this.meters.findIndex(meter => meter.TradeNo === this.currentMeter.TradeNo)
          this.meters.splice(index, 1)
          Notify('充值成功', 'success')
        } else {
          Notify(getChargeFlagError(serverData.flag), 'error')
        }
      })
    },
    payExChanged (exType) {
      let filterData = null
      if (exType === 0) {
        filterData = this.meters.filter((element, index, array) => {
          return exType === 0
        })
      } else if (exType === 1) {
        filterData = this.meters.filter((element, index, array) => {
          return parseInt(element.ActRet) < 0
        })
      } else if (exType === 2) {
        filterData = this.meters.filter((element, index, array) => {
          return parseInt(element.ActRet) > 0
        })
      }
      this.$refs.xTable.loadData(filterData)
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
      data[0].PrePayType = '预付费类型'
      data[0].PayTime = '收费时间'
      data[0].PayWay = '收费方式'
      data[0].Fee = '金额'
      data[0].Cause = '款项'
      data[0].Receiver = '收款员'
      data[0].TradeNo = '交易单号'
      data[0].ActRet = '执行失败次数'
      data[0].ActTime = '最近执行时间'
      delete data[0].VirAddr
      downloadExl(data, '充值异常管理表', 12, this.outFile)
    },
    grouping (value) {
      let groupData = []
      let k = 0
      let PrePayTypes = []
      let PayWays = []
      for (let m = 0; m < Config.PrePayType.length; m++) {
        PrePayTypes.push(Config.PrePayType[m].value)
      }
      for (let m = 0; m < Config.PayWay.length; m++) {
        PayWays.push(Config.PayWay[m].value)
      }
      if (value === '预付费类型') {
        groupData = []
        for (let i = 0; i < PrePayTypes.length; i++) {
          let meterOpr = {}
          meterOpr.TradeNo = k++
          meterOpr.PrePayType = PrePayTypes[i]
          meterOpr.children = []
          groupData.push(meterOpr)
          for (let b = 0; b < this.origin.length; b++) {
            let aValue = PrePayTypes[i]
            if (this.origin[b].PrePayType === aValue) {
              if (!isEmpty(groupData)) {
                for (let j = 0; j < groupData.length; j++) {
                  if (!isEmpty(groupData)) {
                    if (groupData[j].PrePayType === this.origin[b].PrePayType) {
                      // this.origin[b].TradeNo = groupData[j].TradeNo + '-' + this.origin[b].TradeNo
                      groupData[j].children.push(this.origin[b])
                    }
                  }
                }
              }
            }
          }
        }
        getSummaries(groupData, 'PrePayType')
        if (this.$refs.xTable) {
          this.meters = groupData
          this.$refs.xTable.loadData(this.meters)
        }
      }
      if (value === '收费方式') {
        groupData = []
        for (let i = 0; i < PayWays.length; i++) {
          let meterOpr = {}
          meterOpr.TradeNo = k++
          meterOpr.PayWay = PayWays[i]
          meterOpr.children = []
          groupData.push(meterOpr)
          for (let b = 0; b < this.origin.length; b++) {
            let aValue = PayWays[i]
            if (this.origin[b].PayWay === aValue) {
              if (!isEmpty(groupData)) {
                for (let j = 0; j < groupData.length; j++) {
                  if (!isEmpty(groupData)) {
                    if (groupData[j].PayWay === this.origin[b].PayWay) {
                      // this.origin[b].TradeNo = groupData[j].TradeNo + '-' + this.origin[b].TradeNo
                      groupData[j].children.push(this.origin[b])
                    }
                  }
                }
              }
            }
          }
        }
        getSummaries(groupData, 'PayWay')
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
    reset () {
      this.meters = this.origin
      this.visible = false
      this.radio = ''
    },
    filterHandler ({ value, row, column }) {
      let property = column['property']
      return row[property] === value
    }
  }
}
</script>

<style lang='less'>
@import '../../css/payLogEx.less';
</style>
