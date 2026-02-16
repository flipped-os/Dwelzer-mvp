// app/marketplace/page.tsx
"use client";
import MarketplacePopup from "@/components/MarketplacePopup";
import { useState } from "react";

export default function MarketplacePage() {
  const [popup, setPopup] = useState(true);

  return (
    <div className="min-h-screen p-8">
      {popup && <MarketplacePopup onSelect={(type) => alert("Redirecting to " + type)} />}
    </div>
  );
}
