"use client";

import { useState, useEffect } from "react";

export default function Sessions() {
  const [sessions, setSessions] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState("");
  const [mode, setMode] = useState("Contribution");

  const [joinCode, setJoinCode] = useState("");
  const [memberName, setMemberName] = useState("");

  /* ===============================
     LOAD FROM LOCAL STORAGE
  =============================== */
  useEffect(() => {
    try {
      const stored = localStorage.getItem("fundloop_sessions");
      if (stored) {
        setSessions(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Error loading sessions:", error);
    }
  }, []);

  /* ===============================
     SAVE TO LOCAL STORAGE
  =============================== */
  useEffect(() => {
    localStorage.setItem("fundloop_sessions", JSON.stringify(sessions));
  }, [sessions]);

  /* ===============================
     GENERATE UNIQUE SESSION CODE
  =============================== */
  const generateCode = () => {
    let code;
    do {
      code = Math.random().toString(36).substring(2, 8).toUpperCase();
    } while (sessions.some((session) => session.code === code));
    return code;
  };

  /* ===============================
     CREATE SESSION
  =============================== */
  const handleCreateSession = () => {
    if (!name.trim()) {
      alert("Session name is required");
      return;
    }

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

  /* ===============================
     JOIN SESSION
  =============================== */
  const handleJoinSession = () => {
    if (!joinCode.trim() || !memberName.trim()) {
      alert("Enter your name and session code");
      return;
    }

    let found = false;

    const updatedSessions = sessions.map((session) => {
      if (session.code === joinCode.trim().toUpperCase()) {
        found = true;

        if (session.members.includes(memberName.trim())) {
          alert("Member already joined!");
          return session;
        }

        return {
          ...session,
          members: [...session.members, memberName.trim()],
        };
      }
      return session;
    });

    if (!found) {
      alert("Invalid session code");
      return;
    }

    setSessions(updatedSessions);
    setJoinCode("");
    setMemberName("");
  };

  /* ===============================
     DELETE SESSION
  =============================== */
  const handleDeleteSession = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this session?"
    );
    if (!confirmDelete) return;

    setSessions((prev) =>
      prev.filter((session) => session.id !== id)
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">

        {/* DASHBOARD STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-white p-4 rounded-2xl shadow-sm">
            <p className="text-sm text-gray-500">Total Sessions</p>
            <p className="text-2xl font-bold text-gray-800">
              {sessions.length}
            </p>
          </div>

          <div className="bg-white p-4 rounded-2xl shadow-sm">
            <p className="text-sm text-gray-500">Total Members</p>
            <p className="text-2xl font-bold text-gray-800">
              {sessions.reduce(
                (total, session) => total + session.members.length,
                0
              )}
            </p>
          </div>

          <div className="bg-white p-4 rounded-2xl shadow-sm">
            <p className="text-sm text-gray-500">Contribution</p>
            <p className="text-2xl font-bold text-blue-600">
              {sessions.filter((s) => s.mode === "Contribution").length}
            </p>
          </div>

          <div className="bg-white p-4 rounded-2xl shadow-sm">
            <p className="text-sm text-gray-500">Thrift</p>
            <p className="text-2xl font-bold text-green-600">
              {sessions.filter((s) => s.mode === "Thrift").length}
            </p>
          </div>
        </div>

        {/* HEADER */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              FundLoop
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Manage contribution & thrift sessions effortlessly
            </p>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition"
          >
            + Create Session
          </button>
        </div>

        {/* CREATE SESSION FORM */}
        {showForm && (
          <div className="bg-white p-6 rounded-2xl shadow mb-8">
            <h2 className="font-bold mb-4">Create Session</h2>

            <input
              type="text"
              placeholder="Session Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border p-2 rounded mb-3"
            />

            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="w-full border p-2 rounded mb-3"
            >
              <option value="Contribution">Contribution</option>
              <option value="Thrift">Thrift</option>
            </select>

            <div className="flex gap-3">
              <button
                onClick={handleCreateSession}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Create
              </button>

              <button
                onClick={() => setShowForm(false)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* JOIN SESSION */}
        <div className="bg-white p-6 rounded-2xl shadow mb-10">
          <h2 className="font-bold mb-4">Join Session</h2>

          <input
            type="text"
            placeholder="Your Name"
            value={memberName}
            onChange={(e) => setMemberName(e.target.value)}
            className="w-full border p-2 rounded mb-3"
          />

          <input
            type="text"
            placeholder="Session Code"
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value)}
            className="w-full border p-2 rounded mb-3"
          />

          <button
            onClick={handleJoinSession}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Join
          </button>
        </div>

        {/* SESSIONS LIST */}
        {sessions.length === 0 ? (
          <div className="bg-white p-10 rounded-2xl shadow text-center text-gray-500">
            No sessions yet. Create your first one.
          </div>
        ) : (
          <div className="grid gap-6">
            {sessions.map((session) => (
              <div
                key={session.id}
                className="bg-white p-6 rounded-2xl shadow"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-lg">
                    {session.name}
                  </h3>

                  <span className="text-sm text-gray-500">
                    {session.mode}
                  </span>
                </div>

                <p className="text-sm text-blue-600 mt-2">
                  Code: {session.code}
                </p>

                <p className="text-sm mt-2">
                  Members: {session.members.length}
                </p>

                <button
                  onClick={() => handleDeleteSession(session.id)}
                  className="text-red-600 text-sm mt-3"
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