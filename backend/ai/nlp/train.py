# backend/ai/nlp/train.py
"""
Train a lightweight intent classifier (TF-IDF + LogisticRegression).
Saves model to ../models/intent_model.joblib
This is intentionally small and explainable; replace with transformer-based models when you scale.
"""
import json
from pathlib import Path
from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
import joblib
import logging

logger = logging.getLogger("nlp_train")
logger.setLevel(logging.INFO)

BASE = Path(__file__).resolve().parent.parent
MODEL_DIR = BASE / "models"
DATA_DIR = Path(__file__).resolve().parent
MODEL_DIR.mkdir(parents=True, exist_ok=True)
MODEL_PATH = MODEL_DIR / "intent_model.joblib"
LABELS_PATH = MODEL_DIR / "intent_label_map.json"
SAMPLE_DATA = DATA_DIR / "sample_training_data.json"

def load_data():
    if not SAMPLE_DATA.exists():
        raise FileNotFoundError("Provide sample_training_data.json")
    data = json.loads(SAMPLE_DATA.read_text(encoding="utf-8"))
    texts = [d["text"] for d in data]
    labels = [d["label"] for d in data]
    return texts, labels

def train():
    texts, labels = load_data()
    logger.info("Training on %d samples", len(texts))
    pipeline = Pipeline([
        ("tfidf", TfidfVectorizer(ngram_range=(1,2), max_features=4000)),
        ("clf", LogisticRegression(max_iter=500))
    ])
    pipeline.fit(texts, labels)
    joblib.dump(pipeline, MODEL_PATH)
    logger.info("Saved model to %s", MODEL_PATH)

if __name__ == "__main__":
    train()
