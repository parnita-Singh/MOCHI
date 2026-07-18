"use client";
import React, { useState, useMemo } from 'react';
import {
  Home, CreditCard, Target, FileText, Receipt, MessageCircle,
  Settings, MoreHorizontal, Check, Plus, X,
} from 'lucide-react';
import { useRouter } from "next/navigation";
  
const FALLBACK_TIPS = [
  "Small, regular expenses add up faster than the big ones you notice.",
  "Setting aside money the day you're paid works better than saving what's left over.",
  "A weekly five-minute review catches overspending before it becomes a habit.",
  "Round numbers are easier to stick to than exact ones — try budgeting in clean blocks.",
];
  
function getTipOfDay() {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000
  );
  return FALLBACK_TIPS[dayOfYear % FALLBACK_TIPS.length];
}
  
function getGreetingWord() {
  const hour = new Date().getHours();
  if (hour < 12) return 'morning';
  if (hour < 17) return 'afternoon';
  return 'evening';
}
  
function formatRs(n) {
  return `Rs ${Math.round(n).toLocaleString('en-IN')}`;
}
  
export default function Dashboard() {
  // ── Account state (swap these for real data once you have it — see notes above) ──
  const [screen, setScreen] = useState('onboarding'); // 'onboarding' | 'dashboard'
  const [profile, setProfile] = useState(null);        // { name, monthlyBudget }
  const [savingsGoal, setSavingsGoal] = useState(null); // { name, target, current }
  const [expenses, setExpenses] = useState([]);         // [{ date, amount, category, note }]
  const [mochiTried, setMochiTried] = useState(false);
  
  // ── UI-only state ──
  const [activeForm, setActiveForm] = useState(null); // 'profile' | 'savings' | null
  const [quickAdd, setQuickAdd] = useState(false);
  const [activeNav, setActiveNav] = useState('Dashboard');
  const router = useRouter();
  const steps = [!!profile, !!savingsGoal, expenses.length > 0, mochiTried];
  const progress = Math.round((steps.filter(Boolean).length / steps.length) * 100);
  
  const leftThisMonth = useMemo(() => {
    if (!profile) return null;
    const now = new Date();
    const spent = expenses
      .filter((e) => {
        const d = new Date(e.date);
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
      })
      .reduce((sum, e) => sum + Number(e.amount || 0), 0);
    return profile.monthlyBudget - spent;
  }, [profile, expenses]);
  
  const mochiSaysText = expenses.length === 0
    ? "Log your first expense and I'll start tracking your progress here."
    : "You're logging expenses regularly. Keep it up — that's how the numbers stay honest.";
  
    const navItems = [
      { label: "Dashboard", icon: Home, route: "/dashboard" },
      { label: "Expenses", icon: CreditCard, route: "/finance-profile" },
      { label: "Savings", icon: Target, route: "/savings" },
      { label: "Summaries", icon: FileText, route: "/summaries" },
      { label: "Receipts", icon: Receipt, route: "/receipts" },
      { label: "Mochi AI", icon: MessageCircle, route: "/MOCHI_AI" },
      { label: "Settings", icon: Settings, route: "/settings" },
      ];
  
  return (
    <div className="mochi-root">
      <style>{`
        .mochi-root {
          --bg: #0b0b0b;
          --panel: #151515;
          --panel-2: #1b1b1b;
          --border: #262626;
          --text: #f2f2f0;
          --text-dim: #8a8a86;
          --accent: #faa0c5;
          --accent-dim: #b1cadb;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, sans-serif;
          background: var(--bg);
          color: var(--text);
          min-height: 100vh;
          width: 100%;
          box-sizing: border-box;
        }
        .mochi-root * { box-sizing: border-box; }
  
        /* ── Onboarding ── */
        .onboard-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: 32px 16px;
        }
        .onboard-card {
          width: 100%;
          max-width: 460px;
          background: var(--panel);
          border: 1px solid var(--border);
          border-radius: 24px;
          padding: 36px 32px;
        }
        .onboard-logo { text-align: center; font-weight: 700; font-size: 15px; margin-bottom: 24px; }
        .onboard-title { text-align: center; font-size: 22px; font-weight: 600; margin: 0 0 6px; }
        .onboard-sub { text-align: center; color: var(--text-dim); font-size: 14px; margin: 0 0 28px; }
        .progress-row { display: flex; justify-content: space-between; align-items: center; font-size: 11px; letter-spacing: 0.06em; color: var(--text-dim); margin-bottom: 8px; text-transform: uppercase; }
        .progress-row span:last-child { color: var(--accent); font-weight: 600; }
        .progress-track { height: 4px; background: var(--border); border-radius: 4px; overflow: hidden; margin-bottom: 24px; }
        .progress-fill { height: 100%; background: var(--accent); transition: width 0.3s ease; }
        .step-card {
          background: var(--panel-2);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 16px 18px;
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 12px;
        }
        .step-icon {
          width: 34px; height: 34px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          background: #222; flex-shrink: 0;
        }
        .step-icon.done { background: rgba(207,227,106,0.15); color: var(--accent); }
        .step-body { flex: 1; }
        .step-title { font-size: 14.5px; font-weight: 500; }
        .step-status { font-size: 12.5px; color: var(--text-dim); }
        .pill-btn {
          border: 1px solid var(--border);
          background: transparent;
          color: var(--text);
          padding: 7px 16px;
          border-radius: 999px;
          font-size: 13px;
          cursor: pointer;
          white-space: nowrap;
        }
        .pill-btn:hover { border-color: var(--text-dim); }
        .pill-btn.disabled { opacity: 0.4; cursor: not-allowed; }
        .onboard-footnote { text-align: center; font-size: 12.5px; color: var(--text-dim); margin-top: 20px; }
        .continue-btn {
          width: 100%; margin-top: 8px; padding: 12px;
          border-radius: 12px; border: none; cursor: pointer;
          background: var(--accent); color: #10130a; font-weight: 600; font-size: 14px;
        }
        .continue-btn:disabled { background: #2a2a2a; color: var(--text-dim); cursor: not-allowed; }
  
        /* ── Inline form ── */
        .inline-form { background: var(--panel-2); border: 1px solid var(--border); border-radius: 16px; padding: 18px; margin-bottom: 12px; }
        .inline-form h4 { margin: 0 0 4px; font-size: 14.5px; }
        .inline-form p { margin: 0 0 14px; font-size: 12.5px; color: var(--text-dim); }
        .inline-form label { display: block; font-size: 12px; color: var(--text-dim); margin-bottom: 6px; }
        .inline-form input {
          width: 100%; background: #0f0f0f; border: 1px solid var(--border); color: var(--text);
          padding: 10px 12px; border-radius: 10px; font-size: 14px; margin-bottom: 14px;
        }
        .inline-form input:focus { outline: none; border-color: var(--accent-dim); }
        .form-actions { display: flex; gap: 10px; }
        .form-actions button { flex: 1; padding: 10px; border-radius: 10px; font-size: 13.5px; cursor: pointer; }
        .btn-save { border: none; background: var(--accent); color: #10130a; font-weight: 600; }
        .btn-cancel { border: 1px solid var(--border); background: transparent; color: var(--text); }
  
        /* ── Dashboard layout ── */
        .dash-layout { display: flex; min-height: 100vh; }
        .sidebar {
          width: 220px; flex-shrink: 0; background: var(--bg);
          border-right: 1px solid var(--border); padding: 24px 14px;
        }
        .sidebar-logo { font-weight: 700; font-size: 16px; padding: 0 10px; margin-bottom: 20px; }
        .nav-item {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 12px; border-radius: 10px; font-size: 14px;
          color: var(--text-dim); cursor: pointer; margin-bottom: 2px;
        }
        .nav-item.active { background: var(--panel-2); color: var(--text); }
        .nav-item:hover:not(.active) { color: var(--text); }
  
        .dash-main { flex: 1; padding: 28px 36px; max-width: 760px; }
        .dash-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; }
        .dash-title { font-size: 24px; font-weight: 600; margin: 0 0 4px; }
        .dash-sub { color: var(--text-dim); font-size: 14px; margin: 0; }
        .more-btn { background: var(--panel-2); border: 1px solid var(--border); border-radius: 10px; width: 34px; height: 34px; display: flex; align-items: center; justify-content: center; color: var(--text-dim); cursor: pointer; }
  
        .info-card {
          background: var(--panel); border: 1px solid var(--border);
          border-radius: 18px; padding: 20px 22px; margin-bottom: 14px;
        }
        .info-label { font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-dim); margin-bottom: 8px; }
        .info-main { font-size: 16.5px; font-weight: 500; line-height: 1.45; }
        .info-row { display: flex; justify-content: space-between; align-items: center; gap: 16px; }
  
        .footer-row { display: flex; justify-content: space-between; align-items: baseline; padding: 6px 4px 0; }
        .footer-label { color: var(--text-dim); font-size: 14px; }
        .footer-value { color: var(--accent); font-size: 18px; font-weight: 600; }
        .footer-empty { color: var(--text-dim); font-size: 13.5px; font-style: italic; }
  
        .quickadd-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.6);
          display: flex; align-items: center; justify-content: center; z-index: 50;
        }
        .quickadd-card {
          width: 100%; max-width: 360px; background: var(--panel);
          border: 1px solid var(--border); border-radius: 20px; padding: 22px;
        }
        .quickadd-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
        .quickadd-head h4 { margin: 0; font-size: 15px; }
        .close-x { cursor: pointer; color: var(--text-dim); background: none; border: none; }
      `}</style>
  
      {screen === 'onboarding' ? (
        <Onboarding
          profile={profile}
          savingsGoal={savingsGoal}
          expenses={expenses}
          mochiTried={mochiTried}
          progress={progress}
          activeForm={activeForm}
          setActiveForm={setActiveForm}
          onSaveProfile={(p) => { setProfile(p); setActiveForm(null); }}
          onSaveSavings={(s) => { setSavingsGoal(s); setActiveForm(null); }}
          onTryMochi={() => setMochiTried(true)}
          onContinue={() => setScreen('dashboard')}
        />
      ) : (
        <DashboardScreen
          profile={profile}
          leftThisMonth={leftThisMonth}
          expenses={expenses}
          navItems={navItems}
          activeNav={activeNav}
          setActiveNav={setActiveNav}
          mochiSaysText={mochiSaysText}
          onOpenQuickAdd={() => setQuickAdd(true)}
          router={router}
        />
      )}
  
      {quickAdd && (
        <QuickAddExpense
          onClose={() => setQuickAdd(false)}
          onAdd={(entry) => { setExpenses((prev) => [...prev, entry]); setQuickAdd(false); }}
        />
      )}
    </div>
  );
}
  
