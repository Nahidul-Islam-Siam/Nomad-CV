"use client";
import { Partner } from "@/redux/service/allPartner/allPartnerApi";
import { Home, LogOut } from "lucide-react";

interface MortgageProfileProps {
  id: string | undefined;  // Allow id to be undefined
  data: Partner | undefined;
}

export default function MortgageProfile({ id, data }: MortgageProfileProps) {

  if (!id) {
    return <div>Mortgage ID not found</div>;  
  }


  // Destructuring the data object
  const { profile, name, email, phone } = data || {}; // Defaulting to empty object in case data is undefined
  const mortgageName = name || 'Unknown Agent';
  const mortgageEmail = email || 'No email provided';
  const mortgagePhone = phone || 'No phone provided';
  const mortgageCity = profile?.city || 'City not provided';
  const mortgageCountry = profile?.country || 'Country not provided';
  const mortgageCompany = profile?.company || 'Company not provided';

  return (
    <div className="flex flex-col md:flex-row gap-6 bg-white p-6 rounded-lg shadow-md">
      {/* Left Card */}
      <div className="w-full md:w-1/3 bg-gray-50 rounded-lg p-6 flex flex-col items-center">
        <div className="w-20 h-20 rounded-full bg-gray-200 mb-4" />
        <div className="text-lg font-semibold">{mortgageName}</div>
        <div className="text-xs text-gray-500 mb-6">Real Estate Professional</div>
        <div className="w-full">
          <div className="flex justify-between text-sm py-1">
            <span className="text-gray-500">Gender</span>
            <span className="font-medium">Male</span>
          </div>
          <div className="flex justify-between text-sm py-1">
            <span className="text-gray-500">City</span>
            <span className="font-medium">{}</span>
          </div>
          <div className="flex justify-between text-sm py-1">
            <span className="text-gray-500">State</span>
            <span className="font-medium">New York</span>
          </div>
          <div className="flex justify-between text-sm py-1">
            <span className="text-gray-500">Country</span>
            <span className="font-medium">{mortgageCountry}</span>
          </div>
          <div className="flex justify-between text-sm py-1">
            <span className="text-gray-500">Post Code</span>
            <span className="font-medium">1547</span>
          </div>
          <div className="flex justify-between text-sm py-1">
            <span className="text-gray-500">Email</span>
            <span className="font-medium">{mortgageEmail}</span>
          </div>
          <div className="flex justify-between text-sm py-1">
            <span className="text-gray-500">Phone Number</span>
            <span className="font-medium">{mortgagePhone}</span>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-2/3 flex flex-col gap-6">
        {/* Agent Details */}
        <div>
          <div className="font-semibold text-lg mb-1">Agent Details</div>
          <div className="text-xs text-gray-500 mb-4">
            There are many variations of passages of Lorem Ipsum available, but the majority have.
          </div>
          <div className="border rounded-lg">
            <div className="grid grid-cols-2 text-sm">
              <div className="border-b px-4 py-2 text-gray-500">Mortgage Name</div>
              <div className="border-b px-4 py-2 font-medium">{mortgageName}</div>
              <div className="border-b px-4 py-2 text-gray-500">Agency</div>
              <div className="border-b px-4 py-2 font-medium">{mortgageCompany}</div>
              <div className="border-b px-4 py-2 text-gray-500">Mortgage License</div>
              <div className="border-b px-4 py-2 font-medium">234 5678 9101 1238</div>
              <div className="border-b px-4 py-2 text-gray-500">Tax Number</div>
              <div className="border-b px-4 py-2 font-medium">TN305 985PL PQ856</div>
              <div className="px-4 py-2 text-gray-500">Mortgage City</div>
              <div className="px-4 py-2 font-medium">{mortgageCity}</div>
            </div>
          </div>
        </div>

        {/* Property Status */}
        <div>
          <div className="font-semibold mb-3">Property Status</div>
          <div className="flex gap-4">
            <div className="flex-1 bg-white border rounded-lg flex flex-col items-center py-6">
              <div className="text-2xl font-bold mb-1">12</div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Home />
                Total Property
              </div>
            </div>
            <div className="flex-1 bg-white border rounded-lg flex flex-col items-center py-6">
              <div className="text-2xl font-bold mb-1">03</div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <LogOut />
                Sell Done
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
