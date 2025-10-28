"use client"

import React from "react"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { ThemeToggleButton } from "@/components/theme"
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
  NavbarButton,
} from "@/components/ui/resizable-navbar"

export interface PublicLayoutProps {
  children: React.ReactNode
}

export function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicHeader />
      <main className="flex-1 pt-20">
        {children}
      </main>
      <PublicFooter />
    </div>
  )
}

function PublicHeader() {
  const { data: session } = useSession()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navigation = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Contact", link: "/contact" },
  ]

  return (
    <>
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <Link href="/" className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1">
            <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">MS</span>
            </div>
            <span className="font-bold text-lg text-black dark:text-white">Micro SaaS</span>
          </Link>
          
          <NavItems items={navigation} />
          
          <div className="flex items-center gap-3 relative z-20">
            <ThemeToggleButton />
            {session ? (
              <NavbarButton as={Link} href="/dashboard" variant="primary">
                Dashboard
              </NavbarButton>
            ) : (
              <>
                <NavbarButton as={Link} href="/login" variant="secondary">
                  Sign In
                </NavbarButton>
                <NavbarButton as={Link} href="/signup" variant="primary">
                  Get Started
                </NavbarButton>
              </>
            )}
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <Link href="/" className="relative z-20 flex items-center space-x-2 px-2 py-1">
              <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">MS</span>
              </div>
              <span className="font-bold text-lg text-black dark:text-white">Micro SaaS</span>
            </Link>
            <div className="flex items-center gap-3">
              <ThemeToggleButton />
              <MobileNavToggle
                isOpen={mobileMenuOpen}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              />
            </div>
          </MobileNavHeader>
          
          <MobileNavMenu
            isOpen={mobileMenuOpen}
            onClose={() => setMobileMenuOpen(false)}
          >
            {navigation.map((item, idx) => (
              <Link
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
              >
                <span className="block">{item.name}</span>
              </Link>
            ))}
            
            <div className="flex w-full flex-col gap-3 pt-4 border-t border-border">
              {session ? (
                <NavbarButton
                  as={Link}
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  variant="primary"
                  className="w-full"
                >
                  Dashboard
                </NavbarButton>
              ) : (
                <>
                  <NavbarButton
                    as={Link}
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    variant="secondary"
                    className="w-full"
                  >
                    Sign In
                  </NavbarButton>
                  <NavbarButton
                    as={Link}
                    href="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    variant="primary"
                    className="w-full"
                  >
                    Get Started
                  </NavbarButton>
                </>
              )}
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </>
  )
}

function PublicFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-neutral-50 dark:bg-black text-neutral-900 dark:text-white overflow-hidden">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
            {/* Left Column - Brand & CTA */}
            <div className="lg:col-span-5">
              <Link href="/" className="inline-flex items-center space-x-3 mb-8 group">
                <div className="h-12 w-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform shadow-lg">
                  <span className="text-white font-bold text-lg">MS</span>
                </div>
                <span className="font-bold text-2xl">Micro SaaS</span>
              </Link>
              
              <p className="text-neutral-600 dark:text-neutral-400 text-base leading-relaxed mb-8 max-w-md">
                Production-ready SaaS boilerplate with Next.js 14+, TypeScript, and dynamic RBAC. 
                Ship your next big idea faster.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link 
                  href="/signup"
                  className="inline-flex items-center justify-center px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-full hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
                >
                  Get Started
                </Link>
                <Link 
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 border border-neutral-300 dark:border-white/20 text-neutral-900 dark:text-white font-semibold rounded-full hover:bg-neutral-100 dark:hover:bg-white/10 transition-colors"
                >
                  Contact Us
                </Link>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-4">
                <Link 
                  href="#" 
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-neutral-300 dark:border-white/20 hover:bg-neutral-100 dark:hover:bg-white/10 transition-colors"
                  aria-label="Twitter"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </Link>
                <Link 
                  href="#" 
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-neutral-300 dark:border-white/20 hover:bg-neutral-100 dark:hover:bg-white/10 transition-colors"
                  aria-label="GitHub"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </Link>
                <Link 
                  href="#" 
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-neutral-300 dark:border-white/20 hover:bg-neutral-100 dark:hover:bg-white/10 transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </Link>
              </div>
            </div>

            {/* Right Columns - Links */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8 lg:gap-12">
                {/* Product */}
                <div>
                  <h3 className="text-neutral-900 dark:text-white font-semibold text-sm mb-6 uppercase tracking-wider">Product</h3>
                  <ul className="space-y-4">
                    <li>
                      <Link href="#" className="text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-white text-sm transition-colors">
                        Features
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-white text-sm transition-colors">
                        Pricing
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-white text-sm transition-colors">
                        Documentation
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-white text-sm transition-colors">
                        API
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Company */}
                <div>
                  <h3 className="text-neutral-900 dark:text-white font-semibold text-sm mb-6 uppercase tracking-wider">Company</h3>
                  <ul className="space-y-4">
                    <li>
                      <Link href="/about" className="text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-white text-sm transition-colors">
                        About
                      </Link>
                    </li>
                    <li>
                      <Link href="/contact" className="text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-white text-sm transition-colors">
                        Contact
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-white text-sm transition-colors">
                        Blog
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-white text-sm transition-colors">
                        Careers
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Legal */}
                <div>
                  <h3 className="text-neutral-900 dark:text-white font-semibold text-sm mb-6 uppercase tracking-wider">Legal</h3>
                  <ul className="space-y-4">
                    <li>
                      <Link href="#" className="text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-white text-sm transition-colors">
                        Privacy
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-white text-sm transition-colors">
                        Terms
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-white text-sm transition-colors">
                        Security
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-white text-sm transition-colors">
                        Cookies
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-200 dark:border-white/10 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-neutral-500 dark:text-neutral-500 text-sm">
              © {currentYear} Micro SaaS. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-neutral-500 dark:text-neutral-500">
              <span>Made with ❤️ for developers</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}