"use client";

import { useStore } from "@/stores/useStore";

export default function MarketplacePopup() {
  const marketplacePopup = useStore((state) => state.marketplacePopup);
  const setMarketplacePopup = useStore((state) => state.setMarketplacePopup);

  if (!marketplacePopup) return null;

  const handleOption = (option: "purchase" | "auction") => {
    setMarketplacePopup(false);

    // Redirect logic (replace with actual routes)
    if (option === "purchase") window.location.href = "/marketplace/purchase";
    if (option === "auction") window.location.href = "/marketplace/auction";
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-80 text-center animate-fade-in">
        <h2 className="text-lg font-bold mb-4">Marketplace Options</h2>
        <button
          className="w-full py-2 mb-2 bg-blue-900 text-white rounded hover:shadow-lg transition"
          onClick={() => handleOption("purchase")}
        >
          Purchase
        </button>
        <button
          className="w-full py-2 mb-2 bg-blue-900 text-white rounded hover:shadow-lg transition"
          onClick={() => handleOption("auction")}
        >
          Auction
        </button>
        <button
          className="mt-4 text-gray-500 hover:text-gray-700"
          onClick={() => setMarketplacePopup(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
}
