'use client'

export default function Services() {
  const services = [
    {
      icon: '🏠',
      title: 'Comfortable Boarding',
      description: 'Spacious, clean facilities with cozy beds and climate control',
    },
    {
      icon: '🎮',
      title: 'Playtime & Socialization',
      description: 'Daily supervised play sessions with other dogs and staff',
    },
    {
      icon: '📹',
      title: 'Daily Video Updates',
      description: 'Live updates with photos and videos throughout the day',
    },
    {
      icon: '🥗',
      title: 'Premium Meals',
      description: 'Nutritious meals tailored to your dog\'s dietary needs',
    },
    {
      icon: '🏥',
      title: 'Health & Safety',
      description: 'Vaccination required, professional staff, 24/7 monitoring',
    },
    {
      icon: '🚗',
      title: 'Pickup & Delivery',
      description: 'Convenient transportation service available',
    },
  ]

  return (
    <section id="services" className="section-py bg-white">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="heading-h2 mb-4 text-gray-900">Our Services</h2>
          <p className="text-subtitle text-gray-600 max-w-2xl mx-auto">
            We provide comprehensive dog care services to ensure your pet is happy, healthy, and
            well-cared for
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="card p-8 hover:shadow-md transition-shadow">
              <div className="text-5xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
