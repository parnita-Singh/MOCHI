"use client";
export const dynamic = "force-dynamic";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
 
const CATEGORIES = [
  { label: "🏠 Rent", value: "Rent", color: "#A9B7C6" },
  { label: "🛒 Groceries", value: "Groceries", color: "#A8B58A" },
  { label: "🍽 Dining", value: "Dining", color: "#F7C8D3" },
  { label: "⚡ Utilities", value: "Utilities", color: "#FFF7E6" },
  { label: "🎯 Goals", value: "Goals", color: "#B46A72" },
  { label: "✦ Extras", value: "Extras", color: "#888" },
];
 
const PAYMENTS = ["UPI", "Card", "Cash", "Bank"];
 
export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
 
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({
    amount: "",
    date: new Date().toISOString().split("T")[0],
    payment: "UPI",
    category: "Groceries",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
 
  useEffect(() => {
    if (status === "unauthenticated") router.push("/sign-in");
  }, [status, router]);
 
  useEffect(() => {
    if (status === "authenticated") fetchExpenses();
  }, [status]);
 
  async function fetchExpenses() {
    setFetching(true);
    const res = await fetch("/api/expenses");
    const data = await res.json();
    setExpenses(data.expenses || []);
    setFetching(false);
  }
 
  async function handleAdd() {
    if (!form.amount || isNaN(Number(form.amount))) return;
    setLoading(true);
    await fetch("/api/expenses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, amount: Number(form.amount) }),
    });
    setForm({ ...form, amount: "", notes: "" });
    await fetchExpenses();
    setLoading(false);
  }
 
  const total = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
  const budget = 55000;
  const pct = Math.min(Math.round((total / budget) * 100), 100);
  const remaining = budget - total;
 
  const byCategory = CATEGORIES.map((cat) => {
    const sum = expenses
      .filter((e) => e.category === cat.value)
      .reduce((s, e) => s + Number(e.amount), 0);
    const barPct = total > 0 ? Math.round((sum / total) * 100) : 0;
    return { ...cat, sum, barPct };
  }).filter((c) => c.sum > 0);
 
  const topCat = byCategory.ssort((a, b) => b.sum - a.sum)[0];
 
  if (status === "loading") {
    return (
      <main style={{ background: "#0a0a0a", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "#555", fontFamily: "sans-serif" }}>
        Loading...
      </main>
    );
  }
 
  return (
    <main style={{ background: "#0a0a0a", minHeight: "100vh", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", color: "#f0ede8", padding: "24px" }}>
 
      {/* Top bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#2D3A47", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 500, color: "#A9B7C6" }}>
            {session?.user?.name?.slice(0, 2).toUpperCase() || "ME"}
          </div>
          <div>
            <div style={{ fontSize: "14px", fontWeight: 500 }}>Good day, {session?.user?.name?.split(" ")[0]}</div>
            <div style={{ fontSize: "11px", color: "#555" }}>July 2026 · {pct}% of budget used</div>
          </div>
        </div>
        <button onClick={() => signOut({ callbackUrl: "/" })} style={{ fontSize: "11px", color: "#555", background: "none", border: "1px solid #222", borderRadius: "8px", padding: "6px 12px", cursor: "pointer", fontFamily: "inherit" }}>
          Sign out
        </button>
      </div>
 
      {/* Rainbow divider */}
      <div style={{ height: "1px", background: "linear-gradient(90deg,#FFF7E6,#F7C8D3,#B46A72,#A8B58A,#A9B7C6,#2D3A47)", opacity: 0.4, marginBottom: "16px" }} />
 
      {/* Top grid — form + list */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
 
        {/* ADD EXPENSE FORM */}
        <div style={{ background: "#111", borderRadius: "14px", border: "1px solid #1e1e1e", padding: "18px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg,#F7C8D3,#B46A72)" }} />
          <div style={{ fontSize: "10px", color: "#555", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "14px" }}>Add expense</div>
 
          <div style={{ marginBottom: "10px" }}>
            <label style={{ fontSize: "10px", color: "#666", display: "block", marginBottom: "4px" }}>Amount (₹)</label>
            <input
              type="number"
              placeholder="0"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              style={{ width: "100%", background: "#161616", border: "1px solid #A9B7C6", borderRadius: "7px", padding: "8px 10px", fontSize: "12px", color: "#d0cdc8", fontFamily: "inherit", outline: "none" }}
            />
          </div>
 
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "10px" }}>
            <div>
              <label style={{ fontSize: "10px", color: "#666", display: "block", marginBottom: "4px" }}>Date</label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                style={{ width: "100%", background: "#161616", border: "1px solid #222", borderRadius: "7px", padding: "8px 10px", fontSize: "11px", color: "#d0cdc8", fontFamily: "inherit", outline: "none" }}
              />
            </div>
            <div>
              <label style={{ fontSize: "10px", color: "#666", display: "block", marginBottom: "4px" }}>Payment</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                {PAYMENTS.map((p) => (
                  <span key={p} onClick={() => setForm({ ...form, payment: p })}
                    style={{ fontSize: "10px", padding: "3px 8px", borderRadius: "99px", border: `1px solid ${form.payment === p ? "#B46A72" : "#222"}`, color: form.payment === p ? "#B46A72" : "#666", background: form.payment === p ? "rgba(180,106,114,0.1)" : "transparent", cursor: "pointer" }}>
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>
 
          <div style={{ marginBottom: "10px" }}>
            <label style={{ fontSize: "10px", color: "#666", display: "block", marginBottom: "4px" }}>Category</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
              {CATEGORIES.map((c) => (
                <span key={c.value} onClick={() => setForm({ ...form, category: c.value })}
                  style={{ fontSize: "10px", padding: "3px 9px", borderRadius: "99px", border: `1px solid ${form.category === c.value ? "#B46A72" : "#222"}`, color: form.category === c.value ? "#B46A72" : "#666", background: form.category === c.value ? "rgba(180,106,114,0.1)" : "transparent", cursor: "pointer" }}>
                  {c.label}
                </span>
              ))}
            </div>
          </div>
 
          <div style={{ marginBottom: "12px" }}>
            <label style={{ fontSize: "10px", color: "#666", display: "block", marginBottom: "4px" }}>Notes (optional)</label>
            <input
              type="text"
              placeholder="e.g. Weekly grocery run"
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              style={{ width: "100%", background: "#161616", border: "1px solid #222", borderRadius: "7px", padding: "8px 10px", fontSize: "11px", color: "#d0cdc8", fontFamily: "inherit", outline: "none" }}
            />
          </div>
 
          <button onClick={handleAdd} disabled={loading}
            style={{ width: "100%", padding: "9px", borderRadius: "8px", border: "none", background: loading ? "#333" : "linear-gradient(135deg,#B46A72,#A9B7C6)", color: "#f0ede8", fontSize: "12px", fontWeight: 500, cursor: loading ? "not-allowed" : "pointer", fontFamily: "inherit" }}>
            {loading ? "Saving..." : "+ Add expense"}
          </button>
        </div>
 
        {/* TRANSACTION LIST */}
        <div style={{ background: "#111", borderRadius: "14px", border: "1px solid #1e1e1e", padding: "18px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg,#A9B7C6,#2D3A47)" }} />
          <div style={{ fontSize: "10px", color: "#555", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "14px" }}>Transactions · July</div>
 
          {fetching ? (
            <div style={{ fontSize: "12px", color: "#555", textAlign: "center", padding: "20px 0" }}>Loading...</div>
          ) : expenses.length === 0 ? (
            <div style={{ fontSize: "12px", color: "#555", textAlign: "center", padding: "20px 0" }}>No expenses yet — add your first one.</div>
          ) : (
            [...expenses].reverse().slice(0, 6).map((e, i) => {
              const cat = CATEGORIES.find((c) => c.value === e.category);
              return (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "9px 0", borderBottom: i < 5 ? "1px solid #161616" : "none" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: cat?.color || "#888", flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "12px", color: "#d0cdc8", marginBottom: "2px" }}>{e.notes || e.category}</div>
                    <div style={{ fontSize: "10px", color: "#555", display: "flex", gap: "5px", alignItems: "center" }}>
                      <span style={{ fontSize: "9px", padding: "1px 6px", borderRadius: "99px", background: `${cat?.color}20`, color: cat?.color }}>{cat?.label || e.category}</span>
                      <span>{e.date} · {e.payment}</span>
                    </div>
                  </div>
                  <div style={{ fontSize: "13px", fontWeight: 600, color: "#B46A72" }}>-₹{Number(e.amount).toLocaleString()}</div>
                </div>
              );
            })
          )}
 
          {expenses.length > 0 && (
            <div style={{ background: "#161616", borderRadius: "9px", border: "1px solid #1e1e1e", padding: "10px 12px", fontSize: "11px", color: "#A8B58A", lineHeight: 1.6, marginTop: "10px", display: "flex", gap: "8px", alignItems: "flex-start" }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#B46A72", marginTop: "4px", flexShrink: 0 }} />
              <span>
                {topCat ? `${topCat.label} is your biggest spend at ${topCat.barPct}% of total.` : "Keep tracking — Mochi AI insights will appear here."}
                {pct < 60 ? " You're on track for the month." : pct < 85 ? " Keep an eye on spending this month." : " Budget running low — consider cutting back."}
              </span>
            </div>
          )}
        </div>
      </div>
 
      {/* Bottom grid — totals + category breakdown */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
 
        {/* RUNNING TOTAL */}
        <div style={{ background: "#111", borderRadius: "14px", border: "1px solid #1e1e1e", padding: "18px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg,#A8B58A,#A9B7C6)" }} />
          <div style={{ fontSize: "10px", color: "#555", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "14px" }}>Running total · July 2026</div>
 
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "12px" }}>
            {[
              { label: "Total spent", value: `₹${total.toLocaleString()}`, color: "#B46A72" },
              { label: "Transactions", value: expenses.length, color: "#A9B7C6" },
              { label: "Daily average", value: `₹${Math.round(total / (new Date().getDate())).toLocaleString()}`, color: "#FFF7E6" },
              { label: "Top category", value: topCat?.label || "—", color: "#A9B7C6" },
            ].map((k) => (
              <div key={k.label} style={{ background: "#161616", borderRadius: "9px", padding: "10px 12px", border: "1px solid #1e1e1e" }}>
                <div style={{ fontSize: "9px", color: "#555", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "3px" }}>{k.label}</div>
                <div style={{ fontSize: "17px", fontWeight: 600, letterSpacing: "-0.3px", color: k.color }}>{k.value}</div>
              </div>
            ))}
          </div>
 
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", color: "#555", marginBottom: "5px" }}>
              <span>Budget used · ₹{total.toLocaleString()} of ₹{budget.toLocaleString()}</span>
              <span style={{ color: "#A8B58A" }}>{pct}%</span>
            </div>
            <div style={{ height: "5px", background: "#1e1e1e", borderRadius: "99px", overflow: "hidden" }}>
              <div style={{ width: `${pct}%`, height: "100%", borderRadius: "99px", background: "linear-gradient(90deg,#A8B58A,#A9B7C6)", transition: "width 0.5s ease" }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", color: "#555", marginTop: "5px" }}>
              <span>Budget left</span>
              <span style={{ color: remaining > 0 ? "#A8B58A" : "#B46A72", fontWeight: 500 }}>₹{Math.abs(remaining).toLocaleString()} {remaining < 0 ? "over budget" : "remaining"}</span>
            </div>
          </div>
        </div>
 
        {/* CATEGORY BREAKDOWN */}
        <div style={{ background: "#111", borderRadius: "14px", border: "1px solid #1e1e1e", padding: "18px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg,#FFF7E6,#F7C8D3)" }} />
          <div style={{ fontSize: "10px", color: "#555", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "14px" }}>Spending by category</div>
 
          {byCategory.length === 0 ? (
            <div style={{ fontSize: "12px", color: "#555", textAlign: "center", padding: "20px 0" }}>Add expenses to see breakdown.</div>
          ) : (
            byCategory.map((cat) => (
              <div key={cat.value} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                <span style={{ fontSize: "11px", color: "#d0cdc8", width: "90px", flexShrink: 0 }}>{cat.label}</span>
                <div style={{ flex: 1, height: "4px", background: "#1e1e1e", borderRadius: "99px", overflow: "hidden" }}>
                  <div style={{ width: `${cat.barPct}%`, height: "100%", borderRadius: "99px", background: cat.color, transition: "width 0.5s ease" }} />
                </div>
                <span style={{ fontSize: "10px", color: "#555", width: "50px", textAlign: "right", flexShrink: 0 }}>₹{cat.sum.toLocaleString()}</span>
              </div>
            ))
          )}
 
          {expenses.length > 0 && (
            <div style={{ background: "#161616", borderRadius: "9px", border: "1px solid #1e1e1e", padding: "10px 12px", fontSize: "11px", color: "#A8B58A", lineHeight: 1.6, marginTop: "12px", display: "flex", gap: "8px", alignItems: "flex-start" }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#B46A72", marginTop: "4px", flexShrink: 0 }} />
              <span>You're {pct}% through the budget{pct < 50 ? " with most of the month left. You're doing well." : pct < 80 ? ". Stay mindful of spending." : ". Budget is nearly full."}</span>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}