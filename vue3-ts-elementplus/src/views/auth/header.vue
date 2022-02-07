<script lang="ts" setup>
function handleClick() {
  console.log('click');
}
</script>
<template>
  <div class="header-container">
    <img src="@/assets/img/logo.png"
         alt="logo">
    <el-button @click="handleClick">click me</el-button>
  </div>
</template>
<style lang="scss" scoped>
.header-container {
  height: var(--el-header-height);
  text-align: left;
  img {
    height: var(--el-header-height);
  }
}
test {
  width: 100%;
}
</style>