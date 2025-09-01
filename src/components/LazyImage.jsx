"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

const LazyImage = ({ src, alt, className, ...props }) => {
  const [isVisible, setIsVisible] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    if (!imgRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={imgRef}
      className="overflow-hidden w-full h-full"
    >
      <Image
        src={src}
        alt={alt}
        className={`transition-opacity duration-700 ease-in-out ${isVisible ? "opacity-100" : "opacity-0"} ${className}`}
        loading="lazy"
        {...props}
      />
    </div>
  );
};

export default LazyImage;
