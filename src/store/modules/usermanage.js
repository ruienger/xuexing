import request from '@/utils/request'
import querystring from 'querystring'
export default{
    namespaced:true,
    state:{
        usermanage:[],
        total:0
    },
    mutations:{
        SET_USERMANAGE(state,usermanage){
            state.usermanage=usermanage
        },
        SET_TOTAL(state,total){
            state.total=total
        }
    },
    actions:{
        findAll({commit}){
            request.get('/customer/findAll').then((res)=>{
            commit('SET_USERMANAGE',res.data)
        })
        },
        //分页查询
        queryProduct({ commit }, queryForm) {
            request({
            method: 'POST',
            url: '/product/query',
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
            url: '/product/saveOrUpdate',
            data: querystring.stringify({
                id:data.id,
                name:data.name,
                description:data.description,
                price:data.price,
                status:data.status,
                photo:data.photo,
                categoryId:data.categoryId
            })
            }).then((res) => {
                dispatch("queryProduct",{page:0,pageSize:6})
                console.log(res.message)
            })
        },
    }
}