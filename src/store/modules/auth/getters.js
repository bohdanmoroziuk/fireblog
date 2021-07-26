export default {
  isLoggedIn: (state) => (
    !!state.currentUser?.id
  ),
  isGuest: (_state, { isLoggedIn }) => (
    !isLoggedIn
  ),
  fullName: ({ currentUser }) => (
    `${currentUser.firstName} ${currentUser.lastName}`
  ),
  initials: (_state, { fullName }) => (
    fullName
      .split(' ')
      .map((x) => x[0])
      .map((x) => x.toUpperCase())
      .join('')
  ),
};
