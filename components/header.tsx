"use client"

import Link from "next/link"
import { Sun, Moon, Menu } from "lucide-react"
import { useState } from "react"
import { useTheme } from "@/components/theme-provider"
import Image from "next/image"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-green-100 dark:border-night-300 bg-white dark:bg-night-800 transition-colors">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 max-w-7xl">
        <Link href="/" className="flex items-center gap-2">
          <div className="text-white p-1 rounded">
            <Image src={"/macca.svg"} width={40} height={40} alt="Macca" />
          </div>
          <span className="font-bold text-green-800 dark:text-sand-300 text-xl nav-link active">True Light</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-green-800 dark:text-sand-300 hover:text-green-600 dark:hover:text-sand-200 font-medium nav-link"
          >
            Home
          </Link>
          <Link
            href="/quran"
            className="text-green-800 dark:text-sand-300 hover:text-green-600 dark:hover:text-sand-200 font-medium nav-link"
          >
            Quran
          </Link>
          <Link
            href="/hadith"
            className="text-green-800 dark:text-sand-300 hover:text-green-600 dark:hover:text-sand-200 font-medium nav-link"
          >
            Hadith
          </Link>
          {/* <Link
            href="/qibla"
            className="text-green-800 dark:text-sand-300 hover:text-green-600 dark:hover:text-sand-200 font-medium nav-link"
          >
            Qibla
          </Link> */}
          <Link
            href="/about"
            className="text-green-800 dark:text-sand-300 hover:text-green-600 dark:hover:text-sand-200 font-medium nav-link"
          >
            Blog
          </Link>
          <Link
            href="/contact"
            className="text-green-800 dark:text-sand-300 hover:text-green-600 dark:hover:text-sand-200 font-medium nav-link"
          >
            Donate
          </Link>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-green-50 dark:hover:bg-night-400 transition-colors"
              aria-label="Toggle dark mode"
            >
              {theme === "dark" ? <Sun className="text-sand-300" /> : <Moon className="text-green-600" />}
            </button>

            <button
              className="md:hidden p-2 text-green-800 dark:text-sand-300"
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
              className="p-2 rounded-full hover:bg-green-50 dark:hover:bg-night-400 transition-colors"
              aria-label="Toggle dark mode"
            >
              {theme === "dark" ? <Sun className="text-sand-300" /> : <Moon className="text-green-600" />}
            </button>

            <button
              className="md:hidden p-2 text-green-800 dark:text-sand-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu />
            </button>
          </div>
        </div>

      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-night-800 border-t border-green-100 dark:border-night-300">
          <nav className="container mx-auto px-4 py-3 flex flex-col">
            <Link
              href="/"
              className="py-2 text-green-800 dark:text-sand-300 hover:text-green-600 dark:hover:text-sand-200 font-medium nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/quran"
              className="py-2 text-green-800 dark:text-sand-300 hover:text-green-600 dark:hover:text-sand-200 font-medium nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              Quran
            </Link>
            <Link
              href="/hadith"
              className="py-2 text-green-800 dark:text-sand-300 hover:text-green-600 dark:hover:text-sand-200 font-medium nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              Hadith
            </Link>
            {/* <Link
              href="/qibla"
              className="py-2 text-green-800 dark:text-sand-300 hover:text-green-600 dark:hover:text-sand-200 font-medium nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              Qibla
            </Link> */}
            <Link
              href="/about"
              className="py-2 text-green-800 dark:text-sand-300 hover:text-green-600 dark:hover:text-sand-200 font-medium nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="py-2 text-green-800 dark:text-sand-300 hover:text-green-600 dark:hover:text-sand-200 font-medium nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              Donate
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
