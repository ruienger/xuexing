import Layout from '@/layout'

const constantRoutes = [
    {
        path: '/login',
        component: () => import('@/views/login/index'),
        hidden: true
    },
    {
        path: '/404',
        component: () => import('@/views/404'),
        hidden: true
    },
    {
      path: '/401',
      component: 'views/error-page/401',
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
          meta: { title: '主页', icon: 'dashboard' }
        }]
    }
  ]

const asyncRoutes = [
    {
      path: '/login',
      component: () => import('@/views/login/index'),
      hidden: true
    },
  
    {
      path: '/404',
      component: () => import('@/views/404'),
      hidden: true
    },
    {
      path: '/projectmanage',
      component: Layout,
      children: [{
        path: '',
        name: 'projectManage',
        component: () => import('@/views/projectManage/index'),
        meta: { title: '游学项目管理', icon: 'el-icon-s-help' }
      }]
    },
  
    {
      path: '/check',
      component: Layout,
      redirect: '/check/sigupcheck',
      name: 'check',
      meta: {
        title: '信息审核',
        icon: 'form'
      },
      children: [
        {
          path: 'signupcheck',
          name: 'signupCheck',
          component: () => import('@/views/check/signUpCheck/index'),
          meta: { title: '报名信息审核', icon: 'form' }
        },
        {
          path: 'infocheck',
          name: 'infoCheck',
          component: () => import('@/views/check/infoCheck/index'),
          meta: { title: '咨询信息审核', icon: 'form' }
        }
      ]
    },
  
    {
      path: '/modulemanage',
      component: Layout,
      children: [{
        path: '',
        name: 'moduleManage',
        component: () => import('@/views/moduleManage/index'),
        meta: { title: '模块管理', icon: 'el-icon-s-help' }
      }]
    },
  
    {
      path: '/usermanage',
      component: Layout,
      children: [{
        path: '',
        name: 'userManage',
        component: () => import('@/views/userManage/index'),
        meta: { title: '用户管理', icon: 'el-icon-s-help' }
      }]
    },
  
    {
      path: '/authmanage',
      component: Layout,
      children: [{
        path: '',
        name: 'authManage',
        component: () => import('@/views/authManage/index'),
        meta: { title: '权限管理', icon: 'el-icon-s-help' }
      }]
    },
  
    // 404 page must be placed at the end !!!
    { path: '*', redirect: '/404', hidden: true }
  ]

  export { constantRoutes, asyncRoutes }