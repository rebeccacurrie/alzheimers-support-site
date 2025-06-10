import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { Dancing_Script } from "next/font/google"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-handwriting",
  display: "swap",
})

export const metadata = {
  title: "Still Here With You",
  description: "Holding hands through every stage. You're not alone.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${dancingScript.variable} font-sans`}>{children}</body>
    </html>
  )
}
