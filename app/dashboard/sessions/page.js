"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Sessions() {
  const [sessions, setSessions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [mode, setMode] = useState("Contribution");

  const [joinCode, setJoinCode] = useState("");
  const [memberName, setMemberName] = useState("");

  /* LOAD */
  useEffect(() => {
    const stored = localStorage.getItem("fundloop_sessions");
    if (stored) setSessions(JSON.parse(stored));
  }, []);

  /* SAVE */
  useEffect(() => {
    localStorage.setItem("fundloop_sessions", JSON.stringify(sessions));
  }, [sessions]);

  const generateCode = () => {
    let code;
    do {
      code = Math.random().toString(36).substring(2, 8).toUpperCase();
    } while (sessions.some((s) => s.code === code));
    return code;
  };

  const handleCreateSession = () => {
    if (!name.trim()) return alert("Session name required");

    const newSession = {
      id: Date.now(),
      name: name.trim(),
      mode,
      code: generateCode(),
      members: [],
    };

    setSessions((prev) => [...prev, newSession]);
    setName("");
    setMode("Contribution");
    setShowForm(false);
  };

  const handleJoinSession = () => {
    if (!joinCode.trim() || !memberName.trim())
      return alert("Enter your name and session code");

    let found = false;

    const updated = sessions.map((session) => {
      if (session.code === joinCode.trim().toUpperCase()) {
        found = true;
        if (session.members.includes(memberName.trim()))
          return session;

        return {
          ...session,
          members: [...session.members, memberName.trim()],
        };
      }
      return session;
    });

    if (!found) return alert("Invalid session code");

    setSessions(updated);
    setJoinCode("");
    setMemberName("");
  };

  const handleDelete = (id) => {
    if (!confirm("Delete this session?")) return;
    setSessions((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 p-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
       <div className="mb-10">
  <h1 className="text-3xl font-bold text-[#0f172a]">
    Sessions
  </h1>
  <p className="text-gray-500 mt-2">
    Create and manage your contribution or thrift groups.
  </p>

  <button
    onClick={() => setShowForm(true)}
    className="mt-6 bg-[#16a34a] text-white px-6 py-2 rounded-xl shadow hover:shadow-md transition"
  >
    + Create Session
  </button>
</div>

        {/* Create Form */}
        {showForm && (
          <div className="bg-white p-8 rounded-2xl shadow-lg mb-10">
            <h2 className="text-xl font-semibold mb-6">
              Create New Session
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Session Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-3 border rounded-lg focus:ring-2 focus:ring-teal-400 outline-none"
              />

              <select
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              >
                <option>Contribution</option>
                <option>Thrift</option>
              </select>
            </div>

            <button
              onClick={handleCreateSession}
              className="mt-6 px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Create
            </button>
          </div>
        )}

        {/* Join Section */}
        <div className="bg-white p-8 rounded-2xl shadow-lg mb-12">
          <h2 className="text-xl font-semibold mb-6">Join Session</h2>

          <div className="grid md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Your Name"
              value={memberName}
              onChange={(e) => setMemberName(e.target.value)}
              className="p-3 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Session Code"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value)}
              className="p-3 border rounded-lg"
            />
            <button
              onClick={handleJoinSession}
              className="bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition"
            >
              Join
            </button>
          </div>
        </div>

        {/* Sessions Grid */}
        {sessions.length === 0 ? (
  <div className="bg-white p-12 rounded-2xl shadow-sm text-center border border-gray-100">
    <div className="text-5xl mb-4">📂</div>
    <p className="text-lg font-semibold text-[#0f172a]">
      No sessions yet
    </p>
    <p className="text-gray-500 mt-2">
      Create your first contribution or thrift group to get started.
    </p>
  </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sessions.map((session) => (
              <div
                key={session.id}
                className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800">
                  {session.name}
                </h3>

                <p className="text-sm mt-2 text-gray-500">
                  Mode: {session.mode}
                </p>

                <p className="mt-3 text-sm text-blue-600 font-medium">
                  Code: {session.code}
                </p>

                <p className="mt-2 text-sm text-gray-600">
                  Members: {session.members.length}
                </p>

                <button
                  onClick={() => handleDelete(session.id)}
                  className="mt-5 text-sm text-red-500 hover:text-red-600 transition"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}