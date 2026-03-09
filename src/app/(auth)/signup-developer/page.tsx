import React from "react";

export default function Page() {
    return (
        <div className=" bg-white flex items-center justify-center my-10">
            <div className="w-full max-w-3xl bg-white rounded-xl border border-[#F5E9DD] p-8 shadow-sm">
                <h1 className="text-2xl md:text-3xl font-bold text-center text-[#181C32] mb-8">
                    Registration as Developer
                </h1>
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-[#181C32] mb-1">
                            Name<span className="text-[#F5C16C]">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your fast name"
                            className="w-full border border-[#F5E9DD] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#F5C16C] bg-[#FCFAF7] text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#181C32] mb-1">
                            Email<span className="text-[#F5C16C]">*</span>
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your name"
                            className="w-full border border-[#F5E9DD] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#F5C16C] bg-[#FCFAF7] text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#181C32] mb-1">
                            Phone number<span className="text-[#F5C16C]">*</span>
                        </label>
                        <input
                            type="tel"
                            placeholder="+0"
                            className="w-full border border-[#F5E9DD] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#F5C16C] bg-[#FCFAF7] text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#181C32] mb-1">
                            Date of Birth<span className="text-[#F5C16C]">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your street address"
                            className="w-full border border-[#F5E9DD] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#F5C16C] bg-[#FCFAF7] text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#181C32] mb-1">
                            Street Address<span className="text-[#F5C16C]">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your street address"
                            className="w-full border border-[#F5E9DD] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#F5C16C] bg-[#FCFAF7] text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#181C32] mb-1">
                            City<span className="text-[#F5C16C]">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your city address"
                            className="w-full border border-[#F5E9DD] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#F5C16C] bg-[#FCFAF7] text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#181C32] mb-1">
                            Postal Code/ Zip Code<span className="text-[#F5C16C]">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your postal/ zip code"
                            className="w-full border border-[#F5E9DD] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#F5C16C] bg-[#FCFAF7] text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#181C32] mb-1">
                            Street/Province/Region<span className="text-[#F5C16C]">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your Street/Province/Region"
                            className="w-full border border-[#F5E9DD] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#F5C16C] bg-[#FCFAF7] text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#181C32] mb-1">
                            Country<span className="text-[#F5C16C]">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your country name"
                            className="w-full border border-[#F5E9DD] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#F5C16C] bg-[#FCFAF7] text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#181C32] mb-1">
                            Restoration ID
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your restoration"
                            className="w-full border border-[#F5E9DD] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#F5C16C] bg-[#FCFAF7] text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#181C32] mb-1">
                            Tax ID
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your tax id"
                            className="w-full border border-[#F5E9DD] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#F5C16C] bg-[#FCFAF7] text-sm"
                        />
                    </div>
                    <div className="flex items-start mt-4">
                        <input
                            type="checkbox"
                            id="terms"
                            className="mt-1 accent-[#F5C16C] w-4 h-4 border border-[#F5C16C] rounded"
                        />
                        <label htmlFor="terms" className="ml-2 text-sm text-[#181C32]">
                            Lorem ipsum dolor sit amet consectetur. Gravida consequat et et pharetra. A facilisis est consequat cras imperdiet tristique. Auctor purus sed lacus varius fringilla enim tortor ut vestibulum
                        </label>
                    </div>
                    <button
                        type="submit"
                        className="mt-4 w-40 bg-[#F5C16C] hover:bg-[#eab75e] text-white font-medium rounded-md py-2 px-4 transition-colors"
                    >
                        Save changes
                    </button>
                </form>
            </div>
        </div>
    );
}
