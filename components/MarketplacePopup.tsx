// components/MarketplacePopup.tsx
"use client";

export default function MarketplacePopup({ onSelect }: { onSelect: (type: string) => void }) {
  return (
    <div className="grid grid-cols-1 gap-4 p-4 bg-white rounded shadow-lg">
      <button
        className="btn btn-primary"
        onClick={() => onSelect("PURCHASE")}
      >
        Purchase
      </button>
      <button
        className="btn btn-primary"
        onClick={() => onSelect("AUCTION")}
      >
        Auction
      </button>
    </div>
  );
}
