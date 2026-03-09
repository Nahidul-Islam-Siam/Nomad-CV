"use client";

import React from "react";

export default function PropertiesMap() {
  const regions = [
    { name: "Europe", units: 653, progress: 85 },
    { name: "Asia", units: 653, progress: 90 },
    { name: "Africa", units: 653, progress: 75 },
    { name: "Australia", units: 653, progress: 45 },
    { name: "America", units: 653, progress: 80 },
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Properties Map Location</h3>
        <button className="text-gray-400 hover:text-gray-600">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
      </div>

      <div className="flex gap-8">
        {/* Left Side - Region List */}
        <div className="w-64 space-y-4">
          {regions.map((region, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{region.name}</span>
                <span className="text-sm text-gray-500">{region.units} Unit</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${region.name === "Australia" ? "bg-[#E2C59F] " : "bg-[#E2C59F] "}`}
                  style={{ width: `${region.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side - Google Map */}
        <div className="flex-1 flex items-center justify-center">
          {/* <iframe
            src="https://www.google.com/maps/embed?pb=!1m17!1m11!1m3!1d223.25318061351004!2d90.03446491555037!3d23.99233797638207!2m2!1f358.55701163777985!2f45!3m2!1i1024!2i768!4f35!3m3!1m2!1s0x3755f9ac3b261d65%3A0xaabd8094a3a66b6e!2sBaliati%20Bazar!5e1!3m2!1sen!2sbd!4v1751664962508!5m2!1sen!2sbd"
            width="600"
            height="450"
            style={{ border: "0" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe> */}
        </div>
      </div>
    </div>
  );
}
