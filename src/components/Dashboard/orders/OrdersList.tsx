"use client"

import { useState } from "react"


export default function OrdersList() {
    const [searchTerm, setSearchTerm] = useState("")
    const [currentPage, setCurrentPage] = useState(1)

    const orders = [
        {
            id: "0255423I564",
            date: "01/12/2025",
            customerName: "Akib Ahmed",
            property: "TY35 Avenue GGLondon Center",
            location: "Flat 2551 Center London 287223",
            price: "15400$",
            agent: "Devid",
            status: "Negotiation",
            statusColor: "bg-yellow-100 text-yellow-800",
        },
        {
            id: "0285465412I",
            date: "02/12/2025",
            customerName: "Shazidur Islam",
            property: "TY35 Avenue GGLondon Center",
            location: "Flat 2551 Center London 287223",
            price: "15900$",
            agent: "Rohit",
            status: "Pending",
            statusColor: "bg-red-100 text-red-800",
        },
        {
            id: "4454521584B",
            date: "03/12/2025",
            customerName: "Devid Wanner",
            property: "TY35 Avenue GGLondon Center",
            location: "Flat 2551 Center London 287223",
            price: "10000$",
            agent: "Solkot",
            status: "Approved",
            statusColor: "bg-green-100 text-green-800",
        },
    ]

    return (
        <div className="bg-white p-6">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-6">
                <div className="relative flex-1 max-w-md">
                    <input
                        type="text"
                        placeholder="Search Here"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </button>
                </div>
                <button className="ml-4 bg-yellow-400 text-gray-800 px-6 py-2 rounded-lg font-medium hover:bg-yellow-500 transition-colors">
                    Refresh
                </button>
            </div>

         

            {/* Orders Table */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Order Id
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Customer name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Property
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Location
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Price
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Agent
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Statues
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {orders.map((order, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.customerName}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900">{order.property}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900">{order.location}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.price}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.agent}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${order.statusColor}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="bg-white px-6 py-3 border-t border-gray-200">
                    <div className="flex items-center justify-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        {[1, 2, 3, 4, 5].map((page) => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`px-3 py-2 text-sm rounded ${currentPage === page ? "bg-gray-900 text-white" : "text-gray-700 hover:bg-gray-100"
                                    }`}
                            >
                                {page}
                            </button>
                        ))}

                        <button className="p-2 text-gray-400 hover:text-gray-600">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
