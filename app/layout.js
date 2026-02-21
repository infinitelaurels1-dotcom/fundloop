import "./globals.css";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "FundLoop",
  description: "Smart Contribution & Thrift Management Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-blue-50 to-teal-50 min-h-screen text-gray-800">

        {/* =========================
            NAVBAR
        ========================== */}
        <header className="bg-white shadow-sm">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

            {/* LOGO + BRAND */}
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo.png"   /* Make sure your logo file is inside /public */
                alt="FundLoop Logo"
                width={40}
                height={40}
              />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-teal-500 bg-clip-text text-transparent">
                FundLoop
              </span>
            </Link>

            {/* NAV LINKS */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
              <Link href="/" className="hover:text-teal-600 transition">
                Dashboard
              </Link>
              <Link href="/sessions" className="hover:text-teal-600 transition">
                Sessions
              </Link>
            </nav>

            {/* CTA BUTTON */}
            <Link
              href="/sessions"
              className="px-5 py-2 rounded-lg text-white text-sm font-medium
              bg-gradient-to-r from-blue-600 to-teal-500
              hover:opacity-90 transition shadow-md"
            >
              Get Started
            </Link>

          </div>
        </header>

        {/* =========================
            MAIN CONTENT
        ========================== */}
        <main className="max-w-6xl mx-auto px-6 py-10">
          {children}
        </main>

        {/* =========================
            FOOTER
        ========================== */}
        <footer className="mt-16 border-t bg-white">
          <div className="max-w-6xl mx-auto px-6 py-6 text-sm text-gray-500 flex flex-col md:flex-row justify-between">
            <p>© {new Date().getFullYear()} FundLoop. All rights reserved.</p>
            <p>Built for smart group contributions.</p>
          </div>
        </footer>

      </body>
    </html>
  );
}