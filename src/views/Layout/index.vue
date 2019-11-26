<template>
  <div class="main clearfix">
    <el-header>
      <APPHeader/>
    </el-header>
    <el-container id="js_container">
      <el-aside class="sidebarBox" id='js_sidebar'>
        <AppSidebar/>
      </el-aside>
      <div class="resize" id='js_resize'></div>
      <el-main id="js_mian">
        <div class="el-main-top clearfix">
          <AppBreadcrumb :list="getBreadcrumbs()"></AppBreadcrumb>
          <span class='el-main-top-currentArea'> {{ title }} <span style="color:#409EFF;font-weight:700">{{ currentAreaMonitor }}</span></span>
        </div>
        <keep-alive>
          <div class="card">
            <router-view></router-view>
          </div>
        </keep-alive>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import store from '@/store/store.js'
import APPHeader from './Header'
import AppBreadcrumb from '../../components/AppBreadcrumd'
import AppSidebar from './Sidebar'
// import { initWebSocket } from '@/utils/websocket'
export default {
  data () {
    return {
      title:'',
      currentArea: '',
    }
  },
  computed: {
    currentAreaMonitor () {
      if (store.state.currentAreaTerNode.label) {
        if (store.state.currentAreaTerNode.visiable) {
          this.title="当前区域："
          this.currentArea=`${store.state.currentAreaTerNode.label}`
          return this.currentArea
        }
        this.title="当前集中器："
        this.currentArea = `${store.state.currentAreaTerNode.label}`
        return this.currentArea
      }
      this.currentArea = ''
      return this.currentArea
    }
  },
  created () {

    // 断线重连
    // let LOGININFO = window.sessionStorage.getItem('LOGININFO');
    // if (LOGININFO) {
    //   initWebSocket()
    // }
  },
  mounted () {
    let jsResize = document.getElementById('js_resize')
    let jsSidebar = document.getElementById('js_sidebar')
    let jsMian = document.getElementById('js_mian')
    let jsContainer = document.getElementById('js_container')
    let tt = document.body.clientHeight || document.documentElement.clientHeight;
    jsContainer.style.height= tt-60+ 'px'; //动态设置HTML元素高度
    jsResize.onmousedown = function (e) {
      let startX = e.clientX
      jsResize.jsSidebar = jsResize.offsetLeft
      document.onmousemove = function (e) {
        let endX = e.clientX
        let moveLen = jsResize.jsSidebar + (endX - startX)
        let maxT = 700
        if (moveLen < 300) moveLen = 300
        if (moveLen > maxT - 300) moveLen = maxT - 300

        jsResize.style.left = moveLen
        jsSidebar.style.width = moveLen + 'px'
        jsMian.style.width = (jsContainer.clientWidth - moveLen - 5) + 'px'
      }
      document.onmouseup = function (evt) {
        document.onmousemove = null
        document.onmouseup = null
        jsResize.releaseCapture && jsResize.releaseCapture()
      }
      jsResize.setCapture && jsResize.setCapture()
      return false
    }
    window.onresize = function temp() {
      let jsContainer = document.getElementById('js_container')
      let tt = document.body.clientHeight || document.documentElement.clientHeight;
      jsContainer.style.height= tt-60+ 'px'; //动态设置HTML元素高度
    };
  },
  components: {
    APPHeader,
    AppBreadcrumb,
    AppSidebar
  },
  methods: {
    // 获取面包屑动态参数
    getBreadcrumbs () {
      const breads = []
      this.$route.matched.slice(1).forEach(route => {
        breads.push({ label: route.meta.label })
      })
      return breads
    }
  }
}
</script>

<style lang="less" >
@import "../../css/laout.less";
</style>
