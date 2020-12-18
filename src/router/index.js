import Vue from 'vue'
import VueRouter from 'vue-router'
 

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: ()=>import('@/views/Main'),
    children: [
      {
        path: '/',
        component: ()=>import('@/views/Home'),
        name: 'home'
      },
      {
        path: '/video',
        component: ()=>import('@/views/video/Video'),
        name: 'video'
      },
      {
        path: '/page1',
        component: ()=>import('@/views/other/Page1'),
        name: 'page1'
      },
      {
        path: '/page2',
        component: ()=>import('@/views/other/Page2'),
        name: 'page2'
      },
      {
        path: '/user',
        component: ()=>import('@/views/user/User'),
        name: 'user'
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
