import request from '@/utils/request'
import querystring from 'querystring'
export default{
  namespaced: true,

    state:{
        comments:[],
        total:0,
    },
    mutations:{
        SET_COMMENT(state, comments) {
            state.comments = comments
        },
        SET_TOTAL(state, total) {
            state.total = total
        }
    },

    actions:{
            // 查询所有评论
        // findComment({commit}){
        //     request.get('/product/findAll').then((res)=>{
        //         commit('SET_COMMENT',res.data)
        //     })
        // },
        queryComment({ commit }, list) {
            request({
              method: 'POST',
              url: '/product/query',
              data: querystring.stringify(list)
            }).then((res) => {
              commit('SET_COMMENT', res.data.list)
              commit('SET_TOTAL', res.data.total)
            })
          }
    },

}
