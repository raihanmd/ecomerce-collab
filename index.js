const { default: axios } = require("axios");
const { encode, isBlurhashValid } = require("blurhash");
const probe = require("probe-image-size");
const sharp = require("sharp");

image = "https://firebasestorage.googleapis.com/v0/b/ecomerce-bc524.appspot.com/o/images%2FkedtT6Wy_gwuGXdAyT1N.jpg?alt=media&token=8a7e12ac-5208-4aa9-8073-a3be8e61e38a";

image2 = "https://t-2.tstatic.net/medan/foto/bank/images2/Contoh-gambar.jpg";

const convertToRGBA = async (path) => {
  return sharp(path)
    .ensureAlpha() // Menambahkan saluran Alpha jika tidak ada
    .toFormat("png") // Mengonversi ke format PNG (RGBA)
    .toBuffer();
};

const a = async () => {
  try {
    const response = await axios.get(image, {
      responseType: "arraybuffer",
    });
    let imageData = response.data;

    imageData = await convertToRGBA(imageData);
    const { data: pixels, info: metadata } = await sharp(imageData).raw().toBuffer({ resolveWithObject: true });
    const clamped = new Uint8ClampedArray(pixels);
    const encoded = encode(clamped, metadata.width, metadata.height, 4, 4);

    console.log(isBlurhashValid(encoded));
  } catch (error) {
    console.error(error);
  }
};

a();
