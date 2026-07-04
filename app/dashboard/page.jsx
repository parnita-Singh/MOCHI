"use client";
 
import { useState, useEffect } from "react";
 
/* ---------------------------------------------------------
   Swap this for your real auth/session data — e.g. the
   result of useSession(), a server-passed prop, or a
   /api/me call. Whatever it returns just needs a `name`.
--------------------------------------------------------- */
function useCurrentUser() {
  return { name: "Parnita Singh" };
}
 
const CATEGORIES = [
  { key: "rent", label: "Rent", color: "#B46A72" },
  { key: "groceries", label: "Groceries", color: "#A8B58A" },
  { key: "dining", label: "Dining", color: "#F7C8D3" },
  { key: "utilities", label: "Utilities", color: "#A9B7C6" },
  { key: "goals", label: "Goals", color: "#FFF7E6" },
  { key: "extras", label: "Extras", color: "#A9B7C6" },
];
 
const PAYMENTS = ["UPI", "Card", "Cash", "Bank", "Wallet", "Cheque"];
 
const DEFAULT_BUDGET = 55000;
 
function formatINR(n) {
  return "₹" + Number(n || 0).toLocaleString("en-IN", { maximumFractionDigits: 0 });
}
function capitalize(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}
 
export default function MochiExpenseTracker() {
  const user = useCurrentUser();
 
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(null);
  const [payment, setPayment] = useState(null);
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [shake, setShake] = useState(null);
 
  /* ---------- budget: user-editable, persisted per browser ---------- */
  const [budget, setBudget] = useState(DEFAULT_BUDGET);
  const [editingBudget, setEditingBudget] = useState(false);
  const [budgetDraft, setBudgetDraft] = useState("");
 
  useEffect(() => {
    setDate(new Date().toISOString().slice(0, 10));
    const saved = typeof window !== "undefined" && localStorage.getItem("mochi_budget");
    if (saved) setBudget(Number(saved));
  }, []);
 
  function saveBudget() {
    const val = parseFloat(budgetDraft);
    if (val > 0) {
      setBudget(val);
      if (typeof window !== "undefined") localStorage.setItem("mochi_budget", String(val));
    }
    setEditingBudget(false);
    setBudgetDraft("");
  }
 
  function flash(field) {
    setShake(field);
    setTimeout(() => setShake(null), 400);
  }
 
  function addExpense() {
    const amt = parseFloat(amount);
    if (!amt || amt <= 0) return flash("amount");
    if (!category) return flash("category");
    if (!payment) return flash("payment");
 
    setTransactions((prev) => [
      ...prev,
      { amount: amt, category, payment, date: date || new Date().toISOString().slice(0, 10), notes: notes.trim() },
    ]);
    setAmount("");
    setNotes("");
    setCategory(null);
    setPayment(null);
    setHistoryOpen(true);
  }
 
  const total = transactions.reduce((s, t) => s + t.amount, 0);
  const left = Math.max(budget - total, 0);
  const pct = budget > 0 ? Math.min(Math.round((total / budget) * 100), 100) : 0;
  const byCategory = {};
  transactions.forEach((t) => (byCategory[t.category] = (byCategory[t.category] || 0) + t.amount));
  const top = Object.entries(byCategory).sort((a, b) => b[1] - a[1])[0];
  const catColor = (key) => CATEGORIES.find((c) => c.key === key)?.color || "#A9B7C6";
 
  return (
    <div className="app">
      <header>
        <div className="brand">
          <span className="dot" />
          Mochi
        </div>
        <div className="header-right">
          <div className="user-chip">
            <div className="avatar">{user.name.trim().charAt(0).toUpperCase()}</div>
            <span className="userName">{user.name}</span>
          </div>
          <button className="signout">Sign out</button>
          <button className="kebab">⋯</button>
        </div>
      </header>
 
      <div className="grid">
        {/* ================= ADD EXPENSE ================= */}
        <div className="panel">
          <div className="eyebrow">Add Expense</div>
 
          <div className="amount-row">
            <label className="field-label">Amount (₹)</label>
            <div className={`amount-wrap ${shake === "amount" ? "shake" : ""}`}>
              <span className="cur">₹</span>
              <input
                type="text"
                inputMode="decimal"
                placeholder="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>
 
          <div className="section">
            <label className="field-label">Category</label>
            <div className={`pills ${shake === "category" ? "shake" : ""}`}>
              {CATEGORIES.map((c) => (
                <button
                  key={c.key}
                  className={`pill ${category === c.key ? "active" : ""}`}
                  style={
                    category === c.key
                      ? { borderColor: c.color, background: c.color + "26", color: "#F5F3EF" }
                      : {}
                  }
                  onClick={() => setCategory(c.key)}
                >
                  <span className="swatch" style={{ background: c.color }} />
                  {c.label}
                </button>
              ))}
              <button className="pill custom">+ Custom</button>
            </div>
          </div>
 
          <div className="two-col">
            <div>
              <label className="field-label">Date</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div>
              <label className="field-label">Mode of Payment</label>
              <div className={`pay-grid ${shake === "payment" ? "shake" : ""}`}>
                {PAYMENTS.map((p) => (
                  <button
                    key={p}
                    className={`pay ${payment === p ? "active" : ""}`}
                    onClick={() => setPayment(p)}
                  >
                    {p}
                  </button>
                ))}
                <button className="pay custom">+ Other</button>
              </div>
            </div>
          </div>
 
          <div className="section">
            <label className="field-label">Notes (optional)</label>
            <input
              type="text"
              placeholder="Any info to add on?"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
 
          <button className="add-btn" onClick={addExpense}>
            + Add expense
          </button>
        </div>
 
        {/* ================= OVERVIEW ================= */}
        <div className="panel">
          <div className="eyebrow">Overview</div>
 
          <div className="stats-grid">
            <div className="stat spent">
              <div className="stat-label">Total Spent</div>
              <div className="stat-value">{formatINR(total)}</div>
            </div>
            <div className="stat txn">
              <div className="stat-label">Transactions</div>
              <div className="stat-value">{transactions.length}</div>
            </div>
            <div className="stat top">
              <div className="stat-label">Top Category</div>
              <div className="stat-value small">{top ? capitalize(top[0]) : "—"}</div>
            </div>
            <div className="stat left">
              <div className="stat-label">Budget Left</div>
              <div className="stat-value">{formatINR(left)}</div>
            </div>
          </div>
 
          <div className={`history-toggle ${historyOpen ? "open" : ""}`} onClick={() => setHistoryOpen((o) => !o)}>
            <div className="htitle">
              Transaction history <span className="badge">{transactions.length}</span>
            </div>
            <span className="chev">⌄</span>
          </div>
 
          {historyOpen && (
            <div className="history-list">
              {transactions.length === 0 ? (
                <div className="empty-note">No transactions yet — add your first expense.</div>
              ) : (
                transactions
                  .slice()
                  .reverse()
                  .map((t, i) => (
                    <div className="txn-row" key={i}>
                      <div className="txn-left">
                        <span className="txn-dot" style={{ background: catColor(t.category) }} />
                        <div>
                          <div>
                            {capitalize(t.category)}
                            {t.notes ? ` · ${t.notes}` : ""}
                          </div>
                          <div className="txn-meta">
                            {t.date} · {t.payment}
                          </div>
                        </div>
                      </div>
                      <div className="txn-amt">{formatINR(t.amount)}</div>
                    </div>
                  ))
              )}
            </div>
          )}
 
          <div className="budget-block">
            <div className="budget-row">
              <span>Budget used</span>
              <span className="pct">{pct}%</span>
            </div>
            <div className="budget-bar">
              <div className="budget-fill" style={{ width: `${pct}%` }} />
            </div>
 
            <div className="budget-foot">
              {editingBudget ? (
                <div className="budget-edit">
                  <span className="cur small">₹</span>
                  <input
                    autoFocus
                    type="text"
                    inputMode="decimal"
                    className="budget-input"
                    placeholder={String(budget)}
                    value={budgetDraft}
                    onChange={(e) => setBudgetDraft(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && saveBudget()}
                  />
                  <button className="budget-save" onClick={saveBudget}>
                    Save
                  </button>
                  <button className="budget-cancel" onClick={() => setEditingBudget(false)}>
                    ✕
                  </button>
                </div>
              ) : (
                <>
                  <span>
                    of {formatINR(budget)} budget{" "}
                    <button
                      className="edit-budget-link"
                      onClick={() => {
                        setBudgetDraft(String(budget));
                        setEditingBudget(true);
                      }}
                    >
                      edit
                    </button>
                  </span>
                  <span>{formatINR(left)} remaining</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
 
      <style jsx>{`
        :root {
        }
        .app {
          --bg: #0a0a0b;
          --bg-panel: #131315;
          --bg-panel-2: #17181b;
          --line: rgba(255, 255, 255, 0.08);
          --line-soft: rgba(255, 255, 255, 0.05);
          --text-hi: #f5f3ef;
          --text-mid: #9a9a9f;
          --text-low: #63636a;
 
          --vanilla: #fff7e6;
          --blush: #f7c8d3;
          --rosewood: #b46a72;
          --sage: #a8b58a;
          --misty: #a9b7c6;
          --lagoon: #2d3a47;
 
          --rosewood-tint: rgba(180, 106, 114, 0.16);
          --lagoon-tint: rgba(45, 58, 71, 0.55);
 
          background: var(--bg);
          color: var(--text-hi);
          font-family: "Inter", sans-serif;
          max-width: 1180px;
          margin: 0 auto;
          padding: 28px 24px 60px;
        }
 
        header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 22px;
          margin-bottom: 28px;
          border-bottom: 1px solid var(--line);
        }
        .brand {
          font-family: "Fraunces", serif;
          font-weight: 600;
          font-size: 26px;
          letter-spacing: -0.01em;
          color: var(--vanilla);
          display: flex;
          align-items: center;
          gap: 9px;
        }
        .dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: var(--rosewood);
          box-shadow: 0 0 0 4px var(--rosewood-tint);
        }
        .header-right {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .user-chip {
          display: flex;
          align-items: center;
          gap: 9px;
          font-size: 14px;
          color: var(--text-mid);
        }
        .avatar {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: var(--lagoon);
          color: var(--misty);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 600;
          border: 1px solid var(--line);
        }
        .userName {
          color: var(--text-hi);
          font-weight: 500;
        }
        .signout {
          background: transparent;
          border: 1px solid var(--line);
          color: var(--text-hi);
          font-size: 13px;
          padding: 8px 16px;
          border-radius: 8px;
          cursor: pointer;
        }
        .signout:hover {
          border-color: var(--rosewood);
          background: var(--rosewood-tint);
        }
        .kebab {
          background: none;
          border: none;
          color: var(--text-mid);
          font-size: 18px;
          cursor: pointer;
          padding: 6px;
        }
 
        .grid {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: 22px;
        }
        @media (max-width: 860px) {
          .grid {
            grid-template-columns: 1fr;
          }
        }
 
        .panel {
          background: var(--bg-panel);
          border: 1px solid var(--line);
          border-radius: 16px;
          padding: 26px;
        }
 
        .eyebrow {
          font-size: 11.5px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--text-low);
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
        }
        .eyebrow::after {
          content: "";
          flex: 1;
          height: 1px;
          background: linear-gradient(to right, var(--line), transparent);
        }
 
        .field-label {
          display: block;
          font-size: 12px;
          color: var(--text-mid);
          margin-bottom: 9px;
          letter-spacing: 0.03em;
          text-transform: uppercase;
        }
 
        .amount-row {
          margin-bottom: 22px;
        }
        .amount-wrap {
          display: flex;
          align-items: baseline;
          gap: 6px;
          border-bottom: 1px solid var(--line);
          padding-bottom: 12px;
        }
        .amount-wrap .cur {
          font-size: 22px;
          color: var(--text-low);
          font-family: "Fraunces", serif;
        }
        .amount-wrap input {
          background: none;
          border: none;
          outline: none;
          color: var(--text-hi);
          font-family: "Fraunces", serif;
          font-size: 34px;
          font-weight: 500;
          width: 100%;
        }
 
        .section {
          margin-bottom: 22px;
        }
        .pills {
          display: flex;
          flex-wrap: wrap;
          gap: 9px;
        }
        .pill {
          border: 1px solid var(--line);
          background: var(--bg-panel-2);
          color: var(--text-mid);
          font-size: 13px;
          padding: 9px 15px;
          border-radius: 20px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 7px;
          transition: all 0.15s ease;
        }
        .pill .swatch {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }
        .pill:hover {
          color: var(--text-hi);
        }
        .pill.custom {
          border-style: dashed;
        }
 
        .two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 22px;
          margin-bottom: 22px;
        }
        input[type="date"],
        input[type="text"] {
          width: 100%;
          background: var(--bg-panel-2);
          border: 1px solid var(--line);
          border-radius: 10px;
          padding: 11px 13px;
          color: var(--text-hi);
          font-family: "Inter", sans-serif;
          font-size: 14px;
          outline: none;
        }
        input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(0.6);
          cursor: pointer;
        }
 
        .pay-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 9px;
        }
        .pay {
          border: 1px solid var(--line);
          background: var(--bg-panel-2);
          color: var(--text-mid);
          font-size: 13px;
          padding: 9px 14px;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .pay:hover {
          color: var(--text-hi);
        }
        .pay.active {
          background: var(--rosewood-tint);
          border-color: var(--rosewood);
          color: var(--vanilla);
        }
        .pay.custom {
          border-style: dashed;
        }
 
        .add-btn {
          width: 100%;
          background: var(--rosewood);
          color: #1a0f10;
          border: none;
          font-weight: 600;
          font-size: 14.5px;
          padding: 15px;
          border-radius: 11px;
          cursor: pointer;
        }
        .add-btn:hover {
          filter: brightness(1.12);
        }
 
        .stats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          margin-bottom: 18px;
        }
        .stat {
          background: var(--bg-panel-2);
          border: 1px solid var(--line);
          border-radius: 12px;
          padding: 16px 17px;
        }
        .stat-label {
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-low);
          margin-bottom: 8px;
        }
        .stat-value {
          font-family: "Fraunces", serif;
          font-size: 23px;
          font-weight: 500;
        }
        .stat-value.small {
          font-size: 16px;
          font-family: "Inter", sans-serif;
        }
        .stat.spent .stat-value {
          color: var(--rosewood);
        }
        .stat.txn .stat-value {
          color: var(--misty);
        }
        .stat.top .stat-value {
          color: var(--sage);
        }
        .stat.left .stat-value {
          color: var(--vanilla);
        }
 
        .history-toggle {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: var(--bg-panel-2);
          border: 1px solid var(--line);
          border-radius: 12px;
          padding: 14px 17px;
          cursor: pointer;
          margin-bottom: 18px;
        }
        .htitle {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
        }
        .badge {
          background: var(--lagoon-tint);
          color: var(--misty);
          font-size: 12px;
          padding: 2px 9px;
          border-radius: 20px;
        }
        .chev {
          color: var(--text-low);
          transition: transform 0.2s ease;
        }
        .history-toggle.open .chev {
          transform: rotate(180deg);
        }
 
        .history-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 18px;
          max-height: 220px;
          overflow-y: auto;
        }
        .txn-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 11px 13px;
          background: var(--bg-panel-2);
          border: 1px solid var(--line-soft);
          border-radius: 10px;
          font-size: 13px;
        }
        .txn-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .txn-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
        }
        .txn-meta {
          color: var(--text-low);
          font-size: 11.5px;
        }
        .txn-amt {
          font-family: "Fraunces", serif;
        }
        .empty-note {
          color: var(--text-low);
          font-size: 13px;
          padding: 6px 2px;
        }
 
        .budget-block {
          margin-top: 6px;
        }
        .budget-row {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: var(--text-mid);
          margin-bottom: 9px;
        }
        .pct {
          color: var(--sage);
        }
        .budget-bar {
          height: 7px;
          border-radius: 20px;
          background: var(--bg-panel-2);
          border: 1px solid var(--line-soft);
          overflow: hidden;
        }
        .budget-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--rosewood), var(--blush));
          border-radius: 20px;
          transition: width 0.3s ease;
        }
        .budget-foot {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 12px;
          color: var(--text-low);
          margin-top: 9px;
        }
        .edit-budget-link {
          background: none;
          border: none;
          color: var(--misty);
          font-size: 12px;
          text-decoration: underline;
          cursor: pointer;
          padding: 0;
          margin-left: 4px;
        }
        .budget-edit {
          display: flex;
          align-items: center;
          gap: 6px;
          width: 100%;
        }
        .cur.small {
          font-family: "Fraunces", serif;
          color: var(--text-low);
        }
        .budget-input {
          background: var(--bg-panel-2) !important;
          border: 1px solid var(--rosewood) !important;
          border-radius: 6px !important;
          padding: 5px 8px !important;
          color: var(--text-hi) !important;
          font-size: 12px !important;
          width: 90px !important;
        }
        .budget-save,
        .budget-cancel {
          background: none;
          border: 1px solid var(--line);
          color: var(--text-mid);
          font-size: 11px;
          padding: 4px 9px;
          border-radius: 6px;
          cursor: pointer;
        }
        .budget-save:hover {
          border-color: var(--sage);
          color: var(--sage);
        }
        .budget-cancel:hover {
          border-color: var(--rosewood);
          color: var(--rosewood);
        }
 
        .shake {
          animation: shake 0.35s ease;
        }
        @keyframes shake {
          25% {
            transform: translateX(-4px);
          }
          75% {
            transform: translateX(4px);
          }
        }
      `}</style>
    </div>
  );
}
 