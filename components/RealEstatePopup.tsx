// components/RealEstatePopup.tsx
"use client";

export default function RealEstatePopup({ onSelect }: { onSelect: (type: string) => void }) {
  return (
    <div className="grid grid-cols-1 gap-4 p-4 bg-white rounded shadow-lg">
      <button
        className="btn btn-primary"
        onClick={() => onSelect("BUY")}
      >
        Buy
      </button>
      <button
        className="btn btn-primary"
        onClick={() => onSelect("RENT")}
      >
        Rent
      </button>
      <button
        className="btn btn-primary"
        onClick={() => onSelect("LIST")}
      >
        List My Property
      </button>
    </div>
  );
}
