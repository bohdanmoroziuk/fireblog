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
};
