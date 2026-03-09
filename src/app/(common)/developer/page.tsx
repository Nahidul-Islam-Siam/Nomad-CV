import React from "react";
// import CommonHeader from "@/components/shared/CommonHeader.tsx/CommonHeader";
import NewsletterSignup from "@/components/shared/Newsletter/NewsLetter";
// import HeroSectionWithSingleRowFilter from "@/components/shared/HeroSectionWithSignleRowFilter/HeroSectionWithSingleRowFilter";
import DeveloperList from "@/components/Developer/DeveloperList";

export default function page() {
  return (
    <div>
      {/* <HeroSectionWithSingleRowFilter
        title="Developer"
        backgroundImage={`/assets/hero.png`}
      />
      <CommonHeader header="Developer" /> */}
      <DeveloperList />
      <NewsletterSignup />
    </div>
  );
}
