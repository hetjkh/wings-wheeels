"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Menu, X, Phone, Mail, MessageCircle, Facebook, Twitter, Instagram } from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';

const Navbar = ({ showContactButton = true }) => {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showTopBar, setShowTopBar] = useState(true);

  useEffect(() => {
    setIsVisible(true);
    
    // Hide top bar on mobile scroll
    const handleScroll = () => {
      if (window.innerWidth <= 768) {
        setShowTopBar(window.scrollY < 50);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Main Navigation */}
      <nav className="bg-transparent py-2 md:py-4 z-50 bg-white/95 backdrop-blur-sm md:bg-transparent md:backdrop-blur-none">
        <div className="max-w-6xl mx-auto px-2 sm:px-4">
          <div className="flex items-center justify-center gap-2 md:gap-3">
            {/* Left Section: Logo */}
            <div 
              className={`transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <div className="relative h-32 w-40 sm:h-36 sm:w-44 md:h-40 md:w-48 lg:h-44 lg:w-52 transition-all duration-300 cursor-pointer hover:scale-105 flex-shrink-0">
                <Image
                  onClick={() => router.push('/')}
                  src="/assets/wings.png"
                  alt="Wings wheels logo"
                  fill
                  style={{ objectFit: 'contain' }}
                  priority
                />
              </div>
            </div>

            {/* Center Section: Vertical Separator (Desktop) */}
            <div 
              className={`hidden md:block transition-all duration-1000 delay-150 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <div className="w-px h-28 md:h-32 lg:h-36 bg-black"></div>
            </div>

            {/* Right Section: Company Info (Desktop) */}
            <div 
              className={`hidden md:flex flex-col items-start text-left transition-all duration-1000 delay-300 pl-2 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              {/* Travel Consultant */}
              <div className="text-black text-lg lg:text-xl font-semibold leading-tight mb-2" style={{ fontFamily: '"Bodoni Bd BT", serif' }}>
                Travel Consultant
              </div>
              
              {/* Company Name */}
              <div className="text-black text-xl lg:text-2xl font-bold leading-tight mb-3" style={{ fontFamily: '"Bodoni Bd BT", serif' }}>
                Wings & Wheels Travel and Tourism
              </div>
              
              {/* Contact Info */}
              <div className="flex flex-col space-y-2 text-black text-sm">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <div className="relative w-4 h-4">
                      <Image
                        src="/assets/whatsa.png"
                        alt="WhatsApp"
                        fill
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                    <div className="relative w-4 h-4">
                      <Image
                        src="/assets/phone.png"
                        alt="Phone"
                        fill
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                  </div>
                  <span>-</span>
                  <div className="flex items-center space-x-2">
                    <a href="https://wa.me/971547858338" target="_blank" rel="noopener noreferrer" className="font-medium hover:text-green-600 transition-colors">
                      +971 54 785 8338
                    </a>
                    <span>,</span>
                    <a href="https://wa.me/971522880935" target="_blank" rel="noopener noreferrer" className="font-medium hover:text-green-600 transition-colors">
                      +971 52 288 0935
                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <div className="relative w-4 h-4">
                    <Image
                      src="/assets/gmail.png"
                      alt="Email"
                      fill
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                  <span className="text-black hover:text-blue-600 cursor-pointer transition-colors">
                    reservation@wwtravels.net
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Layout */}
      <div className="md:hidden">
        <div className="max-w-6xl mx-auto px-2 sm:px-4">
          <div className="flex items-center justify-center gap-2">
            {/* Mobile Logo */}
            <div 
              className={`transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <div className="relative h-20 w-28 transition-all duration-300 cursor-pointer hover:scale-105 flex-shrink-0">
                <Image
                  onClick={() => router.push('/')}
                  src="/assets/wings.png"
                  alt="Wings wheels logo"
                  fill
                  style={{ objectFit: 'contain' }}
                  priority
                />
              </div>
            </div>

            {/* Mobile Separator */}
            <div 
              className={`transition-all duration-1000 delay-150 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <div className="w-px h-24 bg-black"></div>
            </div>

            {/* Mobile Company Info */}
            <div 
              className={`flex flex-col items-start text-left transition-all duration-1000 delay-300 pl-1 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <div className="text-black text-sm font-semibold leading-tight mb-1" style={{ fontFamily: '"Bodoni Bd BT", serif' }}>
                Travel Consultant
              </div>
              <div className="text-black text-base font-bold leading-tight mb-1" style={{ fontFamily: '"Bodoni Bd BT", serif' }}>
                Wings & Wheels Travel and Tourism
              </div>
              <div className="flex flex-col space-y-1 text-xs text-black">
                <div className="flex items-center space-x-1">
                  <div className="relative w-3 h-3">
                    <Image
                      src="/assets/whatsa.png"
                      alt="WhatsApp"
                      fill
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                  <div className="relative w-3 h-3">
                    <Image
                      src="/assets/phone.png"
                      alt="Phone"
                      fill
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                  <span>+971 54 785 8338</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="relative w-3 h-3">
                    <Image
                      src="/assets/whatsa.png"
                      alt="WhatsApp"
                      fill
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                  <div className="relative w-3 h-3">
                    <Image
                      src="/assets/phone.png"
                      alt="Phone"
                      fill
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                  <span>+971 52 288 0935</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="relative w-3 h-3 flex-shrink-0">
                    <Image
                      src="/assets/gmail.png"
                      alt="Email"
                      fill
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                  <span className="text-black">
                    reservation@wwtravels.net
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;