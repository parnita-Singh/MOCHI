"use client";
import React, { useState, useMemo, useEffect } from 'react';
import { Plus, X, Star, Check } from 'lucide-react';
import NavBar from '../navigation/NavBar';

function formatRs(n) {
  return `Rs ${Math.round(n).toLocaleString('en-IN')}`;
}

function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });
}

function monthsBetween(from, to) {
  const months = (to.getFullYear() - from.getFullYear()) * 12 + (to.getMonth() - from.getMonth());
  return Math.max(1, months);
}

function weeksBetween(from, to) {
  return Math.max(1, Math.round((to - from) / (7 * 86400000)));
}

const MILESTONES = [25, 50, 75, 100];

function highestMilestone(pct) {
  return MILESTONES.filter((m) => pct >= m).pop() || 0;
}

function computeGoalStats(goal) {
  const progressPct = goal.target > 0 ? Math.min(100, (goal.saved / goal.target) * 100) : 0;
  const remaining = Math.max(0, goal.target - goal.saved);
  const today = new Date();
  const deadline = goal.deadline ? new Date(goal.deadline) : null;

  let recommendedMonthly = null;
  if (deadline && deadline > today && remaining > 0) {
    recommendedMonthly = remaining / monthsBetween(today, deadline);
  }

  const created = new Date(goal.createdAt);
  const weeksElapsed = weeksBetween(created, today);
  const actualWeeklyPace = goal.saved / weeksElapsed;

  let requiredWeeklyPace = null;
  if (deadline && deadline > today && remaining > 0) {
    requiredWeeklyPace = remaining / weeksBetween(today, deadline);
  }

  return {
    progressPct,
    remaining,
    recommendedMonthly,
    actualWeeklyPace,
    requiredWeeklyPace,
    milestone: highestMilestone(progressPct),
    achieved: progressPct >= 100,
  };
}

