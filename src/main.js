import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/scss/reset.scss'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import echarts from 'echarts'

Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

Vue.use(ElementUI)

//判断用户是否登录，未登录跳转登录页面
router.beforeEach((to,from,next)=>{

  //从cookie中获取token
  store.commit('getToken');
  let token= store.state.user.token
  if(!token && to.name !=='login'){
    next({name:'login'})
  }else{
    next()
  }

})

new Vue({
  router,
  store,
  render: h => h(App),
  created(){
     store.commit("addRouter",  router);
  }
}).$mount('#app')
