import type { Listing } from "./types";

export const INITIAL_LISTINGS: Listing[] = [
  {
    id: "lst_1",
    title: "Contemporary 4-Bedroom Villa",
    category: "home",
    type: "sale",
    price: 650000,
    location: "Beverly Hills, CA",
    image:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80",
    description:
      "An elegant, light-filled contemporary villa featuring open-concept living spaces, premium finishes, a private pool, and panoramic city views. Perfect for a family seeking luxury and comfort.",
    features: {
      beds: 4,
      baths: 3.5,
      area: "3,800 sqft",
      parking: "2 Car Garage",
    },
    contactName: "Sarah Jenkins",
    contactPhone: "+1 (555) 019-2834",
    createdAt: "2026-07-10T10:30:00Z",
  },
  {
    id: "lst_2",
    title: "Tesla Model Y Long Range",
    category: "car",
    type: "sale",
    price: 48500,
    location: "San Jose, CA",
    image:
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80",
    description:
      "2024 Tesla Model Y Long Range in Pearl White. Clean history, single owner, Autopilot enabled, and full premium black interior. Battery and drive unit warranty fully active.",
    features: {
      year: 2024,
      fuel: "Electric",
      transmission: "Automatic",
      mileage: "12,400 miles",
    },
    contactName: "David Miller",
    contactPhone: "+1 (555) 014-9988",
    createdAt: "2026-07-12T14:15:00Z",
  },
  {
    id: "lst_3",
    title: "Prime Commercial Plot",
    category: "ground",
    type: "sale",
    price: 320000,
    location: "Austin Suburban East, TX",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
    description:
      "Flat, fully cleared 2.5-acre plot ideal for commercial development or building your dream ranch. Convenient access to major highway, pre-installed water line, and electricity hookup ready.",
    features: {
      size: "2.5 Acres",
      zoning: "Commercial / Residential",
      roadAccess: "Paved Road",
      waterConnection: "Available",
    },
    contactName: "Robert Chen",
    contactPhone: "+1 (555) 017-4321",
    createdAt: "2026-07-15T09:00:00Z",
  },
  {
    id: "lst_4",
    title: "Modern 2-Bedroom Apartment",
    category: "home",
    type: "rent",
    price: 2800,
    location: "Downtown Seattle, WA",
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
    description:
      "Stunning downtown apartment with floor-to-ceiling windows, modern kitchen with stainless steel appliances, building gym access, 24/7 security concierge, and roof deck.",
    features: {
      beds: 2,
      baths: 2,
      area: "1,150 sqft",
      parking: "1 Reserved Space",
    },
    contactName: "Sarah Jenkins",
    contactPhone: "+1 (555) 019-2834",
    createdAt: "2026-07-16T11:45:00Z",
  },
  {
    id: "lst_5",
    title: "Mercedes-Benz C-Class C300",
    category: "car",
    type: "rent",
    price: 95,
    location: "Miami Airport, FL",
    image:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80",
    description:
      "Experience luxury with this Mercedes C300. Available for short-term and long-term rental. Features panoramic sunroof, ambient lighting, heated seats, and advanced driving assistance.",
    features: {
      year: 2023,
      fuel: "Mild Hybrid / Petrol",
      transmission: "Automatic",
      mileage: "18,900 miles",
    },
    contactName: "Alex Rivera",
    contactPhone: "+1 (555) 012-7744",
    createdAt: "2026-07-17T08:30:00Z",
  },
  {
    id: "lst_6",
    title: "Rural Agricultural Land",
    category: "ground",
    type: "sale",
    price: 185000,
    location: "Ocala, FL",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
    description:
      "Beautiful 5-acre agricultural lot with mature oak trees and lush pastures. Perfect for horses, small farming, or building a secluded country retreat. Fully fenced perimeter.",
    features: {
      size: "5.0 Acres",
      zoning: "Agricultural",
      roadAccess: "Unpaved Dirt Road",
      waterConnection: "Well Required",
    },
    contactName: "Alex Rivera",
    contactPhone: "+1 (555) 012-7744",
    createdAt: "2026-07-18T15:20:00Z",
  },
];

export const SAMPLE_IMAGES: { label: string; value: string }[] = [
  {
    label: "Luxury Modern House",
    value:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80",
  },
  {
    label: "Modern Cozy Apartment",
    value:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
  },
  {
    label: "White SUV Car",
    value:
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80",
  },
  {
    label: "Mercedes Sports Sedan",
    value:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80",
  },
  {
    label: "Green Grass Field Plot",
    value:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
  },
  {
    label: "Open Rural Field",
    value:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
  },
];
