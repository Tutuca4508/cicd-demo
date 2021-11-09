<template>
  <div ref="editor" class="text-editor"></div>
</template>

<script>
import { uploadCourseImage } from '@/services/course'
import E from 'wangeditor'

export default {
  name: 'TextEditor',
  props: {
    value: {
      type: String,
      dafault: ''
    }
  },
  mounted () {
    this.initEditor()
  },
  data () {
    return {
      editor: null,
      isLoader: false
    }
  },
  methods: {
    // 创建富文本编辑器实例
    initEditor () {
      const editor = new E(this.$refs.editor)
      editor.config.onchange = value => {
        this.$emit('input', value)
      }
      // 配置 自定义上传图片功能
      editor.config.customUploadImg = async (resultFiles, insertImgFn) => {
        const fd = new FormData()
        fd.append('file', resultFiles[0])
        const { data } = await uploadCourseImage(fd)
        console.log(data)
        if (data.code === '000000') {
          insertImgFn(data.data.name)
        }
      }
      // 初始化富⽂本编辑器
      editor.create()
      editor.txt.html(this.value)
      this.editor = editor
    }
  },
  watch: {
    value () {
      if (this.isLoader === false) {
        this.editor.txt.html(this.value)
        this.isLoader = true
      }
    }
  }
}
</script>

<style>

</style>
