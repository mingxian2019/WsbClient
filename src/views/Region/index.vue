<template>
  <div class="region hw100">
      <div class="region-header">
        <span class="region-label">区域名称</span>
        <el-input v-model="newAreaName" placeholder="请输入新区域名称" size="small"></el-input>
        <el-button size="small" @click="addArea"  icon="el-icon-circle-plus-outline">新增</el-button>
        <el-button size="small"  @click="updateArea"  icon="el-icon-edit" :disabled="getDisabled">修改</el-button>
        <el-button @click="deleteArea" size="small"  icon="el-icon-delete" :disabled="getDisabled">删除</el-button>
      </div>
      <el-tree
        :data="glAreaData"
        node-key="id"
        :props="defaultProps"
        :highlight-current="true"
        :expand-on-click-node="false"
        ref="treeAreaTerminal"
        icon-class='fa fa-chevron-circle-right'
        :default-expanded-keys="[1, 0]"
        @node-click="onCurrentAreaChanged"
        :indent = '0'
      ></el-tree>
  </div>
</template>

<script>
import protoRoot from '@/proto/WsMsg.js'
import store from '@/store/store.js'
import { spliceData } from '@/utils/send.js'
import { sendSock } from '@/utils/websocket.js'
import { getToken } from '@/utils/auth.js'
import { Base64 } from 'js-base64'
import { WsCmd } from '@/config.js'
import { getFlagError } from '../../error'
import { Notify } from '../../utils/commUtil'
import * as Validate from '../../utils/validate.js'

