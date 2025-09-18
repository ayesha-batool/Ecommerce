import React from 'react'
import { Title } from '../components/Title'
import { assets } from '../assets/assets'

export const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="text-center py-16">
        <Title text1={'ABOUT'} text2={'US'} />
        <p className="text-xl text-gray-600 mt-6 max-w-3xl mx-auto leading-relaxed">
          We are passionate about bringing you the finest fashion pieces that blend timeless elegance with contemporary style.
        </p>
      </div>

      {/* Story Section */}
      <div className="my-16 flex flex-col lg:flex-row gap-16 items-center">
        <div className="lg:w-1/2">
          <img 
            src={assets.about_img} 
            alt="About StyleHub" 
            className="w-full rounded-2xl shadow-lg" 
          />
        </div>
        <div className="lg:w-1/2 space-y-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
          <p className="text-gray-600 leading-relaxed">
            Founded with a vision to revolutionize the fashion industry, StyleHub has been at the forefront of 
            curating exceptional clothing that speaks to the modern individual. We believe that fashion is more 
            than just clothing—it's a form of self-expression and confidence.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Since our inception, we have been committed to sourcing the highest quality materials and working 
            with skilled artisans to create pieces that not only look beautiful but also stand the test of time. 
            Our carefully curated collection reflects our dedication to sustainable fashion and ethical practices.
          </p>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Our Mission</h3>
            <p className="text-gray-600">
              To empower individuals to express their unique style through thoughtfully designed, 
              high-quality fashion pieces that inspire confidence and celebrate individuality.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="py-16">
        <div className="text-center mb-12">
        <Title text1={'WHY'} text2={'CHOOSE US'} />
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            We're committed to providing an exceptional shopping experience with unmatched quality and service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Quality Assurance */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 border border-gray-100">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Premium Quality</h3>
            <p className="text-gray-600 leading-relaxed">
              We meticulously select only the finest materials and work with experienced craftsmen to ensure 
              every piece meets our high standards of quality and durability.
            </p>
          </div>

          {/* Convenience */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 border border-gray-100">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Seamless Experience</h3>
            <p className="text-gray-600 leading-relaxed">
              From browsing to checkout, we've designed every step of your shopping journey to be intuitive, 
              fast, and enjoyable with free shipping and easy returns.
            </p>
          </div>

          {/* Customer Service */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 border border-gray-100">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Exceptional Service</h3>
            <p className="text-gray-600 leading-relaxed">
              Our dedicated customer service team is here to help you find the perfect pieces and ensure 
              your complete satisfaction with every purchase.
            </p>
      </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-16 bg-gradient-to-r from-gray-50 to-blue-50 rounded-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Values</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            These core values guide everything we do and shape our commitment to you.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🌱</span>
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">Sustainability</h4>
            <p className="text-sm text-gray-600">Ethical sourcing and eco-friendly practices</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">✨</span>
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">Innovation</h4>
            <p className="text-sm text-gray-600">Constantly evolving with fashion trends</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🤝</span>
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">Community</h4>
            <p className="text-sm text-gray-600">Building connections through fashion</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎯</span>
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">Excellence</h4>
            <p className="text-sm text-gray-600">Striving for perfection in every detail</p>
          </div>
        </div>
      </div>
    </div>
  )
}
