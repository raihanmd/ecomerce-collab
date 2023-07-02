export function blobToUint8Array(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result instanceof ArrayBuffer) {
        resolve(new Uint8Array(reader.result));
      } else {
        reject(new Error("Failed to convert Blob to Uint8Array."));
      }
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(blob);
  });
}
