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
      onlyWhenLoggedOut: true,
    },
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      title: 'Register',
      onlyWhenLoggedOut: true,
    },
    component: () => import('@/views/Register.vue'),
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    meta: {
      title: 'Forgot Password',
      onlyWhenLoggedOut: true,
    },
    component: () => import('@/views/ForgotPassword.vue'),
  },
  {
    path: '/profile',
    name: 'profile',
    meta: {
      title: 'Profile',
      isPrivate: true,
    },
    component: () => import('@/views/Profile.vue'),
  },
  {
    path: '/new-post',
    name: 'new-post',
    meta: {
      title: 'New Post',
      isPrivate: true,
    },
    component: () => import('@/views/NewPost.vue'),
  },
  {
    path: '/post-preview',
    name: 'post-preview',
    meta: {
      title: 'Preview Post',
      isPrivate: true,
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
