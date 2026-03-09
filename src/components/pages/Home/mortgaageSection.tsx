// "use client";

// import Image from "next/image";
// import houseImg from "@/assets/card-icon/your-about-img.png"; // Replace with actual path

// export default function MorgtgaeSection() {
//   return (
//     <section className="bg-gray-50 py-10 font-inter rounded-xl container">
//       <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center gap-10">
//         {/* Left Content */}
//         <div className="md:w-1/2 space-y-6">
//           <h2 className="text-[#171A2A] text-2xl md:text-3xl font-bold leading-tight">
//             Mortgage Advisers
//           </h2>
//           <p className="text-gray-600 text-sm md:text-base leading-relaxed">
//             Secure the perfect home loan by consulting with our mortgage broker
//             experts. Our brokers simplify the process and match you with the
//             ideal loan for your need. Connect with an expert today.
//           </p>
//         </div>

//         {/* Right Image */}
//         <div className="md:w-1/2 flex justify-center md:justify-end">
//           <div className="relative rounded-xl overflow-hidden shadow-md max-w-md w-full">
//             <Image
//               src={houseImg}
//               alt="Couple reviewing mortgage options"
//               width={600}
//               height={400}
//               className="w-full h-auto object-cover"
//               quality={80}
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }








"use client";
import Image from "next/image";
import houseImg from "@/assets/card-icon/mortgage.jpg"; // Replace with your actual import

export default function MorgtgaeSection() {
  return (
    <section className="bg-white py-16 font-inter">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Left Text Content */}
        <div className="md:w-1/2">
          <h2 className=" text-[#171A2A] mb-4 md:text-[40px] text-2xl font-bold">
           Mortgage Advisers
          </h2>
          {/* <h3 className="text-md font-semibold text-[#171A2A] first-letter:uppercase tracking-wide mb-4 md:text-base text-sm">
            Every home has a story
          </h3> */}
          <p className="text-[#6C6C6C] md:text-sm text-sm font-normal leading-relaxed">
             Secure the perfect home loan by consulting with our mortgage broker
            experts. Our brokers simplify the process and match you with the
            ideal loan for your need. Connect with an expert today.
          </p>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2">
          <div className="w-full h-auto rounded-xl max-w-[380px] overflow-hidden shadow-md">
            <Image
              src={houseImg}
              alt="About Us Home"
              width={300}
              height={250}
              className="w-full  h-auto object-cover rounded-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
