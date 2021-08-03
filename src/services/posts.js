import { database, storage } from '@/firebase';

export const getPosts = async () => {
  const posts = [];

  const documents = await database.posts
    .orderBy('date', 'asc')
    .get();

  documents.forEach((document) => {
    posts.push(document.data());
  });

  return posts;
};

export const deletePost = async (id) => {
  await database.posts
    .doc(id)
    .delete();
};

export const uploadImage = ({
  image,
  path,
  onSnapshot = () => {},
  onError = () => {},
  onComplete,
}) => {
  const documentRef = storage
    .ref()
    .child(path);

  documentRef
    .put(image)
    .on('state_changed',
      onSnapshot,
      onError,
      async () => {
        const downloadUrl = await documentRef.getDownloadURL();

        onComplete(downloadUrl);
      });
};

export default {
  getPosts,
  deletePost,
  uploadImage,
};
