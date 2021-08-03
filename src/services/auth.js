import { auth, database } from '../firebase';

export const resetPassword = async (email) => {
  await auth.sendPasswordResetEmail(email);
};

export const getCurrentUser = async () => {
  const currentUserDocument = await database.users
    .doc(auth.currentUser.uid)
    .get();

  return currentUserDocument;
};

export const signIn = async (email, password) => {
  await auth.signInWithEmailAndPassword(email, password);
};

export const signOut = async () => {
  await auth.signOut();
};

export const register = async ({
  email,
  password,
  firstName,
  lastName,
  username,
}) => {
  const { user } = await auth.createUserWithEmailAndPassword(email, password);

  await database.users
    .doc(user.uid)
    .set({
      email,
      firstName,
      lastName,
      username,
    });
};

export const updateProfile = async (userId, changes) => {
  await database.users
    .doc(userId)
    .update(changes);
};

export const addStateChangeListener = (listener) => {
  auth.onAuthStateChanged(listener);
};

export default {
  signIn,
  signOut,
  register,
  resetPassword,
  getCurrentUser,
  updateProfile,
  addStateChangeListener,
};
