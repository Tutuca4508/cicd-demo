<template>
    <div class="app-header">
        <!-- 左侧导航 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 右侧下拉菜单 -->
        <el-dropdown>
            <span class="el-dropdown-link">
                <el-avatar
                  :size="30"
                  :src="userInfo.portrait" ></el-avatar>
                <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>{{ userInfo.userName }}</el-dropdown-item>
                <el-dropdown-item
                  divided
                  @click.native="handleLogout"
                >退出</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
import { getUserInfo } from '@/services/user'
export default {
  name: 'AppHeader',
  data () {
    return {
      // 声明存储⽤户信息的数据，绑定到视图中
      userInfo: {}
    }
  },
  created () {
    // 调用加载用户信息的函数
    this.loadUserInfo()
  },
  methods: {
    async loadUserInfo () {
      const { data } = await getUserInfo()
      this.userInfo = data.content
      // console.log(this.userInfo)
    },
    // 退出用户
    handleLogout () {
      this.$confirm('即将退出用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.commit('setUser', null)
        this.$router.push('/login')
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.app-header {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .el-dropdown-link {
        display: flex;
        align-items: center;
    }
}
</style>
