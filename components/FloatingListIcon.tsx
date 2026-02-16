// components/FloatingListIcon.tsx
"use client";
import { useState } from "react";
import Modal from "./Modal";
import RealEstatePopup from "./RealEstatePopup";

export default function FloatingListIcon() {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="fixed bottom-5 right-5 rounded-full bg-blue-900 text-gold p-4 shadow-lg hover:shadow-xl transition-all duration-300"
      >
        List
      </button>
      <Modal open={open} setOpen={setOpen}>
        <RealEstatePopup onSelect={(t) => alert("Redirecting to " + t)} />
      </Modal>
    </>
  );
}
