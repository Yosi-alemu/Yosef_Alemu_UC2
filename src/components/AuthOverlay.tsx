"use client";

import { useRef, useState } from "react";
import type { FormEvent } from "react";
import { LogoMark } from "./Icons";

interface AuthOverlayProps {
  onLogin: (username: string, password: string) => boolean;
  onRegister: (name: string, username: string, password: string) => boolean;
}

export default function AuthOverlay({ onLogin, onRegister }: AuthOverlayProps) {
  const [tab, setTab] = useState<"login" | "register">("login");

  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const loginPasswordRef = useRef<HTMLInputElement>(null);

  const [registerName, setRegisterName] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  function handleLogin(e: FormEvent) {
    e.preventDefault();
    const ok = onLogin(loginUsername.trim(), loginPassword);
    if (ok) {
      setLoginUsername("");
      setLoginPassword("");
    }
  }

  function handleRegister(e: FormEvent) {
    e.preventDefault();
    const ok = onRegister(registerName.trim(), registerUsername.trim(), registerPassword);
    if (ok) {
      const newUsername = registerUsername.trim();
      setRegisterName("");
      setRegisterUsername("");
      setRegisterPassword("");
      setTab("login");
      setLoginUsername(newUsername);
      requestAnimationFrame(() => loginPasswordRef.current?.focus());
    }
  }

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-[radial-gradient(circle_at_10%_20%,rgba(99,102,241,0.15)_0%,rgba(15,23,42,0.95)_90%)] backdrop-blur-md">
      <div className="animate-modal-fade-in flex w-[90%] max-w-[440px] flex-col gap-6 rounded-2xl border border-white/10 bg-white p-8 shadow-2xl shadow-indigo-500/10">
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-400 text-white">
            <LogoMark className="h-6 w-6" />
          </div>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">BrokerHub</h2>
          <p className="text-[0.8125rem] font-medium text-slate-500">
            Premium Real Estate &amp; Vehicle Catalog
          </p>
        </div>

        <div className="flex gap-1 rounded-xl border border-slate-200 bg-slate-50 p-1">
          <button
            type="button"
            onClick={() => setTab("login")}
            className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition-all ${
              tab === "login"
                ? "bg-white text-indigo-600 shadow-sm"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setTab("register")}
            className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition-all ${
              tab === "register"
                ? "bg-white text-indigo-600 shadow-sm"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            Create Account
          </button>
        </div>

        {tab === "login" ? (
          <form onSubmit={handleLogin}>
            <div className="mb-3 flex flex-col gap-1.5">
              <label htmlFor="loginUsername" className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Username
              </label>
              <input
                id="loginUsername"
                type="text"
                required
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                placeholder="Enter username (e.g., client or admin)"
                className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition-all focus:border-indigo-600 focus:bg-white focus:ring-4 focus:ring-indigo-600/10"
              />
            </div>
            <div className="mb-4 flex flex-col gap-1.5">
              <label htmlFor="loginPassword" className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Password
              </label>
              <input
                ref={loginPasswordRef}
                id="loginPassword"
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="Enter password (e.g., client123 or admin123)"
                className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition-all focus:border-indigo-600 focus:bg-white focus:ring-4 focus:ring-indigo-600/10"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
            >
              Access Account
            </button>
            <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs leading-relaxed text-slate-500">
              <p className="mb-1">
                <strong>Demo Roles:</strong>
              </p>
              <p className="mb-1">
                Broker Admin:{" "}
                <code className="rounded bg-slate-200 px-1 py-0.5 font-mono font-bold text-indigo-700">
                  admin
                </code>{" "}
                /{" "}
                <code className="rounded bg-slate-200 px-1 py-0.5 font-mono font-bold text-indigo-700">
                  admin123
                </code>
              </p>
              <p>
                Default Client:{" "}
                <code className="rounded bg-slate-200 px-1 py-0.5 font-mono font-bold text-indigo-700">
                  client
                </code>{" "}
                /{" "}
                <code className="rounded bg-slate-200 px-1 py-0.5 font-mono font-bold text-indigo-700">
                  client123
                </code>
              </p>
            </div>
          </form>
        ) : (
          <form onSubmit={handleRegister}>
            <div className="mb-3 flex flex-col gap-1.5">
              <label htmlFor="registerName" className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Full Name
              </label>
              <input
                id="registerName"
                type="text"
                required
                value={registerName}
                onChange={(e) => setRegisterName(e.target.value)}
                placeholder="e.g. John Doe"
                className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition-all focus:border-indigo-600 focus:bg-white focus:ring-4 focus:ring-indigo-600/10"
              />
            </div>
            <div className="mb-3 flex flex-col gap-1.5">
              <label htmlFor="registerUsername" className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Username
              </label>
              <input
                id="registerUsername"
                type="text"
                required
                value={registerUsername}
                onChange={(e) => setRegisterUsername(e.target.value)}
                placeholder="Choose a unique username"
                className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition-all focus:border-indigo-600 focus:bg-white focus:ring-4 focus:ring-indigo-600/10"
              />
            </div>
            <div className="mb-4 flex flex-col gap-1.5">
              <label htmlFor="registerPassword" className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Password
              </label>
              <input
                id="registerPassword"
                type="password"
                required
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                placeholder="Choose password"
                className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition-all focus:border-indigo-600 focus:bg-white focus:ring-4 focus:ring-indigo-600/10"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
            >
              Create Client Account
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
