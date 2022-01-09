<template>
  <div class="request-form">
    <el-form ref="ruleFormRef"
             :model="ruleForm"
             :rules="rules"
             label-width="120px"
             class="demo-ruleForm"
             size="small">
      <el-form-item :label="titleLabel"
                    prop="name">
        <el-input v-model="ruleForm.name"
                  style="width: 20%"></el-input>
      </el-form-item>
      <el-form-item label="baseUrl"
                    prop="baseUrl">
        <el-input v-model="ruleForm.baseUrl"
                  style="width: 40%"></el-input>
      </el-form-item>
      <el-form-item label="备注"
                    prop="remarks">
        <el-input v-model="ruleForm.remarks"
                  style="width: 40%"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="submitForm(ruleFormRef, 'save')">Save</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import { reactive, ref, defineComponent, toRef, computed } from 'vue';
import type { ElForm } from 'element-plus';
export default defineComponent({
  name: 'baseForm',
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
    console.log('modelValue', modelValue.value);
    const titleLabel = computed(() =>
      modelValue.value.level === 1 ? '项目名称' : '模块名称'
    );
    const ruleForm = reactive({
      name: modelValue.value.name || '',
      baseUrl: modelValue.value.baseUrl || '',
      remarks: modelValue.value.remarks || '',
    });

    const rules = reactive({
      name: [
        {
          required: true,
          type: 'string',
          message: 'Please input name value',
          trigger: 'blur',
        },
      ],
      baseUrl: [
        {
          required: true,
          type: 'string',
          message: 'Please input baseUrl value',
          trigger: 'blur',
        },
      ],
      remarks: [
        {
          required: false,
          type: 'string',
          message: 'Please input remarks value',
          trigger: 'blur',
        },
      ],
    });
    return {
      submitForm,
      formSize,
      ruleFormRef,
      ruleForm,
      rules,
      titleLabel,
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