import Link from "next/link"
import { Calendar, User, ArrowRight } from "lucide-react"

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
}

// Sample blog posts data
const featuredBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Understanding the Importance of Dhikr in Daily Life",
    excerpt:
      "Explore how the practice of remembrance of Allah can transform your spiritual journey and bring peace to your heart.",
    category: "Spirituality",
    author: "Imam Abdullah",
    date: "May 12, 2025",
    imageUrl: "https://kharchoufa.com/en/wp-content/uploads/2024/05/islamic_spiritual_growth_practices.jpg",
    slug: "understanding-importance-of-dhikr",
  },
  {
    id: "2",
    title: "The Etiquettes of Fasting During Ramadan",
    excerpt:
      "Learn about the proper practices and spiritual dimensions that enhance your fasting experience during the holy month.",
    category: "Ramadan",
    author: "Dr. Aisha Rahman",
    date: "April 8, 2024",
    imageUrl: "https://img.freepik.com/premium-photo/muslim-family-praying-together-muslim-prayer-after-breaking-fast-islamic-holy-month-ramadan_530697-71116.jpg",
    slug: "etiquettes-of-fasting-ramadan",
  },
  {
    id: "3",
    title: "Raising Muslim Children in the Modern World",
    excerpt:
      "Practical advice for parents on nurturing faith, identity, and values in children while navigating contemporary challenges.",
    category: "Family",
    author: "Ustadh Yusuf Ali",
    date: "May 5, 2025",
    imageUrl: "https://deenin.com/cdn/shop/articles/portrait-happy-muslim-family-with-children-reading-quran-pray-together-home_8595-20964.jpg?v=1688480491",
    slug: "raising-muslim-children-modern-world",
  },
]

export default function BlogSection() {
  return (
    <section className="py-8 bg-gray-50 dark:bg-night-800 transition-colors">
      <div className="container mx-auto px-0 max-w-5xl">
        <div className="flex justify-between items-center mb-8">
          {/* <h2 className="text-2xl font-bold text-green-800 dark:font-bold dark:text-sand-300 section-title transition-colors"> */}
        <h2 className= "text-2xl md:text-3xl font-bold text-center text-green-800 dark:text-sand-300 transition-colors">

            Islamic Knowledge
          </h2>
          <Link
            href="/blog"
            className="font-medium text-green-600 dark:text-sand-400 hover:text-green-800 dark:hover:text-sand-300 flex items-center gap-1 nav-link transition-colors"
          >
            View History of Islam
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-7">
          {featuredBlogPosts.map((post) => (
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

                {/* <h3 className="text-lg font-medium text-green-800 dark:text-sand-300 mb-2 card-title transition-colors">
                  {post.title}
                </h3> */}
                <Link
                    href={`/blog/${post.slug}`}
                    className="text-lg font-medium text-green-800 dark:text-sand-300 mb-2 card-title transition-colors hover:underline"
                  >
                    {post.title}
                </Link>

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
                  {/* <Link
                    href={`/blog/${post.slug}`}
                    className="text-sm font-bold text-green-600 dark:text-sand-400 hover:text-green-800 dark:hover:text-sand-300 nav-link transition-colors"
                  >
                    Read More
                  </Link> */}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 dark:bg-sand-700 dark:hover:bg-sand-600 text-white dark:text-sand-100 rounded-md btn-primary transition-colors"
          >
            Explore All Blog Posts
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
