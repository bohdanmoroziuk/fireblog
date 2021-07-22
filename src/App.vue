<template>
  <div class="app-wrapper">
    <div class="app">
      <navbar v-if="shouldShowNavbar" />
      <router-view />
      <app-footer />
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import AppFooter from '@/components/Footer.vue';

export default {
  name: 'App',
  data() {
    return {
      authRouteNames: ['login', 'register', 'forgot-password'],
    };
  },
  computed: {
    currentRouteName() {
      return this.$route.name;
    },
    shouldShowNavbar() {
      return this.authRouteNames.includes(this.currentRouteName) === false;
    },
  },
  components: {
    Navbar,
    AppFooter,
  },
};
</script>
