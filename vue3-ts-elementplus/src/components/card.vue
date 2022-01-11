<template>
  <el-card shadow="hover"
           class="my-card">
    <template #header>
      <div class="card-header">
        <span>{{project.project_name}}</span>
        <div>
          <el-tooltip effect="light"
                      content="查看"
                      placement="bottom">
            <el-icon class="my-pointer"
                     @click="cardHandler('read')">
              <reading />
            </el-icon>
          </el-tooltip>
          <el-tooltip effect="light"
                      content="编辑"
                      placement="bottom">
            <el-icon class="my-pointer"
                     @click="cardHandler('edit')">
              <edit />
            </el-icon>
          </el-tooltip>
          <el-tooltip effect="light"
                      content="删除"
                      placement="bottom">
            <el-icon class="my-pointer"
                     @click="cardHandler('delete')">
              <delete />
            </el-icon>
          </el-tooltip>
        </div>
      </div>
    </template>
    <div class="card-item">
      作者：
      <span class="active-font">{{project.author}}</span>
    </div>
    <div class="card-item">
      备注：
      <span class="active-font">{{project.remarks}}</span>
    </div>
    <div class="card-item">
      更新时间：
      <span class="active-font">{{formatTime(project.updatedAt)}}</span>
    </div>
  </el-card>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import dayjs from 'dayjs';
import { Delete, Edit, Reading } from '@element-plus/icons-vue';
export default defineComponent({
  name: 'card',
  components: {
    Delete,
    Edit,
    Reading,
  },
  props: {
    project: {
      type: Object,
      default() {
        return {
          id: 1,
          project_name: 'testProject',
          updatedAt: '2021/12/20 09:30:40',
          remarks: '这是备注，这是备注',
          author: 'quntta',
        };
      },
    },
  },
  methods: {
    cardHandler(handleType: string) {
      this.$emit('handleEvent', {
        handleType,
        id: this.project.id,
        project_name: this.project.project_name,
      });
    },
    formatTime(time: string) {
      return dayjs(time).format('YYYY-MM-DD hh:mm:ss');
    },
  },
});
</script>
<style lang="scss" scoped>
.my-card {
  border: var(--el-border-base);
  margin-bottom: 10px;
  height: 180px;
}
::v-deep .el-card__body {
  padding: 10px 12px;
}
::v-deep .el-card__header {
  padding: 10px 12px;
}
.card-header {
  font-size: 13px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.card-item {
  font-size: 13px;
  line-height: 20px;
  text-align: left;
  max-height: 80px;
  overflow: hidden;
  .active-font {
    color: var(--el-color-black);
  }
  .pro-name {
    color: var(--el-color-primary);
  }
}
</style>