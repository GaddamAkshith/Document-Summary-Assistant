import React from "react";
import { FileText, Upload, ScanLine, Sparkles } from "lucide-react";

export default function Features() {
  return (
    <div className="w-full max-w-6xl mx-auto mt-16 mb-20 px-4">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
        Key Features
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Feature 1 */}
        <div className="p-6 bg-white shadow-md rounded-2xl text-center hover:shadow-lg transition">
          <Upload className="w-12 h-12 mx-auto text-blue-600 mb-4" />
          <h3 className="font-semibold text-xl text-gray-800 mb-2">
            Easy File Upload
          </h3>
          <p className="text-gray-600">
            Upload PDF or image files with a single click or drag & drop.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="p-6 bg-white shadow-md rounded-2xl text-center hover:shadow-lg transition">
          <ScanLine className="w-12 h-12 mx-auto text-green-600 mb-4" />
          <h3 className="font-semibold text-xl text-gray-800 mb-2">
            OCR Extraction
          </h3>
          <p className="text-gray-600">
            Automatically extract text from scanned images using OCR.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="p-6 bg-white shadow-md rounded-2xl text-center hover:shadow-lg transition">
          <FileText className="w-12 h-12 mx-auto text-purple-600 mb-4" />
          <h3 className="font-semibold text-xl text-gray-800 mb-2">
            PDF Text Processing
          </h3>
          <p className="text-gray-600">
            Read and convert PDF content into a clean text format.
          </p>
        </div>

        {/* Feature 4 */}
        <div className="p-6 bg-white shadow-md rounded-2xl text-center hover:shadow-lg transition">
          <Sparkles className="w-12 h-12 mx-auto text-pink-600 mb-4" />
          <h3 className="font-semibold text-xl text-gray-800 mb-2">
            Smart Summarization
          </h3>
          <p className="text-gray-600">
            Generate short, medium, or long summaries instantly.
          </p>
        </div>

      </div>
    </div>
  );
}
