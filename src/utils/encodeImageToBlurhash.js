import sharp from "sharp";
import { encode } from "blurhash";
import axios from "axios";

const convertToRGBA = async (path) => {
  return sharp(path).ensureAlpha().toFormat("png").toBuffer();
};

export const encodeImageToBlurhash = async (path) => {
  const response = await axios.get(path, {
    responseType: "arraybuffer",
  });

  let imageData = response.data;

  imageData = await convertToRGBA(imageData);
  const { data: pixels, info: metadata } = await sharp(imageData).raw().toBuffer({ resolveWithObject: true });
  const clamped = new Uint8ClampedArray(pixels);
  const encoded = encode(clamped, metadata.width, metadata.height, 4, 4);

  return encoded;
};
