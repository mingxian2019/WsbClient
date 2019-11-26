<template>
  <div class='cost hw100'>
    <vxe-toolbar :data="costData" setting>
      <template v-slot:buttons>
        <el-button size="small" @click='lastMonth()'>上月</el-button>
        <el-button size="small" @click='thisMonth()'>本月</el-button>
        <el-date-picker
          v-model="period"
          type="datetimerange"
          size="small"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format = 'yyyy-MM-dd'
          align="right"
          ref="periodEl">
        </el-date-picker>
        <el-button size="small" icon="el-icon-search" @click="getFeeLog">查询</el-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      ref="xTable"
      border
      highlight-hover-row
      highlight-current-row
      resizable
      @cell-click='handleCurrentChange'
      :tree-config="{key: 'id', children: 'children', trigger: 'cell', expandAll: !!searchText}"
      :radio-config="{labelField: 'Mobile'}"
      :data.sync="list"
      :customs.sync="customColumns">
      <vxe-table-column field="FeeTime" title="交易时间" sortable tree-node>
        <template v-slot="{ row }">
          <span v-html="row.FeeTime"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="FeeItem" title="款项">
        <template v-slot="{ row }">
          <span v-html="row.FeeItem"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="Account" title="入账" sortable tree-node>
        <template v-slot="{ row }">
          <span v-html="row.Account"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="Expenditure" title="支出" sortable tree-node>
        <template v-slot="{ row }">
          <span v-html="row.Expenditure"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="LeftFee" title="可用余额" sortable tree-node>
        <template v-slot="{ row }">
          <span v-html="row.LeftFee"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="PayWay" title="支付方式">
        <template v-slot="{ row }">
          <span v-html="row.PayWay"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="TradeNo" title="交易单号" sortable tree-node>
        <template v-slot="{ row }">
          <span v-html="row.TradeNo"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="Receiver" title="收款人" sortable tree-node>
        <template v-slot="{ row }">
          <span v-html="row.Receiver"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="Memo" title="备忘录">
        <template v-slot="{ row }">
          <span v-html="row.Memo"></span>
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
    
    <el-popover
      placement="bottom"
      trigger="click"
      v-model="visible">
      <template>
        <el-radio-group v-model="radio">
          <el-radio label="收款人">收款人</el-radio>
          <el-radio label="入账">入账</el-radio>
          <el-radio label="支出">支出</el-radio>
        </el-radio-group>

        <div class="tBtns">
          <el-button size="mini" type="text" @click="reset">重置</el-button>
          <el-button type="text" size="mini" @click='grouping(radio)'>确定</el-button>
        </div>
      </template>
        <el-button  slot="reference" class="btn-fun"  size="small"  icon="el-icon-document-copy">分组</el-button>
    </el-popover>
    <el-button  class="btn-fun uploadFile" @click="exportCsvEvent" size="small"  icon="el-icon-upload2">导出</el-button>
  </div>
</template>

<script>
// import store from '@/store/store'
import protoRoot from '@/proto/WsMsg.js'
import XEUtils from 'xe-utils'
import { spliceData } from '@/utils/send.js'
import { sendSock } from '@/utils/websocket.js'
import { sortArr } from '../../utils/commUtil'

