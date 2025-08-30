import React, { useState, useEffect } from 'react';
import {
  Clock,
  Phone,
  CheckCircle,
  Calendar,
  Plane,
  MapPin,
  Home,
  Mail,
  AlertCircle,
  PhoneCall
} from 'lucide-react';

const SupportSection = () => {
  const [isSupportVisible, setIsSupportVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id === "support-24-7") {
            setIsSupportVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    const element = document.getElementById("support-24-7");
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <div
      id="support-24-7"
      className="py-12 md:py-24 bg-gradient-to-br from-gray-50 to-gray-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`transition-all duration-1000 ${
            isSupportVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center mb-8 md:mb-16">
            <div className="inline-flex items-center justify-center w-16 md:w-20 h-16 md:h-20 bg-gray-800 rounded-full mb-4 md:mb-6">
              <Clock className="h-8 md:h-10 w-8 md:w-10 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 md:mb-6 tracking-wide">
              WE'RE WITH YOU EVERY STEP OF THE WAY
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed mb-6 md:mb-8">
              From the moment you start planning to the minute you return
              home, our dedicated support team is available 24/7 to ensure
              your journey is smooth, worry-free, and memorable.
            </p>
            <div className="inline-flex items-center bg-gray-800 text-white px-4 md:px-6 py-2 md:py-3 rounded-full font-semibold text-sm md:text-base">
              <Phone className="h-4 md:h-5 w-4 md:w-5 mr-2" />
              24/7 CUSTOMER SUPPORT
            </div>
          </div>

          {/* Journey Timeline */}
          <div className="relative max-w-6xl mx-auto">
            {/* Timeline Line - Only visible on desktop */}
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-0.5 top-0 bottom-0 w-1 bg-gray-300 z-0"></div>

            {/* Support Stages */}
            <div className="space-y-8 md:space-y-20">
              {/* Pre-Travel Support */}
              <div className="relative">
                {/* Desktop Number Circle - Middle Line */}
                <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 w-12 h-12 bg-blue-600 rounded-full items-center justify-center border-4 border-white shadow-lg z-10">
                  <span className="text-white font-bold text-lg">1</span>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 items-center">
                  <div
                    className={`lg:pr-8 space-y-4 transition-all duration-1000 delay-200 ${
                      isSupportVisible
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-8"
                    }`}
                  >
                    <div className="flex items-center justify-start lg:justify-end space-x-3 mb-4">
                      <div className="p-2 md:p-3 bg-blue-100 rounded-lg">
                        <Calendar className="h-5 md:h-6 w-5 md:w-6 text-blue-600" />
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                        PRE-TRAVEL SUPPORT
                      </h3>
                    </div>
                    <h4 className="text-lg md:text-xl font-semibold text-gray-800 mb-3 text-left lg:text-right">
                      Planning & Preparation
                    </h4>
                    <ul className="space-y-2 text-gray-600 text-sm md:text-lg">
                      <li className="flex items-start justify-start lg:justify-end space-x-2 text-left lg:text-right">
                        <CheckCircle className="h-4 md:h-5 w-4 md:w-5 text-green-500 mt-1 flex-shrink-0 lg:order-2" />
                        <span className="lg:order-1">Visa document verification & guidance</span>
                      </li>
                      <li className="flex items-start justify-start lg:justify-end space-x-2 text-left lg:text-right">
                        <CheckCircle className="h-4 md:h-5 w-4 md:w-5 text-green-500 mt-1 flex-shrink-0 lg:order-2" />
                        <span className="lg:order-1">
                          Flight booking confirmations & seat selections
                        </span>
                      </li>
                      <li className="flex items-start justify-start lg:justify-end space-x-2 text-left lg:text-right">
                        <CheckCircle className="h-4 md:h-5 w-4 md:w-5 text-green-500 mt-1 flex-shrink-0 lg:order-2" />
                        <span className="lg:order-1">Travel insurance recommendations</span>
                      </li>
                      <li className="flex items-start justify-start lg:justify-end space-x-2 text-left lg:text-right">
                        <CheckCircle className="h-4 md:h-5 w-4 md:w-5 text-green-500 mt-1 flex-shrink-0 lg:order-2" />
                        <span className="lg:order-1">Destination information & travel tips</span>
                      </li>
                    </ul>
                  </div>
                  <div
                    className={`relative transition-all duration-1000 delay-400 order-first lg:order-last ${
                      isSupportVisible
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 translate-x-8"
                    }`}
                  >

                    <img
                      src="https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=600"
                      alt="Travel planning consultation"
                      className="w-full h-48 md:h-64 object-cover rounded-xl shadow-lg"
                    />
                  </div>
                </div>
              </div>

              {/* During Travel Support */}
              <div className="relative">
                {/* Desktop Number Circle - Middle Line */}
                <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 w-12 h-12 bg-green-600 rounded-full items-center justify-center border-4 border-white shadow-lg z-10">
                  <span className="text-white font-bold text-lg">2</span>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 items-center">
                  <div
                    className={`relative transition-all duration-1000 delay-600 ${
                      isSupportVisible
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-8"
                    }`}
                  >

                    <img
                      src="https://images.pexels.com/photos/1906658/pexels-photo-1906658.jpeg?auto=compress&cs=tinysrgb&w=600"
                      alt="Flight and travel support"
                      className="w-full h-48 md:h-64 object-cover rounded-xl shadow-lg"
                    />
                  </div>
                  <div
                    className={`lg:pl-8 space-y-4 transition-all duration-1000 delay-800 ${
                      isSupportVisible
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 translate-x-8"
                    }`}
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 md:p-3 bg-green-100 rounded-lg">
                        <Plane className="h-5 md:h-6 w-5 md:w-6 text-green-600" />
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                        DURING TRAVEL SUPPORT
                      </h3>
                    </div>
                    <h4 className="text-lg md:text-xl font-semibold text-gray-800 mb-3">
                      In-Flight & Transit Assistance
                    </h4>
                    <ul className="space-y-2 text-gray-600 text-sm md:text-lg">
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="h-4 md:h-5 w-4 md:w-5 text-green-500 mt-1 flex-shrink-0" />
                        <span>
                          Real-time flight delay & gate change updates
                        </span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="h-4 md:h-5 w-4 md:w-5 text-green-500 mt-1 flex-shrink-0" />
                        <span>Connection assistance for layovers</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="h-4 md:h-5 w-4 md:w-5 text-green-500 mt-1 flex-shrink-0" />
                        <span>Emergency rebooking for missed flights</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="h-4 md:h-5 w-4 md:w-5 text-green-500 mt-1 flex-shrink-0" />
                        <span>Baggage tracking & lost luggage support</span>
                      </li>
                    </ul>
                  </div>
                </div>

              </div>

              {/* At Destination Support */}
              <div className="relative">
                {/* Desktop Number Circle - Middle Line */}
                <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 w-12 h-12 bg-orange-600 rounded-full items-center justify-center border-4 border-white shadow-lg z-10">
                  <span className="text-white font-bold text-lg">3</span>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 items-center">
                  <div
                    className={`lg:pr-8 space-y-4 transition-all duration-1000 delay-1000 ${
                      isSupportVisible
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-8"
                    }`}
                  >
                    <div className="flex items-center justify-start lg:justify-end space-x-3 mb-4">
                      <div className="p-2 md:p-3 bg-orange-100 rounded-lg">
                        <MapPin className="h-5 md:h-6 w-5 md:w-6 text-orange-600" />
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                        AT DESTINATION SUPPORT
                      </h3>
                    </div>
                    <h4 className="text-lg md:text-xl font-semibold text-gray-800 mb-3 text-left lg:text-right">
                      Local Assistance & Tour Support
                    </h4>
                    <ul className="space-y-2 text-gray-600 text-sm md:text-lg">
                      <li className="flex items-start justify-start lg:justify-end space-x-2 text-left lg:text-right">
                        <CheckCircle className="h-4 md:h-5 w-4 md:w-5 text-green-500 mt-1 flex-shrink-0 lg:order-2" />
                        <span className="lg:order-1">Local emergency contact & assistance</span>
                      </li>
                      <li className="flex items-start justify-start lg:justify-end space-x-2 text-left lg:text-right">
                        <CheckCircle className="h-4 md:h-5 w-4 md:w-5 text-green-500 mt-1 flex-shrink-0 lg:order-2" />
                        <span className="lg:order-1">Hotel check-in issues resolution</span>
                      </li>
                      <li className="flex items-start justify-start lg:justify-end space-x-2 text-left lg:text-right">
                        <CheckCircle className="h-4 md:h-5 w-4 md:w-5 text-green-500 mt-1 flex-shrink-0 lg:order-2" />
                        <span className="lg:order-1">Tour schedule changes & coordination</span>
                      </li>
                      <li className="flex items-start justify-start lg:justify-end space-x-2 text-left lg:text-right">
                        <CheckCircle className="h-4 md:h-5 w-4 md:w-5 text-green-500 mt-1 flex-shrink-0 lg:order-2" />
                        <span className="lg:order-1">Restaurant & attraction recommendations</span>
                      </li>
                    </ul>
                  </div>
                  <div
                    className={`relative transition-all duration-1000 delay-1200 order-first lg:order-last ${
                      isSupportVisible
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 translate-x-8"
                    }`}
                  >

                    <img
                      src="https://images.pexels.com/photos/3278215/pexels-photo-3278215.jpeg?auto=compress&cs=tinysrgb&w=600"
                      alt="Destination support and local assistance"
                      className="w-full h-48 md:h-64 object-cover rounded-xl shadow-lg"
                    />
                  </div>
                </div>

              </div>

              {/* Return Journey Support */}
              <div className="relative">
                {/* Desktop Number Circle - Middle Line */}
                <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 w-12 h-12 bg-purple-600 rounded-full items-center justify-center border-4 border-white shadow-lg z-10">
                  <span className="text-white font-bold text-lg">4</span>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 items-center">
                  <div
                    className={`relative transition-all duration-1000 delay-1400 ${
                      isSupportVisible
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-8"
                    }`}
                  >
                    <img
                      src="https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg?auto=compress&cs=tinysrgb&w=600"
                      alt="Return journey support"
                      className="w-full h-full object-cover rounded-xl shadow-lg"
                    />
                  </div>
                  <div
                    className={`lg:pl-8 space-y-4 transition-all duration-1000 delay-1600 ${
                      isSupportVisible
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 translate-x-8"
                    }`}
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 md:p-3 bg-purple-100 rounded-lg">
                        <Home className="h-5 md:h-6 w-5 md:w-6 text-purple-600" />
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                        RETURN JOURNEY SUPPORT
                      </h3>
                    </div>
                    <h4 className="text-lg md:text-xl font-semibold text-gray-800 mb-3">
                      Safe Return & Follow-up
                    </h4>
                    <ul className="space-y-2 text-gray-600 text-sm md:text-lg">
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="h-4 md:h-5 w-4 md:w-5 text-green-500 mt-1 flex-shrink-0" />
                        <span>Return flight confirmations & reminders</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="h-4 md:h-5 w-4 md:w-5 text-green-500 mt-1 flex-shrink-0" />
                        <span>Airport transfers & departure assistance</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="h-4 md:h-5 w-4 md:w-5 text-green-500 mt-1 flex-shrink-0" />
                        <span>Post-travel feedback & experience sharing</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="h-4 md:h-5 w-4 md:w-5 text-green-500 mt-1 flex-shrink-0" />
                        <span>Future travel planning discussions</span>
                      </li>
                    </ul>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Support Channels */}
          <div className="mt-12 md:mt-20 bg-white rounded-2xl border p-6 md:p-8">
            <div className="text-center mb-8 md:mb-12">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                MULTIPLE WAYS TO REACH US
              </h3>
              <p className="text-gray-600 text-base md:text-lg">
                Choose your preferred communication method - we're always
                ready to help
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <a 
                href="tel:00971547858338" 
                className="text-center p-4 md:p-6 bg-gray-50 border rounded-xl hover:bg-gray-100 transition-colors duration-300 cursor-pointer block"
              >
                <div className="w-12 md:w-16 h-12 md:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <Phone className="h-6 md:h-8 w-6 md:w-8 text-blue-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2 text-sm md:text-base">PHONE CALL</h4>
                <p className="text-gray-600 text-xs md:text-sm">
                  Instant support via phone call for urgent matters
                </p>
              </a>

              <a 
                href="mailto:reservation@wwtravels.net" 
                className="text-center p-4 md:p-6 bg-gray-50 border rounded-xl hover:bg-gray-100 transition-colors duration-300 cursor-pointer block"
              >
                <div className="w-12 md:w-16 h-12 md:h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <Mail className="h-6 md:h-8 w-6 md:w-8 text-yellow-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2 text-sm md:text-base">EMAIL</h4>
                <p className="text-gray-600 text-xs md:text-sm">
                  Detailed support & documentation via email
                </p>
              </a>

              <a 
                href="tel:00971522880935" 
                className="text-center p-4 md:p-6 bg-gray-50 border rounded-xl hover:bg-gray-100 transition-colors duration-300 cursor-pointer block"
              >
                <div className="w-12 md:w-16 h-12 md:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <AlertCircle className="h-6 md:h-8 w-6 md:w-8 text-red-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2 text-sm md:text-base">EMERGENCY</h4>
                <p className="text-gray-600 text-xs md:text-sm">
                  24/7 emergency hotline: 00971 52 288 0935
                </p>
              </a>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12 md:mt-16">
            <div className="bg-black rounded-2xl p-6 md:p-8 text-white">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                EXPERIENCE WORRY-FREE TRAVEL
              </h3>
              <p className="text-lg md:text-xl text-gray-300 mb-6 md:mb-8 max-w-3xl mx-auto">
                With our comprehensive support system, you can focus on
                creating memories while we handle everything else. Your
                perfect journey is just one call away.
              </p>
              <div className="flex justify-center items-center">
                <button 
                  onClick={() => window.open("tel:00971547858338")}
                  className="bg-white text-gray-800 px-6 md:px-8 py-3 md:py-4 rounded-lg font-bold hover:bg-gray-100 transition-colors duration-300 flex items-center cursor-pointer text-sm md:text-base"
                >
                  <PhoneCall className="h-4 md:h-5 w-4 md:w-5 mr-2" />
                  CALL NOW: 00971 54 7858338
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportSection;