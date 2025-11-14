import React from "react";
import logo from "../assets/logo.png";

export default function About() {
  return (
    <div className="w-full bg-white/80 backdrop-blur-sm shadow-md rounded-2xl p-10 max-w-4xl mx-auto mt-12 mb-20">
      <div className="flex flex-col items-center text-center">
        <img src={logo} alt="logo" className="w-20 mb-4 opacity-90" />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          About DOC-SUMMARE
        </h1>
        <p className="text-gray-700 text-lg leading-relaxed">
          DOC-SUMMARE is a smart document processing tool designed to extract
          text from PDF files and images and convert them into clean, readable
          digital content. The system uses built-in OCR technology and
          summarization models to generate quick, clear, and meaningful summaries.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed mt-4">
          The purpose of this platform is to simplify working with long
          documents, reduce reading time, and improve productivity. Users can
          simply upload a file, extract the text, and generate compact summaries
          tailored to their preferred length.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed mt-4">
          DOC-SUMMARE aims to provide an efficient, accurate, and user-friendly
          experience for students, professionals, researchers, and anyone who
          works with large amounts of written information.
        </p>
      </div>
    </div>
  );
}
