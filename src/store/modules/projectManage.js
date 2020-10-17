import request from '@/utils/request'
import querystring from 'querystring'
export default{
  namespaced: true,

    state:{
        projects:[],
        total:0,
    },
    mutations:{
        SET_PROJECT(state, projects) {
            state.projects = projects
        },
        SET_TOTAL(state, total) {
            state.total = total
        }
    },

    actions:{
        queryProject({ commit }, list) {
            request({
              method: 'POST',
              url: '/product/query',
              data: querystring.stringify(list)
            }).then((res) => {
              commit('SET_PROJECT', res.data.list)
              commit('SET_TOTAL', res.data.total)
            })
          }
    },

}
