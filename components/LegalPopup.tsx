// components/LegalPopup.tsx
"use client";

export default function LegalPopup({ onSelect }: { onSelect: (type: string) => void }) {
  return (
    <div className="grid grid-cols-2 gap-4 p-4 bg-white rounded shadow-lg">
      <button
        className="btn btn-secondary"
        onClick={() => onSelect("LAWYERS")}
      >
        Lawyers
      </button>
      <button
        className="btn btn-secondary"
        onClick={() => onSelect("PROPERTY_INFO")}
      >
        Property Legal Info
      </button>
    </div>
  );
}
