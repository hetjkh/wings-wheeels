import React, { useMemo, memo } from "react";
import { ArrowUpRight, Star, Quote } from "lucide-react";

const whyChooseReasons = [
  {
    id: 1,
    title: "EXPERTISE AND PERSONALIZED SERVICE",
    description:
      "Our team of certified travel professionals brings years of industry experience to craft your perfect journey. We take the time to understand your unique travel style, preferences, and budget to create a customized itinerary that exceeds your expectations. From romantic getaways to family vacations and business trips, we provide personalized recommendations for destinations, accommodations, and activities that align perfectly with your vision of the perfect trip.",
  },
  {
    id: 2,
    title: "TIME AND STRESS SAVINGS",
    description:
      "Planning a trip, especially to multiple destinations, can be an overwhelming task that consumes countless hours. Our travel experts handle every detail meticulously - from securing the best flight options and hotel bookings to arranging local transportation and exclusive excursions. We navigate the complexities of travel planning so you can focus on the excitement of your upcoming adventure. With us, you'll save an average of 15-20 hours of research and planning time per trip.",
  },
  {
    id: 3,
    title: "ACCESS TO EXCLUSIVE DEALS AND PERKS",
    description:
      "Through our extensive network of global partners and premium memberships, we unlock exclusive benefits that aren't available to the general public. Enjoy complimentary room upgrades, early check-in/late check-out privileges, resort credits, special dining experiences, and VIP treatment at top destinations worldwide. Our clients regularly save up to 30% on luxury accommodations and receive added value that enhances their travel experience without increasing their budget.",
  },
  {
    id: 4,
    title: "SAFETY AND SECURITY",
    description:
      "Your well-being is our top priority. We stay updated with the latest travel advisories, health requirements, and safety protocols for every destination. Our team provides comprehensive pre-trip briefings, including essential information on local customs, emergency contacts, and health precautions. We offer 24/7 emergency assistance during your travels, ensuring you have support whenever you need it, wherever you are in the world.",
  },
  {
    id: 5,
    title: "SAFE, SECURE & TRANSPARENT",
    description:
      "We believe in complete transparency and integrity in all our dealings. Our pricing is clear and comprehensive, with no hidden fees or surprise charges. We use secure payment gateways to protect your financial information and offer flexible cancellation policies. Our team maintains open communication throughout the booking process and beyond, providing regular updates and being available to address any questions or concerns you might have about your travel plans.",
  },
  {
    id: 6,
    title: "WIDE NETWORK OF GLOBAL PARTNERS",
    description:
      "Our strategic partnerships with over 5,000 travel providers across 100+ countries give us unparalleled access to the best rates and premium services. Whether you're looking for a luxury resort in the Maldives, a boutique hotel in Paris, or an adventure tour in New Zealand, our global connections ensure you receive priority treatment and exclusive access. Our established relationships mean we can often secure last-minute bookings and special arrangements that aren't available through online booking platforms.",
  },
];

const ReasonCard = memo(({ reason }) => (
  <div className="group bg-gray-100 hover:bg-gray-200 p-2 lg:p-8 rounded-lg transition-all duration-300 cursor-pointer shadow-sm hover:shadow-xl border-gray-100 flex flex-col h-full min-h-[320px] w-full will-change-transform">
    <div className="flex-grow space-y-5">
      <h3 className="text-sm md:text-lg font-bold text-gray-900 group-hover:text-black transition-colors duration-300 Geist">
        {reason.title}
      </h3>
      <p className="text-xs md:text-sm Poppins text-gray-600 group-hover:text-gray-700 transition-colors duration-300 max-h-[300px] line-clamp-7 leading-relaxed">
        {reason.description}
      </p>
    </div>

    {/* Empty container to maintain spacing - Arrow icon removed */}
    <div className="mt-8">
      <div className="w-8 h-8"></div>
    </div>
  </div>
));

const chooseus = () => {
  const memoizedReasons = useMemo(() => whyChooseReasons, []);
  return (
    <div>
      <section className="w-full bg-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="mb-10 lg:mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold mb-4 GeistBold">
              WHY CHOOSE TO BOOK WITH WINGS & WHEELS?
            </h2>
            <p className="text-sm lg:text-base text-gray-700 max-w-2xl leading-relaxed Poppins">
              With years of experience and a passion for travel, we make sure
              every trip is smooth, safe, and perfectly planned. Here's why
              thousands of travelers trust us with their dream vacations.
            </p>
          </div>

          {/* Reasons Grid */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-10">
            {memoizedReasons.map((reason) => (
              <ReasonCard key={reason.id} reason={reason} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default chooseus;
