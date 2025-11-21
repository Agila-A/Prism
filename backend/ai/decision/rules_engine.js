// backend/ai/rules_engine.js
/**
 * Small, testable rules engine for decision gating.
 * This should be expanded into policy definitions (RBAC, FRAUD rules).
 */
function checkPolicy(intent, entities, user) {
  // Example policies:
  // - No unauthenticated users (handled upstream)
  // - Transfers > LIMIT require extra verification
  // - Beneficiary must exist for transfers
  // - Voice-only commands cannot perform money transfer (must require explicit confirm)
  const MAX_VOICE_TRANSFER = 2000; // rupees - demo value

  if (intent === "send_money") {
    const amount = Number(entities.amount || 0);
    if (!amount || amount <= 0) {
      return { allowed: false, reason: "invalid_amount", message: "Invalid transfer amount." };
    }
    // require beneficiary presence - simple check
    if (!entities.payee || entities.payee.length < 2) {
      return { allowed: false, reason: "unknown_payee", message: "Beneficiary not recognized." };
    }
    // limit for full voice flows
    if (amount > MAX_VOICE_TRANSFER) {
      return {
        allowed: false,
        reason: "exceeds_voice_limit",
        message: `Voice-initiated transfers are limited to ₹${MAX_VOICE_TRANSFER}. Please confirm via app.`
      };
    }
    // beneficiary check: demo only; in real app, check DB
    // assume user.beneficiaries is an array
    const beneficiaryExists = Array.isArray(user.beneficiaries) && user.beneficiaries.includes(entities.payee.toLowerCase());
    if (!beneficiaryExists) {
      return {
        allowed: false,
        reason: "beneficiary_missing",
        message: `The payee ${entities.payee} is not in your beneficiaries. Add them first.`
      };
    }
    // basic pass
    return { allowed: true };
  }

  // For balance checks, allow
  if (intent === "check_balance") {
    return { allowed: true };
  }

  return { allowed: false, reason: "intent_forbidden", message: "This action cannot be performed by voice." };
}

module.exports = { checkPolicy };
