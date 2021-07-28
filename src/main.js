import Vue from 'vue';

import App from '@/App.vue';
import router from '@/router';
import store from '@/store';

import { auth } from '@/firebase';

import '@/assets/styles/main.scss';

let app = null;

auth.onAuthStateChanged(() => {
  if (app) return;

  app = new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount('#app');
});
