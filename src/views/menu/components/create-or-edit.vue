<template>
    <div class="menu-create">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>{{ isEdit ? '编辑菜单' : '添加菜单' }}</span>
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="菜单名称">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="菜单路径">
                        <el-input v-model="form.href"></el-input>
                    </el-form-item>
                    <el-form-item label="上级菜单">
                        <el-select v-model="form.parentId" placeholder="请选择上级菜单">
                        <el-option
                          label="无上级菜单"
                          :value="-1"
                        ></el-option>
                        <el-option
                          v-for="item in parentMenuList"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id"
                        >
                        </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="描述">
                        <el-input v-model="form.description"></el-input>
                    </el-form-item>
                    <el-form-item label="前端图标">
                        <el-input v-model="form.icon"></el-input>
                    </el-form-item>
                    <el-form-item label="是否显示">
                        <el-radio-group v-model="form.shown">
                            <el-radio :label="true">是</el-radio>
                            <el-radio :label="false">否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="排序">
                        <el-input-number v-model="form.orderNum" label="描述⽂字"></el-input-number>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">提交</el-button>
                        <!-- 编辑页面不需要重置 -->
                        <el-button
                          v-if="!isEdit"
                        >重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
// 获取 加载所有菜单标题的接口 和 发送创建表单数据的接口
import { getEditMenuInfo, createOrUpdateMenu } from '@/services/menu'
export default {
  name: 'CreateOrEdit',
  // 接收⽗组件传值，判断是添加还是编辑功能，默认为创建
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      form: {
        parentId: -1,
        name: '',
        href: '',
        icon: '',
        orderNum: 0,
        description: '',
        shown: true
      },
      //   存储上级菜单
      parentMenuList: []
    }
  },
  created () {
    //   加载获取菜单信息
    this.loadMenuInfo()
  },
  methods: {
    //   加载获取当前编辑菜单信息
    async loadMenuInfo () {
      // 根据参数id 判断是编辑页面 还是 创建页面
      const { data } = await getEditMenuInfo(this.$route.params.id || -1)
      // 判断是否加载成功
      if (data.code === '000000') {
        this.parentMenuList = data.data.parentMenuList
      }
      // 编辑页面，需要将获取的菜单信息传给 表单
      if (data.data.menuInfo) {
        this.form = data.data.menuInfo
      }
    },
    // 点击提交按钮，提交表单
    async onSubmit () {
      // 请求 提交表单接口
      const { data } = await createOrUpdateMenu(this.form)
      // 判断是否请求成功
      if (data.code === '000000') {
        this.$message.success('添加成功')
        // 请求成功，跳转到菜单首页
        this.$router.push({
          name: 'menu'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
