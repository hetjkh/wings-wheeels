"use client";
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';

const MobileOfficeCarousel = ({ officeLocations, selectedLocation, setSelectedLocation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const locations = Object.entries(officeLocations);

  const nextSlide = () => {
    const newIndex = currentIndex === locations.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    // Update the selected location
    setSelectedLocation(locations[newIndex][0]);
  };

  const prevSlide = () => {
    const newIndex = currentIndex === 0 ? locations.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    // Update the selected location
    setSelectedLocation(locations[newIndex][0]);
  };

  // Get the current location to display
  const [key, location] = locations[currentIndex];
  const isActive = selectedLocation === key;

  return (
    <div className="relative w-full md:hidden">
      <div className="relative bg-white rounded-xl shadow-md p-4 mx-4">
        <div className="text-center">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${
            isActive ? 'bg-gray-800' : 'bg-gray-100'
          }`}>
            <MapPin className={`h-6 w-6 ${isActive ? 'text-white' : 'text-gray-800'}`} />
          </div>
          <h4 className="font-semibold text-base">
            {location.name.split(',')[0]}
          </h4>
          <p className={`text-sm mt-1 ${isActive ? 'text-gray-600' : 'text-gray-500'}`}>
            {location.name.split(',')[1]?.trim() || location.name.split('-')[1]?.trim()}
          </p>
        </div>
        
        {/* Navigation Arrows */}
        <button 
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-1 rounded-full shadow-md z-10"
          aria-label="Previous location"
        >
          <ChevronLeft size={20} />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-1 rounded-full shadow-md z-10"
          aria-label="Next location"
        >
          <ChevronRight size={20} />
        </button>
        
        {/* Update selected location when clicking on the slide */}
        <button 
          onClick={() => setSelectedLocation(key)}
          className="absolute inset-0 w-full h-full opacity-0"
          aria-label={`Select ${location.name}`}
        />
      </div>
      
      {/* Indicators */}
      <div className="flex justify-center mt-4 space-x-2">
        {locations.map(([locKey], index) => (
          <button
            key={locKey}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? 'bg-gray-800 w-4' : 'bg-gray-300'
            }`}
            aria-label={`Go to location ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default MobileOfficeCarousel;
