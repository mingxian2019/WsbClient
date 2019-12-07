import Vue from 'vue'
import Router from 'vue-router'
import { getToken } from '@/utils/auth'
import Login from '@/views/Login'
import { LoadingBar } from 'iview'
import protoRoot from '@/proto/WsMsg.js'
import { spliceData } from '@/utils/send.js'
import { sendSock } from '@/utils/websocket'
Vue.use(Router)

const router = new Router({
  routes: [{
    name: 'login',
    path: '/login',
    component: Login
  },
  {
    path: '/',
    component: () => import('@/views/Layout'),
    children: [{
      name: 'home',
      path: '/home',
      component: () => import('@/views/Home')
    },
    {
      name: 'file',
      path: '/file',
      meta: { label: '档案' },
      component: {
        render: c => c('router-view')
      },
      children: [
        {
          name: 'region',
          path: '/file/region',
          meta: { label: '区域管理' },
          component: () => import('@/views/Region')
        },
        {
          name: 'operator',
          path: '/file/operator',
          meta: { label: '操作员管理' },
          component: () => import('@/views/Operator')
        },
        {
          name: 'concentrantor',
          path: '/file/concentrantor',
          meta: { label: '集中器管理' },
          component: () => import('@/views/Concentrator')
        },
        {
          name: 'setJzq',
          path: '/file/concentrantor/setJzq',
          meta: { label: '集中器管理 - 参数设置' },
          component: () => import('@/views/SetJzq')
        },
        {
          name: 'meter',
          path: '/file/meter',
          meta: { label: '表计管理' },
          component: () => import('@/views/Meter')
        }
      ]
    },
    {
      name: 'readmeter',
      path: '/readmeter',
      meta: { label: '抄表' },
      component: {
        render: c => c('router-view')
      },
      children: [
        {
          name: 'inquiry',
          path: '/readmeter/inquiry',
          meta: { label: '抄表与查询' },
          component: () => import('@/views/ReadMeter')
        },
        {
          name: 'readMeterEx',
          path: '/readmeter/readMeterEx',
          meta: { label: '抄表异常管理' },
          component: () => import('@/views/ReadMeterEx')
        },
        {
          name: 'periodVal',
          path: '/readmeter/periodVal',
          meta: { label: '时段用量查询' },
          component: () => import('@/views/PeriodVal')
        }
      ]
    },
    {
      name: 'toll',
      path: '/toll',
      meta: { label: '收费' },
      component: {
        render: c => c('router-view')
      },
      children: [
        {
          name: 'prepay',
          path: '/toll/prepay',
          meta: { label: '预付费' },
          component: () => import('@/views/Prepay')
        },
        {
          name: 'payLogEx',
          path: '/toll/payLogEx',
          meta: { label: '充值异常管理' },
          component: () => import('@/views/PayLogEx')
        },
        {
          name: 'price',
          path: '/toll/price',
          meta: { label: '单价设置' },
          component: () => import('@/views/Price')
        },
        {
          name: 'payLogFee',
          path: '/toll/payLogFee',
          meta: { label: '缴费查询' },
          component: () => import('@/views/PayLogFee')
        },
        {
          name: 'payLogUsr',
          path: '/toll/payLogUsr',
          meta: { label: '收费查询' },
          component: () => import('@/views/PayLogUsr')
        }

      ]
    },
    {
      name: 'user',
      path: '/user',
      meta: { label: '用户管理' },
      component: {
        render: c => c('router-view')
      },
      children: [
        {
          name: 'purview',
          path: '/user/purview',
          meta: { label: '权限管理' },
          component: () => import('@/views/Purview')
        },
        {
          name: 'editPwd',
          path: '/user/editpwd',
          meta: { label: '修改密码' },
          component: () => import('@/views/EditPwd')
        },
        {
          name: 'sysConfig',
          path: '/user/sysConfig',
          meta: { label: '系统配置' },
          component: () => import('@/views/SysConfig')
        }
      ]
    },
    {
      name: 'cloudAccountInfo',
      path: '/CaInfo',
      meta: { label: '云账户管理' },
      component: {
        render: c => c('router-view')
      },
      children: [
        {
          name: 'basicInfo',
          path: '/CaInfo/basicInfo',
          meta: { label: '基本信息' },
          component: () => import('@/views/BasicInfo')
        },
        {
          name: 'cost',
          path: '/CaInfo/cost',
          meta: { label: '收支明细' },
          component: () => import('@/views/Cost')
        },
        {
          name: 'recharge',
          path: '/CaInfo/recharge',
          meta: { label: '充值' },
          component: () => import('@/views/recharge')
        },
        {
          name: 'rechargeRecord',
          path: '/CaInfo/rechargeRecord',
          meta: { label: '充值记录' },
          component: () => import('@/views/rechargeRecord')
        },
        {
          name: 'invoiceInquiry',
          path: '/CaInfo/invoiceInquiry',
          meta: { label: '开票进度查询' },
          component: () => import('@/views/invoiceInquiry')
        },
        {
          name: 'reorder',
          path: '/CaInfo/reorder',
          meta: { label: '重新开票申请记录' },
          component: () => import('@/views/reorder')
        }
      ]
    }]
  },
  {
    path: '/404/404',
    component: () => import('@/views/Error/404')
  },
  {
    path: '/forgetPW',
    component: () => import('@/views/ForgetPW')
  },
  {
    path: '/registered',
    component: () => import('@/views/Registered')
  },
  {
    path: '/pact',
    meta: { label: '七叶云服务协议' },
    component: () => import('@/views/PactAndState/pact')
  },
  {
    path: '/state',
    meta: { label: '七叶云隐私声明' },
    component: () => import('@/views/PactAndState/state')
  },
  {
    path: '/legalNotices',
    meta: { label: '七叶云法律声明' },
    component: () => import('@/views/PactAndState/legalNotices')
  },
  {
    path: '/help',
    meta: { label: '帮助' },
    component: () => import('@/views/Help')
  }]
})
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  }
  console.log(to.path)
  if (to.path === '/forgetPW') {
    next()
  }
  const token = getToken()
  if (!token) {
    if (to.path === '/registered') {
      return next()
    } else if (to.path === '/state') {
      return next()
    } else if (to.path === '/pact') {
      return next()
    } else if (to.path === '/legalNotices') {
      return next()
    }
    return next('/login')
  }
  LoadingBar.start()
   if (sessionStorage.getItem('state')&&sessionStorage.getItem('store')) {
      let loignIn=protoRoot.lookup('WsMsg.SysOprLoginIn')
      sessionStorage.removeItem('state')
      const SYSOPR = JSON.parse(Base64.decode(getToken()))
      let refresh = {
        WsId: 0,
        Mobile: SYSOPR.Mobile,
        Password: SYSOPR.Password
      }
      // 重新登录
      let createProto = loignIn.create(refresh)
      let encodeData = loignIn.encode(createProto).finish()
      let initialData = spliceData(encodeData.length, 15, encodeData)
      sendSock(initialData, 15, (serverData) => {
        if (serverData.flag === 1) {
          next()
        } else {
          this.$notify.error({
            title: '提示',
            message: '服务器繁忙',
            position: 'bottom-right'
          })
        }
      })
    }else{
      next()
    }
  
})

router.afterEach(route => {
  LoadingBar.finish()
})
export default router
