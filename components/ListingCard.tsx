// components/ListingCard.tsx
"use client";

export default function ListingCard({
  title,
  price,
  image,
  category,
}: {
  title: string;
  price: number;
  image: string;
  category: string;
}) {
  return (
    <div className="bg-white rounded shadow-md p-4 hover:translate-y-1 hover:shadow-xl transition-all duration-300">
      <img src={image} alt={title} className="w-full h-48 object-cover rounded mb-2" />
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="text-sm text-gray-600">{category}</p>
      <p className="text-blue-900 font-semibold">${price}</p>
    </div>
  );
}
