import React, { useState } from "react";
import QnABox from "../components/QnABox";
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-8 gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition-colors duration-200 self-start sm:self-auto"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span className="hidden xs:inline">Back to Home</span>
            <span className="xs:hidden">Back</span>
          </button>
          <div className="flex items-center gap-2 order-first sm:order-none">
            <DocumentTextIcon className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-600" />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              Document Summary Assistant
            </h2>
          </div>
          <div className="hidden sm:block w-24" /> {/* Spacer for alignment */}
        </div>

        {/* Upload Zone */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-md sm:shadow-xl p-4 sm:p-6 mb-6 sm:mb-8">
          <UploadZone
            onTextExtracted={handleTextExtracted}
            onProcessingStart={handleProcessingStart}
          />
        </div>

        {/* Processing Indicator */}
        {isProcessing && (
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-md sm:shadow-xl p-6 sm:p-8 text-center">
            <div className="animate-pulse flex flex-col items-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                <DocumentTextIcon className="w-4 h-4 sm:w-6 sm:h-6 text-indigo-600" />
              </div>
              <p className="text-sm sm:text-base text-gray-600 font-medium">
                Processing your document, please wait...
              </p>
            </div>
          </div>
        )}

        {/* Results Section */}
        {documentText && !isProcessing && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left side (SummaryTabs) */}
            <div className="md:col-span-2">
              <SummaryTabs documentText={documentText} title={title} />
            </div>

            {/* Right side (Suggestions + QnA stacked) */}
            <div className="flex flex-col gap-6">
              <SuggestionBox documentText={documentText} />
              <QnABox documentText={documentText} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
