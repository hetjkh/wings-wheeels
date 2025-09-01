"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Clock, Star, Calendar, Users } from "lucide-react";

// Currency symbols mapping
const currencySymbols = {
  'USD': '$', 'EUR': '€', 'GBP': '£', 'AED': 'د.إ',
  'SAR': 'ر.س', 'JPY': '¥', 'CAD': 'C$', 'AUD': 'A$',
  'CHF': 'Fr', 'INR': '₹'
};

const destinations = [
  {
    id: 1,
    name: "Dubai",
    country: "United Arab Emirates",
    description:
      "A dazzling metropolis where modern luxury meets traditional Arabian culture",
    image:
      "https://images.pexels.com/photos/2044434/pexels-photo-2044434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    timeZone: "GST (UTC+4)",
    duration: "3-7 days",
    bestTime: "Oct - Mar",
    experienceLevel: "All Travelers",
    highlights: [
      "Burj Khalifa",
      "Dubai Mall",
      "Desert Safari",
      "Palm Jumeirah",
    ],
  },
  {
    id: 2,
    name: "Paris",
    country: "France",
    description:
      "The City of Light beckons with romance, art, and timeless elegance",
    image:
      "https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    timeZone: "CET (UTC+1/+2 DST)",
    duration: "4-8 days",
    bestTime: "Apr - Jun, Sep - Nov",
    experienceLevel: "Romantic Getaway",
    highlights: [
      "Eiffel Tower",
      "Louvre Museum",
      "Seine River",
      "Champs-Élysées",
    ],
  },
  {
    id: 3,
    name: "Maldives",
    country: "Indian Ocean",
    description:
      "Paradise islands with crystal-clear waters and pristine beaches",
    image:
      "https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    timeZone: "MVT (UTC+5)",
    duration: "5-10 days",
    bestTime: "Nov - Apr",
    experienceLevel: "Luxury Seekers",
    highlights: [
      "Overwater Villas",
      "Coral Reefs",
      "Water Sports",
      "Spa Treatments",
    ],
  },
  {
    id: 4,
    name: "Tokyo",
    country: "Japan",
    description:
      "Where ancient traditions seamlessly blend with cutting-edge technology",
    image:
      "https://images.pexels.com/photos/2614818/pexels-photo-2614818.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    timeZone: "JST (UTC+9)",
    duration: "5-9 days",
    bestTime: "Mar - May, Sep - Nov",
    experienceLevel: "Adventure & Culture",
    highlights: [
      "Tokyo Tower",
      "Shibuya Crossing",
      "Mount Fuji",
      "Traditional Temples",
    ],
  },
  {
    id: 5,
    name: "London",
    country: "United Kingdom",
    description:
      "Historic charm meets modern sophistication in this iconic capital",
    image:
      "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    timeZone: "GMT/BST (UTC+0/+1 DST)",
    duration: "4-7 days",
    bestTime: "Jun - Aug",
    experienceLevel: "First-time Visitors",
    highlights: ["Big Ben", "London Eye", "British Museum", "Tower Bridge"],
  },
  {
    id: 6,
    name: "Bali",
    country: "Indonesia",
    description:
      "Tropical paradise with stunning beaches, temples, and rich culture",
    image:
      "https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    timeZone: "WITA (UTC+8)",
    duration: "5-8 days",
    bestTime: "Apr - Oct",
    experienceLevel: "Wellness & Nature",
    highlights: [
      "Rice Terraces",
      "Ancient Temples",
      "Beach Clubs",
      "Volcano Tours",
    ],
  },
];

