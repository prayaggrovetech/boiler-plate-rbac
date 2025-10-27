"use client"

import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from "@/lib/theme/theme-provider"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider
        defaultTheme="system"
        storageKey="micro-saas-theme"
      >
        {children}
      </ThemeProvider>
    </SessionProvider>
  )
}