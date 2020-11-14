import querystring from 'querystring'
import {
  queryByTarget,
  saveOrUpdate,
  deleteById,
  queryPage,
  queryAll
} from '@/utils/dataHandler'
import infocheck from './infocheck'

// 该store用来存储 报名信息审核\咨询信息审核的相关信息与数据操作
// 其中报名信息审核查到的数据需要带orderId,咨询的不带
const state = {
  // 注册审核信息列表，使用评论模拟,包含基本评论信息和对应的orderId下的项目详情和用户详情
  signupcheck: [],
  // 咨询审核信息
  infocheck: [],
  // 分页总数
  totalSignUp: 0,
  totalInfoCheck: 0
}

const mutations = {
  SET_SIGNUPCHECK(state, signupcheck) {
    state.signupcheck = signupcheck
  },
  SET_INFOCHECK(state, infocheck) {
    state.infocheck = infocheck
  },
  SET_TOTALSIGNUP(state, total) {
    state.totalSignUp = total
  },
  SET_TOTALINFOCHECK(state, total) {
    state.totalInfoCheck = total
  },
  PUSH_SIGNUPCHECK(state, element) {
    state.signupcheck.push(element)
  },
  PUSH_INFOCHECK(state, element) {
    state.infocheck.push(element)
  },
  SET_EMPTY(state){
    state.signupcheck = []
    state.infocheck = []
  }
}

const actions = {
  // 查询评论并分离评论
  querySignUpInfo({
    state,
    commit
  }) {
    queryAll('/comment/findAll', (res) => {
      commit('SET_EMPTY')
      // 剥离有 orderId 的和没有的
      res.forEach(element => {
        if (element.orderId) {
          queryByTarget('/order/findById', {
            id: element.orderId
          }, (result) => {
            // 剥离所有和 项目管理里项目有关的
            if (result.orderLines[0] && result.orderLines[0].product && result.orderLines[0].product.categoryId == '9411') {
              element.customer = result.customer
              element.product = result.orderLines[0].product
              element.product.photo = JSON.parse(result.orderLines[0].product.photo)
              commit('PUSH_SIGNUPCHECK', element)
              commit('SET_TOTALSIGNUP', state.signupcheck.length)
            }
          })
        } else if (element.cusId) {
          queryByTarget('/customer/findCustomerById', {
            id: element.cusId
          }, (result) => {
            element.customer = result
            commit('PUSH_INFOCHECK', element)
            commit('SET_TOTALINFOCHECK', state.infocheck.length)
          })
        }

      });
    })
  },
  // 更新内容
  updateSignUpInfo({
    commit
  }, data) {
    saveOrUpdate('/comment/saveOrUpdate', data, (res) => {

    })
  },
  // 通过审核
  passComment({ dispatch },id){
    queryByTarget('/comment/commentExamine',{commentid:id},(res)=>{
      dispatch('querySignUpInfo')
    })
  },
  // 不通过审核
  nopassComment({ dispatch },id){
    queryByTarget('/comment/commentRefuseExamine',{commentid:id},(res)=>{
      dispatch('querySignUpInfo')
    })
  },
  // 删除内容
  deleteSignUpInfo({
    commit
  }, id) {
    saveOrUpdate('/comment/deleteById', id, (res) => {

    })
  },
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
