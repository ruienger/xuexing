import request from '@/utils/request'
import querystring from 'querystring'
export default{
    namespaced:true,
    state:{
        usermanage:[],
        total:0,
        user: []
    },
    getters:{
        userNameList:function(state){
            console.log(state)
            return state.usermanage.map((i)=>{return i.list})||'NODATA'
        }
    },
    mutations:{
        SET_USERMANAGE(state,usermanage){
            state.usermanage=usermanage
        },
        SET_TOTAL(state,total){
            state.total=total
        },
        SET_USER(state,user){
            state.user=user
        }
    },
    actions:{
        findAll({commit}){
            request.get('/customer/findAll').then((res)=>{
            commit('SET_USER',res.data)
        })
        },
        //分页查询
        queryProduct({ commit }, queryForm) {
            request({
            method: 'POST',
            url: '/customer/query',
            data: querystring.stringify(queryForm)
            }).then((res) => {
            commit('SET_USERMANAGE', res.data.list)
            commit('SET_TOTAL', res.data.total)
            })
        },
        //保存修改/product/saveOrUpdate
        saveOrUpdate({dispatch},data) {
            request({
            method: 'POST',
            url: '/customer/saveOrUpdate',
            data: querystring.stringify(data)
            }).then((res) => {
                dispatch("queryProduct",{page:0,pageSize:6})
                // console.log(res.message)
            })
        },
        //删除
        DeleteById({dispatch},data){
            request({
                method: 'GET',
                url: '/customer/deleteById?id='+data
                }).then((res) => {
                    dispatch("queryProduct",{page:0,pageSize:6})
                    console.log(res.message)
                })
        }
    }
}