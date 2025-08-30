"use client";
import React, { useState, useEffect, useRef } from "react";
import { Play, ChevronLeft, ChevronRight, X } from "lucide-react";
import Footer from "../reusable/footer";
import Navbar from "../reusable/navbar";
import Image from "next/image";
import { Masonry } from "@/components/mansory";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Currency symbols mapping
const currencySymbols = {
  'USD': '$', 'EUR': '€', 'GBP': '£', 'AED': 'د.إ',
  'SAR': 'ر.س', 'JPY': '¥', 'CAD': 'C$', 'AUD': 'A$',
  'CHF': 'Fr', 'INR': '₹'
};

// Carousel slides data
const heroSlides = [
  {
    id: 1,
    backgroundImage: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
    title: "EXCLUSIVE OFFERS",
    subtitle: "Discover unbeatable deals on dream vacations. Limited-time offers on handpicked destinations worldwide.",
    description: "Take advantage of our exclusive travel deals and special packages. From luxury getaways to budget-friendly adventures, we have the perfect offer for every traveler. Book now and create unforgettable memories."
  },
  {
    id: 2,
    backgroundImage: "/assets/offer.jpg"
  },
  {
    id: 3,
    backgroundImage: "https://images.pexels.com/photos/1591375/pexels-photo-1591375.jpeg?auto=compress&cs=tinysrgb&w=1920",
    title: "EXCLUSIVE OFFERS",
    subtitle: "Discover unbeatable deals on dream vacations. Limited-time offers on handpicked destinations worldwide.",
    description: "Take advantage of our exclusive travel deals and special packages. From luxury getaways to budget-friendly adventures, we have the perfect offer for every traveler. Book now and create unforgettable memories."
  },
  {
    id: 4,
    backgroundImage: "https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&w=1920",
    title: "EXCLUSIVE OFFERS",
    subtitle: "Discover unbeatable deals on dream vacations. Limited-time offers on handpicked destinations worldwide.",
    description: "Take advantage of our exclusive travel deals and special packages. From luxury getaways to budget-friendly adventures, we have the perfect offer for every traveler. Book now and create unforgettable memories."
  }
];

