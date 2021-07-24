export default {
  setCurrentUser: (state, currentUserDocument) => {
    state.currentUser = {
      id: currentUserDocument.id,
      ...currentUserDocument.data(),
    };
  },
};
