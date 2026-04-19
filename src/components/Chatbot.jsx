'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Bot, X, Send, Info, Mail, Trash2, User, ArrowRight, Loader2 } from 'lucide-react'

const WEBHOOK_URL = process.env.NEXT_PUBLIC_CHATBOT_WEBHOOK_URL || ''

const WELCOME_MESSAGE = {
  text: 'Hello! 👋 Welcome to MCODev. How can I help you today?',
  sender: 'bot',
}

function escapeHtml(text) {
  const div = document.createElement('div')
  div.textContent = text
  return div.innerHTML
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

// ── Identification form ──────────────────────────────────────────────────────
function IdentForm({ onIdentified }) {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const firstRef = useRef(null)

  useEffect(() => {
    setTimeout(() => firstRef.current?.focus(), 350)
  }, [])

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
        headers: {
          'Content-Type': 'application/json',
          'firstName': form.firstName.trim(),
          'lastName': form.lastName.trim(),
          'email': form.email.trim(),
        },
        body: JSON.stringify({ message: '__identify__' }),
      })

      const data = await res.json()
      const reply =
        typeof data === 'string'
          ? data
          : data.reply || data.message || data.response || data.output || data.text || null

      onIdentified(
        { firstName: form.firstName.trim(), lastName: form.lastName.trim(), email: form.email.trim() },
        reply,
      )
    } catch {
      // If webhook fails, still proceed — the welcome message will be the default
      onIdentified(
        { firstName: form.firstName.trim(), lastName: form.lastName.trim(), email: form.email.trim() },
        null,
      )
    } finally {
      setLoading(false)
    }
  }

  const inputCls = (field) =>
    `w-full rounded-xl px-3 py-2.5 text-sm bg-zinc-800/60 border outline-none transition-colors text-zinc-100 placeholder-zinc-500 ${
      errors[field]
        ? 'border-red-500/60 focus:border-red-500/80'
        : 'border-zinc-600/40 focus:border-[var(--color-accent)]/60'
    }`

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3 px-5 py-4">
      <p className="text-xs text-zinc-400 leading-relaxed">
        To get started, please share a few details so we can personalise your experience.
      </p>

      {/* First + Last name side by side */}
      <div className="grid grid-cols-2 gap-2.5">
        <div>
          <input
            ref={firstRef}
            type="text"
            placeholder="First name"
            value={form.firstName}
            onChange={handleChange('firstName')}
            className={inputCls('firstName')}
            autoComplete="given-name"
          />
          {errors.firstName && <p className="mt-1 text-[10px] text-red-400">{errors.firstName}</p>}
        </div>
        <div>
          <input
            type="text"
            placeholder="Last name"
            value={form.lastName}
            onChange={handleChange('lastName')}
            className={inputCls('lastName')}
            autoComplete="family-name"
          />
          {errors.lastName && <p className="mt-1 text-[10px] text-red-400">{errors.lastName}</p>}
        </div>
      </div>

      {/* Email */}
      <div>
        <input
          type="email"
          placeholder="Email address"
          value={form.email}
          onChange={handleChange('email')}
          className={inputCls('email')}
          autoComplete="email"
        />
        {errors.email && <p className="mt-1 text-[10px] text-red-400">{errors.email}</p>}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold text-white transition-all duration-300 disabled:opacity-60"
        style={{
          background: `linear-gradient(to right, var(--color-accent), var(--color-accent-light))`,
          boxShadow: `0 4px 14px rgba(var(--color-accent-rgb),0.35)`,
        }}
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <>Start Chat <ArrowRight className="w-4 h-4" /></>
        )}
      </button>
    </form>
  )
}

