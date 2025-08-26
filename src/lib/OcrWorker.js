import Tesseract from "tesseract.js";

export async function doOcr(file, onProgress = () => {}) {
  // convert file to blob URL
  const blob = file;
  const {
    data: { text },
  } = await Tesseract.recognize(blob, "eng", {
    logger: (m) => {
      if (m.status === "recognizing text") onProgress(m.progress);
    },
  });
  return text;
}
