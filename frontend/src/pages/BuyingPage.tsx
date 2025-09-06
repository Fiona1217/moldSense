import React from 'react';
import Navigation from '@/components/Navigation';
import BuyingHeroSection from '@/components/buying/BuyingHeroSection';
import KitFeaturesSection from '@/components/buying/KitFeaturesSection';
import HowItWorksSection from '@/components/buying/HowItWorksSection';
import PricingSection from '@/components/buying/PricingSection';
import TrustSection from '@/components/buying/TrustSection';
import BuyingFAQSection from '@/components/buying/BuyingFAQSection';
import BuyingFinalCTASection from '@/components/buying/BuyingFinalCTASection';

const BuyingPage = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <BuyingHeroSection />
      <KitFeaturesSection />
      <HowItWorksSection />
      <PricingSection />
      <TrustSection />
      <BuyingFAQSection />
      <BuyingFinalCTASection />
    </main>
  );
};

export default BuyingPage;