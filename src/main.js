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
import VueLazyload from 'vue-lazyload'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false

Vue.mixin(mixin);

Vue.use(VueLazyload, {//图片懒加载插件
     loading: require('./assets/img/loading.gif'),//加载中图片，一定要有，不然会一直重复加载占位图
     error: require('./assets/img/loading.gif')  //加载失败图片
});

Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
