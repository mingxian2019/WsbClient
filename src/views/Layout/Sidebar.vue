<template>
  <div class="sidebar">
    <div class="sidebar-top">
      <span class="sidebar-top-title">区域信息</span>
      <div class="sidebar-top-checkbox">
        <el-checkbox label="是否显示终端" v-model="showTerminal" size="mini"></el-checkbox>
      </div>
    </div>
    <div class="sidebar-content">
      <el-tree
        :data="mainTreeData"
        :props="defaultProps"
        @node-click="handleNodeClick"
        node-key="id"
        highlight-current
        default-expand-all
        icon-class="el-icon-circle-plus-outline"
        :expand-on-click-node="false"
        ref="treeAreaTerminal"
        :filter-node-method="filterTerminal"
        :indent="0"
      >
        <span slot-scope="{ node, data }">
          <i v-if="data.visiable" class="el-icon-office-building mainTree-icon" aria-hidden="true"></i>
          <i v-else class="el-icon-odometer mainTree-icon" aria-hidden="true"></i>
          <span mainTree-label>{{ node.label }}</span>
        </span>
      </el-tree>
    </div>
  </div>
</template>

<script>
import store from '@/store/store.js'
import protoRoot from '@/proto/WsMsg.js'
import { spliceData } from '@/utils/send.js'
import { sendSock } from '@/utils/websocket.js'
import { getToken } from '@/utils/auth.js'
import * as Config from '@/config.js'

export default {
  data () {
    return {
      treeData: [],
      showTerminal: true,
      defaultProps: {
        children: 'children',
        label: 'label',
        name: 'name',
        id: 'id',
        parentId: 'parentId',
        visiable: 'visiable'
      },
      areaTreeIn: protoRoot.lookup('WsMsg.AreaDelIn'),
      areaTreeOut: protoRoot.lookup('WsMsg.AreaTerminalTreeGetOut'),
      areaTreeInData: { Id: 1 }, // 区域id
      protofeePriceGetOut: protoRoot.lookup('WsMsg.FeePriceGetOut')
    }
  },
  computed: {
    mainTreeData () {
      return store.state.glAreaTerData
    }
  },
  watch: {
    // 控制是否显示终端（集中器）
    showTerminal () {
      this.showTerminal
        ? this.$refs.treeAreaTerminal.filter()
        : this.$refs.treeAreaTerminal.filter(false)
    }
  },
  mounted () {
    this.loadAreaTree()
  },
  methods: {
    // 点击节点触发
    handleNodeClick (data) {
      store.commit('setAreaTerSelect', data)
    },
    // 筛选终端
    filterTerminal (value, data) {
      return data.visiable !== value
    },
    // 添加终端
    appendTerminal (pVec, pKey) {
      for (let i = 0; i < pVec.length; i++) {
        if (pVec[i].Addr > 168884986026393) continue
        if (pVec[i].AreaId === pKey) {
          this.$refs.treeAreaTerminal.append(
            {
              visiable: false,
              label: pVec[i].Name,
              addr: pVec[i].Addr,
              areaId: pVec[i].AreaId,
              protocol: pVec[i].Protocol,
              fes: pVec[i].Fes,
              seq: 0,
              name: pVec[i].Name,
              isTer: true,
              children: []
            },
            pKey
          )
        }
      }
    },
    // 添加区域
    appendArea (pVec, pKey) {
      for (let i = 0; i < pVec.length; i++) {
        if (pVec[i].AreaId === pKey) continue
        if (this.$refs.treeAreaTerminal.getNode(
          { id: pVec[i].AreaId }) !== null) continue
        if (pVec[i].AreaParentId === pKey) {
          this.$refs.treeAreaTerminal.append(
            {
              visiable: true,
              label: pVec[i].AreaName,
              name: pVec[i].AreaName,
              id: pVec[i].AreaId,
              parentId: pVec[i].AreaParentId,
              children: []
            },
            pKey
          )
          this.appendArea(pVec, pVec[i].AreaId)
          if (this.showTerminal) {
            this.appendTerminal(pVec, pVec[i].AreaId)
          }
        }
      }
    },
    // 加载区域树
    loadAreaTree () {
      console.log(this.$refs)
      this.areaTreeInData.Id = getToken().AreaId
      let createProto = this.areaTreeIn.create(this.areaTreeInData)
      let encodeData = this.areaTreeIn.encode(createProto).finish()
      let initialData = spliceData(encodeData.length, 45, encodeData)
      setTimeout(() => {
        sendSock(initialData, 45, serverData => {
          const aMsg = this.areaTreeOut.decode(serverData.data)
          store.commit('setOriginal', aMsg.Vec)
          this.appendArea(aMsg.Vec, 0)
          localStorage.setItem('AREATREE', JSON.stringify(this.treeData))
          this.getFeePrice()
        })
      }, 200)
    },
    //加载单价信息
    getFeePrice () {
      let initialData = spliceData(0, Config.WsCmd.feePriceGet, null)
      sendSock(initialData, Config.WsCmd.feePriceGet, serverData => {
        if (serverData.flag === 1) {
          let aMsg = this.protofeePriceGetOut.decode(serverData.data)
          let feePriceArray = []
          for (let i = 0; i < aMsg.Vec.length; i++) {
            let price = aMsg.Vec[i].Price
            let alias = (aMsg.Vec[i].Alias == '') ?
                        Config.getUserTypeValue(aMsg.Vec[i].Type) : aMsg.Vec[i].Alias

            if (aMsg.Vec[i].Type <= 5) {
              feePriceArray.push({
                id: i,
                Type: aMsg.Vec[i].Type,
                Fp1: ((price & 0xffff) / 10000.00).toFixed(4),
                Fp2: (((price / 65536) & 0xffff) / 10000.00).toFixed(4),
                Fp3: (((price / 4294967296) & 0xffff) / 10000.00).toFixed(4),
                Fp4: (((price / 281474976710656) & 0xffff) / 10000.00).toFixed(4),
                Alias: alias
              })
            } else {
              feePriceArray.push({
                id: i,
                Type: aMsg.Vec[i].Type,
                Fp1: 0.0000,
                Fp2: 0.0000,
                Fp3: (((price / 4294967296) & 0xffff) / 10000.00).toFixed(4),
                Fp4: 0.0000,
                Alias: alias
              })
            }
          }
          store.commit("setFeePrice", feePriceArray)
        } else {
          Notify(getFlagError(serverData.flag), 'error')
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
@import "../../css/layout-sidebar.less";
</style>
