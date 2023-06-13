import { storage } from "@/connection/firebaseConfig";
import { deleteObject, ref } from "firebase/storage";

export const deleteImage = async (imageName) => {
  return await deleteObject(ref(storage, `images/${imageName}`)).catch((err) => {
    throw err;
  });
};
