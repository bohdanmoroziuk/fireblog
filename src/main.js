import { createApp } from 'vue';

import Vue3Editor from 'vue3-editor';

import App from '@/App.vue';
import router from '@/router';
import store from '@/store';

import { auth } from '@/firebase';

import '@/assets/styles/main.scss';

let app = null;

auth.onAuthStateChanged(() => {
  if (app) return;

  app = createApp(App);

  app
    .use(store)
    .use(router)
    .use(Vue3Editor);

  app
    .mount('#app');
});
