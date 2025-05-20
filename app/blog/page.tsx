import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"
import { Calendar, User, Search, Filter, ArrowLeft, ArrowRight } from "lucide-react"

// Blog post interface
interface BlogPost {
  id: string
  title: string
  excerpt: string
  category: string
  author: string
  date: string
  imageUrl: string
  slug: string
  tags: string[]
}

// Sample blog posts data (expanded from the home page)
const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Understanding the Importance of Dhikr in Daily Life",
    excerpt:
      "Explore how the practice of remembrance of Allah can transform your spiritual journey and bring peace to your heart.",
    category: "Spirituality",
    author: "Imam Abdullah",
    date: "May 12, 2024",
    imageUrl: "/placeholder.svg?height=200&width=400",
    slug: "understanding-importance-of-dhikr",
    tags: ["Dhikr", "Spirituality", "Daily Practice"],
  },
  {
    id: "2",
    title: "The Etiquettes of Fasting During Ramadan",
    excerpt:
      "Learn about the proper practices and spiritual dimensions that enhance your fasting experience during the holy month.",
    category: "Ramadan",
    author: "Dr. Aisha Rahman",
    date: "April 28, 2024",
    imageUrl: "/placeholder.svg?height=200&width=400",
    slug: "etiquettes-of-fasting-ramadan",
    tags: ["Ramadan", "Fasting", "Worship"],
  },
  {
    id: "3",
    title: "Raising Muslim Children in the Modern World",
    excerpt:
      "Practical advice for parents on nurturing faith, identity, and values in children while navigating contemporary challenges.",
    category: "Family",
    author: "Ustadh Yusuf Ali",
    date: "May 5, 2024",
    imageUrl: "/placeholder.svg?height=200&width=400",
    slug: "raising-muslim-children-modern-world",
    tags: ["Parenting", "Family", "Children"],
  },
  {
    id: "4",
    title: "The Significance of Surah Al-Kahf on Fridays",
    excerpt:
      "Discover the virtues and lessons from Surah Al-Kahf and why Muslims are encouraged to recite it every Friday.",
    category: "Quran",
    author: "Sheikh Muhammad Saleem",
    date: "May 10, 2024",
    imageUrl: "/placeholder.svg?height=200&width=400",
    slug: "significance-surah-al-kahf-fridays",
    tags: ["Quran", "Surah Al-Kahf", "Friday"],
  },
  {
    id: "5",
    title: "Islamic Finance: Halal Investing in Modern Markets",
    excerpt: "A comprehensive guide to navigating financial markets while adhering to Islamic principles of finance.",
    category: "Finance",
    author: "Dr. Zainab Khan",
    date: "April 22, 2024",
    imageUrl: "/placeholder.svg?height=200&width=400",
    slug: "islamic-finance-halal-investing",
    tags: ["Finance", "Halal Investing", "Economy"],
  },
  {
    id: "6",
    title: "The Art of Dua: Enhancing Your Supplication",
    excerpt: "Learn how to make your prayers more meaningful and impactful through proper etiquette and sincerity.",
    category: "Worship",
    author: "Imam Khalid Omar",
    date: "May 8, 2024",
    imageUrl: "/placeholder.svg?height=200&width=400",
    slug: "art-of-dua-enhancing-supplication",
    tags: ["Dua", "Prayer", "Worship"],
  },
  {
    id: "7",
    title: "Prophetic Medicine: Traditional Remedies for Modern Times",
    excerpt: "Exploring the healing traditions from the Sunnah and their applications in contemporary healthcare.",
    category: "Health",
    author: "Dr. Fatima Zahra",
    date: "April 15, 2024",
    imageUrl: "/placeholder.svg?height=200&width=400",
    slug: "prophetic-medicine-traditional-remedies",
    tags: ["Health", "Medicine", "Sunnah"],
  },
  {
    id: "8",
    title: "Understanding the Concept of Tawakkul (Reliance on Allah)",
    excerpt: "A deep dive into the Islamic concept of trust in Allah and how it affects our actions and decisions.",
    category: "Faith",
    author: "Sheikh Ibrahim Hassan",
    date: "May 3, 2024",
    imageUrl: "/placeholder.svg?height=200&width=400",
    slug: "understanding-concept-tawakkul",
    tags: ["Tawakkul", "Faith", "Trust"],
  },
]

// Get all unique categories
const categories = Array.from(new Set(blogPosts.map((post) => post.category)))

