import Header from "@/components/header"
import Footer from "@/components/footer"
import DuaFinder from "@/components/dua-finder"

export default function DuasPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-night-700 flex flex-col transition-colors">
      <Header />
      <main className="flex-grow">
        <div className="bg-green-50 dark:bg-night-600 py-12 transition-colors">
          <div className="container mx-auto px-4 max-w-7xl">
            <h1 className="text-3xl md:text-4xl font-bold text-green-800 dark:font-bold dark:text-sand-300 mb-4 section-title transition-colors">
              Dua Collection
            </h1>
            <p className="text-green-700 dark:text-sand-400 max-w-3xl card-subtitle transition-colors">
              Find the appropriate duas to match your current situation. Duas are powerful supplications that connect
              you with Allah in times of need, gratitude, and worship.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <DuaFinder />
        </div>
      </main>
      <Footer />
    </div>
  )
}
