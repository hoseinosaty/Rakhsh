import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import Notifications from 'vue-notification'
Vue.use(Notifications);

import VuePersianDatetimePicker from 'vue-persian-datetime-picker';
Vue.component('date-picker', VuePersianDatetimePicker);

Vue.use(require('vue-moment'));


import 'v-title/lib/element-ui';
import VTitle from 'v-title';

Vue.use(VTitle);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
