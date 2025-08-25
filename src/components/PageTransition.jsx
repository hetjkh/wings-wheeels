'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function PageTransition({ children }) {
  const [isAnimating, setIsAnimating] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Show animation when route changes
    const handleRouteChange = () => {
      setIsAnimating(true);
      // Reset animation after it completes (adjust timing to match your GIF)
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 2000); // Adjust this duration based on your GIF length
      
      return () => clearTimeout(timer);
    };

    handleRouteChange();
  }, [pathname]);

  return (
    <div className="relative min-h-screen">
      {/* Page content */}
      <div className={`transition-opacity duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
        {children}
      </div>

      {/* Transition overlay */}
      {isAnimating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
          <div className="w-64 h-64 md:w-96 md:h-96 relative">
            <Image
              src="/assets/gallery/Logo-5-[remix].gif"
              alt="Loading..."
              fill
              className="object-contain"
              unoptimized // Required for GIFs in Next.js
              priority
            />
          </div>
        </div>
      )}
    </div>
  );
}
