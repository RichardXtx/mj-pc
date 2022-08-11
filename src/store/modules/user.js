let obj = {
  namespaced: true, // 开启命名空间 开启后名字相同页不影响

  // 初始化数据
  state () {
    return {
      token: localStorage.getItem('pc_token')
    }
  },

  // 同步方法
  mutations: {
    set (state, val) {

      // 数据中心存token
      state.token = val,
        localStorage.setItem('pc_token', val)
    }
  }

}

export default obj