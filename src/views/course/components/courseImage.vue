<template>
  <div class="course-image">
      <el-form-item :label="label">
         <el-progress
           v-if="isLoading"
           type="circle"
           :percentage="precentage"
           :status="precentage === 100 ? 'success' : undefined"
           :width="178"></el-progress>
         <el-upload
            v-else
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :http-request="uploadCourseImg">
            <!-- 预览本地图片 -->
            <img v-if="value" :src="value" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
     </el-form-item>
  </div>
</template>

<script>
import { uploadCourseImage } from '@/services/course'
export default {
  name: 'CourseImage',
  props: {
    value: {
      type: String
    },
    label: {
      type: String
    },
    limit: {
      type: Number,
      default: 2
    }
  },
  data () {
    return {
      isLoading: false,
      // 设置上传图片的百分比
      precentage: 0
    }
  },
  methods: {
    /**
     * 自定义文件上传操作
     * options 为上传的相关信息
     */
    async uploadCourseImg (options) {
      this.isLoading = true
      //  将参数转化为 formate类型
      var fd = new FormData()
      fd.append('file', options.file)
      //  发送请求
      const { data } = await uploadCourseImage(fd, event => {
        this.precentage = Math.floor(event.loaded / event.total * 100)
      })
      if (data.code === '000000') {
        // 存储线上的图片地址
        // 上传成功后，将数据通过⾃定义事件传递给⽗组件
        this.$emit('input', data.data.name)
        this.$message.success('上传成功')
        this.isLoading = false
        // 上传成功后，百分比归零，防止出现回退效果
        this.precentage = 0
      }
    },
    /**
     * ⽂件上传成功时的钩⼦
     */
    handleAvatarSuccess (res, file) {
      // 保存预览图⽚地址
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    /**
     * 上传图片前的回调
     */
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < this.limit
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
::v-deep .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
