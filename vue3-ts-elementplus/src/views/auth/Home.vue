<template>
  <div class="wrapper">
    <div class="center-img-container">
      <img src="@/assets/img/welcome.png"
           alt="welcome">
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Home',
  mounted() {
    // isLogin 判断
    var name = 'fuck';
    console.log(name);
  },
});
</script>