<template>
  <div class="key-value">
    <div class="data"
         v-for="(item, index) in list"
         :key="item.renderKey">
      <el-checkbox v-model="item.checked"
                   @change="handleEmit" />
      <el-input placeholder="Key"
                v-model="item.key"
                size="small"
                class="first-input"
                @change="handleEmit"
                @input="handleListChange(index)" />
      <el-input placeholder="Value"
                v-model="item.value"
                size="small"
                class="middle-input value-input"
                @change="handleEmit"
                @input="handleListChange(index)" />
      <el-select v-model="item.type"
                 class="middle-input"
                 placeholder="params type"
                 size="small"
                 @change="handleEmit">
        <el-option v-for="item in PARAMS_TYPE"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="item.required"
                 placeholder="is required"
                 class="last-input"
                 size="small"
                 @change="handleEmit">
        <el-option v-for="item in TRUEFALSE"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
        </el-option>
      </el-select>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
// import { Plus } from '@element-plus/icons-vue';
import { uuid } from '@/utils/index';
import { PARAMS_TYPE, TRUEFALSE } from '@/constant';
export default defineComponent({
  name: 'keyValue',
  components: {
    // Plus,
  },
  data() {
    return {
      PARAMS_TYPE,
      TRUEFALSE,
      list: [
        {
          key: '',
          value: '',
          checked: false,
          type: '',
          renderKey: uuid(),
        },
      ],
    };
  },
  props: {
    modelValue: {
      type: Array,
      default() {
        return [
          {
            key: '',
            value: '',
            checked: false,
            type: '',
            renderKey: uuid(),
          },
        ];
      },
    },
  },
  watch: {
    modelValue: {
      immediate: true, // 很重要！！！
      handler(val) {
        let list = val;
        if (val && val.length && val[val.length - 1].key) {
          list.push({
            key: '',
            value: '',
            checked: false,
            type: '',
            renderKey: uuid(),
          });
        }
        this.list = list;
      },
    },
  },
  methods: {
    handleListChange(index: number) {
      if (index + 1 === this.list.length) {
        this.list.push({
          key: '',
          value: '',
          checked: false,
          type: '',
          renderKey: uuid(),
        });
      }
    },
    handleEmit() {
      this.$emit('update:modelValue', this.list);
      this.$emit('change');
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
  .first-input {
    margin-left: 10px;
    width: 25%;
    ::v-deep .el-input__inner {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
  .middle-input {
    width: 18%;
    ::v-deep .el-input__inner {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
  .value-input {
    width: 35%;
  }
  .last-input {
    width: 15%;
    ::v-deep .el-input__inner {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
}
</style>