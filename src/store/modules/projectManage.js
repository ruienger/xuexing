import {
  queryByTarget,
  saveOrUpdate,
  deleteById,
  queryAll
} from '@/utils/dataHandler'
// 该store用来存储项目信息与操作数据的方法

const state = {
  // 栏目ID为 9441 的子产品
  projects9441: [],
  // 栏目ID为 9425 的子产品
  projects9425: [],
  // 栏目ID为 9414 的子产品
  projects9414: [],
  // 栏目ID为 9440 的子产品
  projects9440: [],
  // 栏目ID为 9432 的子产品
  projects9432: [],
  // 栏目ID为 9411 的子产品
  projects9411: [],
  //  子产品分页后的数组
  pagedProjects9411: [],
  // 产品总数
  total: 0,
  // 所有产品
  allProjects: {}
}

const mutations = {
  SET_PROJECTS9441(state, projects9441) {
    state.projects9441 = projects9441
  },
  SET_PROJECTS9425(state, projects9425) {
    state.projects9425 = projects9425
  },
  SET_PROJECTS9414(state, projects9414) {
    state.projects9414 = projects9414
  },
  SET_PROJECTS9440(state, projects9440) {
    state.projects9440 = projects9440
  },
  SET_PROJECTS9432(state, projects9432) {
    state.projects9432 = projects9432
  },
  SET_PROJECTS9411(state, projects9411) {
    state.projects9411 = projects9411
  },
  SET_TOTAL(state, total) {
    state.total = total
  },
  SET_PAGEDPROJECTS9411(state, pagedProjects9411) {
    state.pagedProjects9411 = pagedProjects9411
  },
  SET_PROJECTSALL(state, allProjects) {
    state.allProjects = allProjects
  }
}

const actions = {
  // 请求 所有项目数据
  queryAllProjects({ commit }){
    queryAll('/product/findAll',(res)=>{
      commit('SET_PROJECTSALL',res)
    })
  },
  // 请求全部项目数据，分页由 工具类 utils 中的 pageHelper 来做
  queryProject({
    commit
  },id){
    // 获取栏目为 9411 的产品作为项目展示 res为返回的data数组
    queryByTarget('/product/findByCategoryId', {
      id
    }, (res) => {
      commit('SET_PROJECTS'+id, res)
      // 提交mutations
      commit('SET_TOTAL', res.length)
    })
  },
  // 请求各个 栏目 的数据
  // 更新项目数据
  updateProject({
    dispatch
  }, {
    data,
    id
  }) {
    saveOrUpdate('/product/saveOrUpdate', data, (res) => {
      dispatch('queryProject', id)
    })
  },
  //删除项目数据
  deleteProject({
    dispatch
  }, {
    id,
    cateId
  }) {
    deleteById('/product/deleteById', id, (res) => {
      dispatch('queryProject', cateId)
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
