<template>
<!-- 收费查询 -->
  <div class="payLogUsr  hw100">

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
        <el-button class='mr10' size="small" icon="el-icon-search">查询</el-button>
        <el-input  class='input-inquire mr10'  v-model="searchText" type="search" placeholder="请输入收款人" size="small"></el-input>
        <span class='mr10'>收费方式</span>
        <el-select class='mr10' v-model="payWayId" placeholder="请选择" @change="targetChanged" size='small'>
          <el-option
            v-for="item in payWay"
            :key="item.id"
            :label="item.value"
            :value="item.id">
          </el-option>
        </el-select>
        <span class='mr10'>收费事由</span>
        <el-select class='mr10' v-model="payCauseId" placeholder="请选择" @change="targetChanged"  size='small'>
          <el-option
            v-for="item in payCause"
            :key="item.id"
            :label="item.value"
            :value="item.id">
          </el-option>
        </el-select>

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
      :data="meters"
      :optimization ="{scrollY: {gt: 500, oSize: 10, rSize: 30}}"
      :customs.sync="customColumns">
      <vxe-table-column field="Addr" title="表地址" width="180" fixed="left" tree-node  show-overflow>
        <template v-slot="{ row }">
          <span v-html="row.Addr"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="TradeNo" title="交易单号"  width="190" :filters="meterTypeFilters" :filter-method="filterHandler" show-overflow>
        <template v-slot="{ row }">
          <span v-html="row.TradeNo"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="CauseText" title="款项"  width="100" :filters="meterTypeFilters" :filter-method="filterHandler" show-overflow>
        <template v-slot="{ row }">
          <span v-html="row.CauseText"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="UserName" title="用户表名"  width="150" show-overflow>
        <template v-slot="{ row }">
          <span v-html="row.UserName"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="Mobile" title="手机号" width="130" show-overflow>
        <template v-slot="{ row }">
          <span v-html="row.Mobile"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="PrePayType" title="预付费类型"  width="150" show-overflow>
        <template v-slot="{ row }">
          <span v-html="row.PrePayType"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="PayTime" title="收费时间" width="160" show-overflow>
        <template v-slot="{ row }">
          <span v-html="row.PayTime"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="PayWayText" title="收费方式" width="90" show-overflow>
        <template v-slot="{ row }">
          <span v-html="row.PayWayText"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="Fee" title="金额" width="150" show-overflow>
        <template v-slot="{ row }">
          <span v-html="row.Fee"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="Receiver" title="收款员"  width="150" :filters="meterTypeFilters" :filter-method="filterHandler" show-overflow>
        <template v-slot="{ row }">
          <span v-html="row.Receiver"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="Auditor" title="审核员"  width="100" :filters="meterTypeFilters" :filter-method="filterHandler" show-overflow>
        <template v-slot="{ row }">
          <span v-html="row.Auditor"></span>
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
          <el-radio label="预付费类型">预付费类型</el-radio>
          <el-radio label="款项">款项</el-radio>
        </el-radio-group>

        <div class="tBtns">
          <el-button size="mini" type="text" @click="reset">重置</el-button>
          <el-button type="text" size="mini" @click='grouping(radio)'>确定</el-button>
        </div>
      </template>
      <el-button slot="reference" class='group btn-fun' size="small"  icon="el-icon-document-copy">分组</el-button>
    </el-popover>
    <el-button class="btn-fun uploadFile"   @click="downloadFile(origin)" size="small"  icon="el-icon-upload2">导出</el-button>
  </div>
</template>

<script>
import * as Config from '@/config.js'
import store from '@/store/store'
import protoRoot from '@/proto/WsMsg.js'
import { spliceData } from '@/utils/send.js'
import { sendSock } from '@/utils/websocket.js'
import { Notify, downloadExl } from '../../utils/commUtil'
import { getFlagError } from '../../error'

