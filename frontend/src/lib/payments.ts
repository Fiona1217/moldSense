import { loadStripe } from '@stripe/stripe-js';
import { createCheckoutSession, CheckoutRequest } from './api';

// Initialize Stripe
const getStripe = () => {
  const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
  return loadStripe(publishableKey);
};

export const initiatePayment = async (
  productName: string,
  amount: number, // in cents
  mode: 'payment' | 'subscription' = 'payment'
) => {
  try {
    const stripe = await getStripe();
    if (!stripe) {
      throw new Error('Stripe is not properly initialized');
    }

    // Get current URL for success/cancel redirects
    const currentUrl = window.location.origin;
    
    const checkoutRequest: CheckoutRequest = {
      amount,
      currency: 'usd',
      product_name: productName,
      success_url: `${currentUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${currentUrl}/buy?canceled=true`,
      mode
    };

    // Create checkout session
    const { checkout_url } = await createCheckoutSession(checkoutRequest);

    // Redirect to Stripe Checkout
    window.location.href = checkout_url;
    
  } catch (error) {
    console.error('Error initiating payment:', error);
    alert('Failed to start payment process. Please try again.');
  }
};

// Predefined payment functions
export const buyMoldSenseKit = () => {
  return initiatePayment('MoldSense Detection Kit', 8000, 'payment'); // $80.00
};

export const subscribeMoldSense = () => {
  return initiatePayment('MoldSense Protection Renewal', 3000, 'subscription'); // $30.00 every 4 months
};