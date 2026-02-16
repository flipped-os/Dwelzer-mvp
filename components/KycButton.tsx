// components/KycButton.tsx
"use client";
import { useState } from "react";

export default function KycButton({ onVerified }: { onVerified: () => void }) {
  const [loading, setLoading] = useState(false);

  const handleKyc = async () => {
    setLoading(true);
    try {
      // Mock Veriff API call
      await new Promise((res) => setTimeout(res, 1500));
      alert("KYC Verified!");
      onVerified();
    } catch (err) {
      alert("KYC Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleKyc}
      className="btn btn-primary mt-2"
      disabled={loading}
    >
      {loading ? "Verifying..." : "Verify KYC"}
    </button>
  );
}