export default {
  data () {
    return {
      meters: [],
      period: '',
      payee: '',
      payWay: JSON.parse(JSON.stringify(Config.PayWay)),
      payWayId: 0,
      receiptModeT: '',
      options: [],
      payCause: JSON.parse(JSON.stringify(Config.PayCause)),
      payCauseId: 0,
      currentPage3: 1,
      currentMeter: null,
      customColumns: [],
      meterTypeFilters: [],
      radio: '',
      origin: [],
      currentPage: 1,
      pageSize: 13,
      loading: false,
      visible: false,
      searchText: '',
      dateFrom: null,
      dateEnd: null,
      protopayLogExtGetIn: protoRoot.lookup('WsMsg.PayLogExtGetIn'),
      protopayLogExtGetOut: protoRoot.lookup('WsMsg.PayLogExtGetOut')
    }
  },
  computed: {
    // list () {
    //   return this.meters
    // },
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

    this.payWay.unshift({ id: 0, value: '全部' })
    this.payCause.unshift({ id: 0, value: '全部' })
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
      let payLogExtGetIn = {
        FromTime: 0,
        EndTime: 0,
        Mobile: -1,
        AreaId: 0,
        TerminalAddr: -1,
        IsOnlyEx: false
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
              PayWayText: Config.getPayWayValue(aMsg.Vec[i].PayWay),
              Fee: (parseInt(aMsg.Vec[i].Fee) / 100).toFixed(2),
              CauseText: Config.getPayCauseValue(aMsg.Vec[i].Cause),
              Receiver: aMsg.Vec[i].Receiver,
              Auditor: aMsg.Vec[i].Auditor,
              TradeNo: aMsg.Vec[i].TradeNo,
              Mobile: aMsg.Vec[i].Mobile,
              // 隐藏的数据项
              PayWay: aMsg.Vec[i].PayWay,
              Cause: aMsg.Vec[i].Cause
            })
          }
          this.origin = Config.deepClone(this.meters)
          this.meters = this.origin.slice(0, this.pageSize)
        } else {
          Notify(getFlagError(serverData.flag), 'error')
        }
      })
    },
    targetChanged () {
      let filterData = null
      if (this.payWayId === 0) {
        filterData = this.meters
      } else {
        filterData = this.meters.filter((element, index, array) => {
          return this.payWayId === element.PayWay
        })
      }

      if (this.payCauseId !== 0) {
        filterData = filterData.filter((element, index, array) => {
          return this.payCauseId === element.Cause
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
      data[0].UserName = '用户表名'
      data[0].Mobile = '手机号'
      data[0].PrePayType = '预付费类型'
      data[0].PayTime = '收费时间'
      data[0].PayWayText = '收费方式'
      data[0].Fee = '金额'
      data[0].CauseText = '款项'
      data[0].Receiver = '收款员'
      data[0].Auditor = '审核员'
      data[0].TradeNo = '交易单号'
      delete data[0].PayWay
      delete data[0].Cause

      downloadExl(data, '收费查询表', 11, this.outFile)
    },
    grouping (value) {
      let groupData = []
      let k = 0
      let PrePayTypes = []
      let PayCauses = []
      for (let m = 0; m < Config.PrePayType.length; m++) {
        PrePayTypes.push(Config.PrePayType[m].value)
      }
      for (let m = 0; m < Config.PayCause.length; m++) {
        PayCauses.push(Config.PayCause[m].value)
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
      if (value === '款项') {
        groupData = []
        for (let i = 0; i < PayCauses.length; i++) {
          let meterOpr = {}
          meterOpr.TradeNo = k++
          meterOpr.CauseText = PayCauses[i]
          meterOpr.children = []
          groupData.push(meterOpr)
          for (let b = 0; b < this.origin.length; b++) {
            let aValue = PayCauses[i]
            if (this.origin[b].CauseText === aValue) {
              if (!isEmpty(groupData)) {
                for (let j = 0; j < groupData.length; j++) {
                  if (!isEmpty(groupData)) {
                    if (groupData[j].CauseText === this.origin[b].CauseText) {
                      // this.origin[b].TradeNo = groupData[j].TradeNo + '-' + this.origin[b].TradeNo
                      groupData[j].children.push(this.origin[b])
                    }
                  }
                }
              }
            }
          }
        }
        getSummaries(groupData, 'CauseText')
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
@import '../../css/payLogUsr.less';
</style>
