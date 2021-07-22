export default [
  {
    path: '/',
    name: 'home',
    meta: {
      title: 'Home',
    },
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/blog',
    name: 'blog',
    meta: {
      title: 'Blog',
    },
    component: () => import('@/views/Blog.vue'),
  },
];
