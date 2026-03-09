import Image from 'next/image'
import React from 'react'

export default function WhyChooseMortgage() {
  return (
    <section className="bg-white py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-10 text-gray-900">
          Why use a Mortgage Choice broker?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Row 1 */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-3">
              {/* Highly experienced icon */}
              <svg className="w-10 h-10 text-[#C9A16B]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M12 2l2.09 6.26L20 9.27l-5 3.64L16.18 20 12 16.77 7.82 20 9 12.91l-5-3.64 5.91-.91z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="font-semibold mb-1">Highly experienced</h3>
            <p className="text-gray-600 text-sm">
              Over 1,000 brokers nationally<br />
              helping people like you secure<br />
              home loans for over 30 years
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="mb-3">
              {/* We don't charge icon */}
              <svg className="w-10 h-10 text-[#C9A16B]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <path d="M12 8v4l2 2" strokeLinecap="round" strokeLinejoin="round"/>
                <text x="12" y="16" textAnchor="middle" fontSize="8" fill="#C9A16B" fontFamily="Arial">$</text>
              </svg>
            </div>
            <h3 className="font-semibold mb-1">We don&quot;t charge</h3>
            <p className="text-gray-600 text-sm">
              Over 1,000 brokers nationally<br />
              helping people like you secure<br />
              home loans for over 30 years
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="mb-3">
              {/* We do the hard work icon */}
              <svg className="w-10 h-10 text-[#C9A16B]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <rect x="4" y="8" width="16" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M8 8V6a4 4 0 018 0v2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="font-semibold mb-1">We do the hard work</h3>
            <p className="text-gray-600 text-sm">
              Over 1,000 brokers nationally<br />
              helping people like you secure<br />
              home loans for over 30 years
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Row 2 */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-3">
              {/* We'll find the right loan for you icon */}
              <svg className="w-10 h-10 text-[#C9A16B]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M12 20V10M12 10l-4 4m4-4l4 4" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="6" r="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              </svg>
            </div>
            <h3 className="font-semibold mb-1">We&quot;ll find the right loan for you</h3>
            <p className="text-gray-600 text-sm">
              Over 1,000 brokers nationally<br />
              helping people like you secure<br />
              home loans for over 30 years
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="mb-3">
              {/* Compare thousands of loans icon */}
              <svg className="w-10 h-10 text-[#C9A16B]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <rect x="6" y="6" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M9 9h6v6H9z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="font-semibold mb-1">Compare thousands of loans</h3>
            <p className="text-gray-600 text-sm">
              Over 1,000 brokers nationally<br />
              helping people like you secure<br />
              home loans for over 30 years
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="mb-3">
              {/* Get ongoing support and advice icon */}
              <svg className="w-10 h-10 text-[#C9A16B]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <path d="M12 16v-4M12 8h.01" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="font-semibold mb-1">Get ongoing support and advice</h3>
            <p className="text-gray-600 text-sm">
              Over 1,000 brokers nationally<br />
              helping people like you secure<br />
              home loans for over 30 years
            </p>
          </div>
        </div>
        {/* Call to action bar */}
        <div className="bg-[#F5E7D8] rounded-xl flex flex-col md:flex-row items-center justify-between px-6 py-5 gap-4">
          <div className="flex items-center gap-4">
            <Image
              src=""
              alt="Broker"
              width={500}
              height={500}
              className="w-14 h-14 rounded-full object-cover border-2 border-white shadow"
            />
            <div>
              <div className="font-semibold text-[#6B3F1D] text-base md:text-lg mb-1">
                Get expert support from a broker you can trust
              </div>
              <div className="text-xs text-[#6B3F1D] opacity-80">
                Whether you are buying your first home, refinancing or investing, Mortgage Choice brokers<br className="hidden md:block" />
                are with you every step of the way.
              </div>
            </div>
          </div>
          <button className="bg-white border border-[#C9A16B] text-[#6B3F1D] font-medium px-6 py-2 rounded transition hover:bg-[#f7f1ea]">
            Book Now
          </button>
        </div>
      </div>
    </section>
  )
}
