'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Bot, X, Send, Mail, Trash2, User, ArrowRight, Loader2, MessageSquare, Shield } from 'lucide-react'

const WEBHOOK_URL = process.env.NEXT_PUBLIC_CHATBOT_WEBHOOK_URL || ''

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function escapeHtml(text) {
  const div = document.createElement('div')
  div.textContent = text
  return div.innerHTML
}

// ── Angela avatar ────────────────────────────────────────────────────────────
function AngelaAvatar({ size = 'sm' }) {
  const dim = size === 'lg' ? 52 : size === 'md' ? 36 : 28
  const font = size === 'lg' ? 20 : size === 'md' ? 14 : 11
  return (
    <div
      style={{
        width: dim, height: dim, borderRadius: '50%', flexShrink: 0,
        background: 'linear-gradient(135deg, rgba(var(--color-accent-rgb),0.9) 0%, rgba(139,92,246,0.9) 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        border: '2px solid rgba(var(--color-accent-rgb),0.4)',
        boxShadow: '0 0 12px rgba(var(--color-accent-rgb),0.3)',
        fontSize: font, fontWeight: 700, color: '#fff', letterSpacing: '-0.5px',
        fontFamily: 'var(--font-display)',
      }}
    >
      A
    </div>
  )
}

// ── Identification screen ────────────────────────────────────────────────────
function IdentScreen({ onIdentified, onClose }) {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const firstRef = useRef(null)

  useEffect(() => { setTimeout(() => firstRef.current?.focus(), 400) }, [])

  const validate = () => {
    const e = {}
    if (!form.firstName.trim()) e.firstName = 'Required'
    if (!form.lastName.trim()) e.lastName = 'Required'
    if (!form.email.trim()) e.email = 'Required'
    else if (!validateEmail(form.email)) e.email = 'Invalid email'
    return e
  }

  const handleChange = (field) => (ev) => {
    setForm((p) => ({ ...p, [field]: ev.target.value }))
    if (errors[field]) setErrors((p) => ({ ...p, [field]: undefined }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: '__identify__',
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          email: form.email.trim(),
        }),
      })
      const raw = await res.text()
      let reply = null
      if (raw.trim()) {
        try {
          const data = JSON.parse(raw)
          reply = typeof data === 'string' ? data
            : data.reply || data.message || data.response || data.output || data.text || null
        } catch { reply = raw.trim() || null }
      }
      onIdentified({ firstName: form.firstName.trim(), lastName: form.lastName.trim(), email: form.email.trim() }, reply)
    } catch {
      onIdentified({ firstName: form.firstName.trim(), lastName: form.lastName.trim(), email: form.email.trim() }, null)
    } finally { setLoading(false) }
  }

  const field = (name, placeholder, type = 'text', ref = undefined) => (
    <div style={{ position: 'relative' }}>
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        value={form[name]}
        onChange={handleChange(name)}
        autoComplete={type === 'email' ? 'email' : name === 'firstName' ? 'given-name' : 'family-name'}
        style={{
          width: '100%', padding: '10px 14px', fontSize: '13px', borderRadius: 12,
          background: 'rgba(255,255,255,0.05)', border: `1px solid ${errors[name] ? 'rgba(248,113,113,0.5)' : 'rgba(255,255,255,0.1)'}`,
          color: '#e4e4e7', outline: 'none', transition: 'border-color 0.2s',
          fontFamily: 'var(--font-body)',
        }}
        onFocus={e => { e.target.style.borderColor = errors[name] ? 'rgba(248,113,113,0.7)' : 'rgba(var(--color-accent-rgb),0.6)' }}
        onBlur={e => { e.target.style.borderColor = errors[name] ? 'rgba(248,113,113,0.5)' : 'rgba(255,255,255,0.1)' }}
      />
      {errors[name] && (
        <p style={{ fontSize: 10, color: '#f87171', marginTop: 3, paddingLeft: 2 }}>{errors[name]}</p>
      )}
    </div>
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
      {/* Header bar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 20px 0',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 6px #22c55e' }} />
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)' }}>Online now</span>
        </div>
        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: 'rgba(255,255,255,0.35)', display: 'flex', borderRadius: 8 }}>
          <X size={16} />
        </button>
      </div>

      {/* Angela intro */}
      <div style={{ padding: '20px 20px 0', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
          <div style={{ position: 'relative' }}>
            <AngelaAvatar size="lg" />
            <div style={{
              position: 'absolute', bottom: 1, right: 1, width: 12, height: 12,
              borderRadius: '50%', background: '#22c55e', border: '2px solid #0f1117',
            }} />
          </div>
        </div>
        <p style={{ fontSize: 17, fontWeight: 700, color: '#f4f4f5', fontFamily: 'var(--font-display)', lineHeight: 1.2, marginBottom: 4 }}>
          Hi, I&apos;m Angela 👋
        </p>
        <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6, maxWidth: 260, margin: '0 auto' }}>
          MCODev&apos;s AI assistant. I&apos;m here to help — let me look you up before we start.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} noValidate style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {field('firstName', 'First name', 'text', firstRef)}
          {field('lastName', 'Last name')}
        </div>
        {field('email', 'Email address', 'email')}

        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: 4, padding: '11px 0', borderRadius: 12, border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
            background: `linear-gradient(135deg, var(--color-accent), rgba(139,92,246,0.9))`,
            boxShadow: `0 4px 18px rgba(var(--color-accent-rgb),0.35)`,
            color: '#fff', fontSize: 13, fontWeight: 600, fontFamily: 'var(--font-display)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            opacity: loading ? 0.7 : 1, transition: 'opacity 0.2s, transform 0.15s',
          }}
          onMouseEnter={e => { if (!loading) e.currentTarget.style.transform = 'translateY(-1px)' }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)' }}
        >
          {loading ? <Loader2 size={15} style={{ animation: 'spin 1s linear infinite' }} /> : <>Get Started <ArrowRight size={14} /></>}
        </button>
      </form>

      {/* Trust note */}
      <div style={{
        margin: '0 20px 20px', padding: '10px 14px', borderRadius: 10,
        background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
        display: 'flex', alignItems: 'center', gap: 7,
      }}>
        <Shield size={12} style={{ color: 'rgba(255,255,255,0.3)', flexShrink: 0 }} />
        <span style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.35)', lineHeight: 1.5 }}>
          Your details are only used to personalise this conversation.
        </span>
      </div>
    </div>
  )
}

