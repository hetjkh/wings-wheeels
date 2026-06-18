import React from "react";
import Link from "next/link";
import Image from "next/image";

const paylater = () => {
  return (
    <section id="pay-later" className="w-full bg-gray-50 py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header — matches other sections */}
        <div className="mb-12 lg:mb-16 text-center max-w-3xl mx-auto">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4 GeistBold text-gray-900">
            PAY LATER, FLY SOONER
          </h2>
          <p className="text-sm lg:text-base text-gray-700 leading-relaxed Poppins">
            Book your flight tickets today and spread the cost over easy,
            interest-free installments with Tabby and Tamara. No waiting—secure
            your seat now and pay at your own pace.
          </p>
        </div>

        {/* Partner logos */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 mb-14">
          <div className="w-full sm:w-auto sm:flex-1 max-w-sm">
            <Image
              src="/assets/Tabby.png"
              alt="Tabby - Buy Now Pay Later"
              width={400}
              height={120}
              className="w-full h-auto rounded-2xl"
            />
          </div>

          <div className="hidden sm:block w-px h-20 bg-gray-300" />
          <div className="sm:hidden w-24 h-px bg-gray-300" />

          <div className="w-full sm:w-auto sm:flex-1 max-w-sm">
            <Image
              src="/assets/Tamara-En.png"
              alt="Tamara - Buy Now Pay Later"
              width={400}
              height={120}
              className="w-full h-auto rounded-2xl"
            />
          </div>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mb-12 max-w-4xl mx-auto">
          {[
            {
              title: "Book Today",
              text: "Reserve your domestic or international flight tickets instantly.",
            },
            {
              title: "Pay in 4",
              text: "Split the total into four simple, interest-free payments.",
            },
            {
              title: "Travel Worry-Free",
              text: "Quick approval, secure checkout, and full transparency.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white p-6 rounded-2xl border border-gray-100 text-center"
            >
              <h3 className="text-sm font-bold text-gray-900 mb-2 GeistBold">
                {item.title}
              </h3>
              <p className="text-xs text-gray-600 Poppins leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/contact"
            className="inline-block Poppins bg-black text-white hover:bg-gray-800 px-8 py-3 rounded-full text-sm font-medium transition-all duration-300"
          >
            BOOK YOUR TICKETS
          </Link>
          <p className="mt-4 text-xs text-gray-500 Poppins">
            Ask us about paying with Tabby or Tamara when you book.
          </p>
        </div>
      </div>
    </section>
  );
};

export default paylater;
