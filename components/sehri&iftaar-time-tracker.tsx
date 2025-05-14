"use client"

import { useEffect, useState } from "react"
import { MapPin, Clock } from "lucide-react"

interface Times {
  fajr: string
  maghrib: string
  sunrise: string
}

const PrayerTimeTracker = () => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [times, setTimes] = useState<Times | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [countdown, setCountdown] = useState<string>("")
  const [nextEvent, setNextEvent] = useState<"Sehri" | "Iftaar" | null>(null)

  useEffect(() => {
    if (location) {
      fetchPrayerTimes(location.lat, location.lng)
    }
  }, [location])

  useEffect(() => {
    const interval = setInterval(() => {
      updateCountdown()
    }, 1000)
    return () => clearInterval(interval)
  }, [times])

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser")
      return
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords
        setLocation({ lat: latitude, lng: longitude })
        setError(null)
      },
      (err) => {
        console.error(err)
        setError("Unable to retrieve your location. Please enable location services.")
      },
    )
  }

  const fetchPrayerTimes = async (lat: number, lng: number) => {
    try {
      const res = await fetch(
        `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lng}&method=2`,
      )
      const data = await res.json()
      const timings = data.data.timings
      setTimes({
        fajr: timings.Fajr,
        maghrib: timings.Maghrib,
        sunrise: timings.Sunrise,
      })
    } catch (err) {
      console.error(err)
      setError("Failed to fetch prayer times.")
    }
  }

  const updateCountdown = () => {
    if (!times) return

    const now = new Date()
    const today = now.toISOString().split("T")[0]

    const fajr = new Date(`${today}T${times.fajr}:00`)
    const maghrib = new Date(`${today}T${times.maghrib}:00`)

    let target: Date
    let label: "Sehri" | "Iftaar"

    if (now < fajr) {
      target = fajr
      label = "Sehri"
    } else if (now < maghrib) {
      target = maghrib
      label = "Iftaar"
    } else {
      // Next day Fajr
      target = new Date(fajr)
      target.setDate(target.getDate() + 1)
      label = "Sehri"
    }

    const diff = target.getTime() - now.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((diff % (1000 * 60)) / 1000)

    setCountdown(`${pad(hours)}:${pad(minutes)}:${pad(seconds)}`)
    setNextEvent(label)
  }

  const pad = (num: number) => String(num).padStart(2, "0")

  return (
    <section className="py-8 bg-white dark:bg-gray-950 transition-colors">
      <div className="container mx-auto px-4 max-w-2xl">
        <h2 className="text-2xl font-bold text-center mb-6 text-green-800 dark:text-green-400 transition-colors">
          Ramadan Timings
        </h2>

        <div className="bg-white dark:bg-gray-900 border border-green-100 dark:border-green-800 rounded-lg shadow p-6 transition-colors">
          {!location ? (
            <div className="text-center">
              <p className="mb-4 text-green-800 dark:text-green-400">
                To see prayer times for your location, please enable location access.
              </p>
              <button
                onClick={getLocation}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors flex items-center gap-2"
              >
                <MapPin className="h-4 w-4" />
                Get My Location
              </button>
            </div>
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : times ? (
            <>
              <ul className="space-y-3 text-green-700 dark:text-green-400">
                <li>
                  <strong>Sehri (Fajr):</strong> {times.fajr}
                </li>
                <li>
                  <strong>Sunrise:</strong> {times.sunrise}
                </li>
                <li>
                  <strong>Iftaar (Maghrib):</strong> {times.maghrib}
                </li>
              </ul>

              <div className="mt-6 bg-green-50 dark:bg-green-900/20 rounded-md p-4 flex items-center justify-between transition-colors">
                <div className="flex items-center gap-2 text-green-800 dark:text-green-400">
                  <Clock className="h-5 w-5" />
                  <span>
                    Time left for <strong>{nextEvent}</strong>
                  </span>
                </div>
                <span className="font-mono font-bold text-green-700 dark:text-green-300 text-lg">
                  {countdown}
                </span>
              </div>
            </>
          ) : (
            <p className="text-green-800 dark:text-green-400">Loading prayer times...</p>
          )}
        </div>
      </div>
    </section>
  )
}

export default PrayerTimeTracker
