<template>
  <div class="key-value">
    <!-- <div class="title">
      <span class="key">Key</span>
      <span class="value">Value</span>
    </div> -->
    <div class="data"
         v-for="(item, index) in list"
         :key="item.renderKey">
      <el-checkbox v-model="item.checked"
                   @change="handleEmit" />
      <el-input placeholder="Key"
                v-model="item.key"
                size="small"
                class="key-input"
                @change="handleEmit"
                @input="handleListChange(index)" />
      <el-input placeholder="Value"
                v-model="item.value"
                size="small"
                class="value-input"
                @change="handleEmit"
                @input="handleListChange(index)" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { uuid } from '@/utils/index';
export default defineComponent({
  name: 'keyValue',
  data() {
    return {
      list: [{ key: '', value: '', checked: false, renderKey: uuid() }],
    };
  },
  props: {
    modelValue: {
      type: Array,
      default() {
        return [{ key: '', value: '', checked: false, renderKey: uuid() }];
      },
    },
  },
  watch: {
    modelValue(newVal: any, oldVal: any) {
      this.list = newVal;
    },
  },
  methods: {
    handleListChange(index: number) {
      if (index + 1 === this.list.length) {
        this.list.push({
          key: '',
          value: '',
          checked: false,
          renderKey: uuid(),
        });
      }
    },
    handleEmit() {
      console.log('emit');
      this.$emit('update:modelValue', this.list);
    },
  },
});
</script>
<style lang="scss" scoped>
.title {
  display: flex;
  flex-direction: row;
  span {
    flex: 1;
    height: 30px;
    line-height: 30px;
  }
}
.data {
  .key-input {
    margin-left: 10px;
    width: 45%;
    ::v-deep .el-input__inner {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
  .value-input {
    width: 50%;
    ::v-deep .el-input__inner {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
}
</style>