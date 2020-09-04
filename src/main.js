// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import mixin from './api/mixin'
import '@/assets/css/reset.css'
import '@/assets/js/flexible.debug.js'
import '@/assets/js/flexible_css.debug.js'
import '@/assets/css/style.css'
Vue.config.productionTip = false

Vue.mixin(mixin);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
