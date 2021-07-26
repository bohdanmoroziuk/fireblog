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
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login',
    },
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      title: 'Register',
    },
    component: () => import('@/views/Register.vue'),
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    meta: {
      title: 'Forgot Password',
    },
    component: () => import('@/views/ForgotPassword.vue'),
  },
  {
    path: '/profile',
    name: 'profile',
    meta: {
      title: 'Profile',
    },
    component: () => import('@/views/Profile.vue'),
  },
];
