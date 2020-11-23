import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//中英文翻译
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

const i18n=new VueI18n({
    // locale:localStorage.getItem('languageSet')||'zh',   //从localStorage里获取用户中英文选择，没有则默认中文
	  locale: 'zh', // 语言标识
    messages:{
        'zh':require('./components/language/zh'),
        'en':require('./components/language/en')
    }
})

import Router from 'vue-router'
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

import axios from 'axios'
Vue.prototype.$axios = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,   //把 i18n 挂载到 vue 根实例上
  components: {
          App
      },
  render: h => h(App)
}).$mount('#app')
