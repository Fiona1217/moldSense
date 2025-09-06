import React from 'react';
import Navigation from '@/components/Navigation';
import BuyingHeroSection from '@/components/buying/BuyingHeroSection';
import PricingSection from '@/components/buying/PricingSection';
import BuyingFinalCTASection from '@/components/buying/BuyingFinalCTASection';

const BuyingPage = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <BuyingHeroSection />
      <PricingSection />
      <BuyingFinalCTASection />
    </main>
  );
};

export default BuyingPage;