// Location data with all images for each location
const locationData = {
  // Winter locations
  winter: {
    'Norway': {
      title: "Northern Lights Adventure",
      images: [
        "/assets/gallery/winter/norway/1.png",
          "/assets/gallery/winter/norway/11.jpg",
          "/assets/gallery/winter/norway/2.jpg",
          "/assets/gallery/winter/norway/4.jpg",
          "/assets/gallery/winter/norway/5.jpg",
          "/assets/gallery/winter/norway/6.jpg",
      ]
    },
    'Czech Republic': {
      title: "Prague Winter Magic",
      images: [
        "/assets/gallery/winter/republic/1.png",
        "/assets/gallery/winter/republic/2.jpg",
        "/assets/gallery/winter/republic/3.jpg",
        "/assets/gallery/winter/republic/4.jpg",
        "/assets/gallery/winter/republic/5.jpg",
        "/assets/gallery/winter/republic/6.jpg",


      ]
    },
    'Switzerland': {
      title: "Swiss Alps Experience",
      images: [
        "/assets/gallery/winter/swiss/1.jpg",
        "/assets/gallery/winter/swiss/2.jpg",
        "/assets/gallery/winter/swiss/3.jpg",
        "/assets/gallery/winter/swiss/4.jpg",
        "/assets/gallery/winter/swiss/5.jpg",
        "/assets/gallery/winter/swiss/6.jpg",


      ]
    },
    'Finland': {
      title: "Lapland Wonderland",
      images: [
        "/assets/gallery/winter/finland/1.jpg",
        "/assets/gallery/winter/finland/2.jpg",
        "/assets/gallery/winter/finland/3.jpg",
        "/assets/gallery/winter/finland/4.jpg",
        "/assets/gallery/winter/finland/5.jpg",
        "/assets/gallery/winter/finland/6.jpg",


      ]
    },
    'Sweden': {
      title: "Swedish Lapland Escape",
      images: [
        "/assets/gallery/winter/sweden/1.jpg",
        "/assets/gallery/winter/sweden/2.jpg",
        "/assets/gallery/winter/sweden/3.jpg",
        "/assets/gallery/winter/sweden/4.jpg",
        "/assets/gallery/winter/sweden/5.jpg",
        "/assets/gallery/winter/sweden/6.jpg",


      ]
    },
    'France': {
      title: "Alpine Charm in Chamonix",
      images: [
        "/assets/gallery/winter/france/1.jpg",
        "/assets/gallery/winter/france/2.jpg",
        "/assets/gallery/winter/france/3.jpg",
        "/assets/gallery/winter/france/4.jpg",
        "/assets/gallery/winter/france/5.jpg",
        "/assets/gallery/winter/france/6.jpg",


      ]
    },
    'Austria': {
      title: "Vienna Christmas Markets",
      images: [
        "/assets/gallery/winter/austria/1.jpg",
        "/assets/gallery/winter/austria/2.jpg",
        "/assets/gallery/winter/austria/3.jpg",
        "/assets/gallery/winter/austria/4.jpg",
        "/assets/gallery/winter/austria/5.jpg",
        "/assets/gallery/winter/austria/6.jpg",


      ]
    },
    'Canada': {
      title: "Banff Snowy Escape",
      images: [
        "/assets/gallery/winter/canada/1.jpg",
        "/assets/gallery/winter/canada/2.jpg",
        "/assets/gallery/winter/canada/3.jpg",
        "/assets/gallery/winter/canada/4.jpg",
        "/assets/gallery/winter/canada/5.jpg",
        "/assets/gallery/winter/canada/6.png",


      ]
    },
    'Iceland': {
      title: "Ice Cave Adventure",
      images: [
        "/assets/gallery/winter/iceland/1.jpg",
        "/assets/gallery/winter/iceland/2.jpg",
        "/assets/gallery/winter/iceland/3.jpg",
        "/assets/gallery/winter/iceland/4.jpg",
        "/assets/gallery/winter/iceland/5.jpg",
        "/assets/gallery/winter/iceland/6.jpg",


      ]
    },
    'Japan': {
      title: "Snowy Hokkaido Experience",
      images: [
        "/assets/gallery/winter/japan/1.jpg",
        "/assets/gallery/winter/japan/2.jpg",
        "/assets/gallery/winter/japan/3.jpg",
        "/assets/gallery/winter/japan/4.jpg",
        "/assets/gallery/winter/japan/5.jpg",
        "/assets/gallery/winter/japan/6.jpg",


      ]
    }
  },
  // Summer locations
  summer: {
    'Spain': {
      title: "Barcelona Cultural Journey",
      images: [
        "/assets/gallery/summer/spain/1.png",
        "/assets/gallery/summer/spain/2.jpg",
        "/assets/gallery/summer/spain/4.jpg",
        "/assets/gallery/summer/spain/5.jpg",
        "/assets/gallery/summer/spain/6.jpg",
        "/assets/gallery/summer/spain/7.jpg",

      ]
    },
    'Greece': {
      title: "Santorini Sunset Escape",
      images: [
        "/assets/gallery/summer/greece/1.jpg",
        "/assets/gallery/summer/greece/2.jpg",
        "/assets/gallery/summer/greece/3.JPG",
        "/assets/gallery/summer/greece/4.jpg",
        "/assets/gallery/summer/greece/5.jpg",
        "/assets/gallery/summer/greece/6.jpg"
      ]
    },
    'Italy': {
      title: "Amalfi Coast Adventure",
      images: [
        "/assets/gallery/summer/itlay/1.jpg",
         "/assets/gallery/summer/itlay/2.jpg",
         "/assets/gallery/summer/itlay/3.jpg",
         "/assets/gallery/summer/itlay/4.jpg",
         "/assets/gallery/summer/itlay/5.jpg",
         "/assets/gallery/summer/itlay/6.jpg",

      ]
    },
    'Indonesia': {
      title: "Bali Island Paradise",
      images: [
        "/assets/gallery/summer/indonesia/1.jpg",
         "/assets/gallery/summer/indonesia/11.jpg",
          "/assets/gallery/summer/indonesia/2.jpg",
           "/assets/gallery/summer/indonesia/3.jpg",
            "/assets/gallery/summer/indonesia/4.jpg",
            "/assets/gallery/summer/indonesia/5.jpg",
      
      ]
    },
    'Portugal': {
      title: "Lisbon Coastal Charm",
      images: [
        "/assets/gallery/summer/portugal/1.jpg",
        "/assets/gallery/summer/portugal/2.jpg",
        "/assets/gallery/summer/portugal/4.jpg",
        "/assets/gallery/summer/portugal/5.jpg",
        "/assets/gallery/summer/portugal/6.jpg",
        "/assets/gallery/summer/portugal/7.jpg",

      ]
    },
    'Costa Rica': {
      title: "Costa Rican Rainforest Retreat",
      images: [
        "/assets/gallery/summer/consta-rica/1.jpg",
        "/assets/gallery/summer/consta-rica/2.jpg",
        "/assets/gallery/summer/consta-rica/3.jpg",
        "/assets/gallery/summer/consta-rica/4.jpg",
        "/assets/gallery/summer/consta-rica/5.jpg",
        "/assets/gallery/summer/consta-rica/6.jpg"
      ]
    },
    'South Africa': {
      title: "Cape Town Coastal Adventure",
      images: [
        "/assets/gallery/summer/south-africa/1.jpg",
        "/assets/gallery/summer/south-africa/2.jpg",
        "/assets/gallery/summer/south-africa/3.jpg",
        "/assets/gallery/summer/south-africa/4.jpg",
        "/assets/gallery/summer/south-africa/5.jpg",
        "/assets/gallery/summer/south-africa/6.jpg",

      ]
    },
    'New Zealand': {
      title: "New Zealand Scenic Escape",
      images: [
        "/assets/gallery/summer/new-zeland/1.jpg",
        "/assets/gallery/summer/new-zeland/2.jpg",
        "/assets/gallery/summer/new-zeland/3.jpg",
        "/assets/gallery/summer/new-zeland/4.jpg",

      ]
    },
    'Maldives': {
      title: "Maldives Tropical Bliss",
      images: [
        "/assets/gallery/summer/maldives/1.jpg",
        "/assets/gallery/summer/maldives/2.jpg",
        "/assets/gallery/summer/maldives/3.jpg",
        "/assets/gallery/summer/maldives/4.jpg",
        "/assets/gallery/summer/maldives/5.jpg",
        "/assets/gallery/summer/maldives/6.jpg",

      ]
    }
  }
};