function Onboarding({
  profile, savingsGoal, expenses, mochiTried, progress,
  activeForm, setActiveForm, onSaveProfile, onSaveSavings, onTryMochi, onContinue,
}) {
  return (
    <div className="onboard-wrap">
      <div className="onboard-card">
        <div className="onboard-logo">Mochi</div>
        <h2 className="onboard-title">Welcome{profile ? `, ${profile.name}` : ''}</h2>
        <p className="onboard-sub">Let's get your space ready — it only takes a few minutes.</p>
  
        <div className="progress-row"><span>Get started</span><span>{progress}%</span></div>
        <div className="progress-track"><div className="progress-fill" style={{ width: `${progress}%` }} /></div>
  
        {/* Finance profile */}
        <StepRow
          done={!!profile}
          title="Finance profile"
          status={profile ? 'Complete' : 'Not started'}
          actionLabel={profile ? null : 'Set up'}
          onAction={() => setActiveForm('profile')}
        />
        {activeForm === 'profile' && (
          <ProfileForm onSave={onSaveProfile} onCancel={() => setActiveForm(null)} />
        )}
  
        {/* Savings goal */}
        <StepRow
          done={!!savingsGoal}
          title="Savings goal"
          status={savingsGoal ? `${savingsGoal.name}` : 'Not started'}
          actionLabel={savingsGoal ? null : 'Set up'}
          onAction={() => setActiveForm('savings')}
        />
        {activeForm === 'savings' && (
          <SavingsForm onSave={onSaveSavings} onCancel={() => setActiveForm(null)} />
        )}
  
        {/* Summaries — unlocks automatically, not user-set */}
        <StepRow
          done={expenses.length > 0}
          title="Summaries"
          status={expenses.length > 0 ? 'Unlocked' : 'Unlocks after your first expense'}
          actionLabel={null}
        />
  
        {/* Mochi AI */}
        <StepRow
          done={mochiTried}
          title="Mochi AI"
          status="Available anytime"
          actionLabel={mochiTried ? null : 'Try it'}
          onAction={onTryMochi}
        /> 
  
        <button
          className="continue-btn"
          disabled={!profile}
          onClick={onContinue}
        >
          {profile ? 'Continue to your dashboard' : 'Set up your finance profile to continue'}
        </button>
  
        <p className="onboard-footnote">You can finish these later from settings</p>
      </div>
    </div>
  );
}
  
