<template>
  <div class="course-edit">
    <create-course-or-edit
      is-edit
      :courseId="courseId"></create-course-or-edit>
  </div>
</template>

<script>
import CreateCourseOrEdit from './components/createOrEdit.vue'
export default {
  name: 'CourseEdit',
  props: {
    courseId: {
      type: [String, Number],
      required: true
    }
  },
  components: {
    CreateCourseOrEdit
  }
}
</script>

<style>

</style>
