"use client";
import React from "react";
import Navbar from "../reusable/navbar";
import Footer from "../reusable/footer";
import { Shield, FileText, Lock, Eye, Share2, Cookie, UserCheck, ExternalLink, CheckCircle } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full bg-white min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative w-full min-h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url(/assets/contact-us.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed"
        }}
      >
        <div className="relative z-20 min-h-screen flex flex-col w-full">
          {/* Navigation Bar */}
          <Navbar />
          
          <div className="flex-1 flex items-center justify-center py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center px-4 sm:px-8">
                {/* Main Heading */}
                <h1 className="font-bold mb-6 uppercase GeistBlack text-4xl md:text-7xl tracking-wider leading-tight text-black">
                  Privacy Policy
                </h1>
                
                {/* Subtitle */}
                <div className="mb-6 Poppins">
                  <h2 className="text-sm PoppinBold md:text-xl font-light text-black mb-4 tracking-wide">
                    YOUR TRUST IS OUR PRIORITY
                  </h2>
                </div>
                
                {/* Description */}
                <p className="Poppins text-sm md:text-lg leading-relaxed mb-8 max-w-3xl mx-auto text-black">
                  Your trust is important to us. Learn how we collect, use, and protect your personal information.
                </p>
                
                {/* Last Updated */}
                <div className="flex justify-center items-center gap-2 text-sm text-black mt-8">
                  <FileText className="w-4 h-4" />
                  <span>Last Updated: October 30, 2025</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <div className="mb-12">
            <p className="text-lg text-gray-700 leading-relaxed Poppins">
              At <span className="font-semibold GeistMedium">Wings and Wheels travel and Tourism LLC</span>, we value your privacy and are committed to protecting your personal
              information. This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website or
              use our travel, visa, or ticket booking services.
            </p>
          </div>

          {/* Section 1: Information We Collect */}
          <div className="mb-12 bg-gray-50 p-8 rounded-xl border">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-black p-3 rounded-full">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold GeistBlack text-gray-900">
                1. Information We Collect
              </h2>
            </div>
            <p className="text-gray-700 mb-4 Poppins">
              We may collect the following types of information:
            </p>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl border">
                <h3 className="text-xl font-semibold GeistMedium text-gray-900 mb-4 flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-gray-800" />
                  Personal Information:
                </h3>
                <ul className="space-y-2 text-gray-700 Poppins">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
                    <span>Name</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
                    <span>Phone number</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
                    <span>Email address</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
                    <span>Travel details (destination, travel dates, purpose of travel)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
                    <span>Passport or identification information (for visa processing only)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl border">
                <h3 className="text-xl font-semibold GeistMedium text-gray-900 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-gray-800" />
                  Non-Personal Information:
                </h3>
                <ul className="space-y-2 text-gray-700 Poppins">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
                    <span>Browser type, device information, and IP address</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
                    <span>Cookies and usage data for analytics</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 2: How We Use Your Information */}
          <div className="mb-12 bg-gray-50 p-8 rounded-xl border">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-black p-3 rounded-full">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold GeistBlack text-gray-900">
                2. How We Use Your Information
              </h2>
            </div>
            <p className="text-gray-700 mb-4 Poppins">
              We use your information to:
            </p>
            <ul className="space-y-3 text-gray-700 Poppins">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
                <span>Process your travel, visa, or booking requests</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
                <span>Send you travel quotes, offers, and service updates</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
                <span>Communicate with you about your inquiry or booking</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
                <span>Improve our services and website experience</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
                <span>Comply with legal or regulatory requirements</span>
              </li>
            </ul>
          </div>

          {/* Section 3: Sharing of Information */}
          <div className="mb-12 bg-gray-50 p-8 rounded-xl border">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-black p-3 rounded-full">
                <Share2 className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold GeistBlack text-gray-900">
                3. Sharing of Information
              </h2>
            </div>
            <p className="text-gray-700 mb-4 Poppins">
              We may share your data only with:
            </p>
            <ul className="space-y-3 text-gray-700 Poppins mb-4">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
                <span>Trusted travel and visa partners who help us process your bookings</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
                <span>Airlines, hotels, and tour operators as needed to fulfill your request</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
                <span>Payment gateways for secure transaction processing</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
                <span>Government authorities (if required for visa or compliance purposes)</span>
              </li>
            </ul>
            <div className="bg-black p-4 rounded-xl text-white mt-4">
              <p className="font-semibold Poppins flex items-center gap-2">
                <Shield className="w-5 h-5" />
                We never sell your data to third parties for marketing or unrelated purposes.
              </p>
            </div>
          </div>

          {/* Section 4: Data Security */}
          <div className="mb-12 bg-gray-50 p-8 rounded-xl border">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-black p-3 rounded-full">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold GeistBlack text-gray-900">
                4. Data Security
              </h2>
            </div>
            <p className="text-gray-700 Poppins text-lg">
              We take appropriate measures to protect your information from unauthorized access, alteration, disclosure, or
              destruction. All sensitive data is transmitted through secure (SSL) connections and stored safely.
            </p>
          </div>

          {/* Section 5: Cookies */}
          <div className="mb-12 bg-gray-50 p-8 rounded-xl border">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-black p-3 rounded-full">
                <Cookie className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold GeistBlack text-gray-900">
                5. Cookies
              </h2>
            </div>
            <p className="text-gray-700 Poppins text-lg">
              Our website uses cookies to improve user experience, analyze traffic, and personalize content. You can control or
              disable cookies in your browser settings.
            </p>
          </div>

          {/* Section 6: Your Rights */}
          <div className="mb-12 bg-gray-50 p-8 rounded-xl border">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-black p-3 rounded-full">
                <UserCheck className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold GeistBlack text-gray-900">
                6. Your Rights
              </h2>
            </div>
            <p className="text-gray-700 mb-4 Poppins">
              You have the right to:
            </p>
            <ul className="space-y-3 text-gray-700 Poppins mb-4">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
                <span>Request access to your personal information</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
                <span>Ask for corrections or updates to your data</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
                <span>Request deletion of your information (where applicable)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
                <span>Withdraw consent for data use at any time</span>
              </li>
            </ul>
            <div className="bg-white p-4 rounded-xl border mt-4">
              <p className="text-gray-700 Poppins">
                To exercise these rights, please contact us at{" "}
                <a href="mailto:reservation@wwtravels.net" className="text-black hover:text-gray-700 font-semibold underline">
                  reservation@wwtravels.net
                </a>
              </p>
            </div>
          </div>

          {/* Section 7: Third-Party Links */}
          <div className="mb-12 bg-gray-50 p-8 rounded-xl border">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-black p-3 rounded-full">
                <ExternalLink className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold GeistBlack text-gray-900">
                7. Third-Party Links
              </h2>
            </div>
            <p className="text-gray-700 Poppins text-lg">
              Our website may contain links to external sites. We are not responsible for the privacy practices or content of such
              websites.
            </p>
          </div>

          {/* Section 8: Updates to This Policy */}
          <div className="mb-12 bg-gray-50 p-8 rounded-xl border">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-black p-3 rounded-full">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold GeistBlack text-gray-900">
                8. Updates to This Policy
              </h2>
            </div>
            <p className="text-gray-700 Poppins text-lg">
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated date.
            </p>
          </div>

          {/* Section 9: Contact Us */}
          <div className="mb-12 bg-gray-50 p-8 rounded-xl border">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-black p-3 rounded-full">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold GeistBlack text-gray-900">
                9. Contact Us
              </h2>
            </div>
            <p className="text-gray-700 mb-4 Poppins text-lg">
              If you have any questions or concerns about this Privacy Policy or our data handling practices, please contact us:
            </p>
            <div className="bg-white p-6 rounded-xl border space-y-4">
              <div>
                <h3 className="font-bold GeistMedium text-gray-900 mb-2">Wings and Wheels travel and Tourism LLC</h3>
              </div>
              <div className="flex items-start gap-3 text-gray-700 Poppins">
                <span className="text-black font-semibold">📍</span>
                <span>Office no-27, Al Khaimah building, Port Saeed, Deira, Dubai, UAE</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700 Poppins">
                <span className="text-black font-semibold">📧</span>
                <a href="mailto:reservation@wwtravels.net" className="text-black hover:text-gray-700 font-semibold underline">
                  reservation@wwtravels.net
                </a>
              </div>
              <div className="flex items-center gap-3 text-gray-700 Poppins">
                <span className="text-black font-semibold">📞</span>
                <a href="tel:+971547858338" className="hover:text-black">
                  +971 54 785 8338, +971 52 288 0935
                </a>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-black rounded-2xl p-8 text-center text-white">
            <h3 className="text-2xl md:text-3xl font-bold GeistBlack mb-4">
              Ready to Start Your Journey?
            </h3>
            <p className="text-lg mb-6 Poppins text-gray-300">
              Get in touch with us today to plan your next adventure!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/quick-inquiry"
                className="bg-white text-black hover:bg-gray-100 px-8 py-3 rounded-full font-semibold Poppins transition-all duration-300 cursor-pointer transform hover:scale-105"
              >
                Quick Inquiry
              </a>
              <a
                href="/contact"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black px-8 py-3 rounded-full font-semibold Poppins transition-all duration-300 cursor-pointer transform hover:scale-105"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
