"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import axios from "axios"
import QuranAudioPlayer from "@/components/quran-audio-player"

type Surah = {
    number: number
    englishName: string
    englishNameTranslation: string
}

type Ayah = {
    numberInSurah: number
    text: string
    translation: string
    transliteration?: string
}

const RECITERS = [
    { id: "ar.alafasy", name: "Alafasy" },
    { id: "ar.abdulbasitmurattal", name: "Abdul Basit" },
    { id: "ar.abdullahbasfar", name: "Abdullah Basfar" },
    { id: "ar.muhammadayyoub", name: "Muhammad Ayyoub" },
    { id: "ar.minshawimujawwad", name: "Minshawy Mujawwad" },
    { id: "ar.hudhaify", name: "Hudhaify" },
]

const RECITER_PATHS: Record<string, string> = {
    "ar.alafasy": "Alafasy_128kbps",
    "ar.abdulbasitmurattal": "AbdulSamad_64kbps_QuranExplorer.Com",
    "ar.abdullahbasfar": "Abdullah_Basfar_192kbps",
    "ar.muhammadayyoub": "Muhammad_Ayyoub_128kbps",
    "ar.minshawimujawwad": "Minshawy_Mujawwad_192kbps",
    "ar.hudhaify": "Hudhaify_128kbps",
}

const padNumber = (num: number, size: number): string => num.toString().padStart(size, "0")

const getAudioUrl = (
    surahNumber: number,
    ayahNumber: number,
    reciter: string,
    audioUrlCache: React.MutableRefObject<Record<string, string>>
) => {
    const key = `${surahNumber}_${ayahNumber}_${reciter}`
    if (audioUrlCache.current[key]) return audioUrlCache.current[key]

    const reciterPath = RECITER_PATHS[reciter] || RECITER_PATHS["ar.alafasy"]
    const url = `https://everyayah.com/data/${reciterPath}/${padNumber(surahNumber, 3)}${padNumber(ayahNumber, 3)}.mp3`
    audioUrlCache.current[key] = url
    return url
}

