import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入 element
import '@/utils/element'

// 引入 axios
import axios from 'axios'

// 挂载到vue实例上
Vue.prototype.$axios = axios


// 全部加载:
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// Vue.use(ElementUI)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
