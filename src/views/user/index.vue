<template>
  <div class="user">
    <user-list></user-list>
  </div>
</template>

<script>
import UserList from './components/list.vue'
export default {
  name: 'User',
  components: {
    UserList
  }
}
</script>

<style lang="scss" scoped></style>
