import sharp from "sharp";
import { encode } from "blurhash";

export async function blurhashCloudConvert(imagePath) {
  try {
    const imageData = await sharp(imagePath).ensureAlpha().toFormat("png").toBuffer();

    const { data: pixels, info: metadata } = await sharp(imageData).raw().toBuffer({ resolveWithObject: true });
    const clamped = new Uint8ClampedArray(pixels);
    const encoded = encode(clamped, metadata.width, metadata.height, 4, 4);

    return encoded;
  } catch (error) {
    console.error("Terjadi kesalahan:", error.message);
    throw error;
  }
}
