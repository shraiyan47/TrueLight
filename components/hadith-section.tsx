// export default function HadithSection() {
//   return (
//     <section className="py-8 bg-white dark:bg-night-800 transition-colors">
//       <div className="container mx-auto px-4 max-w-7xl">
//         <h2 className="text-2xl font-bold text-center mb-8 text-green-800 dark:font-bold dark:text-sand-300 transition-colors">
//           Hadith of the Day
//         </h2>

//         <div className="max-w-5xl mx-auto">
//           <div className="bg-white dark:bg-night-500 rounded-lg shadow border border-green-100 dark:border-night-300 card-bg overflow-hidden transition-colors">
//             <div className="flex items-center gap-2 p-4 border-b border-green-100 dark:border-night-200 card-header transition-colors">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="20"
//                 height="20"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 className="text-green-600 dark:text-sand-400 icon-primary transition-colors"
//               >
//                 <path d="M14 3v4a1 1 0 0 0 1 1h4" />
//                 <path d="M17 21h-7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z" />
//                 <path d="M9 9h1" />
//                 <path d="M9 13h6" />
//                 <path d="M9 17h6" />
//               </svg>
//               <h3 className="font-medium text-green-800 dark:text-sand-300 card-title transition-colors">Hadith</h3>
//             </div>
//             <div className="p-6">
//               <p className="text-green-800 dark:text-sand-200 card-text leading-relaxed transition-colors">
//                 The Messenger of Allah (ﷺ) said, "When a person dies, his deeds come to an end except for three: Sadaqah
//                 Jariyah (ceaseless charity), knowledge which is beneficial, or a virtuous descendant who prays for him
//                 (the deceased)."
//               </p>

//               <div className="mt-4 pt-4 border-t border-green-100 dark:border-night-300 divider transition-colors">
//                 <p className="text-sm text-green-700 dark:text-sand-400 card-subtitle transition-colors">Narrator: Abu Hurairah</p>
//                 <p className="text-xs text-green-600 dark:text-sand-500 card-muted transition-colors">
//                   Source: Sahih Muslim, The Book of Wills, No. 1631
//                 </p>
//               </div>

//               <div className="mt-4 text-right">
//                 <a
//                   href="/hadith"
//                   className="inline-flex items-center text-green-600 dark:text-sand-400 hover:text-green-800 dark:hover:text-sand-300 nav-link transition-colors"
//                 >
//                   Explore More Hadith
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="16"
//                     height="16"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     className="ml-1"
//                   >
//                     <path d="M5 12h14" />
//                     <path d="m12 5 7 7-7 7" />
//                   </svg>
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }




"use client"

import { useState, useEffect } from "react"
import { FileText, ArrowRight, ArrowLeft, RefreshCw } from "lucide-react"
import Link from "next/link"

// Define the Hadith type
interface Hadith {
  id: number
  text: string
  narrator: string
  source: string
}

// Collection of hadiths
const hadiths: Hadith[] = [
  {
    id: 1,
    text: 'The Messenger of Allah (ﷺ) said, "When a person dies, his deeds come to an end except for three: Sadaqah Jariyah (ceaseless charity), knowledge which is beneficial, or a virtuous descendant who prays for him (the deceased)."',
    narrator: "Abu Hurairah",
    source: "Sahih Muslim, The Book of Wills, No. 1631",
  },
  {
    id: 2,
    text: 'The Prophet (ﷺ) said, "The best of you are those who learn the Quran and teach it."',
    narrator: "Uthman ibn Affan",
    source: "Sahih al-Bukhari, Book of Virtues of the Quran, No. 5027",
  },
  {
    id: 3,
    text: 'The Messenger of Allah (ﷺ) said, "None of you truly believes until he loves for his brother what he loves for himself."',
    narrator: "Anas ibn Malik",
    source: "Sahih al-Bukhari, Book of Faith, No. 13",
  },
  {
    id: 4,
    text: 'The Prophet (ﷺ) said, "The strong person is not the one who can wrestle someone else down. The strong person is the one who can control himself when he is angry."',
    narrator: "Abu Hurairah",
    source: "Sahih al-Bukhari, Book of Good Manners, No. 6114",
  },
  {
    id: 5,
    text: 'The Messenger of Allah (ﷺ) said, "Whoever believes in Allah and the Last Day, let him speak good or remain silent."',
    narrator: "Abu Hurairah",
    source: "Sahih al-Bukhari, Book of Good Manners, No. 6018",
  },
]

