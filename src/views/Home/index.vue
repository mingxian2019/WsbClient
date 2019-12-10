<template>
  <div class="home hw100">
    <!-- 广告及软件特点 -->
    <!-- <div class="home-banner">
      <i class="fas fa-bullhorn home-banner-icon"></i>
      <span class='home-banner-text'>无需任何软件安装，无需任何硬件服务器，无需专网或公网固定IP租办申请和年费，注册后立即自动分配IP端口和新建数据库，半分钟内就能正常抄表收费</span>
    </div> -->
    <!-- 饼图数据统计 -->
    <div class='pie home-price'>
      <div class='home-price-item'>
        <div class="home-price-item-echarts-box">
        <span class='home-price-item-title'>表计数统计</span>
        <span class='pie-label'>{{ total }}</span>
        <div class='home-price-item-echarts' id='allMeter'>
        </div>
        </div>
        <div class='home-price-item-text'>
          <i class='home-price-item-text-icon meter-eCont'></i><span>电表总数:</span><span>{{ meterCountData.eCount }}</span>
          <i class='home-price-item-text-icon meter-wCont'></i><span>水表总数:</span><span>{{ meterCountData.wCount }}</span>
        </div>
      </div>
      <div class='home-price-item'>
        <div class="home-price-item-echarts-box">
        <span class='home-price-item-title'>抄到率统计</span>
        <span class='pie-label'>{{ readRate }}</span>
        <div class='home-price-item-echarts' id='readTo'></div>
        </div>
        <div class='home-price-item-text'>
          <i class='home-price-item-text-icon readTo-readCount'></i><span>抄到数: </span><span>{{readRateData.readCount}}</span>
          <i class='home-price-item-text-icon readTo-unReadCount'></i><span>漏抄数: </span><span>{{readRateData.unReadCount}}</span>
        </div>
      </div>
      <div class='home-price-item'>
        <div class="home-price-item-echarts-box">
        <span class='home-price-item-title'>在线率统计</span>
        <span class='pie-label'>{{ onlineRate }}</span>
        <div class='home-price-item-echarts' id='online'></div>
        </div>
        <div class='home-price-item-text'>
          <i class='home-price-item-text-icon online-online'></i><span>在线数: </span><span>{{onlineCountData.online}}</span>
          <i class='home-price-item-text-icon online-offline'></i><span>离线数: </span><span>{{onlineCountData.offline}}</span>
        </div>
      </div>
    </div>

    <!-- 条形图数据统计 -->
    <div class='line home-price'>
      <div class='home-price-item'>
        <span class='home-price-item-title'>用电曲线</span>
        <div class='home-price-item-btns'>
          <el-radio-group v-model="elineRadio" @change='elineRadioChange'>
            <el-radio label="day">日</el-radio>
            <el-radio label="month">月</el-radio>
          </el-radio-group>
          <el-checkbox-group v-model="elineCheckbox" @change='elineCheckChange'>
            <el-checkbox label="环比"  :disabled="isEM2Menabled" ></el-checkbox>
            <el-checkbox label="同比"></el-checkbox>
          </el-checkbox-group>
        </div>
        <div class='line-tips' v-show='getshowElectricityTips'>暂无数据</div>
        <div class='home-price-item-echarts' id='electricity'  v-show='!getshowElectricityTips'></div>
      </div>
      <div class='home-price-item'>
        <span class='home-price-item-title'>用水曲线</span>
          <div class='home-price-item-btns'>
          <el-radio-group v-model="wlineRadio" @change='wlineRadioChange'>
            <el-radio label="day">日</el-radio>
            <el-radio label="month">月</el-radio>
          </el-radio-group>
          <el-checkbox-group v-model="wlineCheckbox" @change='wlineCheckChange'>
            <el-checkbox label="环比" :disabled="isWM2Menabled" :checked="isWM2Menabled"></el-checkbox>
            <el-checkbox label="同比"></el-checkbox>
          </el-checkbox-group>
        </div>
        <div class='line-tips' v-show='getshowWaterTips'>暂无数据</div>
        <div class='home-price-item-echarts' id='water' v-show = '!getshowWaterTips'></div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts' // 引入 echarts
