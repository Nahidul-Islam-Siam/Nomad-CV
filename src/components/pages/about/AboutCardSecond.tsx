import Image from 'next/image'
import React from 'react'

export default function AboutCardSecond() {
  return (
    <section className="bg-[#f7f9fb] py-16 px-4 md:px-8 lg:px-16 font-inter">
         <div className="mx-auto container">
           <div className="bg-white rounded-xl shadow-sm  flex flex-col md:flex-row gap-6 items-center  p-2 md:p-0">
             {/* Left image */}
             <div className="w-full md:w-1/2 relative overflow-hidden rounded-md" style={{ height: '300px' }}>
               <Image
                 src="/assets/brand.png"  
                 alt="Brand Image"
                 fill
                 className="object-cover"
               />
             </div>
   
             {/* Right content */}
            <div className="md:w-1/2 flex flex-col gap-4">
                <h3 className="text-3xl md:text-[40px] font-bold text-[#171a2a] leading-tight">
                    Sell or Buy Your Home<br />with Us
                </h3>
                <p className="text-[#6c6c6c] md:text-sm text-xs font-normal mb-2">
                    Lorem ipsum dolor sit amet consectetur. Scelerisque viverra at bibendum feugiat molestie dapibus sem. Ac elit cras tortor nibh. Purus vitae adipiscing urna tortor.
                </p>
                <div className="flex flex-col gap-3 mt-2">
                    <button className="w-max bg-[#E2C59F] text-[#171A2A] hover:bg-[#171A2A] hover:text-[#E2C59F] text-sm font-medium px-5 py-2 rounded-md border transition flex items-center gap-2">
                        Buy Your Home With Us <span aria-hidden>→</span>
                    </button>
                    <button className="w-max bg-[#E2C59F] text-[#171A2A] hover:bg-[#171A2A] hover:text-[#E2C59F] text-sm font-medium px-5 py-2 rounded-md border transition flex items-center gap-2">
                        Sell Your Home With Us <span aria-hidden>→</span>
                    </button>
                </div>
            </div>
           </div>
         </div>
       </section>
  )
}
