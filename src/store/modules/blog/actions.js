/* eslint-disable import/no-named-as-default-member */

import PostsService from '@/services/posts';

export default {
  uploadImage: (_context, { image, onComplete }) => {
    PostsService.uploadImage({
      image,
      onComplete,
      path: `documents/postPhotos/${image.name}`,
    });
  },
  getPosts: async ({ commit }) => {
    try {
      commit('getPostsRequest');

      const posts = await PostsService.getPosts();

      commit('getPostsSuccess', posts);
    } catch (error) {
      commit('getPostsFailure', error);
    }
  },
  deletePost: async ({ commit }, id) => {
    await PostsService.deletePost(id);

    commit('deletePost', id);
  },
};
