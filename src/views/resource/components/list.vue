<template>
  <div class="resource-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 使⽤ Form 组件：⾏内表单 -->
        <el-form :inline="true" :model="form" class="demo-form-inline" ref="form">
          <el-form-item label="资源名称" prop="name" >
            <el-input v-model="form.name" placeholder="资源名称" clearable></el-input>
          </el-form-item>
          <el-form-item label="资源路径" prop="url" >
            <el-input v-model="form.url" placeholder="资源路径" clearable></el-input>
          </el-form-item>
          <el-form-item label="资源分类" prop="categoryId">
            <el-select v-model="form.categoryId" placeholder="全部">
              <el-option
                 v-for="item in Category"
                :label="item.name"
                :value="item.id"
                :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onReset" :disabled="isLoading">重置</el-button>
            <el-button type="primary" @click="onSubmit" :disabled="isLoading">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="add-resource" style="border-bottom: 1px solid #EBEEF5; padding-bottom: 25px">
        <el-button type="info" plain>添加 </el-button>
        <el-button type="info" plain>资源分类</el-button>
      </div>
      <!-- 使⽤ Table 组件 -->
      <el-table
        :data="tableData"
        style="width: 100%"
        v-loading="isLoading">
        <el-table-column
          label="编号"
          type="index"
          width="100">
        </el-table-column>
        <el-table-column
          prop="name"
          label="资源名称">
        </el-table-column>
        <el-table-column
          prop="url"
          label="资源路径">
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述">
        </el-table-column>
        <el-table-column
          label="添加时间">
          <template slot-scope="scope">
            <span>{{ scope.row.createdTime | filterTime }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
        <!-- 分页功能 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="form.current"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="form.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
        :disabled="isLoading">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
// 按条件分页查询接口
import { getResourcePages, getResourceCategory } from '@/services/resource'

export default {
  name: 'ResourceList',
  data () {
    return {
      tableData: [],
      // 保存分页功能的选项
      form: {
        // 当前页面
        current: 1,
        // 每页展示的条数
        size: 10,
        name: '',
        url: '',
        // 存储资源分类ID
        categoryId: ''
      },
      totalCount: 0,
      Category: [],
      isLoading: true
    }
  },
  created () {
    // 页面创建时，加载资源
    this.loadResourcePages()
    // 加载菜单分类
    this.loadCategory()
  },
  methods: {
    // 重置按钮
    onReset () {
      this.$refs.form.resetFields()
    },
    // 4. 筛选查询
    onSubmit () {
      // 保证显示页为第一页
      this.current = 1
      // 通过 条件查询资源 接口获取
      this.loadResourcePages()
    },
    // 5. 加载资源分类列表
    async loadCategory () {
      const { data } = await getResourceCategory()
      if (data.code === '000000') {
        this.Category = data.data
      }
    },
    // 2. 展示条数
    handleSizeChange (val) {
      this.form.size = val
      this.form.current = 1
      this.loadResourcePages()
    },
    // 3. 展示当前页
    handleCurrentChange (val) {
      this.form.current = val
      this.loadResourcePages()
    },
    // 1. 加载资源获取的接口
    async loadResourcePages () {
      this.isLoading = true
      const { data } = await getResourcePages(this.form)
      // 判断是否获取资源成功
      if (data.code === "000000") {
        // 将请求到的资源加载到表单数据中
        this.tableData = data.data.records
        // 保存总条数
        this.totalCount = data.data.total
        this.isLoading = false
      }
    }
  },
  // 过滤时间
  filters: {
    // 将添加事件 格式化
    filterTime (date) {
      date = new Date(date)
      return `
        ${date.getFullYear()}-${date.getMonth()}-${date.getDate()}
        ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}
      `
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