export default function QuranViewer() {
    const [surahs, setSurahs] = useState<Surah[]>([])
    const [selectedSurah, setSelectedSurah] = useState<number>(1)
    const [arabicAyahs, setArabicAyahs] = useState<Ayah[]>([])
    const [translationAyahs, setTranslationAyahs] = useState<Ayah[]>([])
    const [selectedReciter, setSelectedReciter] = useState<string>("ar.alafasy")
    const [playingAyahNumber, setPlayingAyahNumber] = useState<number | null>(null)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const audioUrlCache = useRef<Record<string, string>>({})
    const ayahRefs = useRef<Record<number, HTMLDivElement | null>>({})
    const topRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        axios.get("https://api.alquran.cloud/v1/surah").then(res => setSurahs(res.data.data))
    }, [])

    useEffect(() => {
        const fetchAyahs = async () => {
            try {
                setErrorMessage(null)
                const [arabicRes, translationRes, transliterationRes] = await Promise.all([
                    axios.get(`https://api.alquran.cloud/v1/surah/${selectedSurah}/ar.alafasy`),
                    axios.get(`https://api.alquran.cloud/v1/surah/${selectedSurah}/en.asad`),
                    axios.get(`https://api.alquran.cloud/v1/surah/${selectedSurah}/en.transliteration`)
                ])

                const arabicData = arabicRes.data.data.ayahs
                const translationData = translationRes.data.data.ayahs
                const transliterationData = transliterationRes.data.data.ayahs

                const combined = arabicData.map((a: any, i: number) => ({
                    numberInSurah: a.numberInSurah,
                    text: a.text,
                    translation: translationData[i]?.text || "",
                    transliteration: transliterationData[i]?.text || ""
                }))

                setArabicAyahs(combined)
                setPlayingAyahNumber(null)

                setTimeout(() => {
                    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
                }, 100)
            } catch {
                setErrorMessage("Failed to load ayahs. Please try again later.")
            }
        }

        fetchAyahs()
    }, [selectedSurah])

    const handleAyahComplete = (currentAyahNumber: number) => {
        const nextIndex = arabicAyahs.findIndex(a => a.numberInSurah === currentAyahNumber) + 1
        if (nextIndex < arabicAyahs.length) {
            setPlayingAyahNumber(arabicAyahs[nextIndex].numberInSurah)
        } else {
            setPlayingAyahNumber(null)
        }
    }

    const playAll = () => {
        if (arabicAyahs.length > 0) {
            setPlayingAyahNumber(arabicAyahs[0].numberInSurah)
        }
    }

    return (
        <div className="max-w-5xl mx-auto px-4 py-6 bg-[#f5fff7] dark:bg-gray-900 transition-colors duration-300">

            {/* Sticky Selector Bar */}
            <div
                className="sticky top-14 z-10 bg-[#f5fff7] dark:bg-gray-900 shadow-md rounded-md px-4 py-4 mb-4 transition duration-300"
                ref={topRef}
            >
                <div className="flex flex-wrap gap-4 items-center justify-between">
                    <div className="flex-1 min-w-[60%]">
                        <label htmlFor="surah" className="block text-green-800 dark:text-green-300 font-medium mb-1">
                            Select Surah
                        </label>
                        <select
                            id="surah"
                            className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white"
                            value={selectedSurah}
                            onChange={(e) => setSelectedSurah(Number(e.target.value))}
                        >
                            {surahs.map(s => (
                                <option key={s.number} value={s.number}>
                                    {s.number}. {s.englishName} ({s.englishNameTranslation})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="w-[20%]">
                        <label htmlFor="reciter" className="block text-green-800 dark:text-green-300 font-medium mb-1">
                            Select Reciter
                        </label>
                        <select
                            id="reciter"
                            className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white"
                            value={selectedReciter}
                            onChange={(e) => setSelectedReciter(e.target.value)}
                        >
                            {RECITERS.map(r => (
                                <option key={r.id} value={r.id}>{r.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="w-[10%]">
                        <button
                            onClick={playAll}
                            className="h-fit mt-6 w-full py-2 bg-green-600 text-white rounded-md shadow hover:bg-green-700 transition"
                        >
                            ▶ Play All
                        </button>
                    </div>
                </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
                <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{errorMessage}</div>
            )}

            {/* Bismillah */}
            {selectedSurah !== 1 && selectedSurah !== 9 && (
                <div className="text-center text-3xl font-serif text-green-700 dark:text-green-300 mb-6 transition duration-300">
                    ﷽
                </div>
            )}

            {/* Ayah List */}
            <div className="space-y-6 overflow-y-auto scrollbar-hide max-h-[70vh] transition duration-300">
                {arabicAyahs.map((ayah, i) => {
                    const isPlaying = ayah.numberInSurah === playingAyahNumber
                    const nextAyah = arabicAyahs[i + 1]

                    return (
                        <div
                            key={ayah.numberInSurah}
                            ref={el => { ayahRefs.current[ayah.numberInSurah] = el }}
                            className={`rounded-md p-4 bg-white dark:bg-gray-800 shadow transition-colors duration-300 border-l-4 ${isPlaying ? "border-green-500" : "border-transparent"}`}
                        >
                            <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                                Verse {ayah.numberInSurah}
                            </div>

                            <p
                                className="text-3xl text-right font-serif text-gray-900 dark:text-white mb-4 leading-loose"
                                title={ayah.transliteration || ""}
                            >
                                {ayah.text}
                            </p>

                            <p className="italic text-lg text-left text-gray-700 dark:text-gray-300 mb-4">
                                {ayah.translation}
                            </p>

                            <QuranAudioPlayer
                                surahNumber={selectedSurah}
                                ayahNumber={ayah.numberInSurah}
                                reciter={selectedReciter}
                                autoPlay={isPlaying}
                                className="max-w-xl mx-auto"
                                onComplete={() => handleAyahComplete(ayah.numberInSurah)}
                                onError={() => setErrorMessage("Audio playback error occurred.")}
                            />

                            {/* Preload next audio */}
                            {nextAyah && (
                                <audio
                                    preload="auto"
                                    src={getAudioUrl(selectedSurah, nextAyah.numberInSurah, selectedReciter, audioUrlCache)}
                                    style={{ display: "none" }}
                                />
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
