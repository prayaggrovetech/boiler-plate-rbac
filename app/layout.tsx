import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import { Providers } from "../components/providers"
import { ErrorBoundary } from "@/components/error-boundary"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Micro SaaS Boilerplate",
    template: "%s | Micro SaaS Boilerplate"
  },
  description: "Production-ready SaaS boilerplate with Next.js, TypeScript, and dynamic RBAC system",
  keywords: ["SaaS", "Next.js", "TypeScript", "RBAC", "Boilerplate", "React"],
  authors: [{ name: "Micro SaaS Team" }],
  creator: "Micro SaaS Boilerplate",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://microsaas.com",
    title: "Micro SaaS Boilerplate",
    description: "Production-ready SaaS boilerplate with Next.js, TypeScript, and dynamic RBAC system",
    siteName: "Micro SaaS Boilerplate",
  },
  twitter: {
    card: "summary_large_image",
    title: "Micro SaaS Boilerplate",
    description: "Production-ready SaaS boilerplate with Next.js, TypeScript, and dynamic RBAC system",
    creator: "@microsaas",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ErrorBoundary>
          <Providers>
            {children}
            <Toaster />
          </Providers>
        </ErrorBoundary>
      </body>
    </html>
  )
}