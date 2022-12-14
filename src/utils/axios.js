import axios from 'axios'

// 导入数据中心
import store from '@/store'

// 按需引入 提示弹框
import { Message } from 'element-ui'

// 引入 router
import router from '@/router'

// 配置：根路径 超时
// axios.defaults.baseURL = 'http://interview-api-t.itheima.net/'
axios.defaults.timeout = 5000

axios.defaults.baseURL = 'http://interview-api-t.itheima.net/'

// 请求拦截器
axios.interceptors.request.use(config => {
  // console.log(config)
  config.headers.Authorization = store.state.user.token
  // Do something before request is sent
  return config
}, error => {
  // Do something with request error
  return Promise.reject(error)
})

// 响应拦截器
axios.interceptors.response.use(response => {
  // Do something before response is sent
  return response
}, error => {

  // 统一对错误进行处理
  Message(error.response.data.message)

  if (error.response.data.code == 401) {

    // 跳转页面
    router.push('/login')

    // 清除token
    store.commit('user/set', '')

  }



  // Do something with response error
  return Promise.reject(error)
})

export default axios