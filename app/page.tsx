import Header from "@/components/header"
import PrayerAndCalendarSection from "@/components/prayer-and-calendar-section"
import QuranSection from "@/components/quran-section"
import HadithSection from "@/components/hadith-section"
import QiblaFinder from "@/components/qibla-finder"
import Footer from "@/components/footer"
import SehriIftaarTimes from "@/components/sehri-iftaar-times"
import PrayerTimeTracker from "@/components/sehri&iftaar-time-tracker"

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex flex-col">
      <Header />
      <main className="flex-grow">
        <PrayerAndCalendarSection />
        <QuranSection />
        <HadithSection />
        <div className="container justify-center flex flex-col md:flex-row gap-4">
          <QiblaFinder />
          <PrayerTimeTracker />
        </div>

      </main>
      <Footer />
    </div>
  )
}
