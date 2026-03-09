
import FeaturedPropertise from "@/components/pages/Home/FeaturedPropertise";
import SellSection from "@/components/pages/Home/sellSection";
// import SellContact from "@/components/pages/sell-with-us/SellContact";


// import NewsletterSignup from "@/components/shared/Newsletter/NewsLetter";
import React from "react";

export default function page() {
  return (
    <div className="">
      {/* <HeroSectionWithSingleRowFilter
        backgroundImage="/assets/hero.png"
        title="Sell With Us"
      /> */}
      {/* <CommonHeader header="Sell With Us" /> */}
      <SellSection />
      <FeaturedPropertise />
      {/* <SellContact /> */}

      {/* <AboutSection /> */}
      {/* <NewsletterSignup /> */}
    </div>
  );
}
