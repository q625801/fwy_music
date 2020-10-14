import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index'
import sheetdetail from '@/pages/sheetdetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/sheetdetail',
      name: 'sheetdetail',
      component: sheetdetail
    },
  ]
})
