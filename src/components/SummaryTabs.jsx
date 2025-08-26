import React, { useState, useEffect } from "react";
import { generateSummary } from "../services/SummaryService";
import Spinner from "./Spinner";

export default function SummaryTabs({ documentText, title }) {
  const [active, setActive] = useState("short");
  const [summaries, setSummaries] = useState({
    short: "",
    medium: "",
    long: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentDocHash, setCurrentDocHash] = useState("");

  const getDocHash = (text) => {
    return text.length > 100 ? text.substring(0, 100) + text.length : text;
  };

  useEffect(() => {
    if (documentText && documentText.trim().length > 0) {
      const newHash = getDocHash(documentText);

      if (newHash !== currentDocHash) {
        setSummaries({ short: "", medium: "", long: "" });
        setActive("short");
        setError("");
        setCurrentDocHash(newHash);
        ensureSummary("short");
      }
    }
  }, [documentText]);

  const ensureSummary = async (mode) => {
    if (!documentText || documentText.trim().length === 0) {
      setError("Please upload a document first");
      return;
    }

    if (summaries[mode] && getDocHash(documentText) === currentDocHash) {
      return;
    }

    setError("");
    setLoading(true);
    try {
      const s = await generateSummary(documentText, { mode, title });
      setSummaries((prev) => ({ ...prev, [mode]: s }));
    } catch (e) {
      setError("Failed to generate summary: " + (e.message || e));
    }
    setLoading(false);
  };

  const tabStyles = (isActive) =>
    `px-4 py-2 font-medium text-sm rounded-lg transition-all duration-200 ${
      isActive
        ? "bg-indigo-100 text-indigo-700 shadow-sm"
        : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <div>
      <div className="flex gap-2 mb-6">
        <button
          className={tabStyles(active === "short")}
          onClick={() => {
            setActive("short");
            ensureSummary("short");
          }}
        >
          Short Summary
        </button>
        <button
          className={tabStyles(active === "medium")}
          onClick={() => {
            setActive("medium");
            ensureSummary("medium");
          }}
        >
          Medium Summary
        </button>
        <button
          className={tabStyles(active === "long")}
          onClick={() => {
            setActive("long");
            ensureSummary("long");
          }}
        >
          Detailed Summary
        </button>
      </div>

      <div className="bg-gray-50 rounded-xl p-6 min-h-[300px]">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64">
            <Spinner />
            <p className="text-gray-500 mt-4">Generating your summary...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700">{error}</p>
          </div>
        ) : (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {title || "Document"} —{" "}
              {active.charAt(0).toUpperCase() + active.slice(1)} Summary
            </h3>
            <div className="prose prose-indigo max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {summaries[active] || "Select a tab to generate the summary."}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