import protoRoot from '@/proto/WsMsg.js'
import { spliceData } from '@/utils/send.js'
import { sendSock } from '@/utils/websocket.js'
// import { setToken } from '@/utils/auth.js'
import * as Config from '@/config.js'
// import { Base64 } from 'js-base64'
// import { regionData } from 'element-china-area-data'
import store from '@/store/store'
import { getFlagError } from '../../error'
import { Notify } from '../../utils/commUtil'

export default {
  data () {
    return {
      total: 0,
      readRate: '100%',
      onlineRate: '100%',
      meterCountData: {
        eCount: 0,
        wCount: 0
      },
      elineRadio: '',
      wlineRadio: '',
      elineCheckbox: [],
      wlineCheckbox: [],
      readRateData: {
        readCount: 0,
        unReadCount: 0
      },
      onlineCountData: {
        online: 0,
        offline: 0
      },
      allmeterOption: {
        series: [
          {
            name: '所有表计',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            hoverAnimation: false,
            // calculable : true,
            label: {
              show: false,
              normal: {
                show: false,
                position: 'center',
                formatter: '',
                textStyle: {
                  fontSize: '16'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {
                value: 0,
                name: '电表总数',
                itemStyle: {
                  normal: { color: '#50d4c9' },
                  emphasis: { color: '#50d4c9' }
                },
                label: {
                  show: true,
                  fontSize: '16'
                }
              },
              {
                value: 0,
                name: '水表总数',
                itemStyle: {
                  normal: { color: '#f7d96a' },
                  emphasis: { color: '#f7d96a' }
                }
              }
            ]
          }]
      },
      readToOption: {
        series: [
          {
            name: '所有表计',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            hoverAnimation: false,
            // calculable : true,
            label: {
              show: false,
              normal: {
                show: false,
                position: 'center',
                formatter: '',
                textStyle: {
                  fontSize: '16'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {
                value: 0,
                name: '抄到数',
                itemStyle: {
                  normal: { color: '#f58960' },
                  emphasis: { color: '#f58960' }
                },
                label: {
                  show: true,
                  fontSize: '16'
                }
              },
              {
                value: 0,
                name: '失败数',
                itemStyle: {
                  normal: { color: '#c5c7cb' },
                  emphasis: { color: '#c5c7cb' }
                }
              }
            ]
          }
        ]
      },
      onlineOption: {
        series: [
          {
            name: '所有表计',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            hoverAnimation: false,
            // calculable : true,
            label: {
              show: false,
              normal: {
                show: false,
                position: 'center',
                formatter: '',
                textStyle: {
                  fontSize: '16'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {
                value: 0,
                name: '抄到数',
                itemStyle: {
                  normal: { color: '#30a1e1' },
                  emphasis: { color: '#30a1e1' }
                },
                label: {
                  show: true,
                  fontSize: '16'
                }
              },
              {
                value: 0,
                name: '失败数',
                itemStyle: {
                  normal: { color: '#c5c7cb' },
                  emphasis: { color: '#c5c7cb' }
                }
              }
            ]
          }
        ]
      },
      electricityOption: {
        tooltip: {
          trigger: 'axis'
        },
        // legend: {
        //   data: ['日', '月', '环比', '同比'],
        //   selected: { '月': false, '环比': false, '同比': false }
        // },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },

        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: []
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '日',
            type: 'line',
            stack: '总量1',
            data: []
          },
          {
            name: '月',
            type: 'line',
            stack: '总量2',
            data: []
          },
          {
            name: '环比',
            type: 'line',
            stack: '总量3',
            data: []
          },
          {
            name: '同比',
            type: 'line',
            stack: '总量4',
            data: []
          }
        ]
      },
      waterOption: {
        tooltip: {
          trigger: 'axis'
        },
        // legend: {
        //   data: ['日', '月', '环比', '同比'],
        //   selected: { '月': false, '环比': false, '同比': false }
        // },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },

        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: []
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '日',
            type: 'line',
            stack: '总量',
            data: []
          },
          {
            name: '月',
            type: 'line',
            stack: '总量',
            data: []
          },
          {
            name: '环比',
            type: 'line',
            stack: '总量',
            data: []
          },
          {
            name: '同比',
            type: 'line',
            stack: '总量',
            data: []
          }
        ]
      },
      protoGeneralStatIn: protoRoot.lookup('WsMsg.AreaDelIn'),
      protoGeneralStatOut: protoRoot.lookup('WsMsg.GeneralStatOut'),
      protoAreaConsumeCurveIn: protoRoot.lookup('WsMsg.AreaConsumeCurveIn'),
      protoAreaConsumeCurveOut: protoRoot.lookup('WsMsg.MeterValCurveOut'),
      electricityDOM: null,
      waterDOM: null,
      isEM2Menabled: false,
      isWM2Menabled: false
    }
  },
  computed: {
    getAreaTerSelected () {
      return store.state.currentAreaTerNode
    },
    getshowElectricityTips: {
      get () {
        if (this.electricityOption.xAxis.data.length) {
          return false
        } else {
          return true
        }
      }

    },
    getshowWaterTips: {
      get () {
        if (this.waterOption.xAxis.data.length) {
          return false
        } else {
          return true
        }
      }
    }
  },
  watch: {
    getAreaTerSelected () {
      this.initPieChart()
      this.clearCurve()
    },
    allmeterOption: {
      handler (newVal, oldVal) {
        this.allmeter(newVal)
      },
      deep: true
    },
    readToOption: {
      handler (newVal, oldVal) {
        this.readTo(newVal)
      },
      deep: true
    },
    onlineOption: {
      handler (newVal, oldVal) {
        this.online(newVal)
      },
      deep: true
    }
    // electricityOption: {
    //   handler (newVal, oldVal) {
    //     console.log(newVal)
    //     // console.log(oldVal)
    //     this.electricityDOM.setOption(newVal)
    //   },
    //   deep: true
    // }
  },
  mounted () {
    this.allmeter(this.allmeterOption)
    this.readTo(this.readToOption)
    this.online(this.onlineOption)
    this.electricityDOM = echarts.init(document.getElementById('electricity'))
    this.waterDOM = echarts.init(document.getElementById('water'))
    window.onresize = () => {
      return (() => {
      let myChart1 = echarts.getInstanceByDom(document.getElementById('allMeter'));
      let myChart2 = echarts.getInstanceByDom(document.getElementById('readTo'));
      let myChart3 = echarts.getInstanceByDom(document.getElementById('online'));
      myChart1.resize();
      myChart2.resize();
      myChart3.resize();
      })()
    }
  },
  created () {
    this.initPieChart()
    // this.allmeterOption.series[0].label.normal.formatter = `${this.getTotal}`
  },
  methods: {
    initPieChart () {
      if ((store.state.currentAreaTerNode.id === undefined) && (store.state.currentAreaTerNode.areaId === undefined)) return
      let generalStatIn = {}
      generalStatIn.Id = store.state.currentAreaTerNode.isTer ? store.state.currentAreaTerNode.areaId : store.state.currentAreaTerNode.id
      let createProto = this.protoGeneralStatIn.create(generalStatIn)
      let encodeData = this.protoGeneralStatIn.encode(createProto).finish()
      let initialData = spliceData(encodeData.length, Config.WsCmd.generalStat, encodeData)
      sendSock(initialData, Config.WsCmd.generalStat, serverData => {
        const aMsg = this.protoGeneralStatOut.decode(serverData.data)
        // console.log(aMsg)
        if (serverData.flag === 1) {
          this.meterCountData.eCount = aMsg.EnergyMeterCount
          this.meterCountData.wCount = aMsg.WaterMeterCount
          this.total = aMsg.EnergyMeterCount + aMsg.WaterMeterCount
          this.readRateData.readCount = aMsg.EMeterReadCount + aMsg.WMeterReadCount
          this.readRateData.unReadCount = aMsg.TotalMeterCount - this.readRateData.readCount
          this.onlineCountData.online = aMsg.OnlineMeterCount
          this.onlineCountData.offline = aMsg.TotalMeterCount - aMsg.OnlineMeterCount
          if (this.total !== 0) {
            this.readRate = (this.readRateData.readCount * 100 / this.total).toString() + '%'
            this.onlineRate = (this.onlineCountData.online * 100 / this.total).toString() + '%'
          } else {
            this.readRate = '100%'
            this.onlineRate = '100%'
          }
          this.setOptionData(this.allmeterOption, this.meterCountData.eCount, this.meterCountData.wCount)
        } else {
          Notify(getFlagError(serverData.flag), 'error')
        }
      })
    },
    setOptionData (option, wCount, cCount) {
      option.series[0].data[0].value = wCount
      option.series[0].data[1].value = cCount
    },
    allmeter (data) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('allMeter'))
      // 绘制图表
      myChart.setOption(data)
      myChart.resize();
    },
    // 抄到率表计
    readTo (data) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('readTo'))
      // 绘制图表
      myChart.setOption(data)
      myChart.resize();
    },
    // 在线率表计
    online (data) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('online'))
      // 绘制图表
      myChart.setOption(data)
      myChart.resize();
    },
    getDayCurve (pCurveType, pCurvePeriod) { // 日曲线 (pCurveType 电、水, pCurvePeriod 基础 环比 同比)
      let areaid = store.getters.getCurrentAreaId()
      if (areaid < 0) {
        Notify('请选择左侧树节点', 'info')
        return
      }
      let areaConsumeCurveIn = {
        AreaId: areaid,
        FromTime: 0,
        EndTime: 0,
        MeterType: pCurveType
      }

      let date = new Date()
      if (pCurvePeriod === '基础') {
        areaConsumeCurveIn.FromTime = Date.parse(new Date(date.getFullYear(), date.getMonth(), 1)) / 1000
        areaConsumeCurveIn.EndTime = Date.parse(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)) / 1000
      } else if (pCurvePeriod === '环比') {
        areaConsumeCurveIn.FromTime = Date.parse(new Date(date.getFullYear(), date.getMonth() - 1, 1)) / 1000
        let dateTmp = new Date()
        dateTmp.setMonth(dateTmp.getMonth() + 1)
        dateTmp.setDate(0)
        let dateEnd = (dateTmp.getDate() < date.getDate()) ? dateTmp.getDate() : date.getDate()
        areaConsumeCurveIn.EndTime = Date.parse(new Date(date.getFullYear(), date.getMonth() - 1, dateEnd + 1)) / 1000
      } else if (pCurvePeriod === '同比') {
        areaConsumeCurveIn.FromTime = Date.parse(new Date(date.getFullYear() - 1, 0, 1)) / 1000
        areaConsumeCurveIn.EndTime = Date.parse(new Date(date.getFullYear() - 1, date.getMonth(), date.getDate() + 1)) / 1000
      }
      let createProto = this.protoAreaConsumeCurveIn.create(areaConsumeCurveIn)
      let encodeData = this.protoAreaConsumeCurveIn.encode(createProto).finish()
      let initialData = spliceData(encodeData.length, Config.WsCmd.areaConsumeCurveGet, encodeData)
      sendSock(initialData, Config.WsCmd.areaConsumeCurveGet, serverData => {
        if (serverData.flag === 1) {
          const aMsg = this.protoAreaConsumeCurveOut.decode(serverData.data)
          let seriesIndex = (pCurvePeriod === '基础') ? 0 : (pCurvePeriod === '环比') ? 2 : 3
          for (let i = 0; i < aMsg.Vec.length; i++) {
            if (aMsg.Vec[i].Val0 > 2147483648) continue
            let date = new Date(aMsg.Vec[i].Time * 1000).getDate()
            if (pCurveType === 0) {
              this.electricityOption.series[seriesIndex].data[date] = (parseInt(aMsg.Vec[i].Val0) / 100.00).toFixed(2)
            } else if (pCurveType === 1) {
              this.waterOption.series[seriesIndex].data[date] = (parseInt(aMsg.Vec[i].Val0) / 100.00).toFixed(2)
            }
          }
          if (pCurveType === 0) {
            this.electricityDOM.setOption(this.electricityOption)
          } else if (pCurveType === 1) {
            this.waterDOM.setOption(this.waterOption)
          }
        } else {
          Notify(getFlagError(serverData.flag), 'error')
        }
      })
    },
    getMonthCurve (pCurveType, pCurvePeriod) { // 月曲线 (pCurveType 电、水 , pCurvePeriod 基础 环比 同比)
      let areaid = store.getters.getCurrentAreaId()
      if (areaid < 0) {
        Notify('请选择左侧树节点', 'info')
        return
      }

      let areaConsumeCurveIn = {
        AreaId: areaid,
        FromTime: 0,
        EndTime: 0,
        MeterType: pCurveType
      }

      let date = new Date()
      if (pCurvePeriod === '基础') {
        areaConsumeCurveIn.FromTime = Date.parse(new Date(date.getFullYear(), 0, 1)) / 1000
        areaConsumeCurveIn.EndTime = Date.parse(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)) / 1000
      } else if (pCurvePeriod === '同比') {
        areaConsumeCurveIn.FromTime = Date.parse(new Date(date.getFullYear() - 1, 0, 1)) / 1000
        areaConsumeCurveIn.EndTime = Date.parse(new Date(date.getFullYear() - 1, date.getMonth(), date.getDate() + 1)) / 1000
      }

      let createProto = this.protoAreaConsumeCurveIn.create(areaConsumeCurveIn)
      let encodeData = this.protoAreaConsumeCurveIn.encode(createProto).finish()
      let initialData = spliceData(encodeData.length, Config.WsCmd.areaConsumeCurveGet, encodeData)
      sendSock(initialData, Config.WsCmd.areaConsumeCurveGet, serverData => {
        if (serverData.flag === 1) {
          const aMsg = this.protoAreaConsumeCurveOut.decode(serverData.data)
          let seriesIndex = (pCurvePeriod === '基础') ? 1 : 2
          for (let i = 0; i < aMsg.Vec.length; i++) {
            if (aMsg.Vec[i].Val0 > 2147483648) continue
            let month = new Date(aMsg.Vec[i].Time * 1000).getMonth()
            if (pCurveType === 0) {
              this.electricityOption.series[seriesIndex].data[month] += Number((parseInt(aMsg.Vec[i].Val0) / 100.00).toFixed(2))
            } else if (pCurveType === 1) {
              this.waterOption.series[seriesIndex].data[month] += Number((parseInt(aMsg.Vec[i].Val0) / 100.00).toFixed(2))
            }
          }
          if (pCurveType === 0) {
            this.electricityDOM.setOption(this.electricityOption)
          } else if (pCurveType === 1) {
            this.waterDOM.setOption(this.waterOption)
          }
        } else {
          Notify(getFlagError(serverData.flag), 'error')
        }
      })
    },
    getM2MCurve (pCurveType) { // 环比
      //
    },
    getY2YCurve (pCurveType) { // 同比
      //
    },
    elineRadioChange (value) {
      this.elineCheckbox = []
      this.electricityOption.series[2].data.length = 0
      this.electricityOption.series[3].data.length = 0
      if (value === 'day') {
        this.initxAxis('用电', '日')
        this.isEM2Menabled = false
        this.electricityOption.series[1].data.length = 0
        this.getDayCurve(0, '基础')
      }
      if (value === 'month') {
        this.isEM2Menabled = true
        this.initxAxis('用电', '月')
        this.electricityOption.series[0].data.length = 0
        this.getMonthCurve(0, '基础')
      }
    },
    elineCheckChange (value) {
      if (value.indexOf('环比') >= 0) {
        if (this.electricityOption.series[2].data.length === 0) {
          if (this.elineRadio === 'day') { // 日环比
            let xAxisLen = this.electricityOption.xAxis.data.length
            for (let i = 0; i < xAxisLen; i++) {
              this.electricityOption.series[2].data.push(0)
            }
          }
          this.getDayCurve(0, '环比')
        }
      } else {
        if (this.electricityOption.series[2].data.length > 0) {
          this.electricityOption.series[2].data.length = 0
        }
      }
      if (value.indexOf('同比') >= 0) {
        if (this.elineRadio === 'day') { // 日同比
          let date = new Date().getDate()
          date = (date < 15) ? 15 : date
          for (let i = 0; i < date; i++) {
            this.electricityOption.series[2].data.push(0)
          }
        } else if (this.elineRadio === 'month') { // 月同比
          for (let i = 0; i < 12; i++) {
            this.electricityOption.series[2].data.push(0)
          }
        }
        this.getMonthCurve(0, '同比')
      } else {
        if (this.electricityOption.series[3].data.length > 0) {
          this.electricityOption.series[3].data.length = 0
        }
      }
      this.electricityDOM.setOption(this.electricityOption)
    },
    wlineRadioChange (value) {
      this.wlineCheckbox = []
      this.waterOption.series[2].data.length = 0
      this.waterOption.series[3].data.length = 0
      if (value === 'day') {
        this.initxAxis('用水', '日')
        this.isWM2Menabled = false
        this.waterOption.series[1].data.length = 0
        this.getDayCurve(1, '基础')
      }
      if (value === 'month') {
        this.initxAxis('用水', '月')
        this.isWM2Menabled = true
        this.waterOption.series[3].data.length = 0
        this.waterOption.series[0].data.length = 0
        this.getMonthCurve(1, '基础')
      }
    },
    wlineCheckChange (value) {
      if (value.indexOf('环比') >= 0) {
        if (this.waterOption.series[2].data.length === 0) {
          if (this.wlineRadio === 'day') { // 日环比
            let xAxisLen = this.waterOption.xAxis.data.length
            for (let i = 0; i < xAxisLen; i++) {
              this.waterOption.series[2].data.push(0)
            }
          }
          this.getDayCurve(1, '环比')
        }
      } else {
        if (this.waterOption.series[2].data.length > 0) {
          this.waterOption.series[2].data.length = 0
        }
      }
      if (value.indexOf('同比') >= 0) {
        if (this.waterOption.series[3].data.length === 0) {
          if (this.wlineRadio === 'day') { // 日同比
            let date = new Date().getDate()
            date = (date < 15) ? 15 : date
            for (let i = 0; i < date; i++) {
              this.waterOption.series[2].data.push(0)
            }
          } else if (this.wlineRadio === 'month') { // 月同比
            for (let i = 0; i < 12; i++) {
              this.waterOption.series[2].data.push(0)
            }
          }
          this.getMonthCurve(1, '同比')
        }
      } else {
        if (this.waterOption.series[3].data.length > 0) {
          this.waterOption.series[3].data.length = 0
        }
      }
      this.waterDOM.setOption(this.waterOption)
    },
    initxAxis (pChartType, pCurveType) {
      if (pChartType === '用电') {
        if (pCurveType === '日') {
          this.electricityOption.xAxis.data.length = 0
          let date = new Date().getDate()
          date = (date < 15) ? 15 : date
          for (let i = 0; i < date; i++) {
            this.electricityOption.xAxis.data.push(i + 1)
            this.electricityOption.series[0].data.push(0)
          }
        } else if (pCurveType === '月') {
          this.electricityOption.xAxis.data.length = 0
          for (let i = 0; i < 12; i++) {
            this.electricityOption.xAxis.data.push(i + 1)
            this.electricityOption.series[1].data.push(0)
          }
        }
      } else if (pChartType === '用水') {
        if (pCurveType === '日') {
          this.waterOption.xAxis.data.length = 0
          let date = new Date().getDate()
          date = (date < 15) ? 15 : date
          for (let i = 0; i < date; i++) {
            this.waterOption.xAxis.data.push(i + 1)
            this.waterOption.series[0].data.push(0)
          }
        } else if (pCurveType === '月') {
          this.waterOption.xAxis.data.length = 0
          for (let i = 0; i < 12; i++) {
            this.waterOption.xAxis.data.push(i + 1)
            this.waterOption.series[1].data.push(0)
          }
        }
      }
    },
    clearCurve () {
      // 清空所有曲线
      this.elineRadio = ''
      this.wlineRadio = ''
      this.elineCheckbox = []
      this.wlineCheckbox = []
      for (let i = 0; i < 4; i++) {
        this.electricityOption.series[i].data = []
        this.waterOption.series[i].data = []
      }
      this.electricityDOM.clear()
      this.waterDOM.clear()
    }
  }
}
</script>

<style lang='less' scoped>
  @import '../../css/home.less';
</style>
