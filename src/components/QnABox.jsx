import React, { useState } from "react";
import { askQuestionAboutDocument } from "../services/SummaryService";
import {
  QuestionMarkCircleIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";

export default function QnABox({ documentText }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const askQuestion = async () => {
    if (!question.trim() || !documentText) return;

    setLoading(true);
    try {
      const response = await askQuestionAboutDocument(documentText, question);
      const newQnA = { question, answer: response };
      setAnswer(response);
      setHistory((prev) => [newQnA, ...prev.slice(0, 4)]); // Keep last 5 items
    } catch (error) {
      setAnswer("Sorry, I encountered an error. Please try again.");
    }
    setLoading(false);
    setQuestion("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      askQuestion();
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 h-full">
      <div className="flex items-center gap-2 mb-4">
        <QuestionMarkCircleIcon className="w-6 h-6 text-indigo-600" />
        <h4 className="font-semibold text-gray-900">Document Q&A</h4>
      </div>

      <p className="text-sm text-gray-600 mb-6">
        Ask questions about your document and get AI-powered answers based on
        its content.
      </p>

      {/* Question Input */}
      <div className="relative mb-6">
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask a question about your document..."
          className="w-full p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          rows="2"
          disabled={loading || !documentText}
        />
        <button
          onClick={askQuestion}
          disabled={loading || !documentText || !question.trim()}
          className="absolute right-2 bottom-2 bg-indigo-600 text-white p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700 transition-colors"
        >
          {loading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          ) : (
            <PaperAirplaneIcon className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Current Answer */}
      {answer && (
        <div className="mb-6">
          <h5 className="font-medium text-gray-900 mb-2">Answer:</h5>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-gray-700 whitespace-pre-wrap">{answer}</p>
          </div>
        </div>
      )}

      {/* Question History */}
      {history.length > 0 && (
        <div>
          <h5 className="font-medium text-gray-900 mb-3">Recent Questions</h5>
          <div className="space-y-3">
            {history.map((item, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-3"
              >
                <p className="text-sm font-medium text-gray-900">
                  Q: {item.question}
                </p>
                <p className="text-sm text-gray-600 mt-1">A: {item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {!documentText && (
        <div className="text-center text-gray-500 py-8">
          <QuestionMarkCircleIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>Upload a document to start asking questions</p>
        </div>
      )}
    </div>
  );
}
