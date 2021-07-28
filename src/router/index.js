import Vue from 'vue';
import VueRouter from 'vue-router';

import routes from '@/router/routes';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

const getDocumentTitle = (appName, pageTitle) => {
  const identity = (x) => x;
  const separator = ' | ';

  return [appName, pageTitle]
    .filter(identity)
    .join(separator);
};

router.beforeEach((to, _from, next) => {
  document.title = getDocumentTitle('FireBlog', to.meta.title);

  next();
});

export default router;
