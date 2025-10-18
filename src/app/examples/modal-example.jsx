"use client"
// Example: How to use the Quick Lead Form Modal in any component
import { useState } from 'react';
import QuickLeadForm from '@/components/QuickLeadForm';
import { Button } from '@/components/ui/button';

export default function ExamplePage() {
  const [showLeadForm, setShowLeadForm] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Example: Using Quick Lead Form</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Trigger Modal Examples</h2>
            
            {/* Example 1: Primary CTA Button */}
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">1. Primary CTA Button</h3>
                <Button 
                  onClick={() => setShowLeadForm(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg"
                >
                  Get a Free Quote 🎯
                </Button>
              </div>

              {/* Example 2: Success Story CTA */}
              <div>
                <h3 className="font-medium mb-2">2. After Success Story</h3>
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <p className="text-gray-700 mb-4">
                    "Wings & Wheels planned our dream honeymoon to Maldives. Everything was perfect!" 
                    <span className="block text-sm text-gray-500 mt-2">- Happy Customer</span>
                  </p>
                  <Button 
                    onClick={() => setShowLeadForm(true)}
                    variant="outline"
                    className="border-green-600 text-green-600 hover:bg-green-50"
                  >
                    Plan My Dream Trip
                  </Button>
                </div>
              </div>

              {/* Example 3: Package Card CTA */}
              <div>
                <h3 className="font-medium mb-2">3. On Package Cards</h3>
                <div className="border rounded-lg p-6 bg-gradient-to-br from-purple-50 to-blue-50">
                  <h4 className="text-xl font-bold mb-2">Dubai Package</h4>
                  <p className="text-gray-600 mb-2">5 Days / 4 Nights</p>
                  <p className="text-2xl font-bold text-blue-600 mb-4">₹45,999/-</p>
                  <Button 
                    onClick={() => setShowLeadForm(true)}
                    className="w-full"
                  >
                    Book Now
                  </Button>
                </div>
              </div>

              {/* Example 4: Floating Action Button */}
              <div>
                <h3 className="font-medium mb-2">4. Floating Action Button (Bottom Right)</h3>
                <p className="text-sm text-gray-500">See the bottom-right corner of your screen</p>
              </div>
            </div>
          </div>

          {/* Direct Page Link Example */}
          <div className="border-t pt-6 mt-6">
            <h3 className="font-medium mb-2">5. Direct Page Link (for Social Media)</h3>
            <p className="text-gray-600 mb-4">
              You can also share the direct link for quick access:
            </p>
            <div className="bg-gray-100 p-4 rounded font-mono text-sm">
              https://yoursite.com/quick-inquiry
            </div>
          </div>
        </div>
      </div>

      {/* The Modal */}
      <QuickLeadForm 
        isOpen={showLeadForm} 
        onClose={() => setShowLeadForm(false)}
        variant="modal"
      />

      {/* Floating Action Button - Always visible */}
      <button
        onClick={() => setShowLeadForm(true)}
        className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 z-40"
        aria-label="Quick Inquiry"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" 
          />
        </svg>
      </button>
    </div>
  );
}

