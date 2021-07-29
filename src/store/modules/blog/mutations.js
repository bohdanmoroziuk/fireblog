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
};
