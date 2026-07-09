/**
 * Executive District – Jacob AI Concierge
 * Secure Backend Endpoint (Production-Ready)
 * ==========================================
 *
 * This Express router creates a secure proxy to the Tavus API.
 * All credentials (TAVUS_API_KEY, TAVUS_REPLICA_ID, TAVUS_PERSONA_ID)
 * remain server-side — they are NEVER exposed to the browser.
 *
 * SETUP:
 * 1. Set environment variables (see .env.example)
 * 2. Mount in your Express app:
 *
 *    import { jacobConciergeRouter } from './server.js';
 *    app.use('/api', jacobConciergeRouter);
 *
 *    This exposes: POST /api/create-jacob-conversation
 *
 * SECURITY:
 * - API key is only sent server-to-server to Tavus
 * - Replica ID and Persona ID never leave the server
 * - Response contains ONLY conversation_url
 * - CORS is locked down in production via ALLOWED_ORIGINS
 * - Health endpoint is minimal in production
 * - Rate limiting prevents abuse
 */

import { Router } from 'express';
import axios from 'axios';

// ─── Configuration ───────────────────────────────────────────────────────────

const TAVUS_API_URL = 'https://tavusapi.com/v2/conversations';

const DEFAULT_CONTEXT = `You are Jacob, the AI concierge for Executive District — a fractional C-suite operator firm that deploys seasoned executives (CFO, COO, CMO, General Counsel, CTO) into growth-stage businesses ($500K–$50M revenue).

CORE SERVICES:
1. Fractional C-Suite Operators — Part-time executive leadership embedded in the client's business
2. Exit Readiness & Valuation Growth — Preparing businesses for acquisition or succession
3. Revenue Infrastructure — Building scalable sales, marketing, and operational systems

THE THREE CORE PROBLEMS WE SOLVE:
- The Money Problem: Cash flow chaos, no financial clarity, reactive decisions
- The Partner Problem: Founders doing everything alone, no strategic thought partners
- The Direction Problem: Growth without a roadmap, no clear exit strategy

PROVEN RESULTS:
- $480K profit increase in first year for a services firm
- 600% year-over-year revenue growth for a tech company
- $2.1M recurring revenue backlog built in 18 months
- 29% increase in billable utilization across a consulting firm

IDEAL CLIENT PROFILE:
- Revenue: $500K–$50M annually
- Team size: 5–200 employees
- Industries: Professional services, tech, construction, healthcare, manufacturing
- Mindset: Growth-oriented, coachable, ready for executive-level thinking

ENGAGEMENT PROCESS:
1. Confidential Conversation — A private call to understand the business
2. Diagnostic Deep-Dive — Comprehensive analysis of operations, finances, and growth levers
3. Operator Match — Pairing the right fractional executive(s) with the business
4. Embedded Execution — Operators work inside the business 1–3 days per week

CONVERSATION GUIDELINES:
- Be warm, professional, and consultative
- Ask discovery questions about their business size, challenges, and goals
- Qualify whether they fit the ideal client profile
- If qualified, guide them toward: "Book a Confidential Discovery Call"
- If not a fit, be honest and suggest alternative resources
- Never pressure or hard-sell; Executive District works with the RIGHT businesses, not every business`;

// ─── Rate Limiting (simple in-memory) ────────────────────────────────────────

const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const RATE_LIMIT_MAX = 5; // max 5 sessions per IP per minute

function checkRateLimit(ip) {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now - record.windowStart > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { windowStart: now, count: 1 });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }

  record.count++;
  return true;
}

// Clean up old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of rateLimitMap.entries()) {
    if (now - record.windowStart > RATE_LIMIT_WINDOW * 2) {
      rateLimitMap.delete(ip);
    }
  }
}, 300000);

// ─── CORS Middleware ─────────────────────────────────────────────────────────

/**
 * CORS enforcement:
 * - Production: REQUIRES ALLOWED_ORIGINS env var. Blocks all requests if not set.
 * - Development: Allows all origins if ALLOWED_ORIGINS is not set.
 *
 * Set ALLOWED_ORIGINS to a comma-separated list:
 *   ALLOWED_ORIGINS=https://executivedistrict.com,https://www.executivedistrict.com
 */
function corsMiddleware(req, res, next) {
  const allowedOriginsEnv = process.env.ALLOWED_ORIGINS;
  const isProduction = process.env.NODE_ENV === 'production';
  const origin = req.headers.origin;

  if (allowedOriginsEnv) {
    // Strict CORS: only allow specified origins
    const allowedOrigins = allowedOriginsEnv.split(',').map((o) => o.trim());

    if (origin && allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Vary', 'Origin');
    } else if (isProduction && origin) {
      // In production, block requests from unknown origins
      return res.status(403).json({ error: 'Origin not allowed' });
    }
  } else if (isProduction) {
    // Production without ALLOWED_ORIGINS — block all cross-origin requests
    console.warn(
      '[Jacob Concierge] WARNING: ALLOWED_ORIGINS not set in production. Set this variable to allow requests.'
    );
    return res.status(403).json({ error: 'CORS not configured' });
  } else {
    // Development: allow all origins
    res.setHeader('Access-Control-Allow-Origin', '*');
  }

  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Max-Age', '86400');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  next();
}

