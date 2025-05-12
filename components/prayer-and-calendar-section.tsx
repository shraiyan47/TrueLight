"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, CalendarIcon } from "lucide-react"

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
}

export default function PrayerAndCalendarSection() {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([])
  const [hijriDate, setHijriDate] = useState<HijriDate | null>(null)
  const [calendarDays, setCalendarDays] = useState<{ day: number; isCurrentDay: boolean }[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching prayer times
    const fetchPrayerTimes = () => {
      // This would be replaced with an actual API call
      const currentTime = new Date()
      const hours = currentTime.getHours()

      const times: PrayerTime[] = [
        {
          name: "Fajr",
          arabicName: "الفجر",
          time: "05:30 AM",
          isUpcoming: hours < 5 || (hours === 5 && currentTime.getMinutes() < 30),
        },
        {
          name: "Dhuhr",
          arabicName: "الظهر",
          time: "12:30 PM",
          isUpcoming: hours < 12 || (hours === 12 && currentTime.getMinutes() < 30 && hours >= 5),
        },
        {
          name: "Asr",
          arabicName: "العصر",
          time: "03:45 PM",
          isUpcoming: hours < 15 || (hours === 15 && currentTime.getMinutes() < 45 && hours >= 12),
        },
        {
          name: "Maghrib",
          arabicName: "المغرب",
          time: "06:15 PM",
          isUpcoming: hours < 18 || (hours === 18 && currentTime.getMinutes() < 15 && hours >= 15),
        },
        {
          name: "Isha",
          arabicName: "العشاء",
          time: "07:45 PM",
          isUpcoming: hours < 19 || (hours === 19 && currentTime.getMinutes() < 45 && hours >= 18),
        },
      ]

      // Ensure only one prayer time is marked as upcoming
      let foundUpcoming = false
      const updatedTimes = times.map((time) => {
        if (time.isUpcoming && !foundUpcoming) {
          foundUpcoming = true
          return time
        }
        return { ...time, isUpcoming: false }
      })

      setPrayerTimes(updatedTimes)
    }

    // Simulate fetching Hijri date
    const fetchHijriDate = () => {
      // This would be replaced with an actual API call
      setHijriDate({
        day: 15,
        month: "Ramadan",
        monthArabic: "رمضان",
        year: 1445,
        dayOfWeek: "Monday",
      })

      // Generate calendar days for current month
      const daysInMonth = 30 // Assuming 30 days in Ramadan
      const days = Array.from({ length: daysInMonth }, (_, i) => ({
        day: i + 1,
        isCurrentDay: i + 1 === 15, // Current day is 15th
      }))

      setCalendarDays(days)
    }

    fetchPrayerTimes()
    fetchHijriDate()
    setLoading(false)

    // Set up interval to update prayer times
    const interval = setInterval(fetchPrayerTimes, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <section className="py-12">
        <div className="container">
          <div className="text-center">
            <p>Loading prayer times and calendar...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-8">Prayer Times & Hijri Calendar</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Prayer Times Card */}
          <Card className="shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Prayer Times
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {prayerTimes.map((prayer) => (
                  <div key={prayer.name} className={`prayer-time-card ${prayer.isUpcoming ? "upcoming" : ""}`}>
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{prayer.name}</h3>
                        <p className="text-sm text-muted-foreground arabic-text">{prayer.arabicName}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold">{prayer.time}</p>
                        {prayer.isUpcoming && <span className="text-xs text-primary font-medium">Upcoming</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Hijri Calendar Card */}
          <Card className="shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-primary" />
                Hijri Calendar
              </CardTitle>
            </CardHeader>
            <CardContent>
              {hijriDate && (
                <div className="mb-6">
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold">
                      {hijriDate.month} {hijriDate.year}
                    </h3>
                    <p className="text-lg arabic-text">
                      {hijriDate.monthArabic} {hijriDate.year}
                    </p>
                    <p className="mt-2 text-muted-foreground">
                      Today: {hijriDate.dayOfWeek}, {hijriDate.day} {hijriDate.month} {hijriDate.year}
                    </p>
                  </div>

                  <div className="grid grid-cols-7 gap-1 text-center">
                    {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                      <div key={day} className="font-medium text-sm py-2">
                        {day}
                      </div>
                    ))}

                    {/* Add empty cells for days before the 1st of the month */}
                    {Array.from({ length: 1 }).map((_, i) => (
                      <div key={`empty-${i}`} className="calendar-day"></div>
                    ))}

                    {calendarDays.map((day) => (
                      <div key={`day-${day.day}`} className={`calendar-day ${day.isCurrentDay ? "current" : ""}`}>
                        {day.day}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
