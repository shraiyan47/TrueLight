import { NextResponse } from "next/server"

export async function GET() {
  try {
    // This would typically fetch from a database
    // For demonstration, returning mock data
    const randomAyah = {
      surah: "Al-Baqarah",
      number: 286,
      arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ",
      translation: "Allah - there is no deity except Him, the Ever-Living, the Sustainer of existence.",
      reference: "Surah Al-Baqarah, Ayah 255",
    }

    return NextResponse.json(randomAyah)
  } catch (error) {
    console.error("Error fetching random ayah:", error)
    return NextResponse.json({ error: "Failed to fetch random ayah" }, { status: 500 })
  }
}
