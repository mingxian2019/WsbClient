<template>
  <div class="oprtsyot hw100">
    <vxe-toolbar :data="operatorData" id="operatorTable" :resizable="{storage: true}" :setting="{storage: true}">
      <template v-slot:buttons>
        <!-- <vxe-button @click="loadOperator()">刷新</vxe-button> -->
        <el-button size="small"  icon="el-icon-circle-plus-outline" @click="$refs.showAddOperator.show()">新增</el-button >
        <el-button size="small" icon="el-icon-edit" @click="$refs.showEditOperator.show()">修改</el-button >
        <el-button size="small" icon="el-icon-delete" @click="deleteOperator">删除</el-button >
      </template>
    </vxe-toolbar>

    <vxe-table
      ref="xTable"
      border
      highlight-hover-row
      highlight-current-row
      resizable
      @cell-click='handleCurrentChange'
      :tree-config="{key: 'id', children: 'children', trigger: 'cell'}"
      :radio-config="{labelField: 'Mobile'}"
      :data.sync="operatorData"
      :customs.sync="customColumns">
      <vxe-table-column field="Mobile" title="手机号" tree-node sortable></vxe-table-column>
      <vxe-table-column field="Name" title="姓名" sortable></vxe-table-column>
      <vxe-table-column field="Region" title="区域" :filters="regionFilters" :filter-method="filterHandler"></vxe-table-column>
      <vxe-table-column
        field="Role" title="角色"
        :filters="roleFilters"
        :filter-method="filterHandler"
      ></vxe-table-column>
      <vxe-table-column field="Password" title="密码"></vxe-table-column>
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

    <AddOperator ref="showAddOperator" :operatorData='operatorData'  @watchChild="refreshTable"/>
    <EditOperator ref="showEditOperator" :currentOperator='currentOperator' />
  </div>
</template>

<script>

import AddOperator from './add'
import EditOperator from './edit'
import store from '@/store/store'
import protoRoot from '@/proto/WsMsg.js'
import { spliceData } from '@/utils/send.js'
import { sendSock } from '@/utils/websocket.js'
import { getRoleValue, WsCmd, deepClone, RoleTypes } from '@/config.js'
import { getFlagError } from '../../error'
import { Notify } from '../../utils/commUtil'