export default function SavingsGoals() {
  const [goals, setGoals] = useState([]); // [{ id, name, target, saved, deadline, priority, createdAt, contributions: [] }]
  const [showNewGoalForm, setShowNewGoalForm] = useState(false);
  const [contributingTo, setContributingTo] = useState(null); // goal id
  const [celebration, setCelebration] = useState(null); // { goalName, milestone }

  useEffect(() => {
    if (!celebration) return;
    const t = setTimeout(() => setCelebration(null), 5000);
    return () => clearTimeout(t);
  }, [celebration]);

  const priorityGoal = goals.find((g) => g.priority) || goals[0] || null;
  const otherGoals = goals.filter((g) => g.id !== priorityGoal?.id);

  function handleCreateGoal({ name, target, deadline, makePriority }) {
    const goal = {
      id: `${Date.now()}`,
      name,
      target,
      saved: 0,
      deadline,
      priority: makePriority || goals.length === 0,
      createdAt: new Date().toISOString(),
      contributions: [],
    };
    setGoals((prev) => {
      const next = makePriority ? prev.map((g) => ({ ...g, priority: false })) : prev;
      return [...next, goal];
    });
    // TODO: persist `goal` to /data/savingsGoals.json or your backend here.
    setShowNewGoalForm(false);
  }

  function handleSetPriority(id) {
    setGoals((prev) => prev.map((g) => ({ ...g, priority: g.id === id })));
  }

  function handleAddContribution(id, amount, note) {
    setGoals((prev) => prev.map((g) => {
      if (g.id !== id) return g;
      const prevPct = computeGoalStats(g).progressPct;
      const updated = {
        ...g,
        saved: g.saved + amount,
        contributions: [...g.contributions, { date: new Date().toISOString(), amount, note }],
      };
      const newPct = computeGoalStats(updated).progressPct;
      const crossed = MILESTONES.filter((m) => newPct >= m && prevPct < m);
      if (crossed.length) {
        setCelebration({ goalName: g.name, milestone: crossed[crossed.length - 1] });
      }
      // TODO: persist `updated` to /data/savingsGoals.json or your backend here.
      return updated;
    }));
    setContributingTo(null);
  }

  const suggestion = useMemo(() => {
    if (!priorityGoal) return "Create your first goal and I'll help you pace it out.";
    const stats = computeGoalStats(priorityGoal);
    if (stats.achieved) return `You reached your "${priorityGoal.name}" goal. Time to set a new one?`;
    if (!priorityGoal.deadline) return `Add a deadline to "${priorityGoal.name}" and I can tell you exactly how much to save each week.`;
    if (stats.requiredWeeklyPace === null) return `Your deadline for "${priorityGoal.name}" has passed — want to push it out and I'll recalculate the pace?`;
    if (stats.actualWeeklyPace >= stats.requiredWeeklyPace) {
      return `You're pacing well on "${priorityGoal.name}" — keep saving about ${formatRs(stats.requiredWeeklyPace)}/week and you'll make it by ${formatDate(priorityGoal.deadline)}.`;
    }
    const shortfall = stats.requiredWeeklyPace - stats.actualWeeklyPace;
    return `Save about ${formatRs(shortfall)} more per week on "${priorityGoal.name}" to stay on track for ${formatDate(priorityGoal.deadline)}.`;
  }, [priorityGoal]);

  return (
    <div className="savings-root">
      <style>{`
        .savings-root {
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
        .savings-root * { box-sizing: border-box; }

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

        .rainbow-focus { position: relative; }
        .rainbow-focus::after {
          content: '';
          position: absolute; inset: 0; border-radius: inherit; padding: 1.5px;
          background: linear-gradient(120deg, var(--blush), var(--rosewood), var(--sage), var(--mist));
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor; mask-composite: exclude;
          opacity: 0; transition: opacity 0.25s ease; pointer-events: none;
        }
        .rainbow-focus:focus-within::after { opacity: 1; }

        .layout { display: flex; min-height: 100vh; }
        .main { flex: 1; padding: 28px 36px; max-width: 780px; }

        .head-row { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; }
        .page-title { font-size: 22px; font-weight: 600; margin: 0 0 4px; }
        .page-sub { color: var(--text-dim); font-size: 14px; margin: 0; }
        .new-goal-btn {
          display: flex; align-items: center; gap: 6px; border: none; border-radius: 999px;
          background: var(--sage); color: var(--ink); font-weight: 600; font-size: 13.5px;
          padding: 9px 16px; cursor: pointer; white-space: nowrap;
        }

        .celebration-banner {
          background: linear-gradient(120deg, var(--blush), var(--vanilla));
          color: var(--ink); border-radius: 16px; padding: 14px 18px;
          display: flex; justify-content: space-between; align-items: center;
          font-size: 14px; font-weight: 500; margin-bottom: 16px;
        }
        .celebration-banner button { background: none; border: none; color: var(--ink); cursor: pointer; }

        .empty-card {
          background: var(--panel); border: 1px solid var(--border); border-radius: 20px;
          padding: 32px 28px; text-align: center; margin-bottom: 16px;
        }
        .empty-card p { color: var(--text-dim); font-size: 14px; margin: 0 0 16px; }

        .main-goal-card {
          background: var(--panel); border: 1px solid var(--border); border-radius: 22px;
          padding: 26px 28px; margin-bottom: 18px;
        }
        .goal-head-row { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px; }
        .goal-name { font-size: 19px; font-weight: 600; display: flex; align-items: center; gap: 8px; }
        .goal-name .star { color: var(--vanilla); }
        .goal-deadline { color: var(--text-dim); font-size: 13px; margin-bottom: 18px; }

        .progress-track-lg { height: 10px; background: var(--panel-2); border-radius: 10px; overflow: hidden; margin-bottom: 10px; }
        .progress-fill-lg { height: 100%; border-radius: 10px; background: linear-gradient(90deg, var(--rosewood), var(--sage), var(--mist)); transition: width 0.3s ease; }

        .amounts-row { display: flex; justify-content: space-between; font-size: 14px; margin-bottom: 16px; }
        .amounts-row .saved { color: var(--sage); font-weight: 600; }
        .amounts-row .target { color: var(--text-dim); }

        .milestone-row { display: flex; gap: 8px; margin-bottom: 18px; }
        .milestone-chip {
          flex: 1; text-align: center; padding: 8px 6px; border-radius: 10px; font-size: 11.5px;
          border: 1px solid var(--border); color: var(--text-dim);
        }
        .milestone-chip.done { background: var(--sage); color: var(--ink); border-color: var(--sage); font-weight: 600; }

        .pace-line { font-size: 13.5px; color: var(--text-dim); margin-bottom: 18px; }
        .pace-line strong { color: var(--text); font-weight: 600; }

        .goal-actions { display: flex; gap: 10px; }
        .contribute-btn {
          flex: 1; border: none; border-radius: 12px; padding: 12px; cursor: pointer;
          background: var(--rosewood); color: #fff; font-weight: 600; font-size: 14px;
        }
        .history-toggle {
          border: 1px solid var(--border); background: transparent; color: var(--text-dim);
          border-radius: 12px; padding: 12px 16px; cursor: pointer; font-size: 13.5px;
        }
        .history-toggle:hover { border-color: var(--mist); color: var(--mist); }

        .contribution-log { margin-top: 16px; border-top: 1px solid var(--border); padding-top: 14px; }
        .contribution-row { display: flex; justify-content: space-between; font-size: 13px; padding: 6px 0; color: var(--text-dim); }
        .contribution-row span:first-child { color: var(--text); }

        .others-title { font-size: 12px; letter-spacing: 0.07em; text-transform: uppercase; color: var(--text-dim); margin: 22px 0 12px; }
        .others-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 20px; }
        .other-card {
          background: var(--panel); border: 1px solid var(--border); border-radius: 16px; padding: 16px 18px;
        }
        .other-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
        .other-name { font-size: 14px; font-weight: 600; }
        .make-priority { background: none; border: none; color: var(--text-dim); cursor: pointer; padding: 2px; }
        .make-priority:hover { color: var(--vanilla); }
        .progress-track-sm { height: 6px; background: var(--panel-2); border-radius: 6px; overflow: hidden; margin-bottom: 8px; }
        .progress-fill-sm { height: 100%; border-radius: 6px; background: var(--sage); }
        .other-amounts { display: flex; justify-content: space-between; font-size: 12.5px; color: var(--text-dim); margin-bottom: 10px; }
        .other-add-btn {
          width: 100%; border: 1px solid var(--border); background: transparent; color: var(--text);
          border-radius: 10px; padding: 8px; cursor: pointer; font-size: 13px;
        }
        .other-add-btn:hover { border-color: var(--blush); color: var(--blush); }

        .insight-card {
          background: var(--panel-2); border: 1px solid var(--border); border-radius: 18px;
          padding: 18px 22px; display: flex; align-items: flex-start; gap: 12px;
        }
        .insight-dot { width: 26px; height: 26px; border-radius: 50%; background: var(--vanilla); border: 2px solid var(--blush); flex-shrink: 0; margin-top: 1px; }
        .insight-label { font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-dim); margin-bottom: 6px; }
        .insight-text { font-size: 14.5px; line-height: 1.5; }

        .overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.6);
          display: flex; align-items: center; justify-content: center; z-index: 50;
        }
        .modal-card {
          width: 100%; max-width: 380px; background: var(--panel);
          border: 1px solid var(--border); border-radius: 20px; padding: 22px;
        }
        .modal-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
        .modal-head h4 { margin: 0; font-size: 15px; }
        .close-x { cursor: pointer; color: var(--text-dim); background: none; border: none; }
        .close-x:hover { color: var(--blush); }
        .modal-card label { display: block; font-size: 12px; color: var(--text-dim); margin-bottom: 6px; }
        .modal-card input {
          width: 100%; background: #0f0f0f; border: 1px solid var(--border); color: var(--text);
          padding: 10px 12px; border-radius: 10px; font-size: 14px; margin-bottom: 14px;
        }
        .modal-card input:focus { outline: none; border-color: var(--mist); }
        .checkbox-row { display: flex; align-items: center; gap: 8px; margin-bottom: 16px; font-size: 13.5px; color: var(--text-dim); }
        .form-actions { display: flex; gap: 10px; }
        .form-actions button { flex: 1; padding: 10px; border-radius: 10px; font-size: 13.5px; cursor: pointer; }
        .btn-save { border: none; background: var(--sage); color: #10130a; font-weight: 600; }
        .btn-cancel { border: 1px solid var(--border); background: transparent; color: var(--text); }
        .btn-cancel:hover { border-color: var(--blush); color: var(--blush); }
      `}</style>

      <div className="layout">
        <NavBar />

        <main className="main">
          <div className="head-row">
            <div>
              <h1 className="page-title">Savings Goals</h1>
              <p className="page-sub">Build your future one small step at a time.</p>
            </div>
            {goals.length > 0 && (
              <button className="new-goal-btn" onClick={() => setShowNewGoalForm(true)}>
                <Plus size={15} /> New goal
              </button>
            )}
          </div>

          {celebration && (
            <div className="celebration-banner">
              <span>🎉 You just hit {celebration.milestone}% of your "{celebration.goalName}" goal!</span>
              <button onClick={() => setCelebration(null)}><X size={16} /></button>
            </div>
          )}

          {goals.length === 0 && !showNewGoalForm && (
            <div className="empty-card rainbow-hover">
              <p>You don't have any savings goals yet. Give one a name, a target, and a date — Mochi will work out the pace for you.</p>
              <button className="new-goal-btn" style={{ margin: '0 auto' }} onClick={() => setShowNewGoalForm(true)}>
                <Plus size={15} /> Create your first goal
              </button>
            </div>
          )}

          {showNewGoalForm && (
            <NewGoalForm
              hasExistingGoals={goals.length > 0}
              onCreate={handleCreateGoal}
              onCancel={() => setShowNewGoalForm(false)}
            />
          )}

          {priorityGoal && (
            <MainGoalCard
              goal={priorityGoal}
              onContribute={() => setContributingTo(priorityGoal.id)}
            />
          )}

          {otherGoals.length > 0 && (
            <>
              <div className="others-title">Other goals</div>
              <div className="others-grid">
                {otherGoals.map((g) => (
                  <OtherGoalCard
                    key={g.id}
                    goal={g}
                    onMakePriority={() => handleSetPriority(g.id)}
                    onContribute={() => setContributingTo(g.id)}
                  />
                ))}
              </div>
            </>
          )}

          {goals.length > 0 && (
            <div className="insight-card">
              <div className="insight-dot" />
              <div>
                <div className="insight-label">Mochi suggests</div>
                <div className="insight-text">{suggestion}</div>
              </div>
            </div>
          )}
        </main>
      </div>

      {contributingTo && (
        <AddContributionModal
          onClose={() => setContributingTo(null)}
          onAdd={(amount, note) => handleAddContribution(contributingTo, amount, note)}
        />
      )}
    </div>
  );
}

