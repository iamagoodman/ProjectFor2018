<template>
  <div class="layout">
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-container class="content-container">
        <el-aside width="200px">
          <!-- <el-radio-group v-model="isCollapse"
                          style="margin-bottom: 20px">
            <el-radio-button :label="false">expand</el-radio-button>
            <el-radio-button :label="true">collapse</el-radio-button>
          </el-radio-group> -->
          <el-menu class="el-menu-vertical-demo"
                   :collapse="isCollapse"
                   @open="handleOpen"
                   @close="handleClose"
                   router>

            <el-menu-item index="2"
                          route="/mock">
              <el-icon>
                <icon-menu />
              </el-icon>
              <template #title>mock平台</template>
            </el-menu-item>

            <el-menu-item index="4"
                          route="/setting">
              <el-icon>
                <setting />
              </el-icon>
              <template #title>个人中心</template>
            </el-menu-item>

          </el-menu>
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Menu as IconMenu, Setting } from '@element-plus/icons-vue';
import Header from '@/views/auth/header.vue';
export default defineComponent({
  components: {
    Setting,
    IconMenu,
    Header,
  },
  data() {
    return {
      openMenu: true,
    };
  },
  setup() {
    const isCollapse = ref(false);
    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath);
    };
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath);
    };
    return {
      isCollapse,
      handleOpen,
      handleClose,
    };
  },
});
</script>
<style lang="scss" scoped>
.el-header {
  position: fixed;
  top: 0;
  width: 100%;
  background: var(--base-bg);
  color: var(--el-color-primary);
}
.el-main {
  padding: 0;
}
.content-container {
  margin-top: $baseHeaderHeight;
  max-height: calc(100vh - $baseHeaderHeight);
  height: calc(100vh - $baseHeaderHeight);
}
.el-menu {
  height: calc(100vh - $baseHeaderHeight);
  background: var(--base-bg);
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  min-height: 400px;
}
.el-menu-item * {
  vertical-align: text-top;
}
</style>