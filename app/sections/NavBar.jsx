import Link from "next/link";

export default function NavBar() {
    return (
    <nav className="flex items-center justify-between px-8 py-6">
        <h1 className="text-3xl font-bold text-white">Mochi</h1>

        <div className="flex gap-4">
        <Link
            href="/sign-in"
            className="rounded-full border border-gray-700 px-6 py-3 text-white hover:border-white transition"
        >
            SIGN IN
        </Link>

        <Link
            href="/sign-up"
            className="rounded-full bg-[#8EA4E8] px-6 py-3 text-white hover:opacity-90 transition"
        >
            SIGN UP
        </Link>
        </div>
    </nav>
    );
}