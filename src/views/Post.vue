<template>
  <div class="post-view" v-if="post">
    <div class="container quillWrapper">
      <h2>{{ post.title }}</h2>
      <h4>Posted on: {{ post.date | formatDate }}</h4>
      <img :src="post.coverPhoto" alt="" />
      <div class="post-content ql-editor" v-html="post.content" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

const store = {
  computed: {
    ...mapGetters('blog', [
      'getPostById',
    ]),
  },
};

export default {
  name: 'Post',
  mixins: [store],
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  computed: {
    post() {
      return this.getPostById(this.id);
    },
  },
  filters: {
    formatDate(value) {
      return new Date(value).toLocaleString();
    },
  },
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

  h4 {
    font-weight: 400;
    font-size: 14px;
    margin-bottom: 24px;
  }

  img {
    width: 100%;
    margin-bottom: 32px;
  }
}
</style>
