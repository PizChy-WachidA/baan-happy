'use client'

import Link from 'next/link'

export default function Pricing() {
  const dailyRate = 300

  return (
    <section id="pricing" className="section-py bg-white">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="heading-h2 mb-4 text-gray-900">Simple Pricing</h2>
          <p className="text-subtitle text-gray-600 max-w-2xl mx-auto">
            Transparent pricing with no hidden fees
          </p>
        </div>

        {/* Pricing Card */}
        <div className="max-w-md mx-auto">
          <div className="card p-8 border-2 border-blue-500">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Premium Boarding</h3>
              <p className="text-gray-600">Per day per dog</p>
            </div>

            <div className="text-center mb-8">
              <p className="text-5xl font-bold text-blue-600">
                ฿{dailyRate.toLocaleString()}
              </p>
              <p className="text-gray-600 mt-2">per dog per day</p>
            </div>

            {/* Features */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <span className="text-green-500">✓</span>
                <span className="text-gray-700">Comfortable accommodation</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-green-500">✓</span>
                <span className="text-gray-700">Daily video updates</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-green-500">✓</span>
                <span className="text-gray-700">Playtime & socialization</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-green-500">✓</span>
                <span className="text-gray-700">Premium meals included</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-green-500">✓</span>
                <span className="text-gray-700">24/7 monitoring</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-green-500">✓</span>
                <span className="text-gray-700">Health & safety assured</span>
              </div>
            </div>

            {/* CTA */}
            <Link href="/booking" className="btn-primary w-full text-center block">
              Book Your Dog
            </Link>

            <p className="text-center text-sm text-gray-500 mt-4">
              No hidden fees. Cancel anytime.
            </p>
          </div>
        </div>

        {/* Price Calculator */}
        <div className="mt-16 bg-blue-50 rounded-xl p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Calculator</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-2">
                Number of Dogs
              </label>
              <input
                type="number"
                defaultValue="1"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg"
                min="1"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-2">
                Number of Days
              </label>
              <input
                type="number"
                defaultValue="5"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg"
                min="1"
              />
            </div>
            <div className="flex items-end">
              <div className="w-full">
                <p className="text-sm font-semibold text-gray-700 mb-2">Total Price</p>
                <p className="text-3xl font-bold text-blue-600">
                  ฿{(dailyRate * 5).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
