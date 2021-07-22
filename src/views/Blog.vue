<template>
  <div class="blog-card-wrapper">
    <div class="blog-cards container">
      <div class="toggle-edit">
        <span>Toggle Editing Post</span>
        <input
          type="checkbox"
          name="edit-post"
          id="edit-post"
          v-model="editMode"
        />
      </div>

      <post-card
        v-for="post of posts"
        :key="post.id"
        :post="post"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

import PostCard from '@/components/PostCard.vue';

const store = {
  computed: {
    ...mapState('blog', [
      'isEditMode',
    ]),
  },
  methods: {
    ...mapMutations('blog', [
      'setEditMode',
    ]),
  },
};

export default {
  name: 'Blog',
  mixins: [store],
  computed: {
    editMode: {
      get() {
        return this.isEditMode;
      },
      set(value) {
        this.setEditMode(value);
      },
    },
    posts() {
      return [
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
      ];
    },
  },
  beforeUnmount() {
    this.setEditMode(false);
  },
  components: {
    PostCard,
  },
};
</script>

<style lang="scss" scoped>
.blog-cards {
  position: relative;

  .toggle-edit {
    display: flex;
    align-items: center;
    position: absolute;
    top: -70px;
    right: 0;

    span {
      margin-right: 16px;
    }

    input[type="checkbox"] {
      cursor: pointer;
      position: relative;
      border: none;
      -webkit-appearance: none;
      background: #fff;
      outline: none;
      width: 80px;
      height: 30px;
      border-radius: 20px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    input[type="checkbox"]:before {
      content: "";
      position: absolute;
      width: 30px;
      height: 30px;
      border-radius: 20px;
      top: 0;
      left: 0;
      background: #303030;
      transform: scale(1.1);
      transition: 750ms ease all;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    input:checked[type="checkbox"]:before {
      background: #fff;
      left: 52px;
    }
  }
}
</style>
