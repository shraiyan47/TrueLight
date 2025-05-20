import { BookOpen } from "lucide-react"

export default function RamadanDuas() {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-green-800 dark:font-bold dark:text-sand-300 mb-6 section-title transition-colors">
        Essential Ramadan Duas
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Sehri (Suhoor) Dua */}
        <div className="bg-white dark:bg-night-500 rounded-lg shadow border border-green-100 dark:border-night-300 overflow-hidden card-bg transition-colors">
          <div className="flex items-center gap-2 p-4 border-b border-green-100 dark:border-night-200 bg-green-50 dark:bg-night-300 card-header transition-colors">
            <BookOpen className="h-5 w-5 text-green-600 dark:text-sand-400 icon-primary transition-colors" />
            <h3 className="font-medium text-green-800 dark:text-sand-300 card-title transition-colors">
              Dua for Sehri (Intention for Fasting)
            </h3>
          </div>

          <div className="p-6">
            <div className="mb-4 text-right">
              <p className="text-xl arabic-text leading-loose text-green-900 dark:text-sand-200 card-text transition-colors">
                وَبِصَوْمِ غَدٍ نَّوَيْتُ مِنْ شَهْرِ رَمَضَانَ
              </p>
            </div>

            <div className="mb-4">
              <p className="italic text-green-800 dark:text-sand-300 card-title transition-colors">
                Wa bisawmi ghadin nawaiytu min shahri Ramadan
              </p>
            </div>

            <div>
              <p className="text-green-700 dark:text-sand-400 card-subtitle transition-colors">
                <strong>Translation:</strong> I intend to keep the fast for tomorrow in the month of Ramadan.
              </p>
            </div>

            <div className="mt-4 pt-4 border-t border-green-100 dark:border-night-300 divider transition-colors">
              <p className="text-sm text-green-700 dark:text-sand-400 card-subtitle transition-colors">
                <strong>When to recite:</strong> This dua should be recited during Sehri time before the start of the
                fast. It establishes your intention (niyyah) for fasting, which is an essential requirement.
              </p>
            </div>
          </div>
        </div>

        {/* Iftar Dua */}
        <div className="bg-white dark:bg-night-500 rounded-lg shadow border border-green-100 dark:border-night-300 overflow-hidden card-bg transition-colors">
          <div className="flex items-center gap-2 p-4 border-b border-green-100 dark:border-night-200 bg-green-50 dark:bg-night-300 card-header transition-colors">
            <BookOpen className="h-5 w-5 text-green-600 dark:text-sand-400 icon-primary transition-colors" />
            <h3 className="font-medium text-green-800 dark:text-sand-300 card-title transition-colors">
              Dua for Iftar (Breaking the Fast)
            </h3>
          </div>

          <div className="p-6">
            <div className="mb-4 text-right">
              <p className="text-xl arabic-text leading-loose text-green-900 dark:text-sand-200 card-text transition-colors">
                اللَّهُمَّ إِنِّي لَكَ صُمْتُ وَبِكَ آمَنْتُ وَعَلَى رِزْقِكَ أَفْطَرْتُ
              </p>
            </div>

            <div className="mb-4">
              <p className="italic text-green-800 dark:text-sand-300 card-title transition-colors">
                Allahumma inni laka sumtu wa bika aamantu wa 'ala rizqika aftartu
              </p>
            </div>

            <div>
              <p className="text-green-700 dark:text-sand-400 card-subtitle transition-colors">
                <strong>Translation:</strong> O Allah, I fasted for You and I believe in You and I break my fast with
                Your sustenance.
              </p>
            </div>

            <div className="mt-4 pt-4 border-t border-green-100 dark:border-night-300 divider transition-colors">
              <p className="text-sm text-green-700 dark:text-sand-400 card-subtitle transition-colors">
                <strong>When to recite:</strong> This dua should be recited at the time of breaking the fast (Iftar). It
                is recommended to break your fast with dates and water, following the Sunnah of the Prophet Muhammad
                (peace be upon him).
              </p>
            </div>
          </div>
        </div>

        {/* Laylatul Qadr Dua */}
        <div className="bg-white dark:bg-night-500 rounded-lg shadow border border-green-100 dark:border-night-300 overflow-hidden card-bg transition-colors md:col-span-2">
          <div className="flex items-center gap-2 p-4 border-b border-green-100 dark:border-night-200 bg-green-50 dark:bg-night-300 card-header transition-colors">
            <BookOpen className="h-5 w-5 text-green-600 dark:text-sand-400 icon-primary transition-colors" />
            <h3 className="font-medium text-green-800 dark:text-sand-300 card-title transition-colors">
              Dua for Laylatul Qadr (Night of Power)
            </h3>
          </div>

          <div className="p-6">
            <div className="mb-4 text-right">
              <p className="text-xl arabic-text leading-loose text-green-900 dark:text-sand-200 card-text transition-colors">
                اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي
              </p>
            </div>

            <div className="mb-4">
              <p className="italic text-green-800 dark:text-sand-300 card-title transition-colors">
                Allahumma innaka 'afuwwun tuhibbul 'afwa fa'fu 'anni
              </p>
            </div>

            <div>
              <p className="text-green-700 dark:text-sand-400 card-subtitle transition-colors">
                <strong>Translation:</strong> O Allah, You are the One Who pardons greatly, and You love to pardon, so
                pardon me.
              </p>
            </div>

            <div className="mt-4 pt-4 border-t border-green-100 dark:border-night-300 divider transition-colors">
              <p className="text-sm text-green-700 dark:text-sand-400 card-subtitle transition-colors">
                <strong>When to recite:</strong> This dua is especially recommended during the last ten nights of
                Ramadan, particularly on the odd nights when seeking Laylatul Qadr (the Night of Power). Aisha (may
                Allah be pleased with her) reported that she asked the Prophet (peace be upon him) what to supplicate if
                she found Laylatul Qadr, and he taught her this dua.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
