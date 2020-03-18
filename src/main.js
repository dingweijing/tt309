import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'
import Component from './components'
import 'element-ui/lib/theme-chalk/index.css'
import './style/index.less'

axios.defaults.baseURL='http://localhost:3000'//配置根路径
Vue.prototype.$axios=axios//全局使用 任意位置可以.axios

Vue.config.productionTip = false//开发环境
Vue.use(ElementUI)
Vue.use(Component)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

/*
login
头部
左侧导航  右侧显示内容（router-view 二级路由）  */
