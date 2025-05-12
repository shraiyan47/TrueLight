"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "./mode-toggle"
import { Menu, X } from "lucide-react"
import Image from "next/image"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          {/* <Mosque className="h-6 w-6 text-primary" /> */}
          <Image src={"/macca.svg"} width={40} height={40} alt="Macca"/>
          <span className="text-xl font-bold">True Light</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/quran" className="text-sm font-medium hover:text-primary transition-colors">
            Quran
          </Link>
          <Link href="/hadith" className="text-sm font-medium hover:text-primary transition-colors">
            Hadith
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
            About
          </Link>
          <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors">
            Contact
          </Link>
          <ModeToggle />
        </nav>

        <div className="flex md:hidden items-center gap-4">
          <ModeToggle />
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container py-4 flex flex-col gap-4">
            <Link
              href="/"
              className="px-4 py-2 rounded-md hover:bg-muted transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/quran"
              className="px-4 py-2 rounded-md hover:bg-muted transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Quran
            </Link>
            <Link
              href="/hadith"
              className="px-4 py-2 rounded-md hover:bg-muted transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Hadith
            </Link>
            <Link
              href="/about"
              className="px-4 py-2 rounded-md hover:bg-muted transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="px-4 py-2 rounded-md hover:bg-muted transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
