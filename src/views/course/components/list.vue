<template>
  <div class="course-list">
      <!-- 搜索框 -->
      <el-form ref="form"
        :model="form"
        label-position="left"
        :inline="true">
        <el-form-item label="课程名称：" prop="courseName">
          <el-input v-model="form.courseName"></el-input>
        </el-form-item>
        <el-form-item label="状态：" prop="status">
          <el-select v-model="form.status">
          <el-option label="全部" value=""></el-option>
          <el-option label="上架" value="1"></el-option>
          <el-option label="下架" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            :disabled="isLoading"
            @click="handleReset">重置</el-button>
          <el-button
            type="primary"
            :disabled="isLoading"
            @click="handleFilter">查询</el-button>
          <el-button
            type="primary"
            @click="$router.push({ name: 'create-course' })">添加课程</el-button>

        </el-form-item>
      </el-form>
      <!-- 展示课程表格 -->
    <el-card>
      <el-table
        :data="courses"
        v-loading="isLoading"
        style="width: 100%; margin-bottom: 20px">
        <el-table-column
          prop="id"
          label="ID">
        </el-table-column>
        <el-table-column
          prop="courseName"
          label="课程名称"
          width="230">
        </el-table-column>
        <el-table-column
          prop="price"
          label="价格">
        </el-table-column>
        <el-table-column
          prop="sortNum"
          label="排序">
        </el-table-column>
        <el-table-column
          prop="status"
          label="上架状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              active-color="#13ce66"
              :active-value="1"
              :inactive-value="0"
              inactive-color="#ff4949"
              :disabled="isStatusLoading"
              @change="onStateChange(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          prop="price"
          label="操作"
          width="200"
          align="center">
          <template slot-scope="scope">
            <el-button
              @click="$router.push({
                name: 'create-edit',
                params: {
                  courseId: scope.row.id
                }
              })">编辑</el-button>
            <el-button
              @click="$router.push({
                  name: 'course-section',
                  params: {
                    courseId: scope.row.id
                  }
                })">内容管理</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :disabled="isLoading"
        :current-page="form.currentPage"
        @current-change="handleCurrentChange"/>
    </el-card>
  </div>
</template>

<script>
// 导入 获取所有课程 接口
import { getAllCourse, changeStatus } from '@/services/course'
export default {
  name: 'CourseList',
  data () {
    return {
      form: {
        //  当前页面
        currentPage: 1,
        pageSize: 50,
        courseName: '',
        status: ''
      },
      //  加载状态
      isLoading: false,
      // 课程信息
      courses: [],
      //  数据总条数
      totalCount: '',
      // 课程上下架状态
      courseSatus: false,
      // 禁用切换课程状态
      isStatusLoading: false
    }
  },
  created () {
    this.loadAllCourse()
  },
  methods: {
    /**
     * 初始页面加载所有课程
     */
    async loadAllCourse () {
      this.isLoading = true
      const { data } = await getAllCourse(this.form)
      if (data.code === '000000') {
        this.courses = data.data.records
        this.totalCount = data.data.total
        this.isLoading = false
      }
    },
    /**
     * 改变课程上下架状态
     */
    async onStateChange (course) {
      this.isStatusLoading = true
      const { data } = await changeStatus({
        courseId: course.id,
        status: course.status
      })
      if (data.code === '000000') {
        this.$message.success(`${course.status === 0 ? '下架' : '上架'}成功`)
        this.isStatusLoading = false
      }
    },
    /**
     * 重置功能
     */
    handleReset () {
      this.$refs.form.resetFields()
      this.form.currentPage = 1
      this.loadAllCourse()
    },
    /**
     * 查询功能
     */
    handleFilter () {
      this.form.currentPage = 1
      this.loadAllCourse()
    },
    /**
     * 切换页面
     */
    handleCurrentChange (page) {
      this.form.currentPage = page
      this.loadAllCourse()
    }
  }
}
</script>

<style>

</style>
