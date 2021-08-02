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
  {
    path: '/new-post',
    name: 'new-post',
    meta: {
      title: 'New Post',
    },
    component: () => import('@/views/NewPost.vue'),
  },
  {
    path: '/post-preview',
    name: 'post-preview',
    meta: {
      title: 'Preview Post',
    },
    component: () => import('@/views/PostPreview.vue'),
  },
  {
    path: '/post/:id',
    name: 'post',
    props: true,
    meta: {
      title: 'Post',
    },
    component: () => import('@/views/Post.vue'),
  },
];
