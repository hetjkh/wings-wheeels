"use client";

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import Link from 'next/link';

export default function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(true);

  // Removed the useEffect that was checking for first visit

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="absolute inset-0 bg-white/30 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
      <div className="bg-white rounded-xl max-w-md w-full p-6 relative shadow-2xl border border-gray-100">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="h-6 w-6" />
        </button>
        
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Get Your Dream Destination Ready
          </h2>
          <p className="text-gray-600 mb-6">
            Let us help you plan your perfect trip. Contact us now to get started on your next adventure!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setIsOpen(false)}
              className="px-6 py-2 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Not Now
            </button>
            <Link 
              href="/contact#get-in-touch" 
              className="px-6 py-2 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors text-center cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}