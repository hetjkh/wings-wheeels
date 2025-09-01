"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  Clock,
  ExternalLink,
  Plus,
  Minus,
  Plane,
  FileText,
  Package,
  Building,
  Users,
  Award,
  Globe,
  Shield,
  CheckCircle,
  Star,
  Calendar,
  TrendingUp,
  Target,
  Heart,
  Briefcase,
  Headphones,
  Navigation,
  Map,
  Luggage,
  Home,
  AlertCircle,
  PhoneCall,
  Zap,
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Navbar from "../reusable/navbar";
import Footer from "../reusable/footer";
import MobileOfficeCarousel from "../../components/MobileOfficeCarousel";
import Support from "./Support";

const AboutUs = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isWhatWeDoVisible, setIsWhatWeDoVisible] = useState(false);
  const [isWhyWeDoItVisible, setIsWhyWeDoItVisible] = useState(false);
  const [isVisionVisible, setIsVisionVisible] = useState(false);
  const [isExpertiseVisible, setIsExpertiseVisible] = useState(false);
  const [isStatsVisible, setIsStatsVisible] = useState(false);
  const [isProcessVisible, setIsProcessVisible] = useState(false);
  const [isSupportVisible, setIsSupportVisible] = useState(false);
  const [isValuesVisible, setIsValuesVisible] = useState(false);
  const [isLocationsVisible, setIsLocationsVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('dubai');

  const officeLocations = {
    dubai: {
      name: 'Dubai, UAE',
      company: 'Holiday Dreamz Travel Management',
      phone: '+971 54 785 8338, +971 52 288 0935',
      email: 'reservation@wwtravels.net',
      address: 'Office no-3, Al Khaimah building, Port Saeed, Deira, Dubai, UAE',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3609.144845705496!2d55.29683841501026!3d25.25484398388285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5d8b5b5b5b5b%3A0x9b1e8b0e8b7d7a7c!2sAl%20Khaimah%20Building%2C%20Port%20Saeed%2C%20Deira%2C%20Dubai%2C%20UAE!5e0!3m2!1sen!2s!4v1679489234567!5m2!1sen!2s'
    },
    juba: {
      name: 'Juba, Republic of South Sudan',
      company: 'Holiday Dreamz Travel Management Co. Ltd',
      phone: '+211 911544294',
      email: 'reservation.juba@holidaydreamz.net',
      address: 'Opp. Zain Building, Airport Ministry Road, Juba, Republic of South Sudan',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31730.842087472256!2d31.582096!3d4.859363!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1735c3e2e23ac0b7%3A0x9b1e8b0e8b7d7a7c!2sJuba%2C%20South%20Sudan!5e0!3m2!1sen!2s!4v1679489234567!5m2!1sen!2s'
    },
    nairobi: {
      name: 'Nairobi-Kenya',
      company: 'Fly Holiday Dreamz Travel Mgt. Ltd.',
      phone: '+254 742449110',
      email: 'reservation.nbo@holidaydreamz.net',
      address: 'No 6, Ground Floor, Park Suit\'s, Parkland Road, Nairobi, Kenya',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8195703511636!2d36.82194631475387!3d-1.2920659990617518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10c7b7d4b5b7%3A0x9b1e8b0e8b7d7a7c!2sParkland%20Rd%2C%20Nairobi%2C%20Kenya!5e0!3m2!1sen!2s!4v1679489234567!5m2!1sen!2s'
    },
    khartoum: {
      name: 'Khartoum- Sudan',
      company: 'Holiday Dreamz Travel Management Co. Ltd',
      phone: '+249 927992295',
      email: 'reservation.krt@holidaydreamz.net',
      address: 'Shop No 2, Bldg No 2, Block 2cg, Sylaphos Building, Jamuhiriya Street, Khartoum East, Sudan',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31303.878471829754!2d32.53199!3d15.5007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x168e8f4b6c7a0a0b%3A0x9b1e8b0e8b7d7a7c!2sKhartoum%20East%2C%20Khartoum%2C%20Sudan!5e0!3m2!1sen!2s!4v1679489234567!5m2!1sen!2s'
    },
    ajmer: {
      name: 'Ajmer- India',
      company: 'Fly Holiday Dreamz Travel Management Pvt. Ltd',
      phone: '+91 7300078037',
      email: 'reservation.ajm@holidaydreamz.net',
      address: '1 ch-19 Janta Colony, Vaishali Nagar Ajmer, Rajasthan, India, 305004',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3574.0932659963576!2d74.63394031505087!3d26.449923383324326!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396be711bbb73d33%3A0x9b1e8b0e8b7d7a7c!2sVaishali%20Nagar%2C%20Ajmer%2C%20Rajasthan%20305004%2C%20India!5e0!3m2!1sen!2s!4v1679489234567!5m2!1sen!2s'
    },
    kampala: {
      name: 'Kampala, Uganda',
      company: 'Holiday Dreamz Travel Management Co. Ltd',
      phone: '+256 707009367, +254 707009366',
      email: 'reservation.kla@holidaydreamz.net',
      address: 'UG 07,Plot 18, Nalukwago Complex, George Street, Kampala, Uganda',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7611574965946!2d32.582519614753504!3d0.3475603643742785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177dbbf4c6c6a9a9%3A0x9b1e8b0e8b7d7a7c!2sGeorge%20St%2C%20Kampala%2C%20Uganda!5e0!3m2!1sen!2s!4v1679489234567!5m2!1sen!2s'
    }
  };

  useEffect(() => {
    setIsVisible(true);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.id === "what-we-do") {
              setIsWhatWeDoVisible(true);
            } else if (entry.target.id === "why-we-do-it") {
              setIsWhyWeDoItVisible(true);
            } else if (entry.target.id === "our-vision") {
              setIsVisionVisible(true);
            } else if (entry.target.id === "expertise") {
              setIsExpertiseVisible(true);
            } else if (entry.target.id === "stats") {
              setIsStatsVisible(true);
            } else if (entry.target.id === "process") {
              setIsProcessVisible(true);
            } else if (entry.target.id === "support-24-7") {
              setIsSupportVisible(true);
            } else if (entry.target.id === "values") {
              setIsValuesVisible(true);
            } else if (entry.target.id === "locations") {
              setIsLocationsVisible(true);
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    const sections = [
      "what-we-do",
      "why-we-do-it",
      "our-vision",
      "expertise",
      "stats",
      "process",
      "support-24-7",
      "values",
      "locations",
    ];
    const elements = sections
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    elements.forEach((element) => observer.observe(element));

    return () => {
      elements.forEach((element) => observer.unobserve(element));
    };
  }, []);

  const currentLocation = officeLocations[selectedLocation];

  return (
    <div className="w-full bg-white">
      {/* Hero Section with Background Image */}
      <div
        className="relative w-full min-h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url(https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=1920)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed"
        }}
      >
        <div className="relative z-20 min-h-screen flex flex-col w-full overflow-x-hidden">
          {/* Navigation Bar */}
          <Navbar />

          {/* Main Content */}
          <div className="flex-1 flex items-center justify-center py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center px-4 sm:px-8">
                {/* Main Heading */}
                <h1
                  className={`font-bold mb-6 uppercase GeistBlack text-4xl md:text-7xl tracking-wider leading-tight text-white transition-all duration-1000 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                >
                  ABOUT US
                </h1>

                {/* Subtitle */}
                <div
                  className={`mb-6 transition-all duration-1200 Poppins delay-300 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                >
                  <h2 className="text-sm PoppinBold md:text-xl font-light text-gray-200 mb-4 tracking-wide">
                    PROFESSIONAL TRAVEL SERVICES SINCE 2013
                  </h2>
                </div>

                {/* Description */}
                <p
                  className={`Poppins text-sm md:text-lg leading-relaxed mb-8 max-w-3xl mx-auto text-gray-100 transition-all duration-1400 delay-500 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                >
                  Your trusted partner in creating extraordinary travel
                  experiences. We combine years of industry expertise with
                  personalized service to deliver seamless journeys that exceed
                  expectations.
                </p>

                {/* Key Stats */}
                <div
                  className={`grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-2xl mx-auto transition-all duration-1600 delay-700 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                >
                  <div className="text-center Poppins">
                    <div className="text-3xl font-bold text-white mb-1">
                      13+
                    </div>
                    <div className="text-sm text-gray-300 uppercase tracking-wide">
                      Years Experience
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-1">
                      50k+
                    </div>
                    <div className="text-sm text-gray-300 uppercase tracking-wide">
                      Happy Travelers
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-1">
                      100+
                    </div>
                    <div className="text-sm text-gray-300 uppercase tracking-wide">
                      Destinations
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-1">
                      10+
                    </div>
                    <div className="text-sm text-gray-300 uppercase tracking-wide">
                      Packages
                    </div>
                  </div>

                </div>

                <div className="absolute z-0 top-0 left-0 w-[100vw] h-full bg-gradient-to-b from-white/80 via-transparent to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* What We Do Section */}
      <div id="what-we-do" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image Column */}
            <div
              className={`relative transition-all duration-1000 ${
                isWhatWeDoVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-8"
              }`}
            >
              <div className="relative w-full h-96 lg:h-[500px] rounded-2xl shadow-2xl overflow-hidden">
                <Image
                  src="/assets/jani.jpg"
                  alt="Professional travel consultation"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-all duration-500"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
              </div>
            </div>

            {/* Content Column */}
            <div
              className={`space-y-8 transition-all duration-1000 delay-300 ${
                isWhatWeDoVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-8"
              }`}
            >
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3 tracking-wide GeistBold">
                  WHAT WE DO
                </h2>
                <p className="text-base text-gray-600 leading-relaxed mb-6 Poppins">
                  We provide comprehensive travel solutions tailored to your
                  specific needs. Our services are designed to make your travel
                  experience seamless and memorable.
                </p>
              </div>

              {/* Service Cards */}
              <div className="space-y-4 Poppins">
                <div
                  className={`bg-gray-50 p-6 rounded-xl border transition-all duration-300 transform hover:-translate-y-1 ${
                    isWhatWeDoVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: "600ms" }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-gray-200 rounded-lg">
                      <Plane className="h-6 w-6 text-gray-800" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-gray-800 mb-1">
                        DOMESTIC & INTERNATIONAL AIR TICKET BOOKINGS
                      </h3>
                    </div>
                  </div>
                </div>

                <div
                  className={`bg-gray-50 p-6 rounded-xl border transition-all duration-300 transform hover:-translate-y-1 ${
                    isWhatWeDoVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: "700ms" }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-gray-200 rounded-lg">
                      <FileText className="h-6 w-6 text-gray-800" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-gray-800 mb-1">
                        VISA ASSISTANCE FOR ALL MAJOR DESTINATIONS
                      </h3>
                    </div>
                  </div>
                </div>

                <div
                  className={`bg-gray-50 p-6 rounded-xl border transition-all duration-300 transform hover:-translate-y-1 ${
                    isWhatWeDoVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: "800ms" }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-gray-200 rounded-lg">
                      <Package className="h-6 w-6 text-gray-800" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-gray-800 mb-1">
                        INBOUND & OUTBOUND TOUR PACKAGES
                      </h3>
                    </div>
                  </div>
                </div>

                <div
                  className={`bg-gray-50 p-6 rounded-xl border transition-all duration-300 transform hover:-translate-y-1 ${
                    isWhatWeDoVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: "900ms" }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-gray-200 rounded-lg">
                      <Building className="h-6 w-6 text-gray-800" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-gray-800 mb-1">
                        HOTEL RESERVATIONS ACROSS THE GLOBE
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Why We Do It Section */}
      <div id="why-we-do-it" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`transition-all duration-1000 ${
              isWhyWeDoItVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl lext left text-gray-900 mb-6 GeistBold">
                WHY WE DO IT
              </h2>
            </div>

            {/* Main Philosophy */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16 Poppins">
              <div className="order-2 lg:order-1">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 GeistBold">
                    OUR PHILOSOPHY
                  </h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Travel is more than just visiting new places—it's about
                    creating life-changing experiences, building lasting
                    memories, and connecting cultures. Every journey should be
                    seamless, meaningful, and transformative.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    We believe that travel planning shouldn't be stressful or
                    complicated. Our mission is to remove every obstacle between
                    you and your perfect trip, replacing anxiety with
                    anticipation and confusion with clarity.
                  </p>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="relative w-full h-80 rounded-2xl shadow-xl overflow-hidden">
                  <Image
                    src="/assets/phil.jpg"
                    alt="Our travel philosophy"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-all duration-500"
                  />
                </div>
              </div>
            </div>

            {/* Core Motivations */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 Poppins">
              <div className="text-center p-8 bg-white border rounded-xl hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-gray-800" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">
                  PASSION FOR TRAVEL
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  We're passionate travelers ourselves. We understand the
                  excitement, the dreams, and the importance of every trip in
                  your life story.
                </p>
              </div>

              <div className="text-center p-8 bg-white border rounded-xl hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-gray-800" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">
                  TRUST & RELIABILITY
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Your trust is our most valuable asset. We provide transparent,
                  honest service with the same care we'd want for our own
                  family's travels.
                </p>
              </div>

              <div className="text-center p-8 bg-white border rounded-xl hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-gray-800" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">
                  PERSONALIZED SERVICE
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  No two travelers are alike. We craft personalized solutions
                  that match your unique preferences, budget, and travel style.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Expertise Section */}
      <div id="expertise" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`transition-all duration-1000 ${
              isExpertiseVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 tracking-wide GeistBold">
                OUR EXPERTISE
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                With over 13 years in the travel industry, we've built strong
                relationships with airlines, hotels, and tourism boards
                worldwide to offer you unmatched service and competitive
                pricing.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <img
                  src="https://images.pexels.com/photos/3935702/pexels-photo-3935702.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Travel expertise and consultation"
                  className="w-full h-96 object-cover rounded-2xl shadow-xl transition-all duration-500"
                />
              </div>
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-gray-100 rounded-lg flex-shrink-0">
                    <Award className="h-6 w-6 text-gray-800" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">
                      INDUSTRY CERTIFICATIONS
                    </h4>
                    <p className="text-gray-600">
                      Licensed travel agency with IATA accreditation and
                      certified travel consultants ensuring professional service
                      standards.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-gray-100 rounded-lg flex-shrink-0">
                    <Globe className="h-6 w-6 text-gray-800" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">
                      GLOBAL NETWORK
                    </h4>
                    <p className="text-gray-600">
                      Strong partnerships with airlines, hotel chains, and local
                      operators in over 100 destinations worldwide for exclusive
                      deals and support.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-gray-100 rounded-lg flex-shrink-0">
                    <Users className="h-6 w-6 text-gray-800" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">
                      EXPERT TEAM
                    </h4>
                    <p className="text-gray-600">
                      Experienced travel consultants with specialized knowledge
                      in different regions, visa requirements, and travel
                      regulations.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-gray-100 rounded-lg flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-gray-800" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">
                      24/7 SUPPORT
                    </h4>
                    <p className="text-gray-600">
                      Round-the-clock customer support for emergencies, flight
                      changes, and travel assistance wherever you are in the
                      world.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div id="stats" className="py-24 bg-black rounded-2xl text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`transition-all duration-1000 ${
              isStatsVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6 tracking-wide GeistBold">
                OUR IMPACT IN NUMBERS
              </h2>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
                These numbers represent more than statistics—they represent
                dreams fulfilled, adventures realized, and memories created.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center p-6">
                <div className="text-5xl font-bold mb-3">50,000+</div>
                <div className="text-lg text-gray-300 mb-2">
                  Happy Travelers
                </div>
                <div className="text-sm text-gray-400">
                  Customers served since 2013
                </div>
              </div>

              <div className="text-center p-6">
                <div className="text-5xl font-bold mb-3">100+</div>
                <div className="text-lg text-gray-300 mb-2">Destinations</div>
                <div className="text-sm text-gray-400">
                  Countries and cities covered
                </div>
              </div>

              <div className="text-center p-6">
                <div className="text-5xl font-bold mb-3">13+</div>
                <div className="text-lg text-gray-300 mb-2">
                  Years Experience
                </div>
                <div className="text-sm text-gray-400">
                  In the travel industry
                </div>
              </div>

              <div className="text-center p-6">
                <div className="text-5xl font-bold mb-3">98%</div>
                <div className="text-lg text-gray-300 mb-2">
                  Satisfaction Rate
                </div>
                <div className="text-sm text-gray-400">
                  Customer satisfaction score
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Process Section */}
      <div id="process" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`transition-all duration-1000 ${
              isProcessVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 tracking-wide GeistBold">
                HOW WE WORK
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Our streamlined process ensures every detail of your journey is
                perfectly planned and executed.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="text-center group">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-gray-800 transition-colors duration-300">
                  <MessageCircle className="h-10 w-10 text-gray-800 group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="bg-gray-800 text-white text-sm font-bold px-3 py-1 rounded-full inline-block mb-4">
                  STEP 1
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">
                  CONSULTATION
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  We listen to your travel dreams, preferences, budget, and
                  requirements to understand your perfect trip.
                </p>
              </div>

              <div className="text-center group">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-gray-800 transition-colors duration-300">
                  <Target className="h-10 w-10 text-gray-800 group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="bg-gray-800 text-white text-sm font-bold px-3 py-1 rounded-full inline-block mb-4">
                  STEP 2
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">
                  PLANNING
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Our experts craft a detailed itinerary with the best options
                  for flights, accommodations, and activities.
                </p>
              </div>

              <div className="text-center group">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-gray-800 transition-colors duration-300">
                  <CheckCircle className="h-10 w-10 text-gray-800 group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="bg-gray-800 text-white text-sm font-bold px-3 py-1 rounded-full inline-block mb-4">
                  STEP 3
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">
                  BOOKING
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  We handle all bookings, confirmations, and documentation while
                  keeping you informed every step of the way.
                </p>
              </div>

              <div className="text-center group">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-gray-800 transition-colors duration-300">
                  <Shield className="h-10 w-10 text-gray-800 group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="bg-gray-800 text-white text-sm font-bold px-3 py-1 rounded-full inline-block mb-4">
                  STEP 4
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">
                  SUPPORT
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Enjoy 24/7 support during your travels with assistance for any
                  changes or unexpected situations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 24/7 Support - We're With You Every Step Section */}
      <Support />
  
      {/* Company Values Section */}
      <div id="values" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`transition-all duration-1000 ${
              isValuesVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 tracking-wide GeistBold">
                OUR VALUES
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                These core principles guide every interaction, every decision,
                and every service we provide.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl border hover:shadow-xl transition-all duration-300 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="h-8 w-8 text-gray-800" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4 GeistBold">
                  INTEGRITY
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Transparent pricing, honest recommendations, and ethical
                  business practices in every transaction.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl border hover:shadow-xl transition-all duration-300 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Star className="h-8 w-8 text-gray-800" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4 GeistBold">
                  EXCELLENCE
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Continuous improvement in service quality and commitment to
                  exceeding customer expectations.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl border hover:shadow-xl transition-all duration-300 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="h-8 w-8 text-gray-800" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4 GeistBold">
                  CARE
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Personal attention to every client with empathy,
                  understanding, and genuine concern for your needs.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl border hover:shadow-xl transition-all duration-300 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="h-8 w-8 text-gray-800" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4 GeistBold">
                  INNOVATION
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Embracing new technologies and methods to make travel planning
                  easier and more efficient.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl border hover:shadow-xl transition-all duration-300 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-gray-800" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4 GeistBold">
                  PARTNERSHIP
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Building long-term relationships with clients based on trust,
                  reliability, and mutual respect.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl border hover:shadow-xl transition-all duration-300 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Globe className="h-8 w-8 text-gray-800" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4 GeistBold">
                  RESPONSIBILITY
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Promoting sustainable tourism and responsible travel practices
                  for a better world.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Office Locations Section */}
      <div id="locations" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`transition-all duration-1000 ${
              isLocationsVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 tracking-wide GeistBold">
                OUR GLOBAL PRESENCE
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
                With offices across multiple continents, we provide local expertise and personalized service wherever you are in the world.
              </p>
              
              {/* Global Network Stats - Location Selector */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center GeistBold">
                  OUR GLOBAL OFFICES
                </h3>
                <p className="text-gray-600 text-center mb-8">
                  Click on any location to view details
                </p>
                {/* Mobile Carousel - Only visible on mobile */}
                <div className="md:hidden">
                  <MobileOfficeCarousel 
                    officeLocations={officeLocations}
                    selectedLocation={selectedLocation}
                    setSelectedLocation={setSelectedLocation}
                  />
                </div>

                {/* Desktop Grid - Hidden on mobile */}
                <div className="hidden md:flex flex-nowrap overflow-x-auto pb-4 px-2">
                  {Object.entries(officeLocations).map(([key, location], index) => (
                    <div 
                      key={key} 
                      className={`text-center p-4 rounded-xl transition-all duration-300 cursor-pointer flex-shrink-0 ${
                        selectedLocation === key 
                          ? 'bg-gray-800 text-white' 
                          : 'bg-white text-gray-800 hover:bg-gray-100 shadow-md'
                      } ${index < Object.keys(officeLocations).length - 1 ? 'mr-6' : ''}`}
                      style={{ minWidth: '160px' }}
                      onClick={() => setSelectedLocation(key)}
                    >
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center mx-auto mb-2 ${
                        selectedLocation === key ? 'bg-white/20' : 'bg-gray-100'
                      }`}>
                        <MapPin className={`h-5 w-5 ${
                          selectedLocation === key ? 'text-white' : 'text-gray-800'
                        }`} />
                      </div>
                      <h4 className="font-semibold text-base">
                        {location.name.split(',')[0]}
                      </h4>
                      <p className={`text-sm mt-1.5 ${
                        selectedLocation === key ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {location.name.split(',')[1]?.trim() || location.name.split('-')[1]?.trim()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Map and Details Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              {/* Google Maps - First on mobile, order changes on desktop */}
              <div className="lg:order-1">
                <div className="bg-gray-100 rounded-2xl overflow-hidden shadow-xl h-96">
                  <iframe
                    src={currentLocation.mapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>

              {/* Office Details - Second on mobile, order changes on desktop */}
              <div className="lg:order-2">
                <div className="bg-white p-6 lg:p-8 rounded-2xl shadow-xl">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-3 bg-gray-800 rounded-lg">
                      <Building className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 GeistBold">
                      {currentLocation.name}
                    </h3>
                  </div>

                  <div className="space-y-6">
                    {/* Company Name */}
                    <div>
                      <h4 className="text-lg font-bold text-gray-800 mb-2">
                        {currentLocation.company}
                      </h4>
                    </div>

                    {/* Address */}
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-gray-200 rounded-lg flex-shrink-0 mt-1">
                        <MapPin className="h-5 w-5 text-gray-700" />
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-800 mb-1">Address:</h5>
                        <p className="text-gray-600 leading-relaxed">
                          {currentLocation.address}
                        </p>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-gray-200 rounded-lg flex-shrink-0 mt-1">
                        <Phone className="h-5 w-5 text-gray-700" />
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-800 mb-1">Phone:</h5>
                        <a 
                          href={`tel:${currentLocation.phone.split(',')[0].trim()}`}
                          className="text-gray-600 hover:text-gray-800 transition-colors duration-300"
                        >
                          {currentLocation.phone}
                        </a>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-gray-200 rounded-lg flex-shrink-0 mt-1">
                        <Mail className="h-5 w-5 text-gray-700" />
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-800 mb-1">Email:</h5>
                        <a 
                          href={`mailto:${currentLocation.email}`}
                          className="text-gray-600 hover:text-gray-800 transition-colors duration-300"
                        >
                          {currentLocation.email}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Contact Actions */}
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button
                        onClick={() => window.open(`tel:${currentLocation.phone.split(',')[0].trim()}`)}
                        className="flex items-center justify-center px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors duration-300 font-semibold cursor-pointer"
                      >
                        <Phone className="h-5 w-5 mr-2" />
                        Call Now
                      </button>
                      <button
                        onClick={() => window.open(`mailto:${currentLocation.email}`)}
                        className="flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors duration-300 font-semibold cursor-pointer"
                      >
                        <Mail className="h-5 w-5 mr-2" />
                        Send Email
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Vision Section - Full Screen */}
      <div
        id="our-vision"
        className="relative w-full min-h-screen bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage:
            "url(https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=1920)",
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div
            className={`max-w-7xl mx-auto text-center transition-all duration-1000 ${
              isVisionVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 tracking-wide GeistBold">
              OUR VISION
            </h2>
            <div className="max-w-4xl mx-auto space-y-6">
              <p className="text-xl lg:text-2xl text-white leading-relaxed font-light">
                To be the most trusted and innovative travel partner for
                individuals and businesses—offering flexible, affordable, and
                tailored travel services across the globe.
              </p>
              <div className="w-24 h-1 bg-white mx-auto my-8"></div>
              <p className="text-lg lg:text-xl text-gray-200 leading-relaxed font-light">
                We envision a world where every journey is seamless, every
                destination is accessible, and every traveler feels confident
                and supported throughout their adventure.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default AboutUs;