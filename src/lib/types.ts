export type Category = "home" | "car" | "ground";
export type OfferType = "sale" | "rent";
export type Role = "admin" | "user";
export type ToastType = "info" | "success" | "danger";

export interface HomeFeatures {
  beds: number;
  baths: number;
  area: string;
  parking: string;
}

export interface CarFeatures {
  year: number;
  fuel: string;
  transmission: string;
  mileage: string;
}

export interface GroundFeatures {
  size: string;
  zoning: string;
  roadAccess: string;
  waterConnection: string;
}

export type ListingFeatures = Partial<HomeFeatures & CarFeatures & GroundFeatures>;

export interface Listing {
  id: string;
  title: string;
  category: Category;
  type: OfferType;
  price: number;
  location: string;
  image: string;
  description: string;
  features: ListingFeatures;
  contactName: string;
  contactPhone: string;
  createdAt: string;
}

export interface Account {
  username: string;
  password: string;
  name: string;
  role: Role;
}

export interface Filters {
  search: string;
  type: "all" | OfferType;
  category: "all" | Category;
  maxPrice: number;
  sortBy: "newest" | "priceAsc" | "priceDesc";
}

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  leaving?: boolean;
}

export const MAX_PRICE_LIMIT = 1_000_000;

export const DEFAULT_FILTERS: Filters = {
  search: "",
  type: "all",
  category: "all",
  maxPrice: MAX_PRICE_LIMIT,
  sortBy: "newest",
};
