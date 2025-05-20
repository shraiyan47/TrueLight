"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import axios from "axios"
import QuranAudioPlayer from "@/components/quran-audio-player"
import { Listbox, Transition } from '@headlessui/react'
import { Fragment } from 'react'

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

    const [searchVerse, setSearchVerse] = useState<string>("")
    const [highlightedVerse, setHighlightedVerse] = useState<number | null>(null)
    const [verseNotFound, setVerseNotFound] = useState(false)


    useEffect(() => {
        axios.get("https://api.alquran.cloud/v1/surah").then(res => setSurahs(res.data.data))
    }, [])

    useEffect(() => {
        const fetchAyahs = async () => {
            try {
                setErrorMessage(null)
                setVerseNotFound(false)
                setSearchVerse("") // Clear search input
                setHighlightedVerse(null) // Remove previous highlight
                setPlayingAyahNumber(null) // Stop any playing verse

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

                // Scroll to verse 1 after rendering
                setTimeout(() => {
                    const firstAyahElement = ayahRefs.current[1]
                    if (firstAyahElement) {
                        firstAyahElement.scrollIntoView({ behavior: "smooth", block: "start" })
                    }
                }, 300)
            } catch {
                setErrorMessage("Failed to load ayahs. Please try again later.")
            }
        }

        fetchAyahs()
    }, [selectedSurah])




    useEffect(() => {
        if (playingAyahNumber && ayahRefs.current[playingAyahNumber]) {
            ayahRefs.current[playingAyahNumber]?.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }
    }, [playingAyahNumber]);

    useEffect(() => {
        if (highlightedVerse !== null) {
            const timer = setTimeout(() => {
                setHighlightedVerse(null)
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [highlightedVerse])



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
                    <div className="flex-1 min-w-[50%]">
                        <label htmlFor="surah" className="block text-green-800 dark:text-green-300 font-medium mb-1">
                            Select Surah
                        </label>


                        <Listbox value={selectedSurah} onChange={setSelectedSurah}>
                            <div className="relative mt-1">

                                <Listbox.Button className="relative w-full cursor-pointer rounded-md bg-white dark:bg-gray-800 py-2 pl-4 pr-10 text-left border border-gray-300 dark:border-gray-700 shadow-md focus:outline-none">
                                    <span className="block truncate">
                                        {surahs.find(s => s.number === selectedSurah)?.englishName || "Select Surah"}
                                    </span>
                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 dark:text-gray-300">
                                        ▾
                                    </span>
                                </Listbox.Button>

                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-200 transform"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="transition ease-in duration-150 transform"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                        {surahs.map((s) => (
                                            <Listbox.Option
                                                key={s.number}
                                                value={s.number}
                                                className={({ active }) =>
                                                    `cursor-pointer select-none py-2 px-4 ${active
                                                        ? 'bg-green-100 dark:bg-green-900 text-green-900 dark:text-white'
                                                        : 'text-gray-900 dark:text-white'
                                                    }`
                                                }
                                            >
                                                <span className="block truncate">
                                                    {s.number}. {s.englishName} ({s.englishNameTranslation})
                                                </span>
                                            </Listbox.Option>
                                        ))}
                                    </Listbox.Options>
                                </Transition>
                            </div>
                        </Listbox>


                    </div>

                    <div className="w-[20%]">
                        <label htmlFor="reciter" className="block text-green-800 dark:text-green-300 font-medium mb-1">
                            Select Reciter
                        </label>
                        <Listbox value={selectedReciter} onChange={setSelectedReciter}>
                            <div className="relative mt-1">
                                <Listbox.Button className="relative w-full cursor-default rounded-md bg-white dark:bg-gray-800 py-2 pl-3 pr-10 text-left shadow-md border border-gray-300 dark:border-gray-700 focus:outline-none focus-visible:ring-green-500 focus-visible:ring-opacity-75 transition">
                                    <span className="block truncate">
                                        {RECITERS.find(r => r.id === selectedReciter)?.name}
                                    </span>
                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 dark:text-gray-300">
                                        ▾
                                    </span>
                                </Listbox.Button>

                                <Transition
                                    as={Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                        {RECITERS.map((reciter) => (
                                            <Listbox.Option
                                                key={reciter.id}
                                                className={({ active }) =>
                                                    `relative cursor-default select-none py-2 px-4 ${active
                                                        ? "bg-green-100 text-green-900 dark:bg-green-700 dark:text-white"
                                                        : "text-gray-900 dark:text-gray-200"
                                                    }`
                                                }
                                                value={reciter.id}
                                            >
                                                {({ selected }) => (
                                                    <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                                                        {reciter.name}
                                                    </span>
                                                )}
                                            </Listbox.Option>
                                        ))}
                                    </Listbox.Options>
                                </Transition>
                            </div>
                        </Listbox>
                    </div>

                    <div className="w-[10%]">
                        <label htmlFor="verseSearch" className="block text-green-800 dark:text-green-300 font-medium mb-1">
                            Verse #
                        </label>
                        <input
                            id="verseSearch"
                            type="number"
                            min="1"
                            value={searchVerse}
                            onChange={(e) => setSearchVerse(e.target.value)}

                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    const verseNum = Number(searchVerse)
                                    const target = ayahRefs.current[verseNum]
                                    if (target) {
                                        target.scrollIntoView({ behavior: "smooth", block: "center" })
                                        setHighlightedVerse(verseNum)
                                        setSearchVerse("")
                                        setVerseNotFound(false)
                                    } else {
                                        setVerseNotFound(true)
                                    }
                                }
                            }}

                            placeholder="e.g. 5"
                            className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white"
                        />
                        {/* {verseNotFound && (
                            <div className="text-sm text-red-600 mt-1">
                                Verse not found in this Surah.
                            </div>
                        )} */}

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
            {/* {selectedSurah !== 1 && selectedSurah !== 9 && (
                <div className="text-center text-3xl font-serif text-green-700 dark:text-green-300 mb-6 transition duration-300">
                    ﷽
                </div>
            )} */}

            {/* Ayah List */}
            <div className="space-y-6 overflow-y-auto scrollbar-hide max-h-[70vh] transition duration-300">
                {arabicAyahs.map((ayah, i) => {
                    const isPlaying = ayah.numberInSurah === playingAyahNumber
                    const nextAyah = arabicAyahs[i + 1]

                    return (
                        <div
                            key={ayah.numberInSurah}
                            ref={el => { ayahRefs.current[ayah.numberInSurah] = el }}

                            className={`rounded-md p-4 shadow transition-colors duration-300 border-l-4
                                    ${isPlaying ? "border-green-500" : "border-transparent"}
                                    ${highlightedVerse === ayah.numberInSurah
                                    ? "border-l-4 border-green-400 dark:border-green-300 bg-[#f5fff7] dark:bg-gray-900"
                                    : ""}
                                    bg-white dark:bg-gray-800
                                    `}


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
