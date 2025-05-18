import Footer from "@/components/footer"
import Header from "@/components/header"
import QuranViewer from "@/components/quran-viewer"


export default function QuranPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-night-700 flex flex-col transition-colors">
      <Header />
      <main className="flex-grow">
        <div className="bg-green-50 dark:bg-night-700 py-0 transition-colors">
        <div className="container mx-auto px-4 max-w-7xl py-8">
          <h1 className="text-3xl font-bold text-center mb-2 text-green-800 dark:font-bold dark:text-sand-300 transition-colors">Read the Quran</h1>
          <p className="text-center text-green-700 dark:text-sand-400 mb-8 max-w-2xl mx-auto">
            Explore the Holy Quran with translations and recitations. Navigate Surahs and Ayahs with ease and deepen your understanding of the divine message.
          </p>
        </div>
        <QuranViewer />
        </div>
      </main>
      {/* <Footer /> */}
    </div>
  )
}
