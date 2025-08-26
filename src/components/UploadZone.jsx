import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { parsePdf } from "../lib/PdfParser";
import { doOcr } from "../lib/OcrWorker";
import {
  CloudArrowUpIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

export default function UploadZone({ onTextExtracted, onProcessingStart }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");

  const onDrop = useCallback(
    async (acceptedFiles) => {
      setError("");
      setFileName("");

      if (!acceptedFiles || acceptedFiles.length === 0) {
        setError("Please select a file to upload");
        return;
      }

      const file = acceptedFiles[0];
      const maxMB = parseInt(import.meta.env.VITE_MAX_FILE_MB || "10", 10);
      if (file.size > maxMB * 1024 * 1024) {
        setError(`File size exceeds the limit of ${maxMB}MB`);
        return;
      }

      setLoading(true);
      setFileName(file.name);

      if (onProcessingStart) {
        onProcessingStart();
      }

      try {
        if (file.type === "application/pdf") {
          const text = await parsePdf(file);
          onTextExtracted(text, file.name);
        } else if (
          file.type.startsWith("image/") ||
          file.type === "application/octet-stream"
        ) {
          const text = await doOcr(file, (p) =>
            console.log("OCR progress:", p)
          );
          onTextExtracted(text, file.name);
        } else {
          const txt = await file.text();
          onTextExtracted(txt, file.name);
        }
      } catch (e) {
        console.error("File processing error:", e);
        setError("Failed to process file: " + (e.message || e));
      }
      setLoading(false);
    },
    [onTextExtracted, onProcessingStart]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "application/pdf": [".pdf"],
      "image/*": [".png", ".jpg", ".jpeg", ".gif", ".bmp", ".tiff"],
    },
  });

  return (
    <div>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed p-8 rounded-xl text-center cursor-pointer transition-all duration-200 ${
          isDragActive
            ? "border-indigo-400 bg-indigo-50"
            : "border-gray-300 hover:border-indigo-300 hover:bg-indigo-50"
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center space-y-4">
          <CloudArrowUpIcon className="w-12 h-12 text-indigo-500" />
          {isDragActive ? (
            <p className="text-indigo-600 font-medium">Drop your file here</p>
          ) : (
            <div>
              <p className="text-gray-700 font-medium">
                Drag & drop your file here, or click to browse
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Supports PDF, PNG, JPG, JPEG, GIF, BMP, TIFF (Max 10MB)
              </p>
            </div>
          )}
        </div>
      </div>

      {fileName && (
        <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200 flex items-center gap-3">
          <DocumentTextIcon className="w-5 h-5 text-green-600" />
          <p className="text-green-700 text-sm">
            <span className="font-medium">File selected:</span> {fileName}
          </p>
        </div>
      )}

      {loading && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-blue-700 text-sm flex items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            Processing your document...
          </p>
        </div>
      )}

      {error && (
        <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-200">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}
    </div>
  );
}
