"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function EventDetail({ params }) {
  const router = useRouter();
  const { id } = params;

  const [event, setEvent] = useState(null);
  const [token, setToken] = useState("ETH");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  // Dummy data event
  const events = [
    {
      id: 1,
      title: "Green Energy Project",
      creator: "EcoWorld Foundation",
      desc: "A project focused on developing sustainable energy solutions for rural areas.",
      image: "/images/donation.jpg",
      progress: 65,
    },
    {
      id: 2,
      title: "Tech for Education",
      creator: "Digital Learn Initiative",
      desc: "Providing digital devices and blockchain transparency for education.",
      image: "/images/donation.jpg",
      progress: 40,
    },
    {
      id: 3,
      title: "Water for All",
      creator: "BlueLife Org",
      desc: "Building clean water infrastructure using transparent crowdfunding.",
      image: "/images/donation.jpg",
      progress: 90,
    },
  ];

  useEffect(() => {
    const found = events.find((e) => e.id === parseInt(id));
    setEvent(found);
  }, [id]);

  const handleContribute = () => {
    if (!amount || amount <= 0) {
      setMessage("⚠️ Please enter a valid amount to contribute.");
      return;
    }
    setMessage(`✅ Successfully contributed ${amount} ${token} to ${event.title}!`);
    setAmount("");
  };

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        Loading event details...
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-black text-white px-6 md:px-20 py-10">
      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="text-gray-400 hover:text-white mb-6 flex items-center space-x-2"
      >
        <span className="text-xl">←</span>
        <span>Back</span>
      </button>

      {/* Layout utama */}
      <div className="flex flex-col lg:flex-row items-start gap-10">
        {/* Gambar kiri */}
        <div className="w-full lg:w-1/2">
          <Image
            src={event.image}
            alt={event.title}
            width={700}
            height={500}
            className="rounded-xl object-cover w-full h-[400px]"
          />
        </div>

        {/* Konten kanan */}
        <div className="flex-1 space-y-6">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold mb-2">{event.title}</h1>
            <p className="text-gray-400 text-lg">By {event.creator}</p>
          </div>

          {/* Progress Bar */}
          <div>
            <p className="text-gray-300 text-sm mb-2">Progress</p>
            <div className="w-full bg-gray-800 rounded-full h-5">
              <div
                className="bg-gradient-to-r from-sky-500 to-indigo-600 h-5 rounded-full transition-all"
                style={{ width: `${event.progress}%` }}
              ></div>
            </div>
            <p className="text-gray-400 text-sm mt-1">{event.progress}% funded</p>
          </div>

          {/* Deskripsi */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">Event Description</h2>
            <p className="text-gray-400 leading-relaxed">{event.desc}</p>
          </div>

          {/* Form Donasi */}
          <div className="pt-4 space-y-4">
            <h3 className="text-xl font-semibold">Contribute to this project</h3>

            {/* Pilihan Token */}
            <div>
              <label className="block text-gray-300 text-sm mb-1">Select Token</label>
              <select
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="bg-gray-800 border border-gray-700 text-gray-200 px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="SUI">SUI</option>
                <option value="IDR">IDR</option>
              </select>
            </div>

            {/* Jumlah Donasi */}
            <div>
              <label className="block text-gray-300 text-sm mb-1">Amount</label>
              <input
                type="number"
                placeholder="Enter amount..."
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-gray-800 border border-gray-700 text-gray-200 px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Tombol Contribute */}
            <div className="flex space-x-4 pt-2">
              <button
                onClick={handleContribute}
                className="px-6 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-md font-medium transition-all shadow-md shadow-sky-500/40"
              >
                Contribute
              </button>
              <button className="px-6 py-2 border border-gray-600 hover:border-blue-500 rounded-md font-medium transition-all text-gray-300 hover:text-blue-400">
                Share
              </button>
            </div>

            {/* Pesan feedback */}
            {message && (
              <p
                className={`text-sm pt-3 ${
                  message.startsWith("✅") ? "text-green-400" : "text-yellow-400"
                }`}
              >
                {message}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