// ── Chat view ────────────────────────────────────────────────────────────────
function ChatView({ userInfo, messages, isTyping, input, charCount, isSending, onSend, onInputChange, onKeyDown, onEmailTranscript, onEndSession, inputRef, messagesRef, emailStatus }) {
  const maxChars = 2000
  return (
    <>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 18px 12px',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ position: 'relative' }}>
            <AngelaAvatar size="md" />
            <div style={{
              position: 'absolute', bottom: 1, right: 1, width: 10, height: 10,
              borderRadius: '50%', background: '#22c55e', border: '2px solid #0f1117',
            }} />
          </div>
          <div>
            <p style={{ fontSize: 13, fontWeight: 700, color: '#f4f4f5', fontFamily: 'var(--font-display)', lineHeight: 1.2 }}>Angela</p>
            <p style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.4)', lineHeight: 1 }}>MCODev Assistant · {userInfo.firstName}</p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {/* Email transcript */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={onEmailTranscript}
              disabled={emailStatus === 'sending'}
              title={
                emailStatus === 'sending' ? 'Sending…'
                : emailStatus === 'success' ? 'Transcript sent!'
                : emailStatus === 'error' ? 'Failed — try again'
                : 'Email transcript to me'
              }
              style={{
                background: emailStatus === 'success' ? 'rgba(34,197,94,0.12)'
                  : emailStatus === 'error' ? 'rgba(248,113,113,0.12)'
                  : 'rgba(255,255,255,0.06)',
                border: `1px solid ${emailStatus === 'success' ? 'rgba(34,197,94,0.3)' : emailStatus === 'error' ? 'rgba(248,113,113,0.3)' : 'rgba(255,255,255,0.09)'}`,
                borderRadius: 8, padding: '6px 7px',
                cursor: emailStatus === 'sending' ? 'not-allowed' : 'pointer',
                color: emailStatus === 'success' ? '#22c55e' : emailStatus === 'error' ? '#f87171' : 'rgba(255,255,255,0.45)',
                display: 'flex', transition: 'all 0.2s',
              }}
            >
              {emailStatus === 'sending'
                ? <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} />
                : <Mail size={14} />
              }
            </button>
          </div>

          {/* End session */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={onEndSession}
              title="End session"
              style={{
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.09)',
                borderRadius: 8, padding: '6px 7px', cursor: 'pointer', color: 'rgba(255,255,255,0.45)',
                display: 'flex', transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(248,113,113,0.12)'; e.currentTarget.style.color = '#f87171'; e.currentTarget.style.borderColor = 'rgba(248,113,113,0.25)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)' }}
            >
              <X size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Email status toast */}
      {(emailStatus === 'success' || emailStatus === 'error') && (
        <div style={{
          margin: '0 14px', padding: '9px 14px', borderRadius: 10, fontSize: 12, lineHeight: 1.4,
          display: 'flex', alignItems: 'center', gap: 8,
          background: emailStatus === 'success' ? 'rgba(34,197,94,0.1)' : 'rgba(248,113,113,0.1)',
          border: `1px solid ${emailStatus === 'success' ? 'rgba(34,197,94,0.25)' : 'rgba(248,113,113,0.25)'}`,
          color: emailStatus === 'success' ? '#4ade80' : '#f87171',
          animation: 'cb-msgIn 0.25s ease both',
        }}>
          <span style={{ fontSize: 15 }}>{emailStatus === 'success' ? '✓' : '✕'}</span>
          <span>
            {emailStatus === 'success'
              ? `Transcript sent to ${userInfo.email}`
              : 'Failed to send — please try again'}
          </span>
        </div>
      )}

      {/* Messages */}
      <div
        ref={messagesRef}
        style={{
          flex: 1, overflowY: 'auto', padding: '16px 18px',
          display: 'flex', flexDirection: 'column', gap: 12,
          minHeight: 200, scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.1) transparent',
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              display: 'flex', gap: 9, alignSelf: msg.sender === 'bot' ? 'flex-start' : 'flex-end',
              flexDirection: msg.sender === 'bot' ? 'row' : 'row-reverse',
              maxWidth: '85%', animation: 'cb-msgIn 0.3s cubic-bezier(0.34,1.56,0.64,1) both',
            }}
          >
            {msg.sender === 'bot'
              ? <AngelaAvatar size="sm" />
              : (
                <div style={{
                  width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                  background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <User size={13} style={{ color: 'rgba(255,255,255,0.6)' }} />
                </div>
              )
            }
            <div
              style={{
                padding: '10px 14px', fontSize: 13, lineHeight: 1.6, borderRadius: 16,
                borderBottomLeftRadius: msg.sender === 'bot' ? 4 : 16,
                borderBottomRightRadius: msg.sender === 'user' ? 4 : 16,
                ...(msg.sender === 'bot'
                  ? { background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.09)', color: '#e4e4e7' }
                  : { background: `linear-gradient(135deg, var(--color-accent), rgba(139,92,246,0.9))`, color: '#fff', boxShadow: `0 3px 12px rgba(var(--color-accent-rgb),0.25)` }
                ),
              }}
              dangerouslySetInnerHTML={{ __html: escapeHtml(msg.text) }}
            />
          </div>
        ))}

        {isTyping && (
          <div style={{ display: 'flex', gap: 9, alignSelf: 'flex-start', maxWidth: '85%', animation: 'cb-msgIn 0.3s ease both' }}>
            <AngelaAvatar size="sm" />
            <div style={{
              padding: '12px 16px', borderRadius: 16, borderBottomLeftRadius: 4,
              background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.09)',
              display: 'flex', gap: 5, alignItems: 'center',
            }}>
              {[0, 0.18, 0.36].map((delay, i) => (
                <span key={i} style={{
                  width: 6, height: 6, borderRadius: '50%', background: 'rgba(255,255,255,0.4)',
                  animation: `cb-bounce 1.3s ease-in-out ${delay}s infinite`,
                  display: 'block',
                }} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Input area */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.07)', padding: '12px 14px 14px',
        flexShrink: 0,
      }}>
        <div style={{
          display: 'flex', alignItems: 'flex-end', gap: 10,
          background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 16, padding: '10px 12px 10px 14px', transition: 'border-color 0.2s',
        }}
          onFocusCapture={e => e.currentTarget.style.borderColor = 'rgba(var(--color-accent-rgb),0.4)'}
          onBlurCapture={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
        >
          <textarea
            ref={inputRef}
            value={input}
            onChange={onInputChange}
            onKeyDown={onKeyDown}
            rows={1}
            placeholder="Message Angela…"
            style={{
              flex: 1, background: 'none', border: 'none', outline: 'none', resize: 'none',
              fontSize: 13, lineHeight: 1.55, color: '#e4e4e7', fontFamily: 'var(--font-body)',
              scrollbarWidth: 'none', maxHeight: 110, paddingTop: 1,
            }}
          />
          <button
            onClick={onSend}
            disabled={isSending || !input.trim()}
            style={{
              width: 34, height: 34, borderRadius: 10, border: 'none', flexShrink: 0,
              background: input.trim() && !isSending
                ? `linear-gradient(135deg, var(--color-accent), rgba(139,92,246,0.9))`
                : 'rgba(255,255,255,0.08)',
              cursor: isSending || !input.trim() ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: input.trim() && !isSending ? '#fff' : 'rgba(255,255,255,0.3)',
              transition: 'all 0.2s', boxShadow: input.trim() && !isSending ? `0 3px 10px rgba(var(--color-accent-rgb),0.35)` : 'none',
            }}
            onMouseEnter={e => { if (input.trim() && !isSending) e.currentTarget.style.transform = 'translateY(-1px) scale(1.05)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none' }}
          >
            {isSending ? <Loader2 size={15} style={{ animation: 'spin 1s linear infinite' }} /> : <Send size={14} />}
          </button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8, padding: '0 2px' }}>
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)', fontFamily: 'var(--font-mono)' }}>
            ⏎ send · ⇧⏎ newline
          </span>
          <span style={{
            fontSize: 10, color: charCount > maxChars * 0.9 ? '#f87171' : 'rgba(255,255,255,0.2)',
            fontFamily: 'var(--font-mono)',
          }}>
            {charCount}/{maxChars}
          </span>
        </div>
      </div>
    </>
  )
}

