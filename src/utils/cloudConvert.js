import { statSync } from "fs";
import { createClient } from "cloudconvert";

import { uploadImage } from "@/firebase/uploadImage";
import { getNanoid } from "./getNanoid";
import { blurhashCloudConvert } from "./blurhashCloudConvert";

const client = createClient({
  apiKey: process.env.CLOUDCONVERT_API_KEY,
});

export async function imageHandler(inputFilePath) {
  try {
    const { size: imageSize } = statSync(inputFilePath);
    const imageRatio = imageSize.width / imageSize.height;

    const targetWidth = Math.max(250, Math.round(imageRatio * 250));
    const targetHeight = Math.max(250, Math.round(250 / imageRatio));

    const conversion = await client.convert({
      inputformat: "auto",
      outputformat: "webp",
      input: "upload",
      file: createReadStream(inputFilePath),
      output: {
        quality: "auto",
        resize: {
          width: targetWidth,
          height: targetHeight,
          mode: "fit",
        },
      },
    });

    const finishedConversion = await conversion.wait();

    const outputFileName = `${getNanoid(20)}.webp`;

    await uploadImage(finishedConversion.download(), outputFileName, "image/webp");

    const blurhash = await blurhashCloudConvert(outputFileName);

    return { outputFileName, blurhash };
  } catch (error) {
    console.error("Terjadi kesalahan:", error.message);
  }
}
