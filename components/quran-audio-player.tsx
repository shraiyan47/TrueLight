"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Loader2, AlertCircle } from 'lucide-react'
import { useTheme } from "@/components/theme-provider"

interface QuranAudioPlayerProps {
  surahNumber: number
  ayahNumber?: number
  reciter: string
  onComplete?: () => void
  onError?: () => void
  className?: string
  autoPlay?: boolean
}

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
  const { theme } = useTheme()
  const isDarkMode = theme === "dark"

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
    const reciterPath = RECITER_PATHS[reciter] || RECITER_PATHS["ar.alafasy"] // fallback
    const paddedSurah = padNumber(surah, 3)
    if (ayah) {
      const paddedAyah = padNumber(ayah, 3)
      return `https://everyayah.com/data/${reciterPath}/${paddedSurah}${paddedAyah}.mp3`
    } else {
      return `https://everyayah.com/data/${reciterPath}/${paddedSurah}001.mp3`
    }
  }

  // Load audio on surah, ayah, or reciter change
  useEffect(() => {
    const loadAudio = async () => {
      try {
        setIsLoading(true)
        setError(null)
        setIsPlaying(false)
        setCurrentTime(0)
        hasCalledCompleteRef.current = false

        const url = generateAudioUrl(surahNumber, ayahNumber)
        setAudioSource(url)

        if (audioRef.current) {
          audioRef.current.src = url
          audioRef.current.load()
        }
      } catch (err) {
        setError("Failed to load audio. Please try again.")
        setIsLoading(false)
        if (onError) onError()
      }
    }

    loadAudio()
  }, [surahNumber, ayahNumber, reciter])

  // Handle autoPlay when audioSource or autoPlay changes
  useEffect(() => {
    if (autoPlay && audioRef.current && audioSource) {
      const playPromise = audioRef.current.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true)
          })
          .catch((err) => {
            setError("Playback failed. Check network or audio availability.")
            setIsPlaying(false)
            if (onError) onError()
          })
      }
    } else if (!autoPlay && audioRef.current) {
      // Pause if autoPlay is false
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }, [autoPlay, audioSource])

  // Audio event listeners
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
      setIsPlaying(false)
      setCurrentTime(0)
      if (!hasCalledCompleteRef.current && onComplete) {
        hasCalledCompleteRef.current = true
        onComplete()
      }
    }

    const handleCanPlayThrough = () => {
      setIsLoading(false)
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

  // Play/Pause toggle
  const togglePlay = () => {
    if (isLoading || !audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      const playPromise = audioRef.current.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch((err) => {
            setError("Playback failed. Check network or audio availability.")
            setIsPlaying(false)
            if (onError) onError()
          })
      }
    }
  }

  // Mute toggle
  const toggleMute = () => {
    if (!audioRef.current) return
    audioRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }

  // Seek audio position
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !audioRef.current) return
    const rect = progressRef.current.getBoundingClientRect()
    const clickPos = (e.clientX - rect.left) / rect.width
    const seekTime = duration * clickPos
    audioRef.current.currentTime = seekTime
    setCurrentTime(seekTime)
  }

  // Skip seconds forward/back
  const handleSkip = (seconds: number) => {
    if (!audioRef.current) return
    let newTime = currentTime + seconds
    if (newTime < 0) newTime = 0
    if (newTime > duration) newTime = duration
    audioRef.current.currentTime = newTime
    setCurrentTime(newTime)
  }

  return (
    <div
      className={`rounded-md border p-3 ${className} ${
        isDarkMode ? "" : "border-green-100 bg-white"
      }`}
      style={
        isDarkMode
          ? {
              backgroundColor: "#121212",
              borderColor: "#2a2a2a",
            }
          : {}
      }
    >
      <audio
        ref={audioRef}
        preload="metadata"
        onError={() => {
          setError(`Unable to load audio for ${ayahNumber ? `ayah ${ayahNumber}` : `surah ${surahNumber}`}.`)
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
          className={`h-2 rounded-full mb-2 cursor-pointer relative overflow-hidden ${
            isDarkMode ? "" : "bg-green-100"
          }`}
          onClick={handleSeek}
          aria-label="Seek audio progress"
          role="slider"
          aria-valuemin={0}
          aria-valuemax={duration}
          aria-valuenow={currentTime}
          style={isDarkMode ? { backgroundColor: "#2a2a2a" } : {}}
        >
          <div
            className={`absolute top-0 left-0 h-full rounded-full transition-all duration-200 ease-linear ${
              isDarkMode ? "" : "bg-green-600"
            }`}
            style={
              isDarkMode
                ? {
                    width: `${(currentTime / duration) * 100}%`,
                    backgroundColor: "#c4b69d",
                  }
                : { width: `${(currentTime / duration) * 100}%` }
            }
          />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              aria-label="Skip back 10 seconds"
              onClick={() => handleSkip(-10)}
              className={`p-1 transition-colors ${isDarkMode ? "" : "text-green-700 hover:text-green-800"}`}
              style={
                isDarkMode
                  ? {
                      color: "#c4b69d",
                    }
                  : {}
              }
              onMouseOver={(e) => {
                if (isDarkMode) e.currentTarget.style.color = "#e0d6c2"
              }}
              onMouseOut={(e) => {
                if (isDarkMode) e.currentTarget.style.color = "#c4b69d"
              }}
            >
              <SkipBack className="h-4 w-4" />
            </button>

            <button
              aria-label={isPlaying ? "Pause audio" : "Play audio"}
              onClick={togglePlay}
              disabled={isLoading}
              className={`p-2 rounded-full transition-colors ${
                isDarkMode
                  ? ""
                  : isLoading
                  ? "bg-green-100 text-green-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 text-white"
              }`}
              style={
                isDarkMode
                  ? {
                      backgroundColor: isLoading ? "#1a1a1a" : "#2a2a2a",
                      color: isLoading ? "#a39884" : "#e0d6c2",
                    }
                  : {}
              }
              onMouseOver={(e) => {
                if (isDarkMode && !isLoading) e.currentTarget.style.backgroundColor = "#3a3a3a"
              }}
              onMouseOut={(e) => {
                if (isDarkMode && !isLoading) e.currentTarget.style.backgroundColor = "#2a2a2a"
              }}
            >
              {isLoading ? (
                <Loader2 className="animate-spin h-5 w-5" />
              ) : isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5" />
              )}
            </button>

            <button
              aria-label="Skip forward 10 seconds"
              onClick={() => handleSkip(10)}
              className={`p-1 transition-colors ${isDarkMode ? "" : "text-green-700 hover:text-green-800"}`}
              style={
                isDarkMode
                  ? {
                      color: "#c4b69d",
                    }
                  : {}
              }
              onMouseOver={(e) => {
                if (isDarkMode) e.currentTarget.style.color = "#e0d6c2"
              }}
              onMouseOut={(e) => {
                if (isDarkMode) e.currentTarget.style.color = "#c4b69d"
              }}
            >
              <SkipForward className="h-4 w-4" />
            </button>

            <button
              aria-label={isMuted ? "Unmute audio" : "Mute audio"}
              onClick={toggleMute}
              className={`p-1 transition-colors ${isDarkMode ? "" : "text-green-700 hover:text-green-800"}`}
              style={
                isDarkMode
                  ? {
                      color: "#c4b69d",
                    }
                  : {}
              }
              onMouseOver={(e) => {
                if (isDarkMode) e.currentTarget.style.color = "#e0d6c2"
              }}
              onMouseOut={(e) => {
                if (isDarkMode) e.currentTarget.style.color = "#c4b69d"
              }}
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>
          </div>

          <div
            className={`text-xs tabular-nums select-none ${isDarkMode ? "" : "text-green-700"}`}
            style={isDarkMode ? { color: "#a39884" } : {}}
          >
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>
      </div>
    </div>
  )
}
