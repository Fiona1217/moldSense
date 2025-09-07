import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { CheckCircle, Package, Mail } from 'lucide-react';
import Navigation from '@/components/Navigation';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [customerEmail, setCustomerEmail] = useState('');

  useEffect(() => {
    // In a real app, you'd verify the session with your backend here
    // For now, we'll just show the success message
    console.log('Payment successful! Session ID:', sessionId);
  }, [sessionId]);

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="container mx-auto max-w-2xl px-4">
          <div className="text-center space-y-8 animate-fade-in-up">
            {/* Success Icon */}
            <div className="flex justify-center">
              <div className="w-24 h-24 bg-highlight-green rounded-full flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-dark" />
              </div>
            </div>

            {/* Success Message */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                Payment <span className="text-highlight-green">Successful!</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Thank you for your purchase. Your MoldSense kit is on its way!
              </p>
            </div>

            {/* What's Next */}
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-8 text-left space-y-6">
              <h2 className="text-2xl font-bold text-foreground text-center mb-6">What happens next?</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-highlight-green rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Mail className="w-4 h-4 text-dark" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Confirmation Email</h3>
                    <p className="text-muted-foreground">You'll receive a confirmation email with your order details and tracking information.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-highlight-green rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Package className="w-4 h-4 text-dark" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Kit Shipping</h3>
                    <p className="text-muted-foreground">Your MoldSense detection kit will ship within 2-3 business days via free shipping.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-highlight-green rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-dark text-sm font-bold">?</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Expert Support</h3>
                    <p className="text-muted-foreground">Our team will contact you within 24 hours to schedule your complimentary setup call.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" asChild>
                <Link to="/">Return to Home</Link>
              </Button>
              <Button variant="secondary-outline" size="lg" asChild>
                <Link to="/support">Contact Support</Link>
              </Button>
            </div>

            {/* Session Info (for development) */}
            {sessionId && (
              <div className="mt-8 p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Order ID: <span className="font-mono">{sessionId}</span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default PaymentSuccess;