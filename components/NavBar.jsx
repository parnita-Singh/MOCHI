// components/Navbar.jsx
export default function Navbar({ minimal = false }) {
  return (
    <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-md z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-6">
        <span className="text-2xl font-bold text-white tracking-wide">Mochi</span>

        {!minimal && (
          <>
            <ul className="hidden md:flex gap-8 text-white/90">
              <li>Transactions</li>
              <li>Accounts</li>
              <li>Your Summaries</li>
              <li>Goals</li>
              <li>Mochi AI</li>
            </ul>
            <button className="bg-[#7087BB] text-white px-5 py-2 rounded-full">
              Early Access
            </button>
          </>
        )}

        {minimal && (
          <div className="flex gap-3">
            <button className="px-5 py-2 rounded-full text-white font-medium border border-white/30 hover:bg-white/10 transition">
              SIGN IN
            </button>
            <button className="bg-[#7087BB] hover:bg-[#8298c9] transition px-5 py-2 rounded-full text-white font-medium">
              SIGN UP
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}