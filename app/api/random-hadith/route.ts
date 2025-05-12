import { NextResponse } from "next/server"

export async function GET() {
  try {
    // This would typically fetch from a database
    // For demonstration, returning mock data
    const randomHadith = {
      narrator: "Abu Hurairah",
      text: "The Messenger of Allah (ﷺ) said, 'When a person dies, his deeds come to an end except for three: Sadaqah Jariyah (ceaseless charity), knowledge which is beneficial, or a virtuous descendant who prays for him (the deceased).'",
      source: "Sahih Muslim",
      book: "The Book of Wills",
      number: 1631,
    }

    return NextResponse.json(randomHadith)
  } catch (error) {
    console.error("Error fetching random hadith:", error)
    return NextResponse.json({ error: "Failed to fetch random hadith" }, { status: 500 })
  }
}
