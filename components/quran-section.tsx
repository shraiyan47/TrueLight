"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Book, Search } from "lucide-react"

interface Surah {
  number: number
  name: string
  arabicName: string
  versesCount: number
  revelationType: string
}

interface Ayah {
  surah: string
  number: number
  arabic: string
  translation: string
  reference: string
}

interface QuranSectionProps {
  randomAyah: Ayah
}

export default function QuranSection({ randomAyah }: QuranSectionProps) {
  const [searchQuery, setSearchQuery] = useState("")

  // Sample Surah list - would be fetched from API/database
  const surahs: Surah[] = [
    { number: 1, name: "Al-Fatiha", arabicName: "الفاتحة", versesCount: 7, revelationType: "Meccan" },
    { number: 2, name: "Al-Baqarah", arabicName: "البقرة", versesCount: 286, revelationType: "Medinan" },
    { number: 3, name: "Aal-Imran", arabicName: "آل عمران", versesCount: 200, revelationType: "Medinan" },
    { number: 4, name: "An-Nisa", arabicName: "النساء", versesCount: 176, revelationType: "Medinan" },
    { number: 5, name: "Al-Ma'idah", arabicName: "المائدة", versesCount: 120, revelationType: "Medinan" },
    { number: 6, name: "Al-An'am", arabicName: "الأنعام", versesCount: 165, revelationType: "Meccan" },
    { number: 7, name: "Al-A'raf", arabicName: "الأعراف", versesCount: 206, revelationType: "Meccan" },
    { number: 8, name: "Al-Anfal", arabicName: "الأنفال", versesCount: 75, revelationType: "Medinan" },
    { number: 9, name: "At-Tawbah", arabicName: "التوبة", versesCount: 129, revelationType: "Medinan" },
    { number: 10, name: "Yunus", arabicName: "يونس", versesCount: 109, revelationType: "Meccan" },
    { number: 11, name: "Hud", arabicName: "هود", versesCount: 123, revelationType: "Meccan" },
    { number: 12, name: "Yusuf", arabicName: "يوسف", versesCount: 111, revelationType: "Meccan" },
    { number: 13, name: "Ar-Ra'd", arabicName: "الرعد", versesCount: 43, revelationType: "Medinan" },
    { number: 14, name: "Ibrahim", arabicName: "إبراهيم", versesCount: 52, revelationType: "Meccan" },
    { number: 15, name: "Al-Hijr", arabicName: "الحجر", versesCount: 99, revelationType: "Meccan" },
  ]

  const filteredSurahs = surahs.filter(
    (surah) =>
      surah.name.toLowerCase().includes(searchQuery.toLowerCase()) || surah.number.toString().includes(searchQuery),
  )

  return (
    <section className="py-12 bg-secondary/30">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-8">The Holy Quran</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Random Ayah of the Day */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Book className="h-5 w-5 text-primary" />
                Ayah of the Day
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-2xl arabic-text leading-relaxed text-center">{randomAyah.arabic}</p>
                <p className="italic text-center">{randomAyah.translation}</p>
                <p className="text-sm text-muted-foreground text-center">{randomAyah.reference}</p>
              </div>
            </CardContent>
          </Card>

          {/* Surah List */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Book className="h-5 w-5 text-primary" />
                Surah Index
              </CardTitle>
              <div className="relative mt-2">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search surah by name or number..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="surah-list">
                <div className="grid gap-2">
                  {filteredSurahs.map((surah) => (
                    <Link
                      key={surah.number}
                      href={`/quran/${surah.number}`}
                      className="flex justify-between items-center p-3 rounded-md hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 text-primary font-medium text-sm">
                          {surah.number}
                        </span>
                        <div>
                          <h3 className="font-medium">{surah.name}</h3>
                          <p className="text-xs text-muted-foreground">
                            {surah.revelationType} • {surah.versesCount} verses
                          </p>
                        </div>
                      </div>
                      <span className="text-lg arabic-text">{surah.arabicName}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
