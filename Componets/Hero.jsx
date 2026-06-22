import Image from "next/image";

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-32 pb-16 bg-gradient-to-b from-[#FDE8EF] to-white">
      <Image
        src="/photos/logo.png"
        alt="Mochi logo"
        width={120}
        height={120}
        className="mb-4"
      />

      <span className="text-xs font-semibold tracking-widest text-[#C97A8A] uppercase mb-4">
        ✿ Your money management made easy ✿
      </span>

      <h1 className="text-4xl md:text-6xl text-[#6B4750] font-bold leading-tight mb-6 max-w-2xl">
        Budgeting, but make it cute.
      </h1>

      <p className="max-w-md text-[#6B4750]/70 text-lg mb-8">
        Mochi turns your spending into something soft, simple, and a little magical — powered by AI insights.
      </p>

      <div className="flex gap-4 mb-12">
        <button className="bg-[#C97A8A] hover:bg-[#d98fa0] transition px-7 py-3 rounded-full text-white font-medium">
          Get Early Access
        </button>
        <button className="px-7 py-3 rounded-full text-[#C97A8A] font-medium border border-[#C97A8A]/40 hover:bg-[#C97A8A]/10 transition">
          See How It Works
        </button>
      </div>

      <div className="flex gap-10 text-[#6B4750]/60 text-sm">
        <span>🔒 Bank-grade security</span>
        <span>⚡ AI-powered insights</span>
        <span>🍡 Built for Gen Z</span>
      </div>
    </section>
  );
}


<section className="min-h-screen flex items-center">

<div className="grid md:grid-cols-2 gap-12">

<div>

<h1 className="text-7xl font-bold text-pink-100">

Your Money Finally
Makes Sense.

</h1>

<p className="text-xl text-pink-300 mt-6">

Track expenses, set goals,
and get AI-powered insights
from Wally.

</p>

<button
className="mt-8 bg-[#C97A8A]
px-8 py-4 rounded-full"
>

Get Early Access

</button>

</div>

<div>

<img src="/photos/logo.png" alt="MOCHI" className="w-12 h-12" />

</div>

</div>

</section>