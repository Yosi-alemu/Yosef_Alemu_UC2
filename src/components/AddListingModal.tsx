"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import type { Category, Listing, OfferType } from "@/lib/types";
import { SAMPLE_IMAGES } from "@/lib/initialListings";
import Modal from "./Modal";

interface AddListingModalProps {
  onClose: () => void;
  onSubmit: (data: Omit<Listing, "id" | "createdAt">) => void;
  defaultContactName: string;
}

const fieldClass =
  "rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition-all focus:border-indigo-600 focus:bg-white focus:ring-4 focus:ring-indigo-600/10";
const labelClass = "text-[0.78rem] font-semibold uppercase tracking-wide text-slate-500";

export default function AddListingModal({ onClose, onSubmit, defaultContactName }: AddListingModalProps) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<Category>("home");
  const [type, setType] = useState<OfferType>("sale");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const [imageSelect, setImageSelect] = useState(SAMPLE_IMAGES[0].value);
  const [customImageUrl, setCustomImageUrl] = useState("");

  const [homeBeds, setHomeBeds] = useState("3");
  const [homeBaths, setHomeBaths] = useState("2");
  const [homeArea, setHomeArea] = useState("");
  const [homeParking, setHomeParking] = useState("");

  const [carYear, setCarYear] = useState("2024");
  const [carFuel, setCarFuel] = useState("Petrol");
  const [carTransmission, setCarTransmission] = useState("Automatic");
  const [carMileage, setCarMileage] = useState("0 miles");

  const [groundSize, setGroundSize] = useState("1.0 Acres");
  const [groundZoning, setGroundZoning] = useState("Residential");
  const [groundRoad, setGroundRoad] = useState("Paved Road");
  const [groundWater, setGroundWater] = useState("Available");

  const [brokerName, setBrokerName] = useState(defaultContactName);
  const [brokerPhone, setBrokerPhone] = useState("+1 (555) 019-9000");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    let image = imageSelect;
    if (imageSelect === "custom") {
      image = customImageUrl.trim() || SAMPLE_IMAGES[0].value;
    }

    let features: Listing["features"] = {};
    if (category === "home") {
      features = {
        beds: parseInt(homeBeds, 10) || 0,
        baths: parseFloat(homeBaths) || 0,
        area: homeArea.trim() || "N/A",
        parking: homeParking.trim() || "N/A",
      };
    } else if (category === "car") {
      features = {
        year: parseInt(carYear, 10) || 2024,
        fuel: carFuel.trim() || "N/A",
        transmission: carTransmission,
        mileage: carMileage.trim() || "N/A",
      };
    } else {
      features = {
        size: groundSize.trim() || "N/A",
        zoning: groundZoning.trim() || "N/A",
        roadAccess: groundRoad.trim() || "N/A",
        waterConnection: groundWater.trim() || "N/A",
      };
    }

    onSubmit({
      title: title.trim(),
      category,
      type,
      price: parseFloat(price),
      location: location.trim(),
      image,
      description: description.trim(),
      features,
      contactName: brokerName.trim(),
      contactPhone: brokerPhone.trim(),
    });
  }

  return (
    <Modal onClose={onClose} title="Create New Listing" maxWidth="max-w-[550px]">
      <form onSubmit={handleSubmit} className="flex flex-1 flex-col overflow-hidden">
        <div className="grid flex-1 grid-cols-2 gap-4 overflow-y-auto p-6">
          <div className="col-span-2 flex flex-col gap-1.5">
            <label htmlFor="titleInput" className={labelClass}>
              Listing Title *
            </label>
            <input
              id="titleInput"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Luxury Suburban Family Home"
              className={fieldClass}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="categorySelect" className={labelClass}>
              Category *
            </label>
            <select
              id="categorySelect"
              required
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className={fieldClass}
            >
              <option value="home">Home / Property</option>
              <option value="car">Car / Vehicle</option>
              <option value="ground">Ground / Land Plot</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="typeSelect" className={labelClass}>
              Offer Type *
            </label>
            <select
              id="typeSelect"
              required
              value={type}
              onChange={(e) => setType(e.target.value as OfferType)}
              className={fieldClass}
            >
              <option value="sale">For Sale</option>
              <option value="rent">For Rent</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="priceInput" className={labelClass}>
              Price ($) *
            </label>
            <input
              id="priceInput"
              type="number"
              min={1}
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="e.g., 250000 or 1500"
              className={fieldClass}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="locationInput" className={labelClass}>
              Location *
            </label>
            <input
              id="locationInput"
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., Beverly Hills, CA or Seattle, WA"
              className={fieldClass}
            />
          </div>

          <div className="col-span-2 flex flex-col gap-1.5">
            <label htmlFor="imageSelect" className={labelClass}>
              Select Sample Image (Or input custom URL)
            </label>
            <select
              id="imageSelect"
              value={imageSelect}
              onChange={(e) => setImageSelect(e.target.value)}
              className={fieldClass}
            >
              {SAMPLE_IMAGES.map((img) => (
                <option key={img.value} value={img.value}>
                  {img.label}
                </option>
              ))}
              <option value="custom">Custom Image Link...</option>
            </select>
          </div>

          {imageSelect === "custom" && (
            <div className="col-span-2 flex flex-col gap-1.5">
              <label htmlFor="customImageUrlInput" className={labelClass}>
                Custom Image Web Address (URL)
              </label>
              <input
                id="customImageUrlInput"
                type="url"
                required
                value={customImageUrl}
                onChange={(e) => setCustomImageUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className={fieldClass}
              />
            </div>
          )}

          <div className="col-span-2">
            <h4 className="mt-2 border-b border-slate-200 pb-1.5 text-[0.8125rem] font-bold uppercase text-indigo-600">
              Specifications &amp; Details
            </h4>
          </div>

          {category === "home" && (
            <div className="col-span-2 grid grid-cols-2 gap-3 rounded-lg border border-dashed border-slate-200 bg-slate-50 p-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="homeBeds" className={labelClass}>
                  Bedrooms
                </label>
                <input
                  id="homeBeds"
                  type="number"
                  min={0}
                  value={homeBeds}
                  onChange={(e) => setHomeBeds(e.target.value)}
                  className={fieldClass}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="homeBaths" className={labelClass}>
                  Bathrooms
                </label>
                <input
                  id="homeBaths"
                  type="number"
                  min={0}
                  step={0.5}
                  value={homeBaths}
                  onChange={(e) => setHomeBaths(e.target.value)}
                  className={fieldClass}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="homeArea" className={labelClass}>
                  Area (sqft)
                </label>
                <input
                  id="homeArea"
                  type="text"
                  value={homeArea}
                  onChange={(e) => setHomeArea(e.target.value)}
                  placeholder="e.g. 2,400 sqft"
                  className={fieldClass}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="homeParking" className={labelClass}>
                  Parking
                </label>
                <input
                  id="homeParking"
                  type="text"
                  value={homeParking}
                  onChange={(e) => setHomeParking(e.target.value)}
                  placeholder="e.g. 2 Car Garage"
                  className={fieldClass}
                />
              </div>
            </div>
          )}

          {category === "car" && (
            <div className="col-span-2 grid grid-cols-2 gap-3 rounded-lg border border-dashed border-slate-200 bg-slate-50 p-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="carYear" className={labelClass}>
                  Model Year
                </label>
                <input
                  id="carYear"
                  type="number"
                  min={1900}
                  max={2027}
                  value={carYear}
                  onChange={(e) => setCarYear(e.target.value)}
                  className={fieldClass}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="carFuel" className={labelClass}>
                  Fuel Type
                </label>
                <input
                  id="carFuel"
                  type="text"
                  value={carFuel}
                  onChange={(e) => setCarFuel(e.target.value)}
                  placeholder="e.g. Electric, Petrol, Hybrid"
                  className={fieldClass}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="carTransmission" className={labelClass}>
                  Transmission
                </label>
                <select
                  id="carTransmission"
                  value={carTransmission}
                  onChange={(e) => setCarTransmission(e.target.value)}
                  className={fieldClass}
                >
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="carMileage" className={labelClass}>
                  Mileage / Odometor
                </label>
                <input
                  id="carMileage"
                  type="text"
                  value={carMileage}
                  onChange={(e) => setCarMileage(e.target.value)}
                  placeholder="e.g. 15,000 miles"
                  className={fieldClass}
                />
              </div>
            </div>
          )}

          {category === "ground" && (
            <div className="col-span-2 grid grid-cols-2 gap-3 rounded-lg border border-dashed border-slate-200 bg-slate-50 p-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="groundSize" className={labelClass}>
                  Total Size
                </label>
                <input
                  id="groundSize"
                  type="text"
                  value={groundSize}
                  onChange={(e) => setGroundSize(e.target.value)}
                  placeholder="e.g. 1.5 Acres or 5,000 sqft"
                  className={fieldClass}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="groundZoning" className={labelClass}>
                  Zoning Category
                </label>
                <input
                  id="groundZoning"
                  type="text"
                  value={groundZoning}
                  onChange={(e) => setGroundZoning(e.target.value)}
                  placeholder="e.g. Residential, Commercial"
                  className={fieldClass}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="groundRoad" className={labelClass}>
                  Road Access
                </label>
                <input
                  id="groundRoad"
                  type="text"
                  value={groundRoad}
                  onChange={(e) => setGroundRoad(e.target.value)}
                  placeholder="e.g. Paved Road, Dirt Road"
                  className={fieldClass}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="groundWater" className={labelClass}>
                  Water Connection
                </label>
                <input
                  id="groundWater"
                  type="text"
                  value={groundWater}
                  onChange={(e) => setGroundWater(e.target.value)}
                  placeholder="e.g. Available, Well Needed"
                  className={fieldClass}
                />
              </div>
            </div>
          )}

          <div className="col-span-2 flex flex-col gap-1.5">
            <label htmlFor="descInput" className={labelClass}>
              Description
            </label>
            <textarea
              id="descInput"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide listing details, unique features, rules, utilities..."
              className={fieldClass}
            />
          </div>

          <div className="col-span-2">
            <h4 className="mt-2 border-b border-slate-200 pb-1.5 text-[0.8125rem] font-bold uppercase text-indigo-600">
              Broker Contact Info
            </h4>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="brokerNameInput" className={labelClass}>
              Contact Agent Name *
            </label>
            <input
              id="brokerNameInput"
              type="text"
              required
              value={brokerName}
              onChange={(e) => setBrokerName(e.target.value)}
              className={fieldClass}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="brokerPhoneInput" className={labelClass}>
              Agent Phone Number *
            </label>
            <input
              id="brokerPhoneInput"
              type="text"
              required
              value={brokerPhone}
              onChange={(e) => setBrokerPhone(e.target.value)}
              className={fieldClass}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 bg-transparent px-4 py-2.5 text-sm font-semibold text-slate-900 transition-colors hover:border-slate-300 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
          >
            Publish Listing
          </button>
        </div>
      </form>
    </Modal>
  );
}
