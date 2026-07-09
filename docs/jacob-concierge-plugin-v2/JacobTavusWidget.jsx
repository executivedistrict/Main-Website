/**
 * JacobTavusWidget — Production-Ready React Component
 * ====================================================
 *
 * A secure, self-contained React component that embeds the Jacob AI Concierge
 * powered by Tavus. Designed to be dropped into any React website.
 *
 * SECURITY:
 * - No API keys, replica IDs, or persona IDs in frontend code
 * - All credentials stay on the backend via POST /api/create-jacob-conversation
 * - Session is ONLY created when user intentionally clicks "Talk with Jacob"
 * - No pre-warming or pre-creation of sessions
 *
 * USAGE:
 *   import JacobTavusWidget from './JacobTavusWidget';
 *
 *   function App() {
 *     return <JacobTavusWidget backendUrl="/api" />;
 *   }
 *
 * PROPS:
 *   backendUrl (required) — Base URL for the backend API (e.g., "/api" or "https://yoursite.com/api")
 *   visitorName (optional) — Pre-fill visitor name for personalized greeting
 *   visitorCompany (optional) — Pre-fill visitor company
 *   buttonLabel (optional) — Custom button text (default: "Talk with Jacob")
 *   position (optional) — FAB position: "bottom-right" | "bottom-left" (default: "bottom-right")
 *   theme (optional) — Color theme object
 */

import React, { useState, useRef, useCallback, useEffect } from 'react';

// ─── Default Theme ───────────────────────────────────────────────────────────

const defaultTheme = {
  primary: '#C9A84C',       // Gold accent
  primaryHover: '#B8953F',
  background: '#0B1120',    // Dark navy
  surface: '#111827',       // Card background
  text: '#FFFFFF',
  textMuted: '#9CA3AF',
  border: '#1F2937',
  error: '#EF4444',
  success: '#10B981',
};

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = {
  // Floating Action Button
  fab: (position, theme) => ({
    position: 'fixed',
    bottom: '24px',
    [position === 'bottom-left' ? 'left' : 'right']: '24px',
    zIndex: 9998,
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '14px 24px',
    backgroundColor: theme.primary,
    color: '#000',
    border: 'none',
    borderRadius: '50px',
    cursor: 'pointer',
    fontSize: '15px',
    fontWeight: '600',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    boxShadow: '0 8px 32px rgba(201, 168, 76, 0.3)',
    transition: 'all 0.2s ease',
  }),

  fabHover: (theme) => ({
    backgroundColor: theme.primaryHover,
    transform: 'scale(1.03)',
    boxShadow: '0 12px 40px rgba(201, 168, 76, 0.4)',
  }),

  // Modal Overlay
  overlay: {
    position: 'fixed',
    inset: 0,
    zIndex: 9999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    backdropFilter: 'blur(4px)',
    padding: '16px',
  },

  // Modal Container — responsive
  modal: (theme) => ({
    position: 'relative',
    width: '100%',
    maxWidth: '900px',
    height: '85vh',
    maxHeight: '700px',
    backgroundColor: theme.surface,
    borderRadius: '16px',
    border: `1px solid ${theme.border}`,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 24px 80px rgba(0, 0, 0, 0.5)',
  }),

  // Modal on mobile
  modalMobile: (theme) => ({
    position: 'relative',
    width: '100%',
    height: '100vh',
    maxHeight: '100vh',
    maxWidth: '100%',
    backgroundColor: theme.surface,
    borderRadius: '0',
    border: 'none',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  }),

  // Header
  header: (theme) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 20px',
    borderBottom: `1px solid ${theme.border}`,
    flexShrink: 0,
  }),

  headerTitle: (theme) => ({
    fontSize: '16px',
    fontWeight: '600',
    color: theme.text,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    margin: 0,
  }),

  closeBtn: (theme) => ({
    background: 'none',
    border: 'none',
    color: theme.textMuted,
    cursor: 'pointer',
    fontSize: '24px',
    lineHeight: 1,
    padding: '4px 8px',
    borderRadius: '6px',
    transition: 'color 0.2s',
  }),

  // Content area
  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },

  // Loading state
  loadingContainer: (theme) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
    padding: '40px',
  }),

  loadingSpinner: (theme) => ({
    width: '48px',
    height: '48px',
    border: `3px solid ${theme.border}`,
    borderTopColor: theme.primary,
    borderRadius: '50%',
    animation: 'jacobSpin 0.8s linear infinite',
  }),

  loadingText: (theme) => ({
    fontSize: '16px',
    fontWeight: '500',
    color: theme.text,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    margin: 0,
  }),

  // Error state
  errorContainer: (theme) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
    padding: '40px',
    textAlign: 'center',
  }),

  errorIcon: {
    fontSize: '48px',
    lineHeight: 1,
  },

  errorText: (theme) => ({
    fontSize: '16px',
    fontWeight: '500',
    color: theme.text,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    margin: 0,
  }),

  retryBtn: (theme) => ({
    padding: '10px 24px',
    backgroundColor: theme.primary,
    color: '#000',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    transition: 'background-color 0.2s',
  }),

  // Iframe
  iframe: {
    width: '100%',
    height: '100%',
    border: 'none',
    borderRadius: '0 0 16px 16px',
  },

  iframeMobile: {
    width: '100%',
    height: '100%',
    border: 'none',
    borderRadius: '0',
  },
};

