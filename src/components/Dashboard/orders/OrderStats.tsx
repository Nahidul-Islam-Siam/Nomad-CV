import React from 'react'

export default function OrderStats() {
  return (
    <>
      <div className="max-w-3xl 2xl:max-w-5xl flex  gap-6 mb-8">
        <div className="bg-white flex-1 border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-1">350</div>
              <div className="text-gray-600 text-sm">Total Customer</div>
            </div>
            <div className="text-gray-400">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 18v-4h3v4h2v-7.5c0-1.1.9-2 2-2s2 .9 2 2V18h2v-4h3v4h1v2H3v-2h1zm8-13.5c0-.83-.67-1.5-1.5-1.5S9 3.67 9 4.5 9.67 6 10.5 6s1.5-.67 1.5-1.5z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-1">350</div>
              <div className="text-gray-600 text-sm">Total Order</div>
            </div>
            <div className="text-gray-400">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
