"use client"
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { X, Send, CheckCircle2, Plane, Mail, Phone, MessageCircle, Sparkles, ArrowRight, Clock, MapPin, Users, Star } from 'lucide-react';
import Image from 'next/image';

const QuickLeadForm = ({ isOpen, onClose, variant = "modal" }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    whatsapp: '',
    serviceType: '',
    specialRequest: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const serviceOptions = [
    { value: 'domestic-tour', label: 'Domestic Tour Package' },
    { value: 'international-tour', label: 'International Tour Package' },
    { value: 'air-ticket', label: 'Air Ticket Booking' },
    { value: 'visa', label: 'Visa Services' },
    { value: 'hotel-booking', label: 'Hotel Booking' },
    { value: 'honeymoon', label: 'Honeymoon Package' },
    { value: 'group-tour', label: 'Group Tour' },
    { value: 'customized', label: 'Customized Package' },
    { value: 'other', label: 'Other' }
  ];

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10,}$/.test(formData.phone.replace(/[\s\-\+]/g, ''))) {
      newErrors.phone = 'Invalid phone number';
    }
    
    if (!formData.serviceType) {
      newErrors.serviceType = 'Please select a service type';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Use the same Google Sheets URL as contact form
      const GOOGLE_SHEETS_URL = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL || 
        'https://script.google.com/macros/s/AKfycbyzx4B9QIGUO_d7jBfvsDU5SkvdZPPFvzx8WC0WF7AHDoKbeamwtevJdyr3lYdSA6L2/exec';
      
      const submissionData = {
        ...formData,
        timestamp: new Date().toISOString(),
        source: 'Quick Lead Form',
        formType: 'Quick Inquiry'
      };
      
      // Submit to Google Sheets
      const response = await fetch(GOOGLE_SHEETS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
        mode: 'no-cors' // Google Apps Script requires this
      });
      
      // With no-cors, we can't read the response, so we assume success
      setSubmitSuccess(true);
      
      // Reset form after 2 seconds and close modal
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          whatsapp: '',
          serviceType: '',
          specialRequest: ''
        });
        setSubmitSuccess(false);
        if (variant === "modal" && onClose) {
          onClose();
        }
      }, 2000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit. Please try again or contact us via WhatsApp.');
      setIsSubmitting(false);
    }
  };

  // For modal variant, don't render if not open
  if (variant === "modal" && !isOpen) return null;

  const formContent = (
    <div className="relative">
      {submitSuccess ? (
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
          <h3 className="text-3xl GeistBlack text-black mb-3">THANK YOU!</h3>
          <p className="text-base Poppins text-gray-700 mb-6">We'll get back to you within 24 hours.</p>
          <div className="inline-flex items-center gap-2 border-2 border-black px-6 py-2 rounded-full">
            <Phone className="w-4 h-4" />
            <span className="text-sm Poppins font-medium">Need immediate help? Call +971 54 785 8338</span>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm GeistBold text-black">QUICK & EASY</span>
              <span className="text-sm Poppins text-gray-600">6 fields only</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden border border-gray-300">
              <div 
                className="bg-black h-full rounded-full transition-all duration-500"
                style={{ 
                  width: `${((Object.values(formData).filter(v => v).length / 6) * 100)}%` 
                }}
              ></div>
            </div>
          </div>

          {/* Name Field */}
          <div className="group">
            <Label htmlFor="name" className="text-sm GeistBold text-black flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-black" />
              FULL NAME <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className={`Poppins pl-4 pr-12 py-6 text-base border-2 border-black rounded-full transition-all duration-300 focus:ring-2 focus:ring-black hover:shadow-md ${
                  errors.name ? 'border-red-500 focus:border-red-500' : ''
                }`}
              />
              {formData.name && !errors.name && (
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                </div>
              )}
            </div>
            {errors.name && <p className="text-red-500 text-xs mt-2 Poppins flex items-center gap-1"><X className="w-3 h-3" />{errors.name}</p>}
          </div>

          {/* Email Field */}
          <div className="group">
            <Label htmlFor="email" className="text-sm GeistBold text-black flex items-center gap-2 mb-2">
              <Mail className="w-4 h-4 text-black" />
              EMAIL ADDRESS <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className={`Poppins pl-4 pr-12 py-6 text-base border-2 border-black rounded-full transition-all duration-300 focus:ring-2 focus:ring-black hover:shadow-md ${
                  errors.email ? 'border-red-500 focus:border-red-500' : ''
                }`}
              />
              {formData.email && !errors.email && (
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                </div>
              )}
            </div>
            {errors.email && <p className="text-red-500 text-xs mt-2 Poppins flex items-center gap-1"><X className="w-3 h-3" />{errors.email}</p>}
          </div>

          {/* Phone Number */}
          <div className="group">
            <Label htmlFor="phone" className="text-sm GeistBold text-black flex items-center gap-2 mb-2">
              <Phone className="w-4 h-4 text-black" />
              PHONE NUMBER <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Input
                id="phone"
                type="tel"
                placeholder="10 digit phone number"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className={`Poppins pl-4 pr-12 py-6 text-base border-2 border-black rounded-full transition-all duration-300 focus:ring-2 focus:ring-black hover:shadow-md ${
                  errors.phone ? 'border-red-500 focus:border-red-500' : ''
                }`}
              />
              {formData.phone && !errors.phone && (
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                </div>
              )}
            </div>
            {errors.phone && <p className="text-red-500 text-xs mt-2 Poppins flex items-center gap-1"><X className="w-3 h-3" />{errors.phone}</p>}
          </div>

          {/* WhatsApp Number */}
          <div className="group">
            <Label htmlFor="whatsapp" className="text-sm GeistBold text-black flex items-center gap-2 mb-2">
              <MessageCircle className="w-4 h-4 text-black" />
              WHATSAPP NUMBER <span className="text-gray-500 text-xs Poppins font-normal">(Optional)</span>
            </Label>
            <div className="relative">
              <Input
                id="whatsapp"
                type="tel"
                placeholder="WhatsApp number (if different from phone)"
                value={formData.whatsapp}
                onChange={(e) => handleChange('whatsapp', e.target.value)}
                className="Poppins pl-4 pr-4 py-6 text-base border-2 border-black rounded-full transition-all duration-300 focus:ring-2 focus:ring-black hover:shadow-md"
              />
            </div>
          </div>

          {/* Service Type */}
          <div className="group">
            <Label htmlFor="serviceType" className="text-sm GeistBold text-black flex items-center gap-2 mb-2">
              <Plane className="w-4 h-4 text-black" />
              WHAT SERVICE ARE YOU LOOKING FOR? <span className="text-red-500">*</span>
            </Label>
            <Select 
              value={formData.serviceType} 
              onValueChange={(value) => handleChange('serviceType', value)}
            >
              <SelectTrigger className={`Poppins py-6 text-base border-2 border-black rounded-full transition-all duration-300 focus:ring-2 focus:ring-black hover:shadow-md ${
                errors.serviceType ? 'border-red-500' : ''
              }`}>
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent className="Poppins">
                {serviceOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value} className="py-3 cursor-pointer">
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.serviceType && <p className="text-red-500 text-xs mt-2 Poppins flex items-center gap-1"><X className="w-3 h-3" />{errors.serviceType}</p>}
          </div>

          {/* Special Request */}
          <div className="group">
            <Label htmlFor="specialRequest" className="text-sm GeistBold text-black flex items-center gap-2 mb-2">
              <MessageCircle className="w-4 h-4 text-black" />
              SPECIAL REQUEST OR MESSAGE <span className="text-gray-500 text-xs Poppins font-normal">(Optional)</span>
            </Label>
            <Textarea
              id="specialRequest"
              placeholder="Tell us about your travel plans, dates, budget, destination preferences, etc."
              value={formData.specialRequest}
              onChange={(e) => handleChange('specialRequest', e.target.value)}
              className="Poppins min-h-[120px] text-base border-2 border-black rounded-2xl transition-all duration-300 focus:ring-2 focus:ring-black hover:shadow-md resize-none"
              rows={4}
            />
            <p className="text-xs Poppins text-gray-500 mt-2">
              {formData.specialRequest.length}/500 characters
            </p>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="Poppins w-full bg-black text-white hover:bg-gray-800 py-7 text-base font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] mt-10"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>SUBMITTING YOUR REQUEST...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-3">
                <span>GET YOUR FREE QUOTE NOW</span>
                <ArrowRight className="w-5 h-5" />
              </div>
            )}
          </Button>

          {/* Trust Badge */}
          <div className="text-center mt-6">
            <p className="text-sm Poppins text-gray-600 flex items-center justify-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              We respond within 24 hours. Usually much faster!
            </p>
          </div>
        </form>
      )}
    </div>
  );

  // Modal variant
  if (variant === "modal") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 backdrop-blur-sm">
        <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center rounded-t-2xl">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Quick Inquiry</h2>
              <p className="text-sm text-gray-500 mt-1">Get your dream vacation planned</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="px-6 py-6">
            {formContent}
          </div>
        </div>
      </div>
    );
  }

  // Page variant with header and interactive elements
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Subtle Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }}></div>
      </div>

      {/* Header - Matching navbar */}
      <header className="relative z-10 bg-white border-b border-gray-200 sticky top-0 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <a href="/" className="flex items-center space-x-3 group cursor-pointer">
              <div className="relative w-12 h-12 bg-black rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300">
                <Plane className="w-6 h-6 text-white transform -rotate-45" />
              </div>
              <div>
                <h1 className="text-xl GeistBlack text-black">
                  WINGS & WHEELS
                </h1>
                <p className="text-xs Poppins text-gray-600">Travel and Tourism</p>
              </div>
            </a>

            {/* Quick Contact Icons */}
            <div className="flex items-center gap-3">
              <a 
                href="tel:+971547858338" 
                className="p-3 rounded-full border-2 border-black text-black hover:bg-black hover:text-white transition-all duration-300"
                aria-label="Call us"
              >
                <Phone className="w-5 h-5" />
              </a>
              <a 
                href="https://wa.me/971547858338" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 rounded-full border-2 border-black text-black hover:bg-black hover:text-white transition-all duration-300"
                aria-label="WhatsApp us"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a 
                href="mailto:reservation@wwtravels.net"
                className="hidden sm:flex p-3 rounded-full border-2 border-black text-black hover:bg-black hover:text-white transition-all duration-300"
                aria-label="Email us"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative z-10 pt-12 pb-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-black text-white px-6 py-2 rounded-full mb-6 Poppins">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Get Your Free Quote in 2 Minutes</span>
          </div>
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl GeistBlack text-black mb-6 leading-tight">
            WE PROVIDE SEAMLESS<br />
            TRAVEL EXPERIENCES<br />
            TAILORED JUST FOR YOU.
          </h1>
          
          <p className="text-base md:text-lg Poppins text-black mb-8 max-w-2xl mx-auto">
            Fill out our quick form and let our travel experts create the perfect package for you. Your next adventure starts here.
          </p>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="flex items-center gap-2 border-2 border-black px-6 py-3 rounded-full">
              <Clock className="w-5 h-5 text-black" />
              <span className="text-sm Poppins font-medium text-black">24hr Response</span>
            </div>
            <div className="flex items-center gap-2 border-2 border-black px-6 py-3 rounded-full">
              <Users className="w-5 h-5 text-black" />
              <span className="text-sm Poppins font-medium text-black">10K+ Happy Travelers</span>
            </div>
            <div className="flex items-center gap-2 border-2 border-black px-6 py-3 rounded-full">
              <Star className="w-5 h-5 text-black" />
              <span className="text-sm Poppins font-medium text-black">4.9/5 Rating</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Form Section */}
      <div className="relative z-10 px-4 pb-16">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border-2 border-black">
            {formContent}
          </div>
          
          {/* Additional Features */}
          <div className="mt-16 grid md:grid-cols-3 gap-6">
            <a href="tel:+971547858338" className="bg-white border-2 border-black rounded-2xl p-8 text-center hover:bg-black hover:text-white transition-all duration-300 group">
              <div className="w-16 h-16 bg-black group-hover:bg-white rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-black transition-all duration-300">
                <Phone className="w-7 h-7 text-white group-hover:text-black transition-all duration-300" />
              </div>
              <h3 className="GeistBold text-lg mb-2">CALL US</h3>
              <p className="text-sm Poppins font-medium">
                +971 54 785 8338
              </p>
            </a>

            <a href="https://wa.me/971547858338" target="_blank" rel="noopener noreferrer" className="bg-white border-2 border-black rounded-2xl p-8 text-center hover:bg-black hover:text-white transition-all duration-300 group">
              <div className="w-16 h-16 bg-black group-hover:bg-white rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-black transition-all duration-300">
                <MessageCircle className="w-7 h-7 text-white group-hover:text-black transition-all duration-300" />
              </div>
              <h3 className="GeistBold text-lg mb-2">WHATSAPP</h3>
              <p className="text-sm Poppins font-medium">
                Chat with Us
              </p>
            </a>

            <div className="bg-white border-2 border-black rounded-2xl p-8 text-center hover:bg-black hover:text-white transition-all duration-300 group">
              <div className="w-16 h-16 bg-black group-hover:bg-white rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-black transition-all duration-300">
                <MapPin className="w-7 h-7 text-white group-hover:text-black transition-all duration-300" />
              </div>
              <h3 className="GeistBold text-lg mb-2">VISIT US</h3>
              <p className="text-sm Poppins">
                Dubai, UAE
              </p>
            </div>
          </div>

          {/* Footer Note */}
          <div className="mt-12 text-center">
            <p className="text-sm Poppins text-gray-600">
              🔒 Your information is secure and will never be shared with third parties
            </p>
          </div>
        </div>
      </div>

      {/* Add Custom Animations */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes fade-in-down {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.6s ease-out;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
          animation-fill-mode: backwards;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
          animation-fill-mode: backwards;
        }
      `}</style>
    </div>
  );
};

export default QuickLeadForm;

