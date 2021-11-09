import request from '@/utils/request'

// 按条件查询资源 接口
export const getResourcePages = data => {
  return request({
    method: 'POST',
    url: '/boss/resource/getResourcePages',
    data
  })
}

// 查询资源分类 接口
export const getResourceCategory = () => {
  return request({
    method: 'GET',
    url: '/boss/resource/category/getAll'
  })
}