export default {
  name: 'region',
  data () {
    return {
      areaData: [],
      newAreaName: '',
      newArea: {
        Id: 0,
        ParentId: 0,
        IdChain: '',
        title: '',
        Name: ''
      },
      defaultProps: {
        label: 'label',
        id: 'id',
        parentId: 'parentId',
        idChain: 'idChain',
        name: 'name',
        children: 'children'
      },
      currentArea: null,
      protoAreaAll: protoRoot.lookup('WsMsg.AreaGetAllOut'),
      protoAreaDel: protoRoot.lookup('WsMsg.AreaDelIn'),
      protoArea: protoRoot.lookup('WsMsg.Area'),
      protoAreaUpdateNameIn: protoRoot.lookup('WsMsg.AreaUpdateNameIn'),
      rules: { newAreaName: [{ required: true, validator: Validate.validateAreaName, trigger: 'blur' }] },
      disabled: true
    }
  },
  computed: {
    glAreaData () {
      return store.state.glAreaData
    },
    getDisabled () {
      if ( this.newAreaName === '根') {
        return true
      }
      return false
    },
  },
  created () {
  },
  mounted () {
    this.loadArea()
  },
  methods: {
    loadArea () {
      if (store.state.glAreaData.length > 0) {
        this.areaData = store.state.glAreaData
        return
      }
      let initialData = spliceData(0, 34, 0)
      sendSock(initialData, 34, serverData => {
        let zdata = []
        if (serverData.flag === 1) {
          const aMsg = this.protoAreaAll.decode(serverData.data)
          const decodeMsyopr = Base64.decode(getToken())
          let oprId = JSON.parse(decodeMsyopr).AreaId
          for (let i = 0; i < aMsg.Vec.length; i++) {
            if ((aMsg.Vec[i].ParentId !== oprId)) continue
            zdata.push({
              id: aMsg.Vec[i].Id,
              parentId: aMsg.Vec[i].ParentId,
              idChain: aMsg.Vec[i].IdChain,
              title: aMsg.Vec[i].Name,
              label: aMsg.Vec[i].Name,
              children: [],
              isDefaultExpanded: true
            })
            this.findChildNode(zdata[zdata.length - 1], aMsg.Vec)
            break
          }
        } else {
          Notify(getFlagError(serverData.flag), 'error')
        }
        store.commit('setglAreaData', zdata)
        this.areaData = zdata
      })
    },
    findChildNode (pNode, Vec) {
      for (let i = 0; i < Vec.length; i++) {
        if ((Vec[i].ParentId !== pNode.id) || (Vec[i].Id === 0)) continue
        pNode.children.push({
          id: Vec[i].Id,
          parentId: Vec[i].ParentId,
          idChain: Vec[i].IdChain,
          title: Vec[i].Name,
          label: Vec[i].Name,
          children: [],
          isDefaultExpanded: true
        })
        this.findChildNode(pNode.children[pNode.children.length - 1], Vec)
      }
    },
    deleteArea () {
      if (!this.currentArea) {
        Notify('请选择需要删除的节点', 'info')
        return
      }

      this.$confirm('删除区域将会删除其下所有的子区域、集中器、电表及数据,是否删除？', '退出提示', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => { // 确认
        let areaInfo = {
          Id: this.currentArea.id
        }
        let createProto = this.protoAreaDel.create(areaInfo)
        let encodeData = this.protoAreaDel.encode(createProto).finish()
        let initialData = spliceData(encodeData.length, WsCmd.areaDel, encodeData)
        sendSock(initialData, WsCmd.areaDel, serverData => {
          if (serverData.flag === 1) {
            Notify('删除成功', 'success')
            store.getters.deleteTreeData(this.currentArea.id, store.state.glAreaData)
            store.getters.deleteAreaTerData(this.currentArea.id)
            // 删除成功，清空选中节点的储存数据
            this.currentArea = []
          } else {
            Notify(getFlagError(serverData.flag), 'error')
          }
        })
      }).catch(action => { // 取消
        if ((action === 'cancel') || (action === 'close')) return
      })
    },
    // 选中节点触发
    onCurrentAreaChanged (data) {
      this.newAreaName = data.label
      this.currentArea = data
    },
    addArea () {
      if (this.currentArea) {
        if (!this.checkValue()) return
        let level = this.currentArea.idChain.match(/-/g).length - 1
        if (level >= 4) {
          this.$notify({
            title: '提示',
            message: '不能创建更多子区域',
            type: 'info',
            position: 'bottom-right'
          })
          return
        }
        let parentId = this.currentArea.id
        this.newArea.Id = this.getCorrentId(parentId, level)
        if (this.newArea.Id === -1) {
          this.$notify({
            title: '提示',
            message: '区域信息异常',
            type: 'error',
            position: 'bottom-right'
          })
          return
        }
        this.newArea.ParentId = parentId
        this.newArea.title = this.newAreaName
        this.newArea.Name = this.newAreaName
        this.newArea.IdChain = this.currentArea.idChain + this.newArea.Id + '-'
        let createProto = this.protoArea.create(this.newArea)
        let encodeData = this.protoArea.encode(createProto).finish()
        let initialData = spliceData(encodeData.length, 30, encodeData)
        sendSock(initialData, 30, serverData => {
          if (serverData.flag === 1) {
            Notify('添加成功', 'success')
            let currentId = this.currentArea.id
            store.getters.addTreeData(this.newArea, currentId)
            store.getters.addAreaTerData(this.newArea, currentId)
          } else {
            Notify(getFlagError(serverData.flag), 'error')
          }
        })
      } else {
        Notify('请选择一个区域', 'info')
      }
    },
    updateArea () {
      if (this.currentArea) {
        if (!this.checkValue()) return
        let areaInfo = {
          Id: this.currentArea.id,
          Name: this.newAreaName
        }
        let createProto = this.protoAreaUpdateNameIn.create(areaInfo)
        let encodeData = this.protoAreaUpdateNameIn.encode(createProto).finish()
        let initialData = spliceData(encodeData.length, 32, encodeData)
        sendSock(initialData, 32, serverData => {
          if (serverData.flag === 1) {
            store.getters.updateArea(areaInfo.Name, areaInfo.Id)
            store.getters.updateAreaTer(areaInfo.Name, areaInfo.Id)
            Notify('修改成功', 'success')
          } else {
            Notify(getFlagError(serverData.flag), 'error')
          }
        })
      } else {
        Notify('请选择一个区域', 'info')
      }
    },
    checkValue () {
      if (this.newAreaName === '') {
        Notify('区域名称不能为空', 'info')
        return false
      } else if (this.isAreaNameUsed(this.areaData)) {
        Notify('区域名称已被占用', 'info')
        return false
      }
      return true
    },
    isAreaNameUsed (pAreaData) {
      let idChain = this.currentArea.idChain
      for (let i = 0; i < pAreaData.length; i++) {
        if (pAreaData[i].label === this.newAreaName) {
          if ((pAreaData[i].idChain.indexOf(idChain) === 0) || (idChain.indexOf(pAreaData[i].idChain) === 0) || (pAreaData[i].idChain.length === idChain.length)) {
            return true
          }
        } else if ((pAreaData[i].children) && (pAreaData[i].children.length > 0)) {
          let state = this.isAreaNameUsed(pAreaData[i].children)
          if (state) return state
        }
      }
      return false
    },
    getCorrentId (pId, pLevel) {
      let occupyedId = []
      if ((this.currentArea.children) && this.currentArea.children.length > 0) {
        for (let i = 0; i < this.currentArea.children.length; i++) {
          occupyedId.push(this.currentArea.children[i].id)
        }
      }
      if (pLevel === 0) { // 第一级
        for (let i = 1; i < 10; i++) {
          if (occupyedId.indexOf(i) < 0) return i
        }
      } else { // 二级和之后
        for (let i = 1; i < 100; i++) {
          let tmpId = pId * 100 + i
          if (occupyedId.indexOf(tmpId) < 0) return tmpId
        }
      }
      return -1
    }
  }
}
</script>

<style lang='less'>
  @import "../../css/region.less";
</style>
