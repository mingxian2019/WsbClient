<template>
  <div class="concentrator">
    <vxe-toolbar :data="jzqData" setting>
      <template v-slot:buttons>
        <vxe-input v-model="searchText" type="search" placeholder="输入关键字搜索"></vxe-input>
        <!-- <vxe-button @click="loadJzq()">刷新</vxe-button> -->
        <el-button  class="top-btn" size="small" icon="el-icon-circle-plus-outline" @click="$refs.showAdd.show()">新增</el-button>
        <el-button  class="top-btn" size="small" icon="el-icon-edit" @click="$refs.showEdit.show()">修改</el-button>
        <el-button  class="top-btn" @click="deleteTerminal" size="small"  icon="el-icon-delete">删除</el-button>
        <el-button  class="top-btn" @click="goSetJzq" size="small"  icon="el-icon-setting">参数设置</el-button>
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
      <vxe-table-column field="addr" title="地址" sortable tree-node>
        <template v-slot="{ row }">
          <span v-html="row.addr"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="name" title="名称" sortable>
        <template v-slot="{ row }">
          <span v-html="row.name"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="region" title="区域" sortable>
        <template v-slot="{ row }">
          <span v-html="row.region"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="protocol" title="协议">
        <template v-slot="{ row }">
          <span v-html="row.protocol"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="status" title="状态" :filters="statusFilters" :filter-method="filterHandler">
        <template v-slot="{ row }">
          <span v-html="row.status"></span>
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
            <el-radio label="状态">状态</el-radio>
          </el-radio-group>

          <div class="tBtns">
            <el-button size="mini" type="text" @click="reset">重置</el-button>
            <el-button type="text" size="mini" @click='grouping(radio)'>确定</el-button>
          </div>
        </template>
          <!-- <vxe-button  slot="reference">分组</vxe-button> -->
          <el-button class='btn-fun btn-group' slot="reference" size="small"  icon="el-icon-document-copy">分组</el-button>
          <!-- <span  class='btn-fun><i class="el-icon-document-copy"></i>分组</span> -->
        </el-popover>
    <add ref="showAdd" :jzqData="jzqData"></add>
    <edit ref="showEdit" :jzqData="jzqData" :currentJzq="currentJzq"></edit>
  </div>
</template>
<script>

import Add from './add'
import Edit from './edit'
import store from '@/store/store'
import protoRoot from '@/proto/WsMsg.js'
import { spliceData } from '@/utils/send.js'
import { sendSock } from '@/utils/websocket.js'
import * as Pro3761 from '@/pro/pro3761.js'
import * as Pro645 from '@/pro/pro645.js'
import * as Config from '@/config.js'
import XEUtils from 'xe-utils'
import { getFlagError } from '../../error'
import { Notify } from '../../utils/commUtil'

