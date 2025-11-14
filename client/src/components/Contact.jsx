import React from "react";

export default function Contact() {
  return (
    <div className="w-full max-w-4xl mx-auto mt-16 mb-20 px-4 text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Contact</h2>
      <p className="text-gray-700 mb-6">
        Have questions, suggestions, or feedback? We'd love to hear from you.
      </p>

      <div className="bg-white rounded-2xl shadow-md p-6">
        <form
          className="flex flex-col space-y-4"
          onSubmit={() => alert('Submitted! (UI only demonstration)')}
        >
          <input
            type="text"
            placeholder="Your Name"
            className="border p-3 rounded-lg"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className="border p-3 rounded-lg"
            required
          />
          <textarea
            placeholder="Your Message"
            className="border p-3 rounded-lg h-28"
            required
          />

          <button
            type="submit"
            className="bg-blue-600 text-white rounded-lg px-6 py-3 hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
