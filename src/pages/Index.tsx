import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import CredibilitySection from "@/components/CredibilitySection";
import AudienceSection from "@/components/AudienceSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import FinalCTASection from "@/components/FinalCTASection";


import React, { useState } from "react";

const Index = () => {
  const [pingResult, setPingResult] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const testBackendConnection = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:5000/api/ping");
      const data = await res.json();
      setPingResult(data.message);
    } catch (err) {
      setPingResult("Error connecting to backend");
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-background">
      <button
        onClick={testBackendConnection}
        className="px-4 py-2 bg-blue-600 text-white rounded mb-4"
        disabled={loading}
      >
        {loading ? "Testing..." : "Test Backend Connection"}
      </button>
      {pingResult && (
        <div className="mb-4 text-green-700">Backend says: {pingResult}</div>
      )}
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <CredibilitySection />
      <AudienceSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <FAQSection />
      <FinalCTASection />
    </main>
  );
};

export default Index;
