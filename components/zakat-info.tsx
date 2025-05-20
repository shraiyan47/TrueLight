import { Heart, Users, Book, HelpCircle, Landmark, Calendar } from "lucide-react"

export default function ZakatInfo() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-green-800 dark:font-bold dark:text-sand-300 mb-6 section-title transition-colors">
        Understanding Zakat
      </h2>
      <div className="grid md:grid-cols-2 gap-8">
        {/* What is Zakat */}
        <div className="bg-white dark:bg-night-500 rounded-lg shadow border border-green-100 dark:border-night-300 overflow-hidden card-bg transition-colors">
          <div className="flex items-center gap-2 p-4 border-b border-green-100 dark:border-night-200 bg-green-50 dark:bg-night-300 card-header transition-colors">
            <Book className="h-5 w-5 text-green-600 dark:text-sand-400 icon-primary transition-colors" />
            <h2 className="font-medium text-green-800 dark:text-sand-300 card-title transition-colors">
              What is Zakat?
            </h2>
          </div>

          <div className="p-6">
            <p className="text-green-800 dark:text-sand-200 mb-4 card-text transition-colors">
              Zakat is the third pillar of Islam and an obligatory form of charity that purifies wealth and souls. It
              involves giving 2.5% of one's qualifying wealth to specific categories of people in need.
            </p>

            <p className="text-green-800 dark:text-sand-200 mb-4 card-text transition-colors">
              The word "Zakat" in Arabic means "purification" and "growth." By giving Zakat, Muslims purify their wealth
              and gain blessings from Allah. The Quran states:
            </p>

            <div className="mb-4 p-4 bg-green-50 dark:bg-night-400 rounded-md italic">
              <p className="text-green-800 dark:text-sand-200 card-text transition-colors">
                "Take from their wealth a charity by which you purify them and cause them increase." (Quran 9:103)
              </p>
            </div>

            <p className="text-green-800 dark:text-sand-200 card-text transition-colors">
              Zakat is not just a financial obligation but a spiritual act of worship that fosters compassion, reduces
              inequality, and strengthens community bonds. It is distinct from voluntary charity (Sadaqah) as it is
              mandatory for eligible Muslims.
            </p>
          </div>
        </div>

        {/* Importance of Zakat */}
        <div className="bg-white dark:bg-night-500 rounded-lg shadow border border-green-100 dark:border-night-300 overflow-hidden card-bg transition-colors">
          <div className="flex items-center gap-2 p-4 border-b border-green-100 dark:border-night-200 bg-green-50 dark:bg-night-300 card-header transition-colors">
            <Heart className="h-5 w-5 text-green-600 dark:text-sand-400 icon-primary transition-colors" />
            <h2 className="font-medium text-green-800 dark:text-sand-300 card-title transition-colors">
              Why Zakat is Important
            </h2>
          </div>

          <div className="p-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-green-800 dark:text-sand-300 mb-2 card-title transition-colors">
                  Spiritual Benefits
                </h3>
                <ul className="list-disc list-inside text-green-800 dark:text-sand-200 card-text transition-colors">
                  <li>Purifies the heart from greed and attachment to material wealth</li>
                  <li>Increases blessings (barakah) in one's wealth and life</li>
                  <li>Develops gratitude for Allah's blessings</li>
                  <li>Fulfills a major pillar of Islam</li>
                  <li>Brings one closer to Allah through obedience</li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium text-green-800 dark:text-sand-300 mb-2 card-title transition-colors">
                  Social Benefits
                </h3>
                <ul className="list-disc list-inside text-green-800 dark:text-sand-200 card-text transition-colors">
                  <li>Reduces inequality and poverty in society</li>
                  <li>Creates a sense of brotherhood and solidarity</li>
                  <li>Helps those in need maintain their dignity</li>
                  <li>Prevents the concentration of wealth among the rich</li>
                  <li>Promotes social welfare and community development</li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium text-green-800 dark:text-sand-300 mb-2 card-title transition-colors">
                  Economic Benefits
                </h3>
                <ul className="list-disc list-inside text-green-800 dark:text-sand-200 card-text transition-colors">
                  <li>Stimulates economic activity by circulating wealth</li>
                  <li>Provides capital for those who cannot access traditional financing</li>
                  <li>Reduces hoarding and encourages productive use of wealth</li>
                  <li>Creates a social safety net for the vulnerable</li>
                  <li>Promotes entrepreneurship among the less fortunate</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-green-100 dark:border-night-300 divider transition-colors">
              <p className="text-green-800 dark:text-sand-200 card-text transition-colors">
                The Prophet Muhammad (peace be upon him) said: "Whoever pays the zakat on his wealth will have its evil
                removed from him." (Ibn Khuzaimah and at-Tabarani)
              </p>
            </div>
          </div>
        </div>

        {/* Zakat Rules and Conditions */}
        <div className="bg-white dark:bg-night-500 rounded-lg shadow border border-green-100 dark:border-night-300 overflow-hidden card-bg transition-colors">
          <div className="flex items-center gap-2 p-4 border-b border-green-100 dark:border-night-200 bg-green-50 dark:bg-night-300 card-header transition-colors">
            <Landmark className="h-5 w-5 text-green-600 dark:text-sand-400 icon-primary transition-colors" />
            <h2 className="font-medium text-green-800 dark:text-sand-300 card-title transition-colors">
              Zakat Rules and Conditions
            </h2>
          </div>

          <div className="p-6">
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-green-800 dark:text-sand-300 mb-2 card-title transition-colors">
                  Who Must Pay Zakat?
                </h3>
                <p className="text-green-800 dark:text-sand-200 mb-2 card-text transition-colors">
                  Zakat is obligatory on every Muslim who meets these conditions:
                </p>
                <ul className="list-disc list-inside text-green-800 dark:text-sand-200 card-text transition-colors">
                  <li>Being Muslim</li>
                  <li>Being free (not a slave - historically relevant)</li>
                  <li>Possessing wealth at or above the nisab threshold</li>
                  <li>Having complete ownership of the wealth</li>
                  <li>The wealth has been in possession for one lunar year (hawl)</li>
                  <li>The wealth is growing or has growth potential</li>
                  <li>Being free of debt that would reduce wealth below nisab</li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium text-green-800 dark:text-sand-300 mb-2 card-title transition-colors">
                  What Assets are Zakatable?
                </h3>
                <ul className="list-disc list-inside text-green-800 dark:text-sand-200 card-text transition-colors">
                  <li>Gold and silver (including jewelry made from them)</li>
                  <li>Cash and bank balances</li>
                  <li>Business inventory and merchandise</li>
                  <li>Livestock (camels, cattle, sheep, and goats)</li>
                  <li>Agricultural produce (with different rates)</li>
                  <li>Stocks and investments intended for profit</li>
                  <li>Rental income and properties intended for business</li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium text-green-800 dark:text-sand-300 mb-2 card-title transition-colors">
                  What Assets are Not Zakatable?
                </h3>
                <ul className="list-disc list-inside text-green-800 dark:text-sand-200 card-text transition-colors">
                  <li>Personal residence (the home you live in)</li>
                  <li>Personal vehicles used for transportation</li>
                  <li>Household furniture and personal effects</li>
                  <li>Tools of your trade or profession</li>
                  <li>Non-gold/silver jewelry for personal use</li>
                  <li>Retirement accounts (according to some scholars)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium text-green-800 dark:text-sand-300 mb-2 card-title transition-colors">
                  Nisab Threshold
                </h3>
                <p className="text-green-800 dark:text-sand-200 mb-2 card-text transition-colors">
                  Nisab is the minimum amount of wealth that must be owned by a Muslim for Zakat to be obligatory. It is
                  set at:
                </p>
                <ul className="list-disc list-inside text-green-800 dark:text-sand-200 card-text transition-colors">
                  <li>Gold: 87.48 grams (approximately 3.08 ounces)</li>
                  <li>Silver: 612.36 grams (approximately 21.6 ounces)</li>
                </ul>
                <p className="text-green-800 dark:text-sand-200 mt-2 card-text transition-colors">
                  If a person's zakatable assets exceed the value of either the gold or silver nisab (whichever is
                  lower), then Zakat is due at the rate of 2.5%.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Who Can Receive Zakat */}
        <div className="bg-white dark:bg-night-500 rounded-lg shadow border border-green-100 dark:border-night-300 overflow-hidden card-bg transition-colors">
          <div className="flex items-center gap-2 p-4 border-b border-green-100 dark:border-night-200 bg-green-50 dark:bg-night-300 card-header transition-colors">
            <Users className="h-5 w-5 text-green-600 dark:text-sand-400 icon-primary transition-colors" />
            <h2 className="font-medium text-green-800 dark:text-sand-300 card-title transition-colors">
              Who Can Receive Zakat
            </h2>
          </div>

          <div className="p-6">
            <p className="text-green-800 dark:text-sand-200 mb-4 card-text transition-colors">
              The Quran specifically mentions eight categories of people who are eligible to receive Zakat (Surah
              At-Tawbah 9:60):
            </p>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-green-800 dark:text-sand-300 mb-1 card-title transition-colors">
                  1. The Poor (Al-Fuqara)
                </h3>
                <p className="text-green-800 dark:text-sand-200 card-text transition-colors">
                  Those who do not have sufficient means to meet their basic needs.
                </p>
              </div>

              <div>
                <h3 className="font-medium text-green-800 dark:text-sand-300 mb-1 card-title transition-colors">
                  2. The Needy (Al-Masakin)
                </h3>
                <p className="text-green-800 dark:text-sand-200 card-text transition-colors">
                  Those who have some means but not enough to meet their essential needs.
                </p>
              </div>

              <div>
                <h3 className="font-medium text-green-800 dark:text-sand-300 mb-1 card-title transition-colors">
                  3. Zakat Administrators (Al-Amilina Alayha)
                </h3>
                <p className="text-green-800 dark:text-sand-200 card-text transition-colors">
                  Those employed to collect and distribute Zakat.
                </p>
              </div>

              <div>
                <h3 className="font-medium text-green-800 dark:text-sand-300 mb-1 card-title transition-colors">
                  4. Those Whose Hearts Are to be Reconciled (Al-Mu'allafati Qulubuhum)
                </h3>
                <p className="text-green-800 dark:text-sand-200 card-text transition-colors">
                  Those who are inclined toward Islam or whose faith needs strengthening.
                </p>
              </div>

              <div>
                <h3 className="font-medium text-green-800 dark:text-sand-300 mb-1 card-title transition-colors">
                  5. To Free Slaves (Fir-Riqab)
                </h3>
                <p className="text-green-800 dark:text-sand-200 card-text transition-colors">
                  For the liberation of those in bondage or captivity.
                </p>
              </div>

              <div>
                <h3 className="font-medium text-green-800 dark:text-sand-300 mb-1 card-title transition-colors">
                  6. Those in Debt (Al-Gharimin)
                </h3>
                <p className="text-green-800 dark:text-sand-200 card-text transition-colors">
                  Those who have debts and are unable to repay them.
                </p>
              </div>

              <div>
                <h3 className="font-medium text-green-800 dark:text-sand-300 mb-1 card-title transition-colors">
                  7. In the Cause of Allah (Fi Sabilillah)
                </h3>
                <p className="text-green-800 dark:text-sand-200 card-text transition-colors">
                  Those striving in the path of Allah, including religious education, defense, and community services.
                </p>
              </div>

              <div>
                <h3 className="font-medium text-green-800 dark:text-sand-300 mb-1 card-title transition-colors">
                  8. The Wayfarer (Ibn As-Sabil)
                </h3>
                <p className="text-green-800 dark:text-sand-200 card-text transition-colors">
                  Travelers who are stranded or in need of assistance during their journey.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-green-100 dark:border-night-300 divider transition-colors">
              <p className="text-green-800 dark:text-sand-200 card-text transition-colors">
                It is important to note that Zakat cannot be given to one's own parents, grandparents, children,
                grandchildren, or spouse, as supporting them is already an obligation. Additionally, Zakat cannot be
                given to non-Muslims or to wealthy individuals who are above the nisab threshold.
              </p>
            </div>
          </div>
        </div>

        {/* Common Questions About Zakat */}
        <div className="bg-white dark:bg-night-500 rounded-lg shadow border border-green-100 dark:border-night-300 overflow-hidden card-bg transition-colors">
          <div className="flex items-center gap-2 p-4 border-b border-green-100 dark:border-night-200 bg-green-50 dark:bg-night-300 card-header transition-colors">
            <HelpCircle className="h-5 w-5 text-green-600 dark:text-sand-400 icon-primary transition-colors" />
            <h2 className="font-medium text-green-800 dark:text-sand-300 card-title transition-colors">
              Common Questions About Zakat
            </h2>
          </div>

          <div className="p-6">
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-green-800 dark:text-sand-300 mb-2 card-title transition-colors">
                  When should I pay my Zakat?
                </h3>
                <p className="text-green-800 dark:text-sand-200 card-text transition-colors">
                  Zakat is due after one lunar year (hawl) has passed on the wealth that reaches the nisab threshold.
                  Many Muslims choose to pay their Zakat during Ramadan for the extra rewards, but it can be paid at any
                  time when it becomes due. Some people set a specific date each year to calculate and pay their Zakat.
                </p>
              </div>

              <div>
                <h3 className="font-medium text-green-800 dark:text-sand-300 mb-2 card-title transition-colors">
                  Can I give Zakat to charitable organizations?
                </h3>
                <p className="text-green-800 dark:text-sand-200 card-text transition-colors">
                  Yes, you can give Zakat to reputable Islamic charitable organizations that distribute Zakat to
                  eligible recipients. Ensure that the organization has a specific Zakat fund and properly distributes
                  it according to Islamic guidelines. Many mosques and Islamic relief organizations have dedicated Zakat
                  funds.
                </p>
              </div>

              <div>
                <h3 className="font-medium text-green-800 dark:text-sand-300 mb-2 card-title transition-colors">
                  Is Zakat due on my primary residence or car?
                </h3>
                <p className="text-green-800 dark:text-sand-200 card-text transition-colors">
                  No, Zakat is not due on personal assets that are not intended for trade or investment, such as your
                  primary residence, personal vehicle, household furniture, or personal clothing. These are considered
                  necessities and not zakatable wealth.
                </p>
              </div>

              <div>
                <h3 className="font-medium text-green-800 dark:text-sand-300 mb-2 card-title transition-colors">
                  Do I pay Zakat on my retirement accounts?
                </h3>
                <p className="text-green-800 dark:text-sand-200 card-text transition-colors">
                  Scholars differ on this issue. Some consider retirement funds zakatable annually on the accessible
                  portion, while others view them as zakatable only when funds become accessible. It's best to consult
                  with a knowledgeable scholar for your specific situation.
                </p>
              </div>

              <div>
                <h3 className="font-medium text-green-800 dark:text-sand-300 mb-2 card-title transition-colors">
                  Is Zakat different from Zakat al-Fitr?
                </h3>
                <p className="text-green-800 dark:text-sand-200 card-text transition-colors">
                  Yes, they are different. Zakat al-Fitr (also called Fitrana) is a special charity given at the end of
                  Ramadan before Eid prayer. It is a fixed amount per person and is obligatory on every Muslim who has
                  food in excess of their needs. Zakat al-Mal (the wealth Zakat discussed on this page) is calculated as
                  2.5% of eligible wealth and is due when wealth reaches the nisab and is held for one lunar year.
                </p>
              </div>

              <div>
                <h3 className="font-medium text-green-800 dark:text-sand-300 mb-2 card-title transition-colors">
                  Can I give Zakat to non-Muslims?
                </h3>
                <p className="text-green-800 dark:text-sand-200 card-text transition-colors">
                  According to the majority of scholars, Zakat should be given to Muslims who fall under the eight
                  categories mentioned in the Quran. However, non-Muslims can be helped through voluntary charity
                  (Sadaqah). Some scholars permit giving Zakat to non-Muslims under the category of "those whose hearts
                  are to be reconciled."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Zakat vs Sadaqah - Full width */}
      <div className="mt-8 bg-white dark:bg-night-500 rounded-lg shadow border border-green-100 dark:border-night-300 overflow-hidden card-bg transition-colors">
        <div className="flex items-center gap-2 p-4 border-b border-green-100 dark:border-night-200 bg-green-50 dark:bg-night-300 card-header transition-colors">
          <Calendar className="h-5 w-5 text-green-600 dark:text-sand-400 icon-primary transition-colors" />
          <h2 className="font-medium text-green-800 dark:text-sand-300 card-title transition-colors">
            Zakat vs Sadaqah: Understanding the Difference
          </h2>
        </div>

        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border border-green-200 dark:border-night-300 p-3 text-left bg-green-50 dark:bg-night-400 text-green-800 dark:text-sand-300 card-title transition-colors">
                    Aspect
                  </th>
                  <th className="border border-green-200 dark:border-night-300 p-3 text-left bg-green-50 dark:bg-night-400 text-green-800 dark:text-sand-300 card-title transition-colors">
                    Zakat
                  </th>
                  <th className="border border-green-200 dark:border-night-300 p-3 text-left bg-green-50 dark:bg-night-400 text-green-800 dark:text-sand-300 card-title transition-colors">
                    Sadaqah
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-green-200 dark:border-night-300 p-3 text-green-800 dark:text-sand-200 card-text transition-colors">
                    Obligation
                  </td>
                  <td className="border border-green-200 dark:border-night-300 p-3 text-green-800 dark:text-sand-200 card-text transition-colors">
                    Mandatory for eligible Muslims
                  </td>
                  <td className="border border-green-200 dark:border-night-300 p-3 text-green-800 dark:text-sand-200 card-text transition-colors">
                    Voluntary charity
                  </td>
                </tr>
                <tr>
                  <td className="border border-green-200 dark:border-night-300 p-3 text-green-800 dark:text-sand-200 card-text transition-colors">
                    Amount
                  </td>
                  <td className="border border-green-200 dark:border-night-300 p-3 text-green-800 dark:text-sand-200 card-text transition-colors">
                    Fixed at 2.5% of eligible wealth
                  </td>
                  <td className="border border-green-200 dark:border-night-300 p-3 text-green-800 dark:text-sand-200 card-text transition-colors">
                    Any amount, no minimum or maximum
                  </td>
                </tr>
                <tr>
                  <td className="border border-green-200 dark:border-night-300 p-3 text-green-800 dark:text-sand-200 card-text transition-colors">
                    Timing
                  </td>
                  <td className="border border-green-200 dark:border-night-300 p-3 text-green-800 dark:text-sand-200 card-text transition-colors">
                    Due after one lunar year when wealth reaches nisab
                  </td>
                  <td className="border border-green-200 dark:border-night-300 p-3 text-green-800 dark:text-sand-200 card-text transition-colors">
                    Can be given at any time
                  </td>
                </tr>
                <tr>
                  <td className="border border-green-200 dark:border-night-300 p-3 text-green-800 dark:text-sand-200 card-text transition-colors">
                    Recipients
                  </td>
                  <td className="border border-green-200 dark:border-night-300 p-3 text-green-800 dark:text-sand-200 card-text transition-colors">
                    Limited to the eight categories mentioned in the Quran
                  </td>
                  <td className="border border-green-200 dark:border-night-300 p-3 text-green-800 dark:text-sand-200 card-text transition-colors">
                    Can be given to anyone, including family members and non-Muslims
                  </td>
                </tr>
                <tr>
                  <td className="border border-green-200 dark:border-night-300 p-3 text-green-800 dark:text-sand-200 card-text transition-colors">
                    Intention
                  </td>
                  <td className="border border-green-200 dark:border-night-300 p-3 text-green-800 dark:text-sand-200 card-text transition-colors">
                    Must be given with the specific intention of fulfilling Zakat
                  </td>
                  <td className="border border-green-200 dark:border-night-300 p-3 text-green-800 dark:text-sand-200 card-text transition-colors">
                    Can be given with a general intention of charity
                  </td>
                </tr>
                <tr>
                  <td className="border border-green-200 dark:border-night-300 p-3 text-green-800 dark:text-sand-200 card-text transition-colors">
                    Status in Islam
                  </td>
                  <td className="border border-green-200 dark:border-night-300 p-3 text-green-800 dark:text-sand-200 card-text transition-colors">
                    One of the five pillars of Islam
                  </td>
                  <td className="border border-green-200 dark:border-night-300 p-3 text-green-800 dark:text-sand-200 card-text transition-colors">
                    Highly recommended act of worship
                  </td>
                </tr>
                <tr>
                  <td className="border border-green-200 dark:border-night-300 p-3 text-green-800 dark:text-sand-200 card-text transition-colors">
                    Forms
                  </td>
                  <td className="border border-green-200 dark:border-night-300 p-3 text-green-800 dark:text-sand-200 card-text transition-colors">
                    Primarily monetary or in the form of specific assets
                  </td>
                  <td className="border border-green-200 dark:border-night-300 p-3 text-green-800 dark:text-sand-200 card-text transition-colors">
                    Can be money, goods, services, or even a smile or kind word
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-6 text-green-800 dark:text-sand-200 card-text transition-colors">
            Both Zakat and Sadaqah are forms of charity in Islam, but they serve different purposes. Zakat is a
            structured, obligatory form of giving that purifies wealth and supports specific categories of people in
            need. Sadaqah is a more flexible, voluntary form of charity that can be given at any time, in any amount,
            and to anyone. Both are highly rewarded by Allah and are essential aspects of Islamic practice.
          </p>
        </div>
      </div>
    </div>
  )
}
