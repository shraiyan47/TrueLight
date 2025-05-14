"use client"

import Link from "next/link"
import Image from "next/image"
import { Sun, Moon, Menu, X } from "lucide-react"
import { useState } from "react"
import { useTheme } from "@/components/theme-provider"
import { ModeToggle } from "./mode-toggle"
import { Button } from "./ui/button"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    // <header className="border-b border-green-100 dark:border-green-950 bg-white dark:bg-gray-950 transition-colors">
    //   <div className="container mx-auto py-4 px-4 flex justify-between items-center">

    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* <div className="container flex h-16 items-center justify-around px-4"> */}
        <div className="container mx-auto flex h-16 items-center justify-between px-4 max-w-7xl">


        <Link href="/" className="flex items-center gap-2">
          <div className="text-white p-1 rounded">
            <Image src={"/macca.svg"} width={40} height={40} alt="Macca" />
          </div>
          <span className="font-bold text-green-800 dark:text-green-400 text-xl">True Light</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-green-800 dark:text-green-400 hover:text-green-600 dark:hover:text-green-300 font-medium"
          >
            Home
          </Link>
          <Link
            href="/quran"
            className="text-green-800 dark:text-green-400 hover:text-green-600 dark:hover:text-green-300 font-medium"
          >
            Quran
          </Link>
          <Link
            href="/hadith"
            className="text-green-800 dark:text-green-400 hover:text-green-600 dark:hover:text-green-300 font-medium"
          >
            Hadith
          </Link>
          {/* <Link
            href="/qibla"
            className="text-green-800 dark:text-green-400 hover:text-green-600 dark:hover:text-green-300 font-medium"
          >
            Qibla
          </Link> */}
          <Link
            href="/about"
            className="text-green-800 dark:text-green-400 hover:text-green-600 dark:hover:text-green-300 font-medium"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-green-800 dark:text-green-400 hover:text-green-600 dark:hover:text-green-300 font-medium"
          >
            Contact
          </Link>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-green-50 dark:hover:bg-green-900/30 transition-colors"
              aria-label="Toggle dark mode"
            >
              {theme === "dark" ? <Sun className="text-green-400" /> : <Moon className="text-green-600" />}
            </button>

            <button
              className="md:hidden p-2 text-green-800 dark:text-green-400"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu />
            </button>
          </div>

        </nav>

        <div className="flex md:hidden items-center gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-green-50 dark:hover:bg-green-900/30 transition-colors"
              aria-label="Toggle dark mode"
            >
              {theme === "dark" ? <Sun className="text-green-400" /> : <Moon className="text-green-600" />}
            </button>

            <button
              className="md:hidden p-2 text-green-800 dark:text-green-400"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu />
            </button>
          </div>
        </div>

      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-950 border-t border-green-100 dark:border-green-950">
          <nav className="container mx-auto px-4 max-w-7xl py-3 flex flex-col">
            <Link
              href="/"
              className="py-2 text-green-800 dark:text-green-400 hover:text-green-600 dark:hover:text-green-300 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/quran"
              className="py-2 text-green-800 dark:text-green-400 hover:text-green-600 dark:hover:text-green-300 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Quran
            </Link>
            <Link
              href="/hadith"
              className="py-2 text-green-800 dark:text-green-400 hover:text-green-600 dark:hover:text-green-300 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Hadith
            </Link>
            <Link
              href="/qibla"
              className="py-2 text-green-800 dark:text-green-400 hover:text-green-600 dark:hover:text-green-300 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Qibla
            </Link>
            <Link
              href="/about"
              className="py-2 text-green-800 dark:text-green-400 hover:text-green-600 dark:hover:text-green-300 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="py-2 text-green-800 dark:text-green-400 hover:text-green-600 dark:hover:text-green-300 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
