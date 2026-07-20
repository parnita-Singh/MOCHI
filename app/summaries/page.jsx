"use client";
import React, { useState, useMemo } from 'react';
import NavBar from '../navigation/NavBar';

const CATEGORY_COLORS = ['var(--blush)', 'var(--rosewood)', 'var(--sage)', 'var(--mist)', 'var(--vanilla)'];

function formatRs(n) {
  return `Rs ${Math.round(n).toLocaleString('en-IN')}`;
}

function startOfWeek(d) {
  // Rolling 7-day window ending today, rather than a fixed Mon–Sun calendar week.
  const end = new Date(d);
  end.setHours(23, 59, 59, 999);
  const start = new Date(d);
  start.setDate(start.getDate() - 6);
  start.setHours(0, 0, 0, 0);
  return { start, end };
}

function startOfMonth(d) {
  const start = new Date(d.getFullYear(), d.getMonth(), 1);
  const end = new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59, 999);
  return { start, end };
}

function inRange(dateStr, range) {
  const d = new Date(dateStr);
  return d >= range.start && d <= range.end;
}

function summarize(expenses, range) {
  const items = expenses.filter((e) => inRange(e.date, range));
  const totalSpent = items.reduce((sum, e) => sum + Number(e.amount || 0), 0);
  const byCategory = {};
  items.forEach((e) => {
    byCategory[e.category || 'Uncategorized'] = (byCategory[e.category || 'Uncategorized'] || 0) + Number(e.amount || 0);
  });
  const categoryList = Object.entries(byCategory).sort((a, b) => b[1] - a[1]);
  const topCategory = categoryList.length ? categoryList[0][0] : null;
  return { totalSpent, transactions: items.length, byCategory, categoryList, topCategory };
}

function daysElapsedInRange(range, today) {
  const end = today < range.end ? today : range.end;
  const ms = end - range.start;
  return Math.max(1, Math.round(ms / 86400000) + 1);
}

function comparisonText(current, previous, label) {
  if (previous === 0 && current === 0) return null;
  if (previous === 0) return null; // nothing honest to compare against
  const pct = Math.round(((current - previous) / previous) * 100);
  if (pct === 0) return `About the same as last ${label}.`;
  const direction = pct < 0 ? 'less' : 'more';
  return `${Math.abs(pct)}% ${direction} than last ${label}.`;
}

