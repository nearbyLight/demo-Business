import Vue from 'vue';
import VeLine from 'v-charts/lib/line.common';
import App from './App.vue';
import router from './router';
import store from './store';
import './plugins/ant-design-vue';

Vue.config.productionTip = false;

Vue.component(VeLine.name, VeLine);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
