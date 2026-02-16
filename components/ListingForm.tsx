"use client";

import { useState } from "react";
import { useStore } from "@/stores/useStore";
import axios from "axios";

export default function ListingForm() {
  const kycVerified = useStore((state) => state.kycVerified);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [category, setCategory] = useState<"HOTELS" | "SHORTLETS" | "REAL_ESTATE" | "MARKETPLACE" | "LEGAL">("REAL_ESTATE");
  const [images, setImages] = useState<File[]>([]);
  const [message, setMessage] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setImages(Array.from(e.target.files));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!kycVerified) {
      setMessage("You must complete KYC verification before listing!");
      return;
    }

    if (!title || !description || !price || images.length === 0) {
      setMessage("Please fill all fields and upload at least one image.");
      return;
    }

    try {
      // Mock upload: here you would integrate Cloudinary / S3
      const uploadedImages = images.map((file) => URL.createObjectURL(file));

      const payload = { title, description, price: Number(price), category, images: uploadedImages };

      const res = await axios.post("/api/listings", payload);
      if (res.status === 200) {
        setMessage("Listing created successfully!");
        setTitle("");
        setDescription("");
        setPrice("");
        setCategory("REAL_ESTATE");
        setImages([]);
      }
    } catch (err: any) {
      setMessage(err.response?.data?.error || "Error creating listing.");
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg mx-auto animate-fade-in">
      <h2 className="text-xl font-bold mb-4">Create New Listing</h2>
      {message && <p className="mb-2 text-red-600">{message}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input input-bordered w-full"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="textarea textarea-bordered w-full"
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value === "" ? "" : Number(e.target.value))}
          className="input input-bordered w-full"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as any)}
          className="select select-bordered w-full"
        >
          <option value="HOTELS">Hotels</option>
          <option value="SHORTLETS">Shortlets</option>
          <option value="REAL_ESTATE">Real Estate</option>
          <option value="MARKETPLACE">Marketplace</option>
          <option value="LEGAL">Legal</option>
        </select>

        <input type="file" multiple onChange={handleFileChange} className="file-input file-input-bordered w-full" />

        <button
          type="submit"
          className="btn btn-primary bg-blue-900 hover:shadow-lg hover:scale-105 transition mt-2"
        >
          Create Listing
        </button>
      </form>
    </div>
  );
            }
