"use client"

import type React from "react"

import { useState, useEffect, use } from "react"
import { Clock, Calendar, MapPin, RefreshCw, AlertCircle } from "lucide-react"

// Prayer times interface
interface PrayerTime {
  name: string
  time: string
  arabicName: string
  isUpcoming?: boolean
}

// Hijri date interface
interface HijriDate {
  day: number
  month: string
  year: number
  monthArabic: string
  dayOfWeek: string
  monthNumber: number
}

// API response interfaces
interface AladhanTimings {
  Fajr: string
  Sunrise: string
  Dhuhr: string
  Asr: string
  Sunset: string
  Maghrib: string
  Isha: string
  Imsak: string
  Midnight: string
  Firstthird: string
  Lastthird: string
}

interface AladhanDate {
  readable: string
  timestamp: string
  hijri: {
    date: string
    format: string
    day: string
    weekday: { en: string; arabic: string }
    month: { number: number; en: string; ar: string }
    year: string
    designation: { abbreviated: string; expanded: string }
    holidays: string[]
  }
  gregorian: {
    date: string
    format: string
    day: string
    weekday: { en: string }
    month: { number: number; en: string }
    year: string
    designation: { abbreviated: string; expanded: string }
  }
}

interface AladhanResponse {
  code: number
  status: string
  data: {
    timings: AladhanTimings
    date: AladhanDate
    meta: {
      latitude: number
      longitude: number
      timezone: string
      method: {
        id: number
        name: string
        params: { [key: string]: number }
      }
      latitudeAdjustmentMethod: string
      midnightMode: string
      school: string
      offset: { [key: string]: number }
    }
  }
}

