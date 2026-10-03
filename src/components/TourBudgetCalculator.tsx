import React, { useState, useMemo } from "react";
import { 
  Calculator, 
  Car, 
  Building2, 
  Utensils, 
  Ticket, 
  ShoppingBag, 
  ShieldAlert, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Users, 
  Calendar, 
  ArrowRight,
  ArrowLeftRight
} from "lucide-react";
import { TourBudgetItem, BookingRecord } from "../types";
import { USD_TO_BDT_RATE, formatDualPrice, usdToBdt, bdtToUsd } from "../utils/currency";

interface TourBudgetCalculatorProps {
  onSaveBudget?: (booking: Omit<BookingRecord, "id" | "userId">) => void;
  onNavigate?: (page: string) => void;
}

const PRESETS = [
  {
    id: "preset-bandarban",
    name: "🇧🇩 3-Day Bandarban (Nafakhum & Debotakhum Gorge)",
    destination: "Bandarban (Thanchi, Remakri & Rowangchhari)",
    durationDays: 3,
    travelersCount: 6,
    items: [
      { id: "b1", category: "transport" as const, title: "Chander Gari (Dhaka/Ctg to Thanchi & Nilgiri)", amountInBDT: 13500, notes: "Includes fuel and steep mountain convoy" },
      { id: "b2", category: "transport" as const, title: "Sangu River Engine Boats to Remakri & Bamboo Rafting at Debotakhum", amountInBDT: 7200, notes: "Boat fares + Debotakhum bamboo raft fee" },
      { id: "b3", category: "hotel" as const, title: "Thanchi Basecamp & Remakri Indigenous Cottage (2 Nights)", amountInBDT: 6000, notes: "৳1,500/room x 2 rooms x 2 nights" },
      { id: "b4", category: "food" as const, title: "Traditional Bamboo Chicken, Sangu River Fish & Meals (6 Pax)", amountInBDT: 11000, notes: "3 Days x 6 Persons" },
      { id: "b5", category: "sightseeing" as const, title: "Nafakhum Registered Hill Guide & Army Checkpost Permits", amountInBDT: 4500, notes: "Required local indigenous guides" },
      { id: "b6", category: "shopping" as const, title: "Marma & Bawm Handloom Shawls & Hill Fruits", amountInBDT: 3000, notes: "Local souvenirs" },
      { id: "b7", category: "emergency" as const, title: "First Aid Kit, Rain Gear & Emergency Buffer", amountInBDT: 2500, notes: "Contingency reserve" }
    ]
  },
  {
    id: "preset-sajek",
    name: "🇧🇩 3-Day Sajek Valley Chander Gari Tour",
    destination: "Sajek Valley & Kanglak Peak",
    durationDays: 3,
    travelersCount: 6,
    items: [
      { id: "s1", category: "transport" as const, title: "Chander Gari 3-Day Reserved Jeep & Driver (Khagrachhari Escort)", amountInBDT: 12500, notes: "Includes Dighinala military convoy & fuel" },
      { id: "s2", category: "transport" as const, title: "Dhaka to Khagrachhari Roundtrip AC Bus (6 Pax)", amountInBDT: 15600, notes: "৳1,300 x 2 x 6 pax" },
      { id: "s3", category: "hotel" as const, title: "Meghpunji & Runmoy Wooden Cottages (2 Nights, 2 Rooms)", amountInBDT: 18000, notes: "Cloud-view cliffside verandas" },
      { id: "s4", category: "food" as const, title: "Traditional Bamboo Chicken, Hill Rice & Meals", amountInBDT: 10800, notes: "3 Days x 6 Persons" },
      { id: "s5", category: "sightseeing" as const, title: "Kanglak Peak, Helipad & Tribal Guide Permits", amountInBDT: 2500, notes: "Entry fees and local guide" },
      { id: "s6", category: "shopping" as const, title: "Tribal Handloom Scarves & Sajek Wild Honey", amountInBDT: 3500, notes: "Local souvenirs" },
      { id: "s7", category: "emergency" as const, title: "Tolls, Forest Buffer & Medical Contingency", amountInBDT: 2500, notes: "Contingency reserve" }
    ]
  },
  {
    id: "preset-tanguar",
    name: "🇧🇩 2-Day Tanguar Haor Luxury Houseboat Safari",
    destination: "Tanguar Haor, Niladri Lake & Shimul Bagan",
    durationDays: 2,
    travelersCount: 4,
    items: [
      { id: "t1", category: "transport" as const, title: "Dhaka to Sunamganj Roundtrip AC Bus / Reserved Car", amountInBDT: 11200, notes: "4 Pax roundtrip" },
      { id: "t2", category: "hotel" as const, title: "Luxury Attached-AC Wooden Houseboat Charter (2 Days / 1 Night)", amountInBDT: 26000, notes: "Includes private chef and all meals" },
      { id: "t3", category: "food" as const, title: "Fresh Haor Fish, Duck Curry & Traditional Snacks (Included)", amountInBDT: 4000, notes: "Extra barbecue and beverage treats" },
      { id: "t4", category: "sightseeing" as const, title: "Niladri Lake Boat Ride, Barek Tila Bike Transfer & Shimul Bagan Entry", amountInBDT: 2800, notes: "Local boat & bike rentals" },
      { id: "t5", category: "shopping" as const, title: "Local Sunamganj Pickles & Manipuri Handlooms", amountInBDT: 2500, notes: "Souvenirs" },
      { id: "t6", category: "emergency" as const, title: "Haor Safety Life Jackets & Contingency Reserve", amountInBDT: 2000, notes: "Contingency" }
    ]
  },
  {
    id: "preset-cox",
    name: "🇧🇩 4-Day Cox's Bazar & Saint Martin's Cruise",
    destination: "Cox's Bazar, Marine Drive & Saint Martin's",
    durationDays: 4,
    travelersCount: 4,
    items: [
      { id: "c1", category: "transport" as const, title: "MV Bay One Luxury Ocean Cruiser Roundtrip Passes", amountInBDT: 22000, notes: "4 Pax Open Sun-Deck" },
      { id: "c2", category: "transport" as const, title: "Marine Drive Open Chander Gari Rental (Full Day)", amountInBDT: 5000, notes: "Inani & Himchari drive" },
      { id: "c3", category: "hotel" as const, title: "Sayeman Beach Resort & Island Coral Cottage (3 Nights)", amountInBDT: 28000, notes: "3 Nights (2 Rooms)" },
      { id: "c4", category: "food" as const, title: "Fresh Rupchanda Fry, Live Lobster BBQ & Kacchi Dinners", amountInBDT: 14000, notes: "4 Days dining" },
      { id: "c5", category: "sightseeing" as const, title: "Chera Dwip Speedboat, Surfing & Marine Entry", amountInBDT: 4200, notes: "Activity passes" },
      { id: "c6", category: "shopping" as const, title: "Dry Fish (Shutki) & Burmese Market Specialties", amountInBDT: 5000, notes: "Souvenirs" },
      { id: "c7", category: "emergency" as const, title: "Emergency & Travel Contingency Buffer", amountInBDT: 3000, notes: "Contingency" }
    ]
  },
  {
    id: "preset-meghalaya",
    name: "🇮🇳 4-Day Meghalaya (Dawki, Cherrapunji & Root Bridges)",
    destination: "Dawki, Cherrapunji (Sohra) & Shillong",
    durationDays: 4,
    travelersCount: 4,
    items: [
      { id: "m1", category: "transport" as const, title: "Private SUV Charter (Tamabil Border to Shillong & Sohra)", amountInBDT: 28000, notes: "4 Days dedicated vehicle" },
      { id: "m2", category: "hotel" as const, title: "Cherrapunji Canyon Motel & Shillong Homestay (3 Nights)", amountInBDT: 22000, notes: "2 Rooms x 3 Nights" },
      { id: "m3", category: "food" as const, title: "Khasi Jadoh, Bamboo Shoot Curries & Continental Meals", amountInBDT: 12000, notes: "4 Days dining for 4 guests" },
      { id: "m4", category: "sightseeing" as const, title: "Dawki Umngot Transparent Boating, Root Bridge Guide & Waterfalls", amountInBDT: 6500, notes: "Guide fees and boat passes" },
      { id: "m5", category: "shopping" as const, title: "Cherrapunji Honey, Meghalaya Spices & Khasi Handloom", amountInBDT: 4500, notes: "Local products" },
      { id: "m6", category: "emergency" as const, title: "Border Taxes, Travel Buffer & Emergency Reserve", amountInBDT: 4000, notes: "Contingency" }
    ]
  },
  {
    id: "preset-darjeeling",
    name: "🇮🇳 5-Day Darjeeling & Sikkim Himalayan Odyssey",
    destination: "Darjeeling, Tiger Hill & Gangtok (Sikkim)",
    durationDays: 5,
    travelersCount: 2,
    items: [
      { id: "d1", category: "transport" as const, title: "Dedicated Mountain SUV (Bagdogra → Darjeeling → Gangtok)", amountInBDT: 24000, notes: "Himalayan hill passes" },
      { id: "d2", category: "transport" as const, title: "UNESCO Himalayan Heritage Toy Train Joyride", amountInBDT: 3600, notes: "2 Steam locomotive tickets" },
      { id: "d3", category: "hotel" as const, title: "Heritage Tea Estate Manor & Gangtok Boutique Stay (4 Nights)", amountInBDT: 26000, notes: "Kanchenjunga view rooms" },
      { id: "d4", category: "food" as const, title: "Darjeeling Momos, Glenary's Bakery, Thukpa & First Flush Tea", amountInBDT: 9500, notes: "5 Days dining" },
      { id: "d5", category: "sightseeing" as const, title: "Tiger Hill Sunrise, Tsomgo Lake High-Altitude Permits & Monasteries", amountInBDT: 5800, notes: "Protected Area Permits" },
      { id: "d6", category: "shopping" as const, title: "Authentic Darjeeling Muscatel Tea & Tibetan Handicrafts", amountInBDT: 6000, notes: "Souvenirs" },
      { id: "d7", category: "emergency" as const, title: "High-Altitude Medical Kit & Travel Contingency", amountInBDT: 4000, notes: "Contingency" }
    ]
  }
];

