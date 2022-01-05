<template>
  <div class="request-container">
    <div id="copy-target">{{copyData}}</div>
    <div class="title">
      <span class="label">请求名称：</span>
      <span class="value">{{request.name}}</span>
    </div>
    <div class="request-body">
      <div class="title">
        <span class="label">url：</span>
        <span class="value copyBtn"
              :data-clipboard-text="copyData"
              data-clipboard-action="copy"
              data-clipboard-target="#copy-target"
              @click="copy(request.url)">{{ request.url }}</span>
      </div>
      <div class="title">
        <span class="label">请求方式：</span>
        <span class="value">{{ request.method }}</span>
      </div>
      <div class="title">
        <span class="label">headers:</span>
        <el-table :data="request.headers"
                  style="width: 30%"
                  size="small"
                  border
                  fit>
          <el-table-column prop="key"
                           label="key" />
          <el-table-column prop="value"
                           label="value" />
        </el-table>
      </div>

      <div class="title">
        <span class="label">请求参数：</span>
        <el-table :data="request.paramsValid"
                  style="width: 30%"
                  size="small"
                  border
                  fit>
          <el-table-column prop="name"
                           label="key名" />
          <el-table-column prop="required"
                           label="是否必传" />
          <el-table-column prop="type"
                           label="类型" />
          <el-table-column prop="value"
                           label="值示例" />
        </el-table>
      </div>

      <div class="title">
        <span class="label">请求示例：</span>
        <pre class="value copyBtn"
             :data-clipboard-text="copyData"
             data-clipboard-action="copy"
             data-clipboard-target="#copy-target"
             @click="copy(paramsDemo(request.paramsValid))">{{paramsDemo(request.paramsValid)}}</pre>
      </div>
      <div class="title">注: 请求参数格式具体要看content-type要求，如application/json对应{"key1": value1,"key2": value2},x-www-form-urlencoded则对应key1=value1&key2=value2,以上示例仅供参考</div>
      <div class="title">
        <span class="label">返回参数示例：</span>
        <pre class="value copyBtn"
             :data-clipboard-text="copyData"
             data-clipboard-action="copy"
             data-clipboard-target="#copy-target"
             @click="copy(request.response)">{{request.response}}</pre>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { ElMessage } from 'element-plus';
import Clipboard from 'clipboard';
export default defineComponent({
  data() {
    return {
      copyData: '',
    };
  },
  props: {
    request: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  methods: {
    copy(params: any) {
      this.copyData = JSON.stringify(params);
      let clipboard = new Clipboard('.copyBtn');
      clipboard.on('success', function (e) {
        ElMessage({
          duration: 800,
          message: '复制成功',
          type: 'success',
        });
        e.clearSelection();
        clipboard.destroy();
      });
    },
    paramsDemo(paramsValid: any[]) {
      const params = {};
      paramsValid.forEach((item) => {
        params[item.name] = item.value;
      });
      return params;
    },
  },
});
</script>
<style lang="scss" scoped>
.title {
  padding: 2px 0 2px 20px;
  .value {
    color: var(--el-color-primary);
  }
}
#copy-target {
  display: none;
}
</style>