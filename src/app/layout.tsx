import type { Metadata } from "next";
import { Orbitron, Inter } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TechFiesta 2027 | Annual Science & Technology Festival Template",
  description: "Experience the synergy of human intellect and artificial consciousness at TechFiesta 2027.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${orbitron.variable} ${inter.variable} dark`}>
      <body className="bg-[#030208] text-[#e2e8f0] font-sans antialiased overflow-x-hidden selection:bg-purple-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
