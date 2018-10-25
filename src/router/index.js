import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


const components = {
  login: () => import('@/views/login'),
  home: () => import('@/views/home'),
  userlist: () => import('@/views/userlist'),
  adduser: () => import('@/views/adduser'),
}


export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: components.login
    },
    {
      path: '/home',
      name: 'home',
      component: components.home,
      redirect: '/home/userlist',
      children: [
        {
          path: 'userlist',
          name: 'userlist',
          component: components.userlist,
        },
        {
          path: 'adduser',
          name: 'adduser',
          component: components.adduser,
        },
      ]
    }
  ]
})
