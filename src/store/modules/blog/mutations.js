export default {
  setEditMode: (state, value) => {
    state.isEditMode = value;
  },
  toggleEditMode: (state) => {
    state.isEditMode = !state.isEditMode;
  },
  addPost: (state, post) => {
    state.post = post;
  },
  getPostsRequest: (state) => {
    state.isLoading = true;
    state.posts = [];
  },
  getPostsSuccess: (state, posts) => {
    state.isLoading = false;
    state.posts = posts;
  },
  getPostsFailure: (state) => {
    state.isLoading = false;
    state.posts = [];
  },
  deletePost: (state, id) => {
    state.posts = state.posts.filter((post) => post.id !== id);
  },
};
