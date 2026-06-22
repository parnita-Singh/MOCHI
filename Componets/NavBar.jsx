import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-[#1C0A12]/80 backdrop-blur-md z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-6">
        <div className="flex items-center gap-2">
          <Image src="/photos/logo.png" alt="Wally logo" width={36} height={36} />
          <h1 className="text-3xl text-pink-200 font-bold">Wally</h1>
        </div>
        <ul className="hidden md:flex gap-8 text-pink-100">
          <li>Transactions</li>
          <li>Accounts</li>
          <li>Your Summaries</li>
          <li>Goals</li>
          <li>Wally AI</li>
        </ul>
        <button className="bg-[#C97A8A] px-5 py-2 rounded-full">
          Early Access
        </button>
      </div>
    </nav>
  );
}