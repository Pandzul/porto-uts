"use client";

import React, { useState, KeyboardEvent } from "react";
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

  const handleKeyDown = (e: KeyboardEvent, item: PortfolioItem) => {
    if (e.key === "Enter" || e.key === " ") {
      setSelectedPortfolio(item);
    }
  };

  return (
    <div className="bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300 min-h-screen">
      {/* Theme Toggle Button */}
      <ThemeToggleButton />

      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow-md sticky top-0 z-40">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="hover:text-gray-300 font-bold text-xl">
            My Portfolio
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="hover:text-gray-300">
              Home
            </Link>
            <Link href="/about" className="hover:text-gray-300">
              About
            </Link>
            <Link href="/skills" className="hover:text-gray-300">
              Skills
            </Link>
            <Link href="/services" className="hover:text-gray-300">
              Services
            </Link>
            <Link href="/portofolio" className="hover:text-gray-300">
              Portfolio
            </Link>
            <Link href="/contact" className="hover:text-gray-300">
              Contact
            </Link>
          </nav>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="focus:outline-none">
              {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-blue-700 p-4 absolute top-full left-0 w-full shadow-md flex flex-col space-y-2">
            <Link href="/" className="hover:text-gray-300">
              Home
            </Link>
            <Link href="/about" className="text-white py-2">
              About
            </Link>
            <Link href="/skills" className="text-white py-2">
              Skills
            </Link>
            <Link href="/services" className="text-white py-2">
              Services
            </Link>
            <Link href="/portofolio" className="text-white py-2">
              Portfolio
            </Link>
            <Link href="/contact" className="text-white py-2">
              Contact
            </Link>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="bg-blue-500 text-white py-16 text-center relative dark:bg-blue-700">
        <div className="container mx-auto px-6 flex flex-col items-center">
          <Image
            src="/pp.jpg"
            alt="Profile"
            width={150}
            height={150}
            className="rounded-full border-4 border-white shadow-lg mb-6 transition-transform duration-300 hover:scale-110"
          />
          <h2 className="text-5xl font-bold mb-4">
            Hi, I'm Panji Arif Maulana
          </h2>
          <p className="text-xl mb-6">
            A passionate Mobile Developer | Open to Work
          </p>
          <p className="text-lg max-w-2xl mx-auto">
            I specialize in creating high-performance mobile applications using
            the latest technologies.
          </p>
          <a
            href="#contact"
            className="mt-6 inline-block bg-white text-blue-600 px-6 py-3 font-bold rounded-lg shadow-md hover:bg-gray-200"
          >
            Hire Me
          </a>
        </div>
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
                className="mb-10 cursor-pointer group"
                onClick={() => setSelectedPortfolio(item)}
                onKeyDown={(e) => handleKeyDown(e, item)}
                role="button"
                tabIndex={0}
                component="div"
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
                aria-label="Close modal"
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
