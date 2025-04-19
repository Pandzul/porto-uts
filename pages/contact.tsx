"use client";

import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";
import ThemeToggleButton from "@/templates/LandingPage/components/ThemeToggleButton";
// import Commentsection from "@/templates/LandingPage/components/CommentSection";

export default function Contact() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300 min-h-screen">
      {/* Theme Toggle Button */}
      <div className="fixed bottom-4 left-4 z-50">
        <ThemeToggleButton />
      </div>

      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow-md sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">My Portfolio</h1>
          <nav className="hidden md:flex space-x-6">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/skills">Skills</Link>
            <Link href="/services">Services</Link>
            <Link href="/portofolio">Portofolio</Link>
            <Link href="/contact">Contact</Link>
          </nav>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="focus:outline-none">
              {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-blue-700 p-4 absolute top-full left-0 w-full shadow-md">
            <Link
              href="/"
              className="block py-2 text-white"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="block py-2 text-white"
              onClick={toggleMenu}
            >
              About
            </Link>
            <Link
              href="/skills"
              className="block py-2 text-white"
              onClick={toggleMenu}
            >
              Skills
            </Link>
            <Link
              href="/services"
              className="block py-2 text-white"
              onClick={toggleMenu}
            >
              Services
            </Link>
            <Link
              href="/portofolio"
              className="block py-2 text-white"
              onClick={toggleMenu}
            >
              Portofolio
            </Link>
            <Link
              href="/contact"
              className="block py-2 text-white"
              onClick={toggleMenu}
            >
              Contact
            </Link>
          </div>
        )}
      </header>

      {/* Contact Section */}
      <div className="container mx-auto py-16 px-6">
        <h1 className="text-4xl font-bold mb-6 text-center text-blue-600 dark:text-blue-400">
          Contact Me
        </h1>
        <div className="max-w-3xl mx-auto p-6 shadow-lg rounded-lg bg-gray-100 dark:bg-gray-800 transition-colors">
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            Jika ingin menghubungi saya, silakan gunakan informasi di bawah ini:
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-2">Email</h3>
          <p>
            <a
              href="mailto:panji@example.com"
              className="text-blue-500 hover:underline"
            >
              panji@example.com
            </a>
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-2">LinkedIn</h3>
          <p>
            <a
              href="https://linkedin.com/in/panji"
              className="text-blue-500 hover:underline"
            >
              linkedin.com/in/panji
            </a>
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-2">GitHub</h3>
          <p>
            <a
              href="https://github.com/panji"
              className="text-blue-500 hover:underline"
            >
              github.com/panji
            </a>
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-2">Formulir Kontak</h3>
          <form className="mt-4">
            <input
              type="text"
              placeholder="Nama"
              className="w-full p-3 border rounded-lg mb-3 bg-white dark:bg-gray-700 dark:text-white"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border rounded-lg mb-3 bg-white dark:bg-gray-700 dark:text-white"
            />
            <textarea
              placeholder="Pesan"
              className="w-full p-3 border rounded-lg mb-3 bg-white dark:bg-gray-700 dark:text-white"
            ></textarea>
            <button className="bg-blue-600 text-white px-6 py-3 font-bold rounded-lg shadow-md hover:bg-blue-700">
              Kirim Pesan
            </button>
          </form>
        </div>

        {/* Comment & Rating Section
        <div className="max-w-3xl mx-auto mt-12">
          <Commentsection />
        </div> */}
      </div>
    </div>
  );
}
