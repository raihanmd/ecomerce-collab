import { blobToUint8Array } from "@/utils/blobToUnit8Array";

function btoaExtended(string) {
  return btoa(
    encodeURIComponent(string).replace(/%([0-9A-F]{2})/g, (match, p1) => {
      return String.fromCharCode(parseInt(p1, 16));
    })
  );
}

export async function fetchUint8ArrayPOST(url, data) {
  try {
    if (!(data.blobImage instanceof Blob)) {
      throw new Error("Invalid blobImage. Expected Blob object.");
    }

    const blob = data.blobImage;
    const uint8Array = await blobToUint8Array(blob);

    const textDecoder = new TextDecoder();
    const imageString = textDecoder.decode(uint8Array);

    const base64Image = btoaExtended(imageString);

    const requestData = {
      image: base64Image,
    };

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "API-Key": "JHsduh78^823njshdUYSdnwu7",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    return await res.json();
  } catch (error) {
    throw error;
  }
}
