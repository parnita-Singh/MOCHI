"use client";
import React, { useState, useMemo, useRef } from 'react';
import {
  Upload, Camera, FileText, Search, ShieldCheck, Download, X, Plus,
  AlertTriangle,
} from 'lucide-react';
import NavBar from '../navigation/NavBar';

const DOC_TYPES = ['Bill', 'Receipt', 'Invoice', 'Screenshot', 'Subscription', 'Warranty proof'];
const CATEGORIES = ['Food', 'Bills', 'Travel', 'Shopping', 'Health', 'Education', 'Other'];

// Purely a convenience suggestion based on what the person typed as the
// merchant name — never overrides their choice, just pre-selects one.
const MERCHANT_CATEGORY_HINTS = [
  { match: /uber|ola|rapido/i, category: 'Travel' },
  { match: /swiggy|zomato|restaurant|cafe/i, category: 'Food' },
  { match: /amazon|flipkart|myntra/i, category: 'Shopping' },
  { match: /electricity|water board|gas|broadband|wifi/i, category: 'Bills' },
  { match: /pharmacy|hospital|clinic|apollo/i, category: 'Health' },
  { match: /school|college|course|udemy|coursera/i, category: 'Education' },
];

function suggestCategory(merchant) {
  const hit = MERCHANT_CATEGORY_HINTS.find((h) => h.match.test(merchant));
  return hit ? hit.category : null;
}

// TODO: replace with a real OCR/vision call — see notes above.
async function extractReceiptDetails(file) {
  return null; // no auto-fill until this is wired up
}

function formatRs(n) {
  return `Rs ${Math.round(n).toLocaleString('en-IN')}`;
}

function monthKey(dateStr) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