export default {
  name: 'operator',
  data () {
    return {
      customColumns: [],
      input2: '',
      operatorData: [],
      currentOperator: null,
      visible: false,
      protoSysOprGetAllMsgOut: protoRoot.lookup('WsMsg.SysOprGetAllOut'),
      protoSysOprDelIn: protoRoot.lookup('WsMsg.SysOprDelIn'),
      currentPage: 1,
      pageSize: 13,
      regionFilters: [],
      origin: [],
      radio: '',
      roleFilters: RoleTypes
    }
  },
  created () {
    this.loadOperator()
    this.getFilterData()
    if (store.state.glSysOprData.length > 0) {
      this.operatorData = store.state.glSysOprData
      return
    }
  },
  methods: {
    // 筛选
    filterHandler ({ value, row, column }) {
      const property = column['property']
      return row[property] === value
    },
    // 选中
    handleCurrentChange (row) {
      // console.log()
      this.currentOperator = row.row
    },
    refreshTable(){
      this.loadOperator()
    },
    // 加载数据
    loadOperator () {
      this.operatorData = []
      store.commit('setOperator', this.operatorData)
      let initialData = spliceData(0, WsCmd.sysOprGetAll)
      sendSock(initialData, WsCmd.sysOprGetAll, serverData => {
        const aMsg = this.protoSysOprGetAllMsgOut.decode(serverData.data)
        if (serverData.flag === 1) {
          for (let i = 0; i < aMsg.Vec.length; i++) {
            if (aMsg.Vec[i].RoleId === 0) continue
            aMsg.Vec[i].Role = getRoleValue(aMsg.Vec[i].RoleId)
            let targetArea = store.state.original.find(function (obj) {
              if (obj.AreaId === aMsg.Vec[i].AreaId) return obj
            })
            aMsg.Vec[i].Region = (targetArea === undefined) ? '' : targetArea.AreaName
            aMsg.Vec[i].id = i
            store.state.glSysOprData.push(aMsg.Vec[i])
          }
          // this.origin = store.state.glSysOprData
          this.origin = deepClone(this.operatorData)
          // this.operatorData = store.state.glSysOprData
          this.operatorData = this.origin.slice(0, this.pageSize)
        } else {
          Notify(getFlagError(serverData.flag), 'success')
        }
      })
    },
    // 删除数据
    deleteOperator () {
      if (this.currentOperator === null) {
        Notify('请选择要删除操作员', 'info')
      } else {
        this.$confirm('确定删除吗？', '退出提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => { // 确认
          let deleteData = {
            Mobile: this.currentOperator.Mobile
          }
          let createProto = this.protoSysOprDelIn.create(deleteData)
          let encodeData = this.protoSysOprDelIn.encode(createProto).finish()
          let initialData = spliceData(encodeData.length, WsCmd.sysOprDel, encodeData)
          sendSock(initialData, WsCmd.sysOprDel, serverData => {
            if (serverData.flag === 1) {
              Notify('删除成功', 'success')
              // 修改本地
              let index = this.operatorData.indexOf(this.currentOperator)
              if (index >= 0) {
                this.operatorData.splice(index, 1)
              }
            } else {
              Notify(getFlagError(serverData.flag), 'error')
            }
          })
        })
      }
    },
    handleSizeChange (val) {
    },
    // 分页
    handlePageChange (val) {
      const jiequ = this.origin.slice((this.pageSize * (val - 1)), (val * this.pageSize))
      this.operatorData = jiequ
    },
    // 筛选
    getFilterData () {
      const lAreaInfoTreeData = deepClone(store.state.glAreaTerData)
      for (let i = 0; i < lAreaInfoTreeData.length; i++) {
        this.regionFilters.push({
          label: lAreaInfoTreeData[i].areaName,
          value: lAreaInfoTreeData[i].areaName
        })
        if (lAreaInfoTreeData[i].children) {
          for (let j = 0; j < lAreaInfoTreeData[i].children.length; j++) {
            if (!lAreaInfoTreeData[i].children[j].visiable) {
              continue
            }
            this.regionFilters.push({
              label: lAreaInfoTreeData[i].children[j].areaName,
              value: lAreaInfoTreeData[i].children[j].areaName
            })
          }
        }
      }
    },
    // 处理分组数据
    grouping (value) {
      let groupData = []
      let k = 0
      let sum = 0
      if (value === '区域') {
        groupData = []
        for (let i = 0; i < this.regionFilters.length; i++) {
          let sysOpr = {}
          sysOpr.id = k++
          sysOpr.Region = this.regionFilters[i].value
          sysOpr.children = []
          sysOpr.Mobile = null
          groupData.push(sysOpr)
          for (let b = 0; b < this.origin.length; b++) {
            let aValue = this.regionFilters[i].value
            if (this.origin[b].Region === aValue) {
              if (!isEmpty(groupData)) {
                for (let j = 0; j < groupData.length; j++) {
                  if (!isEmpty(groupData)) {
                    if (groupData[j].Region === this.origin[b].Region) {
                      this.origin[b].id = groupData[j].id + '-' + this.origin[b].id
                      groupData[j].children.push(this.origin[b])
                    }
                  }
                }
              }
            }
          }
        }
        getSummaries(groupData, 'Region')
        this.operatorData = groupData
      }
      if (value === '角色') {
        groupData = []
        for (let i = 0; i < this.roleFilters.length; i++) {
          let sysOpr = {}
          sysOpr.id = k++
          sysOpr.Role = this.roleFilters[i].value
          sysOpr.children = []
          groupData.push(sysOpr)
          for (let b = 0; b < this.origin.length; b++) {
            let aValue = this.roleFilters[i].value
            if (this.origin[b].Role === aValue) {
              if (!isEmpty(groupData)) {
                for (let j = 0; j < groupData.length; j++) {
                  if (!isEmpty(groupData)) {
                    if (groupData[j].Role === this.origin[b].Role) {
                      this.origin[b].id = groupData[j].id + '-' + this.origin[b].id
                      groupData[j].children.push(this.origin[b])
                    }
                  }
                }
              }
            }
          }
        }
        getSummaries(groupData, 'Role')
        this.operatorData = groupData
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
          if (data[i].children.length) {
            for (let j = 0; j < data[i].children.length; j++) {
              sum += data[i].children[j].Mobile
            }
            data[i].Mobile = `手机号合计：(${sum})`
          }
        }
      }
      this.visible = false
    },
    reset () {
      this.operatorData = this.origin
      this.visible = false
      this.radio = ''
    }
  },
  components: {
    AddOperator,
    EditOperator
  }
}
</script>

<style lang='less' scoped>
@import "../../css/operator.less";
</style>