// Create gallery data for the main grid view
const createGalleryData = () => {
  const data = [];
  
  // Add winter locations
  Object.entries(locationData.winter).forEach(([location, info]) => {
    // Special handling for Iceland, Canada, Czech Republic, and Finland locations
    if (['Iceland', 'Canada', 'Czech Republic', 'Finland'].includes(location)) {
      data.push({
        id: `winter-${location.toLowerCase().replace(/\s+/g, '-')}`,
        image: info.images[0], // Use first image as main image
        title: info.title,
        location,
        category: "WINTER",
        allImages: info.images.slice(1), // Exclude first image from carousel
        height: 380 + Math.floor(Math.random() * 50),
      });
    } else {
      data.push({
        id: `winter-${location.toLowerCase().replace(/\s+/g, '-')}`,
        image: info.images[0],
        title: info.title,
        location,
        category: "WINTER",
        allImages: info.images,
        height: 380 + Math.floor(Math.random() * 50),
      });
    }
  });
  
  // Add summer locations
  Object.entries(locationData.summer).forEach(([location, info]) => {
    // Special handling for Greece, Spain, and Maldives locations
    if (['Greece', 'Spain', 'Maldives'].includes(location)) {
      data.push({
        id: `summer-${location.toLowerCase().replace(/\s+/g, '-')}`,
        image: info.images[0], // Use first image as main image
        title: info.title,
        location,
        category: "SUMMER VACATION",
        allImages: info.images.slice(1), // Exclude first image from carousel
        height: 380 + Math.floor(Math.random() * 50),
      });
    } else {
      data.push({
        id: `summer-${location.toLowerCase().replace(/\s+/g, '-')}`,
        image: info.images[0], // Use first image as thumbnail
        title: info.title,
        location,
        category: "SUMMER VACATION",
        allImages: info.images,
        height: 380 + Math.floor(Math.random() * 50),
      });
    }
  });
  
  return data;
};

