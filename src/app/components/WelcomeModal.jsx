"use client";

import { useEffect, useState } from 'react';
import { X, Cookie } from 'lucide-react';
import Link from 'next/link';

export default function WelcomeModal() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [showCookieBanner, setShowCookieBanner] = useState(false);
  const [hasCheckedCookies, setHasCheckedCookies] = useState(false);

  useEffect(() => {
    // Check if user has made a cookie choice
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (cookieConsent === null && !showWelcome) {
      // Only show cookie banner after welcome modal is closed
      setShowCookieBanner(true);
    }
    setHasCheckedCookies(true);
  }, [showWelcome]);

  const handleCloseWelcome = () => {
    setShowWelcome(false);
    // Show cookie banner only after welcome is closed and no previous choice was made
    if (localStorage.getItem('cookieConsent') === null) {
      setShowCookieBanner(true);
    }
  };

  const handleAcceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowCookieBanner(false);
  };

  const handleRejectCookies = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    setShowCookieBanner(false);
  };

  if (!showWelcome && !showCookieBanner) return null;

  return (
    <>
      {/* Welcome Modal */}
      {showWelcome && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div className="absolute inset-0 bg-white/30 backdrop-blur-sm" onClick={() => setShowWelcome(false)} />
          <div className="bg-white rounded-xl max-w-md w-full p-6 relative shadow-2xl border border-gray-100">
            <button
              onClick={handleCloseWelcome}
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
                  onClick={handleCloseWelcome}
                  className="px-6 py-2 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Not Now
                </button>
                <Link 
                  href="/contact#get-in-touch" 
                  className="px-6 py-2 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors text-center cursor-pointer"
                  onClick={() => setShowWelcome(false)}
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cookie Consent Banner with Animation */}
      <div className={`fixed inset-0 flex items-center justify-center z-50 p-4 transition-all duration-500 ease-in-out ${
        showCookieBanner 
          ? 'opacity-100 visible' 
          : 'opacity-0 invisible'
      }`}>
        <div className="absolute inset-0 bg-black/30" onClick={() => setShowCookieBanner(false)} />
        <div className={`bg-white shadow-lg rounded-xl z-10 w-full max-w-3xl p-8 transform transition-transform duration-500 ${
          showCookieBanner ? 'scale-100' : 'scale-95'
        }`} style={{ minHeight: '320px' }}>
          <div className="flex flex-col items-center text-center w-full">
            <div className="flex flex-col items-center gap-4 w-full">
              <div className="mt-1">
                <Cookie className="h-8 w-8 text-gray-500" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">We value your privacy</h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
                  By clicking "Accept All", you consent to our use of cookies.
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center mt-6">
              <button
                onClick={handleRejectCookies}
                className="px-8 py-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors min-w-[160px]"
              >
                Reject All
              </button>
              <button
                onClick={handleAcceptCookies}
                className="px-8 py-3 text-base font-medium text-white bg-black rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors min-w-[160px]"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}