import { storage } from "@/connection/firebaseConfig";
import { ref, uploadBytes } from "firebase/storage";

export const uploadImage = async (blobImage, imageProduct) => {
  try {
    const imageRef = ref(storage, `images/${imageProduct}`);
    await uploadBytes(imageRef, blobImage)
      .then((res) => res)
      .catch((err) => {
        throw err;
      });
  } catch (error) {
    throw error;
  }
};
