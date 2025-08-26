import * as pdfjsLib from "pdfjs-dist/build/pdf";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker?url";

// Set the worker path
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export const parsePdf = async (file) => {
  try {
    console.log("Starting PDF parsing...");
    const arrayBuffer = await file.arrayBuffer();
    console.log("PDF loaded, arrayBuffer size:", arrayBuffer.byteLength);

    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    console.log("PDF document loaded, pages:", pdf.numPages);

    let text = "";
    for (let i = 0; i < pdf.numPages; i++) {
      console.log("Processing page:", i + 1);
      const page = await pdf.getPage(i + 1);
      const content = await page.getTextContent();
      const strings = content.items.map((item) => item.str);
      text += strings.join(" ") + "\n";
    }

    console.log("PDF parsing completed, text length:", text.length);
    return text;
  } catch (error) {
    console.error("PDF parsing error:", error);
    throw new Error(`Failed to parse PDF: ${error.message}`);
  }
};
