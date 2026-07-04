import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "MOCHI",
  description: "Your personal wallet tracker and financial assistant",
};


import { Press_Start_2P, Quicksand } from "next/font/google";

const pixelFont = Press_Start_2P({
  subsets: ["latin"],
  variable: "--font-pixel",
  weight: "400",
});

const bodyFont = Quicksand({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${pixelFont.variable} ${bodyFont.variable}`}>
        {children}
      </body>
    </html>
  );
}

export const metadata = {
  title: "Mochi",
  description: "AI-powered budgeting app",
  icons: {
    icon: "/photos/MOCHI.png",
  },
};