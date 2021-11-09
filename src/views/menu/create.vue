<template>
    <div class="menu-create">
      <!-- 设置子组件，加载表单元素，isEdit 默认为false -->
      <create-or-edit></create-or-edit>
    </div>
</template>

<script>
import createOrEdit from './components/create-or-edit.vue'
export default {
  components: { createOrEdit },
  name: 'MenuCreate'
}
</script>

<style lang="scss" scoped>
</style>
