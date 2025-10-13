import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { AppNav } from "@/components/app-nav"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "SpinalSync Education Framework",
  description: "Comprehensive SCI education platform",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={<div>Loading...</div>}>
          <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center px-4">
              <h1 className="text-lg font-semibold">SpinalSync</h1>
            </div>
            <div className="container px-4 pb-3">
              <AppNav />
            </div>
          </header>
          <main className="container px-4 py-6">{children}</main>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
