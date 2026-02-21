"use client";

import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="space-y-10">

      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-[#0f172a]">
          Welcome back 👋
        </h1>
        <p className="text-gray-500 mt-2">
          Manage your contribution and thrift sessions with ease.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* Create Session Card */}
        <Link
          href="/dashboard/sessions"
          className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-[#0f172a]">
            Create or Manage Sessions
          </h3>
          <p className="text-gray-500 mt-2 text-sm">
            Start a new contribution group or manage existing ones.
          </p>
          <div className="mt-4 text-[#16a34a] font-medium">
            Go to Sessions →
          </div>
        </Link>

        {/* Future Feature Placeholder */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 opacity-80">
          <h3 className="text-lg font-semibold text-[#0f172a]">
            Analytics (Coming Soon)
          </h3>
          <p className="text-gray-500 mt-2 text-sm">
            View contribution summaries and member insights.
          </p>
          <div className="mt-4 text-gray-400 font-medium">
            Backend Week
          </div>
        </div>

      </div>

      {/* Simple Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        <div className="bg-white p-4 rounded-xl shadow-sm text-center">
          <p className="text-sm text-gray-500">Total Sessions</p>
          <p className="text-2xl font-bold text-[#16a34a] mt-1">--</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm text-center">
          <p className="text-sm text-gray-500">Total Members</p>
          <p className="text-2xl font-bold text-[#16a34a] mt-1">--</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm text-center">
          <p className="text-sm text-gray-500">Contribution</p>
          <p className="text-2xl font-bold text-[#0ea5e9] mt-1">--</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm text-center">
          <p className="text-sm text-gray-500">Thrift</p>
          <p className="text-2xl font-bold text-[#f59e0b] mt-1">--</p>
        </div>

      </div>

    </div>
  );
}