const galleryData = createGalleryData();

const locations = [
  "All",
  "WINTER",
  "SUMMER VACATION",
  "EXCLUSIVE OFFERS",
];

const TravelGallery = () => {
  const [activeLocation, setActiveLocation] = useState("All");
  const [isVisible, setIsVisible] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isOfferDialogOpen, setIsOfferDialogOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    message: ""
  });
  // Removed currency conversion state as we're using static AED prices
  
  // New states for API data
  const [apiOffers, setApiOffers] = useState([]);
  const [isLoadingOffers, setIsLoadingOffers] = useState(false);
  const [apiError, setApiError] = useState(null);

  // Ref for the form panel scroll container
  const formPanelRef = useRef(null);

  // Fetch API offers
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        setIsLoadingOffers(true);
        setApiError(null);
        
        const response = await fetch('https://wwtravels.net/api/offers/all');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success && data.offers) {
          // Transform API data to match our gallery structure
          const transformedOffers = data.offers.map((offer, index) => ({
            id: `exclusive-${offer._id}`,
            image: offer.image,
            title: offer.name,
            location: "Special Deal",
            category: "EXCLUSIVE OFFERS",
            allImages: [offer.image], // API only provides one image per offer
            height: 380 + Math.floor(Math.random() * 50),
            price: offer.price,
            apiData: offer // Store original API data for reference
          }));
          
          setApiOffers(transformedOffers);
        } else {
          throw new Error('Invalid API response format');
        }
      } catch (error) {
        console.error('Error fetching offers:', error);
        setApiError(error.message);
      } finally {
        setIsLoadingOffers(false);
      }
    };

    fetchOffers();
  }, []);

  // Format price in AED
  const formatPrice = (amount) => {
    if (isNaN(amount)) return 'Price not available';
    return `AED ${Math.round(amount).toLocaleString()}`;
  };

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

  useEffect(() => setIsVisible(true), []);

  // Auto-slide carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOfferDialogOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOfferDialogOpen]);

  // Get filtered data based on active location
  const getFilteredData = () => {
    if (activeLocation === "All") {
      return [...galleryData, ...apiOffers];
    } else if (activeLocation === "EXCLUSIVE OFFERS") {
      return apiOffers;
    } else {
      return galleryData.filter((item) => item.category === activeLocation);
    }
  };

  const filteredData = getFilteredData();

  const handleBookNow = () => {
    setShowForm(true);
    // Smooth scroll to form when it slides in
    setTimeout(() => {
      const formElement = document.getElementById('booking-form');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleCarouselImageClick = (imageIndex) => {
    setCurrentImageIndex(imageIndex);
    setShowForm(false); // Hide form when changing images
  };

  const handleSeeOffers = (item) => {
    setSelectedOffer(item);
    setCurrentImageIndex(0); // Reset to first image when opening a new location
    setShowForm(false);
    setIsOfferDialogOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", { ...formData, destination: selectedOffer?.title });
    setFormData({ name: "", email: "", phone: "", date: "", message: "" });
    setIsOfferDialogOpen(false);
    setSelectedOffer(null);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Handle wheel events to prevent scroll bubbling from form panel
  const handleFormPanelScroll = (e) => {
    const target = e.currentTarget;
    const { scrollTop, scrollHeight, clientHeight } = target;
    
    // Prevent scroll bubbling if we're at the bounds and trying to scroll further
    if (
      (scrollTop === 0 && e.deltaY < 0) || 
      (scrollTop + clientHeight >= scrollHeight && e.deltaY > 0)
    ) {
      // Only prevent if we're actually at the scroll bounds
      if (scrollTop <= 0 && e.deltaY < 0) {
        e.preventDefault();
      } else if (scrollTop + clientHeight >= scrollHeight && e.deltaY > 0) {
        e.preventDefault();
      }
    }
    
    // Stop event propagation to prevent it from reaching parent elements
    e.stopPropagation();
  };

  // Handle touch scroll events for mobile
  const handleFormPanelTouch = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="relative w-full bg-white min-h-screen">
      {/* Hero Carousel Section */}
      <div className="relative w-full min-h-screen overflow-hidden">
        {/* Fixed Navbar - positioned absolutely over the carousel */}
        <div className="absolute top-0 left-0 w-full z-30">
          <Navbar />
        </div>

        {/* Carousel Container */}
        <div 
          className="flex transition-transform duration-700 ease-in-out h-screen"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className="relative w-full min-h-screen flex-shrink-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${slide.backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="relative z-20 min-h-screen flex flex-col w-full">
                {/* Main Content */}
                <div className="flex-1 flex items-center justify-center py-8">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center px-4 sm:px-8">
                      {/* Main Heading */}
                      <h1
                        className={`mb-6 uppercase GeistBlack text-4xl md:text-7xl tracking-wider leading-tight text-white transition-all duration-1000 ${
                          isVisible
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-4"
                        }`}
                      >
                        {slide.title}
                      </h1>

                      {/* Subtitle */}
                      <div
                        className={`mb-6 transition-all duration-1200 Poppins delay-300 ${
                          isVisible
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-4"
                        }`}
                      >
                        <h2 className="text-sm PoppinBold md:text-xl max-w-3xl text-gray-200 mb-4 tracking-wide">
                          {slide.subtitle}
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
                        {slide.description}
                      </p>

                      <div className="absolute z-0 top-0 left-0 w-[100vw] h-full bg-gradient-to-b from-white/80 via-transparent to-transparent"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-300 backdrop-blur-sm"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-300 backdrop-blur-sm"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Dot Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Gallery Section */}
      <div className="w-full bg-gradient-to-br from-gray-50 to-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-6 space-y-14">
          {/* Header */}
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold GeistBold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-4">
              Limited Time Travel Deals
            </h2>
            <p className="text-lg text-gray-600 Poppins max-w-2xl mx-auto">
              Explore our exclusive offers and save big on your next adventure
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            {locations.map((loc) => (
              <button
                key={loc}
                onClick={() => setActiveLocation(loc)}
                className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${
                  activeLocation === loc
                    ? "bg-black text-white shadow-md scale-105"
                    : "bg-white text-gray-700 hover:bg-gray-100 border"
                }`}
              >
                {loc}
                {loc === "EXCLUSIVE OFFERS" && isLoadingOffers && (
                  <span className="ml-2 inline-block w-3 h-3 border border-gray-400 border-t-transparent rounded-full animate-spin"></span>
                )}
              </button>
            ))}
          </div>

          {/* API Error Message */}
          {apiError && activeLocation === "EXCLUSIVE OFFERS" && (
            <div className="text-center py-8">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md mx-auto">
                <p className="text-red-600 text-sm">
                  Failed to load exclusive offers: {apiError}
                </p>
                <button 
                  onClick={() => window.location.reload()}
                  className="mt-2 text-red-700 hover:text-red-800 underline text-xs"
                >
                  Try refreshing the page
                </button>
              </div>
            </div>
          )}

          {/* Loading state for exclusive offers */}
          {isLoadingOffers && activeLocation === "EXCLUSIVE OFFERS" && (
            <div className="text-center py-12">
              <div className="inline-block w-8 h-8 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
              <p className="text-gray-600 mt-4">Loading exclusive offers...</p>
            </div>
          )}

          {/* Masonry Grid */}
          {!isLoadingOffers && !apiError && (
            <Masonry>
              {filteredData.map((item, i) => (
                <div
                  key={item.id}
                  className="group bg-white rounded-xl border overflow-hidden transition-all duration-300 flex flex-col h-full"
                >
                  <div className="relative overflow-hidden flex-1">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={500}
                      height={500}
                      className="w-full h-full object-cover transition-all duration-500"
                      loading="lazy"
                    />
                    {/* Price badge removed as per request */}
                  </div>

                  {/* Card Body */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 text-lg mb-1">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">{item.location}</p>
                    {item.category === "EXCLUSIVE OFFERS" && item.price && (
                      <div className="mb-3">
                        <span className="text-lg font-bold text-green-600">
                          {formatPrice(item.price)}
                        </span>
                        <span className="text-xs text-gray-500 block">Starting from</span>
                      </div>
                    )}
                    <Button
                      onClick={() => handleSeeOffers(item)}
                      className="w-full bg-black hover:bg-gray-800 text-white transition-all duration-300 font-medium py-2 cursor-pointer"
                    >
                      See Offers
                    </Button>
                  </div>
                </div>
              ))}
            </Masonry>
          )}

          {/* Info */}
          <div className="text-center text-gray-600">
            Showing {filteredData.length} destinations
            {activeLocation !== "All" && ` in ${activeLocation}`}
          </div>
        </div>
      </div>

      {/* Offers Dialog */}
      <Dialog 
        open={isOfferDialogOpen} 
        onOpenChange={(open) => {
          setIsOfferDialogOpen(open);
          if (!open) setShowForm(false);
        }}
      >
        <DialogContent className="p-0 w-[90vw] sm:w-[80vw] md:w-[70vw] lg:w-[60vw] xl:w-[50vw] h-[80vh] max-h-[700px] overflow-hidden">
          {selectedOffer && (
            <div className="relative h-full flex flex-col">
              {/* Mobile Close Button */}
              <button
                onClick={() => {
                  setIsOfferDialogOpen(false);
                  setShowForm(false);
                }}
                className="absolute top-4 right-4 z-50 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 backdrop-blur-sm sm:block md:hidden"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Full Width Image with Overlay */}
              <div className="relative w-full flex-1 overflow-hidden">
                <div className={`absolute inset-0 transition-all duration-500 ${showForm ? 'md:w-1/2 sm:w-full' : 'w-full'}`}>
                  <Image
                    src={selectedOffer.allImages[currentImageIndex]}
                    alt={`${selectedOffer.title} - ${currentImageIndex + 1}`}
                    fill
                    className="object-cover w-full h-full"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{
                      objectPosition: 'center center',
                      width: '100%',
                      height: '100%',
                    }}
                  />
                </div>
                
                {/* Content Overlay */}
                <div className={`absolute bottom-0 left-0 p-4 md:p-6 text-white transition-all duration-500 ${showForm ? 'md:w-1/2 sm:w-full' : 'w-full'}`}>
                  <h3 className="text-lg sm:text-xl font-semibold">{selectedOffer.title}</h3>
                  <p className="text-gray-200 text-xs">{selectedOffer.location}</p>
                  <div className="mt-1">
                    <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                      {selectedOffer.category === "EXCLUSIVE OFFERS" && selectedOffer.price ? (
                        <>
                          <span className="text-lg sm:text-xl font-bold text-white">
                            {formatPrice(selectedOffer.price)}
                          </span>
                          <span className="bg-green-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                            Special Deal
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="text-gray-300 line-through text-xs">
                            {formatPrice(2999)}
                          </span>
                          <span className="text-lg sm:text-xl font-bold text-white">
                            {formatPrice(1999)}
                          </span>
                          <span className="bg-green-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                            Save 33%
                          </span>
                        </>
                      )}
                    </div>
                    <p className="text-[10px] text-gray-300 mt-1 ml-0.5 mb-2">
                      * Prices can vary based on season and availability.
                    </p>
                  </div>
                  
                  <div className={`${showForm ? 'sm:relative sm:bottom-0 sm:right-0' : 'absolute bottom-4 sm:bottom-8 right-4 sm:right-8'}`}>
                    {!showForm && (
                      <button
                        onClick={handleBookNow}
                        className="bg-white text-black hover:bg-gray-100 font-semibold py-2 sm:py-3 px-6 sm:px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 text-sm sm:text-base cursor-pointer"
                      >
                        <span>Book Now</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Bottom Carousel - Only show for locations with multiple images */}
              {selectedOffer?.allImages?.length > 1 && (
                <div className="w-full h-24 sm:h-36 bg-gray-100 border-t border-gray-200 relative z-10">
                  <div className="h-full w-full flex items-center">
                    <div className="w-full px-2 sm:px-4">
                      <div className="flex justify-between w-full">
                        {selectedOffer?.allImages?.slice(0, 5).map((image, index) => (
                          <div 
                            key={`${selectedOffer.id}-${index}`}
                            className={`relative h-16 w-16 sm:h-28 sm:w-full rounded-lg overflow-hidden border-2 transition-all cursor-pointer flex-shrink-0 mx-1 ${
                              index === currentImageIndex 
                                ? 'border-blue-500 scale-105' 
                                : 'border-transparent hover:border-blue-500'
                            }`}
                            style={{ flex: '1 0 auto', maxWidth: 'calc(20% - 8px)' }}
                            onClick={() => handleCarouselImageClick(index)}
                          >
                            <Image
                              src={image}
                              alt={`${selectedOffer.title} - ${index + 1}`}
                              fill
                              sizes="(max-width: 768px) 64px, 112px"
                              className="object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* Custom scrollbar styling */}
                  <style jsx>{`
                    .overflow-x-auto::-webkit-scrollbar {
                      height: 6px;
                    }
                    .overflow-x-auto::-webkit-scrollbar-track {
                      background: #f1f1f1;
                      border-radius: 3px;
                    }
                    .overflow-x-auto::-webkit-scrollbar-thumb {
                      background: #888;
                      border-radius: 3px;
                    }
                    .overflow-x-auto::-webkit-scrollbar-thumb:hover {
                      background: #555;
                    }
                  `}</style>
                </div>
              )}
              
              {/* Sliding Form Panel */}
              <div 
                id="booking-form"
                className={`absolute top-0 right-0 h-full w-full sm:w-full md:w-1/2 bg-white shadow-xl transition-all duration-500 ease-in-out ${
                  showForm ? 'translate-x-0' : 'translate-x-full'
                }`}
              >
                <div 
                  ref={formPanelRef}
                  className="p-4 sm:p-6 md:p-8 h-full overflow-y-auto pb-20 sm:pb-24 md:pb-28 scroll-smooth"
                  onWheel={handleFormPanelScroll}
                  onTouchMove={handleFormPanelTouch}
                  onTouchStart={handleFormPanelTouch}
                  style={{
                    overscrollBehavior: 'contain',
                    WebkitOverflowScrolling: 'touch'
                  }}
                >
                  <button
                    onClick={() => setShowForm(false)}
                    className="absolute top-3 sm:top-4 left-3 sm:left-4 text-gray-500 hover:text-gray-700 p-1 z-10"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  
                  <div className="text-center mb-6 sm:mb-8 mt-8 sm:mt-4">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Book Your Adventure</h2>
                    <p className="text-gray-500 mt-1 text-sm sm:text-base">Fill in your details to secure your booking</p>
                  </div>
                  
                  <form onSubmit={handleFormSubmit} className="space-y-3 sm:space-y-4">
                    <div className="grid grid-cols-1 gap-3 sm:gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="bg-white h-10 sm:h-11"
                          placeholder="John Doe"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="bg-white h-10 sm:h-11"
                          placeholder="johndoe@example.com"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="bg-white h-10 sm:h-11"
                          placeholder="+1 234 567 8900"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="date" className="text-sm font-medium text-gray-700">Travel Date</Label>
                        <Input
                          id="date"
                          name="date"
                          type="date"
                          value={formData.date}
                          onChange={handleInputChange}
                          required
                          className="bg-white h-10 sm:h-11"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-sm font-medium text-gray-700">Special Requests</Label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm text-sm resize-none"
                        placeholder="Any special requirements or requests..."
                      ></textarea>
                    </div>
                    
                    <div className="pt-3 sm:pt-4">
                      <Button 
                        type="submit" 
                        className="w-full bg-black hover:bg-gray-800 text-white py-2.5 sm:py-3 text-sm sm:text-base font-medium rounded-md shadow-md transform transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                      >
                        Confirm Booking
                      </Button>
                    </div>
                    
                    <p className="text-xs text-gray-500 text-center mt-3 sm:mt-4">
                      Your personal information is safe with us. We'll only use it to process your booking.
                    </p>
                  </form>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default TravelGallery; 