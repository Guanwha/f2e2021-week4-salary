import Vue from 'vue';
import VueToast from 'vue-toast-notification';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/styles/tailwind.css';
import '@/styles/app.scss';
import 'vue-toast-notification/dist/theme-default.css';

Vue.use(VueToast);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
