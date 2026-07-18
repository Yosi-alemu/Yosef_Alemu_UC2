"use client";

import { useEffect, useMemo, useState } from "react";
import type { Account, Category, Filters, Listing, OfferType } from "@/lib/types";
import { DEFAULT_FILTERS, MAX_PRICE_LIMIT } from "@/lib/types";
import {
  loadAccounts,
  loadActiveUser,
  loadListings,
  saveAccounts,
  saveActiveUser,
  saveListings,
} from "@/lib/storage";
import { useToasts } from "@/lib/useToasts";
import AuthOverlay from "./AuthOverlay";
import Header from "./Header";
import Sidebar from "./Sidebar";
import ListingsGrid from "./ListingsGrid";
import AddListingModal from "./AddListingModal";
import DetailsModal from "./DetailsModal";
import ToastContainer from "./ToastContainer";

export default function BrokerHubApp() {
  const [mounted, setMounted] = useState(false);
  const [listings, setListings] = useState<Listing[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [activeUser, setActiveUser] = useState<Account | null>(null);
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [detailsListing, setDetailsListing] = useState<Listing | null>(null);

  const { toasts, showToast, removeToast } = useToasts();

  // Browser storage isn't available during server render; load it once the
  // component mounts on the client to avoid a hydration mismatch.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    setListings(loadListings());
    setAccounts(loadAccounts());
    setActiveUser(loadActiveUser());
    setMounted(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  const isAdmin = activeUser?.role === "admin";

  const filteredListings = useMemo(() => {
    let result = [...listings];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (item) => item.title.toLowerCase().includes(q) || item.location.toLowerCase().includes(q)
      );
    }

    if (filters.type !== "all") {
      result = result.filter((item) => item.type === filters.type);
    }

    if (filters.category !== "all") {
      result = result.filter((item) => item.category === filters.category);
    }

    if (filters.maxPrice < MAX_PRICE_LIMIT) {
      result = result.filter((item) => item.price <= filters.maxPrice);
    }

    if (filters.sortBy === "newest") {
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (filters.sortBy === "priceAsc") {
      result.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === "priceDesc") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [listings, filters]);

  function handleLogin(username: string, password: string): boolean {
    const match = accounts.find(
      (acc) => acc.username.toLowerCase() === username.toLowerCase() && acc.password === password
    );
    if (match) {
      setActiveUser(match);
      saveActiveUser(match);
      showToast(`Welcome back, ${match.name}!`, "success");
      return true;
    }
    showToast("Invalid username or password. Please try again.", "danger");
    return false;
  }

  function handleRegister(name: string, username: string, password: string): boolean {
    if (accounts.some((acc) => acc.username.toLowerCase() === username.toLowerCase())) {
      showToast("Username already exists. Choose a unique one.", "danger");
      return false;
    }
    const newAccount: Account = { username, password, name, role: "user" };
    const next = [...accounts, newAccount];
    setAccounts(next);
    saveAccounts(next);
    showToast("Registration successful! You can now log in.", "success");
    return true;
  }

  function handleLogout() {
    setActiveUser(null);
    saveActiveUser(null);
    showToast("Successfully signed out.", "info");
  }

  function handleAddListing(data: Omit<Listing, "id" | "createdAt">) {
    const newListing: Listing = {
      ...data,
      id: `lst_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    const next = [newListing, ...listings];
    setListings(next);
    saveListings(next);
    setAddModalOpen(false);
    showToast(`Successfully published "${newListing.title}"!`, "success");
  }

  function handleDeleteListing(listing: Listing) {
    if (!confirm(`Are you sure you want to delete the listing: "${listing.title}"?`)) return;
    const next = listings.filter((item) => item.id !== listing.id);
    setListings(next);
    saveListings(next);
    showToast(`Removed listing "${listing.title}".`, "danger");
  }

  function handleSubmitInquiry(agentName: string, email: string) {
    setDetailsListing(null);
    showToast(`Message sent! Agent ${agentName} will contact you shortly at ${email}.`, "success");
  }

  function resetAllFilters() {
    setFilters(DEFAULT_FILTERS);
    showToast("All listing filters reset.", "info");
  }

  if (!mounted) return null;

  if (!activeUser) {
    return (
      <>
        <AuthOverlay onLogin={handleLogin} onRegister={handleRegister} />
        <ToastContainer toasts={toasts} onRemove={removeToast} />
      </>
    );
  }

  return (
    <>
      <Header user={activeUser} onAddClick={() => setAddModalOpen(true)} onLogout={handleLogout} />

      <main className="mx-auto grid max-w-[1440px] grid-cols-1 gap-6 p-6 lg:min-h-[calc(100vh-75px)] lg:grid-cols-[280px_1fr]">
        <Sidebar
          filters={filters}
          onSearchChange={(value) => setFilters((prev) => ({ ...prev, search: value }))}
          onTypeChange={(value: "all" | OfferType) => setFilters((prev) => ({ ...prev, type: value }))}
          onCategoryChange={(value: "all" | Category) =>
            setFilters((prev) => ({ ...prev, category: value }))
          }
          onMaxPriceChange={(value) => setFilters((prev) => ({ ...prev, maxPrice: value }))}
          onSortChange={(value) => setFilters((prev) => ({ ...prev, sortBy: value }))}
          onReset={resetAllFilters}
        />

        <ListingsGrid
          listings={filteredListings}
          totalCount={listings.length}
          isAdmin={Boolean(isAdmin)}
          onView={setDetailsListing}
          onDelete={handleDeleteListing}
          onResetFilters={resetAllFilters}
        />
      </main>

      {addModalOpen && (
        <AddListingModal
          onClose={() => setAddModalOpen(false)}
          onSubmit={handleAddListing}
          defaultContactName={
            activeUser.role === "user" ? activeUser.name : "Alexander Pierce"
          }
        />
      )}

      {detailsListing && (
        <DetailsModal
          key={detailsListing.id}
          listing={detailsListing}
          onClose={() => setDetailsListing(null)}
          onSubmitInquiry={handleSubmitInquiry}
        />
      )}

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </>
  );
}
