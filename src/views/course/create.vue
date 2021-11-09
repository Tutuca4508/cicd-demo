<template>
  <div class="create-course">
    <create-course-or-edit></create-course-or-edit>
  </div>
</template>

<script>
import CreateCourseOrEdit from './components/createOrEdit.vue'

export default {
  name: 'CreateCourse',
  components: {
    CreateCourseOrEdit
  }
}
</script>

<style lang="scss" scoped>
.el-step {
    cursor: pointer;
}
</style>
