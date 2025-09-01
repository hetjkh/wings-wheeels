'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function WhatsAppWidget() {
  const [isVisible, setIsVisible] = useState(false);
  const phoneNumber = '971547858338'; // Your WhatsApp number without + or 00
  const message = 'Hello! I would like to inquire about your travel services.';

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  // Add animation effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-10 right-6 z-50">
      <div 
        className={`${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} 
        transition-all duration-300 ease-in-out transform`}
      >
        <div 
          onClick={handleWhatsAppClick}
          className="bg-transparent hover:bg-white/10 w-20 h-20 rounded-full flex items-center justify-center 
          cursor-pointer hover:scale-105 transition-all duration-200 p-3"
          aria-label="Chat on WhatsApp"
          title="Chat with us on WhatsApp"
        >
          <div className="w-14 h-14 relative">
            <Image 
              src="/assets/gallery/winter/social.png" 
              alt="WhatsApp" 
              fill 
              className="object-cover"
              style={{ objectFit: 'contain' }}
            />
          </div>
        </div>
        
        {/* Optional: Add a tooltip */}
        <div className="absolute right-16 bottom-1.5 bg-black text-white text-xs py-1 px-2 rounded whitespace-nowrap 
        opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          Chat with us
        </div>
      </div>
    </div>
  );
}
