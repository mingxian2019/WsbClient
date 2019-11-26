import Vue from 'vue'
import Vuex from 'vuex'
// import createPersistedPlugin from './createPersistedPlugin.js'
// const persistedPlugin = createPersistedPlugin()
Vue.use(Vuex)

const Store = new Vuex.Store({
  state: {
    glAreaTerData: [], // 左树
    glAreaData: [], // 区域树
    currentTerAddr: null,
    currentAreaTerNode: {},
    original: [], // 原始数据
    glSysOprData: [], // 操作员
    glRoleRight: [], // 角色权限
    glSysOpr: null,
    glFeePrice: [],
  },
  mutations: {
    setSysOpr (state, data) {
      state.glSysOpr = data
    },
    setglAreaData (state, treeData) {
      console.log('区域树')
      state.glAreaData = treeData
    },
    setAreaTerData (state, infoTreeData) {
      console.log('左树')
      state.glAreaTerData = infoTreeData
    },
    setOriginal (state, originalData) {
      state.original = originalData
    },
    setOperator (state, operatorData) {
      state.glSysOprData = operatorData
    },
    setAreaTerSelect (state, operatorData) {
      state.currentAreaTerNode = operatorData
    },
    setRoleRights (state, roleRightsData) {
      state.glRoleRight = roleRightsData
    },
    setCurrentTerAddr (state, pTerminal) {
      state.currentTerAddr = pTerminal
    },
    setFeePrice (state, pFeePrice) {
      state.glFeePrice = pFeePrice
    },
  },
  // plugins: [persistedPlugin],
  getters: {
    // 添加左树缓存
    addAreaTerData: (state) => (pArea, currentId, pVecData) => {
      if (pVecData === undefined) {
        pVecData = state.glAreaTerData
      }
      let areaTmp = {
        label: pArea.Name,
        id: pArea.Id,
        parentId: pArea.ParentId,
        name: pArea.Name,
        visiable: true,
        children: []
      }
      if (currentId === 0) {
        pVecData.push(areaTmp)
        return
      }
      for (let i = 0; i < pVecData.length; i++) {
        if (pVecData[i].isTer) continue
        let data = pVecData[i]
        if (data.id === currentId) {
          if (!data.children) {
            data.children = []
          }
          data.children.push(areaTmp)
          return
        } else if (data.children) {
          let state = Store.getters.addAreaTerData(pArea, currentId, data.children)
          if (state) return state
        }
      }
    },
    // 修改左树名称缓存
    updateAreaTer: (state) => (pName, pCurrentId, pVecData) => {
      if (pVecData === undefined) {
        pVecData = state.glAreaTerData
      }
      Store.getters.updateArea(pName, pCurrentId, pVecData)
    },
    updateTerminalName: (state) => (pName, pAddr, pVecData) => {
      if (pVecData === undefined) {
        pVecData = state.glAreaTerData
      }
      for (let i = 0; i < pVecData.length; i++) {
        if (pVecData[i].isTer) {
          if (pVecData[i].addr === pAddr) {
            pVecData[i].name = pName
            pVecData[i].label = pName
            return true
          }
        } else if ((pVecData[i].children) && (pVecData[i].children.length > 0)) {
          let state = Store.getters.updateTerminalName(pName, pAddr, pVecData[i].children)
          if (state) break
        }
      }
    },
    // 添加区域管理缓存
    addTreeData: (state) => (pArea, currentId, pVecData) => {
      if (pVecData === undefined) {
        pVecData = state.glAreaData
      }
      let areaTmp = {
        label: pArea.Name,
        id: pArea.Id,
        parentId: pArea.ParentId,
        idChain: pArea.IdChain,
        name: pArea.Name,
        children: []
      }
      for (let i = 0; i < pVecData.length; i++) {
        if (pVecData[i].id === currentId) {
          if (!pVecData[i].children) {
            pVecData[i].children = []
          }
          pVecData[i].children.push(areaTmp)
          return true
        } else if (pVecData[i].children) {
          let state = Store.getters.addTreeData(pArea, currentId, pVecData[i].children)
          if (state) return state
        }
      }
    },
    // 修改区域管理缓存
    updateArea: (state) => (pName, pCurrentId, pVecData) => {
      if (pVecData === undefined) {
        pVecData = state.glAreaData
      }
      for (let i = 0; i < pVecData.length; i++) {
        if (pVecData[i].isTer !== undefined) continue
        if (pVecData[i].id === pCurrentId) {
          pVecData[i].name = pName
          pVecData[i].label = pName
          return
        } else if ((pVecData[i].children) && (pVecData[i].children.length > 0)) {
          Store.getters.updateArea(pName, pCurrentId, pVecData[i].children)
        }
      }
    },
    // 删除区域管理缓存
    deleteTreeData: (state) => (pId, pVecData) => {
      if (pVecData === undefined) {
        pVecData = state.glAreaData
      }
      for (let i = 0; i < pVecData.length; i++) {
        var data = pVecData[i]
        if (data.id === pId) {
          pVecData.splice(i, 1)
          return
        } else if ((data.children) && (data.children.length > 0)) {
          Store.getters.deleteTreeData(pId, data.children)
        }
      }
    },
    // 删除左树缓存
    deleteAreaTerData: (state) => (pId, pVecData) => {
      if (pVecData === undefined) {
        pVecData = state.glAreaTerData
      }
      for (let i = 0; i < pVecData.length; i++) {
        if (pVecData[i].id === pId) {
          pVecData.splice(i, 1)
          return
        } else if ((pVecData[i].children) && (pVecData[i].children.length > 0)) {
          Store.getters.deleteAreaTerData(pId, pVecData[i].children)
        }
      }
    },
    // 添加左树的终端缓存
    addTerminalData: (state) => (pTerminal, pVecData) => {
      if (pVecData === undefined) {
        pVecData = state.glAreaTerData
      }
      for (let i = 0; i < pVecData.length; i++) {
        if (pVecData[i].isTer) continue
        if (pVecData[i].id === pTerminal.areaId) {
          if (!pVecData[i].children) {
            pVecData[i].children = []
          }
          pTerminal.seq = 0
          pVecData[i].children.push(pTerminal)
          return
        } else if (pVecData[i].children && pVecData[i].children.length > 0) {
          Store.getters.addTerminalData(pTerminal, pVecData[i].children)
        }
      }
    },
    // 删除左树的终端缓存
    delTerminalData: (state) => (pTerminal, pVecData) => {
      if (pVecData === undefined) {
        pVecData = state.glAreaTerData
      }
      for (let i = 0; i < pVecData.length; i++) {
        if ((pVecData[i].addr) && (pVecData[i].addr === pTerminal.addr)) {
          pVecData.splice(i, 1)
          return
        } else if (pVecData[i].children && pVecData[i].children.length > 0) {
          Store.getters.delTerminalData(pTerminal, pVecData[i].children)
        }
      }
    },
    // 修改左树缓存
    upDataMainTree: (state) => (pArea, pCurrentId, pVecData) => {
      if (pVecData === undefined) {
        pVecData = state.glAreaTerData
      }
      if (pCurrentId === 0) {
        this.$message({ message: '无法修改根级区域', type: 'success' })
      }
      for (let i = 0; i < pVecData.length; i++) {
        if (pVecData[i].areaId === pCurrentId) {
          pVecData[i].Name = pArea.Name
          return
        } else if (pVecData[i].children) {
          Store.getters.addAreaTerData(pArea, pCurrentId, pVecData[i].children)
          return
        }
      }
    },
    // 获取区域名称信息
    getAreaNameById: (state) => (pId, pVecData) => {
      if (pVecData === undefined) {
        pVecData = state.glAreaTerData
      }
      let areaName = ''
      for (let i = 0; i < pVecData.length; i++) {
        if (pVecData[i].isTer) continue
        if (pVecData[i].id === pId) {
          areaName = pVecData[i].name
          break
        } else if ((pVecData[i].children) && (pVecData[i].children.length > 0)) {
          areaName = Store.getters.getAreaNameById(pId, pVecData[i].children)
          if (areaName.length > 0) break
        }
      }
      return areaName
    },
    // 获取集中器 fes 信息
    getTerminalFesByAddr: (state) => (pAddr, pVecData) => {
      if (pVecData === undefined) {
        pVecData = state.glAreaTerData
      }
      for (let i = 0; i < pVecData.length; i++) {
        if (pVecData[i].isTer) {
          if (pVecData[i].addr === pAddr) {
            return pVecData[i].fes
          }
        } else if ((pVecData[i].children) && (pVecData[i].children.length > 0)) {
          let fes = Store.getters.getTerminalFesByAddr(pAddr, pVecData[i].children)
          if (fes !== undefined) return fes
        }
      }
    },
    // 获取集中器 seq 信息
    getTerminalSeqByAddr: (state) => (pAddr, pVecData) => {
      if (pVecData === undefined) {
        pVecData = state.glAreaTerData
      }
      for (let i = 0; i < pVecData.length; i++) {
        if (pVecData[i].isTer) {
          if (pVecData[i].addr === pAddr) {
            let seq = pVecData[i].seq & 0x0f
            pVecData[i].seq = seq + 1
            return seq
          }
        } else if ((pVecData[i].children) && (pVecData[i].children.length > 0)) {
          return Store.getters.getTerminalSeqByAddr(pAddr, pVecData[i].children)
        }
      }
    },
    // 修改电价信息
    updateFeePrice: (state) => (pPrice, pVecData) => {
      if (pVecData === undefined) {
        pVecData = state.glFeePrice
      }
      for (let i = 0; i < pVecData.length; i++) {
        if (pPrice.Type === pVecData[i].Type) {
          pVecData[i] = pPrice
        }
      }
    },
    // 获取电价名称
    getFeeNameByUserType: (state) => (pType, pConfig) => {
      for (let i = 0; i < state.glFeePrice.length; i++) {
        if (state.glFeePrice[i].Type === pType) {
          return state.glFeePrice[i].Alias
        }
      }

      return pConfig.getUserTypeValue(pType)
    },
    // 获取电价
    getFeePriceByUserType: (state) => (pType, pConfig) => {
      for (let i = 0; i < state.glFeePrice.length; i++) {
        if (state.glFeePrice[i].Type === pType) {
          return state.glFeePrice[i].Fp3
        }
      }
      return -1
    },
    // 获取四种电价
    getFeePrice4ByUserType: (state) => (pType, pConfig) => {
      for (let i = 0; i < state.glFeePrice.length; i++) {
        if (state.glFeePrice[i].Type === pType) {
          return [state.glFeePrice[i].Fp1, state.glFeePrice[i].Fp2,
            state.glFeePrice[i].Fp3, state.glFeePrice[i].Fp4]
        }
      }
      return []
    },
    // 获取当前左树区域id
    getCurrentAreaId: (state) => (pType, pConfig) => {
      if (state.currentAreaTerNode.id !== undefined) {
        return state.currentAreaTerNode.id
      } else if (state.currentAreaTerNode.areaId !== undefined) {
        return state.currentAreaTerNode.areaId
      }
      return -1
    }
  },
  actions: {
    setglAreaData (context, data) {
      context.commit('setglAreaData', data)
    },
    setAreaTerData (context, data) {
      context.commit('setAreaTerData', data)
    },
    setFeePrice (context, data) {
      context.commit('setFeePrice', data)
    }
  }
})

export default Store
