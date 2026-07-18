"use client";
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home, CreditCard, Target, FileText, Receipt, MessageCircle, Settings, ArrowUp,
} from 'lucide-react';

const ERROR_REPLY =
  "I couldn't reach the server just now. Please try asking again in a moment.";

async function getMochiReply(userText, history) {
  try {
    const res = await fetch("/api/ask-mochi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userText, history }),
    });

    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }

    const data = await res.json();
    return data.reply ?? ERROR_REPLY;
  } catch (err) {
    console.error("getMochiReply error:", err);
    return ERROR_REPLY;
  }
}

const SUGGESTIONS = [
  'Am I on track for my goals?',
  'Where can I cut back?',
];

export default function MochiAI() {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Hi, I'm Mochi. Ask me anything about your money." },
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isThinking]);

  const navItems = [
    { label: 'Dashboard', icon: Home, href: '/dashboard' },
    { label: 'Expenses', icon: CreditCard, href: '/finance-profile' },
    { label: 'Savings', icon: Target, href: '/savings' },
    { label: 'Summaries', icon: FileText, href: '/summaries' },
    { label: 'Receipts', icon: Receipt, href: '/receipts' },
    { label: 'Mochi AI', icon: MessageCircle, href: '/MOCHI_AI' },
    { label: 'Settings', icon: Settings, href: '/settings' },
  ];

  const pathname = usePathname();

  async function handleSend(text) {
    const trimmed = (text ?? input).trim();
    if (!trimmed || isThinking) return;

    const nextMessages = [...messages, { role: 'user', text: trimmed }];
    setMessages(nextMessages);
    setInput('');
    setIsThinking(true);

    const reply = await getMochiReply(trimmed, nextMessages);
    setMessages((prev) => [...prev, { role: 'assistant', text: reply }]);
    setIsThinking(false);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="mochi-ai-root">
      <style>{`
        .mochi-ai-root {
          --bg: #0b0b0b;
          --panel: #151515;
          --panel-2: #1b1b1b;
          --bubble-user: #232323;
          --bubble-assistant: #181818;
          --border: #262626;
          --text: #f2f2f0;
          --text-dim: #8a8a86;
          --accent: #B46A72;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, sans-serif;
          background: var(--bg);
          color: var(--text);
          min-height: 100vh;
          width: 100%;
        }
        .mochi-ai-root * { box-sizing: border-box; }

        .layout { display: flex; min-height: 100vh; }
        .sidebar { width: 220px; flex-shrink: 0; border-right: 1px solid var(--border); padding: 24px 14px; }
        .sidebar-logo { font-weight: 700; font-size: 16px; padding: 0 10px; margin-bottom: 20px; }
        .nav-item {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 12px; border-radius: 10px; font-size: 14px;
          color: var(--text-dim); cursor: pointer; margin-bottom: 2px;
          text-decoration: none;
        }
        .nav-item.active { background: var(--panel-2); color: var(--text); }
        .nav-item:hover:not(.active) { color: var(--text); }

        .chat-main { flex: 1; display: flex; flex-direction: column; padding: 28px 36px; max-width: 820px; }
        .chat-title { font-size: 22px; font-weight: 600; margin: 0 0 4px; }
        .chat-sub { color: var(--text-dim); font-size: 14px; margin: 0 0 12px; }
        .title-underline { width: 64px; height: 2px; background: var(--accent); margin-bottom: 24px; }

        .messages { flex: 1; overflow-y: auto; padding-right: 4px; margin-bottom: 16px; }
        .msg-row { display: flex; margin-bottom: 16px; }
        .msg-row.user { justify-content: flex-end; }
        .msg-row.assistant { justify-content: flex-start; align-items: flex-start; gap: 10px; }

        .avatar { width: 30px; height: 30px; border-radius: 50%; background: #f0e6d6; flex-shrink: 0; margin-top: 2px; }

        .bubble { max-width: 480px; padding: 14px 18px; border-radius: 16px; font-size: 14.5px; line-height: 1.5; }
        .bubble.user { background: var(--bubble-user); border-top-right-radius: 4px; }
        .bubble.assistant { background: var(--bubble-assistant); border-top-left-radius: 4px; }
        .bubble.thinking { color: var(--text-dim); font-style: italic; }

        .suggestions { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 14px; }
        .suggestion-pill {
          border: 1px solid var(--border); background: transparent; color: var(--text);
          padding: 9px 16px; border-radius: 999px; font-size: 13.5px; cursor: pointer;
        }
        .suggestion-pill:hover { border-color: var(--text-dim); }

        .input-row {
          display: flex; align-items: center; gap: 10px;
          background: var(--panel); border: 1px solid var(--border);
          border-radius: 999px; padding: 6px 6px 6px 20px;
        }
        .input-row input {
          flex: 1; background: transparent; border: none; outline: none;
          color: var(--text); font-size: 14.5px; padding: 10px 0;
        }
        .input-row input::placeholder { color: var(--text-dim); }
        .send-btn {
          width: 38px; height: 38px; border-radius: 50%; border: none;
          background: var(--accent); color: #1a0f0d; display: flex;
          align-items: center; justify-content: center; cursor: pointer; flex-shrink: 0;
        }
        .send-btn:disabled { opacity: 0.4; cursor: not-allowed; }
      `}</style>

      <div className="layout">
        <aside className="sidebar">
          <div className="sidebar-logo">Mochi</div>
          {navItems.map(({ label, icon: Icon, href }) => {
            const active = pathname === href || (href !== '/' && pathname?.startsWith(`${href}/`));
            return (
              <Link
                key={label}
                href={href}
                className={`nav-item ${active ? 'active' : ''}`}
              >
                <Icon size={17} />
                {label}
              </Link>
            );
          })}
        </aside>

        <main className="chat-main">
          <h1 className="chat-title">Mochi AI</h1>
          <p className="chat-sub">Ask anything about your money.</p>
          <div className="title-underline" />

          <div className="messages" ref={scrollRef}>
            {messages.map((m, i) => (
              <div key={i} className={`msg-row ${m.role}`}>
                {m.role === 'assistant' && <div className="avatar" />}
                <div className={`bubble ${m.role}`}>{m.text}</div>
              </div>
            ))}
            {isThinking && (
              <div className="msg-row assistant">
                <div className="avatar" />
                <div className="bubble assistant thinking">Mochi is thinking…</div>
              </div>
            )}
          </div>

          <div className="suggestions">
            {SUGGESTIONS.map((s) => (
              <button key={s} className="suggestion-pill" onClick={() => handleSend(s)}>
                {s}
              </button>
            ))}
          </div>

          <div className="input-row">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask mochi anything"
            />
            <button className="send-btn" disabled={!input.trim() || isThinking} onClick={() => handleSend()}>
              <ArrowUp size={18} />
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}