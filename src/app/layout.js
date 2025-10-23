import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import ClientLayout from "./ClientLayout";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
}); 

export const metadata = {
  title: "Wings & Wheels Travel and Tourism | Seamless Travel Experiences",
  description:
    "Wings & Wheels Travel and Tourism in Dubai and Abu Dhabi offers air tickets, visas, hotel bookings, tour packages, insurance, transfers, and 24/7 support. Stress-free, secure, and tailored travel experiences just for you.",
  icons: {
    icon: "/favicon.png",       // Default favicon
    shortcut: "/favicon.png",   // For older browsers
    apple: "/favicon.png", 
  },
    keywords: [
    "Wings & Wheels Travel",
    "Dubai travel agency",
    "Abu Dhabi travel agency",
    "Air tickets Dubai",
    "Visa assistance UAE",
    "Tour packages UAE",
    "Hotel reservations Dubai",
    "Travel insurance UAE",
    "Airport transfers Dubai",
    "Custom itineraries UAE",
  ],
  authors: [{ name: "Wings & Wheels Travel and Tourism" }],
  creator: "Wings & Wheels Travel and Tourism",
  publisher: "Wings & Wheels Travel and Tourism",
  openGraph: {
    title: "Wings & Wheels Travel and Tourism",
    description:
      "We provide seamless, secure, and stress-free travel experiences tailored for you. From air tickets and visas to hotels and tour packages—your next adventure starts here.",
    url: "https://wwtravels.net", // replace with your real domain
    siteName: "Wings & Wheels Travel and Tourism",
    images: [
      {
        url: "/og-image.jpg", // add your logo/banner
        width: 1200,
        height: 630,
        alt: "Wings & Wheels Travel",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wings & Wheels Travel and Tourism",
    description:
      "Your trusted partner for stress-free travel in Dubai & Abu Dhabi. Air tickets, visas, hotels, tours, insurance & more.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://wwtravels.net", // replace with real domain
  },
  other: {
    "application-name": "Wings & Wheels Travel",
    "msapplication-TileColor": "#ffffff",
    "theme-color": "#ffffff",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        {/* Facebook Domain Verification */}
        <meta name="facebook-domain-verification" content="e62q9undb0swxzo77yppxzybvllqdc" />
        
        {/* Meta Pixel Code - No Script Fallback */}
        <noscript>
          <img 
            height="1" 
            width="1" 
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=824744313750053&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
      <body className="bg-background font-sans antialiased">
        {/* Meta Pixel Code */}
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '824744313750053');
              fbq('track', 'PageView');
            `,
          }}
        />
        
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}