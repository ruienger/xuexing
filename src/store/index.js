import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import signupcheck from './modules/signupcheck'
import usermanage from './modules/usermanage'
import infocheck from './modules/infocheck'
import authmanage from './modules/authmanage'
import projectManage from './modules/projectManage'
import moduleManage from './modules/moduleManage'
import permission from './modules/permission'

Vue.use(Vuex)
// 这个sotre里面存放了包含
//   游学栏目管理 -- projectManage
//   报名信息审核 -- signupcheck
//   咨询信息管理 -- infocheck
//   模块管理     -- moduleManage
//   用户管理     -- usermanage
//   权限管理     -- authmanage
// 的信息维护内容
const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    signupcheck,
    usermanage,
    infocheck,
    authmanage,
    projectManage,
    moduleManage,
    permission
  },
  getters
})

export default store
