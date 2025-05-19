import Header from "@/components/header"
import Footer from "@/components/footer"
import RamadanTimings from "@/components/ramadan-timings"
import RamadanDuas from "@/components/ramadan-duas"
import RamadanInfo from "@/components/ramadan-info"


export default function RamadanPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-night-700 flex flex-col transition-colors">
      <Header />
      <main className="flex-grow">
        <div className="bg-green-50 dark:bg-night-600 py-12 transition-colors">
          <div className="container mx-auto px-4 max-w-7xl">
            <h1 className="text-3xl md:text-4xl font-bold text-green-800 dark:font-bold dark:text-sand-300 mb-4 section-title transition-colors">
              Ramadan Timings
            </h1>
            <p className="text-green-700 dark:text-sand-400 max-w-3xl card-subtitle transition-colors">
              Track Sehri (Suhoor) and Iftar times for Ramadan based on your location, along with essential duas and
              information about the blessed month.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <RamadanTimings />
          <RamadanDuas />
          <RamadanInfo />
        </div>
      </main>
      <Footer />
    </div>
  )
}
