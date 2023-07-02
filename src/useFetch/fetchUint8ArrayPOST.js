import { blobToUint8Array } from "@/utils/blobToUnit8Array";

export async function fetchUint8ArrayPOST(url, data) {
  try {
    const blob = data.blobImage;
    const uint8Array = await blobToUint8Array(blob);

    const requestData = {
      image: Array.from(uint8Array),
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
