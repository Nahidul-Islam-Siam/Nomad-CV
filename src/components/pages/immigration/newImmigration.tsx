"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone } from "lucide-react";
import Image from "next/image";

// Define Agent Type
interface Agent {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  image?: string;
  status: "ACTIVE" | "INACTIVE";
}

export default function AgentCard() {
  // Mock Data - Replace with API later
  const agents: Agent[] = [
    {
      id: "1",
      name: "John Doe",
      role: "Senior Mortgage Advisor",
      email: "johndoe@email.com",
      phone: "+1234567890",
      image: "/images/agent1.png",
      status: "ACTIVE",
    },
    {
      id: "2",
      name: "Jane Smith",
      role: "Licensed Loan Officer",
      email: "jane.smith@email.com",
      phone: "+1987654321",
      image: "/images/agent2.png",
      status: "ACTIVE",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <h1 className="text-lg pt-6 pb-6 md:text-xl font-bold text-black text-center mb-4">
        Featured Properties and Immigration Lawyers
      </h1>
      {/* Agent Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {agents.map((agent) => (
          <Card
            key={agent.id}
            className="overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col md:flex-row"
          >
            {/* Left Side: Profile Image */}
            <div className="md:w-48 w-full h-48 md:h-full relative flex-shrink-0 bg-gray-100">
              <Image
                src={agent.image || "/images/default-agent.jpg"}
                alt={agent.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 192px"
                className="object-cover"
              />
            </div>

            {/* Right Side: Info */}
            <div className="flex-1 p-5 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
                  {agent.name}
                </h3>
                <p className="text-gray-700 text-sm mb-1 truncate">
                  {agent.role}
                </p>
                <p className="text-gray-600 text-sm mb-3 truncate">
                  {agent.email}
                </p>

                <Badge
                  variant="secondary"
                  className={
                    agent.status === "ACTIVE"
                      ? "bg-green-100 text-green-800 hover:bg-green-100"
                      : "bg-red-100 text-red-800 hover:bg-red-100"
                  }
                >
                  {agent.status === "ACTIVE" ? "Active" : "Inactive"}
                </Badge>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white transition-colors text-sm py-2"
                  asChild
                >
                  <a
                    href={`tel:${agent.phone}`}
                    aria-label={`Call ${agent.name}`}
                  >
                    <Phone className="w-3.5 h-3.5 mr-2" />
                    Call
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white transition-colors text-sm py-2"
                  asChild
                >
                  <a
                    href={`mailto:${agent.email}`}
                    aria-label={`Email ${agent.name}`}
                  >
                    <Mail className="w-3.5 h-3.5 mr-2" />
                    Email
                  </a>
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
