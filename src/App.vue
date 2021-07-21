<template>
  <div class="app-wrapper">
    <div class="app">
      <navbar />
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
  components: {
    Navbar,
    AppFooter,
  },
};
</script>
