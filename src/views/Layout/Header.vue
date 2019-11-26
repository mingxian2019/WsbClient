<template>
  <div class="mheader hw100 clearfix ">
    <div class="mheader-logo">
      <img class='mheader-logo-img' src="../../../public/LOGO.jpg" alt>
      <div class='mheader-logo-title' id="js-title" @mouseover = 'showUser = true'>
        <h1 >当代力天物业</h1>
        <i class='el-icon-caret-bottom'></i>
        <ul class='mheader-logo-title-content' @mouseleave ="showUser = false" v-show = 'showUser'>
          <li class="menu-item"><router-link to='/CaInfo/basicInfo'>基本信息</router-link></li>
          <li class='menu-item fee' >
            <!-- <router-link to='/CaInfo/cost'>费用</router-link> -->
            <span class='fee-title' @click='controlFee' >费用</span>
            <ul v-show = 'setShowFee'  @mouseleave ="showFee = false">
              <li class='fee-content '>
                <div class='fee-content-item item-br'>
                  <span class='cost-label '>账户余额</span>
                  <span class='cost-content'> {{ balance }} </span>
                </div>
                <div class='fee-content-item item-r lastbm0 '>
                  <router-link class='const-link' to='/CaInfo/cost'>立即充值</router-link>
                  <router-link class='const-link lastbm0' to='/CaInfo/cost' style='color: #409EFF'>收支明细</router-link>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <div class="mheader-nav">
      <el-menu
        :default-active="activeIndex2"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#262626"
        text-color="#fff"
        active-text-color="#E7E065"
        :router='true'
        >
        <el-menu-item index="/home">首页</el-menu-item>
        <el-submenu v-for="first in rightsMenu" :key="first.id" :index="first.path" >
          <template slot="title" >
            <span>{{ first.authName }}</span>
          </template>
          <el-menu-item class="el-submenu-chirld" v-for="second in first.children" :key="second.id " :index="`/${first.path}/${second.path}`" >
            {{ second.authName }}
          </el-menu-item>
        </el-submenu>
        <el-submenu index='3'>
          <template slot="title"><i class="el-icon-user-solid"></i><span>{{ oprName }}</span></template>
          <el-menu-item class="el-submenu-chirld"  @click="quit">注销登录</el-menu-item>
          <el-menu-item class="el-submenu-chirld" index="/user/editpwd">修改密码</el-menu-item>
          <el-menu-item class="el-submenu-chirld" index="/user/purview">权限管理</el-menu-item>
          <el-menu-item class="el-submenu-chirld" index="/user/sysConfig">抄表服务配置</el-menu-item>
        </el-submenu>
        <!-- <el-submenu index='4'>
          <template slot="title"><i class="el-icon-question"></i></template>
          <el-menu-item index="">帮助</el-menu-item>
          <el-menu-item index="">关于</el-menu-item>
        </el-submenu> -->
        <el-menu-item index='/help' ><i class="el-icon-question"></i></el-menu-item>
        <el-menu-item index='5' >
          <el-badge :value="2" :max="99">
            <i class="el-icon-message-solid"></i>
          </el-badge>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
import { getToken, removeToken } from '@/utils/auth'
import { websocketclose, sendSock } from '@/utils/websocket'
import protoRoot from '@/proto/WsMsg.js'
import { spliceData } from '@/utils/send.js'
import { WsCmd } from '@/config.js'
import { Base64 } from 'js-base64'
import { getAuthName, getMenuItemAuthName, getMenuItemPath, getMenuItemCount, getPath, menu } from '@/utils/menu.js'
import Store from '@/store/store'
export default {
  name: 'APPHeader',
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1',
      url: '../../../public/LOGO.jpg',
      isCollapse: true,
      oprName: '',
      Mobile: '',
      showUser: false,
      showFee: false,
      protoRoleRightGetIn: protoRoot.lookup('WsMsg.RoleRightGetIn'),
      roleRightGetMsgOut: protoRoot.lookup('WsMsg.RoleRightGetOut'),
      rightsMenu: [],
      balance: '999, 999, 999'
    }
  },
  created () {
    this.loadUser()
  },
  computed: {
    setShowFee () {
      return this.showFee
    }
  },
  mounted () {

  },
  methods: {
    handleSelect (key, keyPath) {
    },
    handleOpen (key, keyPath) {
    },
    handleClose (key, keyPath) {
    },
    loadUser () {
      const SYSOPR = JSON.parse(Base64.decode(getToken()))
      this.oprName = SYSOPR.Name
      this.Mobile = SYSOPR.Mobile
      let roleRightGetIn = {
        RoleId: SYSOPR.RoleId
      }
      let createProto = this.protoRoleRightGetIn.create(roleRightGetIn)
      let encodeData = this.protoRoleRightGetIn.encode(createProto).finish()
      let initialData = spliceData(encodeData.length, WsCmd.roleRightGet, encodeData)
      sendSock(initialData, WsCmd.roleRightGet, serverData => {
        const MESBODY = this.roleRightGetMsgOut.decode(serverData.data)
        if (serverData.flag > 0) {
        console.log(MESBODY)
        this.getMenu(MESBODY)
        }else{
           this.$notify.error({
            title: '提示',
            message: '服务器繁忙！ 请稍后重试',
            position: 'bottom-right'
          })
        }
      })
    },
    quit () {
      this.$confirm('确定退出登录吗？', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => { // 确认
        // 清除登录状态
        // sessionStorage.removeItem('store')
        sessionStorage.clear()
        removeToken()
        websocketclose()

        // 跳转到登录页
        this.$router.replace('/login')
        window.location.reload()
      }).catch(() => { // 取消
        this.$notify.info({
          message: '已取消退出',
          position: 'bottom-right'
        })
      })
    },
    show () {
    },
    // 获取权限菜单
    getMenu (getMsgOut) {
      const roleRight = getMsgOut.Vec
      // let binRight = null
      let hasRight = 0
      const SYSOPR = JSON.parse(Base64.decode(getToken()))
      for (let i = 0; i < menu.length; i++) {
        if (SYSOPR.RoleId === 0) {
          hasRight = 65535
        } else {
          let module = ''
          module = roleRight.find(function (element) {
            return element.ModuleId === i
          })
          if (!module) {
            continue
          }
          hasRight = module.HasRight
        }
        if (hasRight > 0) {
          let menuObj = {
            id: i,
            authName: getAuthName(i),
            path: getPath(i),
            children: []
          }

          this.rightsMenu.push(menuObj)
          let menuCount = getMenuItemCount(i)

          for (let j = 0; j < menuCount; j++) {
            if ((hasRight & Math.pow(2, j)) > 0) {
              menuObj.children.push({
                id: Math.pow(2, j),
                authName: getMenuItemAuthName(i, Math.pow(2, j)),
                path: getMenuItemPath(i, Math.pow(2, j))
              })
            }
          }
        }
      }
      Store.commit('setRoleRights', this.rightsMenu)
    },
    controlFee () {
      this.showFee = true
    }
  }
}
</script>

<style lang="less" >
@import "../../css/layout-header.less";
</style>
