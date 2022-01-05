<template>
  <div class="type-url">
    <el-select class="small-select"
               v-model="methodUrl.method"
               placeholder="method"
               @change="handleEmit">
      <el-option v-for="item in methodOptions"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value" />
    </el-select>
    <el-input class="small-input"
              type="text"
              v-model="methodUrl.url"
              @input="handleEmit" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'methodUrl',
  data() {
    return {
      methodUrl: {
        method: '',
        url: '',
      },
      methodOptions: [
        {
          label: 'get',
          value: 'get',
        },
        {
          label: 'post',
          value: 'post',
        },
      ],
    };
  },
  props: {
    modelValue: {
      type: Object,
      default: () => {
        return { method: 'get', url: '' };
      },
    },
  },
  methods: {
    handleEmit() {
      this.$emit('update:modelValue', this.methodUrl);
    },
  },
  watch: {
    modelValue: {
      immediate: true, // 很重要！！！
      handler(val) {
        this.methodUrl = !val ? {} : val;
      },
    },
  },
});
</script>
<style lang="scss" scoped>
.small-select {
  width: 10%;
  ::v-deep .el-input__inner {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
}

.small-input {
  width: 40%;
  ::v-deep .el-input__inner {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
}
</style>