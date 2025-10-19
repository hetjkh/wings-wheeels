"use client"
import React, { useState } from 'react';
import Navbar from '../reusable/navbar';
import Footer from '../reusable/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { X, Send, CheckCircle2, Plane, Mail, Phone, MessageCircle, Clock, Users, Star, ArrowRight } from 'lucide-react';

export default function QuickInquiryPage() {
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
    { value: 'tours', label: 'Tours and Packages' },
    { value: 'visa', label: 'Visa Assistance' },
    { value: 'flights', label: 'Flight Booking' },
    { value: 'hotels', label: 'Hotel Reservation' }
  ];

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
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
    if (!formData.serviceType) newErrors.serviceType = 'Please select a service type';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const GOOGLE_SHEETS_URL = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL || 
        'https://script.google.com/macros/s/AKfycbyzx4B9QIGUO_d7jBfvsDU5SkvdZPPFvzx8WC0WF7AHDoKbeamwtevJdyr3lYdSA6L2/exec';
      
      // Prepare data for backend API
      const payload = {
        fullName: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        whatsappNumber: formData.whatsapp ? formData.whatsapp.trim() : formData.phone.trim(),
        serviceType: formData.serviceType,
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
        setFormData({
          name: '', email: '', phone: '', whatsapp: '', serviceType: '', specialRequest: ''
        });
        setSubmitSuccess(false);
      }, 3000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit. Please try again or contact us via WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white">
      <Navbar />
      
      {/* Single Screen Split Layout */}
      <section className="w-full min-h-screen flex items-center py-8 px-4">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Side - Text Content */}
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl GeistBlack text-black mb-6 leading-tight">
                  WE PROVIDE SEAMLESS<br />
                  TRAVEL EXPERIENCES<br />
                  TAILORED JUST FOR YOU.
                </h1>
                
                <p className="text-base md:text-lg Poppins text-black mb-8">
                  Fill out our quick form and let our travel experts create the perfect package for you. Your next adventure starts here.
                </p>
              </div>

              {/* Trust Indicators */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 border-2 border-black px-6 py-3 rounded-full w-fit">
                  <Clock className="w-5 h-5 text-black" />
                  <span className="text-sm Poppins font-medium text-black">24hr Response</span>
                </div>
                <div className="flex items-center gap-3 border-2 border-black px-6 py-3 rounded-full w-fit">
                  <Users className="w-5 h-5 text-black" />
                  <span className="text-sm Poppins font-medium text-black">10K+ Happy Travelers</span>
                </div>
                <div className="flex items-center gap-3 border-2 border-black px-6 py-3 rounded-full w-fit">
                  <Star className="w-5 h-5 text-black" />
                  <span className="text-sm Poppins font-medium text-black">4.9/5 Rating</span>
                </div>
              </div>

              {/* Quick Contact */}
              <div className="flex gap-4 pt-4">
                <a href="tel:+971547858338" className="flex items-center gap-2 border-2 border-black px-6 py-3 rounded-full hover:bg-black hover:text-white transition-all Poppins font-medium">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">Call Us</span>
                </a>
                <a href="https://wa.me/971547858338" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 border-2 border-black px-6 py-3 rounded-full hover:bg-black hover:text-white transition-all Poppins font-medium">
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-sm">WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Right Side - Compact Form */}
            <div className="bg-white border-2 border-black rounded-2xl p-6 shadow-xl">
              {submitSuccess ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl GeistBlack text-black mb-2">THANK YOU!</h3>
                  <p className="text-sm Poppins text-gray-700">We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl GeistBlack text-black">QUICK INQUIRY</h2>
                    <p className="text-sm Poppins text-gray-600">Just 6 fields • 2 minutes</p>
                  </div>

                  {/* Compact 2-column grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {/* Name */}
                    <div>
                      <Label className="text-xs GeistBold text-black mb-1 flex items-center gap-1">
                        <Users className="w-3 h-3" /> NAME <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        placeholder="Full name"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        className={`Poppins text-sm py-2 border-2 border-black rounded-full ${errors.name ? 'border-red-500' : ''}`}
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <Label className="text-xs GeistBold text-black mb-1 flex items-center gap-1">
                        <Mail className="w-3 h-3" /> EMAIL <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        type="email"
                        placeholder="Email address"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        className={`Poppins text-sm py-2 border-2 border-black rounded-full ${errors.email ? 'border-red-500' : ''}`}
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <Label className="text-xs GeistBold text-black mb-1 flex items-center gap-1">
                        <Phone className="w-3 h-3" /> PHONE <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        type="tel"
                        placeholder="Phone number"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        className={`Poppins text-sm py-2 border-2 border-black rounded-full ${errors.phone ? 'border-red-500' : ''}`}
                      />
                    </div>

                    {/* WhatsApp */}
                    <div>
                      <Label className="text-xs GeistBold text-black mb-1 flex items-center gap-1">
                        <MessageCircle className="w-3 h-3" /> WHATSAPP
                      </Label>
                      <Input
                        type="tel"
                        placeholder="WhatsApp"
                        value={formData.whatsapp}
                        onChange={(e) => handleChange('whatsapp', e.target.value)}
                        className="Poppins text-sm py-2 border-2 border-black rounded-full"
                      />
                    </div>
                  </div>

                  {/* Service Type - Full Width */}
                  <div>
                    <Label className="text-xs GeistBold text-black mb-1 flex items-center gap-1">
                      <Plane className="w-3 h-3" /> SERVICE <span className="text-red-500">*</span>
                    </Label>
                    <Select value={formData.serviceType} onValueChange={(value) => handleChange('serviceType', value)}>
                      <SelectTrigger className={`Poppins text-sm py-2 border-2 border-black rounded-full ${errors.serviceType ? 'border-red-500' : ''}`}>
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent className="Poppins">
                        {serviceOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value} className="text-sm">
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Special Request */}
                  <div>
                    <Label className="text-xs GeistBold text-black mb-1">SPECIAL REQUEST (Optional)</Label>
                    <Textarea
                      placeholder="Travel plans, dates, budget..."
                      value={formData.specialRequest}
                      onChange={(e) => handleChange('specialRequest', e.target.value)}
                      className="Poppins text-sm border-2 border-black rounded-xl resize-none"
                      rows={3}
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="Poppins w-full bg-black text-white hover:bg-gray-800 py-5 text-sm font-semibold rounded-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      'SUBMITTING...'
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        GET FREE QUOTE NOW <ArrowRight className="w-4 h-4" />
                      </span>
                    )}
                  </Button>

                  <p className="text-xs Poppins text-gray-600 text-center flex items-center justify-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-green-600" />
                    24-hour response • Secure & confidential
                  </p>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

