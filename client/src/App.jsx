import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import About from "./components/About";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import FAQ from "./components/FAQ";


const BACKEND_URL = "https://document-summary-assistant-camd.onrender.com";

export default function App() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [extractedText, setExtractedText] = useState("");
  const [summary, setSummary] = useState("");
  const [summaryLength, setSummaryLength] = useState("short");
  const [error, setError] = useState("");

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
      "image/*": [".jpg", ".jpeg", ".png"],
    },
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
      setExtractedText("");
      setSummary("");
      setError("");
    },
  });

  const handleUpload = async () => {
    if (!file) return setError("Please select a file first!");

    try {
      setLoading(true);
      setError("");
      setExtractedText("");
      setSummary("");

      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(`${BACKEND_URL}/api/extract`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setExtractedText(response.data.text);
    } catch (err) {
      console.error(err);
      setError("Failed to extract text. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSummarize = async () => {
    if (!extractedText) return setError("Please extract text first!");

    try {
      setLoading(true);
      setError("");

      const response = await axios.post(`${BACKEND_URL}/api/summarize`, {
        text: extractedText,
        length: summaryLength,
      });

      setSummary(response.data.summary);
    } catch (err) {
      console.error(err);
      setError("Failed to generate summary.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div id="uploadSection" className="flex-grow w-full flex flex-col items-center justify-start pt-28 p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Document Summary Assistant
        </h1>

        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-2xl p-20 w-full max-w-xl text-center cursor-pointer transition ${
            isDragActive
              ? "border-blue-800 bg-blue-50"
              : "border-gray-700 hover:border-blue-400"
          }`}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className="text-blue-600 font-medium">Drop your file here...</p>
          ) : (
            <p className="text-gray-600">
              Drag & drop a PDF or image file here, or{" "}
              <span className="text-blue-600 font-semibold">browse</span>
            </p>
          )}
        </div>

        {file && (
          <div className="mt-6 p-4 bg-white shadow rounded-xl w-full max-w-xl">
            <p className="text-gray-700">
              <strong>Uploaded:</strong> {file.name}
            </p>
            <p className="text-sm text-gray-500">
              Size: {(file.size / 1024).toFixed(2)} KB
            </p>
            <button
              onClick={handleUpload}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
              disabled={loading}
            >
              {loading ? "Extracting..." : "Extract Text"}
            </button>
          </div>
        )}

        {extractedText && (
          <div className="mt-6 p-4 bg-white shadow rounded-xl w-full max-w-xl">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Extracted Text
            </h2>
            <p className="text-gray-700 whitespace-pre-wrap mb-4">{extractedText}</p>

            <div className="flex items-center justify-between">
              <select
                className="border rounded-md p-2 text-gray-700"
                value={summaryLength}
                onChange={(e) => setSummaryLength(e.target.value)}
              >
                <option value="short">Short</option>
                <option value="medium">Medium</option>
                <option value="long">Long</option>
              </select>

              <button
                onClick={handleSummarize}
                className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400"
                disabled={loading}
              >
                {loading ? "Summarizing..." : "Generate Summary"}
              </button>
            </div>
          </div>
        )}

        {summary && (
          <div className="mt-6 p-4 bg-white shadow rounded-xl w-full max-w-xl max-h-96 overflow-y-auto">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">AI Summary</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{summary}</p>
          </div>
        )}

        {error && <p className="text-red-500 mt-4 font-medium">{error}</p>}
      </div>

      <About />
      <Features />
      <HowItWorks />
      <FAQ />
      <Footer />
    </div>
  );
}
