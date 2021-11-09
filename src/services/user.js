import request from '@/utils/request.js'
import qs from 'qs'

// 用户登录接口
export const login = data => {
  return request({
    url: '/front/user/login',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 获取用户信息接口
export const getUserInfo = () => {
  return request({
    url: '/front/user/getInfo',
    method: 'GET'
    // headers: {
    //   Authorization: store.state.user.access_token
    // }
  })
}

// 用户管理：分页获取用户信息
export const getUserPages = data => {
  return request({
    url: '/boss/user/getUserPages',
    method: 'POST',
    data
  })
}
