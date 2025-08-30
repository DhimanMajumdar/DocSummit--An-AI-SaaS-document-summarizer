import { DocumentTextIcon } from "@heroicons/react/24/solid";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-blue-200 border-t border-gray-200 mt-auto py-6">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 sm:mb-0">
            <DocumentTextIcon className="w-5 h-5 text-indigo-600" />
            <span className="font-medium text-gray-900">DocSummit</span>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-600 text-center">
            <span>
              Turning lengthy documents into TL;DR magic since {currentYear}
            </span>
            <span className="hidden sm:inline">•</span>
            <span>© {currentYear}</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 sm:mt-0 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <span>Made by Dhiman with</span>
              <span className="text-red-500">💖🍵</span>
            </div>
          </div>
        </div>

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-400">
            Because reading is hard, but looking smart is easy! ✨
          </p>
        </div>
      </div>
    </footer>
  );
}
