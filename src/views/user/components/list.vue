<template>
  <div class="user-list">
      <el-card>
          <div slot="header">
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="手机号">
                <el-input v-model="form.number" placeholder=请输入手机号 label-width="100px"></el-input>
              </el-form-item>
              <el-form-item label="注册时间">
                <el-date-picker
                    v-model="form.rangeDate"
                    type="datetimerange"
                    range-separator="⾄"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    value-format="yyyy-MM-dd"
                />
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  @click="handleQuery"
                  :disabled="isLoading"
                  >查询</el-button>
              </el-form-item>
            </el-form>
          </div>
          <el-table :data="users" style="width: 100%" v-loading="isLoading">
            <el-table-column
              prop="id"
              label="⽤户ID"
              width="150">
            </el-table-column>
            <el-table-column
              prop="name"
              label="头像"
              width="100">
              <template slot-scope="scope">
                <img width="30px" :src="scope.row.portrait || 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'">
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              label="⽤户名">
            </el-table-column>
            <el-table-column
              prop="phone"
              label="⼿机号">
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="注册时间">
              <!-- 格式化时间 -->
              <template slot-scope="scope">
                <span>{{ scope.row.createTime | filterTime }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              label="状态"
              width="80">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.status"
                  active-value="ENABLE"
                  inactive-value="DISABLE"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  @change="handleForbidUser(scope.row)">
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column
              prop="address"
              label="操作">
              <template slot-scope="scope">
                  <!-- 点击分配角色 -->
                <el-button
                  type="text"
                  @click="handleSelectRole(scope.row)" >分配⻆⾊</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分配角色 对话框 -->
          <el-dialog
            title="分配角色"
            :visible.sync="dialogVisible"
            width="30%">
            <el-select v-model="roleIdList" multiple placeholder="请选择">
              <el-option
              v-for="item in roleLists"
              :key="item.id"
              :label="item.name"
              :value="item.id"/>
            </el-select>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="handleAllocRole">确 定</el-button>
            </span>
          </el-dialog>
      </el-card>
  </div>
</template>

<script>
// 导入 获取所有用户、加载所有角色、给用户分配角色、查询用户所拥有的角色 接口
import { getUserPages } from '@/services/user'
import { getAllRoles, allocateRole, userRole } from '@/services/role'
export default {
  name: 'UserList',
  data () {
    return {
      // 对话框
      dialogVisible: false,
      users: [],
      form: {
        number: '',
        rangeDate: ''
      },
      isLoading: false,
      //  下拉菜单，存储选取的角色列表
      roleIdList: [],
      //  下拉菜单，存储获取的角色列表
      roleLists: [],
      //  存储当前用户信息的id
      currentUserId: ''
    }
  },
  created () {
    //   加载用户信息
    this.loadUserPages()
  },
  methods: {
    //   查询
    handleQuery () {},
    // 禁用
    handleForbidUser () {},
    /**
     * 分配角色按钮
     */
    async handleSelectRole (userId) {
      // 保存当前用户信息的id
      this.currentUserId = userId.id
      // 展示对话框
      this.dialogVisible = true
      // 加载所有的下拉菜单 角色列表
      const { data } = await getAllRoles()
      if (data.code === '000000') {
        this.roleLists = data.data
      }
      // 加载用户所拥有的角色
      const { data: data2 } = await userRole(userId.id)
      this.roleIdList = data2.data.map(item => item.id)
    },
    /**
     * 确定给用户分配角色
     */
    async handleAllocRole () {
      // 将勾选的角色数据 传送给接口
      const { data } = await allocateRole({
        userId: this.currentUserId,
        roleIdList: this.roleIdList
      })
      if (data.code === '000000') {
        this.$message.success('分配角色成功')
      }
      this.dialogVisible = false
    },
    /**
     * 加载用户分页信息
     */
    async loadUserPages () {
      const { data } = await getUserPages(this.form)
      if (data.code === '000000') {
        this.users = data.data.records
      }
    }
  },
  filters: {
    /**
     * 格式化日期
     */
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
