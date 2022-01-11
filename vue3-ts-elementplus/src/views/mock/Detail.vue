<template>
  <div class="wrapper project-detail">
    <back :backList="routerList" />
    <div class="title">
      <span class="label">项目名称：</span>
      <span class="value">{{detail.name}}</span>
    </div>
    <div class="padding-item">
      <div class="title"
           v-for="folder in folders"
           :key="folder.name">
        <span class="label">模块：</span>
        <span class="value">{{folder.name}}</span>
        <!-- <div class="padding-item"
             v-for="request in folder.requests"
             :key="request.requestName">
          <request-item :request="request" />
        </div> -->
        <div class="padding-item"
             v-if="folder.children">
          <request-item v-for="request in folder.children"
                        :key="request.uuid"
                        :request="request" />
        </div>
      </div>
      <!-- <div class="title"
           v-for="request in detail.requests"
           :key="request.requestName">
        <request-item :request="request" />
      </div> -->
      <div v-if="requests.length">
        <request-item v-for="request in detail.requests"
                      :key="request.uuid"
                      :request="request" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters, mapState, mapActions } from 'vuex';
import RequestItem from '@/components/requestItem.vue';
import Back from '@/components/back.vue';
export default defineComponent({
  name: 'MockDetail',
  components: {
    RequestItem,
    Back,
  },
  data() {
    return {
      routerList: [
        { name: 'mock模块', path: '/mock' },
        { name: '项目详情', path: '/mock/detail' },
      ],
    };
  },
  mounted() {
    if (this.getQuery.id) {
      this.asyncGetItem({ id: this.getQuery.id, dataType: 'json' });
    }
  },
  computed: {
    getQuery() {
      return this.$route.query;
    },
    ...mapGetters('mock', { detail: 'readDetail' }),
    folders() {
      return this.detail.children?.filter((child) => child.level === 2) || [];
    },
    requests() {
      return this.detail.children?.filter((child) => child.level === 3) || [];
    },
  },
  methods: {
    ...mapActions('mock', {
      asyncGetItem: 'asyncQueryProjectDetailByid',
    }),
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
.project-detail {
  text-align: left;
}
.title {
  padding: 2px 0 2px 20px;
  .value {
    color: var(--el-color-primary);
  }
}
.padding-item {
  padding-left: 20px;
}
</style>