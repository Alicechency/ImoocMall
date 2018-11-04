// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyLoad from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'

Vue.config.productionTip = false
//全局过滤器
// import {currency} from './util/currency.js'
// Vue.filter("currency",currency)
Vue.use(VueLazyLoad,{
  loading:"/static/loading-svg/loading-bars.svg"
})
Vue.use(infiniteScroll)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
