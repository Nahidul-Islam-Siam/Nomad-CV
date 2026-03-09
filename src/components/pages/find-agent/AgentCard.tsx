"use client";

import React from "react";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import Link from "next/link";

interface AgentCardProps {
    id: number;
    name: string;
    image: string | StaticImageData;
}

const AgentCard: React.FC<AgentCardProps> = ({ id, name, image }) => {
    return (
        <div className="bg-[#F8F6F3] rounded-3xl shadow-lg border border-[#E2C59F] flex flex-col md:flex-row items-center  gap-6 w-full max-w-2xl">
            {/* Agent Image */}
            <div className="relative w-1/3 h-full  overflow-hidden flex-shrink-0">
                <Image
                    src={typeof image === "string" ? image : image.src}
                    alt={name}
                    fill
                    className="object-cover"
                />
            </div>
            {/* Agent Info */}
            <div className="flex-1 flex flex-col gap-2 py-4">
                <Link href={`/find-agent/${id}`} >
                    <div className="text-2xl font-bold text-[#2D2A2A]">{name}</div>
                    <div className="text-[#7A7A7A] text-sm">
                        Lorem ipsum dolor sit amet consectetur. Viverra tristique in ultrices cursus nibh
                    </div>
                    <span className="inline-block bg-[#E2C59F] text-white text-xs font-semibold rounded px-3 py-1 mt-2 w-fit">
                        Developers
                    </span>
                </Link>
                {/* Contact Buttons */}
                <div className="flex gap-4 mt-6">
                    <button className="flex items-center gap-2 border border-[#E2C59F] rounded-lg px-6 py-2 text-[#2D2A2A] font-medium hover:bg-[#f3e8d7] transition">
                        <svg width="20" height="20" fill="none" stroke="#2D2A2A" strokeWidth="1.5" viewBox="0 0 24 24">
                            <path d="M2 5.5A2.5 2.5 0 0 1 4.5 3h15A2.5 2.5 0 0 1 22 5.5v13a2.5 2.5 0 0 1-2.5 2.5h-15A2.5 2.5 0 0 1 2 18.5v-13Z" />
                            <path d="M22 6 12 13 2 6" />
                        </svg>
                        Email
                    </button>
                    <button className="flex items-center gap-2 border border-[#E2C59F] rounded-lg px-6 py-2 text-[#2D2A2A] font-medium hover:bg-[#f3e8d7] transition">
                        <svg width="20" height="20" fill="none" stroke="#2D2A2A" strokeWidth="1.5" viewBox="0 0 24 24">
                            <path d="M2 6.5A2.5 2.5 0 0 1 4.5 4h15A2.5 2.5 0 0 1 22 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-15A2.5 2.5 0 0 1 2 17.5v-11Z" />
                            <path d="M12 17v.01" />
                            <path d="M8 7h8" />
                        </svg>
                        Call
                    </button>
                </div>
            </div>

        </div>
    );
};

export default AgentCard;