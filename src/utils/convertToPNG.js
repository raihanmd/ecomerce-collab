export const convertToPNG = async (inputBlob) => {
  return sharp(inputBlob).ensureAlpha().toFormat("png").toBuffer();
};
