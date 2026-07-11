"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";

const client = generateClient();

const SETUP_STEPS = [
  { key: "financeProfile", icon: "💳", title: "Finance Profile", description: "Tell Mochi about your monthly income, budget and expense categories.", href: "/finance-profile", cta: "Set Up" },
  { key: "savingsGoal", icon: "🎯", title: "Savings Goal", description: "Create your first savings goal and start tracking your progress.", href: "/savings", cta: "Create Goal" },
  { key: "budget", icon: "📊", title: "Weekly & Monthly Insights", description: "View summaries and spending insights after adding your transactions.", href: "/insights", cta: "View" },
  { key: "firstTransaction", icon: "🤖", title: "Ask Mochi", description: "Need help? Mochi is here to answer your questions and guide you.", href: "/ask-mochi", cta: "Ask Mochi" },
];

const SIDEBAR_ITEMS = [
  { label: "🏠 Dashboard", href: "/dashboard" },
  { label: "💸 Expenses", href: "/expenses" },
  { label: "🎯 Savings", href: "/savings" },
  { label: "📊 Analytics", href: "/insights" },
  { label: "🤖 Ask Mochi", href: "/ask-mochi" },
  { label: "⚙ Settings", href: "/settings" },
];

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [setupProgress, setSetupProgress] = useState({
    financeProfile: false,
    budget: false,
    savingsGoal: false,
    firstTransaction: false,
  });

  useEffect(() => {
    async function fetchProgress() {
      try {
        // TODO: replace with your real current-user + model lookup
        // const { userId } = await getCurrentUser();
        // const { data: user } = await client.models.User.get({ id: userId });
        // if (user?.setupProgress) setSetupProgress(user.setupProgress);
      } catch (err) {
        console.error("Failed to fetch setup progress:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProgress();
  }, []);

  const completedCount = Object.values(setupProgress).filter(Boolean).length;
  const percent = Math.round((completedCount / SETUP_STEPS.length) * 100);
  const allDone = completedCount === SETUP_STEPS.length;

  return (
    <>
      <GlobalStyles />
      {loading ? (
        <main className="mochi-root min-h-screen flex items-center justify-center">
          <p className="mochi-muted">Loading Mochi...</p>
        </main>
      ) : allDone ? (
        <DashboardScreen />
      ) : (
        <OnboardingScreen setupProgress={setupProgress} percent={percent} />
      )}
    </>
  );
}

function OnboardingScreen({ setupProgress, percent }) {
  return (
    <main className="mochi-root min-h-screen flex flex-col items-center px-6 py-16">
      <img src="/photos/welcome.png" alt="Mochi Mascot" className="w-24 mb-6" />

      <h1 className="mochi-heading text-4xl text-center">Welcome to Mochi</h1>
      <p className="mochi-muted text-center max-w-md mt-3">
        Congratulations on creating your account. Let's set up your finance
        dashboard together.
      </p>

      {/* Progress bar */}
      <div className="w-full max-w-xl mt-10">
        <div className="flex justify-between text-sm mochi-muted mb-2">
          <span>Setup progress</span>
          <span>{percent}%</span>
        </div>
        <div className="mochi-track">
          <div className="mochi-track-fill" style={{ width: `${percent}%` }} />
        </div>
      </div>

      {/* Setup step cards */}
      <div className="w-full max-w-xl mt-10 space-y-7">
        {SETUP_STEPS.map((step) => (
          <StepCard key={step.key} {...step} done={setupProgress[step.key]} />
        ))}
      </div>
    </main>
  );
}

function StepCard({ icon, title, description, href, done, cta }) {
  return (
    <div className="mochi-glow">
      <Link href={href}>
        <div className="mochi-card">
          <div className="flex justify-between items-center">
            <h2 className="mochi-heading text-lg">
              {icon} {title}
            </h2>
            <span className="text-xl">{done ? "✅" : "→"}</span>
          </div>
          <p className="mochi-muted mt-2">{description}</p>
          {!done && <button className="mochi-btn mt-4">{cta}</button>}
        </div>
      </Link>
    </div>
  );
}

function DashboardScreen() {
  return (
    <div className="mochi-root min-h-screen flex">
      <GlobalStyles />
      {/* Sidebar */}
      <aside className="mochi-sidebar w-56 p-6 flex flex-col gap-2">
        <div className="flex items-center gap-2 mb-8">
          <img src="/mochi.png" alt="Mochi" className="w-8" />
          <span className="mochi-heading text-lg">Mochi</span>
        </div>
        {SIDEBAR_ITEMS.map((item) => (
          <Link key={item.href} href={item.href} className="mochi-nav-link">
            {item.label}
          </Link>
        ))}
      </aside>

      {/* Main content */}
      <main className="flex-1 p-10">
        <div className="flex items-center gap-3 mb-8">
          <img src="/mochi.png" alt="Mochi Mascot" className="w-12" />
          <div>
            <h1 className="mochi-heading text-2xl">Good Afternoon, Parnita</h1>
            <p className="mochi-muted">Here's your financial snapshot.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          <div className="mochi-glow">
            <div className="mochi-card">
              <h2 className="mochi-heading text-base">💰 Total Balance</h2>
              <p className="mochi-heading text-3xl mt-2">₹25,000</p>
            </div>
          </div>

          <div className="mochi-glow">
            <div className="mochi-card">
              <h2 className="mochi-heading text-base">💸 This Month</h2>
              <p className="mochi-body mt-2">Spent ₹8,400</p>
              <p className="mochi-muted">Budget left ₹16,600</p>
            </div>
          </div>

          <div className="mochi-glow">
            <div className="mochi-card">
              <h2 className="mochi-heading text-base">🎯 Savings Goal</h2>
              <p className="mochi-body mt-2">Laptop</p>
              <div className="mochi-track mt-2">
                <div className="mochi-track-fill" style={{ width: "60%" }} />
              </div>
              <p className="mochi-muted text-sm mt-1">60%</p>
            </div>
          </div>

          <div className="mochi-glow">
            <div className="mochi-card">
              <h2 className="mochi-heading text-base">📅 Upcoming Bills</h2>
              <ul className="mochi-body mt-2 space-y-1">
                <li>Electricity</li>
                <li>Netflix</li>
              </ul>
            </div>
          </div>

          <div className="mochi-glow md:col-span-2">
            <div className="mochi-card">
              <h2 className="mochi-heading text-base">📈 Recent Transactions</h2>
              <ul className="mochi-body mt-2 space-y-1">
                <li>Coffee</li>
                <li>Groceries</li>
                <li>Salary</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function GlobalStyles() {
  return (
    <style jsx global>{`
      @import url("https://fonts.googleapis.com/css2?family=Fraunces:wght@500;600&family=Nunito:wght@400;600;700&display=swap");

      .mochi-root {
        background: #050505;
        font-family: "Nunito", sans-serif;
      }

      .mochi-heading {
        font-family: "Fraunces", serif;
        color: #fff7e6;
        font-weight: 600;
      }

      .mochi-body {
        font-family: "Nunito", sans-serif;
        color: #e6dfd3;
      }

      .mochi-muted {
        font-family: "Nunito", sans-serif;
        color: #a9b7c6;
      }

      .mochi-btn {
        background: #b46a72;
        color: #fff7e6;
        font-family: "Nunito", sans-serif;
        font-weight: 700;
        padding: 0.6rem 1.4rem;
        border-radius: 0.9rem;
        transition: background 0.25s ease, transform 0.2s ease;
      }
      .mochi-btn:hover {
        background: #c47b83;
        transform: translateY(-1px);
      }

      .mochi-track {
        width: 100%;
        background: #1a1f26;
        border-radius: 999px;
        height: 0.6rem;
        overflow: hidden;
      }
      .mochi-track-fill {
        height: 100%;
        background: linear-gradient(90deg, #a8b58a, #f7c8d3);
        border-radius: 999px;
        transition: width 0.4s ease;
      }

      .mochi-sidebar {
        background: #0b0e12;
        border-right: 1px solid #1a1f26;
      }

      .mochi-nav-link {
        font-family: "Nunito", sans-serif;
        color: #a9b7c6;
        padding: 0.55rem 0.9rem;
        border-radius: 0.7rem;
        transition: background 0.2s ease, color 0.2s ease;
      }
      .mochi-nav-link:hover {
        background: #1a1f26;
        color: #fff7e6;
      }

      /* Signature: aurora border — a thin, clean gradient outline that
          slowly drifts through the full palette. No blur, no blob —
         just a quiet line of color tracing each card. */
      .mochi-glow {
        border-radius: 1.3rem;
        padding: 1px;
        background: linear-gradient(
          120deg,
          #fff7e6,
          #f7c8d3,
          #b46a72,
          #a8b58a,
          #a9b7c6,
          #fff7e6
        );
        background-size: 300% 300%;
        animation: mochi-drift 10s ease infinite;
      }
      .mochi-card {
        background: #2d3a47;
        border-radius: 1.25rem;
        padding: 1.6rem;
        height: 100%;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }
      .mochi-glow:hover .mochi-card {
        transform: translateY(-2px);
        box-shadow: 0 6px 24px rgba(0, 0, 0, 0.35);
      }

      @keyframes mochi-drift {
        0% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0% 50%;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .mochi-glow {
          animation: none;
        }
      }
    `}</style>
  );
}