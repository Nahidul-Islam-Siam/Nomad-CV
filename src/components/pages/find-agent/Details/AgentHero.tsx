/* eslint-disable @typescript-eslint/no-explicit-any */
import { Phone } from "lucide-react";
import Image from "next/image";
import React from "react";
import { MdEmail } from "react-icons/md";

interface AgentHeroProps {
  data: any; // Ideally replace with proper type
}

export default function AgentHero({ data }: AgentHeroProps) {
  return (
    <section className="container mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-8 items-center">
        {/* Agent Image */}
        <figure className="w-full aspect-square overflow-hidden rounded-xl bg-gray-100 shadow-sm">
          <Image
            src={
              data?.profile?.image?.[0]?.url ||
              "/assets/a1.jpg"
            }
            alt="Agent"
            width={500}
            height={500}
            className="w-full h-full object-cover"
          />
        </figure>

        {/* Agent Details */}
        <div className="flex flex-col justify-between h-full space-y-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              {data?.profile?.name || "No name provided"}
            </h2>
            <p className="text-gray-600 mt-2">
              Location: {data?.profile?.city || "Unknown City"},{" "}
              {data?.profile?.country || "Unknown Country"}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            {/* Phone */}
            <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-2 shadow-inner hover:bg-gray-100 transition">
              <Phone className="text-gray-700 w-5 h-5" />
              <span className="text-gray-800 text-sm">
                {data?.profile?.phone || "No phone provided"}
              </span>
            </div>

            {/* Email */}
            <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-2 shadow-inner hover:bg-gray-100 transition">
              <MdEmail className="text-gray-700 w-5 h-5" />
              <span className="text-gray-800 text-sm">
                {data?.email || "No email provided"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
