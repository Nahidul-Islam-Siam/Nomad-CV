"use client"

import Image from "next/image"
import type React from "react"
import { useState, useRef } from "react"

export default function ApplyForm() {
  const [features, setFeatures] = useState(["Swimming Pool, Gym, Parking", "Air Conditioning", "Balcony"])
  const [newFeature, setNewFeature] = useState("")
  const [imageList, setImageList] = useState<Array<{ id: string; url: string; name: string }>>([])
  const [videoList, setVideoList] = useState<Array<{ id: string; url: string; name: string }>>([])
  const imageInputRef = useRef<HTMLInputElement>(null)
  const videoInputRef = useRef<HTMLInputElement>(null)

  const addFeature = () => {
    if (newFeature.trim()) {
      setFeatures([...features, newFeature.trim()])
      setNewFeature("")
    }
  }

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addFeature()
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader()
        reader.onload = (event) => {
          const newImage = {
            id: Date.now().toString() + Math.random().toString(),
            url: event.target?.result as string,
            name: file.name,
          }
          setImageList((prev) => [...prev, newImage])
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader()
        reader.onload = (event) => {
          const newVideo = {
            id: Date.now().toString() + Math.random().toString(),
            url: event.target?.result as string,
            name: file.name,
          }
          setVideoList((prev) => [...prev, newVideo])
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const removeImage = (id: string) => {
    setImageList((prev) => prev.filter((item) => item.id !== id))
  }

  const removeVideo = (id: string) => {
    setVideoList((prev) => prev.filter((item) => item.id !== id))
  }

  const triggerImageUpload = () => {
    imageInputRef.current?.click()
  }

  const triggerVideoUpload = () => {
    videoInputRef.current?.click()
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h1 className="text-2xl font-semibold mb-8 text-black">Add Property for Sell</h1>

      <form className="space-y-6">
        {/* Property Name and Type Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="property-name" className="block text-sm font-medium text-gray-700">
              Property Name
            </label>
            <input
              id="property-name"
              type="text"
              placeholder="Property name"
              className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="property-type" className="block text-sm font-medium text-gray-700">
              Property Type
            </label>
            <select
              id="property-type"
              className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Property Type</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="villa">Villa</option>
              <option value="condo">Condo</option>
            </select>
          </div>
        </div>

        {/* Price Row */}
        <div className="space-y-2">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            id="price"
            type="text"
            placeholder="Property price"
            className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Category and Sub-category Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              id="category"
              className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Property Type</option>
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
              <option value="industrial">Industrial</option>
            </select>
          </div>
          <div className="space-y-2">
            <label htmlFor="sub-category" className="block text-sm font-medium text-gray-700">
              Sub-category
            </label>
            <select
              id="sub-category"
              className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Property Type</option>
              <option value="new">New Construction</option>
              <option value="resale">Resale</option>
              <option value="rental">Rental</option>
            </select>
          </div>
        </div>

        {/* Bedrooms, Bathrooms, SQFT Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700">
              Bedrooms
            </label>
            <input
              id="bedrooms"
              type="number"
              defaultValue="2"
              className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700">
              Bathrooms
            </label>
            <input
              id="bathrooms"
              type="number"
              defaultValue="2"
              className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="sqft" className="block text-sm font-medium text-gray-700">
              SQFT
            </label>
            <input
              id="sqft"
              type="text"
              defaultValue="1500 SQ FT"
              className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Max Row */}
        <div className="space-y-2">
          <label htmlFor="max" className="block text-sm font-medium text-gray-700">
            Max
          </label>
          <input
            id="max"
            type="text"
            className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            placeholder="Type your property description"
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          />
        </div>

        {/* Add Features */}
        <div className="space-y-2">
          <label htmlFor="features" className="block text-sm font-medium text-gray-700">
            Add Features
          </label>
          <input
            id="features"
            type="text"
            placeholder="Type a feature"
            value={newFeature}
            onChange={(e) => setNewFeature(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />

          {/* Feature List */}
          <div className="space-y-2 mt-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                <span className="text-sm text-gray-700">{feature}</span>
                <button
                  type="button"
                  onClick={() => removeFeature(index)}
                  className="w-6 h-6 flex items-center justify-center text-orange-500 hover:text-orange-700 hover:bg-orange-50 rounded-full transition-colors"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Product Image */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Product Image</label>
          <div
            onClick={triggerImageUpload}
            className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-gray-400 transition-colors"
          >
            <div className="flex flex-col items-center">
              <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <p className="text-sm text-gray-600 mb-2">Drag file or Browse</p>
              <p className="text-xs text-gray-400">Supports: PNG, JPG, JPEG, WEBP</p>
            </div>
          </div>
          <input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="hidden"
          />

          {/* Uploaded Images */}
          {imageList.length > 0 && (
            <div className="grid grid-cols-3 gap-4 mt-4">
              {imageList.map((image) => (
                <div key={image.id} className="relative">
                  <div className="aspect-square bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 overflow-hidden">
                    <Image
                      src={image.url || "/placeholder.svg"}
                      alt={image.name}
                      width={500}
                      height={500}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeImage(image.id)}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-white border border-gray-300 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Video */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Product Video</label>
          <div
            onClick={triggerVideoUpload}
            className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-gray-400 transition-colors"
          >
            <div className="flex flex-col items-center">
              <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <p className="text-sm text-gray-600 mb-2">Drag file or Browse</p>
              <p className="text-xs text-gray-400">Supports: MP4, AVI, MOV, WMV up to 10MB</p>
            </div>
          </div>
          <input
            ref={videoInputRef}
            type="file"
            accept="video/*"
            multiple
            onChange={handleVideoUpload}
            className="hidden"
          />

          {/* Uploaded Videos */}
          {videoList.length > 0 && (
            <div className="grid grid-cols-3 gap-4 mt-4">
              {videoList.map((video) => (
                <div key={video.id} className="relative">
                  <div className="aspect-square bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 overflow-hidden">
                    <video src={video.url} className="w-full h-full object-cover" controls={false} />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeVideo(video.id)}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-white border border-gray-300 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </form>
    </div>
  )
}