// ─── Keyframes Injection ─────────────────────────────────────────────────────

let keyframesInjected = false;

function injectKeyframes() {
  if (keyframesInjected) return;
  keyframesInjected = true;

  const style = document.createElement('style');
  style.textContent = `
    @keyframes jacobSpin {
      to { transform: rotate(360deg); }
    }
    @keyframes jacobPulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
  `;
  document.head.appendChild(style);
}

// ─── Mobile Detection ────────────────────────────────────────────────────────

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function check() {
      setIsMobile(window.innerWidth < 768);
    }
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return isMobile;
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function JacobTavusWidget({
  backendUrl,
  visitorName = '',
  visitorCompany = '',
  buttonLabel = 'Talk with Jacob',
  position = 'bottom-right',
  theme: themeProp = {},
}) {
  const theme = { ...defaultTheme, ...themeProp };
  const isMobile = useIsMobile();

  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | loading | ready | error
  const [conversationUrl, setConversationUrl] = useState(null);
  const [fabHovered, setFabHovered] = useState(false);
  const iframeRef = useRef(null);

  useEffect(() => {
    injectKeyframes();
  }, []);

  // ─── Create Session (only on intentional click) ──────────────────────────

  const startConversation = useCallback(async () => {
    setIsOpen(true);
    setStatus('loading');
    setConversationUrl(null);

    try {
      const endpoint = `${backendUrl}/create-jacob-conversation`;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          visitorName: visitorName || undefined,
          visitorCompany: visitorCompany || undefined,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Request failed with status ${response.status}`);
      }

      const data = await response.json();

      if (!data.conversation_url) {
        throw new Error('No conversation URL received');
      }

      setConversationUrl(data.conversation_url);
      setStatus('ready');
    } catch (err) {
      console.error('[JacobTavusWidget] Failed to start conversation:', err.message);
      setStatus('error');
    }
  }, [backendUrl, visitorName, visitorCompany]);

  // ─── Retry ───────────────────────────────────────────────────────────────

  const retry = useCallback(() => {
    startConversation();
  }, [startConversation]);

  // ─── Close Modal ─────────────────────────────────────────────────────────

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setStatus('idle');
    setConversationUrl(null);
  }, []);

  // ─── Handle ESC key ──────────────────────────────────────────────────────

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        closeModal();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeModal]);

  // ─── Prevent body scroll when modal is open ──────────────────────────────

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <>
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={startConversation}
          onMouseEnter={() => setFabHovered(true)}
          onMouseLeave={() => setFabHovered(false)}
          style={{
            ...styles.fab(position, theme),
            ...(fabHovered ? styles.fabHover(theme) : {}),
          }}
          aria-label={buttonLabel}
        >
          {/* Video icon */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="23 7 16 12 23 17 23 7" />
            <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
          </svg>
          {buttonLabel}
        </button>
      )}

      {/* Modal */}
      {isOpen && (
        <div
          style={styles.overlay}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Jacob AI Concierge"
        >
          <div style={isMobile ? styles.modalMobile(theme) : styles.modal(theme)}>
            {/* Header */}
            <div style={styles.header(theme)}>
              <h2 style={styles.headerTitle(theme)}>Jacob — Executive District Concierge</h2>
              <button
                onClick={closeModal}
                style={styles.closeBtn(theme)}
                aria-label="Close conversation"
              >
                ×
              </button>
            </div>

            {/* Content */}
            <div style={styles.content}>
              {/* Loading State */}
              {status === 'loading' && (
                <div style={styles.loadingContainer(theme)}>
                  <div style={styles.loadingSpinner(theme)} />
                  <p style={styles.loadingText(theme)}>Loading Jacob...</p>
                </div>
              )}

              {/* Error State */}
              {status === 'error' && (
                <div style={styles.errorContainer(theme)}>
                  <span style={styles.errorIcon}>⚠️</span>
                  <p style={styles.errorText(theme)}>
                    Jacob could not be loaded. Please try again.
                  </p>
                  <button
                    onClick={retry}
                    style={styles.retryBtn(theme)}
                  >
                    Try Again
                  </button>
                </div>
              )}

              {/* Conversation Iframe */}
              {status === 'ready' && conversationUrl && (
                <iframe
                  ref={iframeRef}
                  src={conversationUrl}
                  style={isMobile ? styles.iframeMobile : styles.iframe}
                  allow="camera; microphone; autoplay; fullscreen"
                  allowFullScreen
                  title="Jacob AI Concierge Conversation"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
