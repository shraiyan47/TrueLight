export default function HadithSection() {
  return (
    <section className="py-8 bg-white dark:bg-night-800 transition-colors">
      <div className="container mx-auto px-4 max-w-7xl">
        <h2 className="text-2xl font-bold text-center mb-8 text-green-800 dark:font-bold dark:text-sand-300 transition-colors">
          Hadith of the Day
        </h2>

        <div className="max-w-5xl mx-auto">
          <div className="bg-white dark:bg-night-500 rounded-lg shadow border border-green-100 dark:border-night-300 card-bg overflow-hidden transition-colors">
            <div className="flex items-center gap-2 p-4 border-b border-green-100 dark:border-night-200 card-header transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-green-600 dark:text-sand-400 icon-primary transition-colors"
              >
                <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                <path d="M17 21h-7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z" />
                <path d="M9 9h1" />
                <path d="M9 13h6" />
                <path d="M9 17h6" />
              </svg>
              <h3 className="font-medium text-green-800 dark:text-sand-300 card-title transition-colors">Hadith</h3>
            </div>
            <div className="p-6">
              <p className="text-green-800 dark:text-sand-200 card-text leading-relaxed transition-colors">
                The Messenger of Allah (ﷺ) said, "When a person dies, his deeds come to an end except for three: Sadaqah
                Jariyah (ceaseless charity), knowledge which is beneficial, or a virtuous descendant who prays for him
                (the deceased)."
              </p>

              <div className="mt-4 pt-4 border-t border-green-100 dark:border-night-300 divider transition-colors">
                <p className="text-sm text-green-700 dark:text-sand-400 card-subtitle transition-colors">Narrator: Abu Hurairah</p>
                <p className="text-xs text-green-600 dark:text-sand-500 card-muted transition-colors">
                  Source: Sahih Muslim, The Book of Wills, No. 1631
                </p>
              </div>

              <div className="mt-4 text-right">
                <a
                  href="/hadith"
                  className="inline-flex items-center text-green-600 dark:text-sand-400 hover:text-green-800 dark:hover:text-sand-300 nav-link transition-colors"
                >
                  Explore More Hadith
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-1"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}