const CATEGORY_META = {
  transport: { label: "Transport & Chander Gari", icon: Car, color: "text-amber-700 bg-amber-50 border-amber-200", barColor: "bg-amber-600" },
  hotel: { label: "Hotels, Motels & Cottages", icon: Building2, color: "text-emerald-700 bg-emerald-50 border-emerald-200", barColor: "bg-emerald-600" },
  food: { label: "Food & Regional Dining", icon: Utensils, color: "text-rose-700 bg-rose-50 border-rose-200", barColor: "bg-rose-600" },
  sightseeing: { label: "Sightseeing, Boats & Permits", icon: Ticket, color: "text-indigo-700 bg-indigo-50 border-indigo-200", barColor: "bg-indigo-600" },
  shopping: { label: "Shopping & Souvenirs", icon: ShoppingBag, color: "text-purple-700 bg-purple-200 border-purple-200", barColor: "bg-purple-600" },
  emergency: { label: "Buffer & Emergency", icon: ShieldAlert, color: "text-slate-700 bg-slate-50 border-slate-200", barColor: "bg-slate-600" }
};

export const TourBudgetCalculator: React.FC<TourBudgetCalculatorProps> = ({ onSaveBudget }) => {
  const [currency, setCurrency] = useState<"BDT" | "USD">("BDT");
  const [tripTitle, setTripTitle] = useState("Bandarban (Nafakhum & Debotakhum) Expedition");
  const [destination, setDestination] = useState("Bandarban, Bangladesh");
  const [durationDays, setDurationDays] = useState<number>(3);
  const [travelersCount, setTravelersCount] = useState<number>(6);

  // Store items with amount normalized in current display currency
  const [items, setItems] = useState<TourBudgetItem[]>(() => {
    return PRESETS[0].items.map(item => ({
      id: item.id,
      category: item.category,
      title: item.title,
      amount: item.amountInBDT,
      notes: item.notes
    }));
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  // New Item Input State
  const [newCategory, setNewCategory] = useState<TourBudgetItem["category"]>("transport");
  const [newTitle, setNewTitle] = useState("");
  const [newAmount, setNewAmount] = useState<string>("");
  const [newNotes, setNewNotes] = useState("");

  // Handle Currency Switching with exact conversion math (122.02)
  const handleCurrencyChange = (newCurr: "BDT" | "USD") => {
    if (newCurr === currency) return;

    if (newCurr === "USD") {
      // Converting BDT -> USD
      setItems(prev => prev.map(item => ({
        ...item,
        amount: Math.round((item.amount / USD_TO_BDT_RATE) * 100) / 100
      })));
    } else {
      // Converting USD -> BDT
      setItems(prev => prev.map(item => ({
        ...item,
        amount: Math.round(item.amount * USD_TO_BDT_RATE)
      })));
    }
    setCurrency(newCurr);
  };

  // Load a Preset
  const handleLoadPreset = (preset: typeof PRESETS[0]) => {
    setTripTitle(preset.name.replace(/^[^\s]+\s/, ""));
    setDestination(preset.destination);
    setDurationDays(preset.durationDays);
    setTravelersCount(preset.travelersCount);
    
    // Load amounts matching currently selected currency
    const convertedItems: TourBudgetItem[] = preset.items.map(item => ({
      id: item.id,
      category: item.category,
      title: item.title,
      amount: currency === "BDT" ? item.amountInBDT : Math.round((item.amountInBDT / USD_TO_BDT_RATE) * 100) / 100,
      notes: item.notes
    }));

    setItems(convertedItems);
    setSavedSuccess(false);
  };

  // Add Item
  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmount = parseFloat(newAmount);
    if (!newTitle.trim() || isNaN(parsedAmount) || parsedAmount <= 0) return;

    const newItem: TourBudgetItem = {
      id: "item_" + Date.now(),
      category: newCategory,
      title: newTitle.trim(),
      amount: parsedAmount,
      notes: newNotes.trim() || undefined
    };

    setItems((prev) => [...prev, newItem]);
    setNewTitle("");
    setNewAmount("");
    setNewNotes("");
  };

  // Remove Item
  const handleRemoveItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Totals and category breakdown
  const { totalCost, categoryTotals, categoryPercentages } = useMemo(() => {
    const total = items.reduce((sum, item) => sum + item.amount, 0);
    const catMap: Record<TourBudgetItem["category"], number> = {
      transport: 0,
      hotel: 0,
      food: 0,
      sightseeing: 0,
      shopping: 0,
      emergency: 0
    };

    items.forEach((item) => {
      catMap[item.category] = (catMap[item.category] || 0) + item.amount;
    });

    const percentages: Record<TourBudgetItem["category"], number> = {
      transport: total > 0 ? (catMap.transport / total) * 100 : 0,
      hotel: total > 0 ? (catMap.hotel / total) * 100 : 0,
      food: total > 0 ? (catMap.food / total) * 100 : 0,
      sightseeing: total > 0 ? (catMap.sightseeing / total) * 100 : 0,
      shopping: total > 0 ? (catMap.shopping / total) * 100 : 0,
      emergency: total > 0 ? (catMap.emergency / total) * 100 : 0
    };

    return { totalCost: total, categoryTotals: catMap, categoryPercentages: percentages };
  }, [items]);

  const costPerPerson = travelersCount > 0 ? totalCost / travelersCount : totalCost;
  const costPerDay = durationDays > 0 ? totalCost / durationDays : totalCost;

  // Dual format for total
  const dualTotal = formatDualPrice(totalCost, currency, currency);
  const dualPerPerson = formatDualPrice(costPerPerson, currency, currency);
  const dualPerDay = formatDualPrice(costPerDay, currency, currency);

  const handleSaveToTrips = () => {
    if (onSaveBudget) {
      const bdtValue = currency === "BDT" ? totalCost : usdToBdt(totalCost);
      onSaveBudget({
        type: "budget",
        title: `Tour Budget: ${tripTitle}`,
        price: Math.round(bdtValue),
        details: `${destination} • ${durationDays} Days • ${travelersCount} Travelers • Total: ${dualTotal.full}`,
        bookedAt: new Date().toISOString()
      });
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 4000);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#191d18]">
          Tour Budget Calculator
        </h1>
      </div>

      {/* Preset Pickers */}
      <div className="bg-white border border-[#c4c8be]/40 rounded-2xl p-4 sm:p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-[#747870]">Click to load tour budget breakdowns</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handleLoadPreset(preset)}
              className="text-left p-3 rounded-xl border border-[#c4c8be]/30 hover:border-[#384b32] bg-[#f9faf7] hover:bg-[#f2f5ed] transition-all text-xs space-y-1 cursor-pointer"
            >
              <div className="font-medium text-[#191d18] truncate">{preset.name}</div>
              <div className="text-[#747870] text-[11px]">
                {preset.durationDays} Days • {preset.travelersCount} Pax • {preset.destination}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Configuration Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Trip Parameters */}
        <div className="bg-white border border-[#c4c8be]/40 rounded-2xl p-5 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-[#c4c8be]/30 pb-3">
            <h2 className="font-serif text-lg font-medium text-[#191d18]">
              Trip Parameters
            </h2>
            <div className="text-[11px] text-[#747870] flex items-center gap-1 font-medium bg-[#f2f5ed] px-2 py-0.5 rounded-md border border-[#c4c8be]/40">
              <ArrowLeftRight className="w-3 h-3 text-[#384b32]" />
              <span>$1 = ৳{USD_TO_BDT_RATE}</span>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-[#555a50] font-medium mb-1">Tour Title</label>
              <input
                type="text"
                value={tripTitle}
                onChange={(e) => setTripTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[#c4c8be]/60 bg-[#f9faf7] focus:outline-none focus:border-[#384b32]"
                placeholder="e.g. Bandarban Nafakhum Expedition"
              />
            </div>

            <div>
              <label className="block text-[#555a50] font-medium mb-1">Destination & Circuit</label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[#c4c8be]/60 bg-[#f9faf7] focus:outline-none focus:border-[#384b32]"
                placeholder="e.g. Thanchi, Remakri & Rowangchhari"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[#555a50] font-medium mb-1 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#384b32]" />
                  <span>Duration (Days)</span>
                </label>
                <input
                  type="number"
                  min="1"
                  max="60"
                  value={durationDays}
                  onChange={(e) => setDurationDays(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full px-3 py-2 rounded-lg border border-[#c4c8be]/60 bg-[#f9faf7] focus:outline-none focus:border-[#384b32]"
                />
              </div>

              <div>
                <label className="text-[#555a50] font-medium mb-1 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-[#384b32]" />
                  <span>Travelers (Pax)</span>
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={travelersCount}
                  onChange={(e) => setTravelersCount(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full px-3 py-2 rounded-lg border border-[#c4c8be]/60 bg-[#f9faf7] focus:outline-none focus:border-[#384b32]"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-[#555a50] font-medium">Active Currency</label>
                <span className="text-[10px] text-[#384b32] font-semibold">Live Converted at 122.02</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleCurrencyChange("BDT")}
                  className={`py-2 px-3 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                    currency === "BDT"
                      ? "bg-[#384b32] text-white border-[#384b32] shadow-sm"
                      : "bg-[#f9faf7] text-[#555a50] border-[#c4c8be]/60 hover:bg-[#ecefe7]"
                  }`}
                >
                  🇧🇩 BDT (৳ Taka)
                </button>
                <button
                  type="button"
                  onClick={() => handleCurrencyChange("USD")}
                  className={`py-2 px-3 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                    currency === "USD"
                      ? "bg-[#384b32] text-white border-[#384b32] shadow-sm"
                      : "bg-[#f9faf7] text-[#555a50] border-[#c4c8be]/60 hover:bg-[#ecefe7]"
                  }`}
                >
                  💵 USD ($ Dollar)
                </button>
              </div>
            </div>
          </div>

          {/* Quick Summary Numbers with DUAL CURRENCY */}
          <div className="p-4 bg-[#f2f5ed] border border-[#384b32]/10 rounded-xl space-y-3">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#747870] font-semibold">
                Total Tour Budget
              </span>
              <div className="font-serif text-2xl sm:text-3xl font-bold text-[#191d18]">
                {dualTotal.primary}
              </div>
              <div className="text-xs text-[#384b32] font-semibold">
                Converted: {dualTotal.secondary}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#c4c8be]/30 text-xs">
              <div>
                <span className="text-[#747870] block text-[10px] uppercase">Per Person</span>
                <span className="font-semibold text-[#191d18] block">
                  {dualPerPerson.primary}
                </span>
                <span className="text-[10px] text-[#747870]">
                  {dualPerPerson.secondary}
                </span>
              </div>
              <div>
                <span className="text-[#747870] block text-[10px] uppercase">Per Day</span>
                <span className="font-semibold text-[#191d18] block">
                  {dualPerDay.primary}
                </span>
                <span className="text-[10px] text-[#747870]">
                  {dualPerDay.secondary}
                </span>
              </div>
            </div>
          </div>

          {/* Save / Export Buttons */}
          <div className="space-y-2 pt-2">
            <button
              onClick={handleSaveToTrips}
              className="w-full bg-[#384b32] text-white font-sans text-xs uppercase tracking-wider font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Save Budget to My Trips</span>
            </button>

            {savedSuccess && (
              <div className="p-2.5 bg-emerald-100 text-emerald-800 text-xs rounded-lg font-medium text-center animate-in fade-in">
                ✓ Budget successfully saved to your trips!
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Visual Stage Breakdown & Items List */}
        <div className="lg:col-span-2 space-y-6">
          {/* Visual Percentage Progress Bar */}
          <div className="bg-white border border-[#c4c8be]/40 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-lg font-medium text-[#191d18]">
                Where is Your Budget Spent?
              </h2>
              <span className="text-xs text-[#747870]">{items.length} Tracked Line Items</span>
            </div>

            {/* Multi-segment bar */}
            <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden flex">
              {(Object.keys(CATEGORY_META) as Array<TourBudgetItem["category"]>).map((cat) => {
                const pct = categoryPercentages[cat] || 0;
                if (pct <= 0) return null;
                const dual = formatDualPrice(categoryTotals[cat], currency, currency);
                return (
                  <div
                    key={cat}
                    style={{ width: `${pct}%` }}
                    className={`${CATEGORY_META[cat].barColor} h-full transition-all duration-300 relative group cursor-pointer`}
                    title={`${CATEGORY_META[cat].label}: ${pct.toFixed(1)}% (${dual.full})`}
                  />
                );
              })}
            </div>

            {/* Category Stats Grid with DUAL PRICES */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              {(Object.keys(CATEGORY_META) as Array<TourBudgetItem["category"]>).map((cat) => {
                const meta = CATEGORY_META[cat];
                const Icon = meta.icon;
                const amt = categoryTotals[cat];
                const pct = categoryPercentages[cat];
                const dual = formatDualPrice(amt, currency, currency);

                return (
                  <div
                    key={cat}
                    className={`p-3 rounded-xl border ${meta.color} flex flex-col justify-between space-y-1`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold">{meta.label}</span>
                      <Icon className="w-3.5 h-3.5 opacity-80" />
                    </div>
                    <div>
                      <div className="font-serif text-base font-bold">
                        {dual.primary}
                      </div>
                      <div className="text-[10px] font-medium opacity-85">
                        {dual.secondary} • {pct.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Add New Expense Form */}
          <div className="bg-white border border-[#c4c8be]/40 rounded-2xl p-5 shadow-sm space-y-4">
            <h2 className="font-serif text-base font-medium text-[#191d18]">
              Add Tour Expense Item
            </h2>

            <form onSubmit={handleAddItem} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="block text-[#555a50] font-medium mb-1">Tour Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-[#c4c8be]/60 bg-[#f9faf7] focus:outline-none focus:border-[#384b32]"
                  >
                    <option value="transport">🚗 Transport & Chander Gari</option>
                    <option value="hotel">🏨 Hotels, Motels & Cottages</option>
                    <option value="food">🍛 Food & Dining</option>
                    <option value="sightseeing">🎟️ Sightseeing, Boats & Permits</option>
                    <option value="shopping">🛍️ Shopping & Souvenirs</option>
                    <option value="emergency">🛡️ Buffer & Emergency</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#555a50] font-medium mb-1">Item Title</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Chander Gari Mountain Rover"
                    className="w-full px-3 py-2 rounded-lg border border-[#c4c8be]/60 bg-[#f9faf7] focus:outline-none focus:border-[#384b32]"
                  />
                </div>

                <div>
                  <label className="block text-[#555a50] font-medium mb-1">
                    Amount ({currency === "BDT" ? "৳ BDT" : "$ USD"})
                  </label>
                  <input
                    type="number"
                    required
                    min="0.1"
                    step="any"
                    value={newAmount}
                    onChange={(e) => setNewAmount(e.target.value)}
                    placeholder={currency === "BDT" ? "e.g. 12500" : "e.g. 102.44"}
                    className="w-full px-3 py-2 rounded-lg border border-[#c4c8be]/60 bg-[#f9faf7] focus:outline-none focus:border-[#384b32]"
                  />
                </div>
              </div>

              <div className="flex gap-3 items-center">
                <input
                  type="text"
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="Optional details / notes (e.g. 3 days reserve, includes fuel and tolls)"
                  className="flex-1 px-3 py-2 rounded-lg border border-[#c4c8be]/60 bg-[#f9faf7] text-xs focus:outline-none focus:border-[#384b32]"
                />
                <button
                  type="submit"
                  className="bg-[#384b32] text-white px-4 py-2 rounded-lg font-sans text-xs uppercase tracking-wider font-semibold hover:opacity-90 transition-opacity flex items-center gap-1.5 shrink-0 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Line</span>
                </button>
              </div>
            </form>
          </div>

          {/* Detailed Item List with DUAL PRICES */}
          <div className="bg-white border border-[#c4c8be]/40 rounded-2xl overflow-hidden shadow-sm">
            <div className="p-4 border-b border-[#c4c8be]/30 flex items-center justify-between bg-[#f9faf7]">
              <span className="font-serif text-base font-medium text-[#191d18]">
                Itemized Expenses Breakdown (Showing BDT & USD at 122.02)
              </span>
              <button
                onClick={() => setItems([])}
                className="text-xs text-rose-700 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3 h-3" />
                <span>Clear All</span>
              </button>
            </div>

            {items.length === 0 ? (
              <div className="p-8 text-center text-[#747870] text-sm">
                No expense items yet. Add items above or pick an expedition preset!
              </div>
            ) : (
              <div className="divide-y divide-[#c4c8be]/20">
                {items.map((item) => {
                  const meta = CATEGORY_META[item.category];
                  const Icon = meta.icon;
                  const dual = formatDualPrice(item.amount, currency, currency);

                  return (
                    <div
                      key={item.id}
                      className="p-3.5 sm:p-4 flex items-center justify-between gap-3 hover:bg-[#f9faf7] transition-colors"
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        <div className={`p-2 rounded-lg border ${meta.color} shrink-0`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="font-medium text-xs sm:text-sm text-[#191d18] truncate">
                            {item.title}
                          </div>
                          <div className="text-[11px] text-[#747870] flex items-center gap-2">
                            <span className="font-semibold text-[#384b32]">{meta.label}</span>
                            {item.notes && <span>• {item.notes}</span>}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <div className="text-right">
                          <div className="font-serif text-sm sm:text-base font-bold text-[#191d18]">
                            {dual.primary}
                          </div>
                          <div className="text-[11px] font-semibold text-[#384b32]">
                            {dual.secondary}
                          </div>
                          <div className="text-[10px] text-[#747870]">
                            {totalCost > 0 ? ((item.amount / totalCost) * 100).toFixed(1) : 0}% of tour
                          </div>
                        </div>

                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="p-1.5 rounded-lg text-[#747870] hover:text-rose-700 hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Delete line item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