export default {
  data () {
    return {
      origin: [],
      costData: [],
      customColumns: [],
      currentPage: 1,
      pageSize: 13,
      searchText: '',
      visible: false,
      radio: '',
      period: [],
      sysFeeLogGetIn: protoRoot.lookup('WsMsg.SysFeeLogGetIn'),
      sysFeeLogGetOut: protoRoot.lookup('WsMsg.SysFeeLogGetOut')
    }
  },
  computed: {
    list () {
      let filterName = XEUtils.toString(this.searchText).trim().toLowerCase()
      if (filterName) {
        let filterRE = new RegExp(filterName, 'gi')
        let options = { children: 'children' }
        let searchProps = ['FeeTime', 'FeeItem', 'Account', 'Expenditurev', 'PayWay', 'LeftFee', 'TradeNo', 'Autditor', 'Receiver', 'Memo']
        let rest = XEUtils.searchTree(this.costData, item => searchProps.some(key => XEUtils.toString(item[key]).toLowerCase().indexOf(filterName) > -1), options)
        XEUtils.eachTree(rest, item => {
          searchProps.forEach(key => {
            item[key] = XEUtils.toString(item[key]).replace(filterRE, match => `<span class="keyword-lighten">${match}</span>`)
          })
        }, options)
        return rest
      }
      return this.costData
    }
  },
  methods: {
    getFeeLog () {
      let fromTime = new Date(this.period[0]).Format('yyyy-MM-dd')
      let endTime = new Date(this.period[1]).Format('yyyy-MM-dd')

      let feeLogGetIn = {
        FromTime: fromTime,
        EndTime: endTime
      }
      let createProto = this.sysFeeLogGetIn.create(feeLogGetIn)
      let encodeData = this.sysFeeLogGetIn.encode(createProto).finish()
      let initialData = spliceData(encodeData.length, 110, encodeData)
      sendSock(initialData, 110, (serverData) => {
        const MESBODY = this.sysFeeLogGetOut.decode(serverData.data)

        if (serverData.flag >= 0) {
          console.log(MESBODY.Vec)
          this.costData = MESBODY.Vec
        } else {
          this.$notify.error({
            title: '提示',
            message: '服务器繁忙！ 请稍后重试',
            position: 'bottom-right'
          })
        }
      })
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handlePageChange (val) {
      const jiequ = this.origin.slice((this.pageSize * (val - 1)), (val * this.pageSize))
      this.costData = jiequ
    },
    handleCurrentChange (row) {
      this.selectedData = row.row
    },
    reset () {
      this.costData = this.origin
      this.visible = false
      this.radio = ''
    },
    grouping (value) {
      let groupData = []
      let k = 0
      if (value === '收款人') {
        let receivers = sortArr(this.origin, 'Receiver')
        groupData = []
        for (let i = 0; i < receivers.length; i++) {
          let meterOpr = {}
          meterOpr.Addr = k++
          meterOpr.Receiver = receivers[i].Receiver
          meterOpr.children = []
          groupData.push(meterOpr)
          for (let b = 0; b < this.origin.length; b++) {
            let aValue = receivers[i].Receiver
            if (this.origin[b].Receiver === aValue) {
              if (!isEmpty(groupData)) {
                for (let j = 0; j < groupData.length; j++) {
                  if (!isEmpty(groupData)) {
                    if (groupData[j].Receiver === this.origin[b].Receiver) {
                      // this.origin[b].id = groupData[j].id + '-' + this.origin[b].id
                      groupData[j].children.push(this.origin[b])
                    }
                  }
                }
              }
            }
          }
        }
        getSummaries(groupData, 'Receiver')
        if (this.$refs.xTable) {
          this.meterData = groupData
          this.$refs.xTable.loadData(this.meterData)
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
    lastMonth () {
      const date = new Date()
      const day = new Date(date.getFullYear(), date.getMonth(), 0).getDate()
      const end = new Date(new Date().getFullYear(), new Date().getMonth() - 1, day)
      const start = new Date(new Date().getFullYear(), new Date().getMonth() - 1)
      this.period[0] = start
      this.period[1] = end
      this.$set(this.period, 0, this.period[0])
      this.$set(this.period, 1, this.period[1])
    },
    thisMonth () {
      const end = new Date()
      const start = new Date()
      start.setDate(1)
      this.period[0] = start
      this.period[1] = end
      this.$set(this.period, 0, this.period[0])
      this.$set(this.period, 1, this.period[1])
    },
    exportCsvEvent () {
      this.$refs.xTable.exportCsv({
        filename: '收支明细表',
        data: this.origin
      })
    }
  }
}
</script>

<style lang='less' type='text/css'>
@import '../../css/cost.less';
</style>
