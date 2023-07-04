import sharp from "sharp";

export async function convertToMinResolutionAndWebP(inputBlob) {
  console.log(inputBlob);
  const buffer = Buffer.from(inputBlob);

  console.log(buffer);

  const image = sharp(buffer);
  const metadata = await image.metadata();
  console.log(metadata);

  if (!["jpeg", "png", "gif", "webp"].includes(metadata.format.toLowerCase())) {
    throw new Error("Unsupported image format.");
  }

  const targetWidth = Math.max(metadata.width || 0, 250);
  const targetHeight = Math.max(metadata.height || 0, 250);

  const resizedImage = await image.resize(targetWidth, targetHeight, {
    fit: "inside",
    withoutEnlargement: true,
  });

  const webpBuffer = await resizedImage.toFormat("webp").toBuffer();

  return new Blob([webpBuffer], { type: "image/webp" });
}
