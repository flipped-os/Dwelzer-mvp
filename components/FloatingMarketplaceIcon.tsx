"use client";

import { useStore } from "@/stores/useStore";
import MarketplacePopup from "./MarketplacePopup";

export default function FloatingMarketplaceIcon() {
  const setMarketplacePopup = useStore((state) => state.setMarketplacePopup);

  return (
    <>
      <button
        className="fixed bottom-20 right-6 bg-gold text-white p-4 rounded-full shadow-lg hover:shadow-2xl transition"
        onClick={() => setMarketplacePopup(true)}
      >
        🛒
      </button>
      <MarketplacePopup />
    </>
  );
}
