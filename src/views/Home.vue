<template>
  <div class="home">
    <post :post="welcomeScreen" v-if="isGuest" />
    <post v-for="post of feed" :key="post.id" :post="post" />

    <div class="blog-card-wrapper">
      <div class="container">
        <h3>View More Recent Posts</h3>
        <div class="blog-cards">
          <post-card v-for="post of cards" :key="post.id" :post="post" />
        </div>
      </div>
    </div>

    <div class="updates" v-if="isGuest">
      <div class="container">
        <h2>Never miss a post. Register for your free account today!</h2>
        <router-link class="router-button" to="#">
          Register for FireBlog
          <arrow-right-icon class="arrow" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import ArrowRightIcon from '@/assets/images/icons/arrow-right-light.svg';

import Post from '@/components/Post.vue';
import PostCard from '@/components/PostCard.vue';

const store = {
  computed: {
    ...mapGetters('auth', [
      'isGuest',
    ]),
    ...mapGetters('blog', [
      'feed',
      'cards',
    ]),
  },
};

export default {
  name: 'Home',
  mixins: [store],
  data() {
    return {
      welcomeScreen: {
        title: 'Welcome!',
        content: 'Weekly blog articles with all things programming including HTML, CSS, JavaScript and more. Register today to never miss a post!',
        welcomeScreen: true,
        photo: 'coding.jpg',
      },
    };
  },
  components: {
    Post,
    PostCard,
    ArrowRightIcon,
  },
};
</script>

<style lang="scss" scoped>
.blog-card-wrapper {

  h3 {
    font-weight: 300;
    font-size: 28px;
    margin-bottom: 32px;
  }
}

.updates {

  .container {
    padding: 100px 25px;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (min-width: 800px) {
      padding: 125px 25px;
      flex-direction: row;
    }

    .router-button {
      display: flex;
      font-size: 14px;
      text-decoration: none;

      @media (min-width: 800px) {
        margin-left: auto;
      }
    }

    h2 {
      font-weight: 300;
      font-size: 32px;
      max-width: 425px;
      width: 100%;
      text-align: center;
      text-transform: uppercase;

      @media (min-width: 800px) {
        text-align: initial;
        font-size: 40px;
      }
    }
  }
}
</style>