// ── Main Chatbot ─────────────────────────────────────────────────────────────
export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [userInfo, setUserInfo] = useState(null)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [charCount, setCharCount] = useState(0)
  const [isSending, setIsSending] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [emailStatus, setEmailStatus] = useState('idle') // idle | sending | success | error
  const maxChars = 2000

  const messagesRef = useRef(null)
  const inputRef = useRef(null)
  const chatRef = useRef(null)

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      if (messagesRef.current) messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    })
  }, [])

  useEffect(() => { scrollToBottom() }, [messages, isTyping, scrollToBottom])

  useEffect(() => {
    if (isOpen && userInfo) setTimeout(() => inputRef.current?.focus(), 300)
  }, [isOpen, userInfo])

  useEffect(() => {
    if (!isOpen) return
    const handler = (e) => {
      if (chatRef.current && !chatRef.current.contains(e.target) && !e.target.closest('.cb-float-btn')) {
        handleClose()
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [isOpen])

  const handleClose = () => {
    setIsOpen(false)
    setTimeout(() => {
      setUserInfo(null)
      setMessages([])
      setInput('')
      setCharCount(0)
      setIsTyping(false)
      setIsSending(false)
      setEmailStatus('idle')
    }, 350)
  }

  const handleIdentified = (info, webhookReply) => {
    setUserInfo(info)
    const greeting = webhookReply || `Hi ${info.firstName}! 👋 Great to meet you. What can I help you with today?`
    setMessages([{ text: greeting, sender: 'bot' }])
    setTimeout(() => inputRef.current?.focus(), 150)
  }

  const sendMessage = async () => {
    const text = input.trim()
    if (!text || isSending || !userInfo) return
    setIsSending(true)
    setInput('')
    setCharCount(0)
    if (inputRef.current) inputRef.current.style.height = 'auto'
    setMessages((prev) => [...prev, { text, sender: 'user' }])
    setIsTyping(true)

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          email: userInfo.email,
        }),
      })
      if (!res.ok) throw new Error(`Status ${res.status}`)
      const raw = await res.text()
      let botReply = null
      if (raw.trim()) {
        try {
          const data = JSON.parse(raw)
          botReply = typeof data === 'string' ? data
            : data.reply || data.message || data.response || data.output || data.text || JSON.stringify(data)
        } catch { botReply = raw.trim() }
      }
      if (!botReply) botReply = "I've received your message. I'll get back to you shortly."
      setIsTyping(false)
      setMessages((prev) => [...prev, { text: botReply, sender: 'bot' }])
    } catch (err) {
      console.error('Chat error:', err)
      setIsTyping(false)
      setMessages((prev) => [...prev, { text: 'Sorry, something went wrong. Please try again in a moment.', sender: 'bot' }])
    } finally {
      setIsSending(false)
      inputRef.current?.focus()
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() }
  }

  const handleInputChange = (e) => {
    const value = e.target.value
    if (value.length <= maxChars) { setInput(value); setCharCount(value.length) }
    e.target.style.height = 'auto'
    e.target.style.height = Math.min(e.target.scrollHeight, 110) + 'px'
  }

  const handleEmailTranscript = async () => {
    if (!userInfo || messages.length === 0 || emailStatus === 'sending') return
    setEmailStatus('sending')
    try {
      const res = await fetch('/api/send-transcript', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: userInfo.email, firstName: userInfo.firstName, messages }),
      })
      setEmailStatus(res.ok ? 'success' : 'error')
    } catch (err) {
      console.error('Transcript email error:', err)
      setEmailStatus('error')
    }
    setTimeout(() => setEmailStatus('idle'), 5000)
  }

  return (
    <>
      <style>{`
        @keyframes cb-popIn {
          from { opacity: 0; transform: scale(0.88) translateY(12px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes cb-msgIn {
          from { opacity: 0; transform: translateY(8px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes cb-bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-5px); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .cb-float-btn:hover { transform: scale(1.1) rotate(5deg) !important; }
        .cb-float-btn:active { transform: scale(0.95) !important; }
      `}</style>

      <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999 }}>

        {/* Floating button */}
        <button
          className="cb-float-btn"
          onClick={() => isOpen ? handleClose() : setIsOpen(true)}
          aria-label={isOpen ? 'Close chat' : 'Chat with Angela'}
          style={{
            width: 60, height: 60, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.2)',
            background: `linear-gradient(135deg, rgba(var(--color-accent-rgb),0.85) 0%, rgba(139,92,246,0.85) 100%)`,
            boxShadow: `0 0 22px rgba(var(--color-accent-rgb),0.65), 0 0 44px rgba(var(--color-accent-rgb),0.4)`,
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s',
            position: 'relative',
          }}
        >
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.22), transparent)',
            opacity: 0.4,
          }} />
          {isOpen
            ? <X size={24} color="#fff" style={{ position: 'relative', zIndex: 1 }} />
            : <Bot size={26} color="#fff" style={{ position: 'relative', zIndex: 1 }} />
          }
          {!isOpen && (
            <div style={{
              position: 'absolute', inset: 0, borderRadius: '50%',
              background: 'var(--color-accent)', opacity: 0.18,
              animation: 'cb-bounce 2s ease-in-out infinite',
            }} />
          )}
        </button>

        {/* Chat window */}
        {isOpen && (
          <div
            ref={chatRef}
            role="dialog"
            aria-label="Chat with Angela"
            style={{
              position: 'absolute', bottom: 72, right: 0,
              width: 'min(400px, calc(100vw - 20px))',
              animation: 'cb-popIn 0.35s cubic-bezier(0.175,0.885,0.32,1.275) forwards',
            }}
          >
            <div style={{
              borderRadius: 24, overflow: 'hidden', display: 'flex', flexDirection: 'column',
              background: 'linear-gradient(160deg, #13161f 0%, #0f1117 60%, #0c0f16 100%)',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: `0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.08)`,
              maxHeight: 'min(580px, calc(100dvh - 110px))',
              backdropFilter: 'blur(20px)',
            }}>
              {/* Accent glow top */}
              <div style={{
                position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
                width: 200, height: 1,
                background: `linear-gradient(90deg, transparent, rgba(var(--color-accent-rgb),0.6), transparent)`,
                pointerEvents: 'none',
              }} />

              {!userInfo ? (
                <IdentScreen onIdentified={handleIdentified} onClose={handleClose} />
              ) : (
                <ChatView
                  userInfo={userInfo}
                  messages={messages}
                  isTyping={isTyping}
                  input={input}
                  charCount={charCount}
                  isSending={isSending}
                  onSend={sendMessage}
                  onInputChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  onEmailTranscript={handleEmailTranscript}
                  onEndSession={handleClose}
                  inputRef={inputRef}
                  messagesRef={messagesRef}
                  emailStatus={emailStatus}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
