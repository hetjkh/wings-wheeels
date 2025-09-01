"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "AED", symbol: "د.إ", name: "UAE Dirham" },
  { code: "SAR", symbol: "ر.س", name: "Saudi Riyal" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar" },
  { code: "CHF", symbol: "Fr", name: "Swiss Franc" },
  { code: "INR", symbol: "₹", name: "Indian Rupee" },
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
    dubaiPhone: "00971 54 785 8338",
    anotherPhone: "00971 52 288 0935",
    email: "reservation@wwtravels.net",
    chatWhatsApp: "Chat on WhatsApp",
    whatsAppSupport: "WhatsApp Support",
    dubaiOffice: "00971 54 785 8338",
    abuDhabiOffice: "00971 52 288 0935",
    currency: "Currency",
    mobileMenu: {
      phone: "00971 54 785 8338",
      email: "reservation@wwtravels.net",
      whatsapp: "WhatsApp Support",
    },
    currencyConverter: "Currency Converter",
    amount: "Amount",
    from: "From",
    to: "To",
    convertedAmount: "Converted Amount",
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
    dubaiPhone: "٩٧١ ٥٤ ٧٨٥ ٨٣٣٨",
    anotherPhone: "٩٧١ ٥٢ ٢٨٨ ٠٩٣٥",
    email: "reservation@wwtravels.net",
    chatWhatsApp: "محادثة واتساب",
    whatsAppSupport: "دعم واتساب",
    dubaiOffice: "٩٧١ ٥٤ ٧٨٥ ٨٣٣٨",
    abuDhabiOffice: "٩٧١ ٥٢ ٢٨٨ ٠٩٣٥",
    currency: "العملة",
    mobileMenu: {
      phone: "٩٧١ ٥٤ ٧٨٥ ٨٣٣٨",
      email: "reservation@wwtravels.net",
      whatsapp: "دعم واتساب",
    },
    emailDisplay: "reservation@wwtravels.net",
    currencyConverter: "محول العملات",
    amount: "المبلغ",
    from: "من",
    to: "إلى",
    convertedAmount: "المبلغ المحول",
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
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [exchangeRates, setExchangeRates] = useState({});
  const [isLoadingRates, setIsLoadingRates] = useState(false);

  // Converter modal state
  const [isConverterOpen, setIsConverterOpen] = useState(false);
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("AED");
  const [converted, setConverted] = useState(0);

  const currentTranslation = translations[language];
  const isRTL = language === "ar";
  const currentCurrency =
    currencies.find((c) => c.code === selectedCurrency) || currencies[0];

  // Fetch exchange rates from ExchangeRate-API with USD as base
  const fetchExchangeRates = async () => {
    setIsLoadingRates(true);
    try {
      // First try to get rates from localStorage if they're still fresh (less than 24 hours old)
      const cachedData = localStorage.getItem("exchangeRates");
      if (cachedData) {
        const { timestamp, rates, base } = JSON.parse(cachedData);
        if (Date.now() - timestamp < 24 * 60 * 60 * 1000 && base === "USD") {
          setExchangeRates(rates);
          return rates;
        }
      }

      // Fetch rates with USD as base
      const response = await fetch("https://open.er-api.com/v6/latest/USD");
      if (!response.ok) throw new Error("Failed to fetch rates");

      const data = await response.json();
      if (data.result !== "success") throw new Error("Failed to fetch rates");

      // Use the rates directly as they are already in USD base
      const usdRates = data.rates;

      // Ensure USD is exactly 1 (should be already, but just in case)
      usdRates.USD = 1;

      setExchangeRates(usdRates);

      // Store rates in localStorage with timestamp
      const cacheData = {
        rates: usdRates,
        timestamp: Date.now(),
        base: "USD", // Mark that these rates are in USD base
      };

      localStorage.setItem("exchangeRates", JSON.stringify(cacheData));
      return usdRates;
    } catch (error) {
      console.error("Error fetching exchange rates:", error);
      // Try to load from localStorage even if expired
      const cachedRates = localStorage.getItem("exchangeRates");
      if (cachedRates) {
        try {
          const { rates } = JSON.parse(cachedRates);
          setExchangeRates(rates);
          return rates;
        } catch (e) {
          console.error("Error parsing cached rates:", e);
        }
      }
      // Fallback rates (approximate)
      const fallbackRates = {
        USD: 0.27,
        EUR: 0.25,
        GBP: 0.21,
        AED: 1,
        SAR: 1.02,
        JPY: 30,
        CAD: 0.34,
        AUD: 0.37,
        CHF: 0.25,
        INR: 22.5,
      };
      setExchangeRates(fallbackRates);
      return fallbackRates;
    } finally {
      setIsLoadingRates(false);
    }
  };

  // Initialize rates when component mounts
  useEffect(() => {
    initLenis();
    // Initialize with USD as base currency
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

  // Converter calculation
  useEffect(() => {
    if (
      exchangeRates[fromCurrency] &&
      exchangeRates[toCurrency] &&
      amount > 0
    ) {
      const rate = exchangeRates[toCurrency] / exchangeRates[fromCurrency];
      setConverted((amount * rate).toFixed(2));
    } else {
      setConverted(0);
    }
  }, [amount, fromCurrency, toCurrency, exchangeRates]);

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
    localStorage.setItem("selectedCurrency", currencyCode);

    // Get the selected currency symbol
    const currencySymbol =
      currencies.find((c) => c.code === currencyCode)?.symbol || "د.إ";

    // Dispatch custom event for other components to listen to currency changes
    window.dispatchEvent(
      new CustomEvent("currencyChanged", {
        detail: {
          currency: currencyCode,
          symbol: currencySymbol,
          rate: exchangeRates[currencyCode] || 1,
        },
      })
    );

    // Refresh rates if they're more than 1 hour old
    const cachedRates = localStorage.getItem("exchangeRates");
    if (cachedRates) {
      const { timestamp } = JSON.parse(cachedRates);
      if (Date.now() - timestamp > 3600000) {
        // 1 hour in ms
        await fetchExchangeRates("AED");
      }
    }
  };

  // Load saved currency preference
  useEffect(() => {
    const savedCurrency = localStorage.getItem("selectedCurrency");
    if (savedCurrency && currencies.find((c) => c.code === savedCurrency)) {
      setSelectedCurrency(savedCurrency);
    }
  }, []);

  // Function to convert price (can be used by other components)
  const convertPrice = (price, fromCurrency, toCurrency) => {
    if (!exchangeRates[fromCurrency] || !exchangeRates[toCurrency]) {
      return price; // Return original price if rates aren't loaded
    }

    // Convert to USD first, then to target currency
    const usdPrice = price / exchangeRates[fromCurrency];
    const convertedPrice = usdPrice * exchangeRates[toCurrency];

    return Math.round(convertedPrice * 100) / 100;
  };

  return (
    <div style={{ zIndex: 50 }}>
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
                window.open("https://wa.me/971547858338", "_blank")
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

          {/* Right Section - Converter Icon and Email */}
          <div className="flex items-center space-x-3">
            {/* Currency Converter Text */}

            {/* Email */}
            <div
              className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() =>
                window.open("mailto:reservation@wwtravels.net", "_blank")
              }
            >
              <Mail className="w-4 h-4 text-red-400" />
              <span className="hidden md:inline Poppins">
                {currentTranslation.email}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Currency Converter Modal */}
      <Dialog open={isConverterOpen} onOpenChange={setIsConverterOpen}>
        <DialogContent
          dir={isRTL ? "rtl" : "ltr"}
          className="sm:max-w-[425px] p-6"
        >
          <DialogHeader className="pb-4 px-1">
            <DialogTitle className="text-xl font-semibold text-gray-800">
              {currentTranslation.currencyConverter}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 px-1">
            <div className="space-y-3">
              <Label htmlFor="amount" className="text-sm font-medium">
                {currentTranslation.amount}
              </Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="0"
                className="w-full text-base py-2 px-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="from" className="text-sm font-medium">
                  {currentTranslation.from}
                </Label>
                <Select value={fromCurrency} onValueChange={setFromCurrency}>
                  <SelectTrigger id="from" className="w-full">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60 overflow-y-auto">
                    {currencies.map((currency) => (
                      <SelectItem
                        key={currency.code}
                        value={currency.code}
                        className="px-4 py-2"
                      >
                        <div className="flex items-center">
                          <span className="font-medium">{currency.code}</span>
                          <span className="text-gray-500 ml-2">
                            {currency.name}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* To Currency */}
              <div className="space-y-2">
                <Label htmlFor="to" className="text-sm font-medium">
                  {currentTranslation.to}
                </Label>
                <Select value={toCurrency} onValueChange={setToCurrency}>
                  <SelectTrigger id="to" className="w-full">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60 overflow-y-auto">
                    {currencies.map((currency) => (
                      <SelectItem
                        key={currency.code}
                        value={currency.code}
                        className="px-4 py-2"
                      >
                        <div className="flex items-center">
                          <span className="font-medium">{currency.code}</span>
                          <span className="text-gray-500 ml-2">
                            {currency.name}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Converted Amount */}
            <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 mt-2">
              <Label className="text-sm font-medium text-gray-600">
                {currentTranslation.convertedAmount}
              </Label>
              <p className="text-2xl font-bold text-blue-600 mt-1">
                {isLoadingRates ? (
                  <span className="text-gray-500">Loading rates...</span>
                ) : (
                  `${converted} ${toCurrency}`
                )}
              </p>
              {!isLoadingRates && converted > 0 && (
                <p className="text-sm text-gray-500 mt-1">
                  1 {fromCurrency} = {(converted / amount).toFixed(6)}{" "}
                  {toCurrency}
                </p>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

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
                  style={{
                    fontFamily: isRTL
                      ? "Arial, sans-serif"
                      : '"Bodoni Bd BT", serif',
                  }}
                >
                  {currentTranslation.companyName}
                </h1>
                <p
                  className="text-black text-xs sm:text-sm md:text-base leading-none mt-[-2px]"
                  style={{
                    fontFamily: isRTL
                      ? "Arial, sans-serif"
                      : '"Bodoni Bd BT", serif',
                  }}
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
                    style={{
                      fontFamily: isRTL
                        ? "Arial, sans-serif"
                        : "Poppins, sans-serif",
                    }}
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
                className="flex items-center space-x-1 text-black hover:bg-black/10 h-8 px-3 cursor-pointer"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {language === "en" ? "عربي" : "EN"}
                </span>
              </Button>
            </div>

            <span
              className=" hidden lg:block text-sm cursor-pointer hover:text-yellow-400 transition-colors Poppins mr-3 border border-black px-5 py-2.5 rounded-full"
              onClick={() => setIsConverterOpen(true)}
            >
              $ Currency
            </span>
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
                        style={{
                          fontFamily: isRTL ? "Arial, sans-serif" : "inherit",
                        }}
                      >
                        {currentTranslation.getInTouch}
                      </Button>
                    </div>

                    {/* Contact Dropdown */}
                    {open && (
                      <div
                        className={`absolute ${
                          isRTL ? "left-0" : "right-0"
                        } mt-2 w-64 bg-white border rounded-lg shadow-lg z-[100]`}
                        onMouseEnter={() => setOpen(true)}
                        onMouseLeave={() => setOpen(false)}
                      >
                        <a
                          href="tel:+971547858338"
                          className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
                          style={{
                            fontFamily: isRTL ? "Arial, sans-serif" : "inherit",
                          }}
                        >
                          <Phone
                            className={`w-4 h-4 text-blue-500 ${
                              isRTL ? "ml-2" : "mr-2"
                            }`}
                          />
                          {currentTranslation.dubaiOffice}
                        </a>
                        <a
                          href="tel:+971522880935"
                          className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
                          style={{
                            fontFamily: isRTL ? "Arial, sans-serif" : "inherit",
                          }}
                        >
                          <Phone
                            className={`w-4 h-4 text-blue-500 ${
                              isRTL ? "ml-2" : "mr-2"
                            }`}
                          />
                          {currentTranslation.abuDhabiOffice}
                        </a>
                        <a
                          href="mailto:reservation@wwtravels.net"
                          className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <Mail
                            className={`w-4 h-4 text-red-500 ${
                              isRTL ? "ml-2" : "mr-2"
                            }`}
                          />
                          {currentTranslation.email}
                        </a>
                        <a
                          href="https://wa.me/971547858338"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
                          style={{
                            fontFamily: isRTL ? "Arial, sans-serif" : "inherit",
                          }}
                        >
                          <MessageCircle
                            className={`w-4 h-4 text-green-500 ${
                              isRTL ? "ml-2" : "mr-2"
                            }`}
                          />
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
                    style={{
                      fontFamily: isRTL ? "Arial, sans-serif" : "inherit",
                    }}
                  >
                    {item.name}
                  </div>
                ))}

                                  <span
                    className="text-black text-base font-medium cursor-pointer transition-all duration-300 hover:text-blue-600 hover:bg-gray-50 px-6 py-3 border-b border-gray-100 last:border-b-0 text-left"
                    onClick={() => setIsConverterOpen(true)}
                  >
                    $ Currency
                  </span>


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
                      {currentTranslation.emailDisplay ||
                        currentTranslation.mobileMenu.email}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MessageCircle className="w-4 h-4 text-green-400" />
                    <span
                      className="text-sm text-gray-700"
                      style={{
                        fontFamily: isRTL ? "Arial, sans-serif" : "inherit",
                      }}
                    >
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
