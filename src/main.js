import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css' // 加载elementui

import iView from 'iview'
import 'iview/dist/styles/iview.css' // 加载iview

import '@fortawesome/fontawesome-free/css/all.css' // 加载 fontawesome 字体图标库
import './css/main.css'
import './css/tool.css'

import VXETable from 'vxe-table'
import 'vxe-table/lib/index.css'

Vue.config.productionTip = false
Vue.use(VXETable)
Vue.use(ElementUI)
Vue.use(iView)

let v = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

export default v
