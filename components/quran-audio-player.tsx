"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Loader2, AlertCircle } from "lucide-react"

interface QuranAudioPlayerProps {
  surahNumber: number
  ayahNumber?: number
  reciter: string
  onComplete?: () => void
  onError?: () => void
  className?: string
  autoPlay?: boolean
}

// Map of reciter IDs to their corresponding paths on everyayah.com
const RECITER_PATHS: Record<string, string> = {
  "ar.alafasy": "Alafasy_128kbps",
  "ar.abdulbasitmurattal": "AbdulSamad_64kbps_QuranExplorer.Com",
  "ar.abdullahbasfar": "Abdullah_Basfar_192kbps",
  "ar.muhammadayyoub": "Muhammad_Ayyoub_128kbps",
  "ar.minshawimujawwad": "Minshawy_Mujawwad_192kbps",
  "ar.hudhaify": "Hudhaify_128kbps",
}

export default function QuranAudioPlayer({
  surahNumber,
  ayahNumber,
  reciter,
  onComplete,
  onError,
  className = "",
  autoPlay = false,
}: QuranAudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [audioSource, setAudioSource] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const progressRef = useRef<HTMLDivElement | null>(null)
  const hasCalledCompleteRef = useRef(false)

  // Format time in mm:ss
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  // Pad numbers with leading zeros
  const padNumber = (num: number, size: number): string => {
    let s = num.toString()
    while (s.length < size) s = "0" + s
    return s
  }

  // Generate audio URL using everyayah.com API
  const generateAudioUrl = (surah: number, ayah?: number): string => {
    const reciterPath = RECITER_PATHS[reciter] || RECITER_PATHS["ar.alafasy"] // Fallback to Alafasy if reciter not found
    const paddedSurah = padNumber(surah, 3)

    if (ayah) {
      // For individual ayah - CORRECT FORMAT
      const paddedAyah = padNumber(ayah, 3)
      return `https://everyayah.com/data/${reciterPath}/${paddedSurah}${paddedAyah}.mp3`
    } else {
      // For complete surah, we'll use a different approach
      // Since everyayah.com doesn't provide complete surah files, we'll just play the first ayah
      // In a real app, you would implement a playlist to play all ayahs sequentially
      return `https://everyayah.com/data/${reciterPath}/${paddedSurah}001.mp3`
    }
  }

  // Load audio when surah or reciter changes
  useEffect(() => {
    const loadAudio = async () => {
      try {
        setIsLoading(true)
        setError(null)
        setIsPlaying(false)
        setCurrentTime(0)
        hasCalledCompleteRef.current = false

        // Generate the audio URL
        const url = generateAudioUrl(surahNumber, ayahNumber)
        setAudioSource(url)

        if (audioRef.current) {
          audioRef.current.src = url
          audioRef.current.load()
        }
      } catch (err) {
        console.error("Error loading audio:", err)
        setError("Failed to load audio. Please try again.")
        setIsLoading(false)
        if (onError) onError()
      }
    }

    loadAudio()
  }, [surahNumber, ayahNumber, reciter])

  // Set up audio event listeners
  useEffect(() => {
    const audio = audioRef.current

    if (!audio) return

    const handleLoadedMetadata = () => {
      setDuration(audio.duration)
      setIsLoading(false)
    }

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime)
    }

    const handleEnded = () => {
      console.log("Audio ended, calling onComplete")
      setIsPlaying(false)
      setCurrentTime(0)

      // Prevent multiple calls to onComplete
      if (!hasCalledCompleteRef.current && onComplete) {
        hasCalledCompleteRef.current = true
        onComplete()
      }
    }

    const handleCanPlayThrough = () => {
      setIsLoading(false)
      // We're not auto-playing anymore - user must click play button
    }

    audio.addEventListener("loadedmetadata", handleLoadedMetadata)
    audio.addEventListener("timeupdate", handleTimeUpdate)
    audio.addEventListener("ended", handleEnded)
    audio.addEventListener("canplaythrough", handleCanPlayThrough)

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata)
      audio.removeEventListener("timeupdate", handleTimeUpdate)
      audio.removeEventListener("ended", handleEnded)
      audio.removeEventListener("canplaythrough", handleCanPlayThrough)
    }
  }, [onComplete])

  // Handle play/pause
  const togglePlay = () => {
    if (isLoading || !audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      const playPromise = audioRef.current.play()

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true)
          })
          .catch((err) => {
            console.error("Error playing audio:", err)
            setError(
              `Playback failed. This may be due to network issues or the reciter's audio for ${
                ayahNumber ? `ayah ${ayahNumber}` : `surah ${surahNumber}`
              } may be unavailable.`,
            )
            setIsPlaying(false)
            if (onError) onError()
          })
      }
    }
  }

  // Handle mute toggle
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  // Handle seeking
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !audioRef.current) return

    const progressRect = progressRef.current.getBoundingClientRect()
    const seekPosition = (e.clientX - progressRect.left) / progressRect.width
    const seekTime = duration * seekPosition

    audioRef.current.currentTime = seekTime
    setCurrentTime(seekTime)
  }

  // Handle skip forward/backward
  const handleSkip = (seconds: number) => {
    if (!audioRef.current) return

    const newTime = Math.min(Math.max(currentTime + seconds, 0), duration)
    audioRef.current.currentTime = newTime
    setCurrentTime(newTime)
  }

  return (
    <div className={`rounded-md border border-green-100 dark:border-green-900 p-3 ${className}`}>
      <audio
        ref={audioRef}
        preload="metadata"
        onError={() => {
          console.error("Audio failed to load:", audioSource)
          setError(
            `Unable to load audio for ${ayahNumber ? `ayah ${ayahNumber}` : `surah ${surahNumber}`}. Please try another reciter or check your connection.`,
          )
          setIsLoading(false)
          setIsPlaying(false)
          if (onError) onError()
        }}
      />

      {error && (
        <div className="mb-3 text-red-600 dark:text-red-400 text-sm flex items-center gap-2">
          <AlertCircle className="h-4 w-4" />
          {error}
        </div>
      )}

      <div className="flex flex-col">
        {/* Progress bar */}
        <div
          ref={progressRef}
          className="h-2 bg-green-100 dark:bg-green-900/50 rounded-full mb-2 cursor-pointer relative overflow-hidden"
          onClick={handleSeek}
        >
          <div
            className="absolute top-0 left-0 h-full bg-green-600 dark:bg-green-500 rounded-full"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          ></div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleSkip(-10)}
              className="p-1 text-green-700 dark:text-green-500 hover:text-green-800 dark:hover:text-green-400 transition-colors"
              aria-label="Skip backward 10 seconds"
            >
              <SkipBack className="h-4 w-4" />
            </button>

            <button
              onClick={togglePlay}
              disabled={isLoading}
              className={`p-2 rounded-full ${
                isLoading
                  ? "bg-green-100 dark:bg-green-900/30 text-green-400 dark:text-green-700 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white"
              } transition-colors`}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5" />
              )}
            </button>

            <button
              onClick={() => handleSkip(10)}
              className="p-1 text-green-700 dark:text-green-500 hover:text-green-800 dark:hover:text-green-400 transition-colors"
              aria-label="Skip forward 10 seconds"
            >
              <SkipForward className="h-4 w-4" />
            </button>

            <button
              onClick={toggleMute}
              className="p-1 text-green-700 dark:text-green-500 hover:text-green-800 dark:hover:text-green-400 transition-colors"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>
          </div>

          <div className="text-xs text-green-700 dark:text-green-500">
            {formatTime(currentTime)} / {duration ? formatTime(duration) : "0:00"}
          </div>
        </div>
      </div>
    </div>
  )
}
