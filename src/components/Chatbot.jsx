import { useState, useRef, useEffect, useCallback } from 'react'
import { Bot, X, Send, Info, Mail, Trash2, User } from 'lucide-react'

const WEBHOOK_URL = process.env.NEXT_PUBLIC_CHATBOT_WEBHOOK_URL || ''

const WELCOME_MESSAGE = { text: 'Hello! 👋 Welcome to MCODev. How can I help you today?', sender: 'bot' }

function escapeHtml(text) {
  const div = document.createElement('div')
  div.textContent = text
  return div.innerHTML
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
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
      if (messagesRef.current) {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight
      }
    })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping, scrollToBottom])

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 350)
    }
  }, [isOpen])

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return
    const handleClickOutside = (e) => {
      if (chatRef.current && !chatRef.current.contains(e.target) && !e.target.closest('.cb-float-btn')) {
        handleClose()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  const handleClose = () => {
    setIsOpen(false)
    // Reset session — next open starts fresh
    setTimeout(() => {
      setMessages([WELCOME_MESSAGE])
      setInput('')
      setCharCount(0)
      setIsTyping(false)
      setIsSending(false)
      setEmailSent(false)
    }, 350)
  }

  const handleOpen = () => {
    setIsOpen(true)
  }

  const sendMessage = async () => {
    const text = input.trim()
    if (!text || isSending) return

    setIsSending(true)
    setInput('')
    setCharCount(0)
    setMessages((prev) => [...prev, { text, sender: 'user' }])
    setIsTyping(true)

    // Reset textarea height
    if (inputRef.current) inputRef.current.style.height = 'auto'

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      })

      if (!response.ok) throw new Error(`Server responded with ${response.status}`)

      const data = await response.json()
      const botReply =
        typeof data === 'string'
          ? data
          : data.reply || data.message || data.response || data.output || data.text || JSON.stringify(data)

      setIsTyping(false)
      setMessages((prev) => [...prev, { text: botReply, sender: 'bot' }])
    } catch (error) {
      console.error('Chat error:', error)
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
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const handleInputChange = (e) => {
    const value = e.target.value
    if (value.length <= maxChars) {
      setInput(value)
      setCharCount(value.length)
    }
    e.target.style.height = 'auto'
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px'
  }

  const handleEmailTranscript = () => {
    const transcript = messages
      .map((m) => `${m.sender === 'bot' ? 'MCODev Assistant' : 'You'}: ${m.text}`)
      .join('\n\n')

    const subject = encodeURIComponent('MCODev Chat Transcript')
    const body = encodeURIComponent(transcript)
    window.open(`mailto:?subject=${subject}&body=${body}`, '_self')
    setEmailSent(true)
    setTimeout(() => setEmailSent(false), 3000)
  }

  const handleClearChat = () => {
    setMessages([WELCOME_MESSAGE])
    setIsTyping(false)
    setIsSending(false)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating 3D Glowing AI Button */}
      <button
        className={`cb-float-btn relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 transform hover:scale-110 hover:rotate-[5deg] active:scale-95 ${
          isOpen ? 'rotate-90' : 'rotate-0'
        }`}
        onClick={() => (isOpen ? handleClose() : handleOpen())}
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
          <div
            className="absolute inset-0 rounded-full animate-ping opacity-20"
            style={{ backgroundColor: 'var(--color-accent)' }}
          />
        )}
      </button>

      {/* Chat Window */}
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
                <span className="text-xs font-medium text-zinc-400">MCODev Assistant</span>
              </div>
              <div className="flex items-center gap-1.5">
                {/* Email transcript */}
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
                {/* Clear chat */}
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
                {/* Close */}
                <button
                  onClick={handleClose}
                  className="p-1.5 rounded-full hover:bg-zinc-700/50 transition-colors"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4 text-zinc-400 hover:text-zinc-200 transition-colors" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={messagesRef}
              className="flex-1 overflow-y-auto px-5 py-3 flex flex-col gap-3 min-h-[200px]"
              style={{ scrollbarWidth: 'thin', scrollbarColor: '#52525b transparent' }}
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-2.5 max-w-[88%] ${
                    msg.sender === 'bot' ? 'self-start' : 'self-end flex-row-reverse'
                  }`}
                  style={{ animation: 'cb-msgIn 0.35s cubic-bezier(0.34,1.56,0.64,1) both' }}
                >
                  <div
                    className={`w-7 h-7 rounded-lg shrink-0 flex items-center justify-center mt-0.5 ${
                      msg.sender === 'bot'
                        ? 'bg-gradient-to-br from-[rgba(var(--color-accent-rgb),0.8)] to-purple-500/80'
                        : 'bg-zinc-600'
                    }`}
                  >
                    {msg.sender === 'bot' ? (
                      <Bot className="w-3.5 h-3.5 text-white" />
                    ) : (
                      <User className="w-3.5 h-3.5 text-white" />
                    )}
                  </div>
                  <div
                    className={`px-4 py-2.5 text-sm leading-relaxed rounded-2xl ${
                      msg.sender === 'bot'
                        ? 'bg-zinc-700/50 border border-zinc-600/40 rounded-bl-md text-zinc-200'
                        : 'bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-light)] rounded-br-md text-white'
                    }`}
                    dangerouslySetInnerHTML={{ __html: escapeHtml(msg.text) }}
                  />
                </div>
              ))}

              {isTyping && (
                <div
                  className="flex gap-2.5 max-w-[88%] self-start"
                  style={{ animation: 'cb-msgIn 0.35s cubic-bezier(0.34,1.56,0.64,1) both' }}
                >
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

            {/* Input Section */}
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
                <div className="flex items-center gap-3">
                  <div className="text-[11px] font-medium text-zinc-500">
                    <span className={charCount > maxChars * 0.9 ? 'text-red-400' : ''}>{charCount}</span>
                    /<span className="text-zinc-400">{maxChars}</span>
                  </div>
                </div>

                {/* Send Button */}
                <button
                  onClick={sendMessage}
                  disabled={isSending || !input.trim()}
                  className="group relative p-3 border-none rounded-xl cursor-pointer transition-all duration-300 text-white shadow-lg hover:scale-110 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:hover:scale-100"
                  style={{
                    background: `linear-gradient(to right, var(--color-accent), var(--color-accent-light))`,
                    boxShadow: `0 10px 15px -3px rgba(0,0,0,0.1), 0 0 0 0 rgba(var(--color-accent-rgb),0.4)`,
                  }}
                  aria-label="Send message"
                >
                  <Send className="w-5 h-5 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:rotate-12" />
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300 blur-lg scale-110" style={{ background: `linear-gradient(to right, var(--color-accent), var(--color-accent-light))` }} />
                </button>
              </div>

              {/* Footer */}
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

            {/* Floating overlay gradient */}
            <div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{
                background: `linear-gradient(135deg, rgba(var(--color-accent-rgb),0.05), transparent, rgba(147,51,234,0.05))`,
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
