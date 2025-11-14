import React from "react";
import logo from "../assets/logo.png";

export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img src={logo} alt="logo" className="w-10 h-10" />
          <h1 className="text-xl font-bold text-gray-800 tracking-wide">
            DOC-SUMMARE
          </h1>
        </div>
        <div>
          <p className="text-gray-700 font-semibold text-lg">
            Gaddam Akshith
          </p>
        </div>

      </div>
    </nav>
  );
}
