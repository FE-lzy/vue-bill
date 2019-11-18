import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss' // global css
import VueJsonp from 'vue-jsonp' //jsonp
import App from './App'
import store from './store'
import router from './router'

import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import * as filters from './filters' // global filters

import Bmob from "hydrogen-js-sdk";
// 初始化
Bmob.initialize("e4056c6d63384375", "billWJ");
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
// import { mockXHR } from '../mock'
import vueSticky from './directive/sticky'
// if (process.env.NODE_ENV === 'production') {
//   mockXHR()
// }

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})
Vue.use(VueJsonp)

Vue.prototype.$lsRoot = 'https://open.leshui365.com'
// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false
// 挂载全局使用
Vue.prototype.Bmob = Bmob
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
