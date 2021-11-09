<template>
  <div class="menu-edit">
    <!-- 父组件向子组件传值 保证标题的响应性 -->
    <create-or-edit :isEdit="true"></create-or-edit>
  </div>
</template>

<script>
import createOrEdit from './components/create-or-edit.vue'
export default {
  name: 'MenuEdit',
  components: {
    createOrEdit
  }
}
</script>

<style lang="scss" scoped>
</style>
