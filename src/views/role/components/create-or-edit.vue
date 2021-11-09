<template>
  <div class="create-or-edit">
    <el-form>
      <el-form-item label="⻆⾊名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="⻆⾊编码">
        <el-input v-model="form.code"></el-input>
      </el-form-item>
      <el-form-item label="⻆⾊描述">
        <el-input type="textarea"  v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="onCancel">取消</el-button>
        <el-button type="primary" @click="onSubmit">确认</el-button>
      </el-form-item>
     </el-form>
  </div>
</template>

<script>
import { saveOrUpdate } from '@/services/role'
export default {
  name: 'CreateOrEdit',
  data () {
    return {
      form: {
        name: '',
        code: '',
        description: ''
      }
    }
  },
  methods: {
    // 提交表单
    async onSubmit () {
      const { data } = await saveOrUpdate(this.form)
      // 提交表单成功
      if (data.code === '000000') {
        this.$message.success('添加成功')
        // 子组件注册自定义事件
        this.$emit('success')
        this.form = {}
      }
    },
    // 取消表单事件
    onCancel () {
      this.$emit('cancel')
      this.form = {}
    }
  }
}
</script>

<style>

</style>
