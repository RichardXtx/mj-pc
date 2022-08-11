import Vue from 'vue'
import VueRouter from 'vue-router'

// 一级路由
import Login from '@/views/Login.vue'
import Layout from '@/views/Layout.vue'

// 二级路由
import Dashboard from '@/views/Layout/Dashboard.vue'
import Article from '@/views/Layout/Article.vue'

// 导入数据中心
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  { // 登录页
    path: '/login',
    component: Login
  },
  { // 首页
    path: '/',
    component: Layout,
    children: [ // 二级路由
      {
        path: '/dashboard',
        component: Dashboard
      },
      {
        path: '/article',
        component: Article
      },
    ]
  },


]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {

  // 1. 获取token
  // 组件内 this.$store.
  // 组件外 导入数据中心 store.

  let token = store.state.user.token

  if (token) {
    next()
  } else {
    if (to.path == '/login') {
      next()
    } else {
      next('/login')
    }
  }


})

export default router
