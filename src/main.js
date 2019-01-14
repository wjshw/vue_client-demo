// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'Axios'
import Vuex from 'vuex'

// 引入 element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import './assets/iconfont/iconfont.css'
// 引入bootstrap
import './assets/bootstrap3.3/dist/css/bootstrap.min.css'
import './assets/css/global.scss'

Vue.use(Vuex)
Vue.use(ElementUI);
Vue.prototype.$axios = Axios

// axios.interceptors.request.use(config => {
//   // Do something before request is sent
//   let loading = this.$loading({
//     lock: true,
//     background: 'rgba(0, 0, 0, 0.7)'
//   });
//   return config;
// });

// // Add a response interceptor
// axios.interceptors.response.use(response => {
//   // Do something with response data
//   loading.close()
//   return response;
// });

let store = new Vuex.Store({
  state: {
    shopId: 233,
    memberId: 2330000001,
    yunRequest: {
      time: 1546503262,
      token: '35b8a590ce0abd35643a168f0fc91f2f'
    }
  },
  getters: {
    yunInit(state){
      let params = state.yunRequest
      params.shopid = state.shopId
      params.memberID = state.memberId
      return params
    }
  },
  mutations: {},
  actions: {}
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
