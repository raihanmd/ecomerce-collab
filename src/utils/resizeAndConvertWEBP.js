import sharp from "sharp";

export async function convertToMinResolutionAndWebP(inputBlob) {
  const inputBuffer = await inputBlob.arrayBuffer();
  const image = sharp(inputBuffer);
  const metadata = await image.metadata();

  const targetWidth = Math.max(metadata.width || 0, 250);
  const targetHeight = Math.max(metadata.height || 0, 250);

  const outputBuffer = await image
    .resize({
      width: targetWidth,
      height: targetHeight,
      fit: "inside",
    })
    .toFormat("webp")
    .toBuffer();

  return new Blob([outputBuffer], { type: "image/webp" });
}
