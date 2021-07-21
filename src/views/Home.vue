<template>
  <div class="home">
    <post :post="welcomeScreen" />
    <post v-for="post of samplePosts" :key="post.id" :post="post" />
  </div>
</template>

<script>
import Post from '@/components/Post.vue';

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
    };
  },
  components: {
    Post,
  },
};
</script>
