"use client";
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";


const FAQ = () => {
 
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (index) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const faqData = [
    {
      question: 'What travel documents do I need?',
      answer: 'You will need a valid passport, and depending on your destination, possibly a visa and other travel documents.'
    },
    {
      question: 'How do I book a trip?',
      answer: 'You can book directly through our website or contact our customer service for assistance.'
    },
    {
      question: 'What is your cancellation policy?',
      answer: 'Cancellation policies vary by booking. Please check the terms of your specific booking or contact us for details.'
    },
    {
      question: 'Do you offer travel insurance?',
      answer: 'Yes, we offer comprehensive travel insurance options. Please inquire for more details.'
    },
    {
      question: 'How can I modify my booking?',
      answer: 'Please contact our customer service team for assistance with any booking modifications.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept various payment methods including credit cards, bank transfers, and online payment platforms.'
    }
  ];

  return (
    <section className="w-full bg-gray-50 py-16 lg:py-20">
      <div className="max-w-4xl px-4 mx-auto text-left">
        {/* Header */}
        <div className="mb-10 text-left lg:mb-12">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4 GeistBold">
            Frequently Asked Questions
          </h2>
          <p className="text-sm lg:text-base text-gray-700 max-w-2xl leading-relaxed Poppins">
            Find answers to common questions about our services
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md"
            >
              <button
                onClick={() => toggleItem(index)}
                className={`w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors duration-200`}
              >
                <h3 className="text-base lg:text-lg font-semibold text-gray-900 GeistMedium flex-1">
                  {item.question}
                </h3>
                <div className={`flex-shrink-0`}>
                  {openItems[index] ? (
                    <ChevronUp className="w-5 h-5 text-gray-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-600" />
                  )}
                </div>
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openItems[index] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-4">
                  <div className="border-t border-gray-100 pt-4">
                    <p className={`text-sm lg:text-base text-gray-600 leading-relaxed Poppins`}>
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="p-8 mt-12 text-left bg-white border border-gray-200 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 GeistMedium">
            Didn't find the answer you're looking for?
          </h3>
          <p className="text-gray-600 mb-4 Poppins">
            
              
               "Contact our expert team for personalized assistance"
        
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => window.open("tel:00971547858338")}
              className="bg-black text-white hover:bg-gray-800 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 Poppins"
            >
              Contact Agent
            </button>
            <button
              onClick={() => window.open("https://wa.me/00971547858338")}
              className="bg-transparent border-2 border-black text-black hover:bg-black hover:text-white px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 Poppins"
            >
              WhatsApp
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;