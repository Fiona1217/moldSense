const CredibilitySection = () => {
  const comparisons = [
    {
      feature: "Time to Results",
      amazon: "3-7 days",
      sporeGuard: "Instant"
    },
    {
      feature: "Cost per Test",
      amazon: "$25-50",
      sporeGuard: "$9.99"
    },
    {
      feature: "Expert Analysis",
      amazon: "Basic lab report",
      sporeGuard: "AI + Expert database"
    },
    {
      feature: "Risk Assessment", 
      amazon: "Species only",
      sporeGuard: "Health impact & next steps"
    },
    {
      feature: "Local Expert Network",
      amazon: "None",
      sporeGuard: "GPS-integrated"
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Backed by <span className="text-highlight-green">science and experts</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our AI is trained on hundreds of mold databases, reviewed by experts, and designed to save you money compared to traditional test kits.
          </p>
        </div>
        
        {/* Comparison Table */}
        <div className="bg-card rounded-xl shadow-card overflow-hidden">
          <div className="grid grid-cols-3 bg-muted/50">
            <div className="p-6">
              <h3 className="font-semibold text-foreground">Feature</h3>
            </div>
            <div className="p-6 border-l border-border">
              <h3 className="font-semibold text-muted-foreground">Amazon Kit</h3>
            </div>
            <div className="p-6 border-l border-border">
              <h3 className="font-semibold text-highlight-green">SporeGuard</h3>
            </div>
          </div>
          
          {comparisons.map((comparison, index) => (
            <div key={index} className={`grid grid-cols-3 ${index % 2 === 0 ? 'bg-card' : 'bg-muted/30'}`}>
              <div className="p-6">
                <span className="font-medium text-foreground">{comparison.feature}</span>
              </div>
              <div className="p-6 border-l border-border">
                <span className="text-muted-foreground">{comparison.amazon}</span>
              </div>
              <div className="p-6 border-l border-border">
                <span className="text-highlight-green font-semibold">{comparison.sporeGuard}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-highlight-green rounded-full"></div>
              <span>Trained on 500+ mold databases</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-highlight-green rounded-full"></div>
              <span>Expert mycologist reviewed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-highlight-green rounded-full"></div>
              <span>FDA-compliant processes</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CredibilitySection;