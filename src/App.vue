<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import protoRoot from '@/proto/WsMsg.js'
import { spliceData } from '@/utils/send.js'
import { websocketclose, initWebSocket, sendSock } from '@/utils/websocket'
import { getToken } from '@/utils/auth'
export default {
  provide(){
    return{
      reload:this.reload
    }
  },
  data () {
    return {
      loignIn: protoRoot.lookup('WsMsg.SysOprLoginIn'),
      loginOut: protoRoot.lookup('WsMsg.SysOprLoginOut'),
      isRouterAlive:true
    }
  },
  created () {
    // 在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem('store')) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))))
    }
    // 在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener('beforeunload', (event) => {
      if (sessionStorage.getItem('LOGININFO')) {
    // event.returnValue = "\o/"
          sessionStorage.setItem('store', JSON.stringify(this.$store.state))
          websocketclose()
          sessionStorage.setItem('state', 'Refresh')
      }
    })
  },
  destroyed () {
    // websocketclose()
  },
  methods:{
    reload(){
      this.isRouterAlive=false
      this.$nextTick(function(){
        this.isRounterAlive=true
      })
    }
  }
}
</script>

<style lang='less'>
  #app{
    height: 100%;
  }
  .el-popover {
  min-width: 80px;
  .el-radio-group{
    .el-radio{
      display: block;
      margin-bottom: 10px;
    }
  }
  .tBtns{
    .el-button:first-child {
      color: #999;
    }
  }
}
</style>
