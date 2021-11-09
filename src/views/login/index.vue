<template>
  <div class="login">
    <el-form
      label-position="top"
      ref="form"
      :model="form"
      :rules="rules"
      label-width="80px">
      <el-form-item label="⼿机号" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="onSubmit"
          :loading="isLoginLoading"
          >⽴即创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import request from '@/utils/request.js'
// import qs from 'qs'
import { login } from '@/services/user.js'
export default {
  name: 'LoginIndex',
  data () {
    return {
      isLoginLoading: false,
      form: {
        phone: '18201288771',
        password: '111111'
      },
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1\d{10}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '请输入 6 到 18 位密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async onSubmit () {
      // this.$store.commit('jia', 5)
      // this.$store.dispatch('jia', {
      //   count: 2,
      //   display: 2000
      // })
      // this.$store.dispatch('jia', {
      //   count: 5,
      //   display: 1000
      // })
      // console.log(this.$store.state.user)
      // 1. 表单验证
      try {
        await this.$refs.form.validate()
      } catch (error) {
        console.log('校验错误')
      }
      // 2.发送请求
      // 设置按钮加载中
      this.isLoginLoading = true
      const { data } = await login(this.form)
      // console.log(data)
      // 取消按钮加载中状态
      this.isLoginLoading = false
      // 3. 处理响应请求
      if (data.state !== 1) {
        this.$message.error(data.message)
      } else {
        // 将登录信息 保存到 store中
        this.$store.commit('setUser', data.content)
        // 登录成功 跳转页面
        this.$router.push(this.$route.query.redirect || '/')
        // 登录成功 弹窗
        this.$message.success(data.message)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  display: flex;
  // 设置内部元素垂直水平居中
  justify-content: center;
  align-items: center;

  .el-form {
    background-color: #fff;
    padding: 20px;
    width: 300px;
    border-radius: 10px;

    .el-button {
      width: 100%;
    }
  }
}

</style>
