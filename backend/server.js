// backend/server.js
/**
 * Main backend server (Node.js + Express).
 * - Receives requests from mobile app
 * - Proxies audio to Python AI microservice
 * - Uses ai_decision_engine to handle actions (safely)
 * - Returns audio URL + text back to app
 *
 * Security notes:
 * - Ensure TLS (https) in production
 * - Authenticate mobile requests (JWT, OAuth)
 * - Validate and sanitize all inputs
 */
const express = require("express");
const axios = require("axios");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { handleIntent } = require("./ai/decision/ai_decision_engine");
const { rateLimit } = require("express-rate-limit");
require("dotenv").config();

const app = express();
app.use(express.json());

// simple rate limiter
app.use(rateLimit({
  windowMs: 60 * 1000,
  max: 60
}));

// Upload config
const upload = multer({ dest: path.join(__dirname, "tmp_uploads/") });
const AI_BASE = process.env.AI_BASE_URL || "http://localhost:5001"; // python ai server

// health
app.get("/health", (req, res) => res.json({ ok: true }));

/**
 * POST /voice-proxy
 * Accepts audio file from mobile, forwards to AI service (/predict_audio),
 * uses decision engine to run safe actions, returns final response and audio URL.
 */
app.post("/voice-proxy", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });
    // forward file to python ai service
    const aiUrl = `${AI_BASE}/predict_audio`;

    // create form-data
    const FormData = require("form-data");
    const form = new FormData();
    form.append("file", fs.createReadStream(req.file.path), req.file.originalname);

    const headers = form.getHeaders();

    // send to ai microservice
    const aiResp = await axios.post(aiUrl, form, { headers, timeout: 120000 });
    const aiData = aiResp.data;

    // Secure decision: do NOT trust AI for critical actions.
    // Validate intent and entities, then call decision engine which enforces auth and checks.
    const { intent, entities, transcript } = aiData;
    // Here we pass the parsed intent to the decision engine which must verify user's auth,
    // balance, limits, beneficiary existence, etc. (The decision engine should only perform
    // operations after explicit multi-factor confirmation).
    const decisionResult = await handleIntent({ intent, entities, transcript, user: req.user || null });

    // decisionResult should include: { permitted: bool, message: string, action: optional }
    // If permitted=false, we simply return message and the audio from AI (assistant) as fallback.
    res.json({
      success: true,
      ai: aiData,
      decision: decisionResult
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  } finally {
    // cleanup uploaded file
    if (req.file && req.file.path) {
      fs.unlink(req.file.path, () => {});
    }
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend listening on ${PORT}`);
});
