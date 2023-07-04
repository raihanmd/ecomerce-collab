export function blobToUint8Array(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function () {
      const arrayBuffer = reader.result;
      const uint8Array = new Uint8Array(arrayBuffer);
      resolve(uint8Array);
    };

    reader.onerror = function (error) {
      reject(error);
    };

    reader.readAsArrayBuffer(blob);
  });
}