function StepRow({ done, title, status, actionLabel, onAction }) {
  return (
    <div className="step-card">
      <div className={`step-icon ${done ? 'done' : ''}`}>
        {done ? <Check size={16} /> : <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#555' }} />}
      </div>
      <div className="step-body">
        <div className="step-title">{title}</div>
        <div className="step-status">{status}</div>
      </div>
      {actionLabel && (
        <button className="pill-btn" onClick={onAction}>{actionLabel}</button>
      )}
    </div>
  );
}
  
function ProfileForm({ onSave, onCancel }) {
  const [name, setName] = useState('');
  const [budget, setBudget] = useState('');
  const canSave = name.trim() && Number(budget) > 0;
  return (
    <div className="inline-form">
      <h4>Set up your finance profile</h4>
      <p>This just tells Mochi who you are and what you're working with — no numbers are assumed for you.</p>
      <label>Your name</label>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Parnita" />
      <label>Monthly budget (Rs)</label>
      <input type="number" value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="e.g. 25000" />
      <div className="form-actions">
        <button className="btn-cancel" onClick={onCancel}>Cancel</button>
        <button
          className="btn-save"
          disabled={!canSave}
          style={{ opacity: canSave ? 1 : 0.5 }}
          onClick={() => canSave && onSave({ name: name.trim(), monthlyBudget: Number(budget) })}
        >
          Save
        </button>
      </div>
    </div>
  );
}
  
function SavingsForm({ onSave, onCancel }) {
  const [name, setName] = useState('');
  const [target, setTarget] = useState('');
  const canSave = name.trim() && Number(target) > 0;
  return (
    <div className="inline-form">
      <h4>Set a savings goal</h4>
      <p>Give it a name and a target — you can adjust this anytime from Savings.</p>
      <label>Goal name</label>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Trip to Goa" />
      <label>Target amount (Rs)</label>
      <input type="number" value={target} onChange={(e) => setTarget(e.target.value)} placeholder="e.g. 30000" />
      <div className="form-actions">
        <button className="btn-cancel" onClick={onCancel}>Cancel</button>
        <button
          className="btn-save"
          disabled={!canSave}
          style={{ opacity: canSave ? 1 : 0.5 }}
          onClick={() => canSave && onSave({ name: name.trim(), target: Number(target), current: 0 })}
        >
          Save
        </button>
      </div>
    </div>
  );
}
  
function DashboardScreen({
  profile,
  leftThisMonth,
  expenses,
  navItems,
  activeNav,
  setActiveNav,
  mochiSaysText,
  onOpenQuickAdd,
  router,
}) {
  return (
    <div className="dash-layout">
        <div className="sidebar-logo">Mochi</div>
        {navItems.map(({ label, icon: Icon, route }) => (
    <div
    key={label}
    className={`nav-item ${activeNav === label ? "active" : ""}`}
    onClick={() => {
      setActiveNav(label);
      router.push(route);
    }}
  >
    <Icon size={17} />
    {label}
  </div>
))}
          
            <Icon size={17} />
            {label}
          </div>
        )}
  
      <main className="dash-main">
        <div className="dash-header">
          <div>
            <h1 className="dash-title">Good {getGreetingWord()}{profile ? `, ${profile.name}` : ''}</h1>
            <p className="dash-sub">Here's how today's looking.</p>
          </div>
          <div className="more-btn"><MoreHorizontal size={18} /></div>
        </div>
  
        <div className="info-card">
          <div className="info-label">Today's tip</div>
          <div className="info-main">{getTipOfDay()}</div>
        </div>
  
        <div className="info-card">
          <div className="info-label">One small thing</div>
          <div className="info-row">
            <div className="info-main">Log an expense from today</div>
            <button className="pill-btn" onClick={onOpenQuickAdd}>Add</button>
          </div>
        </div>
  
        <div className="info-card">
          <div className="info-label">Mochi says</div>
          <div className="info-main">{mochiSaysText}</div>
        </div>
  
        <div className="footer-row">
          <span className="footer-label">Left this month</span>
          {leftThisMonth !== null
            ? <span className="footer-value">{formatRs(leftThisMonth)}</span>
            : <span className="footer-empty">Set up your budget to see this</span>}
        </div>
      </main>
  
function QuickAddExpense({ onClose, onAdd }) {
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const canAdd = Number(amount) > 0;
  return (
    <div className="quickadd-overlay" onClick={onClose}>
      <div className="quickadd-card" onClick={(e) => e.stopPropagation()}>
        <div className="quickadd-head">
          <h4>Log an expense</h4>
          <button className="close-x" onClick={onClose}><X size={18} /></button>
        </div>
        <label style={{ display: 'block', fontSize: 12, color: 'var(--text-dim)', marginBottom: 6 }}>Amount (Rs)</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="e.g. 150"
          style={{ width: '100%', background: '#0f0f0f', border: '1px solid var(--border)', color: 'var(--text)', padding: '10px 12px', borderRadius: 10, fontSize: 14, marginBottom: 14 }}
        />
        <label style={{ display: 'block', fontSize: 12, color: 'var(--text-dim)', marginBottom: 6 }}>Note (optional)</label>
        <input
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="e.g. Coffee run"
          style={{ width: '100%', background: '#0f0f0f', border: '1px solid var(--border)', color: 'var(--text)', padding: '10px 12px', borderRadius: 10, fontSize: 14, marginBottom: 18 }}
        />
        <div className="form-actions">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button
            className="btn-save"
            style={{ opacity: canAdd ? 1 : 0.5 }}
            disabled={!canAdd}
            onClick={() => canAdd && onAdd({
              date: new Date().toISOString(),
              amount: Number(amount),
              category: 'Uncategorized',
              note: note.trim(),
            })}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
  