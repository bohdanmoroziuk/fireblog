import { createRouter, createWebHistory } from 'vue-router';

import routes from '@/router/routes';

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
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
