"use client";
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home, CreditCard, Target, FileText, Receipt, MessageCircle, Settings,
  MoreHorizontal, Calendar, Plus,
} from 'lucide-react';

const DEFAULT_CATEGORIES = [
  { name: 'Rent', icon: Home },
  { name: 'Groceries' },
  { name: 'Dining' },
  { name: 'Utilities' },
  { name: 'Goals' },
  { name: 'Extras' },
];

const PAYMENT_MODES = ['UPI', 'Card', 'Cash', 'Bank'];

function formatRs(n) {
  return `Rs ${Math.round(n).toLocaleString('en-IN')}`;
}

function todayInputValue() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

function formatDateDisplay(isoDate) {
  const [yyyy, mm, dd] = isoDate.split('-');
  return `${dd}-${mm}-${yyyy}`;
}

export default function Expenses({ monthlyBudget: initialBudget = null }) {
  // ── Real data (see wiring notes above) ──
  const [monthlyBudget] = useState(initialBudget);
  const [expenses, setExpenses] = useState([]); // [{ amount, category, date, mode, note }]

  // ── Form state ──
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Rent');
  const [date, setDate] = useState(todayInputValue());
  const [mode, setMode] = useState('UPI');
  const [note, setNote] = useState('');

  const canAdd = Number(amount) > 0 && !!category;

  const overview = useMemo(() => {
    const totalSpent = expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0);
    const transactions = expenses.length;

    const byCategory = {};
    expenses.forEach((e) => {
      byCategory[e.category] = (byCategory[e.category] || 0) + Number(e.amount || 0);
    });
    const topCategory = Object.keys(byCategory).length
      ? Object.entries(byCategory).sort((a, b) => b[1] - a[1])[0][0]
      : null;

    const budgetLeft = monthlyBudget !== null ? monthlyBudget - totalSpent : null;
    const budgetUsedPct = monthlyBudget ? Math.min(100, Math.round((totalSpent / monthlyBudget) * 100)) : 0;

    return { totalSpent, transactions, topCategory, budgetLeft, budgetUsedPct };
  }, [expenses, monthlyBudget]);

  function handleAddCustomCategory() {
    const name = window.prompt('Name your new category');
    if (!name || !name.trim()) return;
    const trimmed = name.trim();
    if (!categories.some((c) => c.name === trimmed)) {
      setCategories((prev) => [...prev, { name: trimmed }]);
    }
    setCategory(trimmed);
  }

  function handleAddExpense() {
    if (!canAdd) return;
    const entry = { amount: Number(amount), category, date, mode, note: note.trim() };
    setExpenses((prev) => [...prev, entry]);
    // TODO: also persist `entry` to /data/expenses.json or your backend here.
    setAmount('');
    setNote('');
  }

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

  return (
    <div className="expenses-root">
      <style>{`
        .expenses-root {
          --bg: #0b0b0b;
          --panel: #151515;
          --panel-2: #1b1b1b;
          --field: #101010;
          --border: #262626;
          --text: #f2f2f0;
          --text-dim: #8a8a86;
          --rosewood: #B46A72;
          --mist: #A9B7C6;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, sans-serif;
          background: var(--bg);
          color: var(--text);
          min-height: 100vh;
        }
        .expenses-root * { box-sizing: border-box; }

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

        .content { flex: 1; display: flex; gap: 28px; padding: 28px 32px; align-items: flex-start; }
        .col-form { flex: 1.3; max-width: 480px; }
        .col-overview { flex: 1; max-width: 340px; }

        .section-head { font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-dim); margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center; }
        .section-underline { height: 2px; width: 100%; background: linear-gradient(90deg, var(--rosewood), var(--mist)); margin-bottom: 24px; }

        .field-label { font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-dim); margin-bottom: 8px; }
        .amount-input {
          width: 100%; background: var(--field); border: 1px solid var(--border);
          color: var(--text); font-size: 22px; padding: 16px 18px; border-radius: 14px;
          margin-bottom: 22px;
        }
        .amount-input::placeholder { color: #4a4a48; }

        .pill-row { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 22px; }
        .pill {
          display: flex; align-items: center; gap: 6px;
          padding: 9px 16px; border-radius: 999px; font-size: 13.5px;
          border: 1px solid var(--border); background: transparent; color: var(--text); cursor: pointer;
        }
        .pill.selected { background: #f2f2f0; color: #111; border-color: #f2f2f0; }
        .pill.selected-outline { border-color: var(--text); }
        .pill:hover:not(.selected) { border-color: var(--text-dim); }

        .two-col { display: flex; gap: 16px; margin-bottom: 22px; }
        .two-col > div { flex: 1; }
        .date-field {
          display: flex; align-items: center; justify-content: space-between;
          background: var(--field); border: 1px solid var(--border);
          color: var(--text); font-size: 14px; padding: 14px 16px; border-radius: 14px;
          position: relative;
        }
        .date-field input[type="date"] {
          position: absolute; inset: 0; opacity: 0; cursor: pointer; width: 100%; height: 100%;
        }

        .notes-input {
          width: 100%; background: var(--field); border: 1px solid var(--border);
          color: var(--text); font-size: 14px; padding: 14px 16px; border-radius: 14px;
          margin-bottom: 22px;
        }
        .notes-input::placeholder { color: var(--text-dim); }

        .add-btn {
          width: 100%; border: none; border-radius: 14px; padding: 15px;
          background: var(--rosewood); color: #fff; font-weight: 600; font-size: 14.5px;
          cursor: pointer;
        }
        .add-btn:disabled { opacity: 0.4; cursor: not-allowed; }

        .more-btn {
          background: var(--panel-2); border: 1px solid var(--border); border-radius: 10px;
          width: 34px; height: 34px; display: flex; align-items: center; justify-content: center;
          color: var(--text-dim); cursor: pointer;
        }

        .stat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px; }
        .stat-card {
          background: var(--panel); border: 1px solid var(--border); border-radius: 16px;
          padding: 16px 18px;
        }
        .stat-label { font-size: 10.5px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-dim); margin-bottom: 8px; }
        .stat-value { font-size: 20px; font-weight: 600; }
        .stat-value.pink { color: var(--rosewood); }
        .stat-value.olive { color: var(--mist); }
        .stat-value.dim { font-size: 15px; color: var(--text-dim); font-weight: 500; }

        .history-card {
          background: var(--panel); border: 1px solid var(--border); border-radius: 16px;
          padding: 16px 18px; display: flex; justify-content: space-between; align-items: center;
          margin-bottom: 18px; cursor: pointer;
        }
        .history-card h4 { margin: 0; font-size: 14.5px; font-weight: 600; }
        .count-badge {
          background: var(--panel-2); border: 1px solid var(--border); border-radius: 999px;
          padding: 4px 12px; font-size: 13px; color: var(--text-dim);
        }

        .progress-label-row { display: flex; justify-content: space-between; font-size: 13px; color: var(--text-dim); margin-bottom: 6px; }
        .progress-track { height: 6px; background: var(--panel-2); border-radius: 6px; overflow: hidden; margin-bottom: 8px; }
        .progress-fill { height: 100%; background: linear-gradient(90deg, var(--rosewood), var(--mist)); }
        .progress-foot-row { display: flex; justify-content: space-between; font-size: 12.5px; color: var(--text-dim); }
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

        <div className="content">
          {/* ── Add expense form ── */}
          <div className="col-form">
            <div className="section-head">Add expense</div>
            <div className="section-underline" />

            <div className="field-label">Amount (Rs)</div>
            <input
              className="amount-input"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
            />

            <div className="field-label">Category</div>
            <div className="pill-row">
              {categories.map(({ name, icon: Icon }) => (
                <button
                  key={name}
                  className={`pill ${category === name ? 'selected' : ''}`}
                  onClick={() => setCategory(name)}
                >
                  {Icon && <Icon size={14} />}
                  {name}
                </button>
              ))}
              <button className="pill" onClick={handleAddCustomCategory}>
                <Plus size={14} /> Custom
              </button>
            </div>

            <div className="two-col">
              <div>
                <div className="field-label">Date</div>
                <div className="date-field">
                  {formatDateDisplay(date)}
                  <Calendar size={16} color="#8a8a86" />
                  <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
              </div>
              <div>
                <div className="field-label">Mode of payment</div>
                <div className="pill-row" style={{ marginBottom: 0 }}>
                  {PAYMENT_MODES.map((m) => (
                    <button
                      key={m}
                      className={`pill ${mode === m ? 'selected-outline' : ''}`}
                      onClick={() => setMode(m)}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="field-label">Notes (optional)</div>
            <input
              className="notes-input"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="What was this for?"
            />

            <button className="add-btn" disabled={!canAdd} onClick={handleAddExpense}>
              + Add expense
            </button>
          </div>

          {/* ── Overview ── */}
          <div className="col-overview">
            <div className="section-head">
              Overview
              <div className="more-btn"><MoreHorizontal size={16} /></div>
            </div>
            <div className="section-underline" />

            <div className="stat-grid">
              <div className="stat-card">
                <div className="stat-label">Total spent</div>
                <div className="stat-value pink">{formatRs(overview.totalSpent)}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Transactions</div>
                <div className="stat-value">{overview.transactions}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Top category</div>
                <div className={`stat-value ${overview.topCategory ? '' : 'dim'}`}>
                  {overview.topCategory || 'None yet'}
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Budget left</div>
                <div className={`stat-value ${overview.budgetLeft !== null ? 'olive' : 'dim'}`}>
                  {overview.budgetLeft !== null ? formatRs(overview.budgetLeft) : 'Set up budget'}
                </div>
              </div>
            </div>

            <div className="history-card">
              <h4>Transaction history</h4>
              <span className="count-badge">{overview.transactions}</span>
            </div>

            <div className="progress-label-row">
              <span>Budget used</span>
              <span>{monthlyBudget ? `${overview.budgetUsedPct}%` : '—'}</span>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${overview.budgetUsedPct}%` }} />
            </div>
            <div className="progress-foot-row">
              <span>{monthlyBudget ? `of ${formatRs(monthlyBudget)} budget` : 'No budget set yet'}</span>
              <span>{overview.budgetLeft !== null ? `${formatRs(overview.budgetLeft)} remaining` : ''}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}