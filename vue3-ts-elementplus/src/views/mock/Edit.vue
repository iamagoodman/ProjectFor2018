<template>
  <div class="wrapper project-edit">
    <back :backList="routerList" />
    <div class="project-container">
      <div class="project-menu">
        <el-tree :data="treeData"
                 :props="defaultProps"
                 @node-click="handleNodeClick"
                 node-key="uuid"
                 :default-expanded-keys="defaultOpenKey">
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
        <base-form v-if="showBaseForm" />
        <request-form v-else />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters, mapMutations } from 'vuex';
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
import { uuid, createEmpty } from '@/utils';
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
  computed: {
    ...mapGetters('mock', { treeData: 'detail' }),
    defaultOpenKey() {
      return [this.treeData[0].uuid];
    },
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
    ...mapMutations(['setDetail']),
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
      console.log('delete', data);
    },
    handleAdd(data: any, type: string) {
      const item = createEmpty(type);
      const cloneData = cloneDeep(this.treeData);
      cloneData.children.forEach(child => {
        if(type === 'request')
      });
      console.log('add', data);
    },
    handleHover(data: any) {
      this.activeData = data;
    },
    handleNodeClick(data: any) {
      console.log(data);
      // this.activeData = data;
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