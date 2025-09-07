import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Check, Package, Repeat } from 'lucide-react';
import { buyMoldSenseKit, subscribeMoldSense } from '@/lib/payments';

const PricingSection = () => {
  const [selectedPlan, setSelectedPlan] = useState('one-time');

  const kitIncludes = [
    "Professional grade swabs",
    "Sterile petri dishes", 
    "Safety gloves included",
    "Detailed instruction manual",
    "QR code for app access",
    "Lifetime app access"
  ];

  const renewalIncludes = [
    "Fresh kit every 4 months",
    "All premium kit contents",
    "Priority customer support",
    "App updates and new features", 
    "Cancel anytime",
    "50% savings vs individual kits"
  ];

  return (
    <section className="py-24 gradient-section">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Choose Your <span className="text-highlight-green">Protection Plan</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get everything you need to protect your home from dangerous mold.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto animate-fade-in-up animation-delay-200">
          {/* One-Time Purchase */}
          <div 
            className={`relative bg-card/50 backdrop-blur-sm p-8 rounded-lg border-2 transition-smooth cursor-pointer ${
              selectedPlan === 'one-time' 
                ? 'border-highlight-green shadow-glow' 
                : 'border-border/50 hover:border-highlight-green/50'
            }`}
            onClick={() => setSelectedPlan('one-time')}
          >
            {selectedPlan === 'one-time' && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-highlight-green text-dark px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </div>
            )}
            
            <div className="text-center mb-8">
              <Package className="w-12 h-12 text-highlight-green mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-2">Complete Detection Kit</h3>
              <div className="text-5xl font-bold text-highlight-green mb-2">$80</div>
              <p className="text-muted-foreground">One-time purchase</p>
            </div>

            <div className="space-y-4 mb-8">
              {kitIncludes.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-highlight-green mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>

            <Button 
              variant={selectedPlan === 'one-time' ? 'hero' : 'secondary-outline'} 
              size="lg" 
              className="w-full"
              onClick={buyMoldSenseKit}
            >
              Buy Now - $80
            </Button>
          </div>

          {/* Subscription Plan */}
          <div 
            className={`relative bg-card/50 backdrop-blur-sm p-8 rounded-lg border-2 transition-smooth cursor-pointer ${
              selectedPlan === 'subscription' 
                ? 'border-highlight-green shadow-glow' 
                : 'border-border/50 hover:border-highlight-green/50'
            }`}
            onClick={() => setSelectedPlan('subscription')}
          >
            <div className="text-center mb-8">
              <Repeat className="w-12 h-12 text-highlight-green mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-2">Protection Renewal</h3>
              <div className="text-5xl font-bold text-highlight-green mb-2">$30</div>
              <p className="text-muted-foreground">Every 4 months</p>
            </div>

            <div className="space-y-4 mb-8">
              {renewalIncludes.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-highlight-green mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>

            <Button 
              variant={selectedPlan === 'subscription' ? 'hero' : 'secondary-outline'} 
              size="lg" 
              className="w-full"
            >
              Subscribe - $30/4 months
            </Button>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="text-center mt-12 animate-fade-in-up animation-delay-400">
          <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-highlight-green rounded-full flex items-center justify-center">
                <span className="text-dark text-xs">✓</span>
              </div>
              <span>30-day money-back guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-highlight-green rounded-full flex items-center justify-center">
                <span className="text-dark text-xs">✓</span>
              </div>
              <span>Free shipping nationwide</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-highlight-green rounded-full flex items-center justify-center">
                <span className="text-dark text-xs">✓</span>
              </div>
              <span>Expert support included</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;