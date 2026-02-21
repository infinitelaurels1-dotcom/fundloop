"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="flex flex-col items-center text-center">

      {/* ================= HERO SECTION ================= */}
      <section className="py-20 flex flex-col items-center">

        {/* Animated Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <Image
            src="/logo.png"
            alt="FundLoop Logo"
            width={180}
            height={180}
            priority
          />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold leading-tight"
        >
          Manage Group Contributions
          <br />
          <span className="bg-gradient-to-r from-blue-700 to-teal-500 bg-clip-text text-transparent">
            The Smart Way
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-6 text-gray-600 max-w-xl"
        >
          FundLoop helps you create, manage and track contribution
          and thrift sessions effortlessly — no confusion,
          no manual calculations.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mt-10 flex gap-4"
        >
          <Link
            href="/sessions"
            className="px-6 py-3 rounded-xl text-white font-medium
            bg-gradient-to-r from-blue-600 to-teal-500
            hover:opacity-90 transition shadow-lg"
          >
            Start Managing
          </Link>

          <Link
            href="/sessions"
            className="px-6 py-3 rounded-xl border border-gray-300
            hover:border-teal-500 hover:text-teal-600 transition"
          >
            View Sessions
          </Link>
        </motion.div>
      </section>

      {/* ================= FEATURES SECTION ================= */}
      <section className="py-20 w-full">
        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-4 text-blue-700">
              Create Sessions
            </h3>
            <p className="text-gray-600">
              Start contribution or thrift groups in seconds with
              unique session codes.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-4 text-teal-600">
              Invite Members
            </h3>
            <p className="text-gray-600">
              Members join securely using a simple join code —
              no complicated setup.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-4 text-blue-700">
              Track Everything
            </h3>
            <p className="text-gray-600">
              Monitor sessions, members, and activity in one
              clean dashboard.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}