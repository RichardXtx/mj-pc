import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 引入user 模块名
import user from '@/store/modules/user'

export default new Vuex.Store({

  modules: {
    user
  }
})
