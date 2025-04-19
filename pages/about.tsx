"use client";

import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";
import ThemeToggleButton from "@/templates/LandingPage/components/ThemeToggleButton";

export default function About() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white min-h-screen">
      <header className="bg-blue-600 text-white p-4 shadow-md sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">My Portofolio</h1>
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
              Portofolio
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

      <div className="container mx-auto py-16 px-6">
        <h1 className="text-4xl font-bold mb-6 text-center text-blue-600 dark:text-blue-400">
          About Me
        </h1>
        <div className="max-w-3xl mx-auto p-6 shadow-lg rounded-lg bg-white dark:bg-gray-800">
          <h2 className="text-2xl font-semibold mb-4">Panji Arif Maulana</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            Saya <strong>Panji Arif Maulana</strong>, seorang mahasiswa di{" "}
            <strong>Masoem University</strong>
            dengan program studi <strong>Sistem Informasi</strong>. Saat ini
            saya berada di <strong>semester 4</strong>
            dan sedang mendalami <strong>pemrograman mobile</strong> dalam mata
            kuliah <strong>Pemrograman Mobile 1</strong>.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-2">Pendidikan</h3>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
            <li>Masoem University - Sistem Informasi (Semester 4)</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-2">Keterampilan</h3>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
            <li>Mobile Development (React Native)</li>
            <li>
              Web Development (HTML, CSS, React.js, Next.js, Tailwind CSS)
            </li>
            <li>Backend (Node.js, Express.js)</li>
            <li>Database (Oracle, MySQL)</li>
            <li>UI/UX Design (Figma)</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-2">Minat & Tujuan</h3>
          <p className="text-gray-700 dark:text-gray-300">
            Saya tertarik dalam pengembangan aplikasi mobile, baik Android
            maupun iOS, dengan teknologi terbaru. Tujuan saya adalah menjadi
            seorang <strong>Mobile Developer</strong> yang handal dan terus
            belajar untuk mengembangkan aplikasi berkualitas tinggi.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-2">Kontak</h3>
          <p className="text-gray-700 dark:text-gray-300">
            Jika ingin terhubung, silakan hubungi saya melalui:
          </p>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
            <li>
              Email:{" "}
              <a
                href="mailto:panji@example.com"
                className="text-blue-500 hover:underline"
              >
                panji@example.com
              </a>
            </li>
            <li>
              LinkedIn:{" "}
              <a
                href="https://linkedin.com/in/panji"
                className="text-blue-500 hover:underline"
              >
                linkedin.com/in/panji
              </a>
            </li>
            <li>
              GitHub:{" "}
              <a
                href="https://github.com/panji"
                className="text-blue-500 hover:underline"
              >
                github.com/panji
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Toggle theme di kiri bawah */}
      <div className="fixed bottom-4 left-4 z-50">
        <ThemeToggleButton />
      </div>
    </div>
  );
}
