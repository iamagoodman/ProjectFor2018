import { Server, Mock } from '@/server/server';
import { uuid } from '@/utils';
export default {
  namespaced: true,
  state: {
    emptyProject: [
      {
        name: 'emptyProject',
        level: 1,
        uuid: uuid()
      }
    ],
    projectList: [
      {
        name: 'testproject',
        level: 1,
        updateAt: '2021/12/20 09:30:40',
        remarks: '这是备注，这是备注11111',
        author: 'quntta',
        baseUrl: 'http://localhost:8000/',
        uuid: 'fdas',
        children: [
          {
            name: '用户模块',
            level: 2,
            uuid: 'fdsjj',
            children: [
              {
                name: '登陆',
                level: 3,
                uuid: 'iofdsssel',
                url: '/user/login',
                method: 'post',
                request: {
                  headers: [
                    {
                      key: 'content-type',
                      value: 'application/json'
                    }
                  ],
                  paramsValid: [
                    {
                      type: 'string',
                      required: true,
                      name: 'user_name',
                      value: 'zhangsan'
                    },
                    {
                      type: 'string',
                      required: true,
                      name: 'password',
                      value: '1234556'
                    },
                  ],
                  params: [
                    {
                      key: 'user_name',
                      value: 'gaga',
                      type: 'string',
                      required: true,
                      checked: true,
                    }
                  ],
                  body: {
                    json: { name: 'jack' },
                    list: []
                  },
                  bodyType: 'json',
                },
                headers: [
                  {
                    key: 'content-type',
                    value: 'application/json'
                  }
                ],
                paramsValid: [
                  {
                    type: 'string',
                    required: true,
                    name: 'user_name',
                    value: 'zhangsan'
                  },
                  {
                    type: 'string',
                    required: true,
                    name: 'password',
                    value: '1234556'
                  },
                ],
                params: [
                  {
                    key: 'user_name',
                    value: 'gaga',
                    type: 'string',
                    required: true,
                    checked: true,
                  }
                ],
                body: {
                  json: { name: 'jack' },
                  list: []
                },
                bodyType: 'json',
                response: {
                  user_name: 'gagaga',
                  sex: 1,
                }
              },
              {
                name: '注册',
                level: 3,
                uuid: 'iolpoopfd',
                url: '/user/register',
                method: 'post',
                headers: [
                  {
                    key: 'content-type',
                    value: 'application/json'
                  }
                ],
                paramsValid: [
                  {
                    type: 'string',
                    required: true,
                    name: 'user_name',
                    value: 'zhangsan'
                  },
                  {
                    type: 'string',
                    required: true,
                    name: 'password',
                    value: '1234556'
                  },
                ],
                response: {
                  user_name: 'gagaga',
                  sex: 1,
                }
              }
            ]
          },
          {
            name: '登陆',
            level: 3,
            uuid: 'iol',
            url: '/user/login',
            method: 'post',
            headers: [
              {
                key: 'content-type',
                value: 'application/json'
              }
            ],
            paramsValid: [
              {
                type: 'string',
                required: true,
                name: 'user_name',
                value: 'zhangsan'
              },
              {
                type: 'string',
                required: true,
                name: 'password',
                value: '1234556'
              },
            ],
            response: {
              user_name: 'gagaga',
              sex: 1,
            }
          },
          {
            name: '注册',
            level: 3,
            uuid: 'iolfd',
            url: '/user/register',
            method: 'post',
            headers: [
              {
                key: 'content-type',
                value: 'application/json'
              }
            ],
            paramsValid: [
              {
                type: 'string',
                required: true,
                name: 'user_name',
                value: 'zhangsan'
              },
              {
                type: 'string',
                required: true,
                name: 'password',
                value: '1234556'
              },
            ],
            response: {
              user_name: 'gagaga',
              sex: 1,
            }
          }
        ]
      }
    ],
    projectDetail: undefined
  },
  getters: {
    detail2Folders: state => {
      return state.projectList[0].children.filter(item => item.level === 2);
    },
    detail2Requests: state => {
      return state.projectList[0].children.filter(item => item.level === 3);
    },
    detail: state => {
      // return state.projectDetail || state.projectList;
      // return state.projectList;
      return state.projectDetail || state.emptyProject;
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
    }
  },

};
