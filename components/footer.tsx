import Link from "next/link"
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram } from "lucide-react"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-night-800 border-t border-green-100 dark:border-night-300 pt-12 pb-6 transition-colors">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Logo and About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="text-white p-1 rounded">
                 <Image src={"/macca.svg"} width={40} height={40} alt="Macca" />
              </div>
              <span className="font-bold text-green-800 dark:text-sand-300 text-xl transition-colors">True Light</span>
            </div>
            <p className="text-green-700 dark:text-sand-400 mb-4 transition-colors">
              Guiding you on the path of knowledge and spirituality.
            </p>
            <div className="flex gap-4">
              <Link
                href="#"
                className="text-green-600 dark:text-sand-400 hover:text-green-800 dark:hover:text-sand-300 transition-colors"
              >
                <Facebook size={20} />
              </Link>
              <Link
                href="#"
                className="text-green-600 dark:text-sand-400 hover:text-green-800 dark:hover:text-sand-300 transition-colors"
              >
                <Twitter size={20} />
              </Link>
              <Link
                href="#"
                className="text-green-600 dark:text-sand-400 hover:text-green-800 dark:hover:text-sand-300 transition-colors"
              >
                <Instagram size={20} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-medium text-green-800 dark:text-sand-300 mb-4 transition-colors">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-green-700 dark:text-sand-400 hover:text-green-900 dark:hover:text-sand-300 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/quran"
                  className="text-green-700 dark:text-sand-400 hover:text-green-900 dark:hover:text-sand-300 transition-colors"
                >
                  Quran
                </Link>
              </li>
              <li>
                <Link
                  href="/hadith"
                  className="text-green-700 dark:text-sand-400 hover:text-green-900 dark:hover:text-sand-300 transition-colors"
                >
                  Hadith
                </Link>
              </li>
              <li>
                <Link
                  href="/qibla"
                  className="text-green-700 dark:text-sand-400 hover:text-green-900 dark:hover:text-sand-300 transition-colors"
                >
                  Qibla Finder
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-green-700 dark:text-sand-400 hover:text-green-900 dark:hover:text-sand-300 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-green-700 dark:text-sand-400 hover:text-green-900 dark:hover:text-sand-300 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="font-medium text-green-800 dark:text-sand-300 mb-4 transition-colors">
              Contact Information
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="text-green-600 dark:text-sand-400 h-5 w-5 mt-0.5 transition-colors icon-primary" />
                <span className="text-green-700 dark:text-sand-400 transition-colors">
                  123 Islamic Center St, City, Country
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-green-600 dark:text-sand-400 h-5 w-5 transition-colors icon-primary" />
                <span className="text-green-700 dark:text-sand-400 transition-colors">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-green-600 dark:text-sand-400 h-5 w-5 transition-colors icon-primary" />
                <span className="text-green-700 dark:text-sand-400 transition-colors">contact@truelight.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-green-100 dark:border-night-300 pt-6 text-center text-sm text-green-700 dark:text-sand-500 transition-colors">
          <p>© 2025 True Light. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
