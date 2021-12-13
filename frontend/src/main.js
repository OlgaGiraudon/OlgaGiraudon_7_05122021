//Vue initialization Инициализация Vue
import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false
Vue.use(require('vue-moment'));

new Vue({
  router,
  render: h => h(App)//Подключение файла App к диву app
}).$mount('#app')
