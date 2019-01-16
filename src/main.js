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
Vue.use(ElementUI)

// Global Loading setting
let loading = null;
function startLoading (){
  loading = ElementUI.Loading.service({
    lock: true,
    text: '页面加载中',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  });
}
function stopLoading (){
  loading.close();
}
// request interceptor
Axios.interceptors.request.use(config => {
  startLoading()
  return config
}, function (error) {
  return Promise.reject(error);
});
// response interceptor
Axios.interceptors.response.use(res => {
  stopLoading()
  return res
}, function (error) {
  return Promise.reject(error);
});

Vue.prototype.$axios = Axios

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
