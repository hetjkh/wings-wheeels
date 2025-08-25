"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  Phone,
  Mail,
  MessageCircle,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Globe,
} from "lucide-react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import { WhatsappIcon } from "@hugeicons/core-free-icons";
import { initLenis, destroyLenis } from "@/hooks/useLenis";

// Language translations
const translations = {
  en: {
    navItems: [
      { name: "HOME", path: "/" },
      { name: "ABOUT", path: "/aboutus" },
      { name: "OFFERS", path: "/gallery" },
      { name: "CONTACT US", path: "/contact" },
    ],
    companyName: "WINGS & WHEELS",
    companySubtitle: "TRAVEL AND TOURISM",
    getInTouch: "GET IN TOUCH",
    dubaiPhone: "Dubai: 00971 54 785 8338",
    anotherPhone: "00971 52 288 0935",
    email: "reservation@wwtravels.net",
    chatWhatsApp: "Chat on WhatsApp",
    whatsAppSupport: "WhatsApp Support",
    dubaiOffice: "Dubai: +971 4 556 1050",
    abuDhabiOffice: "Abu Dhabi: +971 2 639 4277",
    mobileMenu: {
      phone: "+971 4 556 1050",
      email: "reservation@wwtravels.net",
      whatsapp: "WhatsApp Support"
    }
  },
  ar: {
    navItems: [
      { name: "الرئيسية", path: "/" },
      { name: "من نحن", path: "/aboutus" },
      { name: "العروض", path: "/gallery" },
      { name: "اتصل بنا", path: "/contact" },
    ],
    companyName: "وينغز آند ويلز",
    companySubtitle: "السفر والسياحة",
    getInTouch: "تواصل معنا",
    dubaiPhone: "دبي: ٩٧١ ٥٤ ٧٨٥ ٨٣٣٨",
    anotherPhone: "٩٧١ ٥٢ ٢٨٨ ٠٩٣٥",
    email: "reservation@wwtravels.net",
    chatWhatsApp: "محادثة واتساب",
    whatsAppSupport: "دعم واتساب",
    dubaiOffice: "دبي: ٩٧١ ٤ ٥٥٦ ١٠٥٠",
    abuDhabiOffice: "أبوظبي: ٩٧١ ٢ ٦٣٩ ٤٢٧٧",
    mobileMenu: {
      phone: "٩٧١ ٤ ٥٥٦ ١٠٥٠",
      email: "reservation@wwtravels.net",
      whatsapp: "دعم واتساب"
    },
    emailDisplay: "reservation@wwtravels.net"
  },
};

