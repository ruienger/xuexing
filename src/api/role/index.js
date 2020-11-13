
const { deepClone } = require('@/utils')
const { asyncRoutes, constantRoutes } = require('./routes.js')

const routes = deepClone([...constantRoutes, ...asyncRoutes])
const roles = [
    {
      key: 'admin',
      name: '超级管理员',
      description: '超级管理员，可以访问所有页面',
      routes: routes
    },
    {
      key: 'editor',
      name: '管理员',
      description: '普通管理员，可以访问除项目管理、权限管理的所有页面',
      routes: routes.filter(i => i.path !== '/authmanage' && i.path !== '/projectmanage')// just a mock
    },
    {
      key: 'visitor',
      name: '普通用户',
      description: '普通用户，只能访问首页内容',
      routes: [{
        path: '',
        redirect: 'dashboard',
        children: [
          {
            path: 'dashboard',
            name: 'Dashboard',
            meta: { title: 'dashboard', icon: 'dashboard' }
          }
        ]
      }]
    }
  ]
export function getRoutes() {
  return routes
}

export function getRoles() {
  return roles
}

export function addRole(data) {
//   return request({
//     url: '/vue-element-admin/role',
//     method: 'post',
//     data
//   })
}

export function updateRole(id, data) {
  console.log(id)
  console.log(data)
//   return request({
//     url: `/vue-element-admin/role/${id}`,
//     method: 'put',
//     data
//   })
// 尝试再 localstorage中存储 k：v
  // localStorage.setItem(id,data)
}

export function deleteRole(id) {
  return request({
    url: `/vue-element-admin/role/${id}`,
    method: 'delete'
  })
}
