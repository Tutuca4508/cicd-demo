import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 用户信息默认从 本地缓存中加载，没有就清空
    user: JSON.parse(window.localStorage.getItem('user') || null)
  },
  mutations: {
    setUser (state, payload) {
      // 用户信息保存到 store
      state.user = JSON.parse(payload)
      // 用户信息持久化，保存到本地缓存中
      window.localStorage.setItem('user', payload)
    }
  },
  actions: {
  },
  modules: {
  }
})
