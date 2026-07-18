"use client";

import type { Category, Filters, OfferType } from "@/lib/types";
import { MAX_PRICE_LIMIT } from "@/lib/types";
import { SearchIcon } from "./Icons";

interface SidebarProps {
  filters: Filters;
  onSearchChange: (value: string) => void;
  onTypeChange: (value: "all" | OfferType) => void;
  onCategoryChange: (value: "all" | Category) => void;
  onMaxPriceChange: (value: number) => void;
  onSortChange: (value: Filters["sortBy"]) => void;
  onReset: () => void;
}

const TYPE_OPTIONS: { value: "all" | OfferType; label: string }[] = [
  { value: "all", label: "All Offers" },
  { value: "sale", label: "For Sale" },
  { value: "rent", label: "For Rent" },
];

const CATEGORY_OPTIONS: { value: "all" | Category; label: string; icon: string }[] = [
  { value: "all", label: "All Items", icon: "📁" },
  { value: "home", label: "Homes", icon: "🏠" },
  { value: "car", label: "Cars", icon: "🚗" },
  { value: "ground", label: "Grounds", icon: "🌱" },
];

export default function Sidebar({
  filters,
  onSearchChange,
  onTypeChange,
  onCategoryChange,
  onMaxPriceChange,
  onSortChange,
  onReset,
}: SidebarProps) {
  const priceLabel =
    filters.maxPrice >= MAX_PRICE_LIMIT ? "No Limit" : `$${filters.maxPrice.toLocaleString()}`;

  return (
    <aside className="flex h-fit flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:sticky lg:top-[100px]">
      <div className="flex flex-col gap-2.5">
        <h3 className="text-xs uppercase tracking-wide text-slate-500">Search &amp; Locate</h3>
        <div className="relative">
          <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by name or location..."
            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm transition-all focus:border-indigo-600 focus:bg-white focus:ring-4 focus:ring-indigo-600/10 focus:outline-none"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        <h3 className="text-xs uppercase tracking-wide text-slate-500">Deal Type</h3>
        <div className="flex gap-1 rounded-lg border border-slate-200 bg-slate-50 p-1">
          {TYPE_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onTypeChange(opt.value)}
              className={`flex-1 rounded-md py-2 text-[0.8125rem] font-semibold transition-all ${
                filters.type === opt.value
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        <h3 className="text-xs uppercase tracking-wide text-slate-500">Categories</h3>
        <div className="flex flex-col gap-2">
          {CATEGORY_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onCategoryChange(opt.value)}
              className={`flex items-center gap-3 rounded-lg border px-3.5 py-2.5 text-left text-sm font-medium transition-all ${
                filters.category === opt.value
                  ? "border-indigo-600/15 bg-indigo-100 font-semibold text-indigo-600"
                  : "border-transparent bg-slate-50 text-slate-900 hover:bg-slate-200"
              }`}
            >
              <span className="text-lg">{opt.icon}</span>
              <span>{opt.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <h3 className="text-xs uppercase tracking-wide text-slate-500">Maximum Price</h3>
          <span className="text-[0.8125rem] font-bold text-indigo-600">{priceLabel}</span>
        </div>
        <input
          type="range"
          min={0}
          max={MAX_PRICE_LIMIT}
          step={1000}
          value={filters.maxPrice}
          onChange={(e) => onMaxPriceChange(parseInt(e.target.value, 10))}
          className="price-range"
        />
        <div className="flex justify-between text-xs font-medium text-slate-400">
          <span>Min: $0</span>
          <span>Max: $1M+</span>
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        <h3 className="text-xs uppercase tracking-wide text-slate-500">Sort By</h3>
        <select
          value={filters.sortBy}
          onChange={(e) => onSortChange(e.target.value as Filters["sortBy"])}
          className="w-full cursor-pointer rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition-all focus:border-indigo-600 focus:bg-white focus:ring-4 focus:ring-indigo-600/10"
        >
          <option value="newest">Newest Listed</option>
          <option value="priceAsc">Price: Low to High</option>
          <option value="priceDesc">Price: High to Low</option>
        </select>
      </div>

      <button
        onClick={onReset}
        className="w-full rounded-xl border border-slate-200 bg-transparent px-4 py-2.5 text-sm font-semibold text-slate-900 transition-colors hover:border-slate-300 hover:bg-slate-50"
      >
        Reset All Filters
      </button>
    </aside>
  );
}
