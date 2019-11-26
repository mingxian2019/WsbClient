<template>
  <el-dialog
    class='price-form'
    title="新增"
    :close-on-click-modal='false'
    :visible.sync="formVisible">
    <el-form :model="feePrice" class="clearfix"  label-position="left" label-width="110px" ref="rules" :rules="rules">
      <div class='grouping'>
        <span class='grouping-title'>类别单价</span>
        <div class='grouping-content clearfix'>
          <el-form-item label="计费标准" prop="Type" class='first-item'>
            <el-select v-model="feePrice.Type" @change="userTypeChange" size="small">
              <el-option
                v-for="item in userTypes"
                :key="item.id"
                :label="item.value"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="标准名称" prop="Alias" size="small" >
            <el-input v-model="feePrice.Alias" ></el-input>
          </el-form-item>
          <el-form-item label="费率1尖（元）" prop="Fp1" size="small">
            <el-input v-model="feePrice.Fp1" :disabled="disablePrice"></el-input>
          </el-form-item>
          <el-form-item label="费率2峰（元）" prop="Fp2" size="small">
            <el-input v-model="feePrice.Fp2" :disabled="disablePrice"></el-input>
          </el-form-item>
          <el-form-item label="费率3平（元）" prop="Fp3" size="small">
            <el-input v-model="feePrice.Fp3"></el-input>
          </el-form-item>
          <el-form-item label="费率4谷（元）" prop="Fp4" size="small" class='last-item'>
            <el-input v-model="feePrice.Fp4" :disabled="disablePrice"></el-input>
          </el-form-item>
        </div>
      </div>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="formVisible = false" size='small'>取 消</el-button>
      <el-button type="primary" @click="addFeePrice('rules')" size='small'>确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>

import protoRoot from '@/proto/WsMsg.js'
import { spliceData } from '@/utils/send.js'
import { sendSock } from '@/utils/websocket.js'
// import * as Pro3761 from '@/pro/pro3761.js'
import * as Config from '@/config.js'
import store from '@/store/store'
import { getFlagError } from '../../error'
import { Notify } from '../../utils/commUtil'
import * as Validate from '../../utils/validate.js'

export default {
  data () {
    return {
      formVisible: false,
      userTypes: Config.UserTypes,
      disablePrice: false,
      feePrice: {
        Type: 1,
        Alias: '',
        Fp1: '',
        Fp2: '',
        Fp3: '',
        Fp4: ''
      },
      rules: {
        Fp1: [{ validator: Validate.validatePrice, trigger: 'blur' }],
        Fp2: [{ validator: Validate.validatePrice, trigger: 'blur' }],
        Fp3: [{ validator: Validate.validatePrice, trigger: 'blur' }],
        Fp4: [{ validator: Validate.validatePrice, trigger: 'blur' }]
      },
      protofeePriceMergeIn: protoRoot.lookup('WsMsg.FeePrice')
    }
  },
  props: ['feePriceAll'],
  methods: {
    show () {
      this.modifyUserTypeName()
      this.userTypeChange(1)
      this.formVisible = true
    },
    addFeePrice (pRules) {
      this.$refs[pRules].validate(async valid => {
        if (valid) {
          let feePriceMergeIn = {
            Type: this.feePrice.Type,
            Price: 0,
            Alias: this.feePrice.Alias
          }
          if (this.feePrice.Type <= 5) {
            feePriceMergeIn.Price = BigInt(this.feePrice.Fp4 * 10000) * BigInt(281474976710656)
                                    + BigInt(this.feePrice.Fp3 * 10000) * BigInt(4294967296)
                                      + BigInt(this.feePrice.Fp2 * 10000) * BigInt(65536)
                                        + BigInt(this.feePrice.Fp1 * 10000)
          } else {
            feePriceMergeIn.Price = BigInt(this.feePrice.Fp3  * 10000)
          }
          feePriceMergeIn.Price = 300
          let createProto = this.protofeePriceMergeIn.create(feePriceMergeIn)
          let encodeData = this.protofeePriceMergeIn.encode(createProto).finish()
          let initialData = spliceData(encodeData.length, Config.WsCmd.feePriceMerge, encodeData)
          sendSock(initialData, Config.WsCmd.feePriceMerge, serverData => {
            if (serverData.flag === 1) {
              this.feePriceAll.push(this.feePrice)
              Notify('添加成功', 'success')
              this.formVisible = false
            } else {
              Notify(getFlagError(serverData.flag), 'error')
            }
          })
        } else {
          this.formVisible = true
        }
      })
    },
    userTypeChange (pType) {
      let type = this.userTypes.find(function (obj) { if (obj.id === pType) return obj })
      this.feePrice.Alias = type.value
      if (pType <=5) {
        this.disablePrice = false
      } else {
        this.disablePrice = true
      }
    },
    modifyUserTypeName () {
      for (let i = 0; i < this.userTypes.length; i++) {
        let type = this.userTypes[i]
        type.value = store.getters.getFeeNameByUserType(type.id, Config)
      }
    }
  }
}
</script>

<style lang='less'>
@import "../../css/price-form.less";
</style>
