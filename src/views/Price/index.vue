<template>
  <div class='feePrice'>
    <vxe-toolbar :data="feePrice" setting>
      <template v-slot:buttons>
        <el-button @click="$refs.showAdd.show()"  size="small" icon="el-icon-zoom-in">新增</el-button>
        <el-button @click="$refs.showEdit.show()" icon="el-icon-edit" size="small">修改</el-button>
        <el-button @click="delFeePrice" icon="el-icon-delete" size="small">删除</el-button>
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
      :tree-config="{key: 'Alias', children: 'children', trigger: 'cell'}"
      :radio-config="{labelField: 'Standard'}"
      :data.sync="feePrice"
      :optimization ="{scrollY: {gt: 500, oSize: 10, rSize: 30}}"
      :customs.sync="customColumns">
      <vxe-table-column field="Alias" title="计费标准" tree-node  show-overflow>
        <template v-slot="{ row }">
          <span v-html="row.Alias"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="Fp1" title="费率1-尖价" show-overflow>
        <template v-slot="{ row }">
          <span v-html="row.Fp1"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="Fp2" title="费率2-峰价" show-overflow>
        <template v-slot="{ row }">
          <span v-html="row.Fp2"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="Fp3" title="费率3-平价" show-overflow>
        <template v-slot="{ row }">
          <span v-html="row.Fp3"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="Fp4" title="费率4-谷价" show-overflow>
        <template v-slot="{ row }">
          <span v-html="row.Fp4"></span>
        </template>
      </vxe-table-column>
    </vxe-table>
  <Edit ref="showEdit" :currentFeePrice="currentFeePrice"/>
  <Add ref="showAdd" :feePriceAll="feePrice"/>
  </div>
</template>

<script>
import Edit from './edit'
import Add from './add'
import XEUtils from 'xe-utils'
import protoRoot from '@/proto/WsMsg.js'
import { spliceData } from '@/utils/send.js'
import { sendSock } from '@/utils/websocket.js'
import * as Pro3761 from '@/pro/pro3761.js'
import * as Config from '@/config.js'
import store from '@/store/store'
import { get3761Error, getFlagError } from '../../error'
import { Notify } from '../../utils/commUtil'

export default {
  data () {
    return {
      currentFeePrice: null,
      feePrice: [],
      loading: false,
      customColumns: [],
      protofeePriceGetOut: protoRoot.lookup('WsMsg.FeePriceGetOut'),
      protofeePriceDelIn: protoRoot.lookup('WsMsg.FeePrice')
    }
  },
  computed: {
  },
  mounted () {
    this.initTable()
  },
  methods: {
    handleCurrentChange (val) {
      this.currentFeePrice = val.row
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    filterHandler ({ value, row, column }) {
      let property = column['property']
      return row[property] === value
    },
    initTable() {

      if (store.state.glFeePrice.length > 0) {
        this.feePrice = store.state.glFeePrice
        return
      }
      let initialData = spliceData(0, Config.WsCmd.feePriceGet, null)
      sendSock(initialData, Config.WsCmd.feePriceGet, serverData => {
        if (serverData.flag === 1) {
          let aMsg = this.protofeePriceGetOut.decode(serverData.data)
          let feePriceArray = []
          for (let i = 0; i < aMsg.Vec.length; i++) {
            let price = aMsg.Vec[i].Price
            let alias = (aMsg.Vec[i].Alias == '') ? Config.getUserTypeValue(aMsg.Vec[i].Type) 
                                                    : aMsg.Vec[i].Alias

            if (aMsg.Vec[i].Type <= 5) {
              feePriceArray.push({
                id: i,
                Type: aMsg.Vec[i].Type,
                Fp1: ((price & 0xffff) / 10000.00).toFixed(4),
                Fp2: (((price / 65536) & 0xffff) / 100.00).toFixed(4),
                Fp3: (((price / 4294967296) & 0xffff) / 100.00).toFixed(4),
                Fp4: (((price / 281474976710656) & 0xffff) / 100.00).toFixed(4),
                Alias: alias
              })
            } else {
              feePriceArray.push({
                id: i,
                Type: aMsg.Vec[i].Type,
                Fp1: 0.0000,
                Fp2: 0.0000,
                Fp3: (((price / 4294967296) & 0xffff) / 100.00).toFixed(4),
                Fp4: 0.0000,
                Alias: alias
              })
            }
          }
          store.commit('setFeePrice', feePriceArray)
          this.feePrice = store.state.glFeePrice
        } else {
          Notify(getFlagError(serverData.flag), 'error')
        }
      })
    },
    delFeePrice() {
      if (this.currentFeePrice === null) {
        Notify('请选择一类电价', 'info')
        return
      }
      let feePriceDelIn= {
        Type: this.currentFeePrice.Type,
        Price: parseInt(this.currentFeePrice.Fp4) * 281474976710656 + parseInt(this.currentFeePrice.Fp3) * 4294967296 +
                parseInt(this.currentFeePrice.Fp2) * 65536 + parseInt(this.currentFeePrice.Fp1) ,
        Alias: this.currentFeePrice.Alias ,
      }

      let createProto = this.protofeePriceDelIn.create(feePriceDelIn)
      let encodeData = this.protofeePriceDelIn.encode(createProto).finish()
      let initialData = spliceData(encodeData.length, Config.WsCmd.feePriceDel, encodeData)
      sendSock(initialData, Config.WsCmd.feePriceDel, serverData => {
        if (serverData.flag === 1) {
          let index = this.feePrice.findIndex(price =>
                        price.Type === this.currentFeePrice.Type)
          this.feePrice.splice(index, 1)
          Notify('删除成功', 'success')
          this.formVisible = false
        } else {
          Notify(getFlagError(serverData.flag), 'error')
        }
      })
    }
  },
  components: {
    Edit,
    Add
  }
}
</script>

<style lang='less' type='text/css'>
@import '../../css/price.less';
</style>
