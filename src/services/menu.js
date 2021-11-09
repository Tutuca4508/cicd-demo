import request from '@/utils/request'

// 请求添加菜单
export const createOrUpdateMenu = data => {
  return request({
    url: '/boss/menu/saveOrUpdate',
    method: 'POST',
    data
  })
}

// 请求获取所有一级菜单，用于添加表单 选择级别
export const getEditMenuInfo = (id = -1) => {
  return request({
    method: 'GET',
    url: '/boss/menu/getEditMenuInfo',
    params: {
      id
    }
  })
}

// 请求获取所有菜单，用于展示列表
export const getAllmenu = () => {
  return request({
    method: 'GET',
    url: '/boss/menu/getAll'
  })
}

// 删除菜单信息
export const deleteMenu = id => {
  return request({
    method: 'DELETE',
    url: `/boss/menu/${id}`
  })
}

// 获取所有菜单，并按层级展示
export const getMenuNodeList = () => {
  return request({
    method: 'GET',
    url: '/boss/menu/getMenuNodeList'
  })
}

// 保存角色分配菜单 接口
export const allocateRoleMenus = data => {
  return request({
    method: 'POST',
    url: '/boss/menu/allocateRoleMenus',
    data
  })
}

//  获取 角色已经拥有的菜单
export const getRoleMenus = roleId => {
  return request({
    method: 'GET',
    url: '/boss/menu/getRoleMenus',
    params: {
      roleId
    }
  })
}
