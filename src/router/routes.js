export default [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/blog',
    name: 'blog',
    component: () => import('@/views/Blog.vue'),
  },
];
