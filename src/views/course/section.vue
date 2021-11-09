<template>
  <div class="course-section">
    <el-card>
      <el-tree
      :data="sections"
      :props="defaultProps"
      draggable
      :allow-drop="handleAllowDrop"
      @node-drop="handleNodeDrop"
      v-loading="isLoading">
        <!-- 设置作用域插槽 -->
        <div class="inner" slot-scope="{ node, data }">
          <!-- 设置内容 -->
          <span>{{ node.label }}</span>
          <!-- 设置后续按钮 -->
          <span v-if="data.sectionName" class="actions">
            <el-button>编辑</el-button>
            <el-button>添加课时</el-button>
            <el-button>状态</el-button>
          </span>
          <span v-else class="actions">
            <el-button>编辑</el-button>
            <el-button
              @click="$router.push({
                name: 'course-video',
                params: {
                  courseId
                },
                query: {
                  lessonId: data.id
                }
              })">上传视频</el-button>
            <el-button>状态</el-button>
          </span>
        </div>
      </el-tree>
    </el-card>
  </div>
</template>

<script>
import { getSectionAndLesson, saveOrUpdateSection, saveOrUpdateLesson } from '@/services/course-section'
export default {
  name: 'CourseSection',
  props: {
    courseId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      sections: [],
      defaultProps: {
        children: 'lessonDTOS',
        label (sections) {
          return sections.sectionName || sections.theme
        }
      }
    }
  },
  created () {
    this.loadSection()
  },
  methods: {
    /**
     * 拖动后的数据更新
     */
    async handleNodeDrop (draggingNode, dropNode, tyoe, event) {
      this.isLoading = true
      try {
        await Promise.all(dropNode.parent.childNodes.map((item, index) => {
          if (draggingNode.data.lessonDTOS) {
            return saveOrUpdateSection({
              id: item.data.id,
              orderNum: index
            })
          } else {
            return saveOrUpdateLesson({
              id: item.data.id,
              orderNum: index
            })
          }
        }))
        this.$message.success('数据更新成功')
      } catch (err) {
        this.$message.success('数据更新失败', err)
      }
      this.isLoading = false
    },
    /**
     * 拖拽规则
     */
    handleAllowDrop (draggingNode, dropNode, type) {
      // 1. 不能有放⼊内部的操作，但例如将章节1拖拽到章节2的课时1之前时，type 为prev，需要进⼀步处理
      // 2. 所有课时都具有 sectionId，通过下⾯的条件，限制章节不能移动到课时前后，也不能将章节的课时移动到其他章节
      return type !== 'inner' && draggingNode.data.sectionId === dropNode.data.sectionId
    },
    async loadSection () {
      const { data } = await getSectionAndLesson(this.courseId)
      if (data.code === '000000') {
        this.sections = data.data
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.inner {
  // 浏览器观察到⽗元素设置了 flex，所以当前元素 flex: 1 占满⼀⾏
  flex: 1;
  // 内部元素希望左右分开，所以给当前元素设置 flex
  display: flex;
  justify-content: space-between;
  align-items: center;
  // 其他样式美化
  padding: 10px;
  border-bottom: 1px solid #ebeef5;
}

 // 当前⾏具有类名 .el-tree-node__content 设置了固定⾼度 26px, 这⾥要改为auto ⾃适应
// 由于为 Tree 组件内的元素，需要设置样式穿透
::v-deep .el-tree-node__content {
  height: auto;
}
</style>
