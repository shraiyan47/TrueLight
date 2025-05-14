"use client"

import { useEffect, useState } from "react"
import { Sunrise, Sunset, Clock, MapPin } from "lucide-react"

type Timings = {
  Fajr: string
  Maghrib: string
  Sunrise: string
}

export default function SehriIftaarTimes() {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [timings, setTimings] = useState<Timings | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [timeRemaining, setTimeRemaining] = useState<{ sehri: string; iftaar: string }>({ sehri: "", iftaar: "" })

  // Get location
  const getLocation = () => {
    setLoading(true)
    setError(null)

    if (!navigator.geolocation) {
      setError("Geolocation not supported")
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        setLocation({ lat: latitude, lng: longitude })
        setLoading(false)
      },
      (err) => {
        console.error(err)
        setError("Unable to get location")
        setLoading(false)
      },
    )
  }

  // Fetch prayer timings
  const fetchPrayerTimes = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lng}&method=2`,
      )
      const data = await response.json()
      if (data.code === 200) {
        const t = data.data.timings
        setTimings({ Fajr: t.Fajr, Maghrib: t.Maghrib, Sunrise: t.Sunrise })
      } else {
        throw new Error("Failed to fetch timings")
      }
    } catch (err) {
      console.error(err)
      setError("Error fetching prayer times")
    }
  }

  // Calculate remaining time
  const updateTimeRemaining = (timings: Timings) => {
    const now = new Date()

    const getTimeLeft = (timeStr: string) => {
      const [hours, minutes] = timeStr.split(":").map(Number)
      const target = new Date()
      target.setHours(hours, minutes, 0, 0)
      if (target < now) target.setDate(target.getDate() + 1) // if passed, use tomorrow
      const diffMs = target.getTime() - now.getTime()
      const hoursLeft = Math.floor(diffMs / (1000 * 60 * 60))
      const minsLeft = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
      return `${hoursLeft}h ${minsLeft}m`
    }

    setTimeRemaining({
      sehri: getTimeLeft(timings.Fajr),
      iftaar: getTimeLeft(timings.Maghrib),
    })
  }

  useEffect(() => {
    if (location) {
      fetchPrayerTimes(location.lat, location.lng)
    }
  }, [location])

  useEffect(() => {
    if (timings) {
      updateTimeRemaining(timings)
      const interval = setInterval(() => updateTimeRemaining(timings), 60000) // update every minute
      return () => clearInterval(interval)
    }
  }, [timings])

  return (
    <section className="py-8 bg-white dark:bg-gray-950 transition-colors">
      <div className="container mx-auto px-4 max-w-2xl">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-800 dark:text-blue-400 transition-colors">
          Sehri & Iftaar Times
        </h2>

        <div className="bg-white dark:bg-gray-900 border border-blue-100 dark:border-blue-900 rounded-lg shadow p-6 transition-colors">
          {!location ? (
            <div className="text-center">
              <p className="mb-4 text-blue-700 dark:text-blue-400">
                To view accurate timings, please allow location access.
              </p>
              <button
                onClick={getLocation}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center gap-2 mx-auto"
              >
                <MapPin className="h-4 w-4" />
                Get My Location
              </button>
            </div>
          ) : loading ? (
            <p className="text-center text-blue-600 dark:text-blue-300">Loading timings...</p>
          ) : error ? (
            <p className="text-center text-red-600">{error}</p>
          ) : timings ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-md">
                <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-1">Sehri (Fajr)</h3>
                <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400">
                  <Clock className="h-4 w-4" /> {timings.Fajr}
                </div>
                <p className="mt-1 text-sm text-blue-600 dark:text-blue-400">
                  Time remaining: {timeRemaining.sehri}
                </p>
              </div>

              <div className="bg-orange-50 dark:bg-orange-950/30 p-4 rounded-md">
                <h3 className="font-semibold text-orange-800 dark:text-orange-300 mb-1">Iftaar (Maghrib)</h3>
                <div className="flex items-center gap-2 text-orange-700 dark:text-orange-400">
                  <Sunset className="h-4 w-4" /> {timings.Maghrib}
                </div>
                <p className="mt-1 text-sm text-orange-600 dark:text-orange-400">
                  Time remaining: {timeRemaining.iftaar}
                </p>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-950/30 p-4 rounded-md col-span-1 sm:col-span-2">
                <h3 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-1">Sunrise</h3>
                <div className="flex items-center gap-2 text-yellow-700 dark:text-yellow-400">
                  <Sunrise className="h-4 w-4" /> {timings.Sunrise}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
