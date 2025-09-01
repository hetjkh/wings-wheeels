import { Quote } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Rochak",
    location: "EAST AFRICA",
    review:
      "Booking with Wings & Wheels was the best decision I made for my Dubai trip. From the moment I contacted them, their team was super helpful and friendly. They handled my flight bookings, visa, hotel stay, and even airport transfers so smoothly. I didn't have to worry about anything. They also customized the package to fit my budget without compromising on quality. I loved how responsive they were—even at odd hours. This wasn't just a trip, it was a truly relaxing experience thanks to their planning. I'll definitely recommend them to my friends and family.",
  },
  {
    id: 2,
    name: "Himanshu",
    location: "UAE",
    review:
      "A well-planned tour from start to finish. I didn't have to worry about a thing. Great support even during the trip!",
  },
  {
    id: 3,
    name: "Rashmi.P",
    location: "UAE",
    review:
      "Smooth booking, great support, stress-free trip. Highly recommend Wings & Wheels!",
  },
  {
    id: 4,
    name: "Sagar",
    location: "INDIA",
    review:
      "Exceptional service and attention to detail. Made our honeymoon absolutely perfect!",
  },
];

const review = () => {
  return (
    <div className="flex justify-center items-center flex-col w-full bg-black">
      <section className="w-[95%] text-white py-8 lg:py-12 min-h-screen flex flex-col">
        <div className="max-w-7xl mx-auto w-full">
          {/* Header */}
          <div className="mb-10 lg:mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold mb-4 GeistBold">
              WHAT OUR CUSTOMERS SAY
            </h2>
            <p className="text-sm lg:text-base text-gray-200 max-w-2xl leading-relaxed Poppins">
              Our customers are at the heart of everything we do. Here's what
              real travelers say about their experiences with Wings & Wheels.
            </p>
          </div>

          {/* Reviews Grid */}
          <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto">
            {/* Left Side - Single Large Review */}
            <div className="lg:w-1/2 bg-white text-black p-8 rounded-2xl shadow-lg flex flex-col h-full">
              <div className="flex-grow">
                <Quote className="w-8 h-8 text-pink-500 mb-4" />
                <p className="text-base leading-relaxed mb-6">
                  {reviews[0].review}
                </p>
              </div>
              <div className="flex items-center">
                <div>
                  <h4 className="font-bold text-lg">{reviews[0].name}</h4>
                  <p className="text-sm text-gray-600">{reviews[0].location}</p>
                </div>
              </div>
            </div>

            {/* Right Side - Grid of 3 Reviews */}
            <div className="lg:w-1/2 flex flex-col gap-6">
              {/* Top Large Review */}
              <div className="bg-white text-black p-6 rounded-2xl shadow-lg">
                <div className="flex items-start space-x-4">
                  <Quote className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
                  <p className="text-sm leading-relaxed mb-4">
                    {reviews[1].review}
                  </p>
                </div>
                <div className="mt-4">
                  <h4 className="font-bold text-sm">{reviews[1].name}</h4>
                  <p className="text-xs text-gray-600">
                    {reviews[1].location}
                  </p>
                </div>
              </div>

              {/* Bottom Two Small Reviews */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Review 1 */}
                <div className="bg-white text-black p-4 rounded-2xl shadow-lg">
                  <div className="flex items-start space-x-2">
                    <Quote className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <p className="text-xs leading-relaxed line-clamp-3">
                      {reviews[2].review}
                    </p>
                  </div>
                  <div className="mt-3">
                    <h4 className="font-bold text-xs">{reviews[2].name}</h4>
                    <p className="text-xs text-gray-600">{reviews[2].location}</p>
                  </div>
                </div>

                {/* Review 2 */}
                <div className="bg-white text-black p-4 rounded-2xl shadow-lg">
                  <div className="flex items-start space-x-2">
                    <Quote className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <p className="text-xs leading-relaxed line-clamp-3">
                      {reviews[3]?.review || reviews[0].review}
                    </p>
                  </div>
                  <div className="mt-3">
                    <h4 className="font-bold text-xs">
                      {reviews[3]?.name || reviews[0].name}
                    </h4>
                    <p className="text-xs text-gray-600">
                      {reviews[3]?.location || reviews[0].location}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default review;
