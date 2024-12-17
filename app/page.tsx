"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Navbar */}
      <header className="flex justify-between p-6">
        <h1 className="text-2xl font-bold">LensSocialScore</h1>
        <nav>
          <Link href="/dashboard">
            <button className="px-4 py-2 bg-green-500 rounded hover:bg-green-600 transition">
              Go to App
            </button>
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center mt-20">
        <motion.h2
          className="text-5xl font-bold"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Track Your Influence on Lens Network
        </motion.h2>
        <p className="mt-4 text-gray-300 max-w-xl">
          Discover your reputation score based on your engagement, activities,
          and contributions.
        </p>
        <Link href="/dashboard">
          <button className="mt-8 px-6 py-3 bg-green-500 rounded text-lg hover:bg-green-600">
            Connect Wallet & Check Your Score
          </button>
        </Link>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20 px-10">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="p-4 bg-gray-800 rounded text-center shadow-lg hover:scale-105 transition"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
            <p className="text-gray-400">{feature.description}</p>
          </motion.div>
        ))}
      </section>
    </div>
  );
};

const features = [
  {
    icon: "🎖️",
    title: "Reputation Score",
    description: "An accurate, real-time score to reflect your impact.",
  },
  {
    icon: "📊",
    title: "Detailed Insights",
    description: "Breakdown of your interactions and activities.",
  },
  {
    icon: "🔗",
    title: "Lens Integration",
    description: "Directly syncs with your Lens profile.",
  },
  {
    icon: "🚀",
    title: "Progress Tracking",
    description: "Monitor and boost your engagement over time.",
  },
];

export default Home;
