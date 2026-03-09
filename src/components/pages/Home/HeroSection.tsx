
import "./hero.css";
import SearchForm from "./SearchForm";

const Hero = () => {
  return (
    <div className="relative w-full h-[76vh] font-inter text-base md:text-xl md:mb-24 mb-16">
      {/* ✅ Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/assets/hero-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* ✅ Optional Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/30 z-10" />

      {/* ✅ Hero Content */}
 

      {/* ✅ SearchForm visually outside the Hero */}
      <div className="absolute -bottom-20 w-full z-30">
        <div className="max-w-7xl mx-auto ">
          <SearchForm />
        </div>
      </div>
    </div>
  );
};

export default Hero;
