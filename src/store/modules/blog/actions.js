import { storage, database } from '../../../firebase';

export default {
  uploadImage: (_context, { image, onComplete }) => {
    const documentRef = storage
      .ref()
      .child(`documents/postPhotos/${image.name}`);

    documentRef
      .put(image)
      .on('state_changed',
        () => {},
        () => {},
        async () => {
          const downloadUrl = await documentRef.getDownloadURL();

          onComplete(downloadUrl);
        });
  },
  getPosts: async ({ commit }) => {
    try {
      commit('getPostsRequest');

      const documents = await database.posts
        .orderBy('date', 'asc')
        .get();

      const posts = [];

      documents.forEach((document) => {
        posts.push(document.data());
      });

      commit('getPostsSuccess', posts);
    } catch (error) {
      commit('getPostsFailure', error);
    }
  },
  deletePost: async ({ commit }, id) => {
    await database.posts
      .doc(id)
      .delete();

    commit('deletePost', id);
  },
};
