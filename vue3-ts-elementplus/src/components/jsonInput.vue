<template>
  <div class="json-input">
    <el-input type="textarea"
              v-model="jsonData" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'JsonInput',
  data() {
    return {
      jsonData: {},
    };
  },
  watch: {
    jsonData(newVal: any) {
      if (newVal) {
        this.jsonData = JSON.stringify(newVal, null, 2);
      }
    },
  },
});
</script>