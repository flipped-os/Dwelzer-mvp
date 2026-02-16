"use client";

import { useStore } from "@/stores/useStore";

export default function LegalPopup() {
  const legalPopup = useStore((state) => state.legalPopup);
  const setLegalPopup = useStore((state) => state.setLegalPopup);

  if (!legalPopup) return null;

  const handleOption = (option: "lawyers" | "property") => {
    setLegalPopup(false);

    // Redirect logic (replace with actual routes)
    if (option === "lawyers") window.location.href = "/legal/lawyers";
    if (option === "property") window.location.href = "/legal/property";
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-80 text-center animate-fade-in">
        <h2 className="text-lg font-bold mb-4">Legal Search Options</h2>
        <button
          className="w-full py-2 mb-2 bg-blue-900 text-white rounded hover:shadow-lg transition"
          onClick={() => handleOption("lawyers")}
        >
          Lawyers
        </button>
        <button
          className="w-full py-2 mb-2 bg-blue-900 text-white rounded hover:shadow-lg transition"
          onClick={() => handleOption("property")}
        >
          Property Legal Info
        </button>
        <button
          className="mt-4 text-gray-500 hover:text-gray-700"
          onClick={() => setLegalPopup(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
}
