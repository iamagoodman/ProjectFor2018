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
    </el-form>
  </div>
</template>
<script lang="ts">
import { reactive, ref, defineComponent } from 'vue';
import type { ElForm } from 'element-plus';
export default defineComponent({
  name: 'requestForm',
  setup() {
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
    const ruleForm = reactive({
      name: '',
      baseUrl: '',
      remarks: '',
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
          required: true,
          type: 'string',
          message: 'Please input remarks value',
          trigger: 'blur',
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