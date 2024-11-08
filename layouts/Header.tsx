"use client";
import { useTheme } from "@/contexts/ThemeContext";
import Link from "next/link";
import { FaSun, FaMoon } from "react-icons/fa";

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="flex justify-between items-center p-4">
      <Link href="/" className="text-blue font-bold text-4xl">
        TASKGOAL
      </Link>
      <div
        onClick={toggleTheme}
        className="relative border border-gray w-16 h-8 flex items-center bg-gray-200 rounded-full dark:bg-gray-700 cursor-pointer transition-colors"
      >
        <span
          className={`absolute left-1 w-6 h-6 bg-blue rounded-full shadow-md transition-transform duration-300 transform
            ${theme === "dark" ? "translate-x-8" : "translate-x-0"}`}
        />
        <span
          className={`absolute left-2 ${
            theme === "dark" ? "text-blue" : "text-white"
          }`}
        >
          <FaSun />
        </span>
        <span className={`absolute right-2 ${theme === "dark" ? "text-white" : ""}`}>
          <FaMoon />
        </span>
      </div>
    </header>
  );
}
