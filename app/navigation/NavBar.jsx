"use client";
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

export default function NavBar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <style>{`
        .sidebar {
          width: 220px; flex-shrink: 0; border-right: 1px solid var(--border, #262626);
          padding: 24px 14px;
        }
        .sidebar-logo {
          font-weight: 700; font-size: 16px; padding: 0 10px; margin-bottom: 20px;
          color: var(--text, #f2f2f0);
        }
        .nav-item {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 12px; border-radius: 10px; font-size: 14px;
          color: var(--text-dim, #8a8a86); cursor: pointer; margin-bottom: 2px;
          transition: background 0.18s ease, color 0.18s ease;
          text-decoration: none;
        }
        .nav-item.active { background: var(--panel-2, #1b1b1b); color: var(--text, #f2f2f0); }
        .nav-item:hover:not(.active) { color: var(--text, #f2f2f0); }
      `}</style>

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
  );
}