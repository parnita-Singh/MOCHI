"use client";
import React, { useState } from 'react';
import {
  User, Palette, Bell, Shield, HelpCircle, LogOut, AlertTriangle,
  Lock, X, ChevronRight,
} from 'lucide-react';
import NavBar from '../navigation/NavBar';

function Toggle({ checked, onChange }) {
  return (
    <button
      className={`toggle ${checked ? 'on' : ''}`}
      onClick={() => onChange(!checked)}
      role="switch"
      aria-checked={checked}
    >
      <span className="toggle-knob" />
    </button>
  );
}

function SectionCard({ icon: Icon, title, children }) {
  return (
    <div className="section-card rainbow-hover">
      <div className="section-head">
        <Icon size={16} />
        <span>{title}</span>
      </div>
      {children}
    </div>
  );
}

function Row({ label, sub, children }) {
  return (
    <div className="row">
      <div>
        <div className="row-label">{label}</div>
        {sub && <div className="row-sub">{sub}</div>}
      </div>
      <div className="row-control">{children}</div>
    </div>
  );
}

export default function Settings({
  profile: initialProfile = null,
  appVersion = '1.0.0',
  onSaveProfile,
  onChangePassword,
  onSignOut,
  onDeleteAccount,
}) {
  const [profile, setProfile] = useState({
    name: initialProfile?.name || '',
    email: initialProfile?.email || '',
    phone: initialProfile?.phone || '',
    photoUrl: initialProfile?.photoUrl || null,
  });
  const [profileDirty, setProfileDirty] = useState(false);
  const [savedFlash, setSavedFlash] = useState(false);

  const [currency, setCurrency] = useState('INR (Rs)');
  const [theme, setTheme] = useState('Dark');
  const [language, setLanguage] = useState('English');
  const [dateFormat, setDateFormat] = useState('DD-MM-YYYY');

  const [weeklySummary, setWeeklySummary] = useState(true);
  const [savingsReminders, setSavingsReminders] = useState(true);
  const [billReminders, setBillReminders] = useState(false);

  const [biometricLock, setBiometricLock] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');

  function updateProfileField(field, value) {
    setProfile((p) => ({ ...p, [field]: value }));
    setProfileDirty(true);
  }

  function handleSaveProfile() {
    if (onSaveProfile) {
      onSaveProfile(profile);
    } else {
      console.log('TODO: wire onSaveProfile — would save:', profile);
    }
    setProfileDirty(false);
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 2000);
  }

  function handlePhotoChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => updateProfileField('photoUrl', reader.result);
    reader.readAsDataURL(file);
  }

  function handleSignOut() {
    if (onSignOut) onSignOut();
    else console.log('TODO: wire onSignOut — would sign the user out here.');
  }

  function handleDeleteAccount() {
    if (onDeleteAccount) onDeleteAccount(feedbackText.trim());
    else console.log('TODO: wire onDeleteAccount — would delete the account. Feedback given:', feedbackText.trim());
    setShowDeleteModal(false);
  }

  return (
    <div className="settings-root">
      <style>{`
        .settings-root {
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
        .settings-root * { box-sizing: border-box; }

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
        .main { flex: 1; padding: 28px 36px; max-width: 640px; }

        .page-title { font-size: 22px; font-weight: 600; margin: 0 0 4px; }
        .page-sub { color: var(--text-dim); font-size: 14px; margin: 0 0 24px; }

        .section-card { background: var(--panel); border: 1px solid var(--border); border-radius: 18px; padding: 20px 22px; margin-bottom: 16px; }
        .section-head { display: flex; align-items: center; gap: 9px; font-size: 13.5px; font-weight: 600; color: var(--text); margin-bottom: 16px; }
        .section-head svg { color: var(--mist); }

        .row { display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid var(--border); gap: 16px; }
        .row:last-child { border-bottom: none; padding-bottom: 0; }
        .row:first-child { padding-top: 0; }
        .row-label { font-size: 14px; }
        .row-sub { font-size: 12px; color: var(--text-dim); margin-top: 2px; }
        .row-control { flex-shrink: 0; }

        .avatar-row { display: flex; align-items: center; gap: 14px; margin-bottom: 18px; }
        .avatar-circle {
          width: 56px; height: 56px; border-radius: 50%; background: var(--panel-2);
          border: 2px solid var(--blush); overflow: hidden; display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .avatar-circle img { width: 100%; height: 100%; object-fit: cover; }
        .avatar-upload-btn {
          border: 1px solid var(--border); background: transparent; color: var(--text-dim);
          border-radius: 999px; padding: 7px 14px; font-size: 12.5px; cursor: pointer;
        }
        .avatar-upload-btn:hover { border-color: var(--mist); color: var(--mist); }

        label { display: block; font-size: 11.5px; letter-spacing: 0.04em; text-transform: uppercase; color: var(--text-dim); margin-bottom: 6px; }
        .field-row { margin-bottom: 14px; }
        .field-row input {
          width: 100%; background: #0f0f0f; border: 1px solid var(--border); color: var(--text);
          padding: 10px 12px; border-radius: 10px; font-size: 14px;
        }
        .field-row input:focus { outline: none; border-color: var(--mist); }

        .save-row { display: flex; align-items: center; gap: 12px; margin-top: 4px; }
        .btn-save-profile {
          border: none; background: var(--sage); color: var(--ink); font-weight: 600;
          border-radius: 10px; padding: 10px 18px; font-size: 13.5px; cursor: pointer;
        }
        .btn-save-profile:disabled { opacity: 0.4; cursor: not-allowed; }
        .saved-flash { font-size: 12.5px; color: var(--sage); }

        select {
          background: #0f0f0f; border: 1px solid var(--border); color: var(--text);
          padding: 8px 12px; border-radius: 10px; font-size: 13.5px; cursor: pointer;
        }

        .toggle {
          width: 40px; height: 22px; border-radius: 999px; border: 1px solid var(--border);
          background: var(--panel-2); position: relative; cursor: pointer; padding: 0; flex-shrink: 0;
          transition: background 0.2s ease, border-color 0.2s ease;
        }
        .toggle.on { background: var(--sage); border-color: var(--sage); }
        .toggle-knob {
          position: absolute; top: 2px; left: 2px; width: 16px; height: 16px; border-radius: 50%;
          background: var(--text); transition: transform 0.2s ease;
        }
        .toggle.on .toggle-knob { transform: translateX(18px); background: var(--ink); }

        .link-row {
          display: flex; justify-content: space-between; align-items: center; padding: 10px 0;
          border-bottom: 1px solid var(--border); cursor: pointer; color: var(--text); font-size: 14px;
        }
        .link-row:last-child { border-bottom: none; padding-bottom: 0; }
        .link-row:first-child { padding-top: 0; }
        .link-row:hover { color: var(--mist); }
        .link-row svg:last-child { color: var(--text-dim); }

        .signout-btn {
          width: 100%; border: 1px solid var(--border); background: transparent; color: var(--text);
          border-radius: 12px; padding: 13px; font-size: 14px; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .signout-btn:hover { border-color: var(--mist); color: var(--mist); }

        .danger-zone { border-color: rgba(180,106,114,0.4); }
        .danger-zone .section-head svg { color: var(--rosewood); }
        .danger-text { font-size: 13px; color: var(--text-dim); line-height: 1.5; margin-bottom: 14px; }
        .delete-btn {
          border: 1px solid var(--rosewood); background: transparent; color: var(--rosewood);
          border-radius: 12px; padding: 11px 18px; font-size: 13.5px; font-weight: 600; cursor: pointer;
        }
        .delete-btn:hover { background: var(--rosewood); color: #fff; }

        .version-line { text-align: center; font-size: 12px; color: var(--text-dim); margin: 8px 0 20px; }

        .overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center; z-index: 50; padding: 20px; }
        .modal-card { width: 100%; max-width: 400px; background: var(--panel); border: 1px solid var(--border); border-radius: 20px; padding: 22px; }
        .modal-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
        .modal-head h4 { margin: 0; font-size: 15px; }
        .close-x { cursor: pointer; color: var(--text-dim); background: none; border: none; }
        .close-x:hover { color: var(--blush); }
        .modal-card input, .modal-card textarea {
          width: 100%; background: #0f0f0f; border: 1px solid var(--border); color: var(--text);
          padding: 10px 12px; border-radius: 10px; font-size: 14px; margin-bottom: 14px; resize: none;
        }
        .modal-card textarea { min-height: 70px; font-family: inherit; }

        .warning-box {
          display: flex; gap: 10px; background: rgba(180,106,114,0.12); border: 1px solid var(--rosewood);
          color: var(--blush); border-radius: 12px; padding: 12px 14px; font-size: 13px; margin-bottom: 16px; line-height: 1.5;
        }

        .form-actions { display: flex; gap: 10px; }
        .form-actions button { flex: 1; padding: 10px; border-radius: 10px; font-size: 13.5px; cursor: pointer; }
        .btn-cancel { border: 1px solid var(--border); background: transparent; color: var(--text); }
        .btn-cancel:hover { border-color: var(--mist); color: var(--mist); }
        .btn-confirm-delete { border: none; background: var(--rosewood); color: #fff; font-weight: 600; }
      `}</style>

      <div className="layout">
        <NavBar />

        <main className="main">
          <h1 className="page-title">General Settings</h1>
          <p className="page-sub">Manage your profile, app preferences, notifications, privacy, and support options in one place.</p>

          {/* ── Profile ── */}
          <SectionCard icon={User} title="Profile">
            <div className="avatar-row">
              <div className="avatar-circle">
                {profile.photoUrl ? <img src={profile.photoUrl} alt="Profile" /> : <User size={22} color="#8a8a86" />}
              </div>
              <label htmlFor="photo-upload" className="avatar-upload-btn" style={{ marginBottom: 0 }}>
                Change photo
              </label>
              <input id="photo-upload" type="file" accept="image/*" style={{ display: 'none' }} onChange={handlePhotoChange} />
            </div>

            <div className="field-row">
              <label>Name</label>
              <input value={profile.name} onChange={(e) => updateProfileField('name', e.target.value)} placeholder="Your name" />
            </div>
            <div className="field-row">
              <label>Email</label>
              <input value={profile.email} onChange={(e) => updateProfileField('email', e.target.value)} placeholder="you@example.com" />
            </div>
            <div className="field-row" style={{ marginBottom: 0 }}>
              <label>Phone</label>
              <input value={profile.phone} onChange={(e) => updateProfileField('phone', e.target.value)} placeholder="+91 90000 00000" />
            </div>

            <div className="save-row">
              <button className="btn-save-profile" disabled={!profileDirty} onClick={handleSaveProfile}>Save changes</button>
              {savedFlash && <span className="saved-flash">Saved.</span>}
            </div>
          </SectionCard>

          {/* ── Preferences ── */}
          <SectionCard icon={Palette} title="Preferences">
            <Row label="Currency">
              <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
                <option>INR (Rs)</option>
                <option>USD ($)</option>
                <option>EUR (€)</option>
                <option>GBP (£)</option>
              </select>
            </Row>
            <Row label="Theme" sub="Dark is the only fully-styled theme right now">
              <select value={theme} onChange={(e) => setTheme(e.target.value)}>
                <option>Dark</option>
                <option>Light</option>
                <option>System</option>
              </select>
            </Row>
            <Row label="Language">
              <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                <option>English</option>
                <option>Hindi</option>
              </select>
            </Row>
            <Row label="Date format">
              <select value={dateFormat} onChange={(e) => setDateFormat(e.target.value)}>
                <option>DD-MM-YYYY</option>
                <option>MM-DD-YYYY</option>
                <option>YYYY-MM-DD</option>
              </select>
            </Row>
          </SectionCard>

          {/* ── Notifications ── */}
          <SectionCard icon={Bell} title="Notifications">
            <Row label="Weekly summary alerts" sub="A short note when your weekly snapshot is ready">
              <Toggle checked={weeklySummary} onChange={setWeeklySummary} />
            </Row>
            <Row label="Savings reminders" sub="Nudges to contribute toward your goals">
              <Toggle checked={savingsReminders} onChange={setSavingsReminders} />
            </Row>
            <Row label="Bill reminders" sub="A heads-up before recurring bills are due">
              <Toggle checked={billReminders} onChange={setBillReminders} />
            </Row>
          </SectionCard>

          {/* ── Privacy & Security ── */}
          <SectionCard icon={Shield} title="Privacy & Security">
            <div className="link-row" onClick={() => setShowChangePassword(true)}>
              <span>Change password</span>
              <ChevronRight size={16} />
            </div>
            <Row label="Biometric lock" sub="Require Face ID / fingerprint to open the app">
              <Toggle checked={biometricLock} onChange={setBiometricLock} />
            </Row>
            <div className="link-row" onClick={() => console.log('TODO: wire linked-accounts view')}>
              <span>Linked accounts</span>
              <ChevronRight size={16} />
            </div>
            <div className="link-row" onClick={() => console.log('TODO: wire data-permissions view')}>
              <span>Data permissions</span>
              <ChevronRight size={16} />
            </div>
          </SectionCard>

          {/* ── Help & Support ── */}
          <SectionCard icon={HelpCircle} title="Help & Support">
            <div className="link-row" onClick={() => console.log('TODO: link to FAQ page')}>
              <span>FAQs</span>
              <ChevronRight size={16} />
            </div>
            <div className="link-row" onClick={() => console.log('TODO: open contact support flow')}>
              <span>Contact support</span>
              <ChevronRight size={16} />
            </div>
            <div className="link-row" onClick={() => console.log('TODO: open feedback form')}>
              <span>Send feedback</span>
              <ChevronRight size={16} />
            </div>
            <div className="link-row" onClick={() => console.log('TODO: show about/app-info screen')}>
              <span>About Mochi</span>
              <ChevronRight size={16} />
            </div>
          </SectionCard>

          {/* ── Account actions ── */}
          <SectionCard icon={LogOut} title="Account Actions">
            <button className="signout-btn" onClick={handleSignOut}>
              <LogOut size={16} /> Sign Out
            </button>
          </SectionCard>

          {/* ── Danger zone ── */}
          <div className="section-card danger-zone">
            <div className="section-head"><AlertTriangle size={16} /><span>Danger Zone</span></div>
            <div className="danger-text">
              Deleting your account permanently removes your profile, expenses, savings goals, receipts,
              and chat history. This can't be undone.
            </div>
            <button className="delete-btn" onClick={() => setShowDeleteModal(true)}>Delete Account</button>
          </div>

          <div className="version-line">Mochi v{appVersion}</div>
        </main>
      </div>

      {showChangePassword && (
        <div className="overlay" onClick={() => setShowChangePassword(false)}>
          <ChangePasswordModal
            onClose={() => setShowChangePassword(false)}
            onSubmit={(current, next) => {
              if (onChangePassword) onChangePassword(current, next);
              else console.log('TODO: wire onChangePassword');
              setShowChangePassword(false);
            }}
          />
        </div>
      )}

      {showDeleteModal && (
        <div className="overlay" onClick={() => setShowDeleteModal(false)}>
          <div className="modal-card rainbow-focus" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head"><h4>Delete your account?</h4><button className="close-x" onClick={() => setShowDeleteModal(false)}><X size={18} /></button></div>
            <div className="warning-box">
              <AlertTriangle size={16} style={{ flexShrink: 0, marginTop: 1 }} />
              <span>This permanently deletes your profile, expenses, savings goals, receipts, and chat history. There's no way to recover this data afterward.</span>
            </div>
            <label>Mind sharing why you're leaving? (optional)</label>
            <textarea value={feedbackText} onChange={(e) => setFeedbackText(e.target.value)} placeholder="Totally optional — helps us improve" />
            <div className="form-actions">
              <button className="btn-cancel" onClick={() => setShowDeleteModal(false)}>Cancel</button>
              <button className="btn-confirm-delete" onClick={handleDeleteAccount}>Yes, delete my account</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ChangePasswordModal({ onClose, onSubmit }) {
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');
  const canSubmit = current && next.length >= 8 && next === confirm;

  return (
    <div className="modal-card rainbow-focus" onClick={(e) => e.stopPropagation()}>
      <div className="modal-head"><h4>Change password</h4><button className="close-x" onClick={onClose}><X size={18} /></button></div>
      <label>Current password</label>
      <input type="password" value={current} onChange={(e) => setCurrent(e.target.value)} />
      <label>New password</label>
      <input type="password" value={next} onChange={(e) => setNext(e.target.value)} placeholder="At least 8 characters" />
      <label>Confirm new password</label>
      <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
      <div className="form-actions">
        <button className="btn-cancel" onClick={onClose}>Cancel</button>
        <button
          className="btn-save-profile"
          style={{ flex: 1, opacity: canSubmit ? 1 : 0.5 }}
          disabled={!canSubmit}
          onClick={() => canSubmit && onSubmit(current, next)}
        >
          Update password
        </button>
      </div>
    </div>
  );
}