const Navbar = ({ showContactButton = true }) => {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showTopBar, setShowTopBar] = useState(true);
  const [language, setLanguage] = useState("en");
  const [open, setOpen] = useState(false);

  const currentTranslation = translations[language];
  const isRTL = language === "ar";

  useEffect(() => {
    initLenis();
    return () => {
      destroyLenis();
    };
  }, []);

  useEffect(() => {
    setIsVisible(true);

    // Hide top bar on mobile scroll
    const handleScroll = () => {
      if (window.innerWidth <= 768) {
        setShowTopBar(window.scrollY < 50);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en");
  };

  return (
    <div className="relative z-50" style={{ zIndex: 50 }}>
      {/* Top Contact Bar */}
      <div
        className={`bg-black z-10 text-white py-2 px-4 text-sm transition-transform duration-300 ${
          showTopBar ? "translate-y-0" : "-translate-y-full"
        } md:translate-y-0`}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0 Poppins">
          {/* Left Section - Social Media Icons */}
          <div className="hidden md:flex items-center space-x-3">
            <Facebook
              className="w-4 h-4 cursor-pointer hover:text-blue-400 transition-colors"
              onClick={() =>
                window.open(
                  "https://www.facebook.com/profile.php?id=61579252472959",
                  "_blank"
                )
              }
            />
            <Instagram
              className="w-4 h-4 cursor-pointer hover:text-pink-400 transition-colors"
              onClick={() =>
                window.open(
                  "https://www.instagram.com/wingsandwheels.travel",
                  "_blank"
                )
              }
            />
            <Linkedin
              className="w-4 h-4 cursor-pointer hover:text-blue-400 transition-colors"
              onClick={() =>
                window.open("https://linkedin.com/in/yourprofile", "_blank")
              }
            />
            <HugeiconsIcon
              className="w-4 h-4 cursor-pointer hover:text-green-400 transition-colors"
              icon={WhatsappIcon}
              onClick={() =>
                window.open("https://wa.me/00971547858338", "_blank")
              }
            />
          </div>

          {/* Middle Section - Phone Numbers */}
          <div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-6">
            <div
              className="flex items-center space-x-1 sm:space-x-2"
              onClick={() => window.open("tel:00971547858338", "_blank")}
            >
              <Phone className="w-4 h-4 text-blue-400" />
              <span className="text-xs sm:text-sm Poppins">
                {currentTranslation.dubaiPhone}
              </span>
            </div>
            <div className="hidden sm:block text-gray-400">|</div>
            <div
              className="flex items-center space-x-1 Poppins sm:space-x-2"
              onClick={() => window.open("tel:00971522880935", "_blank")}
            >
              <Phone className="w-4 h-4 text-blue-400" />
              <span className="text-xs sm:text-sm Poppins">
                {currentTranslation.anotherPhone}
              </span>
            </div>
          </div>

          {/* Right Section - Email */}
          <div
            className="hidden md:flex items-center space-x-2"
            onClick={() =>
              window.open("mailto:reservation@wwtravels.net", "_blank")
            }
          >
            <Mail className="w-4 h-4 text-red-400" />
            <span className="Poppins">{currentTranslation.email}</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="py-2 md:py-4 relative z-50 bg-white/95 backdrop-blur-sm md:bg-transparent md:backdrop-blur-none">
        <div className="max-w-7xl mx-auto px-2 sm:px-4">
          <div className="flex items-center justify-between">
            {/* Logo with Text */}
            <div
              className={`flex items-center transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              onClick={() => router.push("/")}
            >
              <div className="relative h-16 w-20 sm:h-20 sm:w-24 md:h-24 md:w-28 lg:h-28 lg:w-32 transition-all duration-300 cursor-pointer hover:scale-105 flex-shrink-0">
                <Image
                  src="/assets/wings.png"
                  alt="Wings wheels logo"
                  fill
                  style={{ objectFit: "contain" }}
                  priority
                />
              </div>
              <div className="flex flex-col ml-2">
                <h1
                  className="text-black text-sm sm:text-lg md:text-xl lg:text-2xl font-bold tracking-wide leading-none whitespace-nowrap"
                  style={{ fontFamily: isRTL ? 'Arial, sans-serif' : '"Bodoni Bd BT", serif' }}
                >
                  {currentTranslation.companyName}
                </h1>
                <p
                  className="text-black text-xs sm:text-sm md:text-base leading-none mt-[-2px]"
                  style={{ fontFamily: isRTL ? 'Arial, sans-serif' : '"Bodoni Bd BT", serif' }}
                >
                  {currentTranslation.companySubtitle}
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex flex-1 justify-center mx-8">
              <div
                className={`hidden lg:flex items-center space-x-8 transition-all duration-500 ease-in-out ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                {currentTranslation.navItems.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => router.push(item.path)}
                    className="relative text-black text-base font-medium cursor-pointer transition-all duration-300 hover:text-blue-600 hover:-translate-y-0.5 group Poppins"
                    style={{ fontFamily: isRTL ? 'Arial, sans-serif' : 'Poppins, sans-serif' }}
                  >
                    {item.name}
                  </div>
                ))}
              </div>
            </div>

            {/* Language Toggle Button */}
            <div className="hidden lg:flex items-center mr-4">
              <Button
                onClick={toggleLanguage}
                variant="ghost"
                size="sm"
                className="flex items-center space-x-1 text-black hover:bg-black/10 h-8 px-3"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {language === "en" ? "عربي" : "EN"}
                </span>
              </Button>
            </div>

            {/* Contact Button with Dropdown - Desktop */}  
            {showContactButton && (
              <>
                <div
                  className={`hidden lg:flex items-center transition-all duration-1400 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                >
                  <div className="relative inline-block text-left">
                    {/* Contact Button */}
                    <div
                      className="inline-block"
                      onMouseEnter={() => setOpen(true)}
                    >
                      <Button 
                        className="rounded-full bg-transparent border border-black hover:bg-black hover:text-white h-10 px-6 text-black text-sm font-medium transition-all duration-300 hover:scale-105"
                        style={{ fontFamily: isRTL ? 'Arial, sans-serif' : 'inherit' }}
                      >
                        {currentTranslation.getInTouch}
                      </Button>
                    </div>

                    {/* Contact Dropdown */}
                    {open && (
                      <div 
                        className={`absolute ${isRTL ? 'left-0' : 'right-0'} mt-2 w-64 bg-white border rounded-lg shadow-lg z-[100]`}
                        onMouseEnter={() => setOpen(true)}
                        onMouseLeave={() => setOpen(false)}
                      >
                        <a
                          href="tel:+97145561050"
                          className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
                          style={{ fontFamily: isRTL ? 'Arial, sans-serif' : 'inherit' }}
                        >
                          <Phone className={`w-4 h-4 text-blue-500 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                          {currentTranslation.dubaiOffice}
                        </a>
                        <a
                          href="tel:+97126394277"
                          className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
                          style={{ fontFamily: isRTL ? 'Arial, sans-serif' : 'inherit' }}
                        >
                          <Phone className={`w-4 h-4 text-blue-500 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                          {currentTranslation.abuDhabiOffice}
                        </a>
                        <a
                          href="mailto:reservation@wwtravels.net"
                          className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <Mail className={`w-4 h-4 text-red-500 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                          {currentTranslation.email}
                        </a>
                        <a
                          href="https://wa.me/971547858338"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
                          style={{ fontFamily: isRTL ? 'Arial, sans-serif' : 'inherit' }}
                        >
                          <MessageCircle className={`w-4 h-4 text-green-500 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                          {currentTranslation.chatWhatsApp}
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Mobile Contact Button - Links directly to contact page */}
                <div className="lg:hidden">
                  <Button
                    onClick={() => router.push("/contact")}
                    className="rounded-full bg-black text-white hover:bg-gray-800 h-8 px-4 text-xs font-medium transition-all duration-300"
                    style={{ fontFamily: isRTL ? 'Arial, sans-serif' : 'inherit' }}
                  >
                    {currentTranslation.getInTouch}
                  </Button>
                </div>
              </>
            )}

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <Button
                onClick={toggleMobileMenu}
                variant="ghost"
                size="icon"
                className="text-black hover:bg-black/10 h-8 w-8"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t z-50">
              <div className="flex flex-col py-4">
                {currentTranslation.navItems.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      router.push(item.path);
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-black text-base font-medium cursor-pointer transition-all duration-300 hover:text-blue-600 hover:bg-gray-50 px-6 py-3 border-b border-gray-100 last:border-b-0 text-left"
                    style={{ fontFamily: isRTL ? 'Arial, sans-serif' : 'inherit' }}
                  >
                    {item.name}
                  </div>
                ))}

                {/* Mobile Language Toggle in Menu */}
                <div className="px-6 py-3 border-b border-gray-100">
                  <Button
                    onClick={toggleLanguage}
                    variant="ghost"
                    className="flex items-center space-x-2 w-full justify-start h-auto p-0 text-black"
                  >
                    <Globe className="w-4 h-4" />
                    <span className="text-base font-medium">
                      {language === "en" ? "عربي" : "English"}
                    </span>
                  </Button>
                </div>

                {/* Mobile Contact Info */}
                <div className="px-6 py-4 bg-gray-50 space-y-3">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-blue-400" />
                    <span className="text-sm text-gray-700" dir="ltr">
                      {currentTranslation.mobileMenu.phone}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-red-400" />
                    <span className="text-sm text-gray-700" dir="ltr">
                      {currentTranslation.emailDisplay || currentTranslation.mobileMenu.email}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MessageCircle className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-gray-700" style={{ fontFamily: isRTL ? 'Arial, sans-serif' : 'inherit' }}>
                      {currentTranslation.whatsAppSupport}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;