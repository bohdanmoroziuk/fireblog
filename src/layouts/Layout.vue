<template>
  <component :is="layout">
    <slot />
  </component>
</template>

<script>
import AuthLayout from '@/layouts/AuthLayout.vue';
import MainLayout from '@/layouts/MainLayout.vue';

export default {
  name: 'Layout',
  computed: {
    layout() {
      return this.$route.meta?.layout ?? 'default';
    },
  },
  components: {
    auth: AuthLayout,
    default: MainLayout,
  },
};
</script>
