import logger from "../utils/logger.js";

/**
 * AI-Based Fraud Detection Rule Engine
 * Analyzes ride parameters to flags anomalies, route hacks, or suspicious payments.
 */
export const checkBookingFraud = (bookingData) => {
  const { pickupAddress, dropAddress, distance, price } = bookingData;
  const flags = [];

  // Rule 1: Identical Pickup & Drop Locations
  if (pickupAddress.toLowerCase().trim() === dropAddress.toLowerCase().trim()) {
    flags.push("IDENTICAL_LOCATIONS");
  }

  // Rule 2: Exceptionally high distance (Single cab route > 150KM)
  if (distance > 150) {
    flags.push("EXCESSIVE_DISTANCE");
  }

  // Rule 3: Extreme Fare Price (Potential transaction laundering)
  if (price > 10000) {
    flags.push("SUSPICIOUS_FARE_PRICE");
  }

  const isSuspicious = flags.length > 0;

  if (isSuspicious) {
    logger.warn(`⚠️ Fraud Engine Alert: Suspicious booking flagged! Flags: ${flags.join(", ")}`);
  }

  return {
    isSuspicious,
    flags,
    riskScore: flags.length * 30, // Score out of 100
  };
};
