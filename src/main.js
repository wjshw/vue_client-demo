// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'Axios'
import Vuex from 'vuex'

import './assets/iconfont/iconfont.css'
// 引入bootstrap
import './assets/bootstrap3.3/dist/css/bootstrap.min.css'
import './assets/css/global.scss'

Vue.prototype.$axios = Axios
Vue.use(Vuex)

let store = new Vuex.Store({
  store: {},
  getters: {},
  mutations: {},
  actions: {}
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
