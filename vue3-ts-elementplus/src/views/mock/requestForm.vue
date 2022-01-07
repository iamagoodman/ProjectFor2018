<template>
  <div class="request-form">
    <el-form ref="ruleFormRef"
             :model="ruleForm"
             :rules="rules"
             label-width="120px"
             class="demo-ruleForm"
             size="small">
      <el-form-item label="接口名称"
                    prop="name">
        <el-input v-model="ruleForm.name"
                  style="width: 20%"></el-input>
      </el-form-item>
      <el-form-item label="类型&amp;url"
                    prop="methodUrl">
        <method-url v-model="ruleForm.methodUrl" />
      </el-form-item>
      <el-form-item label="request"
                    prop="request">
        <request-data v-model="ruleForm.request" />
      </el-form-item>
      <el-form-item label="response"
                    prop="response">
        <response-data v-model="ruleForm.response" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="submitForm(ruleFormRef, 'save')">Save</el-button>
        <el-button @click="submitForm(ruleFormRef, 'test')">Test</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import { reactive, ref, defineComponent, toRef, watch } from 'vue';
import type { ElForm } from 'element-plus';
import MethodUrl from '@/components/methodUrl.vue';
import RequestData from '@/components/requestData.vue';
import ResponseData from '@/components/responseData.vue';
export default defineComponent({
  name: 'requestForm',
  components: {
    MethodUrl,
    RequestData,
    ResponseData,
  },
  props: {
    modelValue: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  setup(props: any, context: any) {
    const submitForm = (node: any, eventType?: string) => {
      node.validate((valid) => {
        if (valid) {
          context.emit('request-event', node.model, eventType);
        }
      });
    };
    const formSize = ref('small');
    const ruleFormRef = ref<InstanceType<typeof ElForm>>();

    const modelValue = toRef(props, 'modelValue');
    const defaultForm = {
      name: modelValue.value.name || '',
      methodUrl: {
        method: modelValue.value.method || '',
        url: modelValue.value.url || '',
      },
      request: modelValue.value.request || undefined,
      response: modelValue.value.response,
    };
    console.log('defaultForm', defaultForm);
    const ruleForm = reactive(defaultForm);
    const rules = reactive({
      name: [
        {
          required: true,
          type: 'string',
          message: 'Please input name value',
          trigger: 'blur',
        },
      ],
      methodUrl: [
        {
          required: true,
          type: 'object',
          fields: {
            method: { type: 'string', required: true },
            url: { type: 'string', required: true },
          },
          trigger: 'blur',
        },
      ],
      request: [
        {
          required: false,
          type: 'object',
          fields: {
            params: { type: 'array', required: false },
            headers: { type: 'array', required: false },
            body: { type: 'object', required: false },
          },
          trigger: blur,
        },
      ],
      response: [
        {
          required: false,
          type: 'object',
        },
      ],
    });
    watch(ruleFormRef, (val) => {
      console.log(val);
    });
    return {
      submitForm,
      formSize,
      ruleFormRef,
      ruleForm,
      rules,
    };
  },
});
</script>
<style lang="scss" scoped>
.request-form {
  padding: 20px;
}
::v-deep .el-form-item__content {
  text-align: left;
}
</style>