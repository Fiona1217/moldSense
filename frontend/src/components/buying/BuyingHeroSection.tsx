import React from 'react';
import { Button } from "@/components/ui/button";
import moldSenseLogo from "@/assets/moldsense-logo.jpg";
import phoneMockup from "@/assets/phone-mockup.jpg";

const BuyingHeroSection = () => {
  return (
    <section className="min-h-screen gradient-hero flex items-center justify-center px-4 pt-16">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left space-y-8">
            {/* Logo */}
            <div className="flex justify-center lg:justify-start">
              <img 
                src={moldSenseLogo} 
                alt="MoldSense" 
                className="h-16 w-auto"
              />
            </div>
            
            {/* Headlines */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-foreground">Your All-in-One</span>
                <br />
                <span className="text-highlight-green">Mold Detection Solution</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl">
                Order your kit today and start scanning with the companion app.
              </p>
            </div>
            
            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="hero" size="xl" className="min-w-48">
                Pre-Order Your Kit
              </Button>
              <Button variant="secondary-outline" size="xl">
                Download App
              </Button>
            </div>
          </div>
          
          {/* Product Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <img 
                src={phoneMockup} 
                alt="MoldSense Kit and App" 
                className="w-full max-w-md h-auto shadow-card transform hover:scale-105 transition-smooth"
              />
              {/* Kit mockup could be added here in the future */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuyingHeroSection;