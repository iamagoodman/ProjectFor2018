<template>
  <div class="home">
    this is home page
    el-b
    <el-button type="primary"
               size="default"></el-button>

    <el-button>home</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Home',
  mounted() {
    console.log('gaga');
    console.log('fuck');
    console.log('sfdsafs');
    var name = 'fuck';
    console.log(name);
  },
});
</script>
<style lang="scss" scoped>
</style>