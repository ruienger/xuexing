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

Vue.use(Vuex)

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
  },
  getters
})

export default store
