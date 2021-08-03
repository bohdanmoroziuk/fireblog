<template>
  <div class="app">
    <app-nav />
    <slot />
    <app-footer />
  </div>
</template>

<script>
import AppNav from '@/components/Navbar.vue';
import AppFooter from '@/components/Footer.vue';

export default {
  name: 'MainLayout',
  components: {
    AppNav,
    AppFooter,
  },
};
</script>
