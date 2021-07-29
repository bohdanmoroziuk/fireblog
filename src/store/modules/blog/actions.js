import { storage } from '../../../firebase';

export default {
  uploadImage: (_context, { image, onComplete }) => {
    const documentRef = storage
      .ref()
      .child(`documents/postPhotos/${image.name}`);

    documentRef
      .put(image)
      .on('state_changed',
        () => {},
        () => {},
        async () => {
          const downloadUrl = await documentRef.getDownloadURL();

          onComplete(downloadUrl);
        });
  },
};
