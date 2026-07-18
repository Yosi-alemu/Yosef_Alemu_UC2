"use client";

import type { Listing } from "@/lib/types";
import { LocationIcon } from "./Icons";

interface ListingCardProps {
  listing: Listing;
  isAdmin: boolean;
  onView: (listing: Listing) => void;
  onDelete: (listing: Listing) => void;
}

const CATEGORY_LABEL: Record<Listing["category"], string> = {
  home: "Home",
  car: "Car",
  ground: "Ground Plot",
};

const TYPE_BADGE_CLASS: Record<Listing["type"], string> = {
  sale: "bg-emerald-100 text-emerald-600",
  rent: "bg-sky-100 text-sky-600",
};

const CATEGORY_BADGE_CLASS: Record<Listing["category"], string> = {
  home: "bg-amber-100 text-amber-600",
  car: "bg-fuchsia-100 text-purple-400",
  ground: "bg-emerald-100 text-emerald-700",
};

function FeatureSummary({ listing }: { listing: Listing }) {
  const f = listing.features;
  if (listing.category === "home") {
    return (
      <>
        <div className="flex items-center gap-1 text-[0.78rem] font-medium text-slate-500">
          🛏️ <span>{f.beds ?? 0} Beds</span>
        </div>
        <div className="flex items-center gap-1 text-[0.78rem] font-medium text-slate-500">
          🚿 <span>{f.baths ?? 0} Baths</span>
        </div>
        <div className="flex items-center gap-1 text-[0.78rem] font-medium text-slate-500">
          📏 <span>{f.area || "N/A"}</span>
        </div>
      </>
    );
  }
  if (listing.category === "car") {
    return (
      <>
        <div className="flex items-center gap-1 text-[0.78rem] font-medium text-slate-500">
          📅 <span>{f.year ?? "N/A"}</span>
        </div>
        <div className="flex items-center gap-1 text-[0.78rem] font-medium text-slate-500">
          ⚙️ <span>{f.transmission || "N/A"}</span>
        </div>
        <div className="flex items-center gap-1 text-[0.78rem] font-medium text-slate-500">
          ⛽ <span>{f.fuel || "N/A"}</span>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="flex items-center gap-1 text-[0.78rem] font-medium text-slate-500">
        🏞️ <span>{f.size || "N/A"}</span>
      </div>
      <div className="flex items-center gap-1 text-[0.78rem] font-medium text-slate-500">
        🧱 <span>{f.zoning || "N/A"}</span>
      </div>
    </>
  );
}

export default function ListingCard({ listing, isAdmin, onView, onDelete }: ListingCardProps) {
  const priceFormatted = `$${listing.price.toLocaleString()}`;
  const pricePeriod = listing.type === "rent" ? "/mo" : "";

  return (
    <div
      onClick={() => onView(listing)}
      className="group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-50">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={listing.image}
          alt={listing.title}
          className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
        />
        <div className="pointer-events-none absolute left-3 top-3 flex flex-wrap gap-1.5">
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide ${TYPE_BADGE_CLASS[listing.type]}`}
          >
            {listing.type === "rent" ? "For Rent" : "For Sale"}
          </span>
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide ${CATEGORY_BADGE_CLASS[listing.category]}`}
          >
            {CATEGORY_LABEL[listing.category]}
          </span>
        </div>
      </div>

      <div className="flex flex-grow flex-col p-5">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-baseline">
            <span className="text-[1.35rem] font-extrabold text-indigo-600">{priceFormatted}</span>
            <span className="ml-0.5 text-[0.8125rem] font-medium text-slate-500">{pricePeriod}</span>
          </div>
        </div>
        <h3 className="mb-2 truncate text-[1.05rem] font-bold leading-tight text-slate-900">
          {listing.title}
        </h3>
        <p className="mb-4 flex items-center gap-1.5 text-[0.8125rem] text-slate-500">
          <LocationIcon className="h-3.5 w-3.5 text-slate-400" />
          <span>{listing.location}</span>
        </p>
        <div className="mt-auto flex flex-wrap gap-x-3 gap-y-2 border-t border-slate-200 pt-4">
          <FeatureSummary listing={listing} />
        </div>
      </div>

      <div className="flex gap-2.5 border-t border-dashed border-slate-200 px-5 pb-5 pt-4">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onView(listing);
          }}
          className="flex-1 rounded-xl border border-slate-200 bg-transparent px-4 py-2.5 text-sm font-semibold text-slate-900 transition-colors hover:border-slate-300 hover:bg-slate-50"
        >
          Details
        </button>
        {isAdmin && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(listing);
            }}
            className="flex-1 rounded-xl border border-rose-100 bg-transparent px-4 py-2.5 text-sm font-semibold text-rose-500 transition-colors hover:border-rose-500 hover:bg-rose-100"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
