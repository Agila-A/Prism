# backend/ai/nlp/inference.py
"""
Load the trained model and expose predict_intent_from_text(text)
Also include a simple entity extractor (amount, beneficiary name).
"""
import joblib
import re
from pathlib import Path
import logging
from typing import Tuple, Dict

logger = logging.getLogger("nlp_inference")

BASE = Path(__file__).resolve().parent.parent
MODEL_PATH = BASE / "models" / "intent_model.joblib"

_model = None

def _load_model():
    global _model
    if _model is None:
        if MODEL_PATH.exists():
            _model = joblib.load(str(MODEL_PATH))
            logger.info("Intent model loaded from %s", MODEL_PATH)
        else:
            logger.warning("Intent model not found at %s. Inference will use rules.", MODEL_PATH)
            _model = None
    return _model

def extract_entities(text: str) -> Dict[str, str]:
    """
    Basic entity rules:
      - amount: look for currency symbols and numbers
      - payee: name following 'to' or 'pay'
    """
    entities = {}
    # Amount: look for ₹, rs, rupees, or trailing numbers
    m = re.search(r"(?:₹|rs\.?|rupees?)\s*([0-9]+(?:[.,][0-9]{1,2})?)", text, flags=re.I)
    if not m:
        # fallback: look for standalone numbers
        m = re.search(r"\b([0-9]{2,7}(?:[.,][0-9]{1,2})?)\b", text)
    if m:
        entities["amount"] = m.group(1).replace(",", "")

    # Payee: simple heuristics
    m2 = re.search(r"(?:to|pay|transfer to)\s+([A-Za-z][A-Za-z\s]{1,40})", text, flags=re.I)
    if m2:
        # trim
        name = m2.group(1).strip()
        # remove trailing words like 'account' or 'bank'
        name = re.sub(r"\b(account|bank|online)\b", "", name, flags=re.I).strip()
        entities["payee"] = name

    return entities

def predict_intent_from_text(text: str) -> Tuple[str, Dict[str,str]]:
    text = (text or "").strip()
    if not text:
        return "unknown", {}

    model = _load_model()
    if model:
        pred = model.predict([text])[0]
        logger.debug("Model predicted: %s for text: %s", pred, text)
        entities = extract_entities(text)
        return pred, entities
    else:
        # rule-based fallback
        t = text.lower()
        if any(w in t for w in ["balance", "how much", "account balance"]):
            return "check_balance", extract_entities(t)
        if any(w in t for w in ["send", "transfer", "pay"]):
            return "send_money", extract_entities(t)
        if any(w in t for w in ["transactions", "last transactions", "mini statement"]):
            return "transactions_history", extract_entities(t)
        return "unknown", extract_entities(t)
