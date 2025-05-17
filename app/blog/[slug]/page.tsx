import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"
import { Calendar, User, Tag, ArrowLeft, Share2, Bookmark, Facebook, Twitter } from "lucide-react"

// This would typically come from a database or CMS
const blogPost = {
  title: "Understanding the Importance of Dhikr in Daily Life",
  excerpt:
    "Explore how the practice of remembrance of Allah can transform your spiritual journey and bring peace to your heart.",
  content: `
    <p>In the name of Allah, the Most Gracious, the Most Merciful.</p>
    
    <p>Dhikr, the remembrance of Allah, is one of the most powerful spiritual practices in Islam. It is a means of connecting with our Creator, finding inner peace, and strengthening our faith. The Quran emphasizes its importance in numerous verses, such as: "Verily, in the remembrance of Allah do hearts find rest" (Surah Ar-Ra'd, 13:28).</p>
    
    <h2>What is Dhikr?</h2>
    
    <p>Dhikr refers to the remembrance of Allah through various forms of worship, including reciting the Quran, glorifying Allah with phrases like "SubhanAllah" (Glory be to Allah), "Alhamdulillah" (All praise is due to Allah), and "Allahu Akbar" (Allah is the Greatest), and engaging in supplications (dua).</p>
    
    <p>The Prophet Muhammad (peace be upon him) said: "The example of the one who remembers his Lord and the one who does not remember his Lord is like the example of the living and the dead." (Bukhari)</p>
    
    <h2>Benefits of Regular Dhikr</h2>
    
    <p>Incorporating dhikr into our daily routines brings numerous spiritual and psychological benefits:</p>
    
    <ul>
      <li><strong>Spiritual Connection:</strong> Dhikr strengthens our connection with Allah, reminding us of His presence in our lives.</li>
      <li><strong>Inner Peace:</strong> As the Quran states, hearts find rest in the remembrance of Allah. Regular dhikr helps alleviate anxiety and stress.</li>
      <li><strong>Protection:</strong> Dhikr serves as a spiritual shield against negative influences and temptations.</li>
      <li><strong>Increased Awareness:</strong> Remembering Allah throughout the day increases our God-consciousness (taqwa) and helps us make better decisions.</li>
      <li><strong>Expiation of Sins:</strong> Many forms of dhikr are means of seeking forgiveness and purifying the soul.</li>
    </ul>
    
    <h2>Incorporating Dhikr into Daily Life</h2>
    
    <p>Making dhikr a consistent part of our lives doesn't require extensive time commitments. Here are some practical ways to incorporate it:</p>
    
    <ol>
      <li><strong>Morning and Evening Adhkar:</strong> The Prophet (peace be upon him) taught specific supplications to recite in the morning and evening.</li>
      <li><strong>After Prayers:</strong> Spend a few minutes after each obligatory prayer engaging in dhikr.</li>
      <li><strong>During Daily Activities:</strong> Remember Allah while driving, walking, or waiting by silently reciting phrases of remembrance.</li>
      <li><strong>Before Sleep:</strong> Recite the recommended adhkar before sleeping for protection and blessings.</li>
      <li><strong>During Times of Difficulty:</strong> Turn to Allah through dhikr when facing challenges or making important decisions.</li>
    </ol>
    
    <p>The beauty of dhikr is that it can be performed anywhere, at any time, and in any state (except in impure places). It doesn't require specific conditions or preparations, making it accessible to everyone regardless of their circumstances.</p>
    
    <h2>Conclusion</h2>
    
    <p>In our fast-paced modern lives, dhikr provides a spiritual anchor that keeps us connected to our purpose and to our Creator. By making remembrance of Allah a consistent practice, we can experience greater tranquility, spiritual growth, and a deeper relationship with Allah.</p>
    
    <p>May Allah make us among those who remember Him abundantly and find peace in His remembrance. Ameen.</p>
  `,
  category: "Spirituality",
  author: "Imam Abdullah",
  authorTitle: "Islamic Scholar and Spiritual Guide",
  authorBio:
    "Imam Abdullah has been teaching Islamic spirituality for over 15 years and serves as the spiritual guide at the Central Mosque. He specializes in Tasawwuf and practical Islamic spirituality for modern Muslims.",
  date: "May 12, 2024",
  readTime: "7 min read",
  imageUrl: "/placeholder.svg?height=400&width=800",
  tags: ["Dhikr", "Spirituality", "Daily Practice", "Worship", "Mental Health"],
  relatedPosts: [
    {
      id: "6",
      title: "The Art of Dua: Enhancing Your Supplication",
      slug: "art-of-dua-enhancing-supplication",
      imageUrl: "/placeholder.svg?height=100&width=200",
    },
    {
      id: "8",
      title: "Understanding the Concept of Tawakkul (Reliance on Allah)",
      slug: "understanding-concept-tawakkul",
      imageUrl: "/placeholder.svg?height=100&width=200",
    },
    {
      id: "4",
      title: "The Significance of Surah Al-Kahf on Fridays",
      slug: "significance-surah-al-kahf-fridays",
      imageUrl: "/placeholder.svg?height=100&width=200",
    },
  ],
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  // In a real application, you would fetch the blog post based on the slug
  // For this example, we're using a static blog post

  return (
    <div className="min-h-screen bg-white dark:bg-night-700 flex flex-col transition-colors">
      <Header />
      <main className="flex-grow">
        {/* Hero section with image */}
        <div className="relative h-[300px] md:h-[400px]">
          <img
            src={blogPost.imageUrl || "/placeholder.svg"}
            alt={blogPost.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end">
            <div className="container mx-auto px-4 py-8 max-w-7xl">
              <Link
                href="/blog"
                className="inline-flex items-center text-white hover:text-green-200 mb-4 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Link>
              <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">{blogPost.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-white text-sm">
                <span className="bg-green-600 dark:bg-sand-700 px-2 py-1 rounded-full">{blogPost.category}</span>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{blogPost.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{blogPost.author}</span>
                </div>
                <span>{blogPost.readTime}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 max-w-7xl">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Main content */}
            <div className="md:w-2/3">
              <div className="bg-white dark:bg-night-500 rounded-lg shadow border border-green-100 dark:border-night-300 p-6 card-bg transition-colors">
                {/* Article content */}
                <div
                  className="prose prose-green dark:prose-invert max-w-none card-text transition-colors"
                  dangerouslySetInnerHTML={{ __html: blogPost.content }}
                />

                {/* Tags */}
                <div className="mt-8 pt-6 border-t border-green-100 dark:border-night-300 divider transition-colors">
                  <div className="flex items-center flex-wrap gap-2">
                    <Tag className="h-4 w-4 text-green-600 dark:text-sand-400 icon-primary transition-colors" />
                    {blogPost.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 bg-green-100 dark:bg-night-400 text-green-800 dark:text-sand-300 rounded-full badge transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Share buttons */}
                <div className="mt-8 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-green-800 dark:text-sand-300 card-title transition-colors">Share:</span>
                    <button className="p-2 rounded-full bg-green-100 dark:bg-night-400 text-green-600 dark:text-sand-400 hover:bg-green-200 dark:hover:bg-night-300 transition-colors">
                      <Facebook className="h-4 w-4" />
                    </button>
                    <button className="p-2 rounded-full bg-green-100 dark:bg-night-400 text-green-600 dark:text-sand-400 hover:bg-green-200 dark:hover:bg-night-300 transition-colors">
                      <Twitter className="h-4 w-4" />
                    </button>
                    <button className="p-2 rounded-full bg-green-100 dark:bg-night-400 text-green-600 dark:text-sand-400 hover:bg-green-200 dark:hover:bg-night-300 transition-colors">
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>
                  <button className="flex items-center gap-2 px-3 py-1.5 bg-green-100 dark:bg-night-400 text-green-700 dark:text-sand-400 rounded-md hover:bg-green-200 dark:hover:bg-night-300 btn-secondary transition-colors">
                    <Bookmark className="h-4 w-4" />
                    <span>Save</span>
                  </button>
                </div>
              </div>

              {/* Author bio */}
              <div className="mt-8 bg-white dark:bg-night-500 rounded-lg shadow border border-green-100 dark:border-night-300 p-6 card-bg transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-night-400 flex items-center justify-center text-green-600 dark:text-sand-400 text-xl font-bold transition-colors">
                    {blogPost.author.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-medium text-green-800 dark:text-sand-300 card-title transition-colors">
                      {blogPost.author}
                    </h3>
                    <p className="text-green-600 dark:text-sand-400 text-sm card-subtitle transition-colors">
                      {blogPost.authorTitle}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-green-700 dark:text-sand-400 card-subtitle transition-colors">
                  {blogPost.authorBio}
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="md:w-1/3">
              {/* Related posts */}
              <div className="bg-white dark:bg-night-500 rounded-lg shadow border border-green-100 dark:border-night-300 p-5 mb-6 card-bg transition-colors">
                <h3 className="font-medium text-green-800 dark:text-sand-300 mb-4 card-title transition-colors">
                  Related Articles
                </h3>
                <div className="space-y-4">
                  {blogPost.relatedPosts.map((post) => (
                    <Link key={post.id} href={`/blog/${post.slug}`}>
                      <div className="flex gap-3 group">
                        <img
                          src={post.imageUrl || "/placeholder.svg"}
                          alt={post.title}
                          className="w-20 h-16 object-cover rounded"
                        />
                        <h4 className="text-green-700 dark:text-sand-400 group-hover:text-green-600 dark:group-hover:text-sand-300 text-sm card-subtitle transition-colors">
                          {post.title}
                        </h4>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Popular tags */}
              <div className="bg-white dark:bg-night-500 rounded-lg shadow border border-green-100 dark:border-night-300 p-5 card-bg transition-colors">
                <h3 className="font-medium text-green-800 dark:text-sand-300 mb-3 card-title transition-colors">
                  Popular Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {blogPost.tags.concat(["Prayer", "Quran", "Hadith", "Fiqh", "Ramadan"]).map((tag) => (
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
        </div>
      </main>
      <Footer />
    </div>
  )
}
