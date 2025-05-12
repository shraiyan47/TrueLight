import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { BookOpen, Search } from "lucide-react"
import Link from "next/link"

interface HadithCollection {
  id: string
  name: string
  arabicName: string
  description: string
  hadiths: Hadith[]
}

interface Hadith {
  id: string
  narrator: string
  text: string
  source: string
  book: string
  number: number
}

export default function HadithPage() {
  // This would be fetched from an API or database
  const collections: HadithCollection[] = [
    {
      id: "bukhari",
      name: "Sahih al-Bukhari",
      arabicName: "صحيح البخاري",
      description:
        "Compiled by Imam Muhammad al-Bukhari, this collection is regarded as the most authentic collection of hadith.",
      hadiths: [
        {
          id: "bukhari-1",
          narrator: "Umar ibn Al-Khattab",
          text: 'I heard Allah\'s Messenger (ﷺ) saying, "The reward of deeds depends upon the intentions and every person will get the reward according to what he has intended."',
          source: "Sahih al-Bukhari",
          book: "Book of Revelation",
          number: 1,
        },
        {
          id: "bukhari-2",
          narrator: "Aisha",
          text: "The commencement of the Divine Inspiration to Allah's Messenger (ﷺ) was in the form of good dreams which came true like bright daylight.",
          source: "Sahih al-Bukhari",
          book: "Book of Revelation",
          number: 3,
        },
        {
          id: "bukhari-3",
          narrator: "Abdullah ibn Umar",
          text: "Allah's Messenger (ﷺ) said: Islam is based on (the following) five (principles): To testify that none has the right to be worshipped but Allah and Muhammad is Allah's Messenger, to offer the prayers dutifully and perfectly, to pay Zakat, to perform Hajj and to observe fast during the month of Ramadan.",
          source: "Sahih al-Bukhari",
          book: "Book of Faith",
          number: 8,
        },
      ],
    },
    {
      id: "muslim",
      name: "Sahih Muslim",
      arabicName: "صحيح مسلم",
      description:
        "Compiled by Imam Muslim ibn al-Hajjaj, this is considered the second most authentic hadith collection after Sahih al-Bukhari.",
      hadiths: [
        {
          id: "muslim-1",
          narrator: "Abu Hurairah",
          text: 'The Messenger of Allah (ﷺ) said, "When a person dies, his deeds come to an end except for three: Sadaqah Jariyah (ceaseless charity), knowledge which is beneficial, or a virtuous descendant who prays for him (the deceased)."',
          source: "Sahih Muslim",
          book: "The Book of Wills",
          number: 1631,
        },
        {
          id: "muslim-2",
          narrator: "Jabir ibn Abdullah",
          text: 'I heard the Messenger of Allah (ﷺ) say: "Between a man and disbelief and paganism is the abandonment of prayer."',
          source: "Sahih Muslim",
          book: "Book of Faith",
          number: 82,
        },
      ],
    },
  ]

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Hadith Collections</h1>

      <div className="relative mb-8 max-w-md mx-auto">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input type="search" placeholder="Search hadith..." className="pl-8" />
      </div>

      <Tabs defaultValue="bukhari" className="w-full">
        <TabsList className="grid grid-cols-2 max-w-md mx-auto mb-8">
          <TabsTrigger value="bukhari">Sahih al-Bukhari</TabsTrigger>
          <TabsTrigger value="muslim">Sahih Muslim</TabsTrigger>
        </TabsList>

        {collections.map((collection) => (
          <TabsContent key={collection.id} value={collection.id}>
            <Card className="shadow-md mb-8">
              <CardHeader className="border-b">
                <CardTitle className="flex flex-col items-center gap-2 text-center">
                  <BookOpen className="h-6 w-6 text-primary" />
                  <div>
                    <h2 className="text-2xl font-bold">{collection.name}</h2>
                    <p className="text-xl arabic-text mt-1">{collection.arabicName}</p>
                  </div>
                </CardTitle>
                <p className="text-muted-foreground text-center mt-2">{collection.description}</p>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-8">
                  {collection.hadiths.map((hadith) => (
                    <div key={hadith.id} className="pb-6 border-b last:border-0">
                      <p className="italic mb-4">{hadith.text}</p>
                      <div>
                        <p className="font-medium">Narrator: {hadith.narrator}</p>
                        <p className="text-sm text-muted-foreground">
                          Source: {hadith.source}, {hadith.book}, No. {hadith.number}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      <div className="text-center">
        <Link href="/" className="text-primary hover:underline">
          Return to Home
        </Link>
      </div>
    </div>
  )
}
