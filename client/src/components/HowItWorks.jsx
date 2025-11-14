import React from "react";
import { Upload, ScanSearch, FileText, Sparkles } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: <Upload className="w-12 h-12 text-blue-600" />,
      title: "Upload Document",
      desc: "Upload or drag & drop your PDF or image file into the upload panel."
    },
    {
      icon: <ScanSearch className="w-12 h-12 text-green-600" />,
      title: "Extract Text",
      desc: "The system automatically extracts text using OCR and PDF tools."
    },
    {
      icon: <FileText className="w-12 h-12 text-purple-600" />,
      title: "View Extracted Text",
      desc: "Preview all extracted contents neatly and clearly."
    },
    {
      icon: <Sparkles className="w-12 h-12 text-pink-600" />,
      title: "Generate Smart Summary",
      desc: "Select summary length and get instant meaningful results."
    }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto mt-16 mb-20 px-4">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
        How It Works
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl transition"
          >
            <div className="mb-4 flex justify-center">{step.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{step.title}</h3>
            <p className="text-gray-600 text-sm">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
