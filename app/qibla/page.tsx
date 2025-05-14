import Footer from "@/components/footer"
import Header from "@/components/header"
import QiblaFinder from "@/components/qibla-finder"

export default function QiblaPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 max-w-7xl py-8 max-w-7xl">
          <h1 className="text-3xl font-bold text-center mb-2 text-green-800 dark:text-green-400">Qibla Direction</h1>
          <p className="text-center text-green-700 dark:text-green-500 mb-8 max-w-2xl mx-auto">
            Find the direction to the Kaaba in Mecca from your current location. The Qibla is the direction that Muslims
            face during prayer (Salah).
          </p>
        </div>
        <QiblaFinder />
      </main>
      <Footer />
    </div>
  )
}
