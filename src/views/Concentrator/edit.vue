<template>
    <el-dialog
    class="concentrator-add"
    title="修改集中器名称"
    :visible.sync="formVisible"
    :close-on-click-modal='false'
    :before-close="handleClose">
      <el-form :model="terminalData" label-position="top" class="clearfix" :rules="rules" ref="rules">
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
          <el-input v-model="terminalData.Name" ></el-input>
        </el-form-item>
        <el-form-item label="行政区划码" prop="Code">
          <el-input v-model="terminalData.Code" disabled></el-input>
        </el-form-item>
        <el-form-item label="集中器地址" prop="Addr" >
          <el-input v-model="terminalData.Addr" disabled></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="formVisible = false" size='small'>取 消</el-button>
        <el-button type="primary" @click="updateJzq('rules')" size='small'>确 定</el-button>
      </span>
    </el-dialog>
</template>

<script>
import protoRoot from '@/proto/WsMsg.js'
import { spliceData } from '@/utils/send.js'
import { sendSock } from '@/utils/websocket.js'
import { WsCmd } from '@/config.js'
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
        Fes: -1
      },
      optionArea: [],
      optionProtocol: [],
      protoTerminalUpdateIn: protoRoot.lookup('WsMsg.Terminal'),
      rules: {
        Name: [{ validator: Validate.validateJzqName, trigger: 'blur' }]
      }
    }
  },
  props: ['jzqData', 'currentJzq'],
  methods: {
    show () {
      if (this.currentJzq === null) {
        Notify('请选择一个集中器', 'info')
        return
      }
      this.init()
      this.formVisible = true
    },
    handleClose () {
      this.formVisible = false
    },
    init () {
      this.terminalData.Protocol = 1
      this.terminalData.AreaId = this.currentJzq.areaId
      this.optionArea = [{
        id: this.currentJzq.areaId,
        value: this.currentJzq.region
      }]
      this.terminalData.Name = this.currentJzq.name
      this.terminalData.Code = this.currentJzq.addr.slice(0, 4)
      this.terminalData.Addr = this.currentJzq.addr.slice(-5)
    },
    updateJzq (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.terminalData.Addr = Pro3761.AddrUiStrToProInt(this.currentJzq.addr)
          let createProto = this.protoTerminalUpdateIn.create(this.terminalData)
          let encodeData = this.protoTerminalUpdateIn.encode(createProto).finish()
          let initialData = spliceData(encodeData.length, WsCmd.terminalUpdate, encodeData)
          sendSock(initialData, WsCmd.terminalUpdate, serverData => {
            if (serverData.flag === 1) {
              Notify('修改成功', 'success')
              this.currentJzq.name = this.terminalData.Name
              store.getters.updateTerminalName(this.currentJzq.name, this.terminalData.Addr)
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
    }
  }
}
</script>

<style lang='less' type='text/css'>
  @import '../../css/concentrator-add.less';
</style>
