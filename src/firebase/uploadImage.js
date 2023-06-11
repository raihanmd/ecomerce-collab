import { storage } from "@/connection/firebaseConfig";
import { ref, uploadBytes } from "firebase/storage";

export const uploadImage = (blobImage, imageProduct) => {
  try {
    const imageRef = ref(storage, `images/${imageProduct}`);
    uploadBytes(imageRef, blobImage, { contentType: "image/webp" })
      .then((res) => true)
      .catch((err) => {
        throw err;
      });
  } catch (error) {
    throw error;
  }
};
