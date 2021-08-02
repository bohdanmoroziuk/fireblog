export default {
  feed: (state) => (
    state.posts.slice(0, 2)
  ),
  cards: (state) => (
    state.posts.slice(2, 6)
  ),
  getPostById: (state) => (id) => (
    state.posts.find((post) => post.id === id)
  ),
};
