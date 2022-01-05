<template>
  <div class="response-data">
    <json-editor-vue class="editor"
                     v-model="responseData" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import JsonEditorVue from 'json-editor-vue3';
export default defineComponent({
  name: 'responseData',
  components: {
    JsonEditorVue,
  },
  data() {
    return {
      responseData: {},
    };
  },
  props: {
    modelValue: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  watch: {
    responseData() {
      this.$emit('update:modelValue', this.responseData);
    },
    modelValue(newVal: any) {
      this.responseData = newVal;
    },
  },
});
</script>
<style lang="scss" scoped>
.response-data {
  width: 80%;
}
</style>