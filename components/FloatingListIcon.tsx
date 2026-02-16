"use client";

import { useStore } from "@/stores/useStore";
import RealEstatePopup from "./RealEstatePopup";

export default function FloatingListIcon() {
  const setListingsPopup = useStore((state) => state.setListingsPopup);

  return (
    <>
      <button
        className="fixed bottom-6 right-6 bg-gold text-white p-4 rounded-full shadow-lg hover:shadow-2xl transition"
        onClick={() => setListingsPopup(true)}
      >
        🏠
      </button>
      <RealEstatePopup />
    </>
  );
}
