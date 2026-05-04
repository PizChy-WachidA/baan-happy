'use client'

export default function Gallery() {
  const images = [
    { id: 1, emoji: '🐕‍🦺', title: 'Trained Staff' },
    { id: 2, emoji: '🏃‍♂️', title: 'Active Play' },
    { id: 3, emoji: '🛏️', title: 'Comfortable Rest' },
    { id: 4, emoji: '🍖', title: 'Healthy Meals' },
    { id: 5, emoji: '🎾', title: 'Fun Games' },
    { id: 6, emoji: '😴', title: 'Quality Sleep' },
  ]

  return (
    <section id="gallery" className="section-py bg-gray-50">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="heading-h2 mb-4 text-gray-900">Gallery</h2>
          <p className="text-subtitle text-gray-600 max-w-2xl mx-auto">
            See your dog having the best time in our facilities
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image) => (
            <div
              key={image.id}
              className="aspect-square bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 flex items-center justify-center hover:shadow-md transition-shadow"
            >
              <div className="text-center">
                <p className="text-6xl mb-4">{image.emoji}</p>
                <p className="text-gray-600 font-semibold">{image.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
