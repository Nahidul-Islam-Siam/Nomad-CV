import React from "react";
// import ImmigrationAbout from '@/components/pages/immigration/ImigrationAbout'
// import WhyChooseMortgage from '@/components/pages/mortgage/WhyChooseMortgage'
// import SellContact from "@/components/pages/sell-with-us/SellContact";

// import NewsletterSignup from "@/components/shared/Newsletter/NewsLetter";

import SellSearchSection from "@/components/pages/immigration/sell2";
import AgentCard from "@/components/pages/immigration/newImmigration";
// import WhyChooseMortgage from '@/components/pages/mortgage/WhyChooseMortgage'
// import ImmigrationAbout from '@/components/pages/immigration/ImigrationAbout'

export default function page() { 
  return (
    <div>

      {/* <ImmigrationAbout/>
     <WhyChooseMortgage/> */}
     <SellSearchSection/>
      <AgentCard />
      {/* <SellContact /> */}
      {/* <NewsletterSignup /> */}
    </div>
  );
} 
