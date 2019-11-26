<template>
  <el-dialog
    class="operator-dialog"
    title="修改管理员"
    :visible.sync="formVisible"
    :close-on-click-modal='false'
    :before-close="handleClose">
    <el-form :model="formEditData" label-position="top" class="clearfix" :rules="rules" ref="rules" status-icon >
      <el-form-item label="姓名" prop='Name' class='el-item50'>
        <el-input v-model="formEditData.Name" size='small'  placeholder="请输入姓名"></el-input>
      </el-form-item>

      <el-form-item label="手机号" prop='Mobile' class='el-item50 p0' >
        <el-input v-model="formEditData.Mobile" size='small' placeholder="请输入手机号" disabled></el-input>
      </el-form-item>

      <el-form-item label="区域" prop='AreaId' >
<treeselect
          :options="treeSelectData"
          placeholder ="请选择区域"
          :searchable ='false'
          :clearable = 'false'
          :clearOnSelect ='true'
          v-model="formEditData.AreaId"
          :value='value'
          :defaultExpandLevel='Infinity'
          ref="treeSelect"
          @select='select'
          />
      </el-form-item>

      <el-form-item label="角色" prop='Roles' class='el-item50'>
        <el-select v-model="formEditData.RoleId" placeholder="请选择角色"  size='small'>
          <el-option
            v-for="item in roles"
            :key="item.value"
            :label="item.value"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="密码" prop='Password' class='el-item50 p0'>
        <el-input v-model="formEditData.Password" size='small' ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="formVisible = false" size='small'>取 消</el-button>
      <el-button type="primary" @click="EditOperator('rules')" size='small'>确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>

import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import protoRoot from '@/proto/WsMsg.js'
import { spliceData } from '@/utils/send.js'
import { sendSock } from '@/utils/websocket.js'
import { RoleTypes, WsCmd, getRoleValue } from '@/config.js'
import store from '@/store/store.js'
import { Notify } from '../../utils/commUtil'
import { getFlagError } from '../../error'
import * as Validate from '../../utils/validate.js'

export default {
  data () {
    return {
      formVisible: false,
      formEditData: {
        Mobile: '',
        Name: '',
        AreaId: 0,
        RoleId: 1,
        Password: ''
      },
      selectedOptions: [],
      value: '',
      currentNode: null,
      treeSelectData: [],
      roles: RoleTypes,
      protpSysOprUpdate: protoRoot.lookup('WsMsg.SysOpr'),
      rules: {
        Name: [{ validator: Validate.validateOprName, trigger: 'blur' }],
        Mobile: [{ validator: Validate.validateMobile, trigger: 'blur' }],
        Password: [{ validator: Validate.validateOprPw, trigger: 'blur' }]
      }
    }
  },
  props: ['currentOperator'],
  methods: {
    show () {
      if (this.currentOperator === null) {
        Notify('请选择要修改操作员', 'info')
      } else {
        this.formVisible = true
        this.treeSelectData = []
        this.loadEditData(this.currentOperator)
      }
    },
    loadEditData (data) {
      let tmpTreeData = JSON.parse(JSON.stringify(store.state.glAreaTerData))
      this.removeTerminals(tmpTreeData)
      this.treeSelectData = tmpTreeData
      this.formEditData = JSON.parse(JSON.stringify(data))
      delete this.formEditData['Region']
      delete this.formEditData['Role']
    },
    removeTerminals (pVec) {
      for (let i = 0; i < pVec.length; i++) {
        if ((pVec[i].id) && pVec[i].children && pVec[i].children.length === 0) {
          delete pVec[i].children
          continue
        } else if (pVec[i].areaId) {
          pVec.splice(i, 1)
          i--
        } else if (pVec[i].children && pVec[i].children.length > 0) {
          this.removeTerminals(pVec[i].children)
          if (pVec[i].children.length === 0) delete pVec[i].children
        }
      }
    },
    EditOperator (pRules) {
      this.$refs[pRules].validate(async valid => {
        if (valid) {
          let createProto = this.protpSysOprUpdate.create(this.formEditData)
          let encodeData = this.protpSysOprUpdate.encode(createProto).finish()
          let initialData = spliceData(encodeData.length, WsCmd.sysOprUpdate, encodeData)
          sendSock(initialData, WsCmd.sysOprUpdate, serverData => {
            if (serverData.flag === 1) {
              Notify('修改成功', 'success')

              this.currentOperator.Mobile = this.formEditData.Mobile
              this.currentOperator.Name = this.formEditData.Name
              this.currentOperator.AreaId = this.formEditData.AreaId
              this.currentOperator.RoleId = this.formEditData.RoleId
              this.currentOperator.Password = this.formEditData.Password
              this.currentOperator.Region = this.currentNode === null ? this.currentOperator.Region : this.currentNode.name
              this.currentOperator.Role = getRoleValue(this.formEditData.RoleId)
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
    // 选中后时触发
    select (node) {
      this.currentNode = node
    },
    handleClose () {
      this.formVisible = false
    }
  },
  components: { Treeselect }
}
</script>

<style lang='less'>
@import '../../css/operator-dialog.less';
</style>
