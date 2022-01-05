<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  components: {
  },
  mounted(): void {
    console.log(this.$route)
    console.log(this.$router)
  }
})
export default class About extends Vue {}
</script>