// Get all unique tags
const allTags = Array.from(new Set(blogPosts.flatMap((post) => post.tags)))

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-night-700 flex flex-col transition-colors">
      <Header />
      <main className="flex-grow">
        <div className="bg-green-50 dark:bg-night-700 py-12 transition-colors">
          <div className="container mx-auto px-4 max-w-7xl">
            <h1 className="text-3xl md:text-4xl font-bold text-green-800 dark:font-bold dark:text-sand-300 mb-4 section-title transition-colors">
              Islamic Knowledge Blog
            </h1>
            <p className="text-green-700 dark:text-sand-400 max-w-3xl card-subtitle transition-colors">
              Explore articles on Islamic spirituality, practical guidance, and knowledge to enhance your faith and
              daily life.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 max-w-7xl">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar with filters */}
            <div className="md:w-1/4">
              <div className="bg-white dark:bg-night-500 rounded-lg shadow border border-green-100 dark:border-night-300 p-5 mb-6 sticky top-4 card-bg transition-colors">
                <div className="mb-6">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search articles..."
                      className="w-full p-2 pl-9 border border-green-200 dark:border-night-200 rounded-md bg-white dark:bg-night-300 text-green-900 dark:text-sand-200 focus:outline-none focus:ring-1 focus:ring-green-500 dark:focus:ring-sand-600 input-field transition-colors"
                    />
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-green-500 dark:text-sand-500 icon-secondary transition-colors" />
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-medium text-green-800 dark:text-sand-300 mb-3 card-title transition-colors flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Categories
                  </h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`category-${category}`}
                          className="rounded border-green-300 dark:border-night-200 text-green-600 dark:text-sand-600 focus:ring-green-500 dark:focus:ring-sand-600 mr-2 transition-colors"
                        />
                        <label
                          htmlFor={`category-${category}`}
                          className="text-green-700 dark:text-sand-400 text-sm card-subtitle transition-colors"
                        >
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-green-800 dark:text-sand-300 mb-3 card-title transition-colors">
                    Popular Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {allTags.slice(0, 10).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 bg-green-100 dark:bg-night-400 text-green-800 dark:text-sand-300 rounded-full cursor-pointer hover:bg-green-200 dark:hover:bg-night-300 badge transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Main content */}
            <div className="md:w-3/4">
              <div className="grid md:grid-cols-2 gap-6">
                {blogPosts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-white dark:bg-night-500 rounded-lg shadow border border-green-100 dark:border-night-300 overflow-hidden card-bg transition-colors"
                  >
                    <div className="h-48 overflow-hidden">
                      <img
                        src={post.imageUrl || "/placeholder.svg"}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-medium px-2 py-1 bg-green-100 dark:bg-night-400 text-green-800 dark:text-sand-300 rounded-full badge transition-colors">
                          {post.category}
                        </span>
                      </div>
                      <h3 className="text-lg font-medium text-green-800 dark:text-sand-300 mb-2 card-title transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-green-700 dark:text-sand-400 mb-4 text-sm card-subtitle transition-colors">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-green-100 dark:border-night-300 divider transition-colors">
                        <div className="flex items-center gap-2 text-sm text-green-600 dark:text-sand-500 card-muted transition-colors">
                          <User className="h-3 w-3" />
                          <span>{post.author}</span>
                          <span className="mx-1">•</span>
                          <Calendar className="h-3 w-3" />
                          <span>{post.date}</span>
                        </div>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="text-sm text-green-600 dark:text-sand-400 hover:text-green-800 dark:hover:text-sand-300 nav-link transition-colors"
                        >
                          Read More
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-10 flex justify-center">
                <nav className="flex items-center gap-1">
                  <button className="p-2 rounded-md border border-green-200 dark:border-night-300 text-green-700 dark:text-sand-400 hover:bg-green-50 dark:hover:bg-night-400 btn-outline transition-colors">
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  <button className="px-3 py-1 rounded-md bg-green-600 text-white dark:bg-sand-700 dark:text-sand-100 btn-primary transition-colors">
                    1
                  </button>
                  <button className="px-3 py-1 rounded-md border border-green-200 dark:border-night-300 text-green-700 dark:text-sand-400 hover:bg-green-50 dark:hover:bg-night-400 btn-outline transition-colors">
                    2
                  </button>
                  <button className="px-3 py-1 rounded-md border border-green-200 dark:border-night-300 text-green-700 dark:text-sand-400 hover:bg-green-50 dark:hover:bg-night-400 btn-outline transition-colors">
                    3
                  </button>
                  <span className="text-green-700 dark:text-sand-400">...</span>
                  <button className="px-3 py-1 rounded-md border border-green-200 dark:border-night-300 text-green-700 dark:text-sand-400 hover:bg-green-50 dark:hover:bg-night-400 btn-outline transition-colors">
                    8
                  </button>
                  <button className="p-2 rounded-md border border-green-200 dark:border-night-300 text-green-700 dark:text-sand-400 hover:bg-green-50 dark:hover:bg-night-400 btn-outline transition-colors">
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
