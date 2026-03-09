"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "antd";

interface ImageData {
  id?: string;
  url: string;
  alt?: string;
}

interface PropertyHeroProps {
  images: ImageData[];
}

export default function PropertyHero({ images }: PropertyHeroProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Defensive fallback if no images passed
  const validImages = images && images.length > 0 ? images : [{ url: "/placeholder.svg", alt: "Placeholder" }];

  
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % validImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + validImages.length) % validImages.length);
  };

  const selectImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4  lg:px-0">
      <div className="flex flex-col lg:flex-row gap-6 h-[600px] md:h-[1000px] lg:h-[600px]">
        {/* Main Image Display */}
        <div className="relative flex-1 bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src={validImages[currentImageIndex].url}
            alt={validImages[currentImageIndex].alt || `Image ${currentImageIndex + 1}`}
            fill
            className="object-cover"
            priority
          />

          {/* Navigation Arrows */}
          <Button
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white/90 shadow-md"
            onClick={prevImage}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white/90 shadow-md"
            onClick={nextImage}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Thumbnail Grid */}
        <div className="w-full lg:w-72 overflow-x-auto lg:overflow-y-auto grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-2 gap-2 mt-4 lg:mt-0">
          {validImages.map((image, index) => (
            <button
              key={image.id || index}
              onClick={() => selectImage(index)}
              className={`relative aspect-square rounded-lg transition-all duration-200 ${
                currentImageIndex === index ? "opacity-60" : "hover:opacity-80"
              }`}
            >
              <Image
              src={image.url || "/placeholder.svg"}
                alt={image.alt || `Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
