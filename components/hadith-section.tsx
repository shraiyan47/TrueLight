import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, ArrowRight } from "lucide-react"
import Link from "next/link"

interface Hadith {
  narrator: string
  text: string
  source: string
  book: string
  number: number
}

interface HadithSectionProps {
  randomHadith: Hadith
}

export default function HadithSection({ randomHadith }: HadithSectionProps) {
  return (
    <section className="py-12">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-8">Hadith of the Day</h2>

        <Card className="shadow-md max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Hadith
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="italic text-lg">{randomHadith.text}</p>

              <div className="pt-4 border-t">
                <p className="font-medium">Narrator: {randomHadith.narrator}</p>
                <p className="text-sm text-muted-foreground">
                  Source: {randomHadith.source}, {randomHadith.book}, No. {randomHadith.number}
                </p>
              </div>

              <div className="pt-4 flex justify-end">
                <Link href="/hadith">
                  <Button variant="outline" className="gap-2">
                    Explore More Hadith
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
