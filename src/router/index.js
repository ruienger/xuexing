import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
    meta: {
      roles: ['admin','editor']
    }
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '主页', icon: 'dashboard', roles: ['admin','editor','visitor'] }
    }]
  },

  
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]


export const asyncRoutes = [
  {
    path: '/projectmanage',
    component: Layout,
    children: [{
      path: '',
      name: 'ProjectManage',
      component: () => import('@/views/projectManage/index'),
      meta: { title: '游学项目管理', icon: 'el-icon-s-help', roles: ['admin'] }
    }]
  },

  {
    path: '/check',
    component: Layout,
    redirect: '/Check/Sigupcheck',
    name: 'Check',
    meta: {
      title: '信息审核',
      icon: 'tree',
      roles: ['admin','editor']
    },
    children: [
      {
        path: 'signupcheck',
        name: 'SignupCheck',
        component: () => import('@/views/check/signUpCheck/index'),
        meta: { title: '报名信息审核', icon: 'form', roles: ['admin','editor'] }
      },
      {
        path: 'infocheck',
        name: 'InfoCheck',
        component: () => import('@/views/check/infoCheck/index'),
        meta: { title: '咨询信息审核', icon: 'form', roles: ['admin','editor'] }
      }
    ]
  },

  {
    path: '/modulemanage',
    component: Layout,
    children: [{
      path: '',
      name: 'ModuleManage',
      component: () => import('@/views/moduleManage/index'),
      meta: { title: '模块管理', icon: 'table', roles: ['admin','editor'] }
    }]
  },

  {
    path: '/usermanage',
    component: Layout,
    children: [{
      path: '',
      name: 'UserManage',
      component: () => import('@/views/userManage/index'),
      meta: { title: '用户管理', icon: 'user', roles: ['admin','editor'] }
    }]
  },

  {
    path: '/authmanage',
    component: Layout,
    children: [{
      path: '',
      name: 'AuthManage',
      component: () => import('@/views/authManage/index'),
      meta: { title: '权限查看', icon: 'eye', roles: ['admin'] }
    }]
  }
  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
