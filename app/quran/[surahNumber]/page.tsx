import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Book } from "lucide-react"
import Link from "next/link"

interface SurahPageProps {
  params: {
    surahNumber: string
  }
}

interface Verse {
  number: number
  arabic: string
  translation: string
}

interface Surah {
  number: number
  name: string
  arabicName: string
  versesCount: number
  revelationType: string
  verses: Verse[]
}

export default async function SurahPage({ params }: SurahPageProps) {
  const surahNumber = Number.parseInt(params.surahNumber)

  // This would be fetched from an API or database
  const surah = await getSurah(surahNumber)

  if (!surah) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Surah not found</h1>
        <p className="mb-6">The requested Surah could not be found.</p>
        <Link href="/quran">
          <Button>Return to Quran Index</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <Link href="/" className="inline-flex items-center gap-2 mb-6 hover:text-primary transition-colors">
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>

      <Card className="shadow-md mb-8">
        <CardHeader className="text-center border-b pb-6">
          <CardTitle className="flex flex-col items-center gap-2">
            <Book className="h-6 w-6 text-primary" />
            <div>
              <h1 className="text-3xl font-bold">{surah.name}</h1>
              <p className="text-2xl arabic-text mt-2">{surah.arabicName}</p>
            </div>
          </CardTitle>
          <div className="mt-4 text-muted-foreground">
            <p>Surah Number: {surah.number}</p>
            <p>Revelation Type: {surah.revelationType}</p>
            <p>Total Verses: {surah.versesCount}</p>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-8">
            {surah.verses.map((verse) => (
              <div key={verse.number} className="pb-6 border-b last:border-0">
                <div className="flex justify-between items-center mb-4">
                  <span className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 text-primary font-medium text-sm">
                    {verse.number}
                  </span>
                </div>
                <p className="text-xl arabic-text leading-relaxed text-right mb-4">{verse.arabic}</p>
                <p className="text-muted-foreground">{verse.translation}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        {surahNumber > 1 && (
          <Link href={`/quran/${surahNumber - 1}`}>
            <Button variant="outline">Previous Surah</Button>
          </Link>
        )}
        <div className="flex-1"></div>
        {surahNumber < 114 && (
          <Link href={`/quran/${surahNumber + 1}`}>
            <Button variant="outline">Next Surah</Button>
          </Link>
        )}
      </div>
    </div>
  )
}

async function getSurah(surahNumber: number): Promise<Surah | null> {
  // This would be fetched from an API or database
  // For demonstration, returning mock data for Al-Fatiha
  if (surahNumber === 1) {
    return {
      number: 1,
      name: "Al-Fatiha",
      arabicName: "الفاتحة",
      versesCount: 7,
      revelationType: "Meccan",
      verses: [
        {
          number: 1,
          arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
          translation: "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
        },
        {
          number: 2,
          arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
          translation: "[All] praise is [due] to Allah, Lord of the worlds -",
        },
        {
          number: 3,
          arabic: "الرَّحْمَٰنِ الرَّحِيمِ",
          translation: "The Entirely Merciful, the Especially Merciful,",
        },
        {
          number: 4,
          arabic: "مَالِكِ يَوْمِ الدِّينِ",
          translation: "Sovereign of the Day of Recompense.",
        },
        {
          number: 5,
          arabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
          translation: "It is You we worship and You we ask for help.",
        },
        {
          number: 6,
          arabic: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
          translation: "Guide us to the straight path -",
        },
        {
          number: 7,
          arabic: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
          translation:
            "The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray.",
        },
      ],
    }
  }

  // For other surahs, return a placeholder with limited verses
  if (surahNumber > 0 && surahNumber <= 114) {
    return {
      number: surahNumber,
      name: `Surah ${surahNumber}`,
      arabicName: `سورة ${surahNumber}`,
      versesCount: 10,
      revelationType: surahNumber < 30 ? "Meccan" : "Medinan",
      verses: Array.from({ length: 5 }, (_, i) => ({
        number: i + 1,
        arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
        translation: `This is verse ${i + 1} of Surah ${surahNumber}.`,
      })),
    }
  }

  return null
}
