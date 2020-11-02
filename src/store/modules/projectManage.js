import request from '@/utils/request'
import { data } from 'autoprefixer'
import querystring from 'querystring'
export default{
  namespaced: true,

    state:{
        projects:[],
        detailProjects:[],
        total:0,
    },
    mutations:{
        SET_PROJECT(state, projects) {
            state.projects = projects
        },
        SET_TOTAL(state, total) {
            state.total = total
        },
        SET_DETAILPROJECTS(state, detailProjects) {
            state.detailProjects = detailProjects
        }
    },

    actions:{
        queryProject({ commit }, list) {
            request({
              method: 'POST',
              url: '/order/queryPage',
              data: querystring.stringify(list)
            }).then((res) => {
              let productDetailList = []
              res.data.list.forEach(element => {
                request({
                  method: 'GET',
                  url: '/order/findById?id='+element.id
                }).then((result) => {
                  productDetailList.push(result.data)
                }).catch((err) => {
                  alert(err)
                });
              });
              commit('SET_DETAILPROJECTS', productDetailList)
              commit('SET_PROJECT', res.data.list)
              commit('SET_TOTAL', res.data.total)
            })
          }
    },

}
