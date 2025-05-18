import { Calendar, Calculator, Compass, ExternalLink, FileText, HelpCircle, Book, Moon } from "lucide-react"
import Link from "next/link"

export default function IslamicTools() {
    return (
        <div className="py-8 bg-gray-50 dark:bg-night-800 transition-colors">
            <main className="flex-grow">
                <div className="container mx-auto px-4 max-w-7xl">
                    <h1 className="text-2xl font-bold text-center mb-2 text-green-800 dark:font-bold dark:text-sand-300 transition-colors">Islamic Tools</h1>
                    <p className="text-center text-green-700 dark:text-sand-400 mb-8 max-w-2xl mx-auto">
                        Essential Islamic tools to help you in your daily worship and spiritual practices.
                    </p>

                    {/* Quick Links Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mb-4 max-w-5xl mx-auto">

                        {/* Qibla Finder */}
                        <div className="bg-white dark:bg-night-500 rounded-lg shadow border border-green-100 dark:border-night-300 p-6 flex flex-col items-center text-center transition-colors">
                            <div className="w-14 h-14 bg-green-50 dark:bg-night-300 rounded-full flex items-center justify-center mb-4">
                                <Compass className="h-7 w-7 text-green-600 dark:text-sand-400" />
                            </div>
                            <h3 className="text-xl font-medium text-green-800 dark:text-sand-300 mb-2">Qibla Finder</h3>
                            <p className="text-green-700 dark:text-sand-400 mb-4">
                                Find the direction to the Kaaba in Mecca from your current location.
                            </p>
                            <a
                                href="#qibla-finder"
                                className="px-4 py-2 bg-green-600 hover:bg-green-700 dark:bg-sand-700 dark:hover:bg-sand-600 text-white dark:text-sand-100 rounded-md transition-colors inline-flex items-center"
                            >
                                Find Qibla
                                <ExternalLink className="ml-2 h-4 w-4" />
                            </a>
                        </div>

                        {/* Ramadan Timings */}
                        <div className="bg-white dark:bg-night-500 rounded-lg shadow border border-green-100 dark:border-night-300 p-6 flex flex-col items-center text-center transition-colors">
                            <div className="w-14 h-14 bg-green-50 dark:bg-night-300 rounded-full flex items-center justify-center mb-4">
                                <Moon className="h-7 w-7 text-green-600 dark:text-sand-400" />
                            </div>
                            <h3 className="text-xl font-medium text-green-800 dark:text-sand-300 mb-2">Ramadan Timings</h3>
                            <p className="text-green-700 dark:text-sand-400 mb-4">
                                View Suhoor and Iftar timings for Ramadan based on your location.
                            </p>
                            <a
                                href="#ramadan-timings"
                                className="px-4 py-2 bg-green-600 hover:bg-green-700 dark:bg-sand-700 dark:hover:bg-sand-600 text-white dark:text-sand-100 rounded-md transition-colors inline-flex items-center"
                            >
                                View Timings
                                <ExternalLink className="ml-2 h-4 w-4" />
                            </a>
                        </div>

                        {/* Zakat Calculator */}
                        <div className="bg-white dark:bg-night-500 rounded-lg shadow border border-green-100 dark:border-night-300 p-6 flex flex-col items-center text-center transition-colors">
                            <div className="w-14 h-14 bg-green-50 dark:bg-night-300 rounded-full flex items-center justify-center mb-4">
                                <Calculator className="h-7 w-7 text-green-600 dark:text-sand-400" />
                            </div>
                            <h3 className="text-xl font-medium text-green-800 dark:text-sand-300 mb-2">Zakat Calculator</h3>
                            <p className="text-green-700 dark:text-sand-400 mb-4">
                                Calculate your Zakat obligation based on your assets and wealth.
                            </p>
                            <Link
                                href="/zakat"
                                className="px-4 py-2 bg-green-600 hover:bg-green-700 dark:bg-sand-700 dark:hover:bg-sand-600 text-white dark:text-sand-100 rounded-md transition-colors inline-flex items-center"
                            >
                                Calculate Zakat
                                <ExternalLink className="ml-2 h-4 w-4" />
                            </Link>
                        </div>

                        {/* Tasbih Counter */}
                        <div className="bg-white dark:bg-night-500 rounded-lg shadow border border-green-100 dark:border-night-300 p-6 flex flex-col items-center text-center transition-colors">
                            <div className="w-14 h-14 bg-green-50 dark:bg-night-300 rounded-full flex items-center justify-center mb-4">
                                <FileText className="h-7 w-7 text-green-600 dark:text-sand-400" />
                            </div>
                            <h3 className="text-xl font-medium text-green-800 dark:text-sand-300 mb-2">Tasbih Counter</h3>
                            <p className="text-green-700 dark:text-sand-400 mb-4">
                                Recite dhikr that’s light on the tongue but heavy in reward.
                            </p>
                            <Link
                                href="/tasbih"
                                className="px-4 py-2 bg-green-600 hover:bg-green-700 dark:bg-sand-700 dark:hover:bg-sand-600 text-white dark:text-sand-100 rounded-md transition-colors inline-flex items-center"
                            >
                                Start Counting
                                <ExternalLink className="ml-2 h-4 w-4" />
                            </Link>
                        </div>

                        {/* Dua */}
                        <div className="bg-white dark:bg-night-500 rounded-lg shadow border border-green-100 dark:border-night-300 p-6 flex flex-col items-center text-center transition-colors">
                            <div className="w-14 h-14 bg-green-50 dark:bg-night-300 rounded-full flex items-center justify-center mb-4">
                                <Book className="h-7 w-7 text-green-600 dark:text-sand-400" />
                            </div>
                            <h3 className="text-xl font-medium text-green-800 dark:text-sand-300 mb-2">Dua</h3>
                            <p className="text-green-700 dark:text-sand-400 mb-4">
                                Find the appropriate duas to match your current situation.
                            </p>
                            <Link
                                href="/dua"
                                className="px-4 py-2 bg-green-600 hover:bg-green-700 dark:bg-sand-700 dark:hover:bg-sand-600 text-white dark:text-sand-100 rounded-md transition-colors inline-flex items-center"
                            >
                                Recite Dua
                                <ExternalLink className="ml-2 h-4 w-4" />
                            </Link>
                        </div>

                        {/* Islamic Quiz */}
                        <div className="bg-white dark:bg-night-500 rounded-lg shadow border border-green-100 dark:border-night-300 p-6 flex flex-col items-center text-center transition-colors">
                            <div className="w-14 h-14 bg-green-50 dark:bg-night-300 rounded-full flex items-center justify-center mb-4">
                                <HelpCircle className="h-7 w-7 text-green-600 dark:text-sand-400" />
                            </div>
                            <h3 className="text-xl font-medium text-green-800 dark:text-sand-300 mb-2">Islamic Quiz</h3>
                            <p className="text-green-700 dark:text-sand-400 mb-4">
                                A fun and engaging way to learn more about Islam.
                            </p>
                            <Link
                                href="/quiz"
                                className="px-4 py-2 bg-green-600 hover:bg-green-700 dark:bg-sand-700 dark:hover:bg-sand-600 text-white dark:text-sand-100 rounded-md transition-colors inline-flex items-center"
                            >
                                Play Quiz
                                <ExternalLink className="ml-2 h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}