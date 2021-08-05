<template>
  <div class="blog-card">
    <div class="icons" v-if="isEditMode">
      <div class="icon">
        <edit-icon class="edit" />
      </div>
      <div
        class="icon"
        @click="handlePostDelete"
      >
        <delete-icon class="delete" />
      </div>
    </div>

    <img
      class="cover-photo"
      :src="post.coverPhoto"
      alt=""
    />

    <div class="info">
      <h4>{{ post.title }}</h4>
      <h6>Posted on: {{ post.date | formatDate }}</h6>
      <router-link
        class="link"
        :to="{ name: 'post', params: { id: post.id } }"
      >
        View The Post
        <arrow-right-icon class="arrow" />
      </router-link>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */

import { mapState, mapActions } from 'vuex';

import EditIcon from '@/assets/images/icons/edit-regular.svg';
import DeleteIcon from '@/assets/images/icons/trash-regular.svg';
import ArrowRightIcon from '@/assets/images/icons/arrow-right-light.svg';

const store = {
  computed: {
    ...mapState('blog', [
      'isEditMode',
    ]),
  },
  methods: {
    ...mapActions('blog', [
      'deletePost',
    ]),
  },
};

export default {
  name: 'PostCard',
  mixins: [store],
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async handlePostDelete() {
      try {
        if (confirm('Are you sure you want to delete the post?')) {
          await this.deletePost(this.post.id);
        }
      } catch (error) {
        console.log(error.message);
      }
    },
  },
  filters: {
    formatDate(value) {
      return new Date(value).toLocaleString();
    },
  },
  components: {
    EditIcon,
    DeleteIcon,
    ArrowRightIcon,
  },
};
</script>

<style lang="scss" scoped>
.blog-card {
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background-color: #fff;
  min-height: 420px;
  transition: 0.5s ease all;

  &:hover {
    transform: rotateZ(-1deg) scale(1.01);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  .icons {
    display: flex;
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 99;

    .icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 35px;
      height: 35px;
      border-radius: 50%;
      background-color: #fff;
      transition: 0.5s ease all;

      &:hover {
        background-color: #303030;

        .edit,
        .delete {
          path {
            fill: #fff;
          }
        }
      }

      &:nth-child(1) {
        margin-right: 8px;
      }

      .edit,
      .delete {
        pointer-events: none;
        height: 15px;
        width: auto;
      }
    }
  }

  .cover-photo {
    display: block;
    border-radius: 8px 8px 0 0;
    z-index: 1;
    width: 100%;
    min-height: 200px;
    object-fit: cover;
  }

  .info {
    display: flex;
    flex-direction: column;
    height: 100%;
    z-index: 3;
    padding: 32px 16px;
    color: #000;

    h4 {
      padding-bottom: 8px;
      font-size: 20px;
      font-weight: 300;
    }

    h6 {
      font-weight: 400;
      font-size: 12px;
      padding-bottom: 16px;
    }

    .link {
      display: inline-flex;
      align-items: center;
      margin-top: auto;
      font-weight: 500;
      padding-top: 20px;
      font-size: 12px;
      padding-bottom: 4px;
      transition: 0.5s ease-in all;

      &:hover {
        color: rgba(48, 48, 48, 0.8);
      }

      .arrow {
        width: 10px;
      }
    }
  }
}
</style>
