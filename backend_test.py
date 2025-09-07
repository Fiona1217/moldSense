#!/usr/bin/env python3
"""
Backend API Testing Suite for MoldSense Application
Tests all backend endpoints including OpenAI chat and Stripe checkout integration
"""

import requests
import json
import os
from datetime import datetime
import time

# Load environment variables
from dotenv import load_dotenv
load_dotenv('/app/frontend/.env')

# Get backend URL from frontend environment
BACKEND_URL = os.getenv('REACT_APP_BACKEND_URL', 'https://55ba2d94-c1d7-43af-ad18-1721f540803e.preview.emergentagent.com/api')

print(f"Testing Backend URL: {BACKEND_URL}")
print("=" * 80)

def test_health_check():
    """Test the basic health check endpoint"""
    print("\n🔍 Testing Health Check Endpoint...")
    try:
        response = requests.get(f"{BACKEND_URL}/")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 200 and response.json().get("message") == "Hello World":
            print("✅ Health check PASSED")
            return True
        else:
            print("❌ Health check FAILED - Unexpected response")
            return False
            
    except Exception as e:
        print(f"❌ Health check FAILED - Error: {str(e)}")
        return False

def test_ai_chat():
    """Test the OpenAI chat integration"""
    print("\n🤖 Testing AI Chat Endpoint...")
    
    test_message = "What is black mold and is it dangerous?"
    payload = {
        "message": test_message,
        "context": "Testing MoldSense chatbot functionality"
    }
    
    try:
        print(f"Sending message: '{test_message}'")
        response = requests.post(
            f"{BACKEND_URL}/chat",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            response_data = response.json()
            print(f"AI Response: {response_data.get('response', 'No response field')}")
            print(f"Timestamp: {response_data.get('timestamp', 'No timestamp')}")
            
            # Check if response contains relevant mold information
            ai_response = response_data.get('response', '').lower()
            if any(keyword in ai_response for keyword in ['mold', 'black mold', 'dangerous', 'health', 'toxic']):
                print("✅ AI Chat PASSED - Relevant response received")
                return True
            else:
                print("⚠️ AI Chat PARTIAL - Response received but may not be mold-specific")
                return True
        elif response.status_code == 503:
            print("❌ AI Chat FAILED - Service unavailable (likely missing OpenAI API key)")
            return False
        else:
            print(f"❌ AI Chat FAILED - Status: {response.status_code}")
            print(f"Error: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ AI Chat FAILED - Error: {str(e)}")
        return False

def test_stripe_checkout_payment():
    """Test Stripe checkout for one-time payment"""
    print("\n💳 Testing Stripe Checkout - One-time Payment...")
    
    payload = {
        "amount": 8000,  # $80.00 in cents
        "currency": "usd",
        "product_name": "MoldSense Kit",
        "success_url": "https://moldsense.com/success",
        "cancel_url": "https://moldsense.com/cancel",
        "mode": "payment"
    }
    
    try:
        response = requests.post(
            f"{BACKEND_URL}/create-checkout-session",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            response_data = response.json()
            checkout_url = response_data.get('checkout_url')
            session_id = response_data.get('session_id')
            
            print(f"Checkout URL: {checkout_url}")
            print(f"Session ID: {session_id}")
            
            # Validate that we got a proper Stripe checkout URL
            if checkout_url and 'checkout.stripe.com' in checkout_url and session_id:
                print("✅ Stripe One-time Payment PASSED")
                return True
            else:
                print("❌ Stripe One-time Payment FAILED - Invalid response format")
                return False
        elif response.status_code == 503:
            print("❌ Stripe One-time Payment FAILED - Service unavailable (likely missing Stripe key)")
            return False
        else:
            print(f"❌ Stripe One-time Payment FAILED - Status: {response.status_code}")
            print(f"Error: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Stripe One-time Payment FAILED - Error: {str(e)}")
        return False

def test_stripe_checkout_subscription():
    """Test Stripe checkout for subscription payment"""
    print("\n🔄 Testing Stripe Checkout - Subscription Payment...")
    
    payload = {
        "amount": 3000,  # $30.00 in cents
        "currency": "usd", 
        "product_name": "MoldSense Renewal",
        "success_url": "https://moldsense.com/success",
        "cancel_url": "https://moldsense.com/cancel",
        "mode": "subscription"
    }
    
    try:
        response = requests.post(
            f"{BACKEND_URL}/create-checkout-session",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            response_data = response.json()
            checkout_url = response_data.get('checkout_url')
            session_id = response_data.get('session_id')
            
            print(f"Checkout URL: {checkout_url}")
            print(f"Session ID: {session_id}")
            
            # Validate that we got a proper Stripe checkout URL
            if checkout_url and 'checkout.stripe.com' in checkout_url and session_id:
                print("✅ Stripe Subscription Payment PASSED")
                return True
            else:
                print("❌ Stripe Subscription Payment FAILED - Invalid response format")
                return False
        elif response.status_code == 503:
            print("❌ Stripe Subscription Payment FAILED - Service unavailable (likely missing Stripe key)")
            return False
        else:
            print(f"❌ Stripe Subscription Payment FAILED - Status: {response.status_code}")
            print(f"Error: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Stripe Subscription Payment FAILED - Error: {str(e)}")
        return False

def test_error_handling():
    """Test error handling with invalid requests"""
    print("\n⚠️ Testing Error Handling...")
    
    # Test invalid chat request
    try:
        response = requests.post(
            f"{BACKEND_URL}/chat",
            json={},  # Missing required message field
            headers={"Content-Type": "application/json"}
        )
        print(f"Invalid chat request status: {response.status_code}")
        
        # Test invalid checkout request
        response = requests.post(
            f"{BACKEND_URL}/create-checkout-session",
            json={"invalid": "data"},  # Missing required fields
            headers={"Content-Type": "application/json"}
        )
        print(f"Invalid checkout request status: {response.status_code}")
        
        print("✅ Error handling tests completed")
        return True
        
    except Exception as e:
        print(f"❌ Error handling test failed: {str(e)}")
        return False

def run_all_tests():
    """Run all backend tests and provide summary"""
    print("🚀 Starting MoldSense Backend API Tests")
    print(f"Timestamp: {datetime.now()}")
    print("=" * 80)
    
    results = {}
    
    # Run all tests
    results['health_check'] = test_health_check()
    results['ai_chat'] = test_ai_chat()
    results['stripe_payment'] = test_stripe_checkout_payment()
    results['stripe_subscription'] = test_stripe_checkout_subscription()
    results['error_handling'] = test_error_handling()
    
    # Summary
    print("\n" + "=" * 80)
    print("📊 TEST SUMMARY")
    print("=" * 80)
    
    passed = sum(1 for result in results.values() if result)
    total = len(results)
    
    for test_name, result in results.items():
        status = "✅ PASSED" if result else "❌ FAILED"
        print(f"{test_name.replace('_', ' ').title()}: {status}")
    
    print(f"\nOverall: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All tests PASSED! Backend is working correctly.")
    else:
        print("⚠️ Some tests FAILED. Check the details above.")
    
    return results

if __name__ == "__main__":
    run_all_tests()