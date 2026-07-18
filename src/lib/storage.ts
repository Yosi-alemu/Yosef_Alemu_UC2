import { INITIAL_LISTINGS } from "./initialListings";
import type { Account, Listing } from "./types";

const LISTINGS_KEY = "broker_hub_listings";
const ACCOUNTS_KEY = "broker_hub_accounts";
const ACTIVE_USER_KEY = "broker_hub_active_user";

const DEFAULT_ACCOUNTS: Account[] = [
  { username: "admin", password: "admin123", name: "Admin Broker", role: "admin" },
  { username: "client", password: "client123", name: "Default Client", role: "user" },
];

export function loadListings(): Listing[] {
  const stored = localStorage.getItem(LISTINGS_KEY);
  if (!stored) {
    localStorage.setItem(LISTINGS_KEY, JSON.stringify(INITIAL_LISTINGS));
    return INITIAL_LISTINGS;
  }
  try {
    return JSON.parse(stored) as Listing[];
  } catch (e) {
    console.error("Error parsing stored listings", e);
    return INITIAL_LISTINGS;
  }
}

export function saveListings(listings: Listing[]) {
  localStorage.setItem(LISTINGS_KEY, JSON.stringify(listings));
}

export function loadAccounts(): Account[] {
  const stored = localStorage.getItem(ACCOUNTS_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored) as Account[];
      if (parsed.length > 0) return parsed;
    } catch (e) {
      console.error("Error parsing accounts", e);
    }
  }
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(DEFAULT_ACCOUNTS));
  return DEFAULT_ACCOUNTS;
}

export function saveAccounts(accounts: Account[]) {
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}

export function loadActiveUser(): Account | null {
  const stored = sessionStorage.getItem(ACTIVE_USER_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored) as Account;
  } catch {
    return null;
  }
}

export function saveActiveUser(user: Account | null) {
  if (user) sessionStorage.setItem(ACTIVE_USER_KEY, JSON.stringify(user));
  else sessionStorage.removeItem(ACTIVE_USER_KEY);
}
