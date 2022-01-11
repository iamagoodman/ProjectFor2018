<template>
  <el-card shadow="hover"
           class="my-card">
    <img src="@/assets/img/hasproject.jpg"
         alt="点我加一个项目"
         v-if="!noProject">
    <img src="@/assets/img/noproject.jpg"
         alt="点我新增一个项目"
         v-if="noProject">
  </el-card>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'emptyCard',
  props: {
    noProject: Boolean,
  },
  mounted() {
    console.log(this.noProject);
  },
});
</script>
<style lang="scss" scoped>
.my-card {
  border: var(--el-border-base);
  margin-bottom: 10px;
  height: 180px;
  img {
    width: 70%;
  }
}
::v-deep .el-card__body {
  padding: 0;
}
::v-deep .el-card__header {
  padding: 0;
}
</style>