export default {
  data () {
    return {
      customColumns: [],
      searchText: '',
      visible: false,
      currentJzq: null,
      jzqData: [],
      currentPage: 1,
      pageSize: 13,
      protoTerminalDelIn: protoRoot.lookup('WsMsg.TerminalDelIn'),
      currentArea: {},
      origin: [],
      statusFilters: [{ label: '在线', value: '在线' }, { label: '离线', value: '离线' }],
      radio: ''
    }
  },
  computed: {
    getAreaTerSelected () {
      return store.state.currentAreaTerNode
    },
    list () {
      let filterName = XEUtils.toString(this.searchText).trim().toLowerCase()
      if (filterName) {
        let filterRE = new RegExp(filterName, 'gi')
        let options = { children: 'children' }
        let searchProps = ['addr', 'name', 'region', 'protocol', 'status']
        let rest = XEUtils.searchTree(this.jzqData, item => searchProps.some(key => XEUtils.toString(item[key]).toLowerCase().indexOf(filterName) > -1), options)
        XEUtils.eachTree(rest, item => {
          searchProps.forEach(key => {
            item[key] = XEUtils.toString(item[key]).replace(filterRE, match => `<span class="keyword-lighten">${match}</span>`)
          })
        }, options)
        return rest
      }
      return this.jzqData
    }
  },
  watch: {
    getAreaTerSelected: function (selectNode) {
      this.jzqData = []
      if (selectNode.isTer) {
        this.jzqData.push({
          addr: Pro3761.AddrProIntToUiStr(selectNode.addr),
          name: selectNode.name,
          region: store.getters.getAreaNameById(selectNode.areaId),
          protocol: Config.getJzqProtocolValue(selectNode.protocol),
          status: (selectNode.fes < 0) ? '离线' : '在线',
          areaId: selectNode.id,
          fes: selectNode.fes
        })
        return
      }
      this.currentArea = selectNode
      this.loadJzq()
    },
    deep: true
  },
  mounted () {
    this.currentArea = store.state.currentAreaTerNode
    this.loadJzq()
  },
  methods: {
    // 选中
    handleCurrentChange (row) {
      this.currentJzq = row.row
      store.commit('setCurrentTerAddr', Pro3761.AddrUiStrToProInt(row.row.addr))
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handlePageChange (val) {
      const jiequ = this.origin.slice((this.pageSize * (val - 1)), (val * this.pageSize))
      this.jzqData = jiequ
    },
    loadJzq () { // 检索集中器
      this.jzqData = []
      if (!this.currentArea.children) return
      this.findTerminals(this.currentArea.children)
      this.origin = Config.deepClone(this.jzqData)
      this.jzqData = this.origin.slice(0, this.pageSize)
      this.currentJzq = null
    },
    findTerminals (pVec) {
      for (let i = 0; i < pVec.length; i++) {
        if (pVec[i].isTer) {
          this.jzqData.push({
            addr: Pro3761.AddrProIntToUiStr(pVec[i].addr),
            name: pVec[i].name,
            region: store.getters.getAreaNameById(pVec[i].areaId),
            protocol: Config.getJzqProtocolValue(pVec[i].protocol),
            status: (pVec[i].fes < 0) ? '离线' : '在线',
            areaId: pVec[i].areaId,
            fes: pVec[i].fes,
            id: i
          })
          continue
        } else if (pVec[i].children && pVec[i].children.length > 0) {
          this.findTerminals(pVec[i].children)
        }
      }
    },
    // 删除集中器
    deleteTerminal () {
      if (this.currentJzq === null) {
        Notify('请选择要删除的集中器', 'info')
      } else {
        this.$confirm('删除集中器会删除其下所有数据和表计，是否删除？', '退出提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => { // 确认
          let terminalDelIn = {
            Addr: Pro3761.AddrUiStrToProInt(this.currentJzq.addr)
          }
          let createProto = this.protoTerminalDelIn.create(terminalDelIn)
          let encodeData = this.protoTerminalDelIn.encode(createProto).finish()
          let initialData = spliceData(encodeData.length, Config.WsCmd.terminalDel, encodeData)
          sendSock(initialData, Config.WsCmd.terminalDel, serverData => {
            if (serverData.flag === 1) {
              Notify('删除成功', 'success')
              // 修改本地
              let index = this.jzqData.indexOf(this.currentJzq)
              if (index >= 0) {
                this.jzqData.splice(index, 1)
              }
              // 格式化地址
              this.currentJzq.addr = Pro3761.AddrUiStrToProInt(this.currentJzq.addr)
              store.getters.delTerminalData(this.currentJzq)
            } else {
              Notify(getFlagError(serverData.flag), 'error')
            }
          })
        })
      }
    },
    goSetJzq () {
      if (this.currentJzq === null) {
        Notify('请选中一个集中器', 'info')
        return
      }
      let fes = store.getters.getTerminalFesByAddr(store.state.currentTerAddr)

      if (fes < 0) {
        Notify('集中器不在线', 'info')
        return
      }

      this.$router.replace('/file/concentrantor/setJzq')
    },
    filterHandler ({ value, row, column }) {
      let property = column['property']
      return row[property] === value
    },
    grouping (value) {
      let groupData = []
      let k = 0
      if (value === '状态') {
        groupData = []
        for (let i = 0; i < this.statusFilters.length; i++) {
          let sysOpr = {}
          sysOpr.id = k++
          sysOpr.status = this.statusFilters[i].value
          sysOpr.children = []
          groupData.push(sysOpr)
          for (let b = 0; b < this.origin.length; b++) {
            let aValue = this.statusFilters[i].value
            if (this.origin[b].status === aValue) {
              if (!isEmpty(groupData)) {
                for (let j = 0; j < groupData.length; j++) {
                  if (!isEmpty(groupData)) {
                    if (groupData[j].status === this.origin[b].status) {
                      this.origin[b].id = groupData[j].id + '-' + this.origin[b].id
                      groupData[j].children.push(this.origin[b])
                    }
                  }
                }
              }
            }
          }
        }
        getSummaries(groupData, 'status')
        this.jzqData = groupData
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
          // if (data[i].children.length) {
          //   data[i].children.push({
          //     Mobile: '总计',
          //     Name: '-',
          //     Region: '-',
          //     Role: '-',
          //     Password: data[i].children.length + '位',
          //     id: data[i].id + '位'
          //   })
          // }
        }
      }
      this.visible = false
    },
    reset () {
      this.jzqData = this.origin
      this.visible = false
      this.radio = ''
    }
  },
  components: {
    Add,
    Edit
  }
}
</script>

<style lang='less' >
@import "../../css/concentrator.less";
</style>
