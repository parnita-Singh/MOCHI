import Image from "next/image";

export default function Hero() {
  return (
    <main className="bg-black text-white">

      {/* ── HERO ── */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <div className="animate-float mb-6">
          <img src="/photos/MOCHI.png" alt="Mochi mascot" width={220} height={220} />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
          Smart Budgeting <span className="text-[#7087BB]">with Mochi</span>
        </h1>
        <p className="text-white/50 text-lg md:text-xl max-w-xl">
          Your cute little financial companion — tracking every rupee so you don't have to stress about it.
        </p>
      </section>

      {/* ── HOW MOCHI HELPS ── */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          How Mochi <span className="text-[#7087BB]">helps you</span>
        </h2>
        <p className="text-white/40 text-center mb-16 max-w-lg mx-auto">
          No spreadsheets. No confusion. Just Mochi keeping your finances warm and fuzzy.
        </p>

        <div className="flex flex-col gap-24">

          {/* ── TRACKING FINANCE ── */}
          <div className="flex flex-col items-center gap-8">
            <div
              className="group w-full rounded-3xl p-[2px] transition-all duration-500"
              style={{
                background: "transparent",
                border: "2px solid transparent",
                borderRadius: "24px",
                backgroundClip: "padding-box",
                position: "relative",
              }}
            >
              <div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: "linear-gradient(135deg, #FFF7E6, #F7C8D3, #B46A72, #A8B58A, #A9B7C6, #2D3A47)",
                  borderRadius: "24px",
                  padding: "2px",
                  WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                  zIndex: 0,
                }}
              />
              <div className="relative z-10 w-full rounded-3xl overflow-hidden" style={{ aspectRatio: "16/7" }}>
                <img
                  src="/photos/Tracking finace.png"
                  alt="Tracking Finance"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
            <div className="max-w-2xl text-center">
              <h3 className="text-xl font-semibold mb-3 text-white">
                Track every rupee, effortlessly
              </h3>
              <p className="text-white/40 text-sm leading-relaxed">
                Mochi's finance tracker gives you a real-time snapshot of your June spending — broken down by category with a live chart, expected vs actual amounts, and instant status flags. See exactly where your money went, spot overruns at a glance, and always know how much budget you have left. No manual math, no Excel formulas — just clarity.
              </p>
            </div>
          </div>

          {/* ── GOALS ── */}
          <div className="flex flex-col items-center gap-8">
            <div
              className="group w-full rounded-3xl transition-all duration-500"
              style={{ position: "relative" }}
            >
              <div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: "linear-gradient(135deg, #FFF7E6, #F7C8D3, #B46A72, #A8B58A, #A9B7C6, #2D3A47)",
                  borderRadius: "24px",
                  padding: "2px",
                  WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                  zIndex: 0,
                }}
              />
              <div className="relative z-10 w-full rounded-3xl overflow-hidden" style={{ aspectRatio: "16/7" }}>
                <img
                  src="/photos/GOALS.png"
                  alt="Goals"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
            <div className="max-w-2xl text-center">
              <h3 className="text-xl font-semibold mb-3 text-white">
                Set goals. Watch them grow.
              </h3>
              <p className="text-white/40 text-sm leading-relaxed">
                Whether it's a Goa vacation, an emergency fund, a new laptop, or your annual SIP — Mochi tracks every goal with a target amount, deadline, and live progress bar. Monthly spending limits keep you in check category by category. Stay motivated by seeing exactly how close you are, and get a gentle nudge before you slip over budget.
              </p>
            </div>
          </div>

          {/* ── SUMMARIES ── */}
          <div className="flex flex-col items-center gap-8">
            <div
              className="group w-full rounded-3xl transition-all duration-500"
              style={{ position: "relative" }}
            >
              <div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: "linear-gradient(135deg, #FFF7E6, #F7C8D3, #B46A72, #A8B58A, #A9B7C6, #2D3A47)",
                  borderRadius: "24px",
                  padding: "2px",
                  WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                  zIndex: 0,
                }}
              />
              <div className="relative z-10 w-full rounded-3xl overflow-hidden" style={{ aspectRatio: "16/7" }}>
                <img
                  src="/photos/Summaries.png"
                  alt="Summaries"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
            <div className="max-w-2xl text-center">
              <h3 className="text-xl font-semibold mb-3 text-white">
                Your whole month, in one view
              </h3>
              <p className="text-white/40 text-sm leading-relaxed">
                Mochi's summary dashboard collects everything — total income, total expenses, savings rate, top spending category, budget remaining, and goal progress — into one clean view. And at the end of every month, Mochi AI writes you a personalised insight: what went well, what to fix, and what's ahead. Finance that actually talks to you.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ── HOW MOCHI WORKS ── */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          How Mochi <span className="text-[#7087BB]">works</span>
        </h2>
        <p className="text-white/40 text-center mb-16 max-w-lg mx-auto">
          Set up once. Mochi tracks, nudges, and learns — automatically.
        </p>

        <div
          className="group w-full rounded-3xl transition-all duration-500"
          style={{ position: "relative" }}
        >
          <div
            className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: "linear-gradient(135deg, #FFF7E6, #F7C8D3, #B46A72, #A8B58A, #A9B7C6, #2D3A47)",
              borderRadius: "24px",
              padding: "2px",
              WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
              zIndex: 0,
            }}
          />
          <div className="relative z-10 w-full rounded-3xl overflow-hidden bg-[#0f0f0f] border border-white/5 p-8">
            <HowMochiWorks />
          </div>
        </div>

        <div className="max-w-2xl text-center mx-auto mt-8">
          <h3 className="text-xl font-semibold mb-3 text-white">
            Four steps to financial clarity
          </h3>
          <p className="text-white/40 text-sm leading-relaxed">
            Mochi keeps it simple — add your income, log your expenses, set budgets and goals, then let Mochi AI do the heavy lifting. It spots patterns, flags overspends before they happen, and gives you a monthly summary that actually makes sense. Smart finance, zero stress.
          </p>
        </div>
      </section>

      {/* ── MOCHI AI ── */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="bg-[#7087BB]/10 border border-[#7087BB]/30 rounded-3xl p-12 md:p-16 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <span className="text-xs font-semibold tracking-widest text-[#7087BB] uppercase mb-4 block">
              Powered by AI
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Meet <span className="text-[#7087BB]">Mochi AI</span> ✨
            </h2>
            <p className="text-white/60 leading-relaxed mb-6">
              Ask it anything — "How much did I spend on food last month?", "Am I on track for my savings goal?", or "Where can I cut back?" — and get instant, honest answers.
            </p>
            <ul className="text-white/40 text-sm space-y-3">
              <li>✦ &nbsp;Natural language financial queries</li>
              <li>✦ &nbsp;Personalised saving suggestions</li>
              <li>✦ &nbsp;Spending pattern analysis</li>
              <li>✦ &nbsp;Anomaly and unusual spend alerts</li>
            </ul>
          </div>
          <div className="flex-shrink-0 bg-black/30 rounded-2xl border border-white/10 p-6 w-full md:w-80">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-[#7087BB]" />
              <span className="text-xs text-white/40">Mochi AI</span>
            </div>
            <div className="space-y-3 text-sm">
              <div className="bg-white/5 rounded-xl rounded-tl-none px-4 py-3 text-white/70">
                You spent ₹4,200 on dining this month — 40% more than last month. Want me to set a limit? 🍜
              </div>
              <div className="bg-[#7087BB]/20 rounded-xl rounded-tr-none px-4 py-3 text-white/80 ml-auto text-right">
                Yes! Set ₹3,000 as my food budget.
              </div>
              <div className="bg-white/5 rounded-xl rounded-tl-none px-4 py-3 text-white/70">
                Done! I'll nudge you at ₹2,400 so you have room to adjust 🎯
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}

// ── HOW MOCHI WORKS INLINE COMPONENT ──
function HowMochiWorks() {
  return (
    <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", color: "#f0ede8" }}>

      {/* Steps grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "0", position: "relative", marginBottom: "32px" }}>

        {/* Connector line */}
        <div style={{
          position: "absolute", top: "28px",
          left: "calc(12.5% + 14px)", right: "calc(12.5% + 14px)",
          height: "1px",
          background: "linear-gradient(90deg,#FFF7E6,#F7C8D3,#B46A72,#A8B58A,#A9B7C6,#2D3A47)",
          opacity: 0.4, zIndex: 0,
        }} />

        {[
          {
            num: "01", color: "#FFF7E6", borderColor: "rgba(255,247,230,0.2)", bg: "rgba(255,247,230,0.08)",
            gradStart: "#FFF7E6", gradEnd: "#F7C8D3",
            title: "Add your income", desc: "Log salary, freelance, or any source. Mochi builds your baseline.",
            mini: (
              <div style={{ background: "#111", borderRadius: "10px", padding: "10px 12px", border: "1px solid #1e1e1e" }}>
                {[["Salary", "₹65,000", "#FFF7E6"], ["Freelance", "₹12,000", "#F7C8D3"]].map(([l, v, c]) => (
                  <div key={l} style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px", fontSize: "11px" }}>
                    <span style={{ color: "#555" }}>{l}</span><span style={{ color: c, fontWeight: 500 }}>{v}</span>
                  </div>
                ))}
                <div style={{ borderTop: "1px solid #1e1e1e", paddingTop: "6px", marginTop: "3px", display: "flex", justifyContent: "space-between", fontSize: "11px" }}>
                  <span style={{ color: "#888" }}>Total</span><span style={{ color: "#f0ede8", fontWeight: 500 }}>₹77,000</span>
                </div>
              </div>
            ),
          },
          {
            num: "02", color: "#F7C8D3", borderColor: "rgba(247,200,211,0.2)", bg: "rgba(247,200,211,0.08)",
            gradStart: "#F7C8D3", gradEnd: "#B46A72",
            title: "Record expenses", desc: "Log manually or let Mochi auto-detect from your patterns.",
            mini: (
              <div style={{ background: "#111", borderRadius: "10px", padding: "10px 12px", border: "1px solid #1e1e1e" }}>
                {[["Groceries", "₹8,400", "#F7C8D3"], ["Dining out", "₹3,200", "#B46A72"], ["Transport", "₹2,100", "#888"]].map(([l, v, c]) => (
                  <div key={l} style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px", fontSize: "11px" }}>
                    <span style={{ color: "#555" }}>{l}</span><span style={{ color: c, fontWeight: 500 }}>{v}</span>
                  </div>
                ))}
              </div>
            ),
          },
          {
            num: "03", color: "#A8B58A", borderColor: "rgba(168,181,138,0.2)", bg: "rgba(168,181,138,0.08)",
            gradStart: "#A8B58A", gradEnd: "#A9B7C6",
            title: "Set budgets & goals", desc: "Define limits per category and save toward what matters to you.",
            mini: (
              <div style={{ background: "#111", borderRadius: "10px", padding: "10px 12px", border: "1px solid #1e1e1e" }}>
                {[["Vacation", 47, "#A9B7C6"], ["Emergency", 37, "#B46A72"], ["Invest SIP", 50, "#A8B58A"]].map(([l, pct, c]) => (
                  <div key={l} style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px", fontSize: "10px" }}>
                    <span style={{ color: "#555", width: "58px" }}>{l}</span>
                    <div style={{ flex: 1, height: "4px", background: "#1e1e1e", borderRadius: "99px", overflow: "hidden" }}>
                      <div style={{ width: `${pct}%`, height: "100%", background: c, borderRadius: "99px" }} />
                    </div>
                    <span style={{ color: c, width: "28px", textAlign: "right" }}>{pct}%</span>
                  </div>
                ))}
              </div>
            ),
          },
          {
            num: "04", color: "#A9B7C6", borderColor: "rgba(169,183,198,0.2)", bg: "rgba(169,183,198,0.08)",
            gradStart: "#A9B7C6", gradEnd: "#2D3A47",
            title: "Get AI insights", desc: "Mochi AI spots patterns, flags overspends, and suggests smarter moves.",
            mini: (
              <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                <div style={{ fontSize: "10px", color: "#555", marginBottom: "2px" }}>Mochi AI says</div>
                <div style={{ fontSize: "10px", color: "#d0cdc8", lineHeight: 1.5, background: "#141414", padding: "7px 9px", borderRadius: "8px", border: "1px solid #1e1e1e" }}>
                  Dining is at 86% of limit — you'll exceed it by Friday. 🍜
                </div>
                <div style={{ fontSize: "10px", color: "#A8B58A", lineHeight: 1.5, background: "#141414", padding: "7px 9px", borderRadius: "8px", border: "1px solid #1e1e1e" }}>
                  You saved ₹700 on utilities. Redirect to Vacation fund?
                </div>
              </div>
            ),
          },
        ].map((step) => (
          <div key={step.num} style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "0 8px", position: "relative", zIndex: 1 }}>
            <div style={{ width: "56px", height: "56px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "18px", background: step.bg, border: `1px solid ${step.borderColor}` }}>
              <span style={{ fontSize: "11px", fontWeight: 600, color: step.color }}>{step.num}</span>
            </div>
            <div style={{ background: "#141414", borderRadius: "14px", padding: "16px 14px", border: "1px solid #1e1e1e", width: "100%", marginBottom: "10px", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, ${step.gradStart}, ${step.gradEnd})` }} />
              <div style={{ fontSize: "13px", fontWeight: 500, color: "#d0cdc8", marginBottom: "6px" }}>{step.title}</div>
              <div style={{ fontSize: "11px", color: "#555", lineHeight: 1.6 }}>{step.desc}</div>
            </div>
            <div style={{ width: "100%" }}>{step.mini}</div>
          </div>
        ))}
      </div>

      {/* Rainbow divider */}
      <div style={{ height: "2px", background: "linear-gradient(90deg,#FFF7E6,#F7C8D3,#B46A72,#A8B58A,#A9B7C6,#2D3A47)", borderRadius: "99px", opacity: 0.5, margin: "0 0 24px" }} />

      {/* Bottom strip */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "10px" }}>
        {[
          ["2 min", "to get started", "#FFF7E6"],
          ["100%", "private & secure", "#F7C8D3"],
          ["Smart", "AI nudges daily", "#A8B58A"],
          ["Free", "early access", "#A9B7C6"],
        ].map(([val, label, color]) => (
          <div key={label} style={{ background: "#111", borderRadius: "12px", padding: "14px", border: "1px solid #1e1e1e", textAlign: "center" }}>
            <div style={{ fontSize: "20px", fontWeight: 600, letterSpacing: "-0.5px", color, marginBottom: "3px" }}>{val}</div>
            <div style={{ fontSize: "10px", color: "#555" }}>{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}