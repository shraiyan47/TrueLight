import PrayerAndCalendarSection from "@/components/prayer-and-calendar-section"
import QuranSection from "@/components/quran-section"
import HadithSection from "@/components/hadith-section"

export default async function Home() {
  // Fetch random Quran ayah for the day
  const randomAyah = await getRandomAyah()

  // Fetch random Hadith for the day
  const randomHadith = await getRandomHadith()

  return (
    <div className="container mx-auto px-4">
      <PrayerAndCalendarSection />
      <QuranSection randomAyah={randomAyah} />
      <HadithSection randomHadith={randomHadith} />
    </div>
  )
}

// Function to get a random Quran ayah
async function getRandomAyah() {
  try {
    // This would typically fetch from your database or an API
    // For now, returning a sample ayah
    return {
      surah: "Al-Baqarah",
      number: 286,
      arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ",
      translation: "Allah - there is no deity except Him, the Ever-Living, the Sustainer of existence.",
      reference: "Surah Al-Baqarah, Ayah 255",
    }
  } catch (error) {
    console.error("Error fetching random ayah:", error)
    return {
      surah: "Al-Fatiha",
      number: 1,
      arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      translation: "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
      reference: "Surah Al-Fatiha, Ayah 1",
    }
  }
}

// Function to get a random Hadith
async function getRandomHadith() {
  try {
    // This would typically fetch from your database or an API
    // For now, returning a sample hadith
    return {
      narrator: "Abu Hurairah",
      text: "The Messenger of Allah (ﷺ) said, 'When a person dies, his deeds come to an end except for three: Sadaqah Jariyah (ceaseless charity), knowledge which is beneficial, or a virtuous descendant who prays for him (the deceased).'",
      source: "Sahih Muslim",
      book: "The Book of Wills",
      number: 1631,
    }
  } catch (error) {
    console.error("Error fetching random hadith:", error)
    return {
      narrator: "Abdullah ibn Umar",
      text: "The Messenger of Allah (ﷺ) said: 'Islam is built upon five: testifying that there is no god but Allah and that Muhammad is the Messenger of Allah, establishing the prayer, paying the Zakah, making the pilgrimage to the House, and fasting in Ramadan.'",
      source: "Sahih al-Bukhari",
      book: "Book of Faith",
      number: 8,
    }
  }
}
