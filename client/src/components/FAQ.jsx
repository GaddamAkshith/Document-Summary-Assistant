import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
  const [open, setOpen] = useState(null);

  const faqs = [
    {
      q: "What types of files can I upload?",
      a: "You can upload PDF documents or images such as JPG, JPEG, and PNG."
    },
    {
      q: "How is the text extracted?",
      a: "We use OCR and PDF processing to read and extract textual content."
    },
    {
      q: "Can I customize summary length?",
      a: "Yes! You can choose short, medium, or long summary options."
    },
    {
      q: "Is my uploaded data safe?",
      a: "Yes, all files are processed temporarily and deleted automatically."
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto mt-16 mb-20 px-4">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Frequently Asked Questions
      </h2>
      {faqs.map((item, index) => (
        <div key={index} className="mb-4 bg-white rounded-xl shadow p-5">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => setOpen(open === index ? null : index)}
          >
            <h3 className="text-lg font-semibold">{item.q}</h3>
            <ChevronDown
              className={`transition ${
                open === index ? "rotate-180" : ""
              }`}
            />
          </div>
          {open === index && <p className="mt-3 text-gray-600">{item.a}</p>}
        </div>
      ))}
    </div>
  );
}
