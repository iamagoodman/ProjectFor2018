<template>
  <div class="request-data">
    <el-tabs type="border-card">
      <el-tab-pane label="Params">
        <key-value-valid v-model="params" />
      </el-tab-pane>
      <el-tab-pane label="Headers">
        <key-value-valid v-model="headers" />
      </el-tab-pane>
      <el-tab-pane label="Body">
        <div class="body-type-container">
          <el-radio-group v-model="bodyType"
                          size="small">
            <el-radio v-for="item in BODY_TYPE"
                      :key="item.value"
                      :label="item.label">{{item.label}}</el-radio>
          </el-radio-group>
        </div>
        <key-value-valid v-model="body.list"
                         v-if="showKeyValBody" />
        <json-editor-vue class="editor"
                         v-model="body.json"
                         v-if="showJsonBody" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
// import KeyValue from '@/components/keyValue.vue';
import KeyValueValid from '@/components/keyValueValid.vue';
import JsonEditorVue from 'json-editor-vue3';
import { BODY_TYPE } from '@/constant';
export default defineComponent({
  name: 'requestData',
  components: {
    // KeyValue,
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
          params: [],
          headers: [],
          body: {},
        };
      },
    },
  },
  methods: {
    handleEmit() {
      this.$emit('update:modelValue', {
        params: this.params,
        headers: this.headers,
        body: this.bodyData,
        bodyType: this.bodyType,
      });
    },
  },
  computed: {
    bodyData() {
      if (this.bodyType === 'json') {
        return this.body.json;
      }
      if (this.bodyType === 'none') {
        return {};
      }
      return this.body.list;
    },
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
    params() {
      this.handleEmit();
    },
    headers() {
      this.handleEmit();
    },
    body() {
      this.handleEmit();
    },
    modelValue: {
      immediate: true, // 很重要！！！
      handler(val) {
        this.params = val.params;
        this.headers = val.headers;
        // let body = { json: {}, list: [] };
        this.bodyType = val.bodyType;
        // if (val.bodyType === 'json') {
        //   body.json = val.body;
        // } else {
        //   body.list = val.body;
        // }
        // this.body = body;
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