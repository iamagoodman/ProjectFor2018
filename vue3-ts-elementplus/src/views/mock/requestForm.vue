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
                   @click="submitForm(ruleFormRef)">Create</el-button>
        <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import { reactive, ref, defineComponent, toRef } from 'vue';
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
  setup(props: any) {
    const resetForm = (node: any) => {
      console.log(node);
    };
    const submitForm = (node: any) => {
      node.validate((valid) => {
        if (valid) {
          console.log(node.model);
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
      request: {
        params: modelValue.value.params || [],
        headers: modelValue.value.headers || [],
        body: modelValue.value.body || {},
        bodyType: modelValue.value.bodyType,
      },
      response: {},
    };
    console.log('defaultForm', defaultForm);
    const ruleForm = reactive(defaultForm);
    console.log(ruleForm);
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
    return {
      resetForm,
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