"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function CreateEvent() {
  const router = useRouter();

  // State untuk form
  const [form, setForm] = useState({
    name: "",
    creator: "",
    target: "",
    desc: "",
    expired: "",
    token: "ETH",
    image: null,
  });

  const [message, setMessage] = useState("");

  // Handle input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Handle upload gambar
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, image: file });
  };

  // Submit Event
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.creator || !form.target || !form.desc || !form.expired) {
      setMessage("⚠️ Please fill in all required fields.");
      return;
    }

    // Nanti bisa dikirim ke API / Blockchain
    console.log("Event Created:", form);
    setMessage(`✅ Event "${form.name}" created successfully!`);
    setForm({
      name: "",
      creator: "",
      target: "",
      desc: "",
      expired: "",
      token: "ETH",
      image: null,
    });
  };

  return (
    <section className="min-h-screen bg-black text-white px-6 md:px-20 py-10 relative overflow-hidden">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="text-gray-400 hover:text-white mb-6 flex items-center space-x-2"
      >
        <span className="text-xl">←</span>
        <span>Back</span>
      </button>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row items-start justify-between gap-10 relative">
        {/* Kiri: Upload Gambar */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center bg-gray-900/40 rounded-xl border border-gray-700 p-6 h-[450px]">
          {form.image ? (
            <Image
              src={URL.createObjectURL(form.image)}
              alt="Preview"
              width={500}
              height={300}
              className="rounded-lg object-cover w-full h-full"
            />
          ) : (
            <label className="w-full h-full flex flex-col items-center justify-center border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-blue-500 transition-all">
              <span className="text-gray-400">Upload Event Image</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          )}
        </div>

        {/* Kanan: Form Create Event */}
        <div className="w-full lg:w-1/2 space-y-5">
          <h1 className="text-5xl font-bold mb-4">Create Event</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nama Event */}
            <div>
              <label className="block text-gray-300 mb-1">Name Event :</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter event name..."
              />
            </div>

            {/* Creator Info */}
            <div>
              <label className="block text-gray-300 mb-1">Creator Info :</label>
              <input
                type="text"
                name="creator"
                value={form.creator}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name or organization..."
              />
            </div>

            {/* Target Fund */}
            <div>
              <label className="block text-gray-300 mb-1">Target Fund :</label>
              <input
                type="number"
                name="target"
                value={form.target}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter target fund amount..."
              />
            </div>

            {/* Deskripsi */}
            <div>
              <label className="block text-gray-300 mb-1">Deskripsi Event :</label>
              <textarea
                name="desc"
                rows="3"
                value={form.desc}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Write a short event description..."
              ></textarea>
            </div>

            {/* Expired */}
            <div>
              <label className="block text-gray-300 mb-1">Expired Fund :</label>
              <input
                type="date"
                name="expired"
                value={form.expired}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Token Selector */}
            <div>
              <label className="block text-gray-300 mb-1">Select Token to use :</label>
              <select
                name="token"
                value={form.token}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="ETH">ETH (Ethereum)</option>
                <option value="BNB">BNB (Binance Smart Chain)</option>
                <option value="USDT">USDT (Tether)</option>
                <option value="MATIC">MATIC (Polygon)</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-md text-white font-medium transition-all shadow-md shadow-indigo-500/40"
            >
              Submit Event
            </button>

            {/* Feedback */}
            {message && (
              <p
                className={`text-sm pt-2 ${
                  message.startsWith("✅") ? "text-green-400" : "text-yellow-400"
                }`}
              >
                {message}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
