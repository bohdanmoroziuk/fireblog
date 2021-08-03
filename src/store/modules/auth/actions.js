/* eslint-disable import/no-named-as-default-member */

import AuthService from '@/services/auth';

export default {
  updateProfile: async ({ state: { currentUser } }, payload) => {
    const changes = {
      firstName: payload.firstName,
      lastName: payload.lastName,
      username: payload.username,
    };

    await AuthService.updateProfile(currentUser.id, changes);
  },
  signOut: async () => {
    await AuthService.signOut();

    localStorage.setItem('fireblog/isLoggedIn', false);
    window.location.reload();
  },
  register: async (_context, payload) => {
    await AuthService.register(payload);
  },
  signIn: async (
    _context,
    {
      email,
      password,
    },
  ) => {
    await AuthService.signIn(email, password);
    localStorage.setItem('fireblog/isLoggedIn', true);
  },
  resetPassword: async (
    _context,
    {
      email,
    },
  ) => {
    await AuthService.resetPassword(email);
  },
  getCurrentUser: async ({ commit }) => {
    const currentUserDocument = await AuthService.getCurrentUser();

    commit('setCurrentUser', currentUserDocument);
  },
  watchAuthStateChange: ({ dispatch }) => {
    AuthService.addStateChangeListener((user) => {
      if (user) {
        dispatch('getCurrentUser');
      }
    });
  },
};
