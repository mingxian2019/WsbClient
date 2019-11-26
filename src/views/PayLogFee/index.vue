<template>
<!-- 缴费查询 -->
  <div class="payLogFee">
    <vxe-toolbar :data="tollInquiryData" setting>
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
        <span>手机号</span>
        <el-input class='mr10' v-model="mobile" type="search" placeholder="请输入手机号" size="small"></el-input>
        <el-button @click="initTable" size="small" icon="el-icon-search">查询</el-button>
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
      :tree-config="{key: 'id', children: 'children', trigger: 'cell'}"
      :radio-config="{labelField: 'Addr'}"
      :data.sync="list"
      :optimization ="{scrollY: {gt: 500, oSize: 10, rSize: 30}}"
      :customs.sync="customColumns">
      <vxe-table-column field="Addr" title="表地址" tree-node  show-overflow>
        <template v-slot="{ row }">
          <span v-html="row.Addr"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="UserName" title="用户表名" show-overflow>
        <template v-slot="{ row }">
          <span v-html="row.UserName"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="PrePayType" title="预付费类型" show-overflow>
        <template v-slot="{ row }">
          <span v-html="row.PrePayType"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="PayTime" title="收费时间" show-overflow>
        <template v-slot="{ row }">
          <span v-html="row.PayTime"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="PayWay" title="收费方式"  show-overflow>
        <template v-slot="{ row }">
          <span v-html="row.PayWay"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="Fee" title="金额" show-overflow>
        <template v-slot="{ row }">
          <span v-html="row.Fee"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="Cause" title="款项" :filters="meterTypeFilters" :filter-method="filterHandler" show-overflow>
        <template v-slot="{ row }">
          <span v-html="row.Cause"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="Receiver" title="收款员" :filters="meterTypeFilters" :filter-method="filterHandler" show-overflow>
        <template v-slot="{ row }">
          <span v-html="row.Receiver"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="ActRet" title="失败次数" :filters="meterTypeFilters" :filter-method="filterHandler" show-overflow>
        <template v-slot="{ row }">
          <span v-html="row.ActRet"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="ActTime" title="最近执行时间" :filters="meterTypeFilters" :filter-method="filterHandler" show-overflow>
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
      <el-button  slot="reference" class="group btn-fun" size="small"  icon="el-icon-document-copy">分组</el-button>
    </el-popover>
    <el-button class="btn-fun btn-export" size="small" @click="downloadFile(origin)" icon="el-icon-upload2">导出</el-button>
  </div>
</template>
<script>

import * as Config from '@/config.js'
import protoRoot from '@/proto/WsMsg.js'
import { spliceData } from '@/utils/send.js'
import { sendSock } from '@/utils/websocket.js'
import { Notify, downloadExl } from '../../utils/commUtil'
import { getFlagError } from '../../error'

export default {
  data () {
    return {
      selectedData: null,
      period: null,
      mobile: null,
      tollInquiryData: [],
      customColumns: [],
      meterTypeFilters: [],
      radio: '',
      origin: [],
      currentPage: 1,
      pageSize: 13,
      meters: [],
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
    list () {
      return this.meters
    }
  },
  mounted () {
    this.outFile = document.getElementById('downlink')
    let date = new Date()
    this.dateFrom = new Date(date.getFullYear(), date.getMonth(), 1)
    this.dateEnd = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    this.outFile = document.getElementById('downlink')
  },
  methods: {
    handleCurrentChange (val) {
      this.selectedData = val
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    initTable () {
      let payLogExtGetIn = {
        FromTime: 0,
        EndTime: 0,
        Mobile: null,
        AreaId: -1,
        TerminalAddr: -1,
        IsOnlyEx: false
      }
      payLogExtGetIn.FromTime = Date.parse(this.dateFrom) / 1000
      payLogExtGetIn.EndTime = (Date.parse(this.dateEnd) + 86400000) / 1000 - 1
      payLogExtGetIn.Mobile = this.mobile
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
              Receiver: aMsg.Vec[i].Receiver,
              ActRet: aMsg.Vec[i].ActRet,
              ActTime: (new Date(aMsg.Vec[i].ActTime * 1000)).Format('yyyy-MM-dd HH:mm:ss')
            })
          }
          this.origin = Config.deepClone(this.meters)
          this.meters = this.origin.slice(0, this.pageSize)
        } else {
          Notify(getFlagError(serverData.flag), 'error')
        }
      })
    },
    handlePageChange (val) {
      const jiequ = this.origin.slice((this.pageSize * (val - 1)), (val * this.pageSize))
      this.tollInquiryData = jiequ
    },
    downloadFile: function (rs) { // 点击导出按钮
      let data = [{}]
      for (let k in rs[0]) {
        data[0][k] = k
      }
      data = data.concat(rs)
      data[0].Addr = '表地址'
      data[0].UserName = '用户表名'
      data[0].PrePayType = '预付费类型'
      data[0].PayTime = '收费时间'
      data[0].PayWayText = '收费方式'
      data[0].Fee = '金额'
      data[0].CauseText = '款项'
      data[0].Receiver = '收款员'
      data[0].ActRet = '失败次数'
      data[0].ActTime = '最近执行时间'

      // delete data[0].PayWay
      // delete data[0].Cause

      downloadExl(data, '缴费查询表', 10, this.outFile)
    },
    grouping (value) {
      let groupData = []
      let k = 0
      let PrePayTypes = []
      // let PayWays = []
      for (let m = 0; m < Config.PrePayType.length; m++) {
        PrePayTypes.push(Config.PrePayType[m].value)
      }
      // for (let m = 0; m < Config.PayWay.length; m++) {
      //   PayWays.push(Config.PayWay[m].value)
      // }
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
      // if (value === '款项') {
      //   groupData = []
      //   for (let i = 0; i < PayWays.length; i++) {
      //     let meterOpr = {}
      //     meterOpr.TradeNo = k++
      //     meterOpr.PayWay = PayWays[i]
      //     meterOpr.children = []
      //     groupData.push(meterOpr)
      //     for (let b = 0; b < this.origin.length; b++) {
      //       let aValue = PayWays[i]
      //       if (this.origin[b].PayWay === aValue) {
      //         if (!isEmpty(groupData)) {
      //           for (let j = 0; j < groupData.length; j++) {
      //             if (!isEmpty(groupData)) {
      //               if (groupData[j].PayWay === this.origin[b].PayWay) {
      //                 // this.origin[b].TradeNo = groupData[j].TradeNo + '-' + this.origin[b].TradeNo
      //                 groupData[j].children.push(this.origin[b])
      //               }
      //             }
      //           }
      //         }
      //       }
      //     }
      //   }
      //   getSummaries(groupData, 'PayWay')
      //     if (this.$refs.xTable) {
      //       this.meters = groupData
      //       this.$refs.xTable.loadData(this.meters)
      //     }
      // }
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
      this.tollInquiryData = this.origin
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
@import '../../css/payLogFee.less';
</style>
