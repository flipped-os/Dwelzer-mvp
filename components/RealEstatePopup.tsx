"use client";

import { useStore } from "@/stores/useStore";
import { useState } from "react";

export default function RealEstatePopup() {
  const listingsPopup = useStore((state) => state.listingsPopup);
  const setListingsPopup = useStore((state) => state.setListingsPopup);
  const kycVerified = useStore((state) => state.kycVerified);

  const [message, setMessage] = useState("");

  if (!listingsPopup) return null;

  const handleOption = (option: "buy" | "rent" | "list") => {
    if (option === "list" && !kycVerified) {
      setMessage("You must complete KYC verification before listing!");
      return;
    }

    setMessage("");
    setListingsPopup(false);

    // Redirect logic (replace with actual routes)
    if (option === "buy") window.location.href = "/real-estate/buy";
    if (option === "rent") window.location.href = "/real-estate/rent";
    if (option === "list") window.location.href = "/real-estate/list";
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-80 text-center animate-fade-in">
        <h2 className="text-lg font-bold mb-4">Real Estate Options</h2>
        <button
          className="w-full py-2 mb-2 bg-blue-900 text-white rounded hover:shadow-lg transition"
          onClick={() => handleOption("buy")}
        >
          Buy
        </button>
        <button
          className="w-full py-2 mb-2 bg-blue-900 text-white rounded hover:shadow-lg transition"
          onClick={() => handleOption("rent")}
        >
          Rent
        </button>
        <button
          className="w-full py-2 mb-2 bg-blue-900 text-white rounded hover:shadow-lg transition"
          onClick={() => handleOption("list")}
        >
          List Property
        </button>
        {message && <p className="mt-2 text-red-600">{message}</p>}
        <button
          className="mt-4 text-gray-500 hover:text-gray-700"
          onClick={() => setListingsPopup(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
}
