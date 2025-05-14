"use client"

import { useState, useEffect } from "react"
import { Search, Book, Headphones, AlertCircle, ChevronDown, ChevronUp } from "lucide-react"
import QuranAudioPlayer from "./quran-audio-player"

// Interfaces for Quran API
interface Surah {
  number: number
  name: string
  englishName: string
  englishNameTranslation: string
  numberOfAyahs: number
  revelationType: string
}

interface Ayah {
  number: number
  text: string
  numberInSurah: number
  juz: number
  translation?: string
}

interface Reciter {
  id: string
  name: string
  style?: string
}

export default function QuranSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null)
  const [ayahs, setAyahs] = useState<Ayah[]>([])
  const [surahs, setSurahs] = useState<Surah[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedReciter, setSelectedReciter] = useState<Reciter>({
    id: "ar.alafasy",
    name: "Mishari Rashid al-`Afasy",
  })
  const [showReciters, setShowReciters] = useState(false)
  const [ayahOfTheDay, setAyahOfTheDay] = useState<{
    text: string
    translation: string
    surah: string
    ayahNumber: number
    surahNumber: number
  } | null>(null)
  const [playingAyah, setPlayingAyah] = useState<number | null>(null)
  const [audioError, setAudioError] = useState(false)
  const [audioErrorCount, setAudioErrorCount] = useState(0)

  // List of reciters
  const reciters: Reciter[] = [
    { id: "ar.alafasy", name: "Mishari Rashid al-`Afasy" },
    { id: "ar.abdulbasitmurattal", name: "Abdul Basit Abdul Samad", style: "Murattal" },
    { id: "ar.abdullahbasfar", name: "Abdullah Basfar" },
    { id: "ar.muhammadayyoub", name: "Muhammad Ayyoub" },
    { id: "ar.minshawimujawwad", name: "Mohamed Siddiq al-Minshawi", style: "Mujawwad" },
    { id: "ar.hudhaify", name: "Ali Al-Hudhaify" },
  ]

  // Add this function to the component
  const tryAlternativeAudioSource = () => {
    console.log("Trying alternative audio source")
    setAudioErrorCount((prev) => prev + 1)

    // After 3 errors, disable audio completely
    if (audioErrorCount >= 2) {
      setAudioError(true)
      return
    }

    // Try a different reciter if the current one fails
    const currentIndex = reciters.findIndex((r) => r.id === selectedReciter.id)
    const nextIndex = (currentIndex + 1) % reciters.length
    setSelectedReciter(reciters[nextIndex])
  }

  // Fetch list of surahs
  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        const response = await fetch("https://api.alquran.cloud/v1/surah")
        if (!response.ok) {
          throw new Error(`Failed to fetch surahs: ${response.status}`)
        }

        const data = await response.json()
        if (data.code === 200 && data.status === "OK") {
          setSurahs(data.data)
        } else {
          throw new Error("Failed to fetch surah list")
        }
      } catch (err) {
        console.error("Error fetching surahs:", err)
        setError("Failed to load Quran data. Please try again later.")
      }
    }

    // Fetch ayah of the day
    const fetchAyahOfTheDay = async () => {
      try {
        // Generate a random surah and ayah
        const randomSurah = Math.floor(Math.random() * 114) + 1

        // Get the surah details to know how many ayahs it has
        const surahResponse = await fetch(`https://api.alquran.cloud/v1/surah/${randomSurah}`)
        if (!surahResponse.ok) throw new Error("Failed to fetch surah details")

        const surahData = await surahResponse.json()
        if (surahData.code !== 200) throw new Error("Failed to fetch surah details")

        const numberOfAyahs = surahData.data.numberOfAyahs
        const randomAyah = Math.floor(Math.random() * numberOfAyahs) + 1

        // Get the ayah in Arabic
        const ayahResponse = await fetch(`https://api.alquran.cloud/v1/ayah/${randomSurah}:${randomAyah}`)
        if (!ayahResponse.ok) throw new Error("Failed to fetch ayah")

        const ayahData = await ayahResponse.json()
        if (ayahData.code !== 200) throw new Error("Failed to fetch ayah")

        // Get the translation
        const translationResponse = await fetch(
          `https://api.alquran.cloud/v1/ayah/${randomSurah}:${randomAyah}/en.sahih`,
        )
        if (!translationResponse.ok) throw new Error("Failed to fetch translation")

        const translationData = await translationResponse.json()
        if (translationData.code !== 200) throw new Error("Failed to fetch translation")

        setAyahOfTheDay({
          text: ayahData.data.text,
          translation: translationData.data.text,
          surah: surahData.data.englishName,
          ayahNumber: randomAyah,
          surahNumber: randomSurah,
        })
      } catch (err) {
        console.error("Error fetching ayah of the day:", err)
        // Use a fallback ayah if API fails
        setAyahOfTheDay({
          text: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ",
          translation: "Allah - there is no deity except Him, the Ever-Living, the Sustainer of existence.",
          surah: "Al-Baqarah",
          ayahNumber: 255,
          surahNumber: 2,
        })
      }
    }

    fetchSurahs()
    fetchAyahOfTheDay()
  }, [])

  // Reset audio error when reciter changes
  useEffect(() => {
    // Don't reset if we've already tried multiple reciters
    if (audioErrorCount <= 2) {
      setAudioError(false)
    }
  }, [selectedReciter, audioErrorCount])

  // Fetch ayahs for selected surah
  const fetchAyahs = async (surahNumber: number) => {
    setLoading(true)
    setError(null)

    try {
      // Fetch Arabic ayahs
      const arabicResponse = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}`)
      if (!arabicResponse.ok) {
        throw new Error(`Failed to fetch ayahs: ${arabicResponse.status}`)
      }

      const arabicData = await arabicResponse.json()
      if (arabicData.code !== 200 || arabicData.status !== "OK") {
        throw new Error("Failed to fetch ayahs")
      }

      // Fetch English translation
      const translationResponse = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/en.sahih`)
      if (!translationResponse.ok) {
        throw new Error(`Failed to fetch translation: ${translationResponse.status}`)
      }

      const translationData = await translationResponse.json()
      if (translationData.code !== 200 || translationData.status !== "OK") {
        throw new Error("Failed to fetch translation")
      }

      // Combine Arabic and translation
      const combinedAyahs = arabicData.data.ayahs.map((ayah: Ayah, index: number) => ({
        ...ayah,
        translation: translationData.data.ayahs[index].text,
      }))

      setAyahs(combinedAyahs)
    } catch (err) {
      console.error("Error fetching ayahs:", err)
      setError("Failed to load surah. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  // Handle surah selection
  const handleSurahSelect = (surah: Surah) => {
    setSelectedSurah(surah)
    fetchAyahs(surah.number)
  }

  // Handle ayah audio completion
  const handleAyahComplete = () => {
    setPlayingAyah(null)
  }

  // Filter surahs based on search query
  const filteredSurahs = surahs.filter(
    (surah) =>
      surah.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      surah.number.toString().includes(searchQuery),
  )

  return (
    <section className="py-8 bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-4 max-w-7xl">
        <h2 className="text-2xl font-bold text-center mb-8 text-green-800 dark:text-green-400 transition-colors">
          The Holy Quran
        </h2>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Ayah of the Day Card */}
          <div className="bg-white dark:bg-gray-950 rounded-lg shadow border border-green-100 dark:border-green-900 overflow-hidden transition-colors">
            <div className="flex items-center gap-2 p-4 border-b border-green-100 dark:border-green-900 transition-colors">
              <Book className="h-5 w-5 text-green-600 dark:text-green-500 transition-colors" />
              <h3 className="font-medium text-green-800 dark:text-green-400 transition-colors">Ayah of the Day</h3>
            </div>
            <div className="p-6">
              {ayahOfTheDay ? (
                <>
                  <div className="text-right mb-4">
                    <p className="text-xl arabic-text leading-loose text-green-900 dark:text-green-300 transition-colors">
                      {ayahOfTheDay.text}
                    </p>
                  </div>
                  <div className="mt-4">
                    <p className="text-green-800 dark:text-green-400 italic transition-colors">
                      "{ayahOfTheDay.translation}"
                    </p>
                    <p className="text-sm text-green-600 dark:text-green-500 mt-2 transition-colors">
                      Surah {ayahOfTheDay.surah}, Ayah {ayahOfTheDay.ayahNumber}
                    </p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-green-100 dark:border-green-900">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Headphones className="h-4 w-4 text-green-600 dark:text-green-500" />
                        <h4 className="text-sm font-medium text-green-800 dark:text-green-400">Listen to Recitation</h4>
                      </div>
                      <div className="relative">
                        <button
                          onClick={() => setShowReciters(!showReciters)}
                          className="flex items-center gap-1 text-xs px-2 py-1 bg-green-100 dark:bg-green-900/30 hover:bg-green-200 dark:hover:bg-green-900/50 text-green-800 dark:text-green-400 rounded-md transition-colors"
                        >
                          {selectedReciter.name.split(" ")[0]}
                          {showReciters ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                        </button>

                        {showReciters && (
                          <div className="absolute right-0 mt-1 w-48 bg-white dark:bg-gray-900 border border-green-100 dark:border-green-900 rounded-md shadow-lg z-10">
                            <div className="p-2">
                              <div className="space-y-1 max-h-48 overflow-y-auto">
                                {reciters.map((reciter) => (
                                  <button
                                    key={reciter.id}
                                    onClick={() => {
                                      setSelectedReciter(reciter)
                                      setShowReciters(false)
                                    }}
                                    className={`w-full text-left px-2 py-1 rounded-md text-xs ${
                                      selectedReciter.id === reciter.id
                                        ? "bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-400"
                                        : "hover:bg-green-50 dark:hover:bg-green-900/30 text-green-700 dark:text-green-500"
                                    } transition-colors`}
                                  >
                                    {reciter.name}
                                    {reciter.style && (
                                      <span className="text-xs ml-1 opacity-70">({reciter.style})</span>
                                    )}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {!audioError ? (
                      <QuranAudioPlayer
                        surahNumber={ayahOfTheDay.surahNumber}
                        ayahNumber={ayahOfTheDay.ayahNumber}
                        reciter={selectedReciter.id}
                        onComplete={handleAyahComplete}
                        onError={tryAlternativeAudioSource}
                        key={`ayah-of-day-${selectedReciter.id}-${ayahOfTheDay.surahNumber}-${ayahOfTheDay.ayahNumber}`}
                      />
                    ) : (
                      <div className="p-3 text-amber-600 dark:text-amber-400 text-sm bg-amber-50 dark:bg-amber-900/20 rounded-md border border-amber-200 dark:border-amber-900/30">
                        <p>Audio playback is currently unavailable. We're trying to fix this issue.</p>
                        <p className="mt-1">You can still read the Quran text and translations.</p>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 dark:border-green-500"></div>
                </div>
              )}
            </div>
          </div>

          {/* Surah Index Card */}
          <div className="bg-white dark:bg-gray-950 rounded-lg shadow border border-green-100 dark:border-green-900 overflow-hidden transition-colors">
            <div className="flex items-center gap-2 p-4 border-b border-green-100 dark:border-green-900 transition-colors">
              <Book className="h-5 w-5 text-green-600 dark:text-green-500 transition-colors" />
              <h3 className="font-medium text-green-800 dark:text-green-400 transition-colors">Surah Index</h3>
            </div>
            <div className="p-4">
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search surah by name or number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full p-2 pl-9 border border-green-200 dark:border-green-900 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 text-sm bg-white dark:bg-gray-900 text-green-900 dark:text-green-300 transition-colors"
                />
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-green-500" />
              </div>

              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {filteredSurahs.map((surah) => (
                  <div
                    key={surah.number}
                    className="flex justify-between items-center p-2 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-md cursor-pointer transition-colors"
                    onClick={() => handleSurahSelect(surah)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center text-green-800 dark:text-green-400 text-sm transition-colors">
                        {surah.number}
                      </div>
                      <div>
                        <p className="font-medium text-green-800 dark:text-green-400 transition-colors">
                          {surah.englishName}
                        </p>
                        <p className="text-xs text-green-600 dark:text-green-500 transition-colors">
                          {surah.englishNameTranslation} • {surah.numberOfAyahs} verses
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-green-800 dark:text-green-400 arabic-text transition-colors">{surah.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Selected Surah Display */}
        {selectedSurah && (
          <div className="mt-8 max-w-5xl mx-auto bg-white dark:bg-gray-950 rounded-lg shadow border border-green-100 dark:border-green-900 overflow-hidden transition-colors">
            <div className="flex items-center justify-between p-4 border-b border-green-100 dark:border-green-900 bg-green-50 dark:bg-green-950/50 transition-colors">
              <div>
                <h3 className="font-medium text-green-800 dark:text-green-400 transition-colors">
                  {selectedSurah.number}. {selectedSurah.englishName} ({selectedSurah.englishNameTranslation})
                </h3>
                <p className="text-sm text-green-600 dark:text-green-500 transition-colors">
                  {selectedSurah.numberOfAyahs} verses • {selectedSurah.revelationType}
                </p>
              </div>

              <div className="relative">
                <button
                  onClick={() => setShowReciters(!showReciters)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-green-100 dark:bg-green-900/30 hover:bg-green-200 dark:hover:bg-green-900/50 text-green-800 dark:text-green-400 rounded-md transition-colors text-sm"
                >
                  <Headphones className="h-4 w-4" />
                  {selectedReciter.name.split(" ")[0]}
                  {showReciters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>

                {showReciters && (
                  <div className="absolute right-0 mt-1 w-64 bg-white dark:bg-gray-900 border border-green-100 dark:border-green-900 rounded-md shadow-lg z-10">
                    <div className="p-2">
                      <h4 className="text-sm font-medium text-green-800 dark:text-green-400 mb-2">Select Reciter</h4>
                      <div className="space-y-1 max-h-48 overflow-y-auto">
                        {reciters.map((reciter) => (
                          <button
                            key={reciter.id}
                            onClick={() => {
                              setSelectedReciter(reciter)
                              setShowReciters(false)
                            }}
                            className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                              selectedReciter.id === reciter.id
                                ? "bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-400"
                                : "hover:bg-green-50 dark:hover:bg-green-900/30 text-green-700 dark:text-green-500"
                            } transition-colors`}
                          >
                            {reciter.name}
                            {reciter.style && <span className="text-xs ml-1 opacity-70">({reciter.style})</span>}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Audio player for the entire surah - only show if audio is not in error state */}
            {!audioError && (
              <div className="p-4 bg-green-50 dark:bg-green-900/20 border-b border-green-100 dark:border-green-900">
                <div className="flex items-center gap-2 mb-2">
                  <Headphones className="h-4 w-4 text-green-600 dark:text-green-500" />
                  <h4 className="text-sm font-medium text-green-800 dark:text-green-400">Listen to Complete Surah</h4>
                </div>
                <QuranAudioPlayer
                  surahNumber={selectedSurah.number}
                  reciter={selectedReciter.id}
                  onError={tryAlternativeAudioSource}
                  key={`complete-surah-${selectedReciter.id}-${selectedSurah.number}`}
                />
              </div>
            )}

            <div className="p-4">
              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 dark:border-green-500"></div>
                </div>
              ) : error ? (
                <div className="p-4 text-red-600 dark:text-red-400 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  <p>{error}</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {ayahs.map((ayah) => (
                    <div
                      key={ayah.number}
                      className="border-b border-green-100 dark:border-green-900 pb-4 last:border-0"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="w-8 h-8 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center text-green-800 dark:text-green-400 text-sm transition-colors">
                          {ayah.numberInSurah}
                        </div>
                        {!audioError && (
                          <button
                            onClick={() => setPlayingAyah(ayah.numberInSurah)}
                            className="p-1 text-green-600 dark:text-green-500 hover:text-green-800 dark:hover:text-green-400 transition-colors"
                            aria-label={`Listen to Ayah ${ayah.numberInSurah}`}
                          >
                            <Headphones className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                      <p className="text-right text-lg arabic-text leading-loose text-green-900 dark:text-green-300 mb-2 transition-colors">
                        {ayah.text}
                      </p>
                      <p className="text-green-800 dark:text-green-400 transition-colors">{ayah.translation}</p>

                      {/* Individual ayah audio player - only show if audio is not in error state */}
                      {!audioError && playingAyah === ayah.numberInSurah && (
                        <div className="mt-3">
                          <QuranAudioPlayer
                            surahNumber={selectedSurah.number}
                            ayahNumber={ayah.numberInSurah}
                            reciter={selectedReciter.id}
                            onComplete={handleAyahComplete}
                            onError={tryAlternativeAudioSource}
                            className="mt-2"
                            key={`individual-ayah-${selectedReciter.id}-${selectedSurah.number}-${ayah.numberInSurah}`}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