// ─── Router ──────────────────────────────────────────────────────────────────

export const jacobConciergeRouter = Router();

// Apply CORS to all routes
jacobConciergeRouter.use(corsMiddleware);

// ─── Health Endpoint ─────────────────────────────────────────────────────────

/**
 * GET /health
 *
 * Production: Returns only { status: "ok" } — reveals nothing about configuration.
 * Development: Returns configuration details for debugging.
 */
jacobConciergeRouter.get('/health', (req, res) => {
  const isProduction = process.env.NODE_ENV === 'production';

  if (isProduction) {
    // Minimal response — do not reveal whether Tavus variables are configured
    return res.json({ status: 'ok' });
  }

  // Development: show configuration status for debugging
  const hasApiKey = !!process.env.TAVUS_API_KEY;
  const hasReplicaId = !!process.env.TAVUS_REPLICA_ID;
  const hasPersonaId = !!process.env.TAVUS_PERSONA_ID;

  res.json({
    status: hasApiKey && hasReplicaId && hasPersonaId ? 'ready' : 'misconfigured',
    configured: {
      apiKey: hasApiKey,
      replicaId: hasReplicaId,
      personaId: hasPersonaId,
    },
    cors: process.env.ALLOWED_ORIGINS
      ? process.env.ALLOWED_ORIGINS.split(',').map((o) => o.trim())
      : ['* (development only)'],
  });
});

// ─── Create Jacob Conversation ───────────────────────────────────────────────

/**
 * POST /create-jacob-conversation
 *
 * Creates a new Tavus conversation session for Jacob.
 * ONLY call this when the user intentionally clicks "Talk with Jacob" or "Connect with Jacob."
 * Do NOT pre-warm or pre-create sessions — this avoids unnecessary Tavus minute usage.
 *
 * Request body (all optional):
 * {
 *   "visitorName": "John",
 *   "visitorCompany": "Acme Corp"
 * }
 *
 * Response:
 * {
 *   "conversation_url": "https://tavus.daily.co/c_abc123"
 * }
 *
 * Errors:
 *   403 — Origin not allowed (CORS)
 *   429 — Rate limited
 *   500 — Server misconfigured or Tavus API failure
 */
jacobConciergeRouter.post('/create-jacob-conversation', async (req, res) => {
  // Validate environment variables
  const apiKey = process.env.TAVUS_API_KEY;
  const replicaId = process.env.TAVUS_REPLICA_ID;
  const personaId = process.env.TAVUS_PERSONA_ID;

  if (!apiKey || !replicaId || !personaId) {
    console.error(
      '[Jacob Concierge] Missing required environment variables. ' +
        'Ensure TAVUS_API_KEY, TAVUS_REPLICA_ID, and TAVUS_PERSONA_ID are set.'
    );
    return res.status(500).json({
      error: 'Server configuration error. Please contact support.',
    });
  }

  // Rate limiting
  const clientIp = req.ip || req.headers['x-forwarded-for'] || 'unknown';
  if (!checkRateLimit(clientIp)) {
    return res.status(429).json({
      error: 'Too many requests. Please wait a moment before trying again.',
    });
  }

  try {
    // Build conversational context with optional visitor info
    const { visitorName, visitorCompany } = req.body || {};

    let context = DEFAULT_CONTEXT;
    if (visitorName || visitorCompany) {
      context += '\n\n--- VISITOR INFORMATION ---\n';
      if (visitorName) context += `Name: ${visitorName}\n`;
      if (visitorCompany) context += `Company: ${visitorCompany}\n`;
      context += '\nUse this information to personalize your greeting and conversation.';
    }

    // Create Tavus conversation — credentials stay server-side
    const response = await axios.post(
      TAVUS_API_URL,
      {
        replica_id: replicaId,
        persona_id: personaId,
        conversation_name: `Jacob Concierge - ${visitorName || 'Visitor'} - ${new Date().toISOString()}`,
        conversational_context: context,
        properties: {
          max_call_duration: 1800,
          participant_left_timeout: 30,
          enable_recording: false,
          language: 'english',
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
        },
        timeout: 15000,
      }
    );

    const conversationUrl = response.data?.conversation_url;

    if (!conversationUrl) {
      console.error('[Jacob Concierge] Tavus API returned no conversation_url:', response.data);
      return res.status(500).json({
        error: 'Failed to create conversation. Please try again.',
      });
    }

    // Return ONLY the conversation_url — no IDs, no keys, nothing else
    return res.json({ conversation_url: conversationUrl });
  } catch (error) {
    const errorData = error?.response?.data || error.message;
    console.error('[Jacob Concierge] Failed to create conversation:', errorData);

    if (error?.response?.status === 401) {
      return res.status(500).json({
        error: 'Authentication failed. Contact the site administrator.',
      });
    }

    if (error?.response?.status === 429) {
      return res.status(429).json({
        error: 'Service is temporarily busy. Please try again in a moment.',
      });
    }

    return res.status(500).json({
      error: 'Failed to create conversation. Please try again.',
    });
  }
});

export default jacobConciergeRouter;
