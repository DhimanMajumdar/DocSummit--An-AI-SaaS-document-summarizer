import React, { useState, useEffect } from "react";
import { generateSuggestion } from "../services/SummaryService";
import { LightBulbIcon } from "@heroicons/react/24/outline";

export default function SuggestionBox({ documentText }) {
  const [suggestion, setSuggestion] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSuggestion("");
  }, [documentText]);

  const ask = async () => {
    if (!documentText) return;
    setLoading(true);
    try {
      const s = await generateSuggestion(documentText);
      setSuggestion(s);
    } catch (e) {
      setSuggestion("Failed to get suggestions. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="h-full">
      <div className="flex items-center gap-2 mb-4">
        <LightBulbIcon className="w-6 h-6 text-yellow-600" />
        <h4 className="font-semibold text-gray-900">
          AI Improvement Suggestions
        </h4>
      </div>

      <p className="text-sm text-gray-600 mb-6">
        Get actionable tips to enhance your document's clarity, structure, and
        readability.
      </p>

      <div className="mb-6">
        <button
          onClick={ask}
          disabled={loading || !documentText}
          className="w-full bg-indigo-600 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Generating...
            </>
          ) : (
            <>Get AI Suggestions</>
          )}
        </button>
      </div>

      {suggestion && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <h5 className="font-medium text-yellow-800 mb-2">Suggestions:</h5>
          <div className="text-sm text-yellow-700 whitespace-pre-wrap leading-relaxed">
            {suggestion}
          </div>
        </div>
      )}
    </div>
  );
}