function MainGoalCard({ goal, onContribute }) {
  const [showHistory, setShowHistory] = useState(false);
  const stats = computeGoalStats(goal);

  return (
    <div className="main-goal-card rainbow-hover">
      <div className="goal-head-row">
        <div className="goal-name">{goal.priority && <Star size={16} className="star" fill="currentColor" />}{goal.name}</div>
      </div>
      <div className="goal-deadline">{goal.deadline ? `Target date: ${formatDate(goal.deadline)}` : 'No deadline set'}</div>

      <div className="progress-track-lg"><div className="progress-fill-lg" style={{ width: `${stats.progressPct}%` }} /></div>
      <div className="amounts-row">
        <span className="saved">{formatRs(goal.saved)} saved</span>
        <span className="target">of {formatRs(goal.target)}</span>
      </div>

      <div className="milestone-row">
        {MILESTONES.map((m) => (
          <div key={m} className={`milestone-chip ${stats.progressPct >= m ? 'done' : ''}`}>
            {stats.progressPct >= m ? <Check size={12} /> : `${m}%`}
          </div>
        ))}
      </div>

      <div className="pace-line">
        {stats.achieved
          ? "Goal reached — nicely done."
          : stats.recommendedMonthly !== null
            ? <>Save about <strong>{formatRs(stats.recommendedMonthly)}/month</strong> to reach this by {formatDate(goal.deadline)}.</>
            : goal.deadline
              ? "This deadline has already passed — consider updating it."
              : "Add a deadline to get a recommended monthly pace."}
      </div>

      <div className="goal-actions">
        {!stats.achieved && <button className="contribute-btn" onClick={onContribute}>+ Add contribution</button>}
        {goal.contributions.length > 0 && (
          <button className="history-toggle" onClick={() => setShowHistory((s) => !s)}>
            {showHistory ? 'Hide history' : `History (${goal.contributions.length})`}
          </button>
        )}
      </div>

      {showHistory && (
        <div className="contribution-log">
          {goal.contributions.slice().reverse().map((c, i) => (
            <div className="contribution-row" key={i}>
              <span>{formatRs(c.amount)}{c.note ? ` — ${c.note}` : ''}</span>
              <span>{new Date(c.date).toLocaleDateString('en-IN')}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function OtherGoalCard({ goal, onMakePriority, onContribute }) {
  const stats = computeGoalStats(goal);
  return (
    <div className="other-card rainbow-hover">
      <div className="other-head">
        <div className="other-name">{goal.name}</div>
        <button className="make-priority" title="Make this the main goal" onClick={onMakePriority}>
          <Star size={15} />
        </button>
      </div>
      <div className="progress-track-sm"><div className="progress-fill-sm" style={{ width: `${stats.progressPct}%` }} /></div>
      <div className="other-amounts">
        <span>{formatRs(goal.saved)} saved</span>
        <span>of {formatRs(goal.target)}</span>
      </div>
      {!stats.achieved && <button className="other-add-btn" onClick={onContribute}>+ Add</button>}
    </div>
  );
}

function NewGoalForm({ hasExistingGoals, onCreate, onCancel }) {
  const [name, setName] = useState('');
  const [target, setTarget] = useState('');
  const [deadline, setDeadline] = useState('');
  const [makePriority, setMakePriority] = useState(!hasExistingGoals);
  const canSave = name.trim() && Number(target) > 0;

  return (
    <div className="modal-card rainbow-focus" style={{ maxWidth: 'none', marginBottom: 18 }}>
      <div className="modal-head"><h4>New savings goal</h4><button className="close-x" onClick={onCancel}><X size={18} /></button></div>
      <label>Goal name</label>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. New Laptop" />
      <label>Target amount (Rs)</label>
      <input type="number" value={target} onChange={(e) => setTarget(e.target.value)} placeholder="e.g. 60000" />
      <label>Target date (optional)</label>
      <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
      {hasExistingGoals && (
        <div className="checkbox-row">
          <input
            type="checkbox"
            checked={makePriority}
            onChange={(e) => setMakePriority(e.target.checked)}
            style={{ width: 'auto', marginBottom: 0 }}
          />
          Make this my main goal
        </div>
      )}
      <div className="form-actions">
        <button className="btn-cancel" onClick={onCancel}>Cancel</button>
        <button
          className="btn-save"
          disabled={!canSave}
          style={{ opacity: canSave ? 1 : 0.5 }}
          onClick={() => canSave && onCreate({ name: name.trim(), target: Number(target), deadline: deadline || null, makePriority })}
        >
          Create goal
        </button>
      </div>
    </div>
  );
}

function AddContributionModal({ onClose, onAdd }) {
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const canAdd = Number(amount) > 0;

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal-card rainbow-focus" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head"><h4>Add a contribution</h4><button className="close-x" onClick={onClose}><X size={18} /></button></div>
        <label>Amount (Rs)</label>
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="e.g. 2000" />
        <label>Note (optional)</label>
        <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="e.g. From this month's savings" />
        <div className="form-actions">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button
            className="btn-save"
            disabled={!canAdd}
            style={{ opacity: canAdd ? 1 : 0.5 }}
            onClick={() => canAdd && onAdd(Number(amount), note.trim())}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}