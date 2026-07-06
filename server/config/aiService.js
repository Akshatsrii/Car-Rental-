import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

let ai = null;

if (process.env.GEMINI_API_KEY) {
  try {
    ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    console.log("🤖 New GoogleGenAI (gemini-2.5-flash) SDK initialized successfully.");
  } catch (error) {
    console.error("Failed to initialize GoogleGenAI SDK:", error.message);
  }
} else {
  console.log("ℹ️ GEMINI_API_KEY not found in env. Running chatbot in simulated fallback mode.");
}

// Simulated fallback replies for quick off-line / keyless testing
const simulateChatbotResponse = (message) => {
  const msg = message.toLowerCase();

  if (msg.includes("price") || msg.includes("rate") || msg.includes("fare") || msg.includes("charges") || msg.includes("charge")) {
    return "Our standard pricing structure is:\n- Base Fare: ₹50\n- Per KM Rate: ₹12\n- GST: 5%\nWe also have night rates and surge charges depending on booking hour. I can estimate the fare for you if you tell me the distance!";
  }

  if (msg.includes("book") || msg.includes("rent") || msg.includes("ride") || msg.includes("cab")) {
    return "To book a ride, go to the Home screen, enter your Pickup & Drop address, pick a date & time slot, and click 'Book Ride'! Our system will automatically confirm and assign a driver.";
  }

  if (msg.includes("track") || msg.includes("driver") || msg.includes("where")) {
    return "Once a driver is assigned and trip starts, you will receive driver name, vehicle number, and a real-time Socket.io map link to track their live coordinates directly in your dashboard.";
  }

  if (msg.includes("cancel")) {
    return "Yes, you can cancel any booking before the trip starts. Just go to your 'My Bookings' tab and click 'Cancel Booking'.";
  }

  if (msg.includes("hindi") || msg.includes("namaste") || msg.includes("kaise") || msg.includes("kya")) {
    return "नमस्ते! मैं आपकी कैब बुकिंग में मदद कर सकता हूँ। आप मुझसे कैब की कीमत, बुकिंग प्रक्रिया, या लाइव ट्रैकिंग के बारे में पूछ सकते हैं।";
  }

  return "I am your AI Cab Assistant. I can help you with:\n1. Booking a ride\n2. Fare estimation & pricing questions\n3. Driver status & real-time tracking\n4. Supporting complaints\n\nHow can I help you today?";
};

export const getAIChatbotResponse = async (message, history = []) => {
  if (!ai) {
    return simulateChatbotResponse(message);
  }

  try {
    const SYSTEM_PROMPT = `You are the AI Chatbot for a premium Cab and Ride Booking platform. 
    You help customers book cabs, estimate fares, check pricing rules, track drivers, and escalate issues to admins.
    You support English and Hindi.
    Pricing guidelines: Base fare: ₹50, Per KM: ₹12, GST: 5%.
    Be polite, helpful, and concise.`;

    // Format chat history mapping for contents array (Gemini 2.5 SDK style)
    const contents = [
      {
        role: "user",
        parts: [{ text: SYSTEM_PROMPT }],
      },
      ...history.map((h) => ({
        role: h.role === "user" ? "user" : "model",
        parts: [{ text: h.content }],
      })),
      {
        role: "user",
        parts: [{ text: message }],
      }
    ];

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents,
      config: {
        temperature: 0.7,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Gemini SDK Error:", error);
    return simulateChatbotResponse(message);
  }
};
