// app/legal/page.tsx
"use client";
import LegalPopup from "@/components/LegalPopup";
import { useState } from "react";

export default function LegalPage() {
  const [popup, setPopup] = useState(true);

  return (
    <div className="min-h-screen p-8">
      {popup && <LegalPopup onSelect={(type) => alert("Redirecting to " + type)} />}
    </div>
  );
}
