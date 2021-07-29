<template>
  <div class="post-view">
    <div class="container quillWrapper">
      <h2>{{ post.title }}</h2>
      <img :src="post.coverPhoto" alt="" />
      <div class="post-content ql-editor" v-html="post.content" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

const store = {
  computed: {
    ...mapState('blog', ['post']),
  },
};

export default {
  name: 'PostPreview',
  mixins: [store],
};
</script>

<style lang="scss">
.post-view {
  min-height: 100%;

  .container {
    max-width: 1000px;
    padding: 60px 25px;
  }

  .ql-editor {
    padding: 0;
  }

  h2 {
    margin-bottom: 16px;
    font-weight: 300;
    font-size: 32px;
  }

  img {
    width: 100%;
    margin-bottom: 32px;
  }
}
</style>
