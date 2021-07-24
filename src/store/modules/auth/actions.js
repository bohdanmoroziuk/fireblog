import { auth, database } from '../../../firebase';

export default {
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
};
