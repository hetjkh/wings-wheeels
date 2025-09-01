"use client"
import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const header = () => {
  return (
    <div className="w-full">
      <section className="w-full max-w-7xl mx-auto px-4 py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-12 min-h-[70vh]">
          {/* Left Content */}
          <div className="flex-1 space-y-6 max-w-2xl">
            <h1 className="text-2xl lg:text-5xl font-bold text-black leading-tight GeistBlack">
              WE PROVIDE SEAMLESS EXPERIENCES
              TAILORED JUST FOR YOU.
            </h1>

            <div className="space-y-3">
              <p className="text-base font-semibold text-black Poppins">
                Your Next Adventure Starts Here
              </p>
              <p className="text-sm text-black leading-relaxed Poppins">
                Ready to explore? We're a team of passionate travelers dedicated
                to making your dream vacation a reality. Whether you're seeking
                a relaxing beach getaway, a thrilling mountain expedition, or an
                immersive cultural tour, we've got you covered.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6">
              <a href="#services"
                className="Poppins bg-transparent text-center border-2 border-black text-black hover:bg-black hover:text-white px-7 py-2 rounded-full text-sm font-medium transition-all duration-300"
              >
                SERVICES
              </a>
              <Button onClick={() => window.open("tel:00971547858338")}
              className="Poppins bg-black text-white hover:bg-gray-800 px-7 py-5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer">
                CONTACT AN EXPERT
              </Button>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex-1 w-full max-w-xl">
            <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="https://res.cloudinary.com/dvrko1y0a/image/upload/v1756620061/het_lhki1n.jpg"
                alt="Travel experience"
                fill
                className="object-cover rounded-lg"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default header;
