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
        <empty-card :noProject="projectList.length < 0"
                    @click="handleMore"
                    class="my-pointer" />
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
    ...mapActions('mock', {
      queryList: 'asyncQueryProjectList',
      deleteItem: 'asyncDeleteProject',
    }),
    handleMore() {
      this.$router.push('/mock/edit');
    },
    cardHandler(value: any) {
      switch (value.handleType) {
        case 'read':
          this.$router.push(`/mock/detail?id=${value.id}`);
          break;
        case 'edit':
          this.$router.push(`/mock/edit?id=${value.id}`);
          break;
        default:
          this.handleDelete({ project_name: value.project_name, id: value.id });
      }
    },
    handleDelete(params: any) {
      ElMessageBox.confirm(
        `项目${params.project_name}删除后将不可恢复，确定要删除吗?`,
        '温馨提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      )
        .then(() => {
          this.deleteItem({ id: params.id })
            .then((res) => {
              ElMessage({
                type: 'success',
                message: res.message || '成功',
              });
            })
            .catch((error) => {
              ElMessage({
                type: 'warning',
                message: error.message || '失败',
              });
            });
          // ElMessage({
          //   type: 'success',
          //   message: 'Delete completed',
          // });
        })
        .catch(() => {
          console.log('取消');
        });
    },
  },
});
</script>
<style lang="scss" scoped>
</style>
  