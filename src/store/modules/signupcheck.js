import querystring from 'querystring'
import {
  queryByTarget,
  saveOrUpdate,
  deleteById,
  queryPage
} from '@/utils/dataHandler'

// 该store用来存储 报名信息审核的相关信息与数据操作
const state = {
  // 注册审核信息列表，使用评论模拟,包含基本评论信息和对应的orderId下的项目详情和用户详情
  signupcheck: [],
  // 分页总数
  total: 0
}

const mutations = {
  SET_SIGNUPCHECK(state, signupcheck) {
    state.signupcheck = signupcheck
  },
  SET_TOTAL(state, total) {
    state.total = total
  },
  PUSH_SIGNUPCHECK(state, element) {
    state.signupcheck.push(element)
  }
}

const actions = {
  //分页查询评论
  querySignUpInfo({
    commit
  }, list) {
    queryPage('/comment/query', list, (res) => {
      res.list.forEach(element => {
        queryByTarget('/order/findById', {
          id: element.orderId
        }, (result) => {
          element.customer = result.customer
          element.product = result.orderLines[0].product
          commit('PUSH_SIGNUPCHECK', element)
        })
      });
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
