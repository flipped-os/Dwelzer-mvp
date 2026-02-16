"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import ListingForm from "@/components/ListingForm";

interface Listing {
  id: string;
  title: string;
  description: string;
  images: string[];
  price: number;
  category: string;
  createdBy: { name: string; email: string };
}

export default function DashboardPage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchListings = async () => {
    try {
      const res = await axios.get("/api/listings");
      setListings(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this listing?")) return;
    try {
      await axios.delete("/api/listings", { data: { id } });
      setListings((prev) => prev.filter((l) => l.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (id: string) => {
    setEditingId(id);
    const listing = listings.find((l) => l.id === id);
    if (listing) {
      // Prefill ListingForm (optional)
      alert("Prefill functionality can be implemented here if needed.");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Listings & Create New</h1>

      {/* Listing Form */}
      <ListingForm />

      {/* User Listings */}
      <h2 className="text-xl font-semibold mt-8 mb-4">All Listings</h2>
      {loading ? (
        <p>Loading...</p>
      ) : listings.length === 0 ? (
        <p>No listings yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {listings.map((l) => (
            <div key={l.id} className="bg-white p-4 rounded shadow hover:scale-105 transition relative">
              <h3 className="font-bold text-lg">{l.title}</h3>
              <p>{l.description}</p>
              <p className="mt-1 font-semibold">${l.price}</p>
              <p className="text-sm text-gray-500">{l.category}</p>
              <div className="flex gap-2 mt-2">
                {l.images.map((img, i) => (
                  <img key={i} src={img} alt="listing" className="w-16 h-16 object-cover rounded" />
                ))}
              </div>

              {/* Edit/Delete Buttons */}
              <div className="flex gap-2 mt-4">
                <button
                  className="btn btn-sm btn-outline text-blue-900 hover:shadow-md"
                  onClick={() => handleEdit(l.id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-outline text-red-600 hover:shadow-md"
                  onClick={() => handleDelete(l.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
