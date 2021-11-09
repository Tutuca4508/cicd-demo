<template>
  <div class="menu">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button @click="$router.push({name: 'menu-create'})">添加菜单</el-button>
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            label="编号"
            type="index">
          </el-table-column>
          <el-table-column
            prop="name"
            label="菜单名称">
          </el-table-column>
          <el-table-column
            prop="level"
            label="菜单级数">
          </el-table-column>
          <el-table-column
            prop="icon"
            label="前端图标">
          </el-table-column>
          <el-table-column
            prop="orderNum"
            label="排序">
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
      </div>
    </el-card>
  </div>
</template>

<script>
// 获取 导入完成的所有菜单接口 和删除菜单的接口
import { getAllmenu, deleteMenu } from '@/services/menu'
export default {
  name: 'MenuIndex',
  data () {
    return {
      // 存储所有菜单列表
      tableData: []
    }
  },
  created () {
    // 页面加载时 调用获取所有菜单的方法
    this.loadAllMenu()
  },
  methods: {
    // 加载获取所有菜单的方法
    async loadAllMenu () {
      const { data } = await getAllmenu()
      this.tableData = data.data
    },
    // 编辑菜单信息
    handleEdit (rowData) {
      this.$router.push({
        name: 'menu-edit',
        params: {
          id: rowData.id
        }
      })
    },
    // 删除菜单信息
    handleDelete (rowData) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data } = await deleteMenu(rowData.id)
        // 判断是否删除成功
        if (data.code === '000000') {
          this.$message.success('删除成功!')
          this.loadAllMenu()
        }
        console.log(data)
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
