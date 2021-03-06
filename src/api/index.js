
// import router from '../router'
import { event } from '../utils/event'
import store from '../store'
var qs = require('qs')

var root = 'http://bcdev.jialebao.me/' // 大白菜测试
// var root = 'http://www.dabaicao.co/' // 大白菜正式
var axios = require('axios')
function toType (obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}

function filterNull (o) {
  for (const key in o) {
    if (o[key] === null) {
      delete o[key]
    }
    if (toType(o[key]) === 'string') {
      o[key] = o[key].trim()
    } else if (toType(o[key]) === 'object') {
      o[key] = filterNull(o[key])
    } else if (toType(o[key]) === 'array') {
      o[key] = filterNull(o[key])
    }
  }
  return o
}

function apiAxios (method, url, params, success, failure) {
  if (!navigator.onLine) {
    event.emit('errorMsg', '失去网络连接，请稍后重试！')
    return
  }
  store.state.isLoading = true // 显示loading画面
  if (params) {
    params = filterNull(params)
  }
  if (sessionStorage.getItem('myken')) {
    let _token = sessionStorage.getItem('myken')
    params = Object.assign({}, params, {token: _token})
  }
  axios({
    method: method,
    url: url,
    timeout: 10000,
    data: method === 'POST' || method === 'PUT' ? qs.stringify(params) : null,
    params: method === 'GET' || method === 'DELETE' ? params : null,
    baseURL: root,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    withCredentials: false
  })
  .then(function (res) {
    store.state.isLoading = false // 隐藏loading
    var returnData = res.data
    if (!returnData.status) {
      if (success) {
        success(returnData.data)
      }
    } else {
      if (failure) {
        failure(returnData)
      } else {
        handleErrorCode(returnData)
        // window.alert('error: ' + JSON.stringify(res.data))
      }
    }
  })
  .catch(function (err) {
    store.state.isLoading = false // 隐藏loading
    if (err.message) {
      console.error(err.message)
    } else {
      let res = err.response
      if (err) {
        event.emit('errorMsg', 'api error,http code ' + res.status)
        // window.alert('api error,http code ' + res.status)
      }
    }
  })
}

function handleErrorCode (res) {
  var status = res.status
  if (status === 1000) { // 登录过期
    window.location.href = res.data.url
    console.log(res)
  } else {
    console.log(res.message)
    event.emit('errorMsg', res.message)
  }
}

export default{
  get: function (url, params, success, failure) {
    return apiAxios('GET', url, params, success, failure)
  },
  post: function (url, params, success, failure) {
    return apiAxios('POST', url, params, success, failure)
  },
  put: function (url, params, success, failure) {
    return apiAxios('PUT', url, params, success, failure)
  },
  delete: function (url, params, success, failure) {
    return apiAxios('DELETE', url, params, success, failure)
  },
  root: root
}
