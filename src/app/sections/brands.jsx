"use client";
import React from "react";
import Image from "next/image";

const brands = [
  { id: 1, name: "Brand 1", image: "/assets/gallery/brands/brand-1.png" },
  { id: 2, name: "Brand 2", image: "/assets/gallery/brands/brand-2.png" },
  { id: 3, name: "Brand 3", image: "/assets/gallery/brands/brand-3.png" },
  { id: 4, name: "Brand 4", image: "/assets/gallery/brands/brand-4.png" },
  { id: 5, name: "Brand 5", image: "/assets/gallery/brands/brand-5.png" },
  { id: 6, name: "Brand 6", image: "/assets/gallery/brands/brand-6.png" },
  { id: 7, name: "Brand 7", image: "/assets/gallery/brands/brand-7.png" },
  { id: 8, name: "Brand 8", image: "/assets/gallery/brands/brand-8.png" },
  { id: 9, name: "Brand 9", image: "/assets/gallery/brands/brand-9.png" },
  { id: 10, name: "Brand 10", image: "/assets/gallery/brands/brand-10.png" },
];

const Brands = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Our Clientele
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We collaborate with the best in the industry to bring you exceptional travel experiences.
          </p>
        </div>
        
        {/* Desktop Marquee - Only visible on desktop */}
        <div className="hidden sm:block overflow-hidden relative py-8">
          <div className="flex space-x-12 py-6 animate-marquee-slow whitespace-nowrap">
            {[...brands, ...brands].map((brand, index) => (
              <div 
                key={`desktop-${brand.id}-${index}`}
                className="inline-flex items-center justify-center px-10 py-8 transition-all duration-300 hover:scale-105"
              >
                <Image 
                  src={brand.image} 
                  alt={brand.name}
                  width={brand.id === 10 ? 350 : 250}
                  height={brand.id === 10 ? 175 : 125}
                  className={`object-contain w-auto ${brand.id === 10 ? 'h-36 max-w-[350px]' : 'h-28 max-w-[250px]'}`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Marquee - Only visible on mobile */}
        <div className="sm:hidden overflow-hidden relative">
          <div className="flex space-x-8 py-6 animate-marquee whitespace-nowrap">
            {[...brands, ...brands].map((brand, index) => (
              <div 
                key={`mobile-${brand.id}-${index}`} 
                className="inline-flex items-center justify-center px-8 py-6 transition-all duration-300 hover:scale-110"
              >
                <Image 
                  src={brand.image} 
                  alt={brand.name}
                  width={brand.id === 10 ? 280 : 180}
                  height={brand.id === 10 ? 150 : 100}
                  className={`object-contain w-auto ${brand.id === 10 ? 'h-32' : 'h-24'}`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Marquee Animation */}
        <style jsx global>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes marquee-slow {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            display: inline-block;
            animation: marquee 30s linear infinite;
          }
          .animate-marquee-slow {
            display: inline-block;
            animation: marquee-slow 40s linear infinite;
          }
          .animate-marquee:hover, .animate-marquee-slow:hover {
            animation-play-state: paused;
          }
        `}</style>
      </div>
    </section>
  );
};

export default Brands;
