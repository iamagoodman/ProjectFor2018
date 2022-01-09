<template>
  <div class="wrapper">
    <el-row :gutter="10">
      <el-col :span="4"
              v-for="item in projectList"
              :key="item.id">
        <Card :project="item"
              @handle-event="cardHandler" />
      </el-col>
      <el-col :span="4">
        <empty-card :noProject="true"
                    class="my-pointer" />
      </el-col>
      <el-col :span="4">
        <empty-card :noProject="false" />
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';
import Card from '@/components/card.vue';
import EmptyCard from '@/components/emptyCard.vue';
import { ElMessageBox, ElMessage } from 'element-plus';
export default defineComponent({
  name: 'mock',
  components: {
    Card,
    EmptyCard,
  },
  computed: {
    ...mapGetters('mock', { projectList: 'list' }),
  },
  mounted() {
    this.queryList()
      .then((res) => {
        console.log(res.result);
        console.log('this.projectList', this.projectList);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    ...mapActions('mock', { queryList: 'asyncQueryProjectList' }),
    cardHandler(value: any) {
      switch (value.handleType) {
        case 'read':
          this.$router.push(`/mock/detail?id=${value.id}`);
          break;
        case 'edit':
          this.$router.push(`/mock/edit?id=${value.id}`);
          break;
        default:
          this.handleDelete();
      }
    },
    handleDelete() {
      ElMessageBox.confirm(
        'proxy will permanently delete the file. Continue?',
        'Warning',
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning',
        }
      )
        .then(() => {
          ElMessage({
            type: 'success',
            message: 'Delete completed',
          });
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: 'Delete canceled',
          });
        });
    },
  },
});
</script>
<style lang="scss" scoped>
</style>
  