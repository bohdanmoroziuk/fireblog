export default {
  feed: (state) => (
    state.posts.slice(0, 2)
  ),
  cards: (state) => (
    state.posts.slice(2, 6)
  ),
};
