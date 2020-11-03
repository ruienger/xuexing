import {
  queryByTarget,
  saveOrUpdate,
  deleteById
} from '@/utils/dataHandler'
// 该store用来存储项目信息与操作数据的方法

const state = {
  // 栏目ID为 9411 的子产品
  projects: [],
  //  子产品分页后的数组
  pagedProjects: [],
  // 产品总数
  total: 0
}

const mutations = {
  SET_PROJECTS(state, projects) {
    state.projects = projects
  },
  SET_TOTAL(state, total) {
    state.total = total
  },
  SET_PAGEDPROJECTS(state, pagedProjects) {
    state.pagedProjects = pagedProjects
  }
}

const actions = {
  // 请求 项目数据
  queryProject({
    commit
  }, list) {
    // 获取栏目为 9411 的产品作为项目展示 res为返回的data数组
    queryByTarget('/product/findByCategoryId', {
      id: 9411
    }, (res) => {
      commit('SET_PROJECTS', res)
      let startPage = list.page * list.pageSize
      res.slice(startPage, startPage + list.pageSize)
      // 提交mutations
      commit('SET_TOTAL', res.length/list.pageSize)
      commit('SET_PAGEDPROJECTS', res)
    })
  },
  // 更新项目数据
  updateProject({
    dispatch
  }, {
    data,
    list
  }) {
    saveOrUpdate('/product/saveOrUpdate', data, (res) => {
      dispatch('queryProject', list)
    })
  },
  //删除项目数据
  deleteProject({
    dispatch
  }, {
    id,
    list
  }) {
    deleteById('/product/deleteById', id, (res) => {
      dispatch('queryProject', list)
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
