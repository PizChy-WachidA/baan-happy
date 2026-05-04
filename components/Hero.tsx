'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Hero() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
    }

    checkAuth()
  }, [])

  return (
    <section className="min-h-[90vh] flex items-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container-max w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="heading-h1 text-gray-900">
                Your Dog's Happy Home Away from Home
              </h1>
              <p className="text-subtitle text-gray-600">
                Premium dog boarding with daily video updates, professional care, and a loving
                environment. We treat every pup like family.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              {user ? (
                <Link href="/booking" className="btn-primary text-center">
                  Book Now
                </Link>
              ) : (
                <Link href="/register" className="btn-primary text-center">
                  Get Started
                </Link>
              )}
              <button className="btn-secondary text-center">Learn More</button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
              <div>
                <p className="text-3xl font-bold text-blue-600">500+</p>
                <p className="text-sm text-gray-600">Happy Dogs</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-blue-600">4.9★</p>
                <p className="text-sm text-gray-600">5-Star Rating</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-blue-600">8yr</p>
                <p className="text-sm text-gray-600">In Business</p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative h-96 lg:h-full min-h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl overflow-hidden flex items-center justify-center">
            <div className="text-center">
              <p className="text-6xl mb-4">🐕</p>
              <p className="text-gray-600">Happy Dog Playing</p>
              <p className="text-sm text-gray-500 mt-2">[Image Placeholder]</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
