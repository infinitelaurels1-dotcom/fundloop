"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();

  const navItem = (href, label) => {
    const active = pathname === href;

    return (
      <Link
        href={href}
        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition
        ${
          active
            ? "bg-gradient-to-r from-blue-600 to-teal-500 text-white shadow"
            : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        {label}
      </Link>
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-white shadow-lg hidden md:flex flex-col p-6">
        
        {/* Logo */}
        <div className="flex items-center gap-3 mb-10">
          <Image src="/logo.png" alt="logo" width={40} height={40} />
          <span className="text-xl font-bold text-gray-800">
            FundLoop
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2">
          {navItem("/dashboard", "Dashboard")}
          {navItem("/dashboard/sessions", "Sessions")}
          {navItem("/dashboard/members", "Members")}
          {navItem("/dashboard/payments", "Payments")}
        </nav>

        {/* Spacer */}
        <div className="flex-grow" />

        {/* Footer */}
        <div className="text-sm text-gray-400">
          FundLoop v1.0
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col">

        {/* TOP BAR */}
        <header className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">
            Dashboard
          </h1>

          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600">
              Welcome back 👋
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}