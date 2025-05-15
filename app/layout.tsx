import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import ClientOnly from "@/components/client-only"


const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "True Light - Islamic Knowledge Portal",
  description: "Guiding you on the path of knowledge and spirituality",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html>
      <body className={inter.className} suppressHydrationWarning>
        <ClientOnly>
          <ThemeProvider defaultTheme="light">
            {children}
          </ThemeProvider>
        </ClientOnly>
      </body>
    </html>
  )
}
