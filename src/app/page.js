import React, { lazy, Suspense } from 'react';
import Navbar from './reusable/navbar';

// Lazy load components to improve initial load time
const Header = lazy(() => import('./sections/header'));
const Service = lazy(() => import('./sections/services'));
const Popular = lazy(() => import('./sections/popular'));
const Chooseus = lazy(() => import('./sections/chooseus'));
const Review = lazy(() => import('./sections/review'));
const Brands = lazy(() => import('./sections/brands'));
const Beforego = lazy(() => import('./sections/beforego'));
const Footer = lazy(() => import('./reusable/footer'));
const FAQ = lazy(() => import('./sections/faq'));

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center py-12">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
  </div>
);

const Home = () => {
  return (
    <div className="bg-white">
      <Navbar />
      
      <Suspense fallback={<LoadingSpinner />}>
        <Header />
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <Service />
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <Popular />
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <Chooseus />
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <Review />
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <Brands />
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <Beforego />
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <FAQ />
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <Footer />
      </Suspense>
    </div>
  );
}

export default Home;