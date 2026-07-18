"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home, CreditCard, Target, FileText, Receipt, MessageCircle, Settings,
} from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Dashboard', icon: Home, href: '/dashboard' },
  { label: 'Expenses', icon: CreditCard, href: '/finance-profile' },
  { label: 'Savings', icon: Target, href: '/savings' },
  { label: 'Summaries', icon: FileText, href: '/summaries' },
  { label: 'Receipts', icon: Receipt, href: '/receipts' },
  { label: 'Mochi AI', icon: MessageCircle, href: '/MOCHI_AI' },
  { label: 'Settings', icon: Settings, href: '/settings' },
];

export default function SettingsPage() {
  const pathname = usePathname();

  return (
    <div className="page-root">
      <style>{`
        .page-root {
          --bg: #0b0b0b;
          --panel: #151515;
          --panel-2: #1b1b1b;
          --border: #262626;
          --text: #f2f2f0;
          --text-dim: #8a8a86;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, sans-serif;
          background: var(--bg);
          color: var(--text);
          min-height: 100vh;
        }
        .page-root * { box-sizing: border-box; }

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

        .main { flex: 1; padding: 28px 36px; }
      `}</style>

      <div className="layout">
        <aside className="sidebar">
          <div className="sidebar-logo">Mochi</div>
          {NAV_ITEMS.map(({ label, icon: Icon, href }) => {
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

        <main className="main">
          {/* Build page content here */}
        </main>
      </div>
    </div>
  );
}