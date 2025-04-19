import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { FiMoon, FiSun } from "react-icons/fi";

const ThemeToggleButton: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-4 left-4 z-50 bg-white dark:bg-gray-800 text-black dark:text-white p-3 rounded-full shadow-lg transition-colors duration-300"
      aria-label="Toggle Theme"
    >
      {theme === "light" ? <FiMoon /> : <FiSun />}
    </button>
  );
};

export default ThemeToggleButton;
