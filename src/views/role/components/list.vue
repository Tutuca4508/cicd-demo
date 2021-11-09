<template>
  <div class="role-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 使⽤ Form 组件：⾏内表单 -->
        <el-form :inline="true" :model="form" class="demo-form-inline" ref="form">
          <el-form-item label="输入搜索" prop="name" >
            <el-input v-model="form.name" placeholder="角色名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onReset" :disabled="isLoading">重置</el-button>
            <el-button type="primary" @click="onSubmit" :disabled="isLoading">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 添加角色,显示对话框 -->
      <el-button @click="dialogVisible = true" >添加⻆⾊</el-button>
      <!-- 使⽤ Table 组件 -->
      <el-table
        :data="rolesList"
        style="width: 100%"
        v-loading="isLoading">
        <el-table-column
          label="编号"
          type="index">
        </el-table-column>
        <el-table-column
          prop="name"
          label="角色名称">
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
                @click="$router.push({
                  name: 'alloc-menu',
                  params: {
                    roleId: scope.row.id
                  }
                })">分配菜单</el-button>
              <el-button
                size="mini"
                @click="handleDistributionR(scope.row)">分配资源</el-button>
            <div>
              <el-button
                size="mini"
                @click="handleEdit(scope.row)">编辑</el-button>
              <el-button
                size="mini"
                @click="handleDelete(scope.row)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加表单对话框 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <create-or-edit
        @success="onSuccess"
        @cancel="dialogVisible = false"></create-or-edit>
    </el-dialog>
  </div>
</template>

<script>
import { getRolePages } from '@/services/role'
import CreateOrEdit from './create-or-edit.vue'
export default {
  name: 'RoleList',
  components: {
    CreateOrEdit
  },
  data () {
    return {
      // 搜索表单
      form: {
        name: '',
        size: 100
      },
      // 存储所有角色
      rolesList: '',
      dialogVisible: false
    }
  },
  created () {
    this.loadRoles()
  },
  methods: {
    // 关闭添加更新角色的对话框
    onSuccess () {
      this.dialogVisible = false
      this.loadRoles()
    },
    // 分配资源功能
    handleDistributionR () {},
    // 重置搜索功能
    onReset () {},
    // 查询功能
    onSubmit () {
      this.loadRoles()
    },
    // 添加表单对话框
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    // 默认加载所有角色
    async loadRoles () {
      const { data } = await getRolePages(this.form)
      console.log(data)
      // 判断是否加载成功
      if (data.code === '000000') {
        this.rolesList = data.data.records
      }
    }
  },
  filters: {
    // 格式化时间
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

<style>

</style>
