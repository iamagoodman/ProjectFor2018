<template>
  <div class="layout">
    <div>header</div>
    <router-view />
    <div>footer</div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  components: {
  },
})
export default class LayOut extends Vue {}
</script>