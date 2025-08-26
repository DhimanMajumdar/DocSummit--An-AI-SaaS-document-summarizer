import React from "react";
import {
  SparklesIcon,
  CloudArrowUpIcon,
  LightBulbIcon,
  ArrowRightIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/solid";

export default function LandingPage({ onStart }) {
  return (
    <div className="px-4 sm:px-6 py-8 sm:py-12 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <header className="max-w-6xl mx-auto flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <SparklesIcon className="w-7 h-7 sm:w-8 sm:h-8 text-indigo-600" />
          <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            DocSummit
          </h1>
        </div>
        <nav>
          <button
            onClick={onStart}
            className="bg-indigo-600 text-white px-4 sm:px-6 py-2 rounded-lg font-medium 
                     text-sm sm:text-base hover:bg-indigo-700 transition-all duration-200 
                     flex items-center gap-2 shadow-md hover:shadow-lg whitespace-nowrap"
          >
            Try DocSummit <ArrowRightIcon className="w-4 h-4" />
          </button>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto mt-6 sm:mt-8">
        <section className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Transform Documents into
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent block sm:inline">
              {" "}
              Clear Insights
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-8 sm:mb-10 px-4">
            AI-powered document summaries that save you time and enhance
            understanding. Perfect for students, researchers, and professionals.
          </p>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 sm:mb-16 px-2">
          <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-100">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
              <CloudArrowUpIcon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-base sm:text-lg mb-2">
              Easy Upload
            </h3>
            <p className="text-sm sm:text-gray-600">
              Drag & drop PDFs or images with advanced OCR technology.
            </p>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-100">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
              <SparklesIcon className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-base sm:text-lg mb-2">
              AI Summaries
            </h3>
            <p className="text-sm sm:text-gray-600">
              Short, medium, or long summaries using Google's Gemini AI.
            </p>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-100">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
              <LightBulbIcon className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-base sm:text-lg mb-2">
              Smart Suggestions
            </h3>
            <p className="text-sm sm:text-gray-600">
              Actionable tips to improve your document's clarity.
            </p>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-100">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
              <QuestionMarkCircleIcon className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />
            </div>
            <h3 className="font-semibold text-base sm:text-lg mb-2">
              Interactive Q&A
            </h3>
            <p className="text-sm sm:text-gray-600">
              Ask questions and get instant AI-powered answers.
            </p>
          </div>
        </section>

        <section className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 max-w-4xl mx-auto">
          <div className="text-center">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
              Ready to revolutionize your workflow?
            </h3>
            <p className="text-gray-600 mb-4 sm:mb-6">
              Join thousands who save hours every week.
            </p>
            <button
              onClick={onStart}
              className="bg-indigo-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200 text-sm sm:text-base"
            >
              Start Summarizing Now
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
