<template>
  <div class="app-wrapper">
    <layout>
      <router-view />
    </layout>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

import Layout from '@/layouts/Layout.vue';

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
  async created() {
    this.watchAuthStateChange();
    await this.getPosts();
  },
  components: {
    Layout,
  },
};
</script>
