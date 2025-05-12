import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const latitude = searchParams.get("latitude")
    const longitude = searchParams.get("longitude")
    const date = searchParams.get("date") || new Date().toISOString().split("T")[0]

    // This would typically call an external API or calculate prayer times
    // For demonstration, returning mock data
    const prayerTimes = [
      { name: "Fajr", arabicName: "الفجر", time: "05:30 AM" },
      { name: "Dhuhr", arabicName: "الظهر", time: "12:30 PM" },
      { name: "Asr", arabicName: "العصر", time: "03:45 PM" },
      { name: "Maghrib", arabicName: "المغرب", time: "06:15 PM" },
      { name: "Isha", arabicName: "العشاء", time: "07:45 PM" },
    ]

    return NextResponse.json({ prayerTimes, date })
  } catch (error) {
    console.error("Error fetching prayer times:", error)
    return NextResponse.json({ error: "Failed to fetch prayer times" }, { status: 500 })
  }
}
