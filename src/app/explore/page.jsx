"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ExplorePage() {
  const [search, setSearch] = useState("");

  // Data dummy 9 event (3x3 di desktop)
  const events = [
    {
      id: 1,
      title: "Green Energy Project",
      desc: "Empowering sustainable future through clean energy.",
      image: "/images/donation.jpg",
    },
    {
      id: 2,
      title: "Tech for Education",
      desc: "Bringing blockchain into learning environments.",
      image: "/images/donation.jpg",
    },
    {
      id: 3,
      title: "Water for All",
      desc: "Crowdfunding water access for rural communities.",
      image: "/images/donation.jpg",
    },
    {
      id: 4,
      title: "Art on Chain",
      desc: "Support digital artists through NFT crowdfunding.",
      image: "/images/donation.jpg",
    },
    {
      id: 5,
      title: "Food for Future",
      desc: "Sustainable agriculture for the next generation.",
      image: "/images/donation.jpg",
    },
    {
      id: 6,
      title: "Women in Tech",
      desc: "Empowering women through digital innovation.",
      image: "/images/donation.jpg",
    },
    {
      id: 7,
      title: "Blockchain for Health",
      desc: "Decentralized medical data and donation transparency.",
      image: "/images/donation.jpg",
    },
    {
      id: 8,
      title: "Crypto for Charity",
      desc: "Connecting donors and causes through blockchain.",
      image: "/images/donation.jpg",
    },
    {
      id: 9,
      title: "Smart City Vision",
      desc: "Funding projects that build intelligent urban spaces.",
      image: "/images/donation.jpg",
    },
  ];

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="min-h-screen bg-black text-white px-6 md:px-20 py-16">
      {/* Search bar */}
      <div className="flex justify-center mb-10">
        <div className="relative w-full md:w-1/2">
          <span className="absolute left-3 top-2.5 text-gray-400 text-lg">
            🔍
          </span>
          <input
            type="text"
            placeholder="Cari event..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-800 text-gray-200 rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
          />
        </div>
      </div>

      {/* Title */}
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-bold mb-3">Explore Events</h1>
        <p className="text-2xl text-gray-300 mb-2">Discover projects that inspire change</p>
        <p className="text-sm text-gray-500">
          Find, support, and fund meaningful ideas that shape a better future ✨
        </p>
      </div>

      {/* Event grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="bg-gray-900 rounded-xl overflow-hidden hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(0,0,255,0.4)] transition-transform duration-300 cursor-pointer"
          >
            <Image
              src={event.image}
              alt={event.title}
              width={500}
              height={300}
              className="object-cover w-full h-52"
            />
            <div className="p-5">
              <h2 className="text-xl font-semibold">{event.title}</h2>
              <p className="text-gray-400 text-sm mt-2">{event.desc}</p>
              <Link href={`/explore/${event.id}`}>
                <button className="mt-4 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-sm rounded-md transition-all">
                  Lihat Detail
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {filteredEvents.length === 0 && (
        <p className="text-center text-gray-500 mt-20">
          Tidak ada event ditemukan 😢
        </p>
      )}
    </section>
  );
}
