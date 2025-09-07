from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
from datetime import datetime
import openai
import stripe

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# OpenAI configuration (template - requires API key)
openai_api_key = os.environ.get('OPENAI_API_KEY')
if openai_api_key:
    openai.api_key = openai_api_key

# Stripe configuration
stripe_secret_key = os.environ.get('STRIPE_SECRET_KEY')
if stripe_secret_key:
    stripe.api_key = stripe_secret_key

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

class ChatMessage(BaseModel):
    message: str
    context: Optional[str] = None

class ChatResponse(BaseModel):
    response: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class CheckoutRequest(BaseModel):
    price_id: Optional[str] = None
    amount: Optional[int] = None  # in cents
    currency: str = "usd"
    product_name: str
    success_url: str
    cancel_url: str
    mode: str = "payment"  # "payment" or "subscription"

class CheckoutResponse(BaseModel):
    checkout_url: str
    session_id: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

@api_router.post("/chat", response_model=ChatResponse)
async def chat_with_ai(chat_message: ChatMessage):
    """
    AI Chatbot endpoint for MoldSense assistance
    Requires OPENAI_API_KEY environment variable to be set
    """
    if not openai_api_key:
        raise HTTPException(
            status_code=503, 
            detail="AI chatbot is not configured. Please set OPENAI_API_KEY environment variable."
        )
    
    try:
        # Create a system prompt for the MoldSense assistant
        system_prompt = """You are a helpful AI assistant for MoldSense, a mold detection app and kit service. 
        You help users with:
        - Questions about mold identification and health risks
        - How to use the MoldSense kit and app
        - Information about pricing ($80 one-time kit, $30/4-month subscription)
        - Guidance on when to seek professional help
        - General mold prevention and safety tips
        
        Be friendly, informative, and always prioritize user safety. If asked about serious health concerns, 
        recommend consulting with healthcare professionals or certified mold remediation experts."""
        
        response = openai.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": chat_message.message}
            ],
            max_tokens=500,
            temperature=0.7
        )
        
        ai_response = response.choices[0].message.content
        
        # Store conversation in database (optional)
        chat_record = {
            "id": str(uuid.uuid4()),
            "user_message": chat_message.message,
            "ai_response": ai_response,
            "context": chat_message.context,
            "timestamp": datetime.utcnow()
        }
        await db.chat_conversations.insert_one(chat_record)
        
        return ChatResponse(response=ai_response)
        
    except Exception as e:
        logger.error(f"Error in chat endpoint: {str(e)}")
        raise HTTPException(
            status_code=500, 
            detail="Sorry, I'm having trouble thinking right now. Please try again in a moment."
        )

@api_router.post("/create-checkout-session", response_model=CheckoutResponse)
async def create_checkout_session(checkout_request: CheckoutRequest):
    """
    Create a Stripe Checkout session for payment
    """
    if not stripe_secret_key:
        raise HTTPException(
            status_code=503,
            detail="Payment processing is not configured. Please set STRIPE_SECRET_KEY environment variable."
        )
    
    try:
        if checkout_request.mode == "subscription":
            # For subscription payments, we need to create a price first or use existing price_id
            if not checkout_request.price_id:
                # Create a recurring price for subscription
                price = stripe.Price.create(
                    unit_amount=checkout_request.amount,
                    currency=checkout_request.currency,
                    recurring={"interval": "month", "interval_count": 4},  # Every 4 months
                    product_data={
                        "name": checkout_request.product_name,
                    },
                )
                price_id = price.id
            else:
                price_id = checkout_request.price_id
                
            checkout_session = stripe.checkout.Session.create(
                line_items=[{
                    'price': price_id,
                    'quantity': 1,
                }],
                mode=checkout_request.mode,
                success_url=checkout_request.success_url,
                cancel_url=checkout_request.cancel_url,
            )
        else:
            # One-time payment
            checkout_session = stripe.checkout.Session.create(
                line_items=[{
                    'price_data': {
                        'currency': checkout_request.currency,
                        'product_data': {
                            'name': checkout_request.product_name,
                        },
                        'unit_amount': checkout_request.amount,
                    },
                    'quantity': 1,
                }],
                mode=checkout_request.mode,
                success_url=checkout_request.success_url,
                cancel_url=checkout_request.cancel_url,
            )

        # Store checkout session in database for tracking
        checkout_record = {
            "id": str(uuid.uuid4()),
            "session_id": checkout_session.id,
            "amount": checkout_request.amount,
            "currency": checkout_request.currency,
            "product_name": checkout_request.product_name,
            "mode": checkout_request.mode,
            "status": "pending",
            "timestamp": datetime.utcnow()
        }
        await db.checkout_sessions.insert_one(checkout_record)

        return CheckoutResponse(
            checkout_url=checkout_session.url,
            session_id=checkout_session.id
        )

    except Exception as e:
        logger.error(f"Error creating checkout session: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Failed to create checkout session. Please try again."
        )

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=[
        "https://moldsense.netlify.app",
        "https://api.moldsense.com",
        "http://localhost:3000",  # For local development
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

if __name__ == "__main__":
    import uvicorn
    import os
    
    # Railway provides PORT environment variable
    port = int(os.environ.get("PORT", 8000))
    
    uvicorn.run(
        "server:app",
        host="0.0.0.0",
        port=port,
        reload=False  # Set to False for production
    )