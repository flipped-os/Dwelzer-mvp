"use client";

import { useStore } from "@/stores/useStore";
import LegalPopup from "./LegalPopup";

export default function FloatingLegalIcon() {
  const setLegalPopup = useStore((state) => state.setLegalPopup);

  return (
    <>
      <button
        className="fixed bottom-34 right-6 bg-gold text-white p-4 rounded-full shadow-lg hover:shadow-2xl transition"
        onClick={() => setLegalPopup(true)}
      >
        ⚖️
      </button>
      <LegalPopup />
    </>
  );
}
