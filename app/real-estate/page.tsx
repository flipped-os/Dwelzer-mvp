// app/real-estate/page.tsx
"use client";
import RealEstatePopup from "@/components/RealEstatePopup";
import { useState } from "react";

export default function RealEstatePage() {
  const [popup, setPopup] = useState(true);

  return (
    <div className="min-h-screen p-8">
      {popup && <RealEstatePopup onSelect={(type) => alert("Redirecting to " + type)} />}
    </div>
  );
}
