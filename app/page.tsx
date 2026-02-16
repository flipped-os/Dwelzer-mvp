// app/page.tsx
"use client";
import { useState } from "react";
import RealEstatePopup from "@/components/RealEstatePopup";
import MarketplacePopup from "@/components/MarketplacePopup";
import LegalPopup from "@/components/LegalPopup";
import FloatingListIcon from "@/components/FloatingListIcon";

export default function LandingPage() {
  const [popup, setPopup] = useState<string | null>(null);

  return (
    <div className="min-h-screen p-8 animate-fadeIn">
      <h1 className="text-5xl font-bold text-blue-900 mb-8">Dwelzer</h1>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <button className="btn btn-primary">Hotels</button>
        <button className="btn btn-primary">Shortlets</button>
        <button className="btn btn-primary" onClick={() => setPopup("REAL_ESTATE")}>
          Real Estate
        </button>
        <button className="btn btn-primary" onClick={() => setPopup("MARKETPLACE")}>
          Marketplace
        </button>
        <button className="btn btn-primary" onClick={() => setPopup("LEGAL")}>
          Legal Search
        </button>
      </div>

      {popup === "REAL_ESTATE" && <RealEstatePopup onSelect={(t) => alert("Redirect: " + t)} />}
      {popup === "MARKETPLACE" && <MarketplacePopup onSelect={(t) => alert("Redirect: " + t)} />}
      {popup === "LEGAL" && <LegalPopup onSelect={(t) => alert("Redirect: " + t)} />}

      <FloatingListIcon />
    </div>
  );
}
