import { storage } from "@/connection/firebaseConfig";
import { getDownloadURL, ref } from "firebase/storage";

export const getImageURL = async (imageName) => {
  return await getDownloadURL(ref(storage, `images/${imageName}`)).catch((err) => {
    throw err;
  });
};