export default function HadithSection() {
  // State for current hadith index
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoChanging, setIsAutoChanging] = useState(true)
  const [fadeIn, setFadeIn] = useState(true)

  // Get current hadith
  const currentHadith = hadiths[currentIndex]

  // Function to go to next hadith
  const nextHadith = () => {
    setFadeIn(false)
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % hadiths.length)
      setFadeIn(true)
    }, 300)
  }

  // Function to go to previous hadith
  const prevHadith = () => {
    setFadeIn(false)
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + hadiths.length) % hadiths.length)
      setFadeIn(true)
    }, 300)
  }

  // Function to get a random hadith
  const getRandomHadith = () => {
    setFadeIn(false)
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * hadiths.length)
      setCurrentIndex(randomIndex)
      setFadeIn(true)
    }, 300)
  }

  // Toggle auto-changing
  const toggleAutoChange = () => {
    setIsAutoChanging(!isAutoChanging)
  }

  // Auto-change hadith every 30 seconds if enabled
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isAutoChanging) {
      interval = setInterval(() => {
        nextHadith()
      }, 30000) // 30 seconds
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isAutoChanging, currentIndex])

  return (
    <section className="py-12 bg-white dark:bg-night-800 transition-colors">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-green-800 dark:text-sand-300 transition-colors">
            Hadith of the Day
          </h2>
          <button
            onClick={toggleAutoChange}
            className={`ml-3 p-2 rounded-full ${isAutoChanging ? "bg-green-100 text-green-600 dark:bg-night-400 dark:text-sand-300" : "bg-gray-100 text-gray-500 dark:bg-night-600 dark:text-sand-500"} transition-colors`}
            title={isAutoChanging ? "Auto-change enabled (30s)" : "Auto-change disabled"}
            aria-label={isAutoChanging ? "Disable auto-change" : "Enable auto-change"}
          >
            <RefreshCw size={16} className={isAutoChanging ? "animate-spin" : ""} style={{ animationDuration: "4s" }} />
          </button>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="bg-white dark:bg-night-500 rounded-lg shadow-md hover:shadow-lg border border-green-100 dark:border-night-300 overflow-hidden transition-all duration-300">
            <div className="flex items-center gap-2 p-4 border-b border-green-100 dark:border-night-200 transition-colors">
              <FileText className="text-green-600 dark:text-sand-400 transition-colors" size={20} />
              <h3 className="font-medium text-green-800 dark:text-sand-300 transition-colors">
                Hadith{" "}
                <span className="text-sm text-green-600 dark:text-sand-400">
                  ({currentIndex + 1}/{hadiths.length})
                </span>
              </h3>
            </div>

            <div className="p-6">
              <div className={`transition-opacity duration-300 ${fadeIn ? "opacity-100" : "opacity-0"}`}>
                <p className="text-green-800 dark:text-sand-200 leading-relaxed transition-colors">
                  {currentHadith.text}
                </p>

                <div className="mt-6 pt-4 border-t border-green-100 dark:border-night-300 transition-colors">
                  <p className="text-sm text-green-700 dark:text-sand-400 transition-colors">
                    Narrator: {currentHadith.narrator}
                  </p>
                  <p className="text-xs text-green-600 dark:text-sand-500 transition-colors">
                    Source: {currentHadith.source}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div className="flex space-x-2">
                  <button
                    onClick={prevHadith}
                    className="p-2 rounded-full bg-green-50 hover:bg-green-100 text-green-600 dark:bg-night-400 dark:hover:bg-night-300 dark:text-sand-300 transition-colors"
                    aria-label="Previous hadith"
                  >
                    <ArrowLeft size={18} />
                  </button>
                  <button
                    onClick={nextHadith}
                    className="p-2 rounded-full bg-green-50 hover:bg-green-100 text-green-600 dark:bg-night-400 dark:hover:bg-night-300 dark:text-sand-300 transition-colors"
                    aria-label="Next hadith"
                  >
                    <ArrowRight size={18} />
                  </button>
                  <button
                    onClick={getRandomHadith}
                    className="px-3 py-2 rounded-full bg-green-50 hover:bg-green-100 text-green-600 dark:bg-night-400 dark:hover:bg-night-300 dark:text-sand-300 text-xs font-medium transition-colors"
                    aria-label="Random hadith"
                  >
                    Random
                  </button>
                </div>

                <Link
                  href="/hadith"
                  className="inline-flex items-center text-green-600 dark:text-sand-400 hover:text-green-800 dark:hover:text-sand-300 font-medium transition-colors"
                >
                  Explore More
                  <ArrowRight className="ml-1" size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
