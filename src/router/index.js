import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index'
import sheetdetail from '@/pages/sheetdetail'
import userhome from '@/pages/userhome'
import songsheet from '@/pages/songsheet'
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
    {
      path: '/userhome',
      name: 'userhome',
      component: userhome
    },
    {
      path: '/songsheet',
      name: 'songsheet',
      component: songsheet
    }
  ]
})
