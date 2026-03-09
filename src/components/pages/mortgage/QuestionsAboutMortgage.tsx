import Image from 'next/image'
import React from 'react'

const brokers = [
    {
        id: 1,
        name: 'Kaylynn Ekstrom Bothman',
        title: 'Real Estate Professional',
        company: "Dubai Sotheby's International Realty",
        address: '1430 Sherbrooke Street West,\nMontreal, Quebec, H3G 1K4 Canada',
        image: 'https://randomuser.me/api/portraits/men/32.jpg',
        imageType: 'next', // use next/image
    },
    {
        id: 2,
        name: 'Alexandra Smith',
        title: 'Mortgage Specialist',
        company: 'Royal LePage Realty',
        address: '200 King Street West,\nToronto, Ontario, M5H 3T4 Canada',
        image: 'https://randomuser.me/api/portraits/women/45.jpg',
        imageType: 'img', // use img tag
    },
    {
        id: 3,
        name: 'Michael Johnson',
        title: 'Senior Broker',
        company: 'RE/MAX Excellence',
        address: '123 Main Street,\nVancouver, BC, V6B 2Y1 Canada',
        image: 'https://randomuser.me/api/portraits/men/65.jpg',
        imageType: 'img',
    },
]

export default function QuestionsAboutMortgage() {
    return (
        <div className="max-w-4xl mx-auto py-10">
            <h2 className="text-2xl font-semibold mb-8 text-center">Still have questions?</h2>
            <div className="space-y-6">
                {brokers.map((broker) => (
                    <div key={broker.id} className="flex bg-white rounded-xl shadow-sm overflow-hidden">
                        <div className="w-40 h-40 flex-shrink-0 bg-gray-200 flex items-center justify-center">

                            <Image
                                src={broker?.image}
                                alt={broker.name}
                                width={160}
                                height={160}
                                className="w-full h-full rounded-xl object-cover"
                            />

                        </div>
                        <div className="flex-1 p-6 flex flex-col justify-between">
                            <div>
                                <div className="text-xl font-semibold">{broker.name}</div>
                                <div className="text-sm text-gray-500 mt-1">{broker.title}</div>
                                <div className="text-sm text-gray-700 mt-2 font-medium">
                                    {broker.company}
                                </div>
                                <div className="text-sm text-gray-500 mt-1" style={{ whiteSpace: 'pre-line' }}>
                                    {broker.address}
                                </div>
                            </div>
                            <div className="flex items-center mt-4 space-x-3">
                                <button className="flex items-center border border-gray-300 rounded-md px-4 py-2 text-sm font-medium hover:bg-gray-50">
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M22 16.92V19a2 2 0 0 1-2.18 2A19.72 19.72 0 0 1 3 5.18 2 2 0 0 1 5 3h2.09a2 2 0 0 1 2 1.72c.13 1.05.37 2.07.72 3.06a2 2 0 0 1-.45 2.11l-.27.27a16 16 0 0 0 6.29 6.29l.27-.27a2 2 0 0 1 2.11-.45c.99.35 2.01.59 3.06.72A2 2 0 0 1 22 16.92z" />
                                    </svg>
                                    Call
                                </button>
                                <button className="flex items-center border border-gray-300 rounded-md px-4 py-2 text-sm font-medium hover:bg-gray-50">
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <rect x="3" y="5" width="18" height="14" rx="2" />
                                        <path d="M3 7l9 6 9-6" />
                                    </svg>
                                    Email
                                </button>
                                <div className="flex-1" />
                                <button className="flex items-center text-sm font-medium text-gray-700 hover:underline">
                                    Send Message
                                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-8">
                <button className="bg-[#D6BFA6] hover:bg-[#cbb08e] text-black font-medium rounded-md px-8 py-3 text-base shadow">
                    View More Brokers
                </button>
            </div>
        </div>
    )
}
