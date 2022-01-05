<template>
  <el-breadcrumb separator="/"
                 class="back">
    <el-breadcrumb-item v-for="item in routerList"
                        :key="item.path"
                        :to="{ path: item.path }">{{ item.name}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    backList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  computed: {
    routerList() {
      return [{ name: '首页', path: '/' }, ...this.backList];
    },
  },
});
</script>
<style lang="scss" scoped>
.back {
  padding: 10px 0;
}
</style>