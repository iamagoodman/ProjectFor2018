<template>
  <div>
    <div>layout header</div>
    <router-view />
    <div>layout footer</div>
  </div>
</template>

<script>
export default {
  name: 'LayOut'
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.test {
  background: var(--el-color-primary);
  color: var(--base-pirmary);
}
</style>
