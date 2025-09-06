import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import moldSenseLogo from "@/assets/moldsense-logo.jpg";
import ImageCarousel from "@/components/ImageCarousel";

const HeroSection = () => {
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
                <span className="text-foreground">Breathe Safe.</span>
                <br />
                <span className="text-highlight-green">Live Clean.</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl">
                AI-powered mold detection that tells you what's dangerous and what's not.
              </p>
            </div>
            
            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/buy">
                <Button variant="hero" size="xl" className="min-w-48">
                  Pre-order Your Kit
                </Button>
              </Link>
              <Button 
                variant="secondary-outline" 
                size="xl"
                onClick={() => {
                  document.getElementById('solution-section')?.scrollIntoView({ 
                    behavior: 'smooth' 
                  });
                }}
              >
                Learn More
              </Button>
            </div>
          </div>
          
          {/* Image Carousel */}
          <div className="flex justify-center lg:justify-end">
            <ImageCarousel />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;