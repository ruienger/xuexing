import request from '@/utils/request'
import querystring from 'querystring'
export default{
    namespaced:true,
    state:{
        signupcheck: [],
        total:0
    },
    mutations:{
        SET_SIGNUPCHECK(state, signupcheck) {
            state.signupcheck = signupcheck
          },
        SET_TOTAL(state, total) {
          state.total = total
        },
    },
    actions:{
        //查询所有顾客
        findAll({commit}){
            request.get('/customer/findAll').then((res)=>{
            commit('SET_SIGNUPCHECK',res.data)
        })
        },
        //分页查询
        queryCustermer({ commit }, queryForm) {
            request({
            method: 'POST',
            url: '/customer/query',
            'content-type': 'application/x-www-form-urlencoded',
            data: querystring.stringify(queryForm)
            }).then((res) => {
            commit('SET_SIGNUPCHECK', res.data.list)
            commit('SET_TOTAL', res.data.total)
            })
        },
    }
}