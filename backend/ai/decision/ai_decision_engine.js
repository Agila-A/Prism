// backend/ai/ai_decision_engine.js
/**
 * ai_decision_engine: safe gate between AI intent and banking actions.
 * Responsibilities:
 *  - Validate that user is authenticated
 *  - Enforce policy (no voice-only transfers)
 *  - Map intents to internal controllers / queued actions
 *  - Return a decision object describing what should happen
 *
 * NOTE: This file MUST NOT directly perform critical operations without
 * additional confirmation from the user (PIN/biometric/OTP).
 */
const rules = require("./rules_engine");

/**
 * Example handleIntent input:
 * { intent: 'send_money', entities: {amount:'500', payee:'Harish'}, transcript: 'send 500 to harish', user: { id: 'user123' }}
 */
async function handleIntent({ intent, entities, transcript, user }) {
  // Always validate user presence
  if (!user) {
    return {
      permitted: false,
      reason: "unauthenticated",
      message: "You must be logged in to perform this action."
    };
  }

  // Example user object: { id, accountId, authMethods: {biometric: true}, balance: 10000 }
  try {
    // policy checks via rules engine
    const policyOk = rules.checkPolicy(intent, entities, user);
    if (!policyOk.allowed) {
      return {
        permitted: false,
        reason: policyOk.reason,
        message: policyOk.message
      };
    }

    // If the intent is a safe info intent, return allowed + message
    if (intent === "check_balance") {
      // For security, you might not want to read full balance aloud by default
      // This decision engine returns a suggestion; final reading should be gated by user's preference
      return {
        permitted: true,
        action: "read_balance",
        message: `Your savings account balance is ${user.balance || '0.00'}.`,
      };
    }

    if (intent === "send_money") {
      // do not execute money transfer directly. Instead require confirm step.
      return {
        permitted: true,
        action: "request_confirmation",
        message: `I will transfer ₹${entities.amount} to ${entities.payee}. Please confirm with PIN or Face ID.`,
        meta: {
          requires: ["pin", "biometric", "otp"]
        }
      };
    }

    // fallback
    return {
      permitted: false,
      reason: "unsupported_intent",
      message: `I detected do do intent '${intent}' which is not supported for auto-execution.`
    };
  } catch (err) {
    return {
      permitted: false,
      reason: "error",
      message: `Decision error: ${err.message}`
    };
  }
}

module.exports = { handleIntent };
