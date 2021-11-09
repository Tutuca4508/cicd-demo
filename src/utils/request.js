import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import qs from 'qs'
import router from '@/router'

const request = axios.create({
  // timeout: 5000
})

// 定义检测是否已经在请求新Token的状态
let isRefreshing = false
// 存储因等待 Token而被挂起的请求
let requests = []

// 定义检测 url 的基础地址函数
function getBaseUrl (url) {
  if (url.startsWith('/boss')) {
    return 'http://eduboss.lagou.com'
  } else {
    return 'http://edufront.lagou.com'
  }
}
// 定义跳转到登陆页面
function redirectLogin () {
  router.push({
    name: 'login',
    query: {
      // router.currentRoute ⽤于获取当前路由对应的路由信息对象
      redirect: router.currentRoute.fullPath
    }
  })
}

// 请求拦截器
request.interceptors.request.use(function (config) {
  config.baseURL = getBaseUrl(config.url)
  const { user } = store.state
  if (user && user.access_token) {
    config.headers.Authorization = user.access_token
  }
  return config
})

// 响应拦截器
request.interceptors.response.use(function (response) {
  // 请求响应成功
  // console.log('请求响应成功', response)
  return response
}, function (error) {
  // 请求响应失败
  if (error.response) {
    // 请求发送成功，收到响应，但是出错
    // 获取状态码
    const { status } = error.response
    let errorMessage = ''
    if (status === 400) {
      errorMessage = '请求参数错误'
    } else if (status === 401) {
      // errorMessage = 'token失效'
      // 1. 检测是否存在用户信息 不存在就跳转到登陆页面，并且记录当前页面路径
      if (!store.state.user) {
        redirectLogin()
        // 阻⽌后续操作，向下抛出错误对象
        return Promise.reject(error)
      }
      // 判断获取token状态，防止重复获取
      if (isRefreshing) {
        // 说明正在获取token，将等待的请求放进数组
        return requests.push(() => {
          request(error.config)
        })
      }
      // 说明此时没有获取token，改变状态代表下一步进行获取token
      isRefreshing = true
      // 2. 用户信息存在，但是 Token 失效, 请求刷新 Token的接口
      return request({
        method: 'POST',
        url: '/front/user/refresh_token',
        data: qs.stringify({
          refreshtoken: store.state.user.refresh_token
        })
      }).then(res => {
        // 2.1检测是否拿到 新的token
        //   - 如果没有请求到新的token，则返回登陆页面
        if (res.data.state !== 1) {
          //   - 清空store用户信息
          store.commit('setUser', null)
          //   - 跳转到登录页面
          redirectLogin()
          // 阻⽌后续操作，向下抛出错误对象
          return Promise.reject(error)
        }
        //   - 有新的token，直接进行响应请求
        //     - 将新的token保存到store中
        store.commit('setUser', res.data.content)
        //     - 将挂载的请求遍历执行
        requests.forEach(callback => callback())
        //     - 将挂载请求的数组清空
        requests = []
        //     - 执行自己的请求
        return request(error.config)
      })
    } else if (status === 403) {
      errorMessage = '没有权限，请联系管理员'
    } else if (status === 404) {
      errorMessage = '请求资源不存在'
    }
    Message.error(errorMessage)
  } else if (error.request) {
    // 请求发送成功，没有收到响应
  } else {
    // 请求失败，请求头设置出错
  }
  return Promise.reject(error)
})

export default request
