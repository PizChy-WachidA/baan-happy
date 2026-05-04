'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
      setIsLoading(false)
    }

    checkAuth()

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null)
    })

    return () => {
      data.subscription.unsubscribe()
    }
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    router.push('/')
  }

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="container-max flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-2xl text-blue-600">
          <span className="text-3xl">🐕</span>
          <span className="hidden sm:inline">Baan Happy</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
            Home
          </Link>
          <a href="#services" className="text-gray-600 hover:text-blue-600 transition-colors">
            Services
          </a>
          <a href="#gallery" className="text-gray-600 hover:text-blue-600 transition-colors">
            Gallery
          </a>
          <a href="#pricing" className="text-gray-600 hover:text-blue-600 transition-colors">
            Pricing
          </a>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          {!isLoading && !user ? (
            <>
              <Link href="/login" className="btn-sm bg-transparent text-blue-600 hover:bg-blue-50">
                Sign In
              </Link>
              <Link href="/register" className="btn-primary text-sm py-2">
                Sign Up
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="btn-sm bg-blue-50 text-blue-600 hover:bg-blue-100">
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="btn-sm bg-red-50 text-red-600 hover:bg-red-100"
              >
                Logout
              </button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="container-max py-4 flex flex-col gap-4">
            <Link href="/" className="text-gray-600 hover:text-blue-600">
              Home
            </Link>
            <a href="#services" className="text-gray-600 hover:text-blue-600">
              Services
            </a>
            <a href="#gallery" className="text-gray-600 hover:text-blue-600">
              Gallery
            </a>
            <a href="#pricing" className="text-gray-600 hover:text-blue-600">
              Pricing
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
