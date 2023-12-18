import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import 'jquery'
import store from './store/'
import jQuery from 'jquery'
import bootstrap from 'bootstrap'
global.jQuery = jQuery
global .$ = jQuery


Vue.use(VueRouter)
Vue.use(Vuex)
Vue.config.productionTip = false

import Award from './components/Award.vue';
import Play from './components/Play.vue';
import UserImport from './components/UserImport.vue';
import Report from './components/Report.vue';
const routes = [
  { path: '/', component: Award },
  { path: '/play/:id',name: 'play',  component: Play },
  { path: '/users',   component:UserImport},
  { path: '/report',  component:Report}
]
const router = new VueRouter({
  // base: '/lotto', 
  // mode: 'history',
  routes // short for `routes: routes`
})
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
