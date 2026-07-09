# Jacob AI Concierge — Production Plugin

A secure, production-ready Tavus integration that drops the interactive Jacob AI Concierge into any React website. All credentials stay server-side.

---

## Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│  BROWSER (Client)                                                │
│                                                                  │
│  ┌─────────────────────────┐                                     │
│  │  JacobTavusWidget.jsx   │                                     │
│  │  - FAB button            │                                     │
│  │  - Modal overlay         │    User clicks                      │
│  │  - Loading/Error states  │───"Talk with Jacob"──┐              │
│  │  - Tavus iframe          │                      │              │
│  └─────────────────────────┘                      │              │
│                                                    ▼              │
│                                    POST /api/create-jacob-conversation
│                                    Body: { visitorName?, visitorCompany? }
│                                                    │              │
└────────────────────────────────────────────────────┼──────────────┘
                                                     │
┌────────────────────────────────────────────────────┼──────────────┐
│  SERVER (Backend)                                  ▼              │
│                                                                  │
│  ┌─────────────────────────┐    ┌────────────────────────────┐   │
│  │  server.js               │───▶│  Tavus API                  │   │
│  │  - CORS enforcement      │    │  POST /v2/conversations     │   │
│  │  - Rate limiting         │    │  (x-api-key: TAVUS_API_KEY) │   │
│  │  - Env var validation    │    └────────────────────────────┘   │
│  │  - Returns ONLY:         │                                     │
│  │    { conversation_url }  │    Environment Variables:            │
│  └─────────────────────────┘    - TAVUS_API_KEY (secret)          │
│                                  - TAVUS_REPLICA_ID (secret)       │
│                                  - TAVUS_PERSONA_ID (secret)       │
│                                  - ALLOWED_ORIGINS (CORS)          │
│                                  - NODE_ENV                        │
└──────────────────────────────────────────────────────────────────┘
```

**Key Security Principle:** The API key, replica ID, and persona ID NEVER leave the server. The browser only receives a `conversation_url` to embed in an iframe.

---

## Deliverables

| File | Purpose |
|------|---------|
| `JacobTavusWidget.jsx` | React component (drop into your components folder) |
| `server.js` | Express router (mount on your backend) |
| `env.example.txt` | Copy to `.env` — lists all required variables |
| `README.md` | This file |

---

## Quick Start

### 1. Set Environment Variables

Copy `env.example.txt` to `.env` in your project root:

```bash
cp env.example.txt .env
```

Fill in your credentials:

```env
TAVUS_API_KEY=your_tavus_api_key_here
TAVUS_REPLICA_ID=your_replica_id_here
TAVUS_PERSONA_ID=your_persona_id_here
ALLOWED_ORIGINS=https://executivedistrict.com,https://www.executivedistrict.com
NODE_ENV=production
```

### 2. Install Dependencies

```bash
npm install express axios
# or
yarn add express axios
```

### 3. Mount the Backend Route

```js
// server/index.js (or wherever your Express app is configured)
import express from 'express';
import { jacobConciergeRouter } from './server.js';

const app = express();
app.use(express.json());

// Mount the Jacob Concierge API
app.use('/api', jacobConciergeRouter);

// This exposes:
//   POST /api/create-jacob-conversation
//   GET  /api/health

app.listen(3000, () => console.log('Server running on port 3000'));
```

### 4. Add the React Component

```jsx
// src/App.jsx
import JacobTavusWidget from './components/JacobTavusWidget';

function App() {
  return (
    <div>
      {/* Your existing site content */}
      <h1>Welcome to Executive District</h1>

      {/* Drop in Jacob — that's it */}
      <JacobTavusWidget backendUrl="/api" />
    </div>
  );
}

