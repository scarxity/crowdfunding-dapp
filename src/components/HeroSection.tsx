"use client";

import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative flex flex-col md:flex-row items-center justify-between min-h-screen bg-black text-white px-8 md:px-20 py-10 overflow-hidden">
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full flex items-center justify-between px-8 md:px-20 py-6 bg-transparent z-20">

        <button className="px-4 py-2 bg-gradient-to-r from-sky-500 to-blue-700 hover:from-sky-400 hover:to-blue-600 rounded-md text-white font-medium transition">
          Connect Wallet
        </button>
      </nav>

      {/* Left Content */}
      <div className="max-w-xl space-y-6 mt-24 md:mt-0 z-10">
        <div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Crowdfunding
          </h1>
          <p className="text-lg text-gray-300 mt-2">Empower your ideas with Web3</p>
          <p className="text-sm text-gray-400 mt-4 leading-relaxed">
            A decentralized platform that connects creators and supporters through blockchain transparency.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex space-x-4 pt-2">
          <Link href="/create">
            <button className="px-6 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-md font-medium transition-all shadow-md shadow-sky-500/40">
              Create Event
            </button>
          </Link>
          <Link href="/explore">
            <button className="px-6 py-2 bg-gradient-to-r from-blue-700 to-indigo-600 hover:from-blue-600 hover:to-indigo-500 text-white rounded-md font-medium transition-all shadow-md shadow-indigo-500/40">
              Explore Event
            </button>
          </Link>
        </div>
      </div>

      {/* Right 3D Object */}
      <div className="mt-12 md:mt-0 md:w-1/2 flex justify-center relative">
        {/* Glow Background */}
        <div className="absolute w-72 h-72 bg-blue-600/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <Image
          src="/images/Shape.png"
          alt="3D Object"
          width={800}
          height={800}
          className="relative drop-shadow-[0_0_25px_rgba(0,0,255,0.6)] animate-float"
        />
      </div>

      {/* Gradient bottom edge */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-blue-900/70 to-transparent"></div>
    </section>
  );
}