function monthLabel(key) {
  const [y, m] = key.split('-').map(Number);
  return new Date(y, m - 1, 1).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function ReceiptsVault({ onCreateExpense = null }) {
  const [receipts, setReceipts] = useState([]); // [{ id, fileDataUrl, fileType, docType, merchant, amount, date, category, note, warranty }]
  const [showUpload, setShowUpload] = useState(false);
  const [query, setQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterDocType, setFilterDocType] = useState('All');
  const [filterMonth, setFilterMonth] = useState('All');

  const months = useMemo(() => {
    const keys = Array.from(new Set(receipts.map((r) => monthKey(r.date)))).sort().reverse();
    return keys;
  }, [receipts]);

  const filtered = useMemo(() => {
    return receipts.filter((r) => {
      if (filterCategory !== 'All' && r.category !== filterCategory) return false;
      if (filterDocType !== 'All' && r.docType !== filterDocType) return false;
      if (filterMonth !== 'All' && monthKey(r.date) !== filterMonth) return false;
      if (query.trim()) {
        const q = query.trim().toLowerCase();
        const haystack = `${r.merchant} ${r.category} ${r.docType} ${r.note}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [receipts, query, filterCategory, filterDocType, filterMonth]);

  const grouped = useMemo(() => {
    const byMonth = {};
    filtered.forEach((r) => {
      const key = monthKey(r.date);
      if (!byMonth[key]) byMonth[key] = [];
      byMonth[key].push(r);
    });
    return Object.entries(byMonth).sort((a, b) => (a[0] < b[0] ? 1 : -1));
  }, [filtered]);

  function findPossibleDuplicate({ merchant, amount, date }) {
    return receipts.find((r) =>
      r.merchant.trim().toLowerCase() === merchant.trim().toLowerCase() &&
      Number(r.amount) === Number(amount) &&
      r.date === date
    );
  }

  function handleSaveReceipt(entry) {
    setReceipts((prev) => [...prev, { id: `${Date.now()}`, ...entry }]);
    // TODO: upload the actual file + persist metadata — see notes above.
    if (entry.alsoLogExpense && onCreateExpense) {
      onCreateExpense({ amount: entry.amount, category: entry.category, date: entry.date, note: entry.merchant });
    }
    setShowUpload(false);
  }

  function handleExport() {
    const data = receipts.map(({ fileDataUrl, ...rest }) => rest); // metadata only, not the raw files
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'receipts-export.json';
    a.click();
    URL.revokeObjectURL(url);
    // TODO: swap this for a real PDF bundle export if that's what you need.
  }

  return (
    <div className="receipts-root">
      <style>{`
        .receipts-root {
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
        .receipts-root * { box-sizing: border-box; }

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
        .main { flex: 1; padding: 28px 36px; }

        .head-row { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px; flex-wrap: wrap; gap: 12px; }
        .title-block { display: flex; align-items: center; gap: 10px; }
        .page-title { font-size: 22px; font-weight: 600; margin: 0; }
        .badge { display: flex; align-items: center; gap: 5px; font-size: 11.5px; color: var(--sage); border: 1px solid var(--border); border-radius: 999px; padding: 4px 10px; }
        .page-sub { color: var(--text-dim); font-size: 14px; margin: 4px 0 20px; }

        .head-actions { display: flex; gap: 10px; }
        .btn-ghost {
          display: flex; align-items: center; gap: 6px; border: 1px solid var(--border); background: transparent;
          color: var(--text); border-radius: 999px; padding: 9px 15px; font-size: 13.5px; cursor: pointer;
        }
        .btn-ghost:hover { border-color: var(--mist); color: var(--mist); }
        .btn-solid {
          display: flex; align-items: center; gap: 6px; border: none; background: var(--rosewood);
          color: #fff; border-radius: 999px; padding: 9px 16px; font-size: 13.5px; font-weight: 600; cursor: pointer;
        }

        .toolbar { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 18px; }
        .search-box {
          flex: 1; min-width: 200px; display: flex; align-items: center; gap: 8px;
          background: var(--panel); border: 1px solid var(--border); border-radius: 12px; padding: 10px 14px;
        }
        .search-box input { flex: 1; background: transparent; border: none; outline: none; color: var(--text); font-size: 14px; }
        .search-box input::placeholder { color: var(--text-dim); }

        .filter-select {
          background: var(--panel); border: 1px solid var(--border); color: var(--text);
          border-radius: 12px; padding: 10px 12px; font-size: 13.5px; cursor: pointer;
        }

        .month-group { margin-bottom: 22px; }
        .month-title { font-size: 12px; letter-spacing: 0.07em; text-transform: uppercase; color: var(--text-dim); margin-bottom: 12px; }
        .receipt-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 14px; }

        .receipt-card {
          background: var(--panel); border: 1px solid var(--border); border-radius: 16px; overflow: hidden;
        }
        .receipt-thumb { width: 100%; height: 120px; background: var(--panel-2); display: flex; align-items: center; justify-content: center; overflow: hidden; }
        .receipt-thumb img { width: 100%; height: 100%; object-fit: cover; }
        .receipt-body { padding: 12px 14px; }
        .receipt-top-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; }
        .receipt-merchant { font-size: 14.5px; font-weight: 600; }
        .receipt-amount { font-size: 14.5px; font-weight: 600; color: var(--rosewood); }
        .receipt-meta-row { display: flex; justify-content: space-between; font-size: 12px; color: var(--text-dim); }
        .receipt-tags { display: flex; gap: 6px; margin-top: 8px; flex-wrap: wrap; }
        .tag-chip { font-size: 10.5px; border: 1px solid var(--border); border-radius: 999px; padding: 3px 9px; color: var(--text-dim); }
        .tag-chip.category { color: var(--sage); border-color: var(--sage); }

        .empty-card { background: var(--panel); border: 1px solid var(--border); border-radius: 20px; padding: 36px 24px; text-align: center; color: var(--text-dim); font-size: 14px; }

        .overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center; z-index: 50; padding: 20px; }
        .modal-card { width: 100%; max-width: 420px; max-height: 90vh; overflow-y: auto; background: var(--panel); border: 1px solid var(--border); border-radius: 20px; padding: 22px; }
        .modal-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
        .modal-head h4 { margin: 0; font-size: 15px; }
        .close-x { cursor: pointer; color: var(--text-dim); background: none; border: none; }
        .close-x:hover { color: var(--blush); }

        .upload-zone {
          border: 1.5px dashed var(--border); border-radius: 14px; padding: 22px; text-align: center;
          margin-bottom: 16px; cursor: pointer; color: var(--text-dim); font-size: 13.5px;
        }
        .upload-zone:hover { border-color: var(--mist); color: var(--mist); }
        .upload-zone-buttons { display: flex; gap: 8px; justify-content: center; margin-top: 10px; }
        .mini-btn { display: flex; align-items: center; gap: 5px; border: 1px solid var(--border); background: transparent; color: var(--text); border-radius: 999px; padding: 6px 12px; font-size: 12.5px; cursor: pointer; }

        .preview-strip { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; }
        .preview-strip img { width: 56px; height: 56px; border-radius: 10px; object-fit: cover; border: 1px solid var(--border); }
        .preview-strip .file-name { font-size: 12.5px; color: var(--text-dim); }

        label { display: block; font-size: 12px; color: var(--text-dim); margin-bottom: 6px; }
        .modal-card input[type="text"], .modal-card input[type="number"], .modal-card input[type="date"] {
          width: 100%; background: #0f0f0f; border: 1px solid var(--border); color: var(--text);
          padding: 10px 12px; border-radius: 10px; font-size: 14px; margin-bottom: 14px;
        }
        .modal-card input:focus { outline: none; border-color: var(--mist); }

        .pill-row { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 14px; }
        .pill {
          border: 1px solid var(--border); background: transparent; color: var(--text);
          padding: 7px 14px; border-radius: 999px; font-size: 12.5px; cursor: pointer;
        }
        .pill.selected { background: var(--sage); color: var(--ink); border-color: var(--sage); }

        .suggest-note { font-size: 12px; color: var(--mist); margin: -8px 0 14px; }
        .checkbox-row { display: flex; align-items: center; gap: 8px; margin-bottom: 16px; font-size: 13.5px; color: var(--text-dim); }
        .checkbox-row input { width: auto; margin-bottom: 0; }

        .dup-warning {
          display: flex; gap: 8px; background: rgba(180,106,114,0.12); border: 1px solid var(--rosewood);
          color: var(--blush); border-radius: 12px; padding: 12px 14px; font-size: 12.5px; margin-bottom: 14px;
        }

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
              <div className="title-block">
                <h1 className="page-title">Receipts Vault</h1>
                <span className="badge"><ShieldCheck size={13} /> Securely stored</span>
              </div>
              <p className="page-sub">Keep every bill and payment proof safely in one place.</p>
            </div>
            <div className="head-actions">
              {receipts.length > 0 && (
                <button className="btn-ghost" onClick={handleExport}><Download size={15} /> Export</button>
              )}
              <button className="btn-solid" onClick={() => setShowUpload(true)}><Plus size={15} /> Scan or Upload</button>
            </div>
          </div>

          {receipts.length > 0 && (
            <div className="toolbar">
              <div className="search-box">
                <Search size={15} color="#8a8a86" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by merchant, category, note…"
                />
              </div>
              <select className="filter-select" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
                <option value="All">All categories</option>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <select className="filter-select" value={filterDocType} onChange={(e) => setFilterDocType(e.target.value)}>
                <option value="All">All types</option>
                {DOC_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
              {months.length > 1 && (
                <select className="filter-select" value={filterMonth} onChange={(e) => setFilterMonth(e.target.value)}>
                  <option value="All">All months</option>
                  {months.map((m) => <option key={m} value={m}>{monthLabel(m)}</option>)}
                </select>
              )}
            </div>
          )}

          {receipts.length === 0 ? (
            <div className="empty-card rainbow-hover">
              Nothing saved yet. Scan a paper receipt or upload a screenshot/PDF to get started —
              everything you add here is searchable by merchant, category, or date.
            </div>
          ) : grouped.length === 0 ? (
            <div className="empty-card rainbow-hover">No receipts match your search or filters.</div>
          ) : (
            grouped.map(([key, items]) => (
              <div className="month-group" key={key}>
                <div className="month-title">{monthLabel(key)}</div>
                <div className="receipt-grid">
                  {items.map((r) => (
                    <div className="receipt-card rainbow-hover" key={r.id}>
                      <div className="receipt-thumb">
                        {r.fileType === 'image'
                          ? <img src={r.fileDataUrl} alt={r.merchant} />
                          : <FileText size={28} color="#8a8a86" />}
                      </div>
                      <div className="receipt-body">
                        <div className="receipt-top-row">
                          <span className="receipt-merchant">{r.merchant}</span>
                          <span className="receipt-amount">{formatRs(r.amount)}</span>
                        </div>
                        <div className="receipt-meta-row">
                          <span>{new Date(r.date).toLocaleDateString('en-IN')}</span>
                          <span>{r.docType}</span>
                        </div>
                        <div className="receipt-tags">
                          <span className="tag-chip category">{r.category}</span>
                          {r.warranty && <span className="tag-chip">Warranty</span>}
                          {r.note && <span className="tag-chip">{r.note}</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </main>
      </div>

      {showUpload && (
        <UploadReceiptModal
          onClose={() => setShowUpload(false)}
          onSave={handleSaveReceipt}
          findPossibleDuplicate={findPossibleDuplicate}
          canLogExpense={!!onCreateExpense}
        />
      )}
    </div>
  );
}

function UploadReceiptModal({ onClose, onSave, findPossibleDuplicate, canLogExpense }) {
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [fileDataUrl, setFileDataUrl] = useState(null);
  const [fileType, setFileType] = useState(null); // 'image' | 'pdf'
  const [extracting, setExtracting] = useState(false);

  const [docType, setDocType] = useState('Receipt');
  const [merchant, setMerchant] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [category, setCategory] = useState(null);
  const [note, setNote] = useState('');
  const [warranty, setWarranty] = useState(false);
  const [alsoLogExpense, setAlsoLogExpense] = useState(false);
  const [confirmDuplicate, setConfirmDuplicate] = useState(false);

  const suggested = useMemo(() => (merchant ? suggestCategory(merchant) : null), [merchant]);

  async function handleFileChosen(chosenFile) {
    if (!chosenFile) return;
    setFile(chosenFile);
    setFileType(chosenFile.type.startsWith('image/') ? 'image' : 'pdf');
    const dataUrl = await fileToDataUrl(chosenFile);
    setFileDataUrl(dataUrl);

    setExtracting(true);
    const details = await extractReceiptDetails(chosenFile);
    setExtracting(false);
    if (details) {
      if (details.merchant) setMerchant(details.merchant);
      if (details.amount) setAmount(String(details.amount));
      if (details.date) setDate(details.date);
    }
  }

  const canSave = file && merchant.trim() && Number(amount) > 0 && date;
  const duplicate = canSave ? findPossibleDuplicate({ merchant, amount, date }) : null;

  function handleSubmit() {
    if (!canSave) return;
    if (duplicate && !confirmDuplicate) return; // wait for explicit confirmation
    onSave({
      fileDataUrl,
      fileType,
      docType,
      merchant: merchant.trim(),
      amount: Number(amount),
      date,
      category: category || 'Other',
      note: note.trim(),
      warranty,
      alsoLogExpense,
    });
  }

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal-card rainbow-focus" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head"><h4>Scan or upload a receipt</h4><button className="close-x" onClick={onClose}><X size={18} /></button></div>

        {!file ? (
          <div className="upload-zone" onClick={() => fileInputRef.current?.click()}>
            <Upload size={22} style={{ marginBottom: 8 }} />
            <div>Click to upload a screenshot, photo, or PDF</div>
            <div className="upload-zone-buttons">
              <button className="mini-btn" onClick={(e) => { e.stopPropagation(); cameraInputRef.current?.click(); }}>
                <Camera size={13} /> Scan with camera
              </button>
              <button className="mini-btn" onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}>
                <Upload size={13} /> Upload file
              </button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,application/pdf"
              style={{ display: 'none' }}
              onChange={(e) => handleFileChosen(e.target.files?.[0])}
            />
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              style={{ display: 'none' }}
              onChange={(e) => handleFileChosen(e.target.files?.[0])}
            />
          </div>
        ) : (
          <div className="preview-strip">
            {fileType === 'image'
              ? <img src={fileDataUrl} alt="preview" />
              : <FileText size={40} color="#8a8a86" />}
            <span className="file-name">{file.name}{extracting ? ' — reading…' : ''}</span>
          </div>
        )}

        {file && (
          <>
            <label>Document type</label>
            <div className="pill-row">
              {DOC_TYPES.map((t) => (
                <button key={t} className={`pill ${docType === t ? 'selected' : ''}`} onClick={() => setDocType(t)}>{t}</button>
              ))}
            </div>

            <label>Merchant / source</label>
            <input type="text" value={merchant} onChange={(e) => setMerchant(e.target.value)} placeholder="e.g. Swiggy, Uber, Electricity Board" />

            <label>Amount (Rs)</label>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="e.g. 420" />

            <label>Date</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

            <label>Category</label>
            {suggested && !category && (
              <div className="suggest-note">Looks like {suggested} — tap to confirm, or pick another.</div>
            )}
            <div className="pill-row">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  className={`pill ${(category || suggested) === c ? 'selected' : ''}`}
                  onClick={() => setCategory(c)}
                >
                  {c}
                </button>
              ))}
            </div>

            <label>Notes (optional)</label>
            <input type="text" value={note} onChange={(e) => setNote(e.target.value)} placeholder="e.g. Paid hostel fee" />

            <div className="checkbox-row">
              <input type="checkbox" checked={warranty} onChange={(e) => setWarranty(e.target.checked)} />
              This is a warranty / proof-of-purchase record
            </div>

            {canLogExpense && (
              <div className="checkbox-row">
                <input type="checkbox" checked={alsoLogExpense} onChange={(e) => setAlsoLogExpense(e.target.checked)} />
                Also log this as an expense
              </div>
            )}

            {duplicate && (
              <div className="dup-warning">
                <AlertTriangle size={15} style={{ flexShrink: 0, marginTop: 1 }} />
                <span>
                  You already saved a {formatRs(duplicate.amount)} receipt from {duplicate.merchant} on this date.
                  {!confirmDuplicate && (
                    <> <button
                      style={{ background: 'none', border: 'none', color: 'var(--blush)', textDecoration: 'underline', cursor: 'pointer', padding: 0 }}
                      onClick={() => setConfirmDuplicate(true)}
                    >Save it anyway</button>.</>
                  )}
                </span>
              </div>
            )}
          </>
        )}

        <div className="form-actions">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button
            className="btn-save"
            disabled={!canSave || (duplicate && !confirmDuplicate)}
            style={{ opacity: canSave && (!duplicate || confirmDuplicate) ? 1 : 0.5 }}
            onClick={handleSubmit}
          >
            Save receipt
          </button>
        </div>
      </div>
    </div>
  );
}