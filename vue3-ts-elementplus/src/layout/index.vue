<template>
  <div class="layout">
    <div>header</div>
    <router-view />
    <div>footer</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'LayOut',
});
</script>