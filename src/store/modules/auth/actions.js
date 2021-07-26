import { auth, database } from '../../../firebase';

export default {
  updateProfile: async ({ state: { currentUser } }, payload) => {
    const userRef = database.users.doc(currentUser.id);

    const changes = Object.fromEntries(
      Object.entries(currentUser)
        .filter(([key, value]) => value !== payload[key]),
    );

    await userRef.update(changes);
  },
  signOut: async () => {
    await auth.signOut();
    window.location.reload();
  },
  register: async (
    _context,
    {
      email,
      password,
      firstName,
      lastName,
      username,
    },
  ) => {
    const response = await auth.createUserWithEmailAndPassword(email, password);
    const userRef = database.users.doc(response.user.uid);

    await userRef.set({
      email,
      firstName,
      lastName,
      username,
    });
  },
  signIn: async (
    _context,
    {
      email,
      password,
    },
  ) => {
    await auth.signInWithEmailAndPassword(email, password);
  },
  resetPassword: async (
    _context,
    {
      email,
    },
  ) => {
    await auth.sendPasswordResetEmail(email);
  },
  getCurrentUser: async ({ commit }) => {
    const currentUserRef = database.users.doc(auth.currentUser.uid);
    const currentUserDocument = await currentUserRef.get();

    commit('setCurrentUser', currentUserDocument);
  },
  watchAuthStateChange: ({ dispatch }) => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch('getCurrentUser');
      }
    });
  },
};
