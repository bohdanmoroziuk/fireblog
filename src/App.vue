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
import { mapActions } from 'vuex';

import Navbar from '@/components/Navbar.vue';
import AppFooter from '@/components/Footer.vue';

const store = {
  methods: {
    ...mapActions('auth', [
      'watchAuthStateChange',
    ]),
    ...mapActions('blog', [
      'getPosts',
    ]),
  },
};

export default {
  name: 'App',
  mixins: [store],
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
  async created() {
    this.watchAuthStateChange();
    await this.getPosts();
  },
  components: {
    Navbar,
    AppFooter,
  },
};
</script>
