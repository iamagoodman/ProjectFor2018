import { Server, Mock } from '@/server/server';
import { uuid } from '@/utils';
export default {
  namespaced: true,
  state: {
    emptyProject: [
      {
        name: 'emptyProject',
        level: 1
      }
    ],
    projectList: [],
    projectDetail: undefined
  },
  getters: {
    detail2Folders: state => {
      return state.state.projectDetail.children.filter(item => item.level === 2);
    },
    detail2Requests: state => {
      return state.state.projectDetail.children.filter(item => item.level === 3);
    },
    detail: state => {
      return state.projectDetail || state.emptyProject;
    },
    readDetail: state => {
      return state.projectDetail ? state.projectDetail[0] : state.emptyProject;
    },
    list: state => state.projectList
  },
  mutations: {
    setDetail: (state: any, detail: any) => {
      state.projectDetail = detail;
    },
    setList: (state: any, list: any[]) => {
      console.log('set list', list);
      state.projectList = list;
    }
  },
  actions: {
    asyncSaveProjectDetail({ commit }, projectDetail) {
      return new Promise((resove, reject) => {
        Server(Mock.save, projectDetail)
          .then((res) => {
            commit('setDetail', [JSON.parse(projectDetail.project_detail)]);
            resove(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    asyncQueryProjectList({ commit }) {
      return new Promise((resove, reject) => {
        Server(Mock.list)
          .then(({ result = [], success }) => {
            if (success) {
              commit('setList', result);
              commit('setDetail', undefined);
            }
            resove({ success, result });
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    asyncQueryProjectDetailByid({ commit }, params: any) {
      return new Promise((resove, reject) => {
        Server(Mock.queryById, params)
          .then(({ result = {}, success }) => {
            if (success) {
              commit('setDetail', [result]);
              console.log(success);
            }
            resove({ success, result });
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    asyncDeleteProject({ commit, dispatch }, params: any) {
      return new Promise((resove, reject) => {
        Server(Mock.delete, params)
          .then(({ result = {}, success }) => {
            if (success) {
              dispatch('asyncQueryProjectList');
              console.log(success);
            }
            resove({ success, result });
          })
          .catch((error) => {
            reject(error);
          });
      });
    }
  },

};
