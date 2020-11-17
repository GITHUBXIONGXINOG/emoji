import Vue from 'vue'
import VueRouter from 'vue-router'
//导入Home路由
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    //配置路由信息,默认主页为Home
  {
    path: '/',
    name: 'Home',
    component: Home
  },

]

const router = new VueRouter({
  routes
})

export default router
