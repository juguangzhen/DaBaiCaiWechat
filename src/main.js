// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import store from './store'
import router from './router'
import api from './api/index'
import utils from './utils/index.js'
import wx from 'weixin-js-sdk'
import echarts from 'echarts'

import { BusPlugin, ToastPlugin, AlertPlugin } from 'vux'

FastClick.attach(document.body)

Vue.prototype.$api = api
Vue.prototype.wx = wx
Vue.prototype.$utils = utils
Vue.prototype.echarts = echarts
Vue.config.productionTip = false

/** fundebug config */
var fundebug = require('fundebug-javascript')
fundebug.apikey = 'be6ed74ef9e2614e314a6a24ae84e76b90e917270751aef770cab348362235c6'
fundebug.releasestage = 'test'
function formatComponentName (vm) {
  if (vm.$root === vm) return 'root'
  var name = vm._isVue ? (vm.$options && vm.$options.name) || (vm.$options && vm.$options._componentTag) : vm.name
  return (name ? 'component <' + name + '>' : 'anonymous component') + (vm._isVue && vm.$options && vm.$options.__file ? ' at ' + (vm.$options && vm.$options.__file) : '')
}

Vue.config.errorHandler = function (err, vm, info) {
  var componentName = formatComponentName(vm)
  var propsData = vm.$options && vm.$options.propsData

  fundebug.notifyError(err, {
    metaData: {
      componentName: componentName,
      propsData: propsData,
      info: info
    }
  })
}

/* eslint-disable no-new */
// simple history management
let methods = ['push', 'go', 'replace', 'forward', 'back']
methods.forEach(key => {
  let method = router[key].bind(router)
  router[key] = function (...args) {
    method.apply(null, args)
  }
})
const history = window.sessionStorage
// history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)

router.beforeEach(function (to, from, next) {
  const toIndex = history.getItem(to.path)
  const fromIndex = history.getItem(from.path)
  // console.log('to:' + toIndex)
  // console.log('from:' + fromIndex)
  if (toIndex) {
    if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
      store.commit('updateDirection', {direction: 'forward'})
    } else {
      store.commit('updateDirection', {direction: 'reverse'})
    }
  } else {
    ++historyCount
    history.setItem('count', historyCount)
    to.path !== '/' && history.setItem(to.path, historyCount)
    store.commit('updateDirection', {direction: 'forward'})
  }

  if (/\/http/.test(to.path)) {
    let url = to.path.split('http')[1]
    window.location.href = `http${url}`
  } else {
    next()
  }
})
// function addEvent (e) {
//   e.preventDefault()
// }
router.afterEach(function (to, from, next) {
  if (router.currentRoute.name === 'commodityType') {
    if (router.currentRoute.query.token) {
      sessionStorage.setItem('myken', router.currentRoute.query.token)
    }
    // document.body.addEventListener('touchmove', addEvent, false)
    Vue.prototype.$api.get('order/user/getNotFinishOrderinfo', null, (res) => {
      store.commit('updateUnfinishOrderNumber', res.commodityInfo.totalNum)
    })
  } else {
    // document.body.removeEventListener('touchmove', addEvent, false)
  }
})

Vue.use(BusPlugin)
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app-box')
