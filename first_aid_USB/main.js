import App from './App'
import store from "./store"

// #ifndef VUE3
import Vue from 'vue'
import Vuex from 'vuex'
import './uni.promisify.adaptor'
import uviewPlus from 'uview-plus'
Vue.use(uviewPlus)
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'

// Vue.prototype.tagUtil = new TagUtil()
// Vue.prototype.tagUtil.init()
export function createApp() {
  const app = createSSRApp(App)
  app.use(store)
  return {
    app
  }
}
// #endif
