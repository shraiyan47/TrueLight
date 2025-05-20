"use client"

import { useState, useEffect } from "react"
import { MapPin, Calendar, Clock, Sunrise, Sunset, AlertCircle, RefreshCw, Loader2 } from "lucide-react"

interface TimingsData {
  fajr: string // Sehri/Suhoor time
  sunrise: string
  sunset: string
  maghrib: string // Iftar time
  date: string
  hijriDate: string
  hijriMonth: string
  hijriYear: number
}

interface CountdownState {
  type: "sehri" | "iftar"
  hours: number
  minutes: number
  seconds: number
}

export default function RamadanTimings() {
  const [location, setLocation] = useState<{ lat: number; lng: number; name: string } | null>(null)
  const [timings, setTimings] = useState<TimingsData | null>(null)
  const [countdown, setCountdown] = useState<CountdownState | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [locationPermission, setLocationPermission] = useState<"granted" | "denied" | "prompt" | null>(null)

  // Get user's location
  const getUserLocation = () => {
    setLoading(true)
    setError(null)

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser")
      setLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords

          // Get location name from coordinates using reverse geocoding
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`,
          )
          const data = await response.json()

          const locationName = data.address
            ? `${data.address.city || data.address.town || data.address.village || data.address.county || "Unknown"}, ${data.address.country || "Unknown"}`
            : "Your Location"

          setLocation({
            lat: latitude,
            lng: longitude,
            name: locationName,
          })

          setLocationPermission("granted")
          fetchPrayerTimes(latitude, longitude)
        } catch (err) {
          console.error("Error getting location name:", err)
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            name: "Your Location",
          })
          fetchPrayerTimes(position.coords.latitude, position.coords.longitude)
        }
      },
      (err) => {
        console.error("Error getting location:", err)
        setError(
          err.code === 1
            ? "Location permission denied. Please enable location services to get accurate timings."
            : "Could not get your location. Please try again.",
        )
        setLoading(false)
        setLocationPermission("denied")
      },
    )
  }

  // Fetch prayer times from API
  const fetchPrayerTimes = async (latitude: number, longitude: number) => {
    try {
      // Get current date
      const today = new Date()
      const day = today.getDate()
      const month = today.getMonth() + 1
      const year = today.getFullYear()

      // Fetch prayer times from Aladhan API
      const response = await fetch(
        `https://api.aladhan.com/v1/timings/${day}-${month}-${year}?latitude=${latitude}&longitude=${longitude}&method=2`,
      )

      if (!response.ok) {
        throw new Error(`Failed to fetch prayer times: ${response.status}`)
      }

      const data = await response.json()

      if (data.code === 200 && data.status === "OK") {
        const timingsData: TimingsData = {
          fajr: formatTime(data.data.timings.Fajr),
          sunrise: formatTime(data.data.timings.Sunrise),
          sunset: formatTime(data.data.timings.Sunset),
          maghrib: formatTime(data.data.timings.Maghrib),
          date: formatDate(today),
          hijriDate: data.data.date.hijri.day,
          hijriMonth: data.data.date.hijri.month.en,
          hijriYear: Number.parseInt(data.data.date.hijri.year),
        }

        setTimings(timingsData)
        setLoading(false)
      } else {
        throw new Error("Failed to fetch prayer times")
      }
    } catch (err) {
      console.error("Error fetching prayer times:", err)
      setError("Failed to fetch prayer times. Please try again later.")
      setLoading(false)
    }
  }

  // Format time from 24h to 12h format
  const formatTime = (time: string): string => {
    if (!time) return "N/A"

    const [hours, minutes] = time.split(":")
    const hour = Number.parseInt(hours, 10)
    const ampm = hour >= 12 ? "PM" : "AM"
    const formattedHour = hour % 12 || 12
    return `${formattedHour}:${minutes} ${ampm}`
  }

  // Format date
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // Parse time string to Date object
  const parseTimeToDate = (timeStr: string): Date => {
    const today = new Date()
    const [time, period] = timeStr.split(" ")
    const [hours, minutes] = time.split(":")

    let hour = Number.parseInt(hours, 10)
    if (period === "PM" && hour !== 12) hour += 12
    if (period === "AM" && hour === 12) hour = 0

    today.setHours(hour, Number.parseInt(minutes, 10), 0, 0)
    return today
  }

  // Calculate time remaining until next event
  const calculateTimeRemaining = () => {
    if (!timings) return

    const now = new Date()
    const sehriTime = parseTimeToDate(timings.fajr)
    const iftarTime = parseTimeToDate(timings.maghrib)

    // If it's after Iftar but before midnight, or after midnight but before Sehri
    if (now > iftarTime || now < sehriTime) {
      // Calculate time until Sehri
      let timeUntilSehri: number

      if (now > iftarTime) {
        // After Iftar but before midnight
        // We need to add a day to Sehri time
        const tomorrowSehri = new Date(sehriTime)
        tomorrowSehri.setDate(tomorrowSehri.getDate() + 1)
        timeUntilSehri = tomorrowSehri.getTime() - now.getTime()
      } else {
        // After midnight but before Sehri
        timeUntilSehri = sehriTime.getTime() - now.getTime()
      }

      const hours = Math.floor(timeUntilSehri / (1000 * 60 * 60))
      const minutes = Math.floor((timeUntilSehri % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((timeUntilSehri % (1000 * 60)) / 1000)

      setCountdown({
        type: "sehri",
        hours,
        minutes,
        seconds,
      })
    } else {
      // It's after Sehri but before Iftar
      const timeUntilIftar = iftarTime.getTime() - now.getTime()
      const hours = Math.floor(timeUntilIftar / (1000 * 60 * 60))
      const minutes = Math.floor((timeUntilIftar % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((timeUntilIftar % (1000 * 60)) / 1000)

      setCountdown({
        type: "iftar",
        hours,
        minutes,
        seconds,
      })
    }
  }

  // Initialize location and timings
  useEffect(() => {
    getUserLocation()

    // Check for location permission
    if (navigator.permissions && navigator.permissions.query) {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        setLocationPermission(result.state as "granted" | "denied" | "prompt")
      })
    }
  }, [])

  // Update countdown timer every second
  useEffect(() => {
    if (!timings) return

    calculateTimeRemaining()
    const interval = setInterval(calculateTimeRemaining, 1000)

    return () => clearInterval(interval)
  }, [timings])

  return (
    <div className="mb-12">
      <div className="bg-white dark:bg-night-500 rounded-lg shadow border border-green-100 dark:border-night-300 overflow-hidden card-bg transition-colors">
        <div className="flex items-center justify-between p-4 border-b border-green-100 dark:border-night-200 bg-green-50 dark:bg-night-300 card-header transition-colors">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-green-600 dark:text-sand-400 icon-primary transition-colors" />
            <h2 className="font-medium text-green-800 dark:text-sand-300 card-title transition-colors">
              Ramadan Timings
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {location && (
              <div className="flex items-center gap-1 text-sm text-green-700 dark:text-sand-400 card-subtitle transition-colors">
                <MapPin className="h-4 w-4" />
                <span>{location.name}</span>
              </div>
            )}
            <button
              onClick={getUserLocation}
              className="p-1 rounded-full hover:bg-green-100 dark:hover:bg-night-200 text-green-700 dark:text-sand-400 transition-colors"
              aria-label="Refresh location and timings"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>
        </div>

        {error && (
          <div className="p-4 m-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900 rounded-md text-red-700 dark:text-red-400 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">Error loading Ramadan timings</p>
              <p className="text-sm">{error}</p>
              {locationPermission === "denied" && (
                <p className="text-sm mt-2">
                  Please enable location services in your browser settings to get accurate timings for your location.
                </p>
              )}
              <button
                onClick={getUserLocation}
                className="mt-2 text-sm flex items-center gap-1 text-red-700 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
              >
                <RefreshCw className="h-3 w-3" /> Try again
              </button>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="h-10 w-10 text-green-600 dark:text-sand-500 animate-spin mb-4" />
            <p className="text-green-800 dark:text-sand-300 card-title transition-colors">
              Loading Ramadan timings for your location...
            </p>
          </div>
        ) : timings && !error ? (
          <div className="p-6">
            {/* Date display */}
            <div className="text-center mb-8">
              <p className="text-green-700 dark:text-sand-400 card-subtitle transition-colors">{timings.date}</p>
              <p className="text-lg font-medium text-green-800 dark:text-sand-300 card-title transition-colors">
                {timings.hijriDate} {timings.hijriMonth} {timings.hijriYear} AH
              </p>
            </div>

            {/* Countdown timer */}
            {countdown && (
              <div className="mb-8">
                <div className="text-center mb-3">
                  <h3 className="text-lg font-medium text-green-800 dark:text-sand-300 card-title transition-colors">
                    Time Remaining Until {countdown.type === "sehri" ? "Sehri (Suhoor)" : "Iftar"}
                  </h3>
                </div>

                <div className="flex justify-center gap-4 text-center">
                  <div className="w-20 p-3 bg-green-50 dark:bg-night-400 rounded-lg">
                    <div className="text-2xl font-bold text-green-800 dark:text-sand-300 card-title transition-colors">
                      {countdown.hours.toString().padStart(2, "0")}
                    </div>
                    <div className="text-xs text-green-600 dark:text-sand-500 card-muted transition-colors">HOURS</div>
                  </div>

                  <div className="w-20 p-3 bg-green-50 dark:bg-night-400 rounded-lg">
                    <div className="text-2xl font-bold text-green-800 dark:text-sand-300 card-title transition-colors">
                      {countdown.minutes.toString().padStart(2, "0")}
                    </div>
                    <div className="text-xs text-green-600 dark:text-sand-500 card-muted transition-colors">
                      MINUTES
                    </div>
                  </div>

                  <div className="w-20 p-3 bg-green-50 dark:bg-night-400 rounded-lg">
                    <div className="text-2xl font-bold text-green-800 dark:text-sand-300 card-title transition-colors">
                      {countdown.seconds.toString().padStart(2, "0")}
                    </div>
                    <div className="text-xs text-green-600 dark:text-sand-500 card-muted transition-colors">
                      SECONDS
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Timings display */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Sehri and Sunrise */}
              <div className="bg-green-50 dark:bg-night-400 rounded-lg p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-night-300 flex items-center justify-center">
                      <Sunrise className="h-5 w-5 text-green-600 dark:text-sand-400 icon-primary transition-colors" />
                    </div>
                    <div>
                      <h3 className="font-medium text-green-800 dark:text-sand-300 card-title transition-colors">
                        Sehri (Suhoor) Ends
                      </h3>
                      <p className="text-sm text-green-600 dark:text-sand-500 card-muted transition-colors">
                        Begin fasting at this time
                      </p>
                    </div>
                  </div>
                  <div className="text-xl font-bold text-green-800 dark:text-sand-300 card-title transition-colors">
                    {timings.fajr}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-green-200 dark:border-night-300 divider transition-colors">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-green-600 dark:text-sand-400 icon-primary transition-colors" />
                    <span className="text-green-700 dark:text-sand-400 card-subtitle transition-colors">Sunrise</span>
                  </div>
                  <span className="font-medium text-green-800 dark:text-sand-300 card-title transition-colors">
                    {timings.sunrise}
                  </span>
                </div>
              </div>

              {/* Iftar and Sunset */}
              <div className="bg-green-50 dark:bg-night-400 rounded-lg p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-night-300 flex items-center justify-center">
                      <Sunset className="h-5 w-5 text-green-600 dark:text-sand-400 icon-primary transition-colors" />
                    </div>
                    <div>
                      <h3 className="font-medium text-green-800 dark:text-sand-300 card-title transition-colors">
                        Iftar Time
                      </h3>
                      <p className="text-sm text-green-600 dark:text-sand-500 card-muted transition-colors">
                        Break your fast at this time
                      </p>
                    </div>
                  </div>
                  <div className="text-xl font-bold text-green-800 dark:text-sand-300 card-title transition-colors">
                    {timings.maghrib}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-green-200 dark:border-night-300 divider transition-colors">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-green-600 dark:text-sand-400 icon-primary transition-colors" />
                    <span className="text-green-700 dark:text-sand-400 card-subtitle transition-colors">Sunset</span>
                  </div>
                  <span className="font-medium text-green-800 dark:text-sand-300 card-title transition-colors">
                    {timings.sunset}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-green-100 dark:border-night-300 divider transition-colors">
              <p className="text-sm text-green-700 dark:text-sand-400 card-subtitle transition-colors">
                <strong>Note:</strong> These timings are calculated based on your current location. Slight variations
                may occur based on local practices. It's recommended to verify with your local mosque or Islamic center.
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
