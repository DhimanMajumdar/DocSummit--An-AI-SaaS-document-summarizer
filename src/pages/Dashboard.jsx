import React, { useState } from "react";
import UploadZone from "../components/UploadZone";
import SummaryTabs from "../components/SummaryTabs";
import SuggestionBox from "../components/SuggestionBox";
import { ArrowLeftIcon, DocumentTextIcon } from "@heroicons/react/24/outline";

export default function Dashboard({ onBack }) {
  const [documentText, setDocumentText] = useState("");
  const [title, setTitle] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleTextExtracted = (text, fileName) => {
    setDocumentText(text);
    setTitle(fileName);
    setIsProcessing(false);
  };

  const handleProcessingStart = () => {
    setIsProcessing(true);
    setDocumentText("");
    setTitle("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Back to Home
          </button>
          <div className="flex items-center gap-2">
            <DocumentTextIcon className="w-8 h-8 text-indigo-600" />
            <h2 className="text-2xl font-bold text-gray-900">
              Document Summary Assistant
            </h2>
          </div>
          <div />
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <UploadZone
            onTextExtracted={handleTextExtracted}
            onProcessingStart={handleProcessingStart}
          />
        </div>

        {isProcessing && (
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="animate-pulse flex flex-col items-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <DocumentTextIcon className="w-6 h-6 text-indigo-600" />
              </div>
              <p className="text-gray-600 font-medium">
                Processing your document, please wait...
              </p>
            </div>
          </div>
        )}

        {documentText && !isProcessing && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-6">
              <SummaryTabs documentText={documentText} title={title} />
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <SuggestionBox documentText={documentText} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