export default App;
```

---

## Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `backendUrl` | `string` | **(required)** | Base URL for the backend API (e.g., `"/api"`) |
| `visitorName` | `string` | `""` | Pre-fill visitor name for personalized greeting |
| `visitorCompany` | `string` | `""` | Pre-fill visitor company name |
| `buttonLabel` | `string` | `"Talk with Jacob"` | Custom FAB button text |
| `position` | `string` | `"bottom-right"` | FAB position: `"bottom-right"` or `"bottom-left"` |
| `theme` | `object` | (see below) | Custom color theme |

### Theme Object

```js
const customTheme = {
  primary: '#C9A84C',       // Button and accent color
  primaryHover: '#B8953F',  // Button hover color
  background: '#0B1120',    // Modal background
  surface: '#111827',       // Card/panel background
  text: '#FFFFFF',          // Primary text
  textMuted: '#9CA3AF',     // Secondary text
  border: '#1F2937',        // Border color
  error: '#EF4444',         // Error state color
  success: '#10B981',       // Success state color
};
```

---

## How It Works

1. **User clicks "Talk with Jacob"** — the FAB button on your site.
2. **Modal opens with "Loading Jacob..."** — a loading spinner is shown.
3. **Frontend calls `POST /api/create-jacob-conversation`** — sends optional visitor info.
4. **Backend creates the Tavus session** — using server-side credentials only.
5. **Backend returns `{ conversation_url }`** — nothing else is exposed.
6. **Frontend loads the conversation in an iframe** — with camera, microphone, autoplay, and fullscreen permissions.
7. **User talks with Jacob** — the Tavus CVI handles the video conversation.
8. **User closes the modal** — conversation ends, ESC key or backdrop click.

**Important:** No session is created until the user intentionally clicks the button. This avoids unnecessary Tavus minute usage.

---

## Security Checklist

- [x] API key is ONLY sent server-to-server (in `x-api-key` header to Tavus)
- [x] Replica ID and Persona ID never leave the server
- [x] Frontend receives ONLY `conversation_url`
- [x] CORS is locked down in production (requires `ALLOWED_ORIGINS`)
- [x] Wildcard `*` is NOT allowed in production
- [x] Health endpoint reveals nothing in production (just `{ status: "ok" }`)
- [x] Rate limiting prevents abuse (5 requests/minute per IP)
- [x] No pre-warming or pre-creation of sessions

---

## CORS Configuration

**Development** (no `ALLOWED_ORIGINS` set, `NODE_ENV` not `production`):
- All origins are allowed (`*`)

**Production** (`NODE_ENV=production`):
- `ALLOWED_ORIGINS` is **required**
- Only listed origins can call the endpoint
- Requests from unlisted origins receive `403 Forbidden`

Example:
```env
ALLOWED_ORIGINS=https://executivedistrict.com,https://www.executivedistrict.com
```

---

## Responsive Behavior

| Viewport | Layout |
|----------|--------|
| Desktop (≥768px) | Centered modal, max 900px wide, 85vh tall |
| Mobile (<768px) | Full-screen layout, no border radius |

---

## Iframe Permissions

The embedded Tavus conversation iframe includes these permissions:

```html
allow="camera; microphone; autoplay; fullscreen"
```

**Note:** Your site MUST use HTTPS for camera and microphone permissions to work.

---

## Error Handling

| Scenario | User Sees |
|----------|-----------|
| Backend unreachable | "Jacob could not be loaded. Please try again." + Retry button |
| Tavus API failure | "Jacob could not be loaded. Please try again." + Retry button |
| Rate limited | "Too many requests. Please wait a moment before trying again." |
| CORS blocked | "Jacob could not be loaded. Please try again." + Retry button |

---

## Backend API Reference

### `POST /api/create-jacob-conversation`

Creates a new Tavus conversation session. **Only call when user intentionally starts.**

**Request Body** (all fields optional):

```json
{
  "visitorName": "John Smith",
  "visitorCompany": "Acme Corp"
}
```

**Response (200):**

```json
{
  "conversation_url": "https://tavus.daily.co/c_abc123def456"
}
```

**Error Responses:**

| Status | Body | Description |
|--------|------|-------------|
| 403 | `{ "error": "Origin not allowed" }` | CORS blocked |
| 429 | `{ "error": "Too many requests..." }` | Rate limited (5/min/IP) |
| 500 | `{ "error": "Server configuration error..." }` | Missing env vars |
| 500 | `{ "error": "Failed to create conversation..." }` | Tavus API failure |

### `GET /api/health`

Health check endpoint.

**Production response:** `{ "status": "ok" }` (reveals nothing)

**Development response:**
```json
{
  "status": "ready",
  "configured": { "apiKey": true, "replicaId": true, "personaId": true },
  "cors": ["https://executivedistrict.com"]
}
```

---

## Dependencies

**Backend (`server.js`):**
- `express` (peer dependency — you likely already have this)
- `axios` (for Tavus API calls)

**Frontend (`JacobTavusWidget.jsx`):**
- `react` >= 17.0.0 (peer dependency)
- No other dependencies — fully self-contained with inline styles

---

## Advanced Usage

### With Lead Capture Form

```jsx
import { useState } from 'react';
import JacobTavusWidget from './components/JacobTavusWidget';

function ContactPage() {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');

  return (
    <div>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
      <input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company" />

      {/* Jacob will greet the visitor by name */}
      <JacobTavusWidget
        backendUrl="/api"
        visitorName={name}
        visitorCompany={company}
      />
    </div>
  );
}
```

### Next.js Integration

```jsx
'use client';
import JacobTavusWidget from '@/components/JacobTavusWidget';

export default function JacobWrapper() {
  return <JacobTavusWidget backendUrl="/api" />;
}
```

---

## Framework Compatibility

| Framework | Notes |
|-----------|-------|
| Create React App | Drop files in and import |
| Next.js | Use `'use client'` directive |
| Vite | Works out of the box |
| Remix | Use in client-side routes |
| Gatsby | Use in browser-only components |

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Jacob could not be loaded" | Check backend logs. Verify env vars are set. |
| CORS error in console | Set `ALLOWED_ORIGINS` to include your site's domain |
| 403 from backend | Your origin isn't in `ALLOWED_ORIGINS` |
| 429 Too Many Requests | Wait 60 seconds. Rate limit is 5/minute per IP |
| Camera/mic not working | Ensure your site uses HTTPS (required for media) |
| Health endpoint shows config | Set `NODE_ENV=production` to hide details |

---

## License

Proprietary — Executive District. For authorized use only.
