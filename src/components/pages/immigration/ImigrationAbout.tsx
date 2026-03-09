import Image from 'next/image'
import React from 'react'

import { Button } from 'antd';
import { FaArrowRight } from 'react-icons/fa6';

export default function ImmigrationAbout() {
    return (
        <div className="container mx-auto  grid grid-cols-2 gap-5 h-full items-start bg-white rounded-xl  shadow-md mt-10">
            {/* Agent Image */}
            <figure className="flex-none   rounded-xl overflow-hidden bg-gray-100 ">
                <Image
                    src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=400&h=400"
                    alt="Agent"
                    width={500}
                    height={500}
                    className="w-full h-full object-cover"
                />
            </figure>
            {/* Agent Details */}
            <div className="flex-1 w-full h-full flex flex-col justify-center  pl-5 ">
                <div className='space-y-5'>

                    <h2 className="m-0 text-4xl font-bold">An Immigration Law Office Designed with You In Mind</h2>
                    <div className="text-gray-600 mt-2 mb-8 text-base space-y-4">
                        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>

                        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>

                    </div>

                <Button className=' bg-[#E2C59F]'>
                    Get Start Now <FaArrowRight/>
                </Button>
                </div>
            </div>
        </div>
    )
}
