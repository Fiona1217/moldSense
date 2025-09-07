// API utility functions

const getBackendUrl = (): string => {
  return import.meta.env.REACT_APP_BACKEND_URL || process.env.REACT_APP_BACKEND_URL || '';
};

export const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const backendUrl = getBackendUrl();
  const url = `${backendUrl}${endpoint}`;
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  const response = await fetch(url, mergedOptions);
  
  if (!response.ok) {
    throw new Error(`API call failed: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
};

// Specific API functions
export const chatWithAI = async (message: string, context?: string) => {
  return apiCall('/chat', {
    method: 'POST',
    body: JSON.stringify({
      message,
      context: context || 'mold-detection-assistant'
    }),
  });
};

export interface CheckoutRequest {
  price_id?: string;
  amount?: number; // in cents
  currency: string;
  product_name: string;
  success_url: string;
  cancel_url: string;
  mode: 'payment' | 'subscription';
}

export const createCheckoutSession = async (checkoutRequest: CheckoutRequest) => {
  return apiCall('/create-checkout-session', {
    method: 'POST',
    body: JSON.stringify(checkoutRequest),
  });
};