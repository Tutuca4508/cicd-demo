import request from '@/utils/request'

// 获取所有课程
export const getAllCourse = data => {
  return request({
    method: 'POST',
    url: '/boss/course/getQueryCourses',
    data
  })
}

// 改变课程上下架状态
export const changeStatus = params => {
  return request({
    method: 'GET',
    url: '/boss/course/changeState',
    params
  })
}

// 保存更改课程信息
export const saveOrUpdateCourse = data => {
  return request({
    method: 'POST',
    url: '/boss/course/saveOrUpdateCourse',
    data
  })
}

// 上传图片 接口
export const uploadCourseImage = (data, onUploadProgress) => {
  return request({
    method: 'POST',
    url: '/boss/course/upload',
    data,
    onUploadProgress
  })
}

// 根据课程id 获取课程信息
export const getCourseById = courseId => {
  return request({
    method: 'GET',
    url: '/boss/course/getCourseById',
    params: {
      courseId
    }
  })
}
