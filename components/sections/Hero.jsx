"use client";
import {PieChart,Pie,Cell} from "recharts";
export default function Hero() {
  const chart =[
              { label: "Rent", amount: "₹18k", pct: 100, color: "#A9B7C6" },
              { label: "Groceries", amount: "₹8.4k", pct: 17.65, color: "#A8B58A" },
              { label: "Investments", amount: "₹7k", pct: 14.71, color: "#B46A72" },
              { label: "Electricity Bill", amount: "₹2.5k", pct: 5.25, color: "#FFF7E6" },
              { label: "Water Bill", amount: "₹1.0k", pct: 2.31, color: "#F7C8D3" },
              { label: "Transportation", amount: "₹2.1k", pct: 4.41, color: "#A8B58A" },
              { label: "Shopping", amount: "₹8.0k", pct: 17.86, color: "#A9B7C6" },
              { label: "Emergency Saving", amount: "₹5k", pct: 10.50, color: "#2D3A47" },
      ];
  return (
    <main className="bg-black text-white overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <div className="animate-float mb-6">
          <img src="/photos/MOCHI.png" alt="Mochi mascot" width={220} height={220} className="w-40 h-40 md:w-[220px] md:h-[220px]" />
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight mb-4">
          Smart Budgeting <span className="text-[#7087BB]">with Mochi</span>
        </h1>
        <p className="text-white/50 text-base sm:text-lg md:text-xl max-w-xl">
          Your cute little financial companion — tracking every rupee so you don't have to stress about it.
        </p>
      </section>

      {/* ── HOW MOCHI HELPS ── */}
      <section className="py-16 md:py-24 px-4 sm:px-6 max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4">
          How Mochi <span className="text-[#7087BB]">helps you</span>
        </h2>
        <p className="text-white/40 text-center mb-12 md:mb-16 max-w-lg mx-auto text-sm sm:text-base">
          No spreadsheets. No confusion. Just Mochi keeping your finances warm and fuzzy.
        </p>

        <div className="flex flex-col gap-16 md:gap-24">

          {/* ── TRACKING FINANCE ── */}
          <div className="flex flex-col items-center gap-8">
            <div
              className="group w-full rounded-3xl p-[2px] transition-all duration-500 relative"
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
              <div className="relative z-10 w-full rounded-3xl">
                {/*Header*/}
                <div className="inline-block rounded-full bg-[#1A1A1A] px-3 py-1 ml-4 mt-4">
                  <p style={{ color: "#AEC6CF" }}><strong>JUNE 2026</strong></p>
                </div>

                <h2 className="mt-3 px-4 text-lg sm:text-xl">
                  Finance overview • tracked automatically
                </h2>

                {/* Two panels side by side — stack on mobile */}
                <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 px-4 lg:px-0">
                  {/*VISUALIZATION PANEL*/}
                  <div className="flex-1 bg-[#111] rounded-3xl p-5 mt-2 border border-transparent lg:ml-4
                   hover:border-gray-400 hover:shadow-lg transition-all duration-300">
                    <div className="text-xs text-gray-400 tracking-widest mb-2">TOTAL SPENT</div>
                    <p className="text-2xl font-bold text-white">₹47,600</p>
                    <p className="text-sm text-yellow-200 mb-4">₹3,200 vs May, within budget</p>

                    {/* Progress bars */}
                    {[
                      { label: "Rent", amount: "₹18k", pct: 100, color: "#A9B7C6" },
                      { label: "Groceries", amount: "₹8.4k", pct: 17.65, color: "#A8B58A" },
                      { label: "Investments", amount: "₹7k", pct: 14.71, color: "#B46A72" },
                      { label: "Electricity Bill", amount: "₹2.5k", pct: 5.25, color: "#FFF7E6" },
                      { label: "Water Bill", amount: "₹1.0k", pct: 2.31, color: "#F7C8D3" },
                      { label: "Transportation", amount: "₹2.1k", pct: 4.41, color: "#A8B58A" },
                      { label: "Shopping", amount: "₹8.0k", pct: 17.86, color: "#A9B7C6" },
                      { label: "Emergency Saving", amount: "₹5k", pct: 10.50, color: "#2D3A47" },
                    ].map((bar, i) => (
                      <div key={i} className="flex items-center gap-3 mb-3">
                        <p className="text-xs text-gray-300 w-20 sm:w-24 shrink-0 truncate">{bar.label}</p>
                        <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{ width: `${bar.pct}%`, backgroundColor: bar.color }}
                          />
                        </div>
                        <p className="text-xs text-gray-400 w-10 text-right shrink-0">{bar.amount}</p>
                      </div>
                    ))}

                    <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-6">
                      <PieChart width={90} height={90}>
                        <Pie
                          data={chart}
                          dataKey="pct"
                          innerRadius={28}
                          outerRadius={42}
                          paddingAngle={2}
                          stroke="none"
                        >
                          {chart.map((entry,i)=> (
                            <Cell key={i} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>

                      <div className="flex flex-col gap-1.5">
                        {chart.map((d,i)=>(
                          <div key={i} className="flex items-center gap-2">
                            <span
                              className="w-2 h-2 rounded-full shrink-0"
                              style={{ backgroundColor: d.color }}
                            />
                            <p className="text-xs text-gray-300">{d.label}: {d.amount}%</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* EXPENSE LIST */}
                  <div className="flex-1 bg-[#111] rounded-3xl p-5 border border-transparent lg:mr-5 mt-2 overflow-x-auto
                    hover:border-gray-400 hover:shadow-lg transition-all duration-300">
                    <div className="min-w-[420px]">
                      <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-2 sm:gap-4 mb-2 px-2 sm:px-4">
                        <div className="text-xs text-gray-400 tracking-widest">CATEGORY</div>
                        <div className="text-xs text-gray-400 tracking-widest">EXPECTED</div>
                        <div className="text-xs text-gray-400 tracking-widest">ACTUAL</div>
                        <div className="text-xs text-gray-400 tracking-widest">STATUS</div>
                      </div>
                      {/*Data Rows*/}
                      {[
                        {label:"Rent", expected:"₹18,000", actual:"₹18,000", status:"On Track", color:"text-green-700 bg-green-300"},
                        {label:"Groceries", expected:"₹8,000", actual:"₹8,400", status:"Over spent", color:"text-red-700 bg-red-300"},
                        {label:"Transportation", expected:"₹2,000", actual:"₹2,100", status:"Over spent", color:"text-red-700 bg-red-300"},
                        {label:"Investments", expected:"₹7,000", actual:"₹7,000", status:"On Track", color:"text-green-700 bg-green-300"},
                        {label:"Electricity Bill", expected:"₹2,500", actual:"₹2,500", status:"On Track", color:"text-green-700 bg-green-300"},
                        {label:"Water Bill", expected:"₹1,000", actual:"₹1,000", status:"On Track", color:"text-green-700 bg-green-300"},
                        {label:"Emergency Saving", expected:"₹5,000", actual:"₹5,000", status:"Not Used", color:"text-pink-700 bg-pink-300"},
                        {label:"Shopping", expected:"₹8,000", actual:"₹8,000", status:"On Track", color:"text-green-700 bg-green-300"},
                      ].map((row,i)=> (
                        <div key={i} className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-2 sm:gap-4 items-center py-3 px-1 sm:px-2 border-t border-white/10">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="w-2 h-2 rounded-full bg-gray-400 inline-block shrink-0"></span>
                            <p className="text-white text-sm truncate">{row.label}</p>
                          </div>
                          <p className="text-gray-300 text-sm">{row.expected}</p>
                          <p className="text-white text-sm font-medium">{row.actual}</p>
                          <span className={`text-xs px-2 py-1 rounded-full w-fit ${row.color}`}>
                            {row.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/*Stats Row*/}
                <div className="h-px mt-6 mb-4 w-full" style={{
                  background: "linear-gradient(135deg, #FFF7E6, #F7C8D3, #B46A72, #A8B58A, #A9B7C6, #2D3A47)",
                }}></div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 px-4">
                  <div className="bg-[#111] rounded-xl p-4 mb-4">
                    <p className="text-xs text-gray-200 py-2">BUDGET</p>
                    <p className="text-xl sm:text-2xl font-bold text-blue-200">₹55,000</p>
                  </div>
                  <div className="bg-[#111] rounded-xl p-4 mb-4">
                    <p className="text-xs text-gray-200 py-2">SPENT</p>
                    <p className="text-xl sm:text-2xl font-bold text-white">₹47,600</p>
                  </div>
                  <div className="bg-[#111] rounded-xl p-4 mb-4">
                    <p className="text-xs text-gray-200 py-2">REMAINING</p>
                    <p className="text-xl sm:text-2xl font-bold text-green-200">₹2,600</p>
                  </div>
                  <div className="bg-[#111] rounded-xl p-4 mb-4">
                    <p className="text-xs text-gray-200 py-2">OVERSPENT ON</p>
                    <p className="text-xl sm:text-2xl font-bold text-red-300">2 items</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="max-w-2xl text-center px-2">
              <h3 className="text-lg sm:text-xl font-semibold mb-3 text-white">
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
              className="group w-full rounded-3xl transition-all duration-500 relative"
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
              <div className="relative z-10 w-full rounded-3xl overflow-hidden bg-[#0f0f0f] border border-white/5 p-5 sm:p-8">
                <GoalsPanel />
              </div>
            </div>
            <div className="max-w-2xl text-center px-2">
              <h3 className="text-lg sm:text-xl font-semibold mb-3 text-white">
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
              className="group w-full rounded-3xl transition-all duration-500 relative"
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
              <div className="relative z-10 w-full rounded-3xl overflow-hidden bg-[#0f0f0f] border border-white/5 p-5 sm:p-8">
                <SummariesPanel />
              </div>
            </div>
            <div className="max-w-2xl text-center px-2">
              <h3 className="text-lg sm:text-xl font-semibold mb-3 text-white">
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
      <section className="py-16 md:py-24 px-4 sm:px-6 max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4">
          How Mochi <span className="text-[#7087BB]">works</span>
        </h2>
        <p className="text-white/40 text-center mb-12 md:mb-16 max-w-lg mx-auto text-sm sm:text-base">
          Set up once. Mochi tracks, nudges, and learns — automatically.
        </p>

        <div
          className="group w-full rounded-3xl transition-all duration-500 relative"
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
          <div className="relative z-10 w-full rounded-3xl overflow-hidden bg-[#0f0f0f] border border-white/5 p-5 sm:p-8">
            <HowMochiWorks />
          </div>
        </div>

        <div className="max-w-2xl text-center mx-auto mt-8 px-2">
          <h3 className="text-lg sm:text-xl font-semibold mb-3 text-white">
            Four steps to financial clarity
          </h3>
          <p className="text-white/40 text-sm leading-relaxed">
            Mochi keeps it simple — add your income, log your expenses, set budgets and goals, then let Mochi AI do the heavy lifting. It spots patterns, flags overspends before they happen, and gives you a monthly summary that actually makes sense. Smart finance, zero stress.
          </p>
        </div>
      </section>

      {/* ── MOCHI AI ── */}
      <section className="py-16 md:py-24 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="bg-[#7087BB]/10 border border-[#7087BB]/30 rounded-3xl p-6 sm:p-12 md:p-16 flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="flex-1 text-center md:text-left">
            <span className="text-xs font-semibold tracking-widest text-[#7087BB] uppercase mb-4 block">
              Powered by AI
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
              Meet <span className="text-[#7087BB]">Mochi AI</span> ✨
            </h2>
            <p className="text-white/60 leading-relaxed mb-6 text-sm sm:text-base">
              Ask it anything — "How much did I spend on food last month?", "Am I on track for my savings goal?", or "Where can I cut back?" — and get instant, honest answers.
            </p>
            <ul className="text-white/40 text-sm space-y-3 text-left inline-block md:block">
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
  const steps = [
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
  ];

  return (
    <div className="mochi-works-wrap" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", color: "#f0ede8" }}>

      <style jsx>{`
        .steps-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          position: relative;
          margin-bottom: 32px;
        }
        .connector-line {
          position: absolute;
          top: 28px;
          left: calc(12.5% + 14px);
          right: calc(12.5% + 14px);
          height: 1px;
          background: linear-gradient(90deg,#FFF7E6,#F7C8D3,#B46A72,#A8B58A,#A9B7C6,#2D3A47);
          opacity: 0.4;
          z-index: 0;
        }
        .bottom-strip {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
        }
        @media (max-width: 900px) {
          .steps-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
          .connector-line { display: none; }
          .bottom-strip {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 480px) {
          .steps-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* Steps grid */}
      <div className="steps-grid">
        <div className="connector-line" />

        {steps.map((step) => (
          <div key={step.num} style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "0 4px", position: "relative", zIndex: 1 }}>
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
      <div className="bottom-strip">
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
function GoalsPanel() {
  const goals = [
    { icon: "📍", label: "Vacation fund", sub: "Goa trip · Dec 2026", amount: "₹28,500", of: "₹60,000", pct: 47, left: "6 months left", color: "#B46A72" },
    { icon: "🛡", label: "Emergency fund", sub: "3 months expenses", amount: "₹45,000", of: "₹1,20,000", pct: 37, left: "12 months left", color: "#F7C8D3" },
    { icon: "💻", label: "New laptop", sub: "MacBook Pro · Mar 2027", amount: "₹52,000", of: "₹1,80,000", pct: 29, left: "9 months left", color: "#A8B58A" },
    { icon: "📈", label: "Annual SIP target", sub: "Mutual funds · Dec 2026", amount: "₹42,000", of: "₹84,000", pct: 50, left: "6 months left", color: "#A9B7C6" },
  ];

  const limits = [
    { label: "Dining out", spent: "₹2,580", limit: "₹3,000 limit", pct: 86, color: "#A9B7C6", status: "86%" },
    { label: "Groceries", spent: "₹5,040", limit: "₹8,000 limit", pct: 63, color: "#A8B58A", status: "63%" },
    { label: "Extras", spent: "₹13,600", limit: "₹10,000 limit", pct: 100, color: "#B46A72", status: "over", over: true },
    { label: "Entertainment", spent: "₹800", limit: "₹2,000 limit", pct: 40, color: "#F7C8D3", status: "40%" },
  ];

  return (
    <div className="goals-panel" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", color: "#f0ede8" }}>
      <style jsx>{`
        .goals-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          margin-bottom: 24px;
        }
        @media (max-width: 640px) {
          .goals-grid {
            grid-template-columns: 1fr;
          }
          .goals-stats-row {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "10px", marginBottom: "6px" }}>
        <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.08em", padding: "4px 10px", borderRadius: "99px", background: "rgba(180,106,114,0.12)", color: "#B46A72" }}>
          GOALS · JUNE 2026
        </span>
        <span style={{ fontSize: "10px", padding: "4px 10px", borderRadius: "99px", background: "rgba(180,106,114,0.12)", color: "#B46A72" }}>
          ✦ Mochi AI
        </span>
      </div>
      <p style={{ fontSize: "11px", color: "#555", marginBottom: "20px" }}>
        Savings targets and spending limits · all in one place
      </p>

      {/* Goal cards */}
      <div className="goals-grid">
        {goals.map((g) => (
          <div key={g.label} style={{ background: "#141414", borderRadius: "14px", padding: "16px", border: "1px solid #1e1e1e", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: g.color }} />
            <div style={{ width: "30px", height: "30px", borderRadius: "8px", background: "#1e1e1e", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", marginBottom: "12px" }}>
              {g.icon}
            </div>
            <div style={{ fontSize: "13px", fontWeight: 500, marginBottom: "2px" }}>{g.label}</div>
            <div style={{ fontSize: "10px", color: "#555", marginBottom: "10px" }}>{g.sub}</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "8px", flexWrap: "wrap", gap: "4px" }}>
              <span style={{ fontSize: "18px", fontWeight: 600, color: g.color }}>{g.amount}</span>
              <span style={{ fontSize: "10px", color: "#555" }}>of {g.of}</span>
            </div>
            <div style={{ height: "4px", background: "#1e1e1e", borderRadius: "99px", overflow: "hidden", marginBottom: "6px" }}>
              <div style={{ width: `${g.pct}%`, height: "100%", background: g.color, borderRadius: "99px" }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px" }}>
              <span style={{ color: g.color }}>{g.pct}%</span>
              <span style={{ color: "#555" }}>{g.left}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div style={{ height: "1px", background: "linear-gradient(90deg,#FFF7E6,#F7C8D3,#B46A72,#A8B58A,#A9B7C6,#2D3A47)", opacity: 0.4, marginBottom: "18px" }} />

      {/* Monthly spending limits */}
      <div style={{ fontSize: "10px", color: "#555", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "16px" }}>
        Monthly spending limits
      </div>
      <div style={{ marginBottom: "24px" }}>
        {limits.map((l) => (
          <div key={l.label} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px", flexWrap: "wrap" }}>
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: l.color, flexShrink: 0 }} />
            <span style={{ fontSize: "12px", color: "#d0cdc8", width: "90px", flexShrink: 0 }}>{l.label}</span>
            <div style={{ flex: 1, minWidth: "120px", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "10px", color: "#555", flexShrink: 0 }}>{l.spent} spent</span>
              <div style={{ flex: 1, height: "5px", background: "#1e1e1e", borderRadius: "99px", overflow: "hidden" }}>
                <div style={{ width: `${Math.min(l.pct, 100)}%`, height: "100%", background: l.color, borderRadius: "99px" }} />
              </div>
              <span style={{ fontSize: "10px", color: "#555", flexShrink: 0 }}>{l.limit}</span>
            </div>
            <span style={{
              fontSize: "10px", fontWeight: 600, padding: "2px 9px", borderRadius: "99px", flexShrink: 0,
              background: l.over ? "rgba(180,106,114,0.15)" : "#1e1e1e",
              color: l.over ? "#B46A72" : "#888",
            }}>
              {l.status}
            </span>
          </div>
        ))}
      </div>

      {/* Bottom stats */}
      <div className="goals-stats-row" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "10px" }}>
        {[
          ["GOALS ACTIVE", "4", "#A9B7C6"],
          ["ON TRACK", "3 of 4", "#A8B58A"],
          ["TOTAL SAVED", "₹1,67,500", "#F7C8D3"],
          ["LIMITS EXCEEDED", "1 category", "#B46A72"],
        ].map(([label, val, color]) => (
          <div key={label} style={{ background: "#111", borderRadius: "10px", padding: "12px", border: "1px solid #1e1e1e" }}>
            <div style={{ fontSize: "9px", color: "#555", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "5px" }}>{label}</div>
            <div style={{ fontSize: "15px", fontWeight: 600, color }}>{val}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
function SummariesPanel() {
  const stats = [
    { label: "TOTAL INCOME", value: "₹77,000", sub: "Salary + freelance", tag: "↑ ₹12k vs May", tagColor: "#A8B58A", color: "#FFF7E6" },
    { label: "TOTAL EXPENSES", value: "₹52,400", sub: "Across 6 categories", tag: "↑ ₹3.2k vs May", tagColor: "#B46A72", color: "#F7C8D3" },
    { label: "SAVINGS", value: "₹24,600", sub: "32% of income saved", tag: "↑ great month!", tagColor: "#A8B58A", color: "#A8B58A" },
    { label: "TOP CATEGORY", value: "Extras", sub: "₹13,600 · 26% of spend", tag: "↑ over budget", tagColor: "#B46A72", color: "#B46A72" },
    { label: "BUDGET LEFT", value: "₹2,600", sub: "of ₹55,000 budget", tag: "5% remaining", tagColor: "#A9B7C6", color: "#A9B7C6" },
    { label: "GOALS PROGRESS", value: "3 of 4", sub: "on track this month", tag: "↑ SIP hit 50%", tagColor: "#A8B58A", color: "#A9B7C6" },
  ];

  const breakdown = [
    { label: "Extras", amount: "₹13,600", pct: 100, color: "#B46A72" },
    { label: "Rent", amount: "₹18,000", pct: 92, color: "#A9B7C6" },
    { label: "Groceries", amount: "₹8,400", pct: 43, color: "#A8B58A" },
    { label: "Invest", amount: "₹7,000", pct: 36, color: "#F7C8D3" },
    { label: "Electricity", amount: "₹3,800", pct: 20, color: "#FFF7E6" },
    { label: "Water", amount: "₹1,600", pct: 8, color: "#888" },
  ];

  const insights = [
    <>June was a <strong style={{ color: "#A8B58A" }}>strong savings month</strong> — you put away 32% of your income, your best rate in 4 months. Rent and utilities came in <strong style={{ color: "#A8B58A" }}>under budget</strong>, freeing up an extra ₹900.</>,
    <>The <strong style={{ color: "#B46A72" }}>Extras category overspent by ₹3,600</strong>. This has happened 2 months in a row — Mochi suggests raising the limit to ₹12,000 or setting a weekly cap of ₹2,800 to stay in control.</>,
    <>Your <strong style={{ color: "#A9B7C6" }}>Vacation fund hit 47%</strong> — at this pace you'll reach ₹60,000 by October, 2 months ahead of your December deadline.</>,
  ];

  const pills = [
    ["📊", "32% savings rate", "#A9B7C6"],
    ["⚠", "Extras over budget", "#B46A72"],
    ["✈", "Vacation on track", "#A8B58A"],
    ["💡", "Tip inside", "#F7C8D3"],
  ];

  return (
    <div className="summaries-panel" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", color: "#f0ede8" }}>
      <style jsx>{`
        .summ-stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 20px;
        }
        .summ-bottom-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 14px;
        }
        @media (max-width: 720px) {
          .summ-stats-grid {
            grid-template-columns: 1fr 1fr;
          }
          .summ-bottom-grid {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 420px) {
          .summ-stats-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "10px", marginBottom: "6px" }}>
        <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.08em", padding: "4px 10px", borderRadius: "99px", background: "rgba(180,106,114,0.12)", color: "#B46A72" }}>
          SUMMARIES · JUNE 2026
        </span>
        <span style={{ fontSize: "10px", padding: "4px 10px", borderRadius: "99px", background: "rgba(180,106,114,0.12)", color: "#B46A72" }}>
          ✦ Mochi AI
        </span>
      </div>
      <p style={{ fontSize: "11px", color: "#555", marginBottom: "20px" }}>
        Your complete month at a glance · updated live
      </p>

      {/* Stat cards */}
      <div className="summ-stats-grid">
        {stats.map((s) => (
          <div key={s.label} style={{ background: "#141414", borderRadius: "14px", padding: "14px", border: "1px solid #1e1e1e", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: s.color }} />
            <div style={{ fontSize: "9px", color: "#555", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "8px" }}>{s.label}</div>
            <div style={{ fontSize: "18px", fontWeight: 600, color: s.color, marginBottom: "4px" }}>{s.value}</div>
            <div style={{ fontSize: "10px", color: "#555", marginBottom: "8px" }}>{s.sub}</div>
            <span style={{ fontSize: "9px", padding: "2px 8px", borderRadius: "99px", background: `${s.tagColor}20`, color: s.tagColor }}>
              {s.tag}
            </span>
          </div>
        ))}
      </div>

      {/* Bottom: breakdown + insight */}
      <div className="summ-bottom-grid">
        {/* Spending breakdown */}
        <div style={{ background: "#111", borderRadius: "14px", border: "1px solid #1e1e1e", padding: "16px" }}>
          <div style={{ fontSize: "10px", color: "#555", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "14px" }}>
            Spending breakdown
          </div>
          {breakdown.map((b) => (
            <div key={b.label} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: b.color, flexShrink: 0 }} />
              <span style={{ fontSize: "11px", color: "#d0cdc8", width: "70px", flexShrink: 0 }}>{b.label}</span>
              <div style={{ flex: 1, height: "4px", background: "#1e1e1e", borderRadius: "99px", overflow: "hidden" }}>
                <div style={{ width: `${b.pct}%`, height: "100%", background: b.color, borderRadius: "99px" }} />
              </div>
              <span style={{ fontSize: "10px", color: "#555", width: "55px", textAlign: "right", flexShrink: 0 }}>{b.amount}</span>
            </div>
          ))}

          <div style={{ display: "flex", alignItems: "center", gap: "14px", marginTop: "16px", paddingTop: "14px", borderTop: "1px solid #1e1e1e", flexWrap: "wrap" }}>
            <div style={{ width: "52px", height: "52px", borderRadius: "50%", flexShrink: 0, background: "conic-gradient(#A8B58A 0% 32%, #B46A72 32% 100%)", position: "relative" }}>
              <div style={{ position: "absolute", inset: "8px", borderRadius: "50%", background: "#111" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "3px", fontSize: "10px", color: "#888" }}>
              <span>Income <strong style={{ color: "#f0ede8" }}>₹77,000</strong></span>
              <span>Spent <strong style={{ color: "#f0ede8" }}>₹52,400</strong></span>
              <span>Saved <strong style={{ color: "#A8B58A" }}>₹24,600</strong></span>
            </div>
          </div>
        </div>

        {/* Mochi AI insight card */}
        <div style={{ background: "#111", borderRadius: "14px", border: "1px solid #1e1e1e", padding: "16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
            <span style={{ fontSize: "10px", color: "#B46A72", fontWeight: 500 }}>✦ Mochi AI · June insight</span>
            <span style={{ fontSize: "9px", color: "#555" }}>2026</span>
          </div>

          {insights.map((text, i) => (
            <div key={i} style={{ background: "#161616", borderRadius: "9px", border: "1px solid #1e1e1e", padding: "10px 12px", fontSize: "11px", color: "#999", lineHeight: 1.6, marginBottom: "10px" }}>
              {text}
            </div>
          ))}

          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "12px" }}>
            {pills.map(([icon, label, color]) => (
              <span key={label} style={{ fontSize: "9px", padding: "4px 9px", borderRadius: "99px", background: `${color}18`, color }}>
                {icon} {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}