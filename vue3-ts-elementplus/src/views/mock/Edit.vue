<template>
  <div class="wrapper project-edit">
    <back :backList="routerList" />
    <div class="project-container">
      <div class="project-menu">
        <el-tree :data="treeData"
                 :props="defaultProps"
                 node-key="uuid"
                 default-expand-all>
          <template #default="scope">
            <div class="custom-node">
              <el-icon>
                <folder-opened v-if="scope.data.level === 1" />
                <folder v-else-if="scope.data.level === 2" />
                <document v-else />
              </el-icon>
              <span>{{scope.node.label}}</span>
              <el-popover placement="bottom"
                          :width="80"
                          trigger="click"
                          popper-class="my-popover">
                <template #reference>
                  <el-icon class="fun-span"
                           @click="handleHover(scope.data)">
                    <more-filled />
                  </el-icon>
                </template>
                <div class="hover-popup">
                  <div v-for="item in actionList"
                       :key="item.label"
                       @click="handleAction(scope.data, item)">
                    <el-icon>
                      <folder-opened v-if="item.label === 'add folder'" />
                      <folder v-else-if="item.label === 'add request'" />
                      <edit v-else-if="item.label === 'edit'" />
                      <delete v-else />
                    </el-icon>
                    <span>{{item.label}}</span>
                  </div>
                </div>
              </el-popover>
            </div>
          </template>
        </el-tree>
      </div>
      <div class="project-content">
        <base-form v-if="showBaseForm"
                   v-model="editorData"
                   :key="editorData.uuid"
                   @request-event="handleRequestEvent" />
        <request-form v-else
                      v-model="editorData"
                      :key="editorData.uuid"
                      @request-event="handleRequestEvent" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapGetters, mapMutations } from 'vuex';
import Back from '@/components/back.vue';
import RequestForm from './requestForm.vue';
import BaseForm from './baseForm.vue';
import {
  FolderOpened,
  Folder,
  Document,
  MoreFilled,
  Delete,
  Edit,
} from '@element-plus/icons-vue';
import { cloneDeep } from 'lodash';
import { createEmpty, findByUuid, findParentByUuid } from '@/utils';
export default defineComponent({
  name: 'MockEdit',
  components: {
    Back,
    FolderOpened,
    Folder,
    Document,
    RequestForm,
    MoreFilled,
    Delete,
    BaseForm,
    Edit,
  },
  data() {
    return {
      showPopup: false,
      activeData: {},
      editorData: {},
      routerList: [
        { name: 'mock模块', path: '/mock' },
        { name: '项目编辑', path: '/mock/edit' },
      ],
      defaultProps: {
        children: 'children',
        label: (data: any) => {
          return data.name;
        },
      },
    };
  },
  mounted() {
    if (this.getQuery.id) {
      this.asyncGetItem({ id: this.getQuery.id });
    }
  },
  computed: {
    getQuery() {
      return this.$route.query;
    },
    ...mapGetters('mock', { treeData: 'detail' }),
    actionList() {
      let list: any[] = [
        {
          label: 'delete',
          level: 1,
        },
      ];
      if (this.activeData.level === 1) {
        list.unshift({
          label: 'add request',
          level: 3,
        });
        list.unshift({
          label: 'add folder',
          level: 1,
        });
      }
      if (this.activeData.level === 2) {
        list.unshift({
          label: 'add request',
          level: 3,
        });
      }
      list.unshift({
        label: 'edit',
        level: 3,
      });
      return list;
    },
    showBaseForm() {
      return this.editorData.level < 3;
    },
  },
  methods: {
    ...mapMutations({
      setDetail: 'mock/setDetail',
    }),
    ...mapActions('mock', {
      asyncSetDetail: 'asyncSaveProjectDetail',
      asyncGetItem: 'asyncQueryProjectDetailByid',
    }),
    handleAction(data: any, action: any) {
      switch (action.label) {
        case 'edit':
          this.editorData = data;
          break;
        case 'delete':
          this.handleDelete(data);
          break;
        case 'add request':
          this.handleAdd(data, 'request');
          break;
        case 'add folder':
          this.handleAdd(data, 'folder');
          break;
      }
    },
    handleDelete(data: any) {
      const cloneData = cloneDeep(this.treeData);
      const { parent, index } = findParentByUuid(cloneData, data);
      parent.children.splice(index, 1);
      this.setDetail(cloneData);
    },
    handleAdd(data: any, type: string) {
      const item = createEmpty(type);
      const cloneData = cloneDeep(this.treeData);
      const current = findByUuid(cloneData, data);
      current.children = current.children
        ? [...current.children, item]
        : [item];
      this.editorData = item;
      this.setDetail(cloneData);
    },
    handleHover(data: any) {
      this.activeData = data;
    },
    handleRequestEvent(data: any, eventType: string) {
      const current = {
        ...this.editorData,
        ...data,
        method: data.methodUrl?.method,
        url: data.methodUrl?.url,
      };
      if (current.level === 1) {
        this.setDetail([current]);
        this.createRequest(current);
      } else {
        const cloneData = cloneDeep(this.treeData);
        const { parent, index } = findParentByUuid(cloneData, current);
        parent.children.splice(index, 1, current);
        this.setDetail(cloneData);
        this.createRequest(cloneData[0]);
      }
    },
    createRequest(projectDetail: any) {
      const data = {
        remarks: projectDetail.remarks,
        project_name: projectDetail.name,
        id: projectDetail?.id,
        uuid: projectDetail.uuid,
        project_detail: JSON.stringify(projectDetail),
        dataType: 'json',
      };
      this.asyncSetDetail(data)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  watch: {
    editorData(newVal: any) {
      console.log('newVal', newVal);
    },
  },
});
</script>
<style lang="scss">
.el-popover.my-popover {
  padding: 0 !important;
}
.hover-popup div:hover {
  background: var(--el-background-color-base);
  cursor: pointer;
}
.hover-popup div {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px 10px !important;
  font-size: 13px !important;
}
</style>
<style lang="scss" scoped>
.project-edit {
  display: flex;
  flex-direction: column;
}
.project-container {
  flex: 1;
  display: flex;
  flex-direction: row;
  border: 1px solid var(--el-border-color-lighter);
}
.project-menu {
  flex: 1;
  border-right: 1px solid var(--el-border-color-lighter);
  box-shadow: 3px 0px 3px var(--el-border-color-lighter);
}
.project-content {
  flex: 4;
}
.method-span {
  color: var(--el-color-primary);
}
.custom-node {
  width: 100%;
  text-align: left;
  position: relative;
  display: flex;
}
.fun-span {
  position: absolute;
  right: 10px;
}
</style>