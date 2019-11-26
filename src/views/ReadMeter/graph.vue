<template>
  <!-- <Modal v-model="formVisible" scrollable title="单表能耗曲线图" width="580" class="graph-form" @on-ok="determine"> -->
  <el-dialog
    class="graph-form"
    title="单表能耗曲线图"
    :visible.sync="formVisible"
    @opened="graph"
    :close-on-click-modal='false'
    :before-close="handleClose">
    <span>表名</span>
    <el-input  v-model="meterName" disabled size='small'></el-input>
    <span>表号</span>
    <el-input  v-model="meterNo" disabled size='small'></el-input>
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
    <el-button icon="el-icon-search" size="small" @click="getCurveData">查询</el-button><br/>
    <span class="site">安装位置：</span><span>{{ site }}</span>
    <div id="graph"></div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="formVisible = false" size='small'>取 消</el-button>
      <el-button type="primary"  @click="formVisible = false" size='small'>确 定</el-button>
    </span>
  </el-dialog>
  <!-- </Modal> -->
</template>

<script>
import * as echarts from 'echarts' // 引入 echarts
import { Notify } from '../../utils/commUtil'
import protoRoot from '@/proto/WsMsg.js'
import { spliceData } from '@/utils/send.js'
import { sendSock } from '@/utils/websocket.js'
import { getFlagError, } from '@/pro/pro3761.js'
import * as Config from '@/config.js'
import store from '@/store/store'

export default {
  data () {
    return {
      dateFrom: '',
      dateEnd: '',
      meterName: '',
      meterNo: '',
      site: '',
      value2: '',
      formVisible: false,
      protoMeterValCurveIn: protoRoot.lookup('WsMsg.MeterValCurveIn'),
      protoMeterValCurveOut: protoRoot.lookup('WsMsg.MeterValCurveOut'),
      xAxisData: {},
      seriesData: {},
      chart: null
    }
  },
  props: ['currentMeter'],
  methods: {
    show () {
      if (this.currentMeter === null) {
        Notify('请选择一块表计', 'info')
        return
      }
      let date = new Date()
      this.dateFrom = new Date(date.getFullYear(), date.getMonth(), 1)
      this.dateEnd = new Date(date.getFullYear(), date.getMonth(), date.getDate())
      this.meterName = this.currentMeter.UserName
      this.meterNo = this.currentMeter.UserNo
      this.site = this.currentMeter.Site
      this.formVisible = true
    },
    handleClose () {
      this.formVisible = false
    },
    graph () {
      this.chart = echarts.init(document.getElementById('graph'))
    },
    getCurveData () {
      if (this.getCurveCount() < 0) return
      let meterValCurveIn = {
        VirAddr: this.currentMeter.VirAddr,
        ValType: 1,
        FromTime: 0,
        Interval: 0,
        Count: this.getCurveCount(),
        Day: 1
      }

      meterValCurveIn.FromTime = Date.parse(this.dateFrom) / 1000
      let createProto = this.protoMeterValCurveIn.create(meterValCurveIn)
      let encodeData = this.protoMeterValCurveIn.encode(createProto).finish()
      let initialData = spliceData(encodeData.length, Config.WsCmd.meterValCurveGet, encodeData)
      sendSock(initialData, Config.WsCmd.meterValCurveGet, serverData => {
        if (serverData.flag === 1) {
          const aMsg = this.protoMeterValCurveOut.decode(serverData.data)
          this.seriesData.length = 0
          for (let i = 0; i < aMsg.Vec.length; i++) {
            let index = this.xAxisData.data.indexOf(aMsg.Vec[i].Time)
            if (index > 0) {
              this.seriesData.data[index] = (parseInt(aMsg.Vec[i].Val0.toString(16)) / 100.00).toFixed(2)
            }
          }

          for (let j = 0; j < this.xAxisData.data.length; j++) {
            let date = new Date(this.xAxisData.data[j] * 1000)
            this.xAxisData.data[j] = date.getDate()
          }
          this.chart.setOption({xAxis: this.xAxisData, yAxis: { type: 'value' },series: this.seriesData })
        } else {
          Notify(getFlagError(serverData.flag), 'error')
        }
      })
    },
    getCurveCount () {
      if (this.dateEnd < this.dateFrom) {
        Notify('起始时间应当大于结束时间', 'info')
        return -1
      }

      let count = 0
      if (this.dateFrom.getMonth() === this.dateEnd.getMonth()) {
        count = this.dateEnd.getDate() - this.dateFrom.getDate()
      } else {
        let dateTmp = new Date()
        dateTmp.setMonth(dateTmp.getMonth() + 1)
        dateTmp.setDate(0)
        count =  dateTmp.getDate() - this.dateFrom.getDate() + 1 + this.dateEnd.getDate()
      }

      if (count > 31) {
        Notify('时间跨度太大，最大只能查询31天的数据', 'info')
        return -1
      }

      // 准备 X 轴数据
      this.xAxisData.type = 'category'
      this.seriesData.type = 'line'
      this.xAxisData.data = []
      this.seriesData.data = []
      for (let i = 0; i <= count; i++) {
        let date = new Date(this.dateFrom)
        date.setDate(date.getDate() + i)
        this.xAxisData.data[i] = parseInt(date.getTime() / 1000)
        // 初始化数据为 0
        this.seriesData.data[i] = 0
      }
      return count
    }
  }
}
</script>

<style lang='less' type='text/css'>
@import '../../css/tool.less';
@graph--w: 933px;
  .graph-form{
      .el-dialog__body{
        padding: 25px 25px 0 25px!important;
      }
    span{
      font-size: 13px;
    }
    .el-input {
      width: 120px;
      margin: 0 10px 0 10px;
    }
    .site{
      margin-top: 15px;
      display: inline-block;
    }
    .el-date-editor{
      width: 143px;
      margin: 0 10px 0 10px;
      .el-range-separator{
        width:10%
      }
    }
    #graph{
      height: 300px;
      width: 100%;
    }
    .setEl-dialog(@graph--w)
  }
</style>
