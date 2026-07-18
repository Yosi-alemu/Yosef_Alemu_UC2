"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import type { Listing } from "@/lib/types";
import { LocationIcon, PhoneIcon } from "./Icons";
import Modal from "./Modal";

interface DetailsModalProps {
  listing: Listing;
  onClose: () => void;
  onSubmitInquiry: (agentName: string, email: string) => void;
}

const CATEGORY_LABEL: Record<Listing["category"], string> = {
  home: "Property",
  car: "Vehicle",
  ground: "Land / Plot",
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

function SpecTile({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex flex-col rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
      <span className="text-[0.72rem] font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </span>
      <span className="mt-0.5 text-[0.95rem] font-bold text-slate-900">{value}</span>
    </div>
  );
}

function SpecsGrid({ listing }: { listing: Listing }) {
  const f = listing.features;
  if (listing.category === "home") {
    return (
      <div className="grid grid-cols-2 gap-3">
        <SpecTile label="Bedrooms" value={f.beds ?? 0} />
        <SpecTile label="Bathrooms" value={f.baths ?? 0} />
        <SpecTile label="Total Area" value={f.area || "N/A"} />
        <SpecTile label="Parking Details" value={f.parking || "N/A"} />
      </div>
    );
  }
  if (listing.category === "car") {
    return (
      <div className="grid grid-cols-2 gap-3">
        <SpecTile label="Model Year" value={f.year ?? "N/A"} />
        <SpecTile label="Fuel System" value={f.fuel || "N/A"} />
        <SpecTile label="Transmission" value={f.transmission || "N/A"} />
        <SpecTile label="Current Mileage" value={f.mileage || "N/A"} />
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-3">
      <SpecTile label="Ground Area" value={f.size || "N/A"} />
      <SpecTile label="Zoning Class" value={f.zoning || "N/A"} />
      <SpecTile label="Road Access" value={f.roadAccess || "N/A"} />
      <SpecTile label="Water hookup" value={f.waterConnection || "N/A"} />
    </div>
  );
}

export default function DetailsModal({ listing, onClose, onSubmitInquiry }: DetailsModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(
    `Hello! I am interested in "${listing.title}" located in ${listing.location}. Please provide more details.`
  );

  const agentName = listing.contactName || "Alexander Pierce";
  const agentPhone = listing.contactPhone || "+15550199000";

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    onSubmitInquiry(agentName, email.trim());
  }

  return (
    <Modal onClose={onClose} title="Listing Details" maxWidth="max-w-[900px]">
      <div className="overflow-y-auto p-6">
        <div className="grid grid-cols-1 gap-7 lg:grid-cols-[1.7fr_1fr]">
          {/* Left: image + details */}
          <div className="flex flex-col gap-5">
            <div className="relative aspect-video overflow-hidden rounded-2xl bg-slate-50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={listing.image}
                alt={listing.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute left-4 top-4 flex gap-2">
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

            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-[1.6rem] font-bold leading-tight text-slate-900">
                  {listing.title}
                </h2>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
                  <LocationIcon className="h-4 w-4 text-slate-400" />
                  <span>{listing.location}</span>
                </p>
              </div>
              <div className="flex flex-shrink-0 flex-col items-end text-right">
                <span className="text-[1.8rem] font-extrabold leading-none text-indigo-600">
                  ${listing.price.toLocaleString()}
                </span>
                <span className="text-sm font-medium text-slate-500">
                  {listing.type === "rent" ? "/mo" : ""}
                </span>
              </div>
            </div>

            <div>
              <h3 className="mb-2.5 border-b border-slate-200 pb-1.5 text-[0.95rem] uppercase text-slate-500">
                Overview &amp; Description
              </h3>
              <p className="text-[0.9375rem] leading-relaxed text-slate-700">
                {listing.description || "No description provided for this listing."}
              </p>
            </div>

            <div>
              <h3 className="mb-2.5 border-b border-slate-200 pb-1.5 text-[0.95rem] uppercase text-slate-500">
                Key Specifications
              </h3>
              <SpecsGrid listing={listing} />
            </div>
          </div>

          {/* Right: agent + inquiry */}
          <div className="flex flex-col gap-5">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="mb-4 flex items-center gap-3.5">
                <div className="flex h-[46px] w-[46px] items-center justify-center rounded-full bg-indigo-100 text-xl">
                  🏢
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{agentName}</h4>
                  <p className="text-xs text-slate-500">Listing Broker Agent</p>
                </div>
              </div>
              <a
                href={`tel:${agentPhone}`}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 transition-colors hover:border-slate-300"
              >
                <PhoneIcon className="h-4 w-4" />
                Call {agentName}
              </a>
            </div>

            <div className="flex flex-col gap-3.5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-[0.95rem] uppercase text-slate-500">Send An Inquiry</h3>
              <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="inquiryName" className="text-[0.78rem] font-semibold uppercase tracking-wide text-slate-500">
                    Your Name
                  </label>
                  <input
                    id="inquiryName"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. John Doe"
                    className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition-all focus:border-indigo-600 focus:bg-white focus:ring-4 focus:ring-indigo-600/10"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="inquiryEmail" className="text-[0.78rem] font-semibold uppercase tracking-wide text-slate-500">
                    Email Address
                  </label>
                  <input
                    id="inquiryEmail"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition-all focus:border-indigo-600 focus:bg-white focus:ring-4 focus:ring-indigo-600/10"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="inquiryMsg" className="text-[0.78rem] font-semibold uppercase tracking-wide text-slate-500">
                    Message
                  </label>
                  <textarea
                    id="inquiryMsg"
                    rows={3}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition-all focus:border-indigo-600 focus:bg-white focus:ring-4 focus:ring-indigo-600/10"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
