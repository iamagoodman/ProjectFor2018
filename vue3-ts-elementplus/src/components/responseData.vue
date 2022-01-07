<template>
  <div class="response-data">
    <!-- <json-editor-vue v-model="responseData"
                     @change="handleChange"
                     :key="renderKey" /> -->
    <vue3-json-editor v-model="responseData"
                      @json-change="handleChange"
                      mode="code" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
// import JsonEditorVue from 'json-editor-vue3';
import { Vue3JsonEditor } from 'vue3-json-editor';
export default defineComponent({
  name: 'responseData',
  components: {
    // JsonEditorVue,
    Vue3JsonEditor,
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
  methods: {
    handleChange(val: any) {
      console.log('fuck change', val);
      this.$emit('update:modelValue', val);
    },
  },
  watch: {
    modelValue: {
      immediate: true,
      deep: true,
      handler(val: any) {
        console.log('responseVal', val);
        this.responseData = val;
      },
    },
  },
});
</script>
<style lang="scss" scoped>
.response-data {
  width: 80%;
}
</style>