export default function PrayerAndCalendarSection() {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([])
  const [hijriDate, setHijriDate] = useState<HijriDate | null>(null)
  const [calendarDays, setCalendarDays] = useState<{ day: number; isCurrentDay: boolean }[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [city, setCity] = useState("Dhaka")
  const [country, setCountry] = useState("Bangladesh")
  const [showLocationSelector, setShowLocationSelector] = useState(false)
  const [tempCity, setTempCity] = useState("Dhaka")
  const [tempCountry, setTempCountry] = useState("Bangladesh")

useEffect(() => {
  // Ask permission to use geolocation and get the user's City and Country
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude
        const lon = position.coords.longitude

        fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`)
          .then((response) => response.json())
          .then((data) => {
            if (data && data.city && data.countryName) {
              setCity(data.city)
              setCountry(data.countryName)
            }
          })
          .catch((error) => console.error("Error fetching location:", error))
      },
      (error) => console.error("Geolocation error:", error)
    )
  } else {
    console.warn("Geolocation is not supported by this browser.")
  }

  // Default fallback
  if (!city || !country) {
    setCity("Dhaka")
    setCountry("Bangladesh")
  }

  // Removed this call to avoid duplication
  // fetchPrayerTimes()

}, [])


  // Format time from 24h to 12h format
  const formatTime = (time: string): string => {
    if (!time) return "N/A"

    const [hours, minutes] = time.split(":")
    const hour = Number.parseInt(hours, 10)
    const ampm = hour >= 12 ? "PM" : "AM"
    const formattedHour = hour % 12 || 12
    return `${formattedHour}:${minutes} ${ampm}`
  }

  // Check if a prayer time is upcoming
  const isUpcomingPrayer = (prayerTime: string): boolean => {
    if (!prayerTime) return false

    try {
      const now = new Date()
      const currentHours = now.getHours()
      const currentMinutes = now.getMinutes()

      const [prayerHours, prayerMinutes] = prayerTime.split(":").map((num) => Number.parseInt(num, 10))

      // If prayer is later today
      if (prayerHours > currentHours || (prayerHours === currentHours && prayerMinutes > currentMinutes)) {
        return true
      }
    } catch (err) {
      console.error("Error checking upcoming prayer:", err)
    }

    return false
  }

  // Generate fallback prayer times
  const generateFallbackPrayerTimes = (): PrayerTime[] => {
    return [
      {
        name: "Fajr",
        arabicName: "الفجر",
        time: "05:30 AM",
      },
      {
        name: "Dhuhr",
        arabicName: "الظهر",
        time: "12:30 PM",
      },
      {
        name: "Asr",
        arabicName: "العصر",
        time: "03:45 PM",
      },
      {
        name: "Maghrib",
        arabicName: "المغرب",
        time: "06:15 PM",
      },
      {
        name: "Isha",
        arabicName: "العشاء",
        time: "07:45 PM",
      },
    ]
  }

  // Fetch prayer times from API
  const fetchPrayerTimes = async () => {
    setLoading(true)
    setError(null)

    try {
      // Get current date in DD-MM-YYYY format
      const today = new Date()
      const day = String(today.getDate()).padStart(2, "0")
      const month = String(today.getMonth() + 1).padStart(2, "0")
      const year = today.getFullYear()
      const dateStr = `${day}-${month}-${year}`

      // Fetch data from API
      const response = await fetch(
        `https://api.aladhan.com/v1/timingsByCity/${dateStr}?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}&method=2`,
      )

      if (!response.ok) {
        throw new Error(`Failed to fetch prayer times: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      console.log("API Response:", data) // Log the response for debugging

      // Check if the response has the expected structure
      if (!data || data.code !== 200 || data.status !== "OK" || !data.data) {
        throw new Error(`API returned unexpected response: ${JSON.stringify(data)}`)
      }

      // Check if timings exist in the response
      if (!data.data.timings) {
        throw new Error("API response is missing prayer timings")
      }

      // Process prayer times
      const timings = data.data.timings

      // Check if hijri date exists in the response
      if (!data.data.date || !data.data.date.hijri) {
        throw new Error("API response is missing Hijri date information")
      }

      const hijriData = data.data.date.hijri

      // Create prayer times array with null checks
      const prayers: PrayerTime[] = [
        {
          name: "Fajr",
          arabicName: "الفجر",
          time: formatTime(timings.Fajr || ""),
          isUpcoming: isUpcomingPrayer(timings.Fajr || ""),
        },
        {
          name: "Dhuhr",
          arabicName: "الظهر",
          time: formatTime(timings.Dhuhr || ""),
          isUpcoming: isUpcomingPrayer(timings.Dhuhr || ""),
        },
        {
          name: "Asr",
          arabicName: "العصر",
          time: formatTime(timings.Asr || ""),
          isUpcoming: isUpcomingPrayer(timings.Asr || ""),
        },
        {
          name: "Maghrib",
          arabicName: "المغرب",
          time: formatTime(timings.Maghrib || ""),
          isUpcoming: isUpcomingPrayer(timings.Maghrib || ""),
        },
        {
          name: "Isha",
          arabicName: "العشاء",
          time: formatTime(timings.Isha || ""),
          isUpcoming: isUpcomingPrayer(timings.Isha || ""),
        },
      ]

      // Ensure only one prayer is marked as upcoming (the next one)
      let foundUpcoming = false
      const updatedPrayers = prayers.map((prayer) => {
        if (prayer.isUpcoming && !foundUpcoming) {
          foundUpcoming = true
          return prayer
        }
        return { ...prayer, isUpcoming: false }
      })

      setPrayerTimes(updatedPrayers)

      // Process Hijri date with null checks
      if (
        hijriData &&
        hijriData.day &&
        hijriData.month &&
        hijriData.month.en &&
        hijriData.month.ar &&
        hijriData.year &&
        hijriData.weekday &&
        hijriData.weekday.en &&
        hijriData.month.number
      ) {
        const hijri: HijriDate = {
          day: Number.parseInt(hijriData.day),
          month: hijriData.month.en,
          monthArabic: hijriData.month.ar,
          year: Number.parseInt(hijriData.year),
          dayOfWeek: hijriData.weekday.en,
          monthNumber: hijriData.month.number,
        }

        setHijriDate(hijri)

        // Generate calendar days
        generateCalendarDays(Number.parseInt(hijriData.day), hijriData.month.number)
      } else {
        // Generate fallback Hijri date if API data is incomplete
        generateFallbackHijriDate()
      }

      setLoading(false)
    } catch (err) {
      console.error("Error fetching prayer times:", err)
      setError(err instanceof Error ? err.message : "Failed to fetch prayer times")

      // Set fallback data if API fails
      setPrayerTimes(generateFallbackPrayerTimes())
      generateFallbackHijriDate()

      setLoading(false)
    }
  }

  // Generate fallback Hijri date
  const generateFallbackHijriDate = () => {
    const fallbackHijri: HijriDate = {
      day: 15,
      month: "Ramadan",
      monthArabic: "رمضان",
      year: 1445,
      dayOfWeek: "Monday",
      monthNumber: 9,
    }

    setHijriDate(fallbackHijri)
    generateCalendarDays(15, 9)
  }

  // Generate calendar days for the current Hijri month
  const generateCalendarDays = (currentDay: number, monthNumber: number) => {
    // Determine days in month (simplified - actual calculation is more complex)
    const daysInMonth = monthNumber % 2 === 0 ? 29 : 30

    // Determine first day of month (this is a simplification)
    // In a real app, you would calculate this properly based on the Hijri calendar
    const firstDayOfMonth = 4 // Assuming Thursday (4) is the first day

    const days = []

    // Add empty days for the first week
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push({ day: 0, isCurrentDay: false })
    }

    // Add the actual days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        isCurrentDay: i === currentDay,
      })
    }

    setCalendarDays(days)
  }

  // Handle location form submission
  const handleLocationSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setCity(tempCity)
    setCountry(tempCountry)
    setShowLocationSelector(false)
  }

  // Fetch prayer times on component mount and when location changes
  useEffect(() => {
    fetchPrayerTimes()
  }, [city, country])

  if (loading && !prayerTimes.length) {
    return (
      <section className="py-12 bg-white dark:bg-night-800 transition-colors">
        <div className="container mx-auto">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 dark:border-sand-500 mb-4"></div>
            <p className="dark:text-sand-300">Loading prayer times...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-8 bg-white dark:bg-night-800 transition-colors">
      <div className="container mx-auto px-4 max-w-7xl">
        <h2 className="text-2xl font-bold text-center mb-8 text-green-800 dark:font-bold dark:text-sand-300 transition-colors">
          Prayer Times & Hijri Calendar
        </h2>

        {error && (
          <div className="max-w-5xl mx-auto mb-6 p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/20 rounded-md text-red-700 dark:text-red-400 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">Error loading prayer times</p>
              <p className="text-sm">{error}</p>
              <button
                onClick={fetchPrayerTimes}
                className="mt-2 text-sm flex items-center gap-1 text-red-700 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
              >
                <RefreshCw className="h-3 w-3" /> Try again
              </button>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Prayer Times Card */}
          <div className="bg-white dark:bg-night-500 rounded-lg shadow border border-green-100 dark:border-night-300 overflow-hidden transition-colors">
            <div className="flex items-center justify-between p-4 border-b border-green-100 dark:border-night-300 bg-green-50 dark:bg-night-400 transition-colors">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-green-600 dark:text-sand-500" />
                <h3 className="font-medium text-green-800 dark:text-sand-300 transition-colors">Prayer Times</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowLocationSelector(!showLocationSelector)}
                  className="text-xs flex items-center gap-1 text-green-700 dark:text-sand-400 hover:text-green-800 dark:hover:text-sand-300 transition-colors"
                >
                  <MapPin className="h-3 w-3" />
                  {city}, {country}
                </button>
                <button
                  onClick={fetchPrayerTimes}
                  className="p-1 rounded-full hover:bg-green-100 dark:hover:bg-night-300 text-green-700 dark:text-sand-500 transition-colors"
                  aria-label="Refresh prayer times"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
              </div>
            </div>

            {showLocationSelector && (
              <div className="p-4 bg-green-50 dark:bg-night-400 border-b border-green-100 dark:border-night-300 transition-colors">
                <form onSubmit={handleLocationSubmit} className="flex flex-col sm:flex-row gap-2">
                  <div className="flex-1">
                    <label htmlFor="city" className="sr-only">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      placeholder="City"
                      value={tempCity}
                      onChange={(e) => setTempCity(e.target.value)}
                      className="w-full p-2 text-sm border border-green-200 dark:border-night-300 rounded-md bg-white dark:bg-night-400 text-green-900 dark:text-sand-200 focus:outline-none focus:ring-1 focus:ring-green-500 dark:focus:ring-sand-600 transition-colors"
                      required
                    />
                  </div>
                  <div className="flex-1">
                    <label htmlFor="country" className="sr-only">
                      Country
                    </label>
                    <input
                      type="text"
                      id="country"
                      placeholder="Country"
                      value={tempCountry}
                      onChange={(e) => setTempCountry(e.target.value)}
                      className="w-full p-2 text-sm border border-green-200 dark:border-night-300 rounded-md bg-white dark:bg-night-400 text-green-900 dark:text-sand-200 focus:outline-none focus:ring-1 focus:ring-green-500 dark:focus:ring-sand-600 transition-colors"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-2 bg-green-600 hover:bg-green-700 dark:bg-sand-700 dark:hover:bg-sand-600 text-white dark:text-sand-100 text-sm rounded-md transition-colors"
                  >
                    Update
                  </button>
                </form>
              </div>
            )}

            <div className="p-4">
              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 dark:border-sand-500"></div>
                </div>
              ) : (
                <div className="grid gap-4">
                  {prayerTimes.map((prayer) => (
                    <div
                      key={prayer.name}
                      className={`flex justify-between items-center py-3 ${
                        prayer.isUpcoming ? "bg-green-50 dark:bg-night-300 rounded-md px-3" : ""
                      } transition-colors`}
                    >
                      <div className="flex flex-col">
                        <span className="font-medium text-green-800 dark:text-sand-300 transition-colors">
                          {prayer.name}
                        </span>
                        <span className="text-sm text-green-600 dark:text-sand-400 transition-colors">
                          {prayer.arabicName}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-green-800 dark:text-sand-300 font-medium transition-colors">
                          {prayer.time}
                        </span>
                        {prayer.isUpcoming && (
                          <div className="text-xs text-green-600 dark:text-sand-500 mt-1 transition-colors">
                            Upcoming
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Hijri Calendar Card */}
          <div className="bg-white dark:bg-night-500 rounded-lg shadow border border-green-100 dark:border-night-300 overflow-hidden transition-colors">
            <div className="flex items-center gap-2 p-4 border-b border-green-100 dark:border-night-300 bg-green-50 dark:bg-night-400 transition-colors">
              <Calendar className="h-5 w-5 text-green-600 dark:text-sand-500" />
              <h3 className="font-medium text-green-800 dark:text-sand-300 transition-colors">Hijri Calendar</h3>
            </div>
            <div className="p-4">
              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 dark:border-sand-500"></div>
                </div>
              ) : hijriDate ? (
                <>
                  <div className="text-center mb-4">
                    <h4 className="text-lg font-medium text-green-800 dark:text-sand-300 transition-colors">
                      {hijriDate.month} {hijriDate.year}
                    </h4>
                    <p className="text-green-600 dark:text-sand-400 text-sm arabic-text transition-colors">
                      {hijriDate.monthArabic} {hijriDate.year}
                    </p>
                    <p className="mt-2 text-sm text-green-700 dark:text-sand-400 transition-colors">
                      Today: {hijriDate.dayOfWeek}, {hijriDate.day} {hijriDate.month} {hijriDate.year}
                    </p>
                  </div>

                  <div className="grid grid-cols-7 text-center text-sm">
                    {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                      <div key={day} className="font-medium py-2 text-green-700 dark:text-sand-500 transition-colors">
                        {day}
                      </div>
                    ))}

                    {calendarDays.map((day, index) => (
                      <div
                        key={index}
                        className={`py-2 ${
                          day.day === 0
                            ? ""
                            : day.isCurrentDay
                              ? "bg-green-600 dark:bg-sand-700 text-white dark:text-night-600 rounded-full w-8 h-8 flex items-center justify-center mx-auto"
                              : "text-green-800 dark:text-sand-300 hover:bg-green-50 dark:hover:bg-night-300"
                        } transition-colors`}
                      >
                        {day.day !== 0 ? day.day : ""}
                      </div>
                    ))}
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}