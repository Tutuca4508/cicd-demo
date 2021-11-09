import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

// 路由规则（添加需要认证的 requiresAuth 信息）
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: 'login' */'@/views/login/index')
  },
  {
    path: '/',
    component: () => import(/* webpackChunkName: 'layout' */'@/views/layout/index'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'home',
        component: () => import(/* webpackChunkName: 'home' */'@/views/home/index')
      },
      {
        path: '/role',
        name: 'role',
        component: () => import(/* webpackChunkName: 'role' */'@/views/role/index')
      },
      {
        path: '/menu',
        name: 'menu',
        component: () => import(/* webpackChunkName: 'menu' */'@/views/menu/index')
      },
      {
        path: '/resource',
        name: 'resource',
        component: () => import(/* webpackChunkName: 'resource' */'@/views/resource/index')
      },
      {
        path: '/course',
        name: 'course',
        component: () => import(/* webpackChunkName: 'course' */'@/views/course/index')
      },
      {
        path: '/user',
        name: 'user',
        component: () => import(/* webpackChunkName: 'user' */'@/views/user/index')
      },
      {
        path: '/advert',
        name: 'advert',
        component: () => import(/* webpackChunkName: 'advert' */'@/views/advert/index')
      },
      {
        path: '/advert-space',
        name: 'advert-space',
        component: () => import(/* webpackChunkName: 'advert-space' */'@/views/advert-space/index')
      },
      {
        path: '/menu/create',
        name: 'menu-create',
        component: () => import(/* webpackChunkName: 'menu-create' */'@/views/menu/create')
      },
      {
        path: '/menu/:id/edit',
        name: 'menu-edit',
        component: () => import(/* webpackChunkName: 'menu-edit' */'@/views/menu/edit')
      },
      {
        path: '/role/:roleId/alloc-menu',
        name: 'alloc-menu',
        component: () => import(/* webpackChunkName: 'alloc-menu' */'@/views/role/alloc-menu'),
        props: true
      },
      {
        path: '/course/create',
        name: 'create-course',
        component: () => import(/* webpackChunkName: 'create-course' */'@/views/course/create')
      },
      {
        path: '/course/:courseId/edit',
        name: 'create-edit',
        component: () => import(/* webpackChunkName: 'create-edit' */'@/views/course/edit'),
        props: true
      },
      {
        path: '/course/:courseId/section',
        name: 'course-section',
        component: () => import(/* webpackChunkName: 'course-section' */'@/views/course/section'),
        props: true
      },
      {
        path: '/course/:courseId/video',
        name: 'course-video',
        component: () => import(/* webpackChunkName: 'course-video' */'@/views/course/video'),
        props: true
      }
    ]
  },
  {
    path: '*',
    name: 'error-page',
    component: () => import(/* webpackChunkName: 'error-page' */'@/views/error-page/index')
  }
]

const router = new VueRouter({
  routes
})

// 设置全局路由守卫
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // console.log('需要验证')
    if (!store.state.user) {
      // 没有用户信息，没有登录，需要跳转到登录页面
      next({
        name: 'login',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      // 有用户信息，已经登录过了，可以通过
      next()
    }
  } else {
    // 无需登录，允许通过
    // console.log('不需要验证')
    next()
  }
})

export default router
