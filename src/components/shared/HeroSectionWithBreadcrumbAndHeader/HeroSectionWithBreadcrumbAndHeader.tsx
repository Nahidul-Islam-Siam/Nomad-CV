"use client";

import SearchForm from "@/components/pages/Home/SearchForm";

interface BreadcrumbItem {
  title: string;
  href?: string;
}

interface HeroSectionProps {
  breadcrumbs?: BreadcrumbItem[];
  title?: string;
  backgroundImage: string;
}

const HeroSectionWithBreadcrumbAndHeader: React.FC<HeroSectionProps> = ({
  backgroundImage,
}) => {
  return (
    <div
      className="relative w-full h-[70vh] md:[70vh] bg-no-repeat bg-cover font-inter text-base md:text-xl md:mb-24 mb-40"
      style={{
        backgroundImage: `url("${backgroundImage}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Header Title (optional) */}
      <div className="absolute top-1/3 md:top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white text-center">
          {/* Optional Title */}
        </h1>
      </div>

      {/* Search Form */}
      <div className="absolute -bottom-20 w-full z-30">
        <div className="max-w-7xl mx-auto px-4">
          <SearchForm />
        </div>
      </div>
    </div>
  );
};

export default HeroSectionWithBreadcrumbAndHeader;
