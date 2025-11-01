"use client";
import React, { useMemo, useState, useEffect, useRef } from 'react';
import Navbar from '../reusable/navbar';
import Footer from '../reusable/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { X, Send, CheckCircle2, Plane, Mail, Phone, MessageCircle, Users, Star, ArrowRight, Shield, Sparkles } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';

export default function QuickInquiryPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    whatsapp: '',
    serviceType: [],
    specialRequest: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [step, setStep] = useState(1);
  const [api, setApi] = useState(null);

  const serviceOptions = [
    { value: 'tours', label: 'Tours and Packages' },
    { value: 'visa', label: 'Visa Assistance' },
    { value: 'flights', label: 'Flight Booking' },
    { value: 'hotels', label: 'Hotel Reservation' }
  ];

  const testimonials = [
    {
      place: 'Bali, Indonesia',
      photo: 'https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?q=80&w=800&auto=format&fit=crop',
      reviewer: 'Sarah & Michael Chen',
      trip: '5-Day Honeymoon Package',
      review: 'Wings & Wheels made our honeymoon absolutely magical! Every detail was perfect—from the beautiful resort to the private tours. The team was responsive and truly cared about making our trip special. Couldn\'t have asked for better service!',
      rating: 5
    },
    {
      place: 'Paris, France',
      photo: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=800&auto=format&fit=crop',
      reviewer: 'James Rodriguez',
      trip: '7-Day European Tour',
      review: 'As a solo traveler, I was nervous, but they put together an amazing Paris itinerary. Everything was seamless—flights, hotels, and even restaurant recommendations. I felt safe and had the time of my life. Highly recommend!',
      rating: 5
    },
    {
      place: 'Dubai, UAE',
      photo: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=800&auto=format&fit=crop',
      reviewer: 'Priya & Raj Patel',
      trip: '4-Day Family Adventure',
      review: 'Took our family of 4 to Dubai. The kids loved every moment! The desert safari, Burj Khalifa tickets, and hotel were all perfectly arranged. Great value for money and zero stress. Will definitely use them again!',
      rating: 5
    },
    {
      place: 'Maldives',
      photo: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop',
      reviewer: 'Emma Thompson',
      trip: '6-Day Beach Paradise',
      review: 'Dream vacation come true! The overwater villa was stunning, and the snorkeling trips they arranged were incredible. Customer service was top-notch—answered all my questions promptly. Worth every penny!',
      rating: 5
    },
    {
      place: 'Tokyo, Japan',
      photo: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=800&auto=format&fit=crop',
      reviewer: 'David Kim',
      trip: '8-Day Cultural Experience',
      review: 'Best travel planning experience ever! They understood my interest in Japanese culture and curated activities perfectly. The JR Pass arrangement was smooth, and the ryokan stay was authentic. Exceptional service!',
      rating: 5
    }
  ];

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateCurrentStep = () => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.serviceType || formData.serviceType.length === 0) newErrors.serviceType = 'Please select at least one service';
    }
    if (step === 2) {
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    }
    if (step === 3) {
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
      } else if (!/^\d{7,}$/.test(formData.phone.replace(/[\s\-\+]/g, ''))) {
      newErrors.phone = 'Invalid phone number';
    }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const steps = useMemo(() => ([
    { id: 1, title: 'Your Plan', subtitle: 'What would you like help with?' },
    { id: 2, title: 'About You', subtitle: 'Basic details to reach you' },
    { id: 3, title: 'Contact', subtitle: 'Best number to assist you' },
    { id: 4, title: 'Finalize', subtitle: "Anything we should know?" }
  ]), []);

  const goNext = () => {
    if (!validateCurrentStep()) return;
    setStep(prev => Math.min(prev + 1, steps.length));
  };

  const goBack = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  // Auto-scroll carousel every 5 seconds
  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [api]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // validate last step fields if any
    if (!validateCurrentStep()) return;
    setIsSubmitting(true);
    
    try {
      const GOOGLE_SHEETS_URL = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL || 
        'https://script.google.com/macros/s/AKfycbyzx4B9QIGUO_d7jBfvsDU5SkvdZPPFvzx8WC0WF7AHDoKbeamwtevJdyr3lYdSA6L2/exec';
      
      // Prepare data for backend API
      // Send first selected service type to API (API only accepts single value)
      const apiServiceType = Array.isArray(formData.serviceType) && formData.serviceType.length > 0 
        ? formData.serviceType[0] 
        : (formData.serviceType || '');
      
      const payload = {
        fullName: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        whatsappNumber: formData.whatsapp ? formData.whatsapp.trim() : formData.phone.trim(),
        serviceType: apiServiceType,
        destinationCountry: 'Not specified',
        destinationState: 'Not specified',
        nationality: 'Not specified',
        message: formData.specialRequest ? formData.specialRequest.trim() : '',
        timestamp: new Date().toISOString(),
        source: 'Quick Lead Form',
        formType: 'Quick Inquiry'
      };
      
      // Submit to backend API (handles WhatsApp and Email notifications)
      console.log('Submitting payload:', payload);
      
      const response = await fetch('https://wwtravels.net/api/bookings/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      console.log('Backend response:', data);

      if (!response.ok || !data.success) {
        console.error('Backend error:', data);
        throw new Error(data.message || 'Failed to submit booking request');
      }

      // Submit to Google Sheets (non-blocking - won't fail the form submission)
      try {
        if (GOOGLE_SHEETS_URL && GOOGLE_SHEETS_URL !== 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
          await fetch(GOOGLE_SHEETS_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
            mode: 'no-cors' // Google Apps Script requires no-cors mode
          });
          console.log('✅ Data sent to Google Sheets successfully');
        }
      } catch (sheetsError) {
        // Don't fail the form submission if Google Sheets fails
        console.warn('⚠️ Failed to send data to Google Sheets:', sheetsError);
      }
      
      setSubmitSuccess(true);
      setTimeout(() => {
        setFormData({ name: '', email: '', phone: '', whatsapp: '', serviceType: [], specialRequest: '' });
        setSubmitSuccess(false);
        setStep(1);
      }, 3000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit. Please try again or contact us via WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-white">
      {/* HERO with persuasive copy and background imagery */}
      <div 
        className="relative w-full min-h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url(/assets/274791-3840x2160-desktop-4k-dubai-background-photo.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
        {/* Fallback image */}
        <img
          src="/assets/274791-3840x2160-desktop-4k-dubai-background-photo.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-0 pointer-events-none"
          onError={(e) => {
            e.target.onerror = null;
            const section = e.target.closest('section');
            if (section) {
              section.style.backgroundImage = "url(/assets/europe.jpg)";
            }
          }}
        />
        
        {/* Overlay gradient for text visibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent z-10" />
        
        <div className="relative z-20 min-h-screen flex flex-col w-full">
          {/* Navigation Bar - inside the hero image */}
      <Navbar />
      
          {/* Main Content */}
          <div className="flex-1 flex justify-center py-4 lg:items-center lg:py-8">
            <div className="relative max-w-7xl mx-auto px-4 pt-4 pb-4 lg:pt-16 lg:pb-14">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div className="text-black">
                  <div className="inline-flex items-center gap-2 bg-white/80 border border-black px-4 py-2 rounded-full mb-5">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-xs Poppins">Personal trip design in under 24 hours</span>
                  </div>
                  <h1 
                    className="text-3xl md:text-5xl GeistBlack leading-tight text-white"
                    style={{
                      textShadow: '0 0 10px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.6), 0 0 30px rgba(0,0,0,0.4), 2px 2px 4px rgba(0,0,0,0.9)'
                    }}
                  >
                    Your next great trip starts with a quick, friendly chat.
                  </h1>
                  <p 
                    className="text-base md:text-lg Poppins mt-4 max-w-xl text-white"
                    style={{
                      textShadow: '0 0 8px rgba(0,0,0,0.8), 0 0 16px rgba(0,0,0,0.6), 2px 2px 4px rgba(0,0,0,0.9)'
                    }}
                  >
                    Share a few details and our expert will craft a free, custom plan—no spam, no pushy sales, just helpful guidance and the best deals.
                  </p>
                  <div className="mt-8">
                    <button
                      onClick={() => {
                        const formSection = document.getElementById('quick-inquiry-form');
                        if (formSection) {
                          formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }}
                      className="bg-white text-black hover:bg-gray-100 px-10 py-4 rounded-full text-base font-semibold transition-all duration-300 cursor-pointer transform hover:scale-105 shadow-lg"
                    >
                      Get a Free Quote
                    </button>
                  </div>
                </div>
                <div className="hidden lg:block">
                  <img
                    src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1600&auto=format&fit=crop"
                    alt="Traveler looking at map"
                    className="rounded-2xl border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)]"
                  />
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>

      {/* MULTI-STEP FORM */}
      <div id="quick-inquiry-form" className="w-full">
        <section className="flex items-start lg:items-center py-6 lg:py-12 px-4 overflow-x-hidden">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left: Testimonials Carousel */}
          <div className="space-y-6 order-2 lg:order-1">
            <div className="bg-white border-2 border-black rounded-2xl p-6">
              <h3 className="GeistBlack text-xl mb-5">Real experiences from real travelers</h3>
              
              <Carousel 
                opts={{ 
                  align: "start", 
                  loop: true,
                  duration: 20
                }} 
                setApi={setApi}
                className="w-full"
              >
                <CarouselContent className="-ml-2 md:-ml-4">
                  {testimonials.map((testimonial, index) => (
                    <CarouselItem key={index} className="pl-2 md:pl-4 basis-full">
                      <div className="space-y-4 animate-fade-in">
                        {/* Destination Photo */}
                        <div className="relative w-full h-48 rounded-xl overflow-hidden border-2 border-black">
                          <img 
                            src={testimonial.photo} 
                            alt={testimonial.place}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                          <div className="absolute bottom-4 left-4 right-4">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="GeistBlack text-lg text-white">{testimonial.place}</h4>
                              <div className="flex items-center gap-0.5">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                ))}
                              </div>
                            </div>
                            <p className="text-xs Poppins text-white/90">{testimonial.trip}</p>
                          </div>
                        </div>

                        {/* Reviewer Info & Review */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
              <div>
                              <p className="GeistMedium text-sm text-black">{testimonial.reviewer}</p>
                              <p className="text-xs Poppins text-gray-600">{testimonial.trip}</p>
                            </div>
                            <div className="flex items-center gap-0.5">
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                          </div>
                          
                          <p className="text-sm Poppins text-gray-700 leading-relaxed">
                            "{testimonial.review}"
                </p>
              </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>

              {/* Privacy Note */}
              <div className="mt-6 flex items-center gap-2 text-xs text-gray-700 pt-4 border-t border-gray-200">
                <Shield className="w-4 h-4" />
                <span>We respect your privacy. No spam. Opt-out anytime.</span>
                </div>
              </div>

            {/* Quick Contact Buttons */}
            <div className="hidden lg:flex gap-4">
                <a href="tel:+971547858338" className="flex items-center gap-2 border-2 border-black px-6 py-3 rounded-full hover:bg-black hover:text-white transition-all Poppins font-medium">
                  <Phone className="w-4 h-4" />
                <span className="text-sm">Prefer a quick call?</span>
                </a>
                <a href="https://wa.me/971547858338" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 border-2 border-black px-6 py-3 rounded-full hover:bg-black hover:text-white transition-all Poppins font-medium">
                  <MessageCircle className="w-4 h-4" />
                <span className="text-sm">Chat on WhatsApp</span>
                </a>
              </div>
            </div>

          {/* Right: form card (make prominent) */}
          <div className="relative order-1 lg:order-2">
            {/* spotlight background to draw attention to the form */}
            <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
              <div className="absolute right-[-10%] top-[-10%] w-[420px] h-[420px] rounded-full opacity-40 blur-3xl"
                   style={{ background: 'radial-gradient(closest-side, #ffe08a, transparent 70%)' }} />
              <div className="absolute right-[5%] bottom-[-10%] w-[320px] h-[320px] rounded-full opacity-30 blur-3xl"
                   style={{ background: 'radial-gradient(closest-side, #ffd1dc, transparent 70%)' }} />
            </div>
            <div className="lg:sticky lg:top-6">
              <div className="bg-white border-2 border-black ring-2 ring-black rounded-2xl p-5 lg:p-6 shadow-[14px_14px_0_0_rgba(0,0,0,1)] animate-card-pop">
                {/* High visibility badge */}
                <div className="mb-4 flex items-center gap-2">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-black bg-yellow-300 text-black text-[11px] Poppins font-medium">
                    <Sparkles className="w-3 h-3" /> Start here — free custom plan
                  </span>
                </div>
              {/* Step header */}
              <div className="mb-5">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h2 className="GeistBlack text-xl">{steps[step-1].title}</h2>
                    <p className="text-xs Poppins text-gray-600">{steps[step-1].subtitle}</p>
              </div>
                  <span className="text-xs Poppins">Step {step} of {steps.length}</span>
                  </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-black" style={{ width: `${(step/steps.length)*100}%`, transition: 'width 300ms ease' }} />
                </div>
                  </div>

              {/* Form body */}
              <form onSubmit={handleSubmit}>
                {/* STEP 1: Service selection */}
                {step === 1 && (
                  <div className="animate-fade-in space-y-4">
                    <Label className="text-xs GeistBold text-black mt-1 flex items-center gap-1">
                      <Plane className="w-3 h-3" /> What do you need help with? <span className="text-red-500">*</span>
                    </Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {serviceOptions.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => {
                            const currentServices = formData.serviceType || [];
                            const isSelected = currentServices.includes(option.value);
                            const newServices = isSelected
                              ? currentServices.filter(s => s !== option.value)
                              : [...currentServices, option.value];
                            handleChange('serviceType', newServices);
                          }}
                          className={`group p-4 rounded-xl border-2 transition-all text-left relative ${
                            formData.serviceType && formData.serviceType.includes(option.value)
                              ? 'border-black bg-black text-white'
                              : 'border-black hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] bg-white'
                          }`}
                        >
                          {formData.serviceType && formData.serviceType.includes(option.value) && (
                            <div className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md">
                              <CheckCircle2 className="w-5 h-5 text-green-500" />
                            </div>
                          )}
                          <span className="GeistMedium">{option.label}</span>
                          <div className="text-[11px] mt-1 opacity-80 Poppins">Best fares + expert guidance</div>
                        </button>
                      ))}
                    </div>
                    {errors.serviceType && <p className="text-red-600 text-xs Poppins">{errors.serviceType}</p>}
                  </div>
                )}

                {/* STEP 2: Name + Email */}
                {step === 2 && (
                  <div className="animate-slide-up space-y-4">
                    <div>
                      <Label className="text-xs GeistBold text-black mb-1 flex items-center gap-1">
                        <Users className="w-3 h-3" /> Full name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        placeholder="Jane Doe"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        className={`Poppins text-sm px-4 py-3 border-2 border-black rounded-xl focus:ring-2 focus:ring-black/30 ${errors.name ? 'border-red-500' : ''}`}
                      />
                      {errors.name && <p className="text-red-600 text-xs mt-1 Poppins">{errors.name}</p>}
                    </div>
                    <div>
                      <Label className="text-xs GeistBold text-black mb-1 flex items-center gap-1">
                        <Mail className="w-3 h-3" /> Email <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        className={`Poppins text-sm px-4 py-3 border-2 border-black rounded-xl focus:ring-2 focus:ring-black/30 ${errors.email ? 'border-red-500' : ''}`}
                      />
                      {errors.email && <p className="text-red-600 text-xs mt-1 Poppins">{errors.email}</p>}
                    </div>
                    </div>
                )}

                {/* STEP 3: Phone + WhatsApp */}
                {step === 3 && (
                  <div className="animate-slide-up space-y-4">
                    <div>
                      <Label className="text-xs GeistBold text-black mb-1 flex items-center gap-1">
                        <Phone className="w-3 h-3" /> Phone <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        type="tel"
                        placeholder="Your number"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        className={`Poppins text-sm px-4 py-3 border-2 border-black rounded-xl focus:ring-2 focus:ring-black/30 ${errors.phone ? 'border-red-500' : ''}`}
                      />
                      {errors.phone && <p className="text-red-600 text-xs mt-1 Poppins">{errors.phone}</p>}
                    </div>
                    <div>
                      <Label className="text-xs GeistBold text-black mb-1 flex items-center gap-1">
                        <MessageCircle className="w-3 h-3" /> WhatsApp (optional)
                      </Label>
                      <Input
                        type="tel"
                        placeholder="WhatsApp number"
                        value={formData.whatsapp}
                        onChange={(e) => handleChange('whatsapp', e.target.value)}
                        className="Poppins text-sm px-4 py-3 border-2 border-black rounded-xl focus:ring-2 focus:ring-black/30"
                      />
                      <p className="text-[11px] text-gray-600 mt-1 Poppins">We’ll send a quick confirmation and your free quote.</p>
                    </div>
                  </div>
                )}

                {/* STEP 4: Special request + review */}
                {step === 4 && (
                  <div className="animate-slide-up space-y-4">
                  <div>
                      <Label className="text-xs GeistBold text-black mb-1">Tell us anything that helps (dates, budget, travelers)</Label>
                    <Textarea
                        placeholder="e.g., 5 nights in Bali in Feb, 2 adults, ~$1200 budget"
                      value={formData.specialRequest}
                      onChange={(e) => handleChange('specialRequest', e.target.value)}
                        className="Poppins text-sm px-4 py-3 border-2 border-black rounded-xl min-h-24"
                        rows={3}
                    />
                  </div>
                    <div className="bg-gray-50 border border-black rounded-xl p-4 text-xs Poppins">
                      <div className="flex items-center gap-2 mb-2"><CheckCircle2 className="w-3 h-3 text-green-600" /><span>Quick review</span></div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="col-span-2"><span className="text-gray-600">Service:</span> <span className="font-medium">{Array.isArray(formData.serviceType) && formData.serviceType.length > 0 
                          ? formData.serviceType.map(val => serviceOptions.find(o=>o.value===val)?.label).filter(Boolean).join(', ')
                          : '-'}</span></div>
                        <div><span className="text-gray-600">Name:</span> <span className="font-medium">{formData.name || '-'}</span></div>
                        <div><span className="text-gray-600">Email:</span> <span className="font-medium">{formData.email || '-'}</span></div>
                        <div><span className="text-gray-600">Phone:</span> <span className="font-medium">{formData.phone || '-'}</span></div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Footer controls */}
                <div className="mt-6 flex items-center gap-3">
                  {step > 1 && (
                    <Button type="button" onClick={goBack} variant="outline" className="border-2 border-black rounded-full px-6">
                      Back
                    </Button>
                  )}
                  {step < steps.length && (
                    <Button type="button" onClick={goNext} className="bg-black text-white hover:bg-gray-800 rounded-full px-6">
                      Continue <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                  {step === steps.length && (
                    <Button type="submit" disabled={isSubmitting} className="bg-black text-white hover:bg-gray-800 rounded-full px-6">
                      {isSubmitting ? 'Submitting...' : 'Get my free quote'}
                  </Button>
                  )}
                </div>

                <p className="mt-3 text-[11px] Poppins text-gray-600 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-green-600" /> 24-hour response • Secure & confidential
                  </p>
                </form>

              {submitSuccess && (
                <div className="text-center py-10">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl GeistBlack text-black mb-2">Thank you!</h3>
                  <p className="text-sm Poppins text-gray-700">We’ll get back to you within a few hours.</p>
                </div>
              )}
            </div>
            </div>
          </div>
        </div>
        </section>
      </div>

      <Footer />
      {/* micro animations */}
      <style jsx>{`
        .animate-fade-in { animation: fadeIn 300ms ease; }
        .animate-slide-up { animation: slideUp 300ms ease; }
        .animate-card-pop { animation: cardPop 320ms cubic-bezier(0.2, 0.9, 0.2, 1); }
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(8px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes cardPop { from { transform: translateY(8px) scale(0.98); box-shadow: 0 0 0 0 rgba(0,0,0,1) } to { transform: translateY(0) scale(1); } }
      `}</style>
    </div>
  );
}

