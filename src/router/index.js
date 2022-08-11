import Vue from 'vue'
import VueRouter from 'vue-router'

// 一级路由
import Login from '@/views/Login.vue'
import Layout from '@/views/Layout.vue'

// 二级路由
import Dashboard from '@/views/Layout/Dashboard.vue'
import Article from '@/views/Layout/Article.vue'


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

export default router
