"use client";

import type { Listing } from "@/lib/types";
import ListingCard from "./ListingCard";

interface ListingsGridProps {
  listings: Listing[];
  totalCount: number;
  isAdmin: boolean;
  onView: (listing: Listing) => void;
  onDelete: (listing: Listing) => void;
  onResetFilters: () => void;
}

export default function ListingsGrid({
  listings,
  totalCount,
  isAdmin,
  onView,
  onDelete,
  onResetFilters,
}: ListingsGridProps) {
  return (
    <section className="flex flex-col gap-5">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Available Listings</h2>
          <p className="text-sm font-medium text-slate-500">
            Showing {listings.length} of {totalCount} listings
          </p>
        </div>
      </div>

      {listings.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white px-5 py-15 text-center">
          <div className="mb-4 text-5xl">🔍</div>
          <h3 className="mb-2 text-xl font-bold text-slate-900">No matching listings found</h3>
          <p className="mb-5 max-w-[400px] text-sm text-slate-500">
            Try adjustments to your search keywords, price limits, or categories.
          </p>
          <button
            onClick={onResetFilters}
            className="rounded-xl bg-indigo-600 px-4.5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-6">
          {listings.map((listing) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              isAdmin={isAdmin}
              onView={onView}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </section>
  );
}
