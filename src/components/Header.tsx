"use client";

import type { Account } from "@/lib/types";
import { LogoMark, LogoutIcon, PlusIcon } from "./Icons";

interface HeaderProps {
  user: Account;
  onAddClick: () => void;
  onLogout: () => void;
}

export default function Header({ user, onAddClick, onLogout }: HeaderProps) {
  const isAdmin = user.role === "admin";

  return (
    <header className="sticky top-0 z-[100] border-b border-slate-200 bg-white/85 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-[42px] w-[42px] items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-400 text-white">
            <LogoMark />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-slate-900">BrokerHub</h1>
            <p className="-mt-0.5 text-xs font-medium text-slate-500">Premium Management Panel</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2.5 rounded-full border border-slate-200 bg-slate-50 py-1.5 pl-2 pr-3.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-100 text-sm">
              👤
            </span>
            <div className="flex flex-col leading-tight">
              <span className="text-[0.8125rem] font-bold text-slate-900">{user.name}</span>
              <span
                className={`mt-0.5 w-fit rounded-full px-1.5 py-px text-[0.625rem] font-semibold uppercase tracking-wide ${
                  isAdmin ? "bg-rose-100 text-rose-500" : "bg-indigo-100 text-indigo-600"
                }`}
              >
                {isAdmin ? "Broker Admin" : "Client Profile"}
              </span>
            </div>
          </div>

          <button
            onClick={onAddClick}
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-xl bg-indigo-600 px-4.5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-indigo-700 hover:shadow-[0_4px_12px_rgba(79,70,229,0.2)]"
          >
            <PlusIcon />
            Add New Listing
          </button>

          <button
            onClick={onLogout}
            title="Sign Out"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-transparent p-2.5 text-slate-900 transition-colors hover:border-rose-500 hover:bg-rose-100 hover:text-rose-500"
          >
            <LogoutIcon />
          </button>
        </div>
      </div>
    </header>
  );
}