// ── Main Chatbot ─────────────────────────────────────────────────────────────
export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [userInfo, setUserInfo] = useState(null)          // null = not yet identified
  const [messages, setMessages] = useState([WELCOME_MESSAGE])
  const [input, setInput] = useState('')
  const [charCount, setCharCount] = useState(0)
  const [isSending, setIsSending] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
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
    if (isOpen && userInfo) setTimeout(() => inputRef.current?.focus(), 350)
  }, [isOpen, userInfo])

  useEffect(() => {
    if (!isOpen) return
    const onClickOutside = (e) => {
      if (chatRef.current && !chatRef.current.contains(e.target) && !e.target.closest('.cb-float-btn')) {
        handleClose()
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [isOpen])

  const handleClose = () => {
    setIsOpen(false)
    setTimeout(() => {
      setUserInfo(null)
      setMessages([WELCOME_MESSAGE])
      setInput('')
      setCharCount(0)
      setIsTyping(false)
      setIsSending(false)
      setEmailSent(false)
    }, 350)
  }

  const handleIdentified = (info, webhookReply) => {
    setUserInfo(info)
    const greeting = webhookReply
      || `Welcome, ${info.firstName}! 👋 How can I help you today?`
    setMessages([{ text: greeting, sender: 'bot' }])
    setTimeout(() => inputRef.current?.focus(), 100)
  }

  const sendMessage = async () => {
    const text = input.trim()
    if (!text || isSending || !userInfo) return

    setIsSending(true)
    setInput('')
    setCharCount(0)
    setMessages((prev) => [...prev, { text, sender: 'user' }])
    setIsTyping(true)
    if (inputRef.current) inputRef.current.style.height = 'auto'

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'firstName': userInfo.firstName,
          'lastName': userInfo.lastName,
          'email': userInfo.email,
        },
        body: JSON.stringify({ message: text }),
      })

      if (!res.ok) throw new Error(`Status ${res.status}`)
      const data = await res.json()
      const botReply =
        typeof data === 'string'
          ? data
          : data.reply || data.message || data.response || data.output || data.text || JSON.stringify(data)

      setIsTyping(false)
      setMessages((prev) => [...prev, { text: botReply, sender: 'bot' }])
    } catch (err) {
      console.error('Chat error:', err)
      setIsTyping(false)
      setMessages((prev) => [
        ...prev,
        { text: 'Sorry, something went wrong. Please try again in a moment.', sender: 'bot' },
      ])
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
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px'
  }

  const handleEmailTranscript = () => {
    const transcript = messages
      .map((m) => `${m.sender === 'bot' ? 'MCODev Assistant' : 'You'}: ${m.text}`)
      .join('\n\n')
    window.open(`mailto:?subject=${encodeURIComponent('MCODev Chat Transcript')}&body=${encodeURIComponent(transcript)}`, '_self')
    setEmailSent(true)
    setTimeout(() => setEmailSent(false), 3000)
  }

  const handleClearChat = () => {
    setMessages(userInfo
      ? [{ text: `Welcome back, ${userInfo.firstName}! How can I help you?`, sender: 'bot' }]
      : [WELCOME_MESSAGE])
    setIsTyping(false)
    setIsSending(false)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating button */}
      <button
        className={`cb-float-btn relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 transform hover:scale-110 hover:rotate-[5deg] active:scale-95 ${
          isOpen ? 'rotate-90' : 'rotate-0'
        }`}
        onClick={() => (isOpen ? handleClose() : setIsOpen(true))}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
        style={{
          background: `linear-gradient(135deg, rgba(var(--color-accent-rgb),0.8) 0%, rgba(168,85,247,0.8) 100%)`,
          boxShadow: `0 0 20px rgba(var(--color-accent-rgb),0.7), 0 0 40px rgba(var(--color-accent-rgb),0.5), 0 0 60px rgba(var(--color-accent-rgb),0.3)`,
          border: '2px solid rgba(255,255,255,0.2)',
        }}
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 to-transparent opacity-30" />
        <div className="absolute inset-0 rounded-full border-2 border-white/10" />
        <div className="relative z-10">
          {isOpen ? <X className="w-7 h-7 text-white" /> : <Bot className="w-8 h-8 text-white" />}
        </div>
        {!isOpen && (
          <div className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ backgroundColor: 'var(--color-accent)' }} />
        )}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div
          ref={chatRef}
          className="absolute bottom-20 right-0 w-[min(420px,calc(100vw-24px))] transition-all duration-300 origin-bottom-right"
          style={{ animation: 'cb-popIn 0.3s cubic-bezier(0.175,0.885,0.32,1.275) forwards' }}
          role="dialog"
          aria-label="Chat with MCODev Assistant"
        >
          <div className="relative flex flex-col rounded-3xl bg-gradient-to-br from-zinc-800/80 to-zinc-900/90 border border-zinc-500/50 shadow-2xl backdrop-blur-xl overflow-hidden max-h-[min(600px,calc(100dvh-140px))]">

            {/* Header */}
            <div className="flex items-center justify-between px-5 pt-4 pb-2 shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-medium text-zinc-400">
                  MCODev Assistant
                  {userInfo && (
                    <span className="ml-1.5 text-zinc-500">· {userInfo.firstName}</span>
                  )}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                {userInfo && (
                  <>
                    <button
                      onClick={handleEmailTranscript}
                      className="group relative p-1.5 rounded-full hover:bg-zinc-700/50 transition-colors"
                      aria-label="Email transcript"
                    >
                      <Mail className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-200 transition-colors" />
                      <div className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1.5 bg-zinc-900/95 text-zinc-200 text-[10px] rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-zinc-700/50">
                        {emailSent ? 'Opening email...' : 'Email transcript'}
                      </div>
                    </button>
                    <button
                      onClick={handleClearChat}
                      className="group relative p-1.5 rounded-full hover:bg-zinc-700/50 transition-colors"
                      aria-label="Clear chat"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-200 transition-colors" />
                      <div className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1.5 bg-zinc-900/95 text-zinc-200 text-[10px] rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-zinc-700/50">
                        Clear chat
                      </div>
                    </button>
                  </>
                )}
                <button
                  onClick={handleClose}
                  className="p-1.5 rounded-full hover:bg-zinc-700/50 transition-colors"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4 text-zinc-400 hover:text-zinc-200 transition-colors" />
                </button>
              </div>
            </div>

            {/* ── Identification gate ── */}
            {!userInfo ? (
              <>
                {/* Bot intro bubble */}
                <div className="px-5 pt-2 pb-1">
                  <div className="flex gap-2.5 max-w-[88%]">
                    <div className="w-7 h-7 rounded-lg shrink-0 flex items-center justify-center mt-0.5 bg-gradient-to-br from-[rgba(var(--color-accent-rgb),0.8)] to-purple-500/80">
                      <Bot className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div className="px-4 py-2.5 text-sm leading-relaxed rounded-2xl rounded-bl-md bg-zinc-700/50 border border-zinc-600/40 text-zinc-200">
                      Hi there! 👋 Before we begin, I just need a couple of details to look you up.
                    </div>
                  </div>
                </div>

                {/* Form */}
                <IdentForm onIdentified={handleIdentified} />

                {/* Footer */}
                <div className="px-5 pb-4 pt-1">
                  <div className="flex items-center gap-1.5 text-[10px] text-zinc-500">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                    <span>Your data is only used to personalise this conversation.</span>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* ── Chat messages ── */}
                <div
                  ref={messagesRef}
                  className="flex-1 overflow-y-auto px-5 py-3 flex flex-col gap-3 min-h-[200px]"
                  style={{ scrollbarWidth: 'thin', scrollbarColor: '#52525b transparent' }}
                >
                  {messages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex gap-2.5 max-w-[88%] ${msg.sender === 'bot' ? 'self-start' : 'self-end flex-row-reverse'}`}
                      style={{ animation: 'cb-msgIn 0.35s cubic-bezier(0.34,1.56,0.64,1) both' }}
                    >
                      <div className={`w-7 h-7 rounded-lg shrink-0 flex items-center justify-center mt-0.5 ${msg.sender === 'bot' ? 'bg-gradient-to-br from-[rgba(var(--color-accent-rgb),0.8)] to-purple-500/80' : 'bg-zinc-600'}`}>
                        {msg.sender === 'bot' ? <Bot className="w-3.5 h-3.5 text-white" /> : <User className="w-3.5 h-3.5 text-white" />}
                      </div>
                      <div
                        className={`px-4 py-2.5 text-sm leading-relaxed rounded-2xl ${msg.sender === 'bot' ? 'bg-zinc-700/50 border border-zinc-600/40 rounded-bl-md text-zinc-200' : 'bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-light)] rounded-br-md text-white'}`}
                        dangerouslySetInnerHTML={{ __html: escapeHtml(msg.text) }}
                      />
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex gap-2.5 max-w-[88%] self-start" style={{ animation: 'cb-msgIn 0.35s cubic-bezier(0.34,1.56,0.64,1) both' }}>
                      <div className="w-7 h-7 rounded-lg shrink-0 flex items-center justify-center mt-0.5 bg-gradient-to-br from-[rgba(var(--color-accent-rgb),0.8)] to-purple-500/80">
                        <Bot className="w-3.5 h-3.5 text-white" />
                      </div>
                      <div className="px-4 py-3 bg-zinc-700/50 border border-zinc-600/40 rounded-2xl rounded-bl-md">
                        <div className="flex gap-1.5 items-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-[cb-bounce_1.4s_ease-in-out_infinite]" />
                          <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-[cb-bounce_1.4s_ease-in-out_0.15s_infinite]" />
                          <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-[cb-bounce_1.4s_ease-in-out_0.3s_infinite]" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input */}
                <div className="relative shrink-0">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    rows={2}
                    className="w-full px-5 py-3 bg-transparent border-none outline-none resize-none text-sm leading-relaxed text-zinc-100 placeholder-zinc-500"
                    placeholder="Ask anything or share ideas..."
                    style={{ scrollbarWidth: 'none', maxHeight: '120px' }}
                  />
                </div>

                {/* Controls */}
                <div className="px-4 pb-4 shrink-0">
                  <div className="flex items-center justify-between">
                    <div className="text-[11px] font-medium text-zinc-500">
                      <span className={charCount > maxChars * 0.9 ? 'text-red-400' : ''}>{charCount}</span>
                      /<span className="text-zinc-400">{maxChars}</span>
                    </div>
                    <button
                      onClick={sendMessage}
                      disabled={isSending || !input.trim()}
                      className="group relative p-3 border-none rounded-xl cursor-pointer transition-all duration-300 text-white shadow-lg hover:scale-110 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none"
                      style={{ background: `linear-gradient(to right, var(--color-accent), var(--color-accent-light))` }}
                      aria-label="Send message"
                    >
                      <Send className="w-5 h-5 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:rotate-12" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-zinc-800/50 text-[10px] text-zinc-500 gap-4">
                    <div className="flex items-center gap-1.5">
                      <Info className="w-3 h-3" />
                      <span>
                        <kbd className="px-1 py-0.5 bg-zinc-800 border border-zinc-600 rounded text-zinc-400 font-mono text-[10px]">Shift+Enter</kbd> new line
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                      <span>Online</span>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Overlay gradient */}
            <div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{ background: `linear-gradient(135deg, rgba(var(--color-accent-rgb),0.05), transparent, rgba(147,51,234,0.05))` }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
