"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "./ui/button"
import { Menu, X, Moon, Sun } from "./icons"

export default function Layout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  // Toggle dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-gray-950">
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-gray-950/95 dark:supports-[backdrop-filter]:bg-gray-950/60">
        <div className="container flex h-16 items-center px-4 md:px-6">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="text-lg font-bold">Anticipate</span>
          </Link>
          <nav className="hidden md:flex md:flex-1 md:items-center md:justify-between">
            <div className="flex gap-6">
              <Link
                href="/"
                className="text-sm font-medium transition-colors hover:text-gray-900/70 dark:hover:text-gray-50/70"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium transition-colors hover:text-gray-900/70 dark:hover:text-gray-50/70"
              >
                About
              </Link>
              <Link
                href="#"
                className="text-sm font-medium transition-colors hover:text-gray-900/70 dark:hover:text-gray-50/70"
              >
                Parcours
              </Link>
              <Link
                href="#"
                className="text-sm font-medium transition-colors hover:text-gray-900/70 dark:hover:text-gray-50/70"
              >
                Riders
              </Link>
              <Link
                href="#"
                className="text-sm font-medium transition-colors hover:text-gray-900/70 dark:hover:text-gray-50/70"
              >
                Subscribe
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setDarkMode(!darkMode)}
                className="rounded-full"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Button className="rounded-md bg-gray-900 text-white hover:bg-gray-900/90 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90">
                Sign In
              </Button>
            </div>
          </nav>
          <div className="flex flex-1 items-center justify-end md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDarkMode(!darkMode)}
              className="mr-2 rounded-full"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="container px-4 pb-4 md:hidden">
            <nav className="flex flex-col space-y-3">
              <Link
                href="/"
                className="rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/about"
                className="rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="#"
                className="rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                Race Analysis
              </Link>
              <Link
                href="#"
                className="rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                Rider Profiles
              </Link>
              <Link
                href="#"
                className="rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                Subscribe
              </Link>
              <Button className="w-full justify-center rounded-md bg-gray-900 text-white hover:bg-gray-900/90 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90">
                Sign In
              </Button>
            </nav>
          </div>
        )}
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
          <div className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-lg font-bold">CycleInsight</span>
            </Link>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 md:text-left">
              © {new Date().getFullYear()} CycleInsight. All rights reserved.
            </p>
          </div>
          <div className="flex gap-4">
            <Link href="#" className="text-sm font-medium hover:underline">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
