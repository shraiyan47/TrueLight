import { NextResponse } from "next/server"

export async function GET() {
  try {
    // This would typically call an external API or calculate Hijri date
    // For demonstration, returning mock data
    const hijriDate = {
      day: 15,
      month: "Ramadan",
      monthArabic: "رمضان",
      year: 1445,
      dayOfWeek: "Monday",
    }

    return NextResponse.json(hijriDate)
  } catch (error) {
    console.error("Error fetching Hijri date:", error)
    return NextResponse.json({ error: "Failed to fetch Hijri date" }, { status: 500 })
  }
}
