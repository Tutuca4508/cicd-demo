<template>
  <div class="alloc-menu">
    <el-tree
      ref="menu-tree"
      node-key="id"
      :data="menus"
      :props="defaultProps"
      @node-click="handleNodeClick"
      show-checkbox
      :default-checked-keys="checkedKeys"
      default-expand-all></el-tree>
      <div style="margin: 20px">
        <el-button @click="onReset()">清空</el-button>
        <el-button type="primary" @click="onSave()">保存</el-button>
      </div>
  </div>
</template>

<script>
import { getMenuNodeList, allocateRoleMenus, getRoleMenus } from '@/services/menu'
export default {
  name: 'AllocMenu',
  props: {
    roleId: {
      type: [String, Number],
      required: true
    }
  },
  created () {
    // 加载所有的菜单信息
    this.loadMenuList()
    // 加载角色已经分配的信息
    this.loadRoleMenus()
  },
  data () {
    return {
      menus: [],
      defaultProps: {
        children: 'subMenuList',
        label: 'name'
      },
      // 存储选择的数据id
      checkedKeys: []
    }
  },
  methods: {
    handleNodeClick (data) {
      // console.log(data)
    },
    onReset () {
      this.$refs['menu-tree'].setCheckedKeys([])
    },
    async loadRoleMenus () {
      const { data } = await getRoleMenus(this.roleId)
      if (data.code === '000000') {
        this.getCheckedKeys(data.data)
      }
    },
    // 数据筛选
    getCheckedKeys (menus) {
      menus.forEach(menu => {
        if (!menu.selected) {
          return
        }
        if (menu.subMenuList) {
          return this.getCheckedKeys(menu.subMenuList)
        }
        this.checkedKeys = [...this.checkedKeys, menu.id]
      })
    },
    // 保存角色菜单分配
    async onSave () {
      const { data } = await allocateRoleMenus({
        roleId: this.roleId,
        menuIdList: this.$refs['menu-tree'].getCheckedKeys()
      })
      if (data.code === '000000') {
        this.$message.success('分配菜单成功')
        this.$router.push('/role')
      }
    },
    // 展示菜单，按层级
    async loadMenuList () {
      const { data } = await getMenuNodeList()
      // 判断是否读取成功
      if (data.code === '000000') {
        this.menus = data.data
        // console.log(this.menus)
      }
    }
  }
}
</script>

<style>

</style>
