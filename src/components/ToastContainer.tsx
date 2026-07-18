"use client";

import type { Toast } from "@/lib/types";

interface ToastContainerProps {
  toasts: Toast[];
  onRemove: (id: string) => void;
}

const TOAST_BORDER_CLASS: Record<Toast["type"], string> = {
  success: "border-l-4 border-emerald-500",
  danger: "border-l-4 border-rose-500",
  info: "border-l-4 border-indigo-600",
};

const TOAST_SYMBOL: Record<Toast["type"], string> = {
  success: "✅",
  danger: "🗑️",
  info: "ℹ️",
};

export default function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  return (
    <div className="fixed bottom-6 right-6 z-[1100] flex flex-col gap-2.5">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          onAnimationEnd={() => {
            if (toast.leaving) onRemove(toast.id);
          }}
          className={`pointer-events-auto flex min-w-[250px] items-center gap-3 rounded-lg bg-slate-800 px-5 py-3 text-sm font-medium text-white shadow-lg ${
            TOAST_BORDER_CLASS[toast.type]
          } ${toast.leaving ? "animate-toast-out" : "animate-toast-in"}`}
        >
          <span>{TOAST_SYMBOL[toast.type]}</span>
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
}