const popular = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [currentCurrency, setCurrentCurrency] = useState('AED');
  const [exchangeRates, setExchangeRates] = useState({});
  const [isLoadingRates, setIsLoadingRates] = useState(true);

  // Extract numeric price from price string
  const extractNumericPrice = (priceStr) => {
    if (!priceStr) return 0;
    const match = priceStr.match(/\d+([.,]\d+)?/);
    return match ? parseFloat(match[0].replace(',', '')) : 0;
  };

  // Format price with currency symbol
  const formatPrice = (amount, currency) => {
    if (isNaN(amount)) return 'Price not available';
    
    // Format number with commas and add AED prefix
    return `AED ${Math.round(amount).toLocaleString()}`;
  };

  // Convert price to selected currency
  const convertPrice = (priceStr) => {
    if (!priceStr) return 'Price not available';
    
    const amount = extractNumericPrice(priceStr);
    if (amount === 0) return priceStr;
    
    const rate = exchangeRates[currentCurrency];
    if (!rate) return 'Loading rates...';
    
    // If price is already in AED (our base currency)
    if (priceStr.includes('AED')) {
      const convertedAmount = amount * rate;
      return `From ${formatPrice(convertedAmount, currentCurrency)}`;
    }
    
    // If price is in another currency, we'd need to know the source currency
    // For now, we'll assume all prices are in AED unless specified otherwise
    return `From ${formatPrice(amount * rate, currentCurrency)}`;
  };

  // Fetch exchange rates with caching
  useEffect(() => {
    const fetchRates = async () => {
      try {
        setIsLoadingRates(true);
        
        // First try to get rates from localStorage if they're still fresh (less than 24 hours old)
        const cachedData = localStorage.getItem('exchangeRates');
        if (cachedData) {
          const { timestamp, rates } = JSON.parse(cachedData);
          if (Date.now() - timestamp < 24 * 60 * 60 * 1000) { // 24 hours in ms
            setExchangeRates(rates);
            setIsLoadingRates(false);
            return;
          }
        }

        // If no fresh cache or cache is expired, fetch new rates
        const response = await fetch('https://open.er-api.com/v6/latest/AED');
        if (!response.ok) throw new Error('Failed to fetch rates');
        
        const data = await response.json();
        if (data.result !== 'success') throw new Error('Failed to fetch rates');
        
        setExchangeRates(data.rates);
        
        // Store rates in localStorage with timestamp
        localStorage.setItem('exchangeRates', JSON.stringify({
          rates: data.rates,
          timestamp: Date.now(),
          base: 'AED'
        }));
        
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
        
        // Try to load from localStorage even if expired
        const cachedRates = localStorage.getItem('exchangeRates');
        if (cachedRates) {
          try {
            const { rates } = JSON.parse(cachedRates);
            setExchangeRates(rates);
          } catch (e) {
            console.error('Error parsing cached rates:', e);
          }
        } else {
          // Fallback rates (approximate)
          setExchangeRates({
            USD: 0.27, EUR: 0.25, GBP: 0.21, AED: 1,
            SAR: 1.02, JPY: 30, CAD: 0.34, AUD: 0.37,
            CHF: 0.25, INR: 22.5
          });
        }
      } finally {
        setIsLoadingRates(false);
      }
    };

    fetchRates();
  }, []);

  // Listen for currency changes from navbar and localStorage
  useEffect(() => {
    // Load saved currency from localStorage on initial load
    const savedCurrency = localStorage.getItem('selectedCurrency');
    if (savedCurrency) {
      setCurrentCurrency(savedCurrency);
    }

    const handleCurrencyChange = (event) => {
      const newCurrency = event.detail.currency;
      setCurrentCurrency(newCurrency);
      // Force re-render by updating the state
      setExchangeRates(prev => ({ ...prev }));
    };

    window.addEventListener('currencyChanged', handleCurrencyChange);
    return () => {
      window.removeEventListener('currencyChanged', handleCurrencyChange);
    };
  }, []);

  // Auto-rotate destinations
  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % destinations.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentDestination = destinations[currentIndex];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-10 lg:mb-12">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4 GeistBold">
            EXPLORE THE WORLD
          </h2>
          <p className="text-sm lg:text-base text-gray-700 max-w-2xl leading-relaxed Poppins">
            Discover breathtaking destinations with our curated travel
            experiences
          </p>
        </div>

        {/* Featured Destination */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div
            className={`space-y-6 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-black">
                <MapPin className="h-5 w-5" />
                <span className="text-sm font-semibold uppercase tracking-wide">
                  {currentDestination.country}
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold PoppinBold text-black">
                {currentDestination.name}
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                {currentDestination.description}
              </p>
            </div>

            {/* Destination Details */}
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Clock className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Duration</div>
                  <div className="font-semibold text-gray-900">
                    {currentDestination.duration}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Calendar className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Best Time to Visit</div>
                  <div className="font-semibold text-gray-900">
                    {currentDestination.bestTime}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Perfect For</div>
                  <div className="font-semibold text-gray-900">
                    {currentDestination.experienceLevel}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Time Zone</div>
                  <div className="font-semibold text-gray-900">
                    {currentDestination.timeZone}
                  </div>
                </div>
              </div>
            </div>

            {/* Highlights */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">
                Top Attractions
              </h4>
              <div className="flex flex-wrap gap-2">
                {currentDestination.highlights.map((highlight, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            </div>

            {/* <Button className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-full font-semibold transition-colors duration-200">
              EXPLORE {currentDestination.name.toUpperCase()}
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button> */}
          </div>

          {/* Image */}
          <div
            className={`relative transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-8"
            }`}
          >
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={currentDestination.image}
                alt={currentDestination.name}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <div className="text-2xl font-bold">
                  {currentDestination.name}
                </div>
                <div className="text-lg opacity-90">
                  {currentDestination.country}
                </div>
                <div className="mt-2 text-sm font-medium">
                  {currentDestination.timeZone}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Destination Thumbnails */}
        <div className="flex justify-center gap-4 overflow-x-auto pb-4">
          {destinations.map((destination, index) => (
            <div
              key={destination.id}
              onClick={() => setCurrentIndex(index)}
              className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${
                index === currentIndex
                  ? "scale-110"
                  : "opacity-70 hover:opacity-100 hover:scale-105"
              }`}
            >
              <img
                src={destination.image}
                alt={destination.name}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default popular;