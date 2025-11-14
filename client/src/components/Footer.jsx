import React from "react";
import logo from "../assets/logo.png";
export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-gray-300 py-6 mt-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
        <img src={logo} alt="logo" className="w-12 mb-3 opacity-90" />
        <h2 className="text-lg font-semibold tracking-wide">
          DOC-SUMMARE
        </h2>
        <p className="text-sm mt-1">
          © {new Date().getFullYear()} Developed by <span className="font-semibold">Gaddam Akshith</span>
        </p>
      </div>
    </footer>
  );
}
