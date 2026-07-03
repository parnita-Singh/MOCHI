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
        </div>

          {/* ── TRACKING FINANCE ── */}
      <div>
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
              <div className="relative z-10 w-full rounded-3xl">
              <div>
                {/*Header*/}
              <div>
              <div className="inline-block rounded-full bg-[#1A1A1A] px-3 py-1" style={{ marginLeft: "1rem", marginTop: "1rem" }}>
                <p style={{ color: "#AEC6CF" }}><strong>JUNE 2026</strong></p>
              </div>

                  <h2 className="mt-3 px-4">
                    Finance overview • tracked automatically
                  </h2>
              </div>
              {/* Two panels side by side */}
            <div className="flex gap-6">
              {/*VISUALIZATION PANEL*/}
              <div className="flex-1 bg-[#111] rounded-3xl p-5 mt-2 border border-transparent ml-4
               hover:border-gray-400 hover:shadow-lg transition-all duration-300">
                  <div className="text-mxl text-gray-400 tracking-widest mb-2 px-4">TOTAL SPENT</div>
                   <p className="text-2xl font-bold text-white
                    ml-4">₹47,600</p>
                    <p className="text-sm text-yellow-200 mb-4
                    ml-4">₹3,200 vs May, within budget</p>
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
              <div key={i} className="flex items-center gap-3 mb-3 ">
                <p className="text-xs text-gray-300 w-20 shrink-0">{bar.label}</p>
              <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
           <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${bar.pct}%`, backgroundColor: bar.color }}
           />
           </div>
             <p className="text-xs text-gray-400 w-10 text-right shrink-0">{bar.amount}</p>
        </div>
       ))}


    
      return (
     <div className="flex items-center gap-6 mt-6">
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
              <div className ="flex-1 bg-[#111] rounded-3xl p-5 border border-transparent mr-5 mt-2
              hover:border-gray-400 hover:shadow-lg transition-all duration-300">
                <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 mb-2 px-4">
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
                <div key={i} className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 items-center py-3 px-2 border-t border-white/10">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="w-2 h-2 rounded-full bg-gray-400 inline-block shrink-0"></span>
                      <p className="text-white text-sm">{row.label}</p>
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
       </div>
                     {/*Stats Row*/}
            <div className="h-px mt-6 mb-4" style={{
                  background: "linear-gradient(135deg, #FFF7E6, #F7C8D3, #B46A72, #A8B58A, #A9B7C6, #2D3A47)",
                  padding: "2px",
                  width: "100%",
                  height: "1px",
                  zIndex: 0,
                }}></div>
          <div>
              <div className="grid grid-cols-4 gap-4  px-4">
                <div className ="bg-[#111] rounded-xl p-4 mb-4">
                  <p className="text-xs text-gray-200 py-2">BUDGET</p>
                  <p className="text-2xl font-bold text-blue-200">₹55,000</p>
                 </div>
                 <div className ="bg-[#111] rounded-xl p-4 mb-4">
                 <p className="text-xs text-gray-200 py-2">SPENT</p>
                 <p className="text-2xl font-bold text-white-400">₹47,600</p>
                 </div>
                 <div className ="bg-[#111] rounded-xl p-4 mb-4">
                 <p className="text-xs text-gray-200 py-2">REMAINING</p>
                 <p className="text-2xl font-bold text-green-200">₹2,600</p>
                 </div>
                 <div className ="bg-[#111] rounded-xl p-4 mb-4">
                 <p className="text-xs text-gray-200 py-2">OVERSPENT ON</p>
                 <p className="text-2xl font-bold text-red-300">2 items</p>
              </div>
      </div>
      </div>
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