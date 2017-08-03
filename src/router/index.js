import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Fabric from '@/components/Fabric'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/fabric',
      name: 'Fabric',
      component: Fabric
    }
  ]
})
