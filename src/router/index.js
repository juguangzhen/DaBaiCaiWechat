import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/components/home'
// import User from '@/components/user'
// import Collect from '@/components/collect'
// import Basket from '@/components/basket'
// import Login from '@/components/login'
// import CommodityType from '@/components/commodity/CommodityType.vue'
// import GoodsDetails from '@/components/commodity/CommodityDetails.vue'
// import MyAccount from '@/components/account/MyAccount.vue'
// import WechatRecharge from '@/components/account/WechatRecharge.vue'
// import Invoice from '@/components/account/invoice.vue'
// import InoviceHistory from '@/components/account/InoviceHistory.vue'
// import HistoryOrder from '@/components/order/HistoryOrder.vue'
// import OrderDetail from '@/components/order/OrderDetail.vue'
// import ManageAddress from '@/components/address/ManageAddress.vue'
// import SelectAddress from '@/components/address/SelectAddress.vue'
// import EditAddress from '@/components/address/EditAddress.vue'
// import MyInformation from '@/components/user/MyInformation.vue'
// import AccountAndSafe from '@/components/user/AccountAndSafe.vue'
// import ChangePassWord from '@/components/user/ChangePassWord.vue'
// import ChangePhoneNumber from '@/components/user/ChangePhoneNumber.vue'
// import CompleteInfo from '@/components/user/CompleteInfo.vue'
// import ConsumeDetail from '@/components/account/ConsumeDetail.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home/commodityType'
    },
    {
      path: '/login',
      component: resolve => require(['@/components/login'], resolve)
    },
    {
      path: '/home',
      component: resolve => require(['@/components/home'], resolve),
      children: [{
        path: '',
        redirect: '/home/commodityType'
      },
      {
        path: 'commodityType',
        name: 'commodityType',
        component: resolve => require(['@/components/commodity/CommodityType.vue'], resolve),
        meta: {
          keepAlive: true // 需要被缓存
        }
      },
      {
        path: 'user',
        name: 'user',
        component: resolve => require(['@/components/user'], resolve)
      },
      {
        path: 'collect',
        name: 'collect',
        component: resolve => require(['@/components/collect'], resolve)
      }]
    },
    {
      path: '/basket/:idOrder',
      name: 'basket',
      component: resolve => require(['@/components/basket'], resolve)
    },
    {
      path: '/GoodsDetails/:id',
      name: 'GoodsDetails',
      component: resolve => require(['@/components/commodity/CommodityDetails.vue'], resolve),
      meta: {
        keepAlive: false // 需要被缓存
      }
    },
    {
      path: '/myAccount',
      name: 'myAccount',
      component: resolve => require(['@/components/account/MyAccount.vue'], resolve)
    },
    {
      path: '/historyOrder',
      name: 'historyOrder',
      component: resolve => require(['@/components/order/HistoryOrder.vue'], resolve),
      meta: {
        // keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/manageAddress',
      name: 'manageAddress',
      component: resolve => require(['@/components/address/ManageAddress.vue'], resolve)
    },
    {
      path: '/selectAddress/:idUserAddrMgr/:idOrder',
      name: 'selectAddress',
      component: resolve => require(['@/components/address/SelectAddress.vue'], resolve)
    },
    {
      path: '/editAddress/:idUserAddrMgr',
      name: 'editAddress',
      component: resolve => require(['@/components/address/EditAddress.vue'], resolve)
    },
    {
      path: '/accountAndSafe',
      name: 'accountAndSafe',
      component: resolve => require(['@/components/user/AccountAndSafe.vue'], resolve)
    },
    {
      path: '/myInformation',
      name: 'myInformation',
      component: resolve => require(['@/components/user/MyInformation.vue'], resolve)
    },
    {
      path: '/completeInfo',
      name: 'completeInfo',
      component: resolve => require(['@/components/user/CompleteInfo.vue'], resolve)
    },
    {
      path: '/changePassWord',
      name: 'changePassWord',
      component: resolve => require(['@/components/user/ChangePassWord.vue'], resolve)
    },
    {
      path: '/changePhoneNumber',
      name: 'changePhoneNumber',
      component: resolve => require(['@/components/user/ChangePhoneNumber.vue'], resolve)
    },
    {
      path: '/wechatRecharge',
      name: 'wechatRecharge',
      component: resolve => require(['@/components/account/WechatRecharge.vue'], resolve)
    },
    {
      path: '/invoice',
      name: 'invoice',
      component: resolve => require(['@/components/account/invoice.vue'], resolve)
    },
    {
      path: '/inoviceHistory',
      name: 'inoviceHistory',
      component: resolve => require(['@/components/account/InoviceHistory.vue'], resolve)
    },
    {
      path: '/consumeDetail',
      name: 'consumeDetail',
      component: resolve => require(['@/components/account/ConsumeDetail.vue'], resolve)
    },
    {
      path: '/orderDetail/:id',
      name: 'orderDetail',
      component: resolve => require(['@/components/order/OrderDetail.vue'], resolve)
    }
  ]
})
