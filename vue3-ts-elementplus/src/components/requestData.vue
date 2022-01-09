<template>
  <div class="request-data">
    <el-tabs type="border-card">
      <el-tab-pane label="Params">
        <key-value-valid @change="handleValChange"
                         v-model="params" />
      </el-tab-pane>
      <el-tab-pane label="Headers">
        <key-value-valid v-model="headers"
                         @change="handleValChange" />
      </el-tab-pane>
      <el-tab-pane label="Body">
        <div class="body-type-container">
          <el-radio-group v-model="bodyType"
                          size="small"
                          @change="handleValChange">
            <el-radio v-for="item in BODY_TYPE"
                      :key="item.value"
                      :label="item.label">{{item.label}}</el-radio>
          </el-radio-group>
        </div>
        <key-value-valid v-model="body.list"
                         v-if="showKeyValBody"
                         @change="handleValChange" />
        <json-editor-vue v-model="body.json"
                         v-if="showJsonBody"
                         @change="handleJsonChange" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import KeyValueValid from '@/components/keyValueValid.vue';
import JsonEditorVue from 'json-editor-vue3';
import { BODY_TYPE } from '@/constant';
export default defineComponent({
  name: 'requestData',
  components: {
    KeyValueValid,
    JsonEditorVue,
  },
  data() {
    return {
      bodyType: 'none',
      BODY_TYPE,
      params: [],
      headers: [],
      body: {
        list: [],
        json: {},
      },
    };
  },
  props: {
    modelValue: {
      type: Object,
      default() {
        return {
          params: undefined,
          headers: undefined,
          body: { json: {} },
          bodyType: 'none',
        };
      },
    },
  },
  methods: {
    handleValChange() {
      this.handleEmit();
    },
    handleJsonChange(val: any) {
      console.log(val);
      this.handleEmit();
    },
    handleEmit() {
      console.log('fuck emit');
      this.$emit('update:modelValue', {
        params: this.params || undefined,
        headers: this.headers || undefined,
        body: this.body || { json: {} },
        bodyType: this.bodyType,
      });
    },
  },
  computed: {
    showKeyValBody() {
      return (
        this.bodyType === 'form-data' ||
        this.bodyType === 'x-www-form-urlencoded'
      );
    },
    showJsonBody() {
      return this.bodyType === 'json';
    },
  },
  watch: {
    modelValue: {
      immediate: true, // 很重要！！！
      handler(val) {
        console.log('val', val);
        this.params = val.params;
        this.headers = val.headers;
        this.bodyType = val.bodyType;
        this.body = val.body;
        console.log(val);
      },
    },
  },
});
</script>
<style lang="scss" scoped>
.request-data {
  width: 80%;
}
</style>