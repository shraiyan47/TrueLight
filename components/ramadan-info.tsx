import { Calendar, Heart, Star, Award, Moon } from "lucide-react"

export default function RamadanInfo() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-green-800 dark:font-bold dark:text-sand-300 mb-6 section-title transition-colors">
        About Ramadan
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left column */}
        <div className="space-y-8">
          {/* What is Ramadan */}
          <div className="bg-white dark:bg-night-500 rounded-lg shadow border border-green-100 dark:border-night-300 overflow-hidden card-bg transition-colors">
            <div className="flex items-center gap-2 p-4 border-b border-green-100 dark:border-night-200 bg-green-50 dark:bg-night-300 card-header transition-colors">
              <Moon className="h-5 w-5 text-green-600 dark:text-sand-400 icon-primary transition-colors" />
              <h3 className="font-medium text-green-800 dark:text-sand-300 card-title transition-colors">
                What is Ramadan?
              </h3>
            </div>

            <div className="p-6">
              <p className="text-green-800 dark:text-sand-200 card-text mb-4 transition-colors">
                Ramadan is the ninth month of the Islamic lunar calendar and is observed by Muslims worldwide as a month
                of fasting (sawm), prayer, reflection, and community. It commemorates the first revelation of the Quran
                to Prophet Muhammad (peace be upon him).
              </p>

              <p className="text-green-800 dark:text-sand-200 card-text mb-4 transition-colors">
                During Ramadan, Muslims fast from dawn until sunset, abstaining from food, drink, smoking, and marital
                relations. The fast is broken each evening with a meal called Iftar, often beginning with dates,
                following the tradition of Prophet Muhammad (peace be upon him).
              </p>

              <p className="text-green-800 dark:text-sand-200 card-text transition-colors">
                Ramadan is also a time of increased prayer, charity, and recitation of the Quran. The month culminates
                in the celebration of Eid al-Fitr, marking the end of the fasting period.
              </p>
            </div>
          </div>

          {/* History of Ramadan */}
          <div className="bg-white dark:bg-night-500 rounded-lg shadow border border-green-100 dark:border-night-300 overflow-hidden card-bg transition-colors">
            <div className="flex items-center gap-2 p-4 border-b border-green-100 dark:border-night-200 bg-green-50 dark:bg-night-300 card-header transition-colors">
              <Calendar className="h-5 w-5 text-green-600 dark:text-sand-400 icon-primary transition-colors" />
              <h3 className="font-medium text-green-800 dark:text-sand-300 card-title transition-colors">
                History of Ramadan
              </h3>
            </div>

            <div className="p-6">
              <p className="text-green-800 dark:text-sand-200 card-text mb-4 transition-colors">
                The obligation to fast during Ramadan was established in the second year after the Muslims migrated from
                Mecca to Medina (2 AH or 624 CE). The Quran states in Surah Al-Baqarah (2:183-185) that fasting was
                prescribed for Muslims as it was prescribed for those before them.
              </p>

              <p className="text-green-800 dark:text-sand-200 card-text mb-4 transition-colors">
                The month of Ramadan holds special significance as it is believed to be the month in which the first
                verses of the Quran were revealed to Prophet Muhammad (peace be upon him) by the angel Jibreel (Gabriel)
                during the Night of Power (Laylatul Qadr).
              </p>

              <p className="text-green-800 dark:text-sand-200 card-text transition-colors">
                Throughout Islamic history, Ramadan has been a time of spiritual renewal and increased devotion. Many
                significant events in Islamic history occurred during this blessed month, including the Battle of Badr,
                the Conquest of Mecca, and various revelations of the Quran.
              </p>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-8">
          {/* Benefits of Fasting */}
          <div className="bg-white dark:bg-night-500 rounded-lg shadow border border-green-100 dark:border-night-300 overflow-hidden card-bg transition-colors">
            <div className="flex items-center gap-2 p-4 border-b border-green-100 dark:border-night-200 bg-green-50 dark:bg-night-300 card-header transition-colors">
              <Heart className="h-5 w-5 text-green-600 dark:text-sand-400 icon-primary transition-colors" />
              <h3 className="font-medium text-green-800 dark:text-sand-300 card-title transition-colors">
                Benefits of Fasting
              </h3>
            </div>

            <div className="p-6">
              <h4 className="font-medium text-green-800 dark:text-sand-300 mb-2 card-title transition-colors">
                Spiritual Benefits
              </h4>
              <ul className="list-disc list-inside mb-4 text-green-800 dark:text-sand-200 card-text transition-colors">
                <li>Increased God-consciousness (Taqwa)</li>
                <li>Spiritual purification and self-discipline</li>
                <li>Greater appreciation for Allah's blessings</li>
                <li>Increased focus on prayer and Quran recitation</li>
                <li>Opportunity for forgiveness of sins</li>
              </ul>

              <h4 className="font-medium text-green-800 dark:text-sand-300 mb-2 card-title transition-colors">
                Social Benefits
              </h4>
              <ul className="list-disc list-inside mb-4 text-green-800 dark:text-sand-200 card-text transition-colors">
                <li>Increased empathy for those less fortunate</li>
                <li>Strengthened community bonds through shared experiences</li>
                <li>Encouragement of charity and generosity</li>
                <li>Family unity through shared meals and worship</li>
              </ul>

              <h4 className="font-medium text-green-800 dark:text-sand-300 mb-2 card-title transition-colors">
                Health Benefits
              </h4>
              <ul className="list-disc list-inside text-green-800 dark:text-sand-200 card-text transition-colors">
                <li>Detoxification of the body</li>
                <li>Improved insulin sensitivity</li>
                <li>Promotion of fat loss and metabolic health</li>
                <li>Reset of eating patterns and reduction of unhealthy habits</li>
              </ul>
            </div>
          </div>

          {/* Special Nights in Ramadan */}
          <div className="bg-white dark:bg-night-500 rounded-lg shadow border border-green-100 dark:border-night-300 overflow-hidden card-bg transition-colors">
            <div className="flex items-center gap-2 p-4 border-b border-green-100 dark:border-night-200 bg-green-50 dark:bg-night-300 card-header transition-colors">
              <Star className="h-5 w-5 text-green-600 dark:text-sand-400 icon-primary transition-colors" />
              <h3 className="font-medium text-green-800 dark:text-sand-300 card-title transition-colors">
                Special Nights in Ramadan
              </h3>
            </div>

            <div className="p-6">
              <h4 className="font-medium text-green-800 dark:text-sand-300 mb-2 card-title transition-colors">
                Laylatul Qadr (The Night of Power)
              </h4>
              <p className="text-green-800 dark:text-sand-200 card-text mb-4 transition-colors">
                Laylatul Qadr is described in the Quran as "better than a thousand months" (97:3). It is believed to be
                one of the odd-numbered nights in the last ten days of Ramadan (21st, 23rd, 25th, 27th, or 29th night).
                Muslims are encouraged to increase worship and supplication during these nights, seeking the special
                blessings and forgiveness associated with Laylatul Qadr.
              </p>

              <h4 className="font-medium text-green-800 dark:text-sand-300 mb-2 card-title transition-colors">
                The Last Ten Nights
              </h4>
              <p className="text-green-800 dark:text-sand-200 card-text transition-colors">
                The Prophet Muhammad (peace be upon him) used to increase his worship during the last ten nights of
                Ramadan. Many Muslims practice I'tikaf (spiritual retreat in the mosque) during this time, dedicating
                themselves to prayer, Quran recitation, and remembrance of Allah. These nights are considered especially
                blessed for seeking forgiveness and making supplications.
              </p>
            </div>
          </div>

          {/* Acts of Worship in Ramadan */}
          <div className="bg-white dark:bg-night-500 rounded-lg shadow border border-green-100 dark:border-night-300 overflow-hidden card-bg transition-colors">
            <div className="flex items-center gap-2 p-4 border-b border-green-100 dark:border-night-200 bg-green-50 dark:bg-night-300 card-header transition-colors">
              <Award className="h-5 w-5 text-green-600 dark:text-sand-400 icon-primary transition-colors" />
              <h3 className="font-medium text-green-800 dark:text-sand-300 card-title transition-colors">
                Acts of Worship in Ramadan
              </h3>
            </div>

            <div className="p-6">
              <ul className="space-y-4">
                <li>
                  <h4 className="font-medium text-green-800 dark:text-sand-300 card-title transition-colors">
                    Taraweeh Prayer
                  </h4>
                  <p className="text-green-800 dark:text-sand-200 card-text transition-colors">
                    Special night prayers performed after Isha prayer during Ramadan, typically consisting of 8-20
                    rakats (units of prayer).
                  </p>
                </li>

                <li>
                  <h4 className="font-medium text-green-800 dark:text-sand-300 card-title transition-colors">
                    Quran Recitation
                  </h4>
                  <p className="text-green-800 dark:text-sand-200 card-text transition-colors">
                    Many Muslims aim to complete the entire Quran during Ramadan, either individually or by listening to
                    it during Taraweeh prayers.
                  </p>
                </li>

                <li>
                  <h4 className="font-medium text-green-800 dark:text-sand-300 card-title transition-colors">
                    Zakat and Sadaqah
                  </h4>
                  <p className="text-green-800 dark:text-sand-200 card-text transition-colors">
                    Giving charity is highly encouraged during Ramadan. Many Muslims pay their annual Zakat (obligatory
                    charity) during this month and increase voluntary charity (Sadaqah).
                  </p>
                </li>

                <li>
                  <h4 className="font-medium text-green-800 dark:text-sand-300 card-title transition-colors">
                    I'tikaf
                  </h4>
                  <p className="text-green-800 dark:text-sand-200 card-text transition-colors">
                    Spiritual retreat in the mosque, especially during the last ten days of Ramadan, to focus entirely
                    on worship and spiritual reflection.
                  </p>
                </li>

                <li>
                  <h4 className="font-medium text-green-800 dark:text-sand-300 card-title transition-colors">
                    Dhikr (Remembrance of Allah)
                  </h4>
                  <p className="text-green-800 dark:text-sand-200 card-text transition-colors">
                    Increased remembrance of Allah through various forms of glorification and supplication.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
