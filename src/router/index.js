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

  const isLoggedIn = JSON.parse(localStorage.getItem('fireblog/isLoggedIn'));
  const isPrivatePage = to.matched.some((record) => record.meta?.isPrivate);
  const onlyWhenLoggedOut = to.matched.some((record) => record.meta?.onlyWhenLoggedOut);

  if (isPrivatePage && !isLoggedIn) {
    return next({
      name: 'login',
      query: {
        redirect: to.fullPath,
      },
    });
  }

  if (isLoggedIn && onlyWhenLoggedOut) {
    return next({ name: 'home' });
  }

  return next();
});

export default router;
