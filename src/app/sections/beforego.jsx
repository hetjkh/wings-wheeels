import React from "react";
import Image from "next/image";

const beforego = () => {
  return (
    <div className="h-auto w-full flex justify-center items-center flex-col">
      <section className="w-[95%] bg-gray-50 py-12 lg:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-start gap-8">
            {/* Left Side - Text Content */}
            <div className="lg:w-1/2">
              <div className="mb-10 lg:mb-12">
                <h2 className="text-2xl lg:text-3xl font-bold mb-4 GeistBold">
                  THINGS TO REMEMBER BEFORE YOUR TRAVEL
                </h2>
                <p className="text-sm lg:text-base text-gray-700 max-w-2xl leading-relaxed Poppins">
                  Essential things to review before heading to the
                  airport—documents, packing list, travel plans, and online
                  check-in for a smooth journey.
                </p>
              </div>

              <div className="h-6"></div>

              <div className="space-y-3">
                <div className="bg-white p-4 rounded-lg border transition-shadow duration-300">
                  <h3 className="font-semibold text-base text-gray-900 mb-1">
                    Finalize Your Documents
                  </h3>
                  <p className="text-sm text-gray-500">
                    Double-check your passport, visas, flight tickets, and hotel
                    reservations. Make sure everything is in order and easily
                    accessible.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg border transition-shadow duration-300">
                  <h3 className="font-semibold text-base text-gray-900 mb-1">
                    Pack Smart
                  </h3>
                  <p className="text-sm text-gray-500">
                    Create a packing list to ensure you have all the essentials.
                    Don't forget your medications, chargers, and any travel
                    adapters you might need.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg border transition-shadow duration-300">
                  <h3 className="font-semibold text-base text-gray-900 mb-1">
                    Confirm Your Travel Plan
                  </h3>
                  <p className="text-sm text-gray-500">
                    Review your itinerary one last time. Note down contact
                    numbers for your accommodations, tour operators, and our
                    agency in case you need assistance.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg border transition-shadow duration-300">
                  <h3 className="font-semibold text-base text-gray-900 mb-1">
                    Check-in Online
                  </h3>
                  <p className="text-sm text-gray-500">
                    Save time at the airport by checking in for your flight 24
                    hours in advance.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="lg:w-1/2 h-0 md:h-full">
              <div className="relative rounded-2xl overflow-hidden shadow-xl h-[600px]">
                <Image
                  src="/assets/airticket.jpg"
                  alt="Air tickets and travel documents"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8 text-white">
                  <h3 className="text-2xl font-bold mb-2">
                    Ready for Your Journey?
                  </h3>
                  <p className="text-gray-200">
                    Let us help you prepare for an unforgettable travel
                    experience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default beforego;