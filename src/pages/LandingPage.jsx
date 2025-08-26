import React from "react";
import {
  SparklesIcon,
  DocumentTextIcon,
  CloudArrowUpIcon,
  LightBulbIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/solid";

export default function LandingPage({ onStart }) {
  return (
    <div className="px-6 py-12 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <header className="max-w-6xl mx-auto flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <SparklesIcon className="w-8 h-8 text-indigo-600" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            DocSummit
          </h1>
        </div>
        <nav>
          <button
            onClick={onStart}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg"
          >
            Try DocSummit <ArrowRightIcon className="w-4 h-4" />
          </button>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto mt-8">
        <section className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Transform Documents into
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {" "}
              Clear Insights
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            AI-powered document summaries that save you time and enhance
            understanding. Perfect for students, researchers, and professionals.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <CloudArrowUpIcon className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Easy Upload</h3>
            <p className="text-gray-600">
              Drag & drop PDFs or images. We handle the rest with advanced OCR
              technology.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <SparklesIcon className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">AI-Powered Summaries</h3>
            <p className="text-gray-600">
              Get concise short, medium, or long summaries using Google's Gemini
              AI.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <LightBulbIcon className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Smart Suggestions</h3>
            <p className="text-gray-600">
              Receive actionable tips to improve your document's clarity and
              structure.
            </p>
          </div>
        </section>

        <section className="bg-white rounded-3xl shadow-xl p-8 max-w-4xl mx-auto">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to revolutionize your workflow?
            </h3>
            <p className="text-gray-600 mb-6">
              Join thousands of students and professionals who save hours every
              week.
            </p>
            <button
              onClick={onStart}
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200"
            >
              Start Summarizing Now
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
