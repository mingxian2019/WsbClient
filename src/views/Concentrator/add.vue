<template>
  <el-dialog
    class="concentrator-add"
    title="添加集中器"
    :visible.sync="formVisible"
    :close-on-click-modal='false'
    :before-close="handleClose">
    <a class="aa"></a>
    <el-form :model="terminalData" label-position="top" class="clearfix" :rules="rules" ref="rules" >
      <el-form-item label="目标">
        <el-select v-model="terminalData.AreaId" disabled >
          <el-option
            v-for="item in optionArea"
            :key="item.id"
            :label="item.value"
            :value="item.id">
          </el-option>
        </el-select>

      </el-form-item>
      <el-form-item label="通信协议" prop="Protocol">
          <el-select v-model="terminalData.Protocol" disabled>
          <el-option
            v-for="item in optionProtocol"
            :key="item.id"
            :label="item.value"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="集中器名称" prop="Name">
        <el-input v-model="terminalData.Name"></el-input>
      </el-form-item>
      <el-form-item label="行政区划码" prop="Code">
        <el-input v-model="terminalData.Code"></el-input>
      </el-form-item>
      <el-form-item label="集中器地址" prop="Addr">
        <el-input v-model="terminalData.MeterAddr"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="formVisible = false" size='small'>取 消</el-button>
      <el-button type="primary" @click="addJzq('rules')" size='small'>确 定</el-button>
    </span>
  </el-dialog>
  <!-- </Modal> -->
</template>

<script>
import protoRoot from '@/proto/WsMsg.js'
import { spliceData } from '@/utils/send.js'
import { sendSock } from '@/utils/websocket.js'
import { ProtocolJzq, WsCmd, getJzqProtocolValue } from '@/config.js'
import store from '@/store/store.js'
import * as Pro3761 from '@/pro/pro3761.js'
import { getFlagError } from '../../error'
import { Notify } from '../../utils/commUtil'
import * as Validate from '../../utils/validate.js'
export default {
  data () {
    return {
      formVisible: false,
      terminalData: {
        AreaId: null,
        Protocol: null,
        Addr: null,
        Name: null,
        Code: null,
        MeterAddr: null,
        Fes: -1
      },
      optionArea: [],
      optionProtocol: [],
      protoTerminalAddIn: protoRoot.lookup('WsMsg.Terminal'),
      rules: {
        Name: [{ validator: Validate.validateJzqName, trigger: 'blur' }],
        Code: [{ validator: Validate.validateJzqCode, trigger: 'blur' }],
        MeterAddr: [{ validator: Validate.validateJzqAddr, trigger: 'blur' }]
      }
    }
  },
  props: ['jzqData'],
  mounted () {

  },

  methods: {
    show () {
      if (!(store.state.currentAreaTerNode.isTer) && (store.state.currentAreaTerNode.id === undefined)) {
        Notify('请先选择左侧树节点', 'info')
        return
      }
      this.formVisible = true
      this.init()
    },
    init () {
      this.optionProtocol = ProtocolJzq
      this.terminalData.Protocol = 1
      if (store.state.currentAreaTerNode.isTer) {
        this.terminalData.AreaId = store.state.currentAreaTerNode.areaId
        this.optionArea = [{
          id: store.state.currentAreaTerNode.areaId,
          value: store.getters.getAreaNameById(store.state.currentAreaTerNode.areaId)
        }]
        return
      }
      this.terminalData.AreaId = store.state.currentAreaTerNode.id
      this.optionArea = [{
        id: store.state.currentAreaTerNode.id,
        value: store.state.currentAreaTerNode.name
      }]
    },
    addJzq (pRules) {
      this.$refs[pRules].validate(async valid => {
        if (valid) {
          let code = ('0000' + this.terminalData.Code).slice(-4)
          let addr = ('00000' + this.terminalData.MeterAddr).slice(-5)
          this.terminalData.Addr = Pro3761.AddrUiStrToProInt(code + addr)
          let createProto = this.protoTerminalAddIn.create(this.terminalData)
          let encodeData = this.protoTerminalAddIn.encode(createProto).finish()
          let initialData = spliceData(encodeData.length, WsCmd.terminalAdd, encodeData)
          sendSock(initialData, WsCmd.terminalAdd, serverData => {
            if ((serverData.flag === 0) || (serverData.flag === 1)) {
              Notify('添加成功', 'success')
              // 添加缺失区域数据
              let terminal = {
                visiable: false,
                label: this.terminalData.Name,
                addr: this.terminalData.Addr,
                areaId: this.terminalData.AreaId,
                protocol: this.terminalData.Protocol,
                fes: 0,
                name: this.terminalData.Name,
                isTer: true,
                children: []
              }

              store.getters.addTerminalData(terminal)
              // 修改本地
              this.jzqData.push({
                addr: Pro3761.AddrProIntToUiStr(this.terminalData.Addr),
                name: terminal.name,
                region: this.optionArea[0].value,
                protocol: getJzqProtocolValue(terminal.protocol),
                status: '离线',
                areaId: terminal.areaIdTer,
                fes: 0
              })
              this.formVisible = false
            } else {
              Notify(getFlagError(serverData.flag), 'error')
              this.formVisible = true
            }
          })
        } else {
          this.formVisible = true
        }
      })
    },
    handleClose () {
      this.formVisible = false
    }
  }
}
</script>
<style lang='less' >
  @import '../../css/concentrator-add.less';
</style>
