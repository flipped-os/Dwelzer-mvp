"use client";

import { useState } from "react";
import axios from "axios";
import { useStore } from "@/stores/useStore";

export default function ListingForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [category, setCategory] = useState<"HOTELS" | "SHORTLETS" | "REAL_ESTATE" | "MARKETPLACE" | "LEGAL">("REAL_ESTATE");
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const user = useStore((state) => state.user);
  const kycVerified = useStore((state) => state.kycVerified);

  if (!user) return <p>Please log in to create listings.</p>;

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setUploading(true);

    const uploadedUrls: string[] = [];
    for (let i = 0; i < e.target.files.length; i++) {
      const file = e.target.files[i];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ml_default"); // can be anything in Cloudinary settings

      try {
        const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`, {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        uploadedUrls.push(data.secure_url);
      } catch (err) {
        console.error(err);
      }
    }

    setImages(uploadedUrls);
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!kycVerified) {
      alert("You must complete KYC verification before listing!");
      return;
    }

    try {
      await axios.post("/api/listings", {
        title,
        description,
        price,
        category,
        images,
      });

      alert("Listing created!");
      setTitle("");
      setDescription("");
      setPrice(0);
      setCategory("REAL_ESTATE");
      setImages([]);
    } catch (err) {
      console.error(err);
      alert("Failed to create listing");
    }
  };

  return (
    <form className="bg-white p-6 rounded shadow-md mb-6" onSubmit={handleSubmit}>
      <h2 className="text-lg font-bold mb-4">Create a Listing</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="input input-bordered w-full mb-3"
        required
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="textarea textarea-bordered w-full mb-3"
        required
      />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(parseFloat(e.target.value))}
        className="input input-bordered w-full mb-3"
        required
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value as any)}
        className="select select-bordered w-full mb-3"
      >
        <option value="HOTELS">Hotels</option>
        <option value="SHORTLETS">Shortlets</option>
        <option value="REAL_ESTATE">Real Estate</option>
        <option value="MARKETPLACE">Marketplace</option>
        <option value="LEGAL">Legal</option>
      </select>

      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageUpload}
        className="mb-3"
      />
      {uploading && <p>Uploading images...</p>}

      <div className="flex gap-2 flex-wrap mb-3">
        {images.map((img, i) => (
          <img key={i} src={img} alt="listing" className="w-20 h-20 object-cover rounded" />
        ))}
      </div>

      <button type="submit" className="btn btn-primary w-full">
        Create Listing
      </button>
    </form>
  );
}
