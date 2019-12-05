import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: '首页',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/entry',
    component: Layout,
    redirect: '/entry/scan',
    alwaysShow: true,
    meta: {
      title: '发票录入',
      icon: 'edit',
    },
    children: [
      {
        path: 'scan',
        component: () => import('@/views/entry/scan'),
        name: '扫描录入',
        meta: { title: '扫描录入', icon: 'search', affix: true }
      },
      {
        path: 'billResult',
        component: () => import('@/views/entry/billResult'),
        name: '结果',
        hidden: true,
        meta: { title: '结果', icon: 'dashboard', affix: false }
      },
      {
        path: 'commonTable',
        component: () => import('@/views/entry/model/commonTable'),
        name: '普通发票结果',
        hidden: true,
        meta: { title: '普通发票结果', icon: 'dashboard', affix: false }
      },
      {
        path: 'volumeTable',
        component: () => import('@/views/entry/model/volumeTable'),
        name: '卷式发票结果',
        hidden: true,
        meta: { title: '卷式发票结果', icon: 'dashboard', affix: false }
      },
      {
        path: 'passTable',
        component: () => import('@/views/entry/model/passTable'),
        name: '通行证发票结果',
        hidden: true,
        meta: { title: '通行证发票结果', icon: 'dashboard', affix: false }
      },
      {
        path: 'iden_tntry',
        component: () => import('@/views/entry/iden_entry'),
        name: '识别录入',
        meta: { title: '识别录入', icon: 'dashboard', affix: true }
      }
      // {
      //   path: 'other',
      //   component: () => import('@/views/entry/other'),
      //   name: '其他发票录入',
      //   meta: { title: '其他发票录入', icon: 'dashboard', affix: true }
      // },
      // {
      //   path: 'con_sacn',
      //   component: () => import('@/views/entry/con_sacn'),
      //   name: '连续扫描',
      //   meta: { title: '连续扫描', icon: 'dashboard', affix: true }
      // },
    ]
  },
  {
    path: '/manager',
    component: Layout,
    redirect: '/manager/bill_query',
    alwaysShow: true,
    meta: {
      title: '发票管理',
      icon: 'list',
    },
    children: [
      {
        path: 'bill_query',
        component: () => import('@/views/manager/bill_query'),
        name: '发票查询',
        meta: { title: '发票查询', icon: 'table', affix: true }
      },
      // {
      //   path: 'bill_payable',
      //   component: () => import('@/views/manager/bill_payable'),
      //   name: '抵扣票据',
      //   meta: { title: '抵扣票据', icon: 'dashboard', affix: true }
      // },
      // {
      //   path: 'rotation_train',
      //   component: () => import('@/views/manager/rotation_train'),
      //   name: '轮训查验',
      //   meta: { title: '轮训查验 ', icon: 'dashboard', affix: true }
      // },
      {
        path: 'bill_setting',
        component: () => import('@/views/manager/bill_setting'),
        name: '发票设置',
        meta: { title: '发票设置', icon: 'lock', affix: true }
      }
    ]
  },
  {
    path: '/administer',
    component: Layout,
    redirect: '/administer/userMan',
    alwaysShow: true,
    meta: {
      title: '系统管理',
      icon: 'example',
    },
    children: [
      {
        path: 'userMan',
        component: () => import('@/views/administer/userMan'),
        name: '员工管理',
        meta: { title: '员工管理', icon: 'peoples', affix: true }
      },
      {
        path: 'partmentMan',
        component: () => import('@/views/administer/partmentMan'),
        name: '部门管理',
        meta: { title: '部门管理', icon: 'nested', affix: true }
      },
      {
        path: 'dwSetting',
        component: () => import('@/views/administer/dwSetting'),
        name: '单位设置',
        meta: { title: '单位设置', icon: 'form', affix: true }
      },
      {
        path: 'resetPwd',
        component: () => import('@/views/administer/resetPwd'),
        name: '修改密码',
        hidden: true,
        meta: { title: '修改密码', icon: 'form', affix: false }
      },
    ]
  },
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/admin',
    component: Layout,
    redirect: '/admin/userManager',
    alwaysShow: true, // will always show the root menu
    name: '管理员',
    meta: {
      title: '管理员',
      icon: 'user',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'userManager',
        component: () => import('@/views/admin/userManager'),
        name: '用户管理',
        meta: {
          title: '用户管理',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      //     {
      //       path: 'directive',
      //       component: () => import('@/views/permission/directive'),
      //       name: 'DirectivePermission',
      //       meta: {
      //         title: 'Directive Permission'
      //         // if do not set roles, means: this page does not require permission
      //       }
      //     },
      //     {
      //       path: 'role',
      //       component: () => import('@/views/permission/role'),
      //       name: 'RolePermission',
      //       meta: {
      //         title: 'Role Permission',
      //         roles: ['admin']
      //       }
      //     }
    ]
  },

  // {
  //   path: '/error',
  //   component: Layout,
  //   redirect: 'noRedirect',
  //   name: 'ErrorPages',
  //   meta: {
  //     title: 'Error Pages',
  //     icon: '404'
  //   },
  //   children: [
  //     {
  //       path: '401',
  //       component: () => import('@/views/error-page/401'),
  //       name: 'Page401',
  //       meta: { title: '401', noCache: true }
  //     },
  //     {
  //       path: '404',
  //       component: () => import('@/views/error-page/404'),
  //       name: 'Page404',
  //       meta: { title: '404', noCache: true }
  //     }
  //   ]
  // },

  // {
  //   path: '/error-log',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'log',
  //       component: () => import('@/views/error-log/index'),
  //       name: 'ErrorLog',
  //       meta: { title: 'Error Log', icon: 'bug' }
  //     }
  //   ]
  // },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
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
