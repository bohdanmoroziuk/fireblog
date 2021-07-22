<template>
  <div class="home">
    <post :post="welcomeScreen" />
    <post v-for="post of samplePosts" :key="post.id" :post="post" />

    <div class="blog-card-wrapper">
      <div class="container">
        <h3>View More Recent Posts</h3>
        <div class="blog-cards">
          <post-card v-for="post of sampleCards" :key="post.id" :post="post" />
        </div>
      </div>
    </div>

    <div class="updates">
      <div class="container">
        <h2>Never miss a post. Register for your free account today!</h2>
        <router-link class="router-button" to="#">
          Register for FireBlog
          <img
            class="arrow"
            src="@/assets/images/icons/arrow-right-light.svg"
            alt=""
          />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Post from '@/components/Post.vue';
import PostCard from '@/components/PostCard.vue';

export default {
  name: 'Home',
  data() {
    return {
      welcomeScreen: {
        title: 'Welcome!',
        content: 'Weekly blog articles with all things programming including HTML, CSS, JavaScript and more. Register today to never miss a post!',
        welcomeScreen: true,
        photo: 'coding.jpg',
      },
      samplePosts: [
        {
          id: '1',
          title: 'This is a Filler Title',
          content: 'This is a filler post title!',
          coverPhoto: 'beautiful-stories.jpg',
        },
        {
          id: '2',
          title: 'This is a Filler Title',
          content: 'This is a filler post title!',
          coverPhoto: 'designed-for-everyone.jpg',
        },
      ],
      sampleCards: [
        {
          id: '1',
          title: 'Card #1',
          date: 'May 1, 2021',
          coverPhoto: 'stock-1.jpg',
        },
        {
          id: '2',
          title: 'Card #2',
          date: 'May 1, 2021',
          coverPhoto: 'stock-2.jpg',
        },
        {
          id: '3',
          title: 'Card #3',
          date: 'May 1, 2021',
          coverPhoto: 'stock-3.jpg',
        },
        {
          id: '4',
          title: 'Card #4',
          date: 'May 1, 2021',
          coverPhoto: 'stock-4.jpg',
        },
      ],
    };
  },
  components: {
    Post,
    PostCard,
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
