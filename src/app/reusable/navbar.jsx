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
  DollarSign,
} from "lucide-react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import { WhatsappIcon } from "@hugeicons/core-free-icons";
import { initLenis, destroyLenis } from "@/hooks/useLenis";

// Currency data with symbols and names
const currencies = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham' },
  { code: 'SAR', symbol: 'ر.س', name: 'Saudi Riyal' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'CHF', symbol: 'Fr', name: 'Swiss Franc' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
];

// Language translations (updated with currency text)
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
    abuDhabiOffice: "Dubai: +971 2 639 4277",
    currency: "Currency",
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
    dubaiPhone: "دبي: ٩٧١ ٥٤ ٧٨م ٨٣٣٨",
    anotherPhone: "٩٧١ ٥٢ ٢٨٨ ٠٩٣٥",
    email: "reservation@wwtravels.net",
    chatWhatsApp: "محادثة واتساب",
    whatsAppSupport: "دعم واتساب",
    dubaiOffice: "دبي: ٩٧١ ٤ ٥٥٦ ١٠٥٠",
    abuDhabiOffice: "أبوظبي: ٩٧١ ٢ ٦٣٩ ٤٢٧٧",
    currency: "العملة",
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
  
  // Currency state
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [exchangeRates, setExchangeRates] = useState({});
  const [isLoadingRates, setIsLoadingRates] = useState(false);

  const currentTranslation = translations[language];
  const isRTL = language === "ar";
  const currentCurrency = currencies.find(c => c.code === selectedCurrency) || currencies[0];

  // Fetch exchange rates from ExchangeRate-API
  const fetchExchangeRates = async (baseCurrency = 'AED') => {
    setIsLoadingRates(true);
    try {
      // First try to get rates from localStorage if they're still fresh (less than 24 hours old)
      const cachedData = localStorage.getItem('exchangeRates');
      if (cachedData) {
        const { timestamp, rates } = JSON.parse(cachedData);
        if (Date.now() - timestamp < 24 * 60 * 60 * 1000) { // 24 hours in ms
          setExchangeRates(rates);
          return;
        }
      }

      // If no fresh cache or cache is expired, fetch new rates
      const response = await fetch(`https://open.er-api.com/v6/latest/${baseCurrency}`);
      if (!response.ok) throw new Error('Failed to fetch rates');
      
      const data = await response.json();
      if (data.result !== 'success') throw new Error('Failed to fetch rates');
      
      setExchangeRates(data.rates);
      
      // Store rates in localStorage with timestamp
      localStorage.setItem('exchangeRates', JSON.stringify({
        rates: data.rates,
        timestamp: Date.now(),
        base: baseCurrency
      }));
      
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
      // Try to load from localStorage even if expired
      const cachedRates = localStorage.getItem('exchangeRates');
      if (cachedRates) {
        try {
          const { rates } = JSON.parse(cachedRates);
          setExchangeRates(rates);
          return;
        } catch (e) {
          console.error('Error parsing cached rates:', e);
        }
      }
      // Fallback rates (approximate)
      setExchangeRates({
        USD: 0.27, EUR: 0.25, GBP: 0.21, AED: 1,
        SAR: 1.02, JPY: 30, CAD: 0.34, AUD: 0.37,
        CHF: 0.25, INR: 22.5
      });
    } finally {
      setIsLoadingRates(false);
    }
  };

  useEffect(() => {
    initLenis();
    fetchExchangeRates();
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

  const handleCurrencyChange = async (currencyCode) => {
    setSelectedCurrency(currencyCode);
    setCurrencyDropdownOpen(false);
    
    // Store in localStorage for persistence
    localStorage.setItem('selectedCurrency', currencyCode);
    
    // Get the selected currency symbol
    const currencySymbol = currencies.find(c => c.code === currencyCode)?.symbol || 'د.إ';
    
    // Dispatch custom event for other components to listen to currency changes
    window.dispatchEvent(new CustomEvent('currencyChanged', { 
      detail: { 
        currency: currencyCode,
        symbol: currencySymbol,
        rate: exchangeRates[currencyCode] || 1
      } 
    }));
    
    // Refresh rates if they're more than 1 hour old
    const cachedRates = localStorage.getItem('exchangeRates');
    if (cachedRates) {
      const { timestamp } = JSON.parse(cachedRates);
      if (Date.now() - timestamp > 3600000) { // 1 hour in ms
        await fetchExchangeRates('AED');
      }
    }
  };

  // Load saved currency preference
  useEffect(() => {
    const savedCurrency = localStorage.getItem('selectedCurrency');
    if (savedCurrency && currencies.find(c => c.code === savedCurrency)) {
      setSelectedCurrency(savedCurrency);
    }
  }, []);

  // Function to convert price (can be used by other components)
  const convertPrice = (basePrice, fromCurrency = 'USD', toCurrency = selectedCurrency) => {
    if (!exchangeRates[fromCurrency] || !exchangeRates[toCurrency]) {
      return basePrice;
    }
    
    const usdPrice = basePrice / exchangeRates[fromCurrency];
    const convertedPrice = usdPrice * exchangeRates[toCurrency];
    
    return Math.round(convertedPrice * 100) / 100;
  };

  return (
    <div style={{zIndex:50}}>
      {/* Top Contact Bar */}
      <div
        className={`bg-black z-30 text-white py-2 px-4 text-sm transition-transform duration-300 ${
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
              className="flex items-center space-x-1 sm:space-x-2 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => window.open("tel:00971547858338", "_blank")}
            >
              <Phone className="w-4 h-4 text-blue-400" />
              <span className="text-xs sm:text-sm Poppins">
                {currentTranslation.dubaiPhone}
              </span>
            </div>
            <div className="hidden sm:block text-gray-400">|</div>
            <div
              className="flex items-center space-x-1 Poppins sm:space-x-2 cursor-pointer hover:opacity-80 transition-opacity"
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
            className="hidden md:flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity"
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

            {/* Currency Changer - Desktop */}
            <div className="hidden lg:flex items-center mr-4 cursor-pointer">
              <div className="relative">
                <Button
                  onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-1 text-black hover:bg-black/10 h-8 px-3 cursor-pointer"
                >
                  <DollarSign className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    {currentCurrency.code}
                  </span>
                  <ChevronDown className={`w-3 h-3 transition-transform ${currencyDropdownOpen ? 'rotate-180' : ''}`} />
                </Button>

                {/* Currency Dropdown */}
                {currencyDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-[100] max-h-64 overflow-y-auto">
                    {currencies.map((currency) => (
                      <div
                        key={currency.code}
                        onClick={() => handleCurrencyChange(currency.code)}
                        className={`flex items-center justify-between px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                          selectedCurrency === currency.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                        }`}
                      >
                        <div className="flex items-center">
                          <span className="font-medium mr-2">{currency.symbol}</span>
                          <span>{currency.code}</span>
                        </div>
                        <span className="text-xs text-gray-500">{currency.name}</span>
                      </div>
                    ))}
                    {isLoadingRates && (
                      <div className="px-4 py-2 text-xs text-gray-500 text-center">
                        Updating rates...
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Language Toggle Button */}
            <div className="hidden lg:flex items-center mr-4">
              <Button
                onClick={toggleLanguage}
                variant="ghost"
                size="sm"
                className="flex items-center space-x-1 text-black hover:bg-black/10 h-8 px-3 cursor-pointer"
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
                        className="rounded-full bg-transparent border border-black hover:bg-black hover:text-white h-10 px-6 text-black text-sm font-medium transition-all duration-300 hover:scale-105 cursor-pointer"
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

                {/* Mobile Currency Changer */}
                <div className="px-6 py-3 border-b border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700" style={{ fontFamily: isRTL ? 'Arial, sans-serif' : 'inherit' }}>
                      {currentTranslation.currency}
                    </span>
                    <Button
                      onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                      variant="ghost"
                      size="sm"
                      className="h-6 px-2"
                    >
                      <span className="text-sm">{currentCurrency.code}</span>
                      <ChevronDown className={`w-3 h-3 ml-1 transition-transform ${currencyDropdownOpen ? 'rotate-180' : ''}`} />
                    </Button>
                  </div>
                  
                  {currencyDropdownOpen && (
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {currencies.map((currency) => (
                        <div
                          key={currency.code}
                          onClick={() => handleCurrencyChange(currency.code)}
                          className={`flex items-center p-2 rounded cursor-pointer text-sm ${
                            selectedCurrency === currency.code ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
                          }`}
                        >
                          <span className="font-medium mr-1">{currency.symbol}</span>
                          <span>{currency.code}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

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