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
];

const Brands = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Our Trusted Partners
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We collaborate with the best in the industry to bring you exceptional travel experiences.
          </p>
        </div>
        
        {/* Desktop Grid - Hidden on mobile */}
        <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12 items-center">
          {brands.map((brand) => (
            <div 
              key={brand.id} 
              className="flex items-center justify-center p-10 transition-all duration-300 hover:scale-110 hover:shadow-xl rounded-2xl"
            >
              <Image 
                src={brand.image} 
                alt={brand.name}
                width={280}
                height={160}
                className="object-contain h-36 w-auto"
                style={{ mixBlendMode: 'multiply' }}
                priority
              />
            </div>
          ))}
        </div>

        {/* Mobile Marquee - Only visible on mobile */}
        <div className="sm:hidden overflow-hidden relative">
          <div className="flex space-x-8 py-6 animate-marquee whitespace-nowrap">
            {[...brands, ...brands].map((brand, index) => (
              <div 
                key={`${brand.id}-${index}`} 
                className="inline-flex items-center justify-center px-6 py-4 transition-all duration-300 hover:scale-110"
              >
                <Image 
                  src={brand.image} 
                  alt={brand.name}
                  width={160}
                  height={90}
                  className="object-contain h-20 w-auto"
                  style={{ mixBlendMode: 'multiply' }}
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
          .animate-marquee {
            display: inline-block;
            animation: marquee 20s linear infinite;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}</style>
      </div>
    </section>
  );
};

export default Brands;