export default function Summaries({
  expenses = [],
  monthlyBudget = null,
  monthlyIncome = null,
}) {
  const [period, setPeriod] = useState('weekly'); // 'weekly' | 'monthly'
  const today = useMemo(() => new Date(), []);

  const stats = useMemo(() => {
    if (period === 'weekly') {
      const current = startOfWeek(today);
      const previous = {
        start: new Date(current.start.getTime() - 7 * 86400000),
        end: new Date(current.start.getTime() - 1),
      };
      const cur = summarize(expenses, current);
      const prev = summarize(expenses, previous);
      const days = daysElapsedInRange(current, today);
      return {
        ...cur,
        avgPerDay: cur.totalSpent / days,
        comparison: comparisonText(cur.totalSpent, prev.totalSpent, 'week'),
      };
    }
    const current = startOfMonth(today);
    const prevMonthDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const previous = startOfMonth(prevMonthDate);
    const cur = summarize(expenses, current);
    const prev = summarize(expenses, previous);
    const days = daysElapsedInRange(current, today);
    const budgetUsedPct = monthlyBudget ? Math.min(100, Math.round((cur.totalSpent / monthlyBudget) * 100)) : null;
    const saved = monthlyIncome !== null ? monthlyIncome - cur.totalSpent : null;
    return {
      ...cur,
      avgPerDay: cur.totalSpent / days,
      comparison: comparisonText(cur.totalSpent, prev.totalSpent, 'month'),
      budgetUsedPct,
      saved,
    };
  }, [period, expenses, today, monthlyBudget, monthlyIncome]);

  const insight = useMemo(() => {
    if (stats.transactions === 0) {
      return period === 'weekly'
        ? "Log a few expenses this week and I'll tell you where your money went."
        : "Log some expenses this month and I'll reflect on how it went.";
    }
    const parts = [];
    if (stats.topCategory) parts.push(`${stats.topCategory} was where most of it went`);
    if (stats.comparison) parts.push(stats.comparison.replace(/\.$/, '').toLowerCase());
    if (period === 'monthly' && stats.budgetUsedPct !== null) {
      parts.push(stats.budgetUsedPct <= 100 ? 'you stayed within budget' : 'you went over budget');
    }
    if (!parts.length) return "Keep logging and I'll start noticing patterns for you.";
    return `${parts[0][0].toUpperCase()}${parts[0].slice(1)}${parts.length > 1 ? `, and ${parts.slice(1).join(', ')}` : ''}.`;
  }, [stats, period]);

  return (
    <div className="summaries-root">
      <style>{`
        .summaries-root {
          --bg: #0b0b0b;
          --panel: #151515;
          --panel-2: #1b1b1b;
          --border: #262626;
          --text: #f2f2f0;
          --text-dim: #8a8a86;

          --vanilla: #FFF7E6;
          --blush: #F7C8D3;
          --rosewood: #B46A72;
          --sage: #A8B58A;
          --mist: #A9B7C6;
          --midnight: #2D3A47;
          --ink: #242420;

          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, sans-serif;
          background: var(--bg);
          color: var(--text);
          min-height: 100vh;
        }
        .summaries-root * { box-sizing: border-box; }

        .rainbow-hover { position: relative; }
        .rainbow-hover::after {
          content: '';
          position: absolute; inset: 0; border-radius: inherit; padding: 1.5px;
          background: linear-gradient(120deg, var(--blush), var(--rosewood), var(--sage), var(--mist));
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor; mask-composite: exclude;
          opacity: 0; transition: opacity 0.25s ease; pointer-events: none;
        }
        .rainbow-hover:hover::after { opacity: 1; }

        .layout { display: flex; min-height: 100vh; }
        .main { flex: 1; padding: 28px 36px; max-width: 720px; }

        .head-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        .page-title { font-size: 22px; font-weight: 600; margin: 0 0 4px; }
        .page-sub { color: var(--text-dim); font-size: 14px; margin: 0; }

        .toggle-row { display: flex; gap: 8px; background: var(--panel-2); border: 1px solid var(--border); border-radius: 999px; padding: 4px; width: fit-content; margin-bottom: 22px; }
        .toggle-btn {
          border: none; background: transparent; color: var(--text-dim);
          padding: 8px 18px; border-radius: 999px; font-size: 13.5px; cursor: pointer;
          transition: background 0.18s ease, color 0.18s ease;
        }
        .toggle-btn.active { background: var(--sage); color: var(--ink); font-weight: 600; }

        .hero-card {
          background: var(--panel); border: 1px solid var(--border); border-radius: 20px;
          padding: 24px 26px; margin-bottom: 16px;
        }
        .hero-label { font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-dim); margin-bottom: 10px; }
        .hero-value { font-size: 34px; font-weight: 700; margin-bottom: 8px; }
        .hero-compare { font-size: 13.5px; color: var(--sage); }
        .hero-compare.empty { color: var(--text-dim); font-style: italic; }

        .mini-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 16px; }
        .mini-card {
          background: var(--panel); border: 1px solid var(--border); border-radius: 16px;
          padding: 16px 18px;
        }
        .mini-label { font-size: 10.5px; letter-spacing: 0.07em; text-transform: uppercase; color: var(--text-dim); margin-bottom: 8px; }
        .mini-value { font-size: 18px; font-weight: 600; }
        .mini-value.dim { font-size: 14px; color: var(--text-dim); font-weight: 500; }

        .section-card {
          background: var(--panel); border: 1px solid var(--border); border-radius: 18px;
          padding: 20px 22px; margin-bottom: 16px;
        }
        .section-title { font-size: 13px; font-weight: 600; margin-bottom: 14px; }

        .cat-row { margin-bottom: 12px; }
        .cat-row:last-child { margin-bottom: 0; }
        .cat-label-row { display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 5px; }
        .cat-label-row .name { display: flex; align-items: center; gap: 8px; }
        .cat-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
        .cat-track { height: 6px; background: var(--panel-2); border-radius: 6px; overflow: hidden; }
        .cat-fill { height: 100%; border-radius: 6px; }

        .empty-state { color: var(--text-dim); font-size: 13.5px; font-style: italic; }

        .budget-progress-row { display: flex; justify-content: space-between; font-size: 13px; color: var(--text-dim); margin-bottom: 6px; }
        .budget-track { height: 6px; background: var(--panel-2); border-radius: 6px; overflow: hidden; margin-bottom: 6px; }
        .budget-fill { height: 100%; background: linear-gradient(90deg, var(--rosewood), var(--sage), var(--mist)); }

        .insight-card {
          background: var(--panel-2); border: 1px solid var(--border); border-radius: 18px;
          padding: 18px 22px; display: flex; align-items: flex-start; gap: 12px;
        }
        .insight-dot { width: 26px; height: 26px; border-radius: 50%; background: var(--vanilla); border: 2px solid var(--blush); flex-shrink: 0; margin-top: 1px; }
        .insight-label { font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-dim); margin-bottom: 6px; }
        .insight-text { font-size: 14.5px; line-height: 1.5; }
      `}</style>

      <div className="layout">
        <NavBar />

        <main className="main">
          <div className="head-row">
            <div>
              <h1 className="page-title">{period === 'weekly' ? 'Weekly Snapshot' : 'Monthly Reflection'}</h1>
              <p className="page-sub">A quick look at where your money went.</p>
            </div>
          </div>

          <div className="toggle-row">
            <button
              className={`toggle-btn ${period === 'weekly' ? 'active' : ''}`}
              onClick={() => setPeriod('weekly')}
            >
              Weekly
            </button>
            <button
              className={`toggle-btn ${period === 'monthly' ? 'active' : ''}`}
              onClick={() => setPeriod('monthly')}
            >
              Monthly
            </button>
          </div>

          {/* ── Hero: total spent ── */}
          <div className="hero-card rainbow-hover">
            <div className="hero-label">{period === 'weekly' ? 'Spent this week' : 'Spent this month'}</div>
            <div className="hero-value">{formatRs(stats.totalSpent)}</div>
            {stats.comparison
              ? <div className="hero-compare">{stats.comparison}</div>
              : <div className="hero-compare empty">Not enough history yet to compare.</div>}
          </div>

          {/* ── Income vs expense + saved, monthly only ── */}
          {period === 'monthly' && monthlyIncome !== null && (
            <div className="mini-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
              <div className="mini-card rainbow-hover">
                <div className="mini-label">Income</div>
                <div className="mini-value">{formatRs(monthlyIncome)}</div>
              </div>
              <div className="mini-card rainbow-hover">
                <div className="mini-label">Saved</div>
                <div className={`mini-value ${stats.saved >= 0 ? '' : 'dim'}`} style={{ color: stats.saved >= 0 ? 'var(--sage)' : 'var(--rosewood)' }}>
                  {formatRs(stats.saved)}
                </div>
              </div>
            </div>
          )}

          {/* ── Mini stats ── */}
          <div className="mini-grid">
            <div className="mini-card rainbow-hover">
              <div className="mini-label">Avg per day</div>
              <div className="mini-value">{formatRs(stats.avgPerDay)}</div>
            </div>
            <div className="mini-card rainbow-hover">
              <div className="mini-label">Top category</div>
              <div className={`mini-value ${stats.topCategory ? '' : 'dim'}`}>{stats.topCategory || 'None yet'}</div>
            </div>
            <div className="mini-card rainbow-hover">
              <div className="mini-label">{period === 'weekly' ? 'Transactions' : 'Budget left'}</div>
              {period === 'weekly' ? (
                <div className="mini-value">{stats.transactions}</div>
              ) : (
                <div className={`mini-value ${monthlyBudget ? '' : 'dim'}`}>
                  {monthlyBudget ? formatRs(monthlyBudget - stats.totalSpent) : 'Set up budget'}
                </div>
              )}
            </div>
          </div>

          {/* ── Budget progress, monthly only ── */}
          {period === 'monthly' && (
            <div className="section-card">
              <div className="section-title">Budget used</div>
              {monthlyBudget ? (
                <>
                  <div className="budget-progress-row">
                    <span>{stats.budgetUsedPct}%</span>
                    <span>of {formatRs(monthlyBudget)} budget</span>
                  </div>
                  <div className="budget-track"><div className="budget-fill" style={{ width: `${stats.budgetUsedPct}%` }} /></div>
                </>
              ) : (
                <div className="empty-state">Set a monthly budget in your finance profile to see this.</div>
              )}
            </div>
          )}

          {/* ── Category breakdown ── */}
          <div className="section-card">
            <div className="section-title">Category breakdown</div>
            {stats.categoryList.length ? (
              stats.categoryList.map(([name, amount], i) => {
                const pct = stats.totalSpent ? Math.round((amount / stats.totalSpent) * 100) : 0;
                const color = CATEGORY_COLORS[i % CATEGORY_COLORS.length];
                return (
                  <div className="cat-row" key={name}>
                    <div className="cat-label-row">
                      <span className="name"><span className="cat-dot" style={{ background: color }} />{name}</span>
                      <span>{formatRs(amount)}</span>
                    </div>
                    <div className="cat-track"><div className="cat-fill" style={{ width: `${pct}%`, background: color }} /></div>
                  </div>
                );
              })
            ) : (
              <div className="empty-state">No expenses logged {period === 'weekly' ? 'this week' : 'this month'} yet.</div>
            )}
          </div>

          {/* ── AI insight ── */}
          <div className="insight-card">
            <div className="insight-dot" />
            <div>
              <div className="insight-label">Mochi's take</div>
              <div className="insight-text">{insight}</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}