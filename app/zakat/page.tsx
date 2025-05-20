import Header from "@/components/header"
import Footer from "@/components/footer"
import ZakatCalculator from "@/components/zakat-calculator"
import ZakatInfo from "@/components/zakat-info"

export default function ZakatPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-night-700 flex flex-col transition-colors">
      <Header />
      <main className="flex-grow">
        <div className="bg-green-50 dark:bg-night-600 py-12 transition-colors">
          <div className="container mx-auto px-4 max-w-7xl">
            <h1 className="text-3xl md:text-4xl font-bold text-green-800 dark:font-bold dark:text-sand-300 mb-4 section-title transition-colors">
              Zakat Calculator
            </h1>
            <p className="text-green-700 dark:text-sand-400 max-w-3xl card-subtitle transition-colors">
              Calculate your Zakat obligation accurately and learn about the importance of this essential pillar of
              Islam.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 order-2 md:order-2">
              <ZakatInfo />
            </div>
            <div className="md:col-span-1 order-1 md:order-1">
              <ZakatCalculator />
            </div>
          </div>
        </div>
{/* 
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="mb-12 max-w-4xl mx-auto">
            <ZakatCalculator />
          </div>
          <ZakatInfo />
        </div> */}

      </main>
      <Footer />
    </div>
  )
}
