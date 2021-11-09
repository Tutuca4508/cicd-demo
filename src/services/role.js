import request from '@/utils/request'

// 按条件查询角色接口
export const getRolePages = data => {
  return request({
    url: '/boss/role/getRolePages',
    method: 'POST',
    data
  })
}

// 保存或更新角色 接口
export const saveOrUpdate = data => {
  return request({
    url: '/boss/role/saveOrUpdate',
    method: 'POST',
    data
  })
}

// 用户管理，下拉菜单获取所有角色
export const getAllRoles = () => {
  return request({
    method: 'GET',
    url: '/boss/role/all'
  })
}

// 给用户分配角色
export const allocateRole = data => {
  return request({
    method: 'POST',
    url: '/boss/role/allocateUserRoles',
    data
  })
}

// 查询 用户所拥有的角色
export const userRole = userId => {
  return request({
    method: 'GET',
    url: `/boss/role/user/${userId}`
  })
}
