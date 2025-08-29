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
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12 items-center">
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
      </div>
    </section>
  );
};

export default Brands;
