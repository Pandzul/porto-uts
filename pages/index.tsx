"use client";

import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggleButton from "@/templates/LandingPage/components/ThemeToggleButton";
import Commentsection from "@/templates/LandingPage/components/CommentSection";
import ChatBot from "@/templates/LandingPage/components/ChatBot";

interface PortfolioItem {
  id: number;
  title: string;
  year: string;
  description: string;
  detail: string;
}

const portfolioData: PortfolioItem[] = [
  {
    id: 1,
    title: "Mobile App for Inventory",
    year: "2023",
    description: "A React Native app to manage warehouse inventory in real-time.",
    detail: "This app helps warehouses to track items in real time using barcode scanning and cloud sync. Built with React Native + Firebase."
  },
  {
    id: 2,
    title: "E-Commerce Website",
    year: "2022",
    description: "Built with Next.js and Tailwind CSS, integrated with Stripe payment.",
    detail: "https://pandzul.github.io/bikestop1/"
  },
  {
    id: 3,
    title: "Personal Portfolio",
    year: "2021",
    description: "A showcase website for my projects and resume with blog features.",
    detail: "A Next.js website displaying my portfolio, blog posts, and downloadable CV with responsive design."
  }
];

const HomePage: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedPortfolio, setSelectedPortfolio] = useState<PortfolioItem | null>(null);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300 min-h-screen">
      {/* Theme Toggle Button */}
      <ThemeToggleButton />

      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow-md sticky top-0 z-40">
        {/* ... (kode header tetap sama) */}
      </header>

      {/* Hero Section */}
      <section className="bg-blue-500 text-white py-16 text-center relative dark:bg-blue-700">
        {/* ... (kode hero section tetap sama) */}
      </section>

      {/* Timeline Section */}
      <section className="bg-gray-100 dark:bg-gray-800 py-16 transition-colors">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">
            My Portfolio Timeline
          </h2>
          <div className="relative border-l-4 border-blue-600 pl-6">
            {portfolioData.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                onClick={() => setSelectedPortfolio(item)}
                className="mb-10 cursor-pointer group"
                as="div"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setSelectedPortfolio(item);
                  }
                }}
              >
                <div className="absolute w-4 h-4 bg-blue-600 rounded-full -left-2.5 top-2 group-hover:scale-125 transition-transform duration-300" />
                <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 group-hover:underline">
                  {item.title}
                </h3>
                <span className="text-sm text-gray-500 dark:text-gray-300">
                  {item.year}
                </span>
                <p className="text-gray-700 dark:text-gray-200">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedPortfolio && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPortfolio(null)}
          >
            <motion.div
              className="bg-white dark:bg-gray-900 rounded-lg p-6 max-w-md mx-auto shadow-lg relative text-black dark:text-white"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold mb-2">
                {selectedPortfolio.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-300 mb-4">
                {selectedPortfolio.year}
              </p>
              <p className="text-gray-700 dark:text-gray-200">
                {selectedPortfolio.detail}
              </p>
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
                onClick={() => setSelectedPortfolio(null)}
              >
                &times;
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Comment Section */}
      <div className="max-w-3xl mx-auto mt-12">
        <Commentsection />
      </div>

      {/* Chatbot AI */}
      <ChatBot />
    </div>
  );
};

export default HomePage;
