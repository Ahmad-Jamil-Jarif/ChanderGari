import React, { useState } from "react";
import { 
  Compass, 
  Trash2, 
  Car, 
  Plane, 
  Ship, 
  Building2, 
  Calculator, 
  Calendar, 
  DollarSign, 
  ArrowRight,
  Sparkles,
  MapPin
} from "lucide-react";
import { BookingRecord } from "../types";
import { formatDualPrice } from "../utils/currency";

interface SavedTripsPageProps {
  bookings: BookingRecord[];
  onDeleteBooking: (id: string) => void;
  onNavigate: (page: string) => void;
}

export const SavedTripsPage: React.FC<SavedTripsPageProps> = ({
  bookings,
  onDeleteBooking,
  onNavigate,
}) => {
  const [filterType, setFilterType] = useState<string>("all");

  const filteredBookings = bookings.filter((b) => {
    if (filterType === "all") return true;
    return b.type === filterType;
  });

  const totalValueBDT = bookings.reduce((sum, b) => sum + (b.price || 0), 0);
  const totalDual = formatDualPrice(totalValueBDT, "BDT", "BDT");

  const getIcon = (type: BookingRecord["type"]) => {
    switch (type) {
      case "flight":
        return Plane;
      case "road":
        return Car;
      case "sea":
        return Ship;
      case "hotel":
        return Building2;
      case "budget":
        return Calculator;
      default:
        return Compass;
    }
  };

  const getBadgeColor = (type: BookingRecord["type"]) => {
    switch (type) {
      case "flight":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "road":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "sea":
        return "bg-cyan-100 text-cyan-800 border-cyan-200";
      case "hotel":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "budget":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-stone-100 text-stone-800 border-stone-200";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-[#c4c8be]/40 pb-6">
        <div className="space-y-2">
          <h1 className="font-serif text-3xl sm:text-4xl font-medium text-[#191d18]">
            My Trips & Saved Plans
          </h1>
        </div>

        {/* Total Summary */}
        <div className="bg-[#f2f5ed] border border-[#384b32]/20 rounded-2xl p-4 sm:px-6 text-right shrink-0">
          <span className="text-[10px] text-[#747870] uppercase font-semibold block">
            Total Logged Bookings
          </span>
          <div className="font-serif text-2xl font-bold text-[#191d18]">
            {totalDual.primary}
          </div>
          <span className="text-[11px] text-[#384b32] font-semibold block">
            ({totalDual.secondary}) • {bookings.length} Records
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: "all", label: "All Items" },
          { id: "road", label: "🚗 Chander Gari & Road" },
          { id: "budget", label: "📊 Tour Budgets" },
          { id: "flight", label: "✈️ Flights" },
          { id: "sea", label: "🚢 Sea Cruises" },
          { id: "hotel", label: "🏨 Hotels" },
          { id: "itinerary", label: "🗺️ Itineraries" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterType(tab.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              filterType === tab.id
                ? "bg-[#384b32] text-white shadow-sm"
                : "bg-white border border-[#c4c8be]/50 text-[#555a50] hover:bg-[#ecefe7]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Bookings List */}
      {filteredBookings.length === 0 ? (
        <div className="bg-white border border-[#c4c8be]/40 rounded-3xl p-12 text-center space-y-4 max-w-lg mx-auto">
          <div className="w-12 h-12 rounded-full bg-[#384b32]/10 text-[#384b32] flex items-center justify-center mx-auto">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-xl font-medium text-[#191d18]">
            No Saved Trips Yet
          </h3>
          <p className="text-xs text-[#555a50] leading-relaxed">
            Reserve a Chander Gari jeep, save a hotel in Sajek or Cox's Bazar, or create a tour budget to build your itinerary.
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={() => onNavigate("destinations")}
              className="bg-[#384b32] text-white px-5 py-2.5 rounded-xl font-sans text-xs uppercase tracking-wider font-semibold hover:opacity-90 transition-opacity cursor-pointer"
            >
              Explore Destinations
            </button>
            <button
              onClick={() => onNavigate("budget")}
              className="bg-[#ecefe7] text-[#191d18] px-5 py-2.5 rounded-xl font-sans text-xs uppercase tracking-wider font-semibold hover:bg-[#e0e4dc] transition-colors cursor-pointer"
            >
              Calculate Budget
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBookings.map((item) => {
            const Icon = getIcon(item.type);
            const badgeClass = getBadgeColor(item.type);
            const dual = formatDualPrice(item.price || 0, "BDT", "BDT");

            return (
              <div
                key={item.id || item.bookedAt}
                className="bg-white border border-[#c4c8be]/40 rounded-2xl p-5 shadow-sm space-y-4 hover:border-[#384b32] transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-semibold border uppercase tracking-wider ${badgeClass}`}>
                      {item.type}
                    </span>

                    <button
                      onClick={() => onDeleteBooking(item.id || item.bookedAt)}
                      className="p-1 text-[#747870] hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      title="Remove from saved trips"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#f2f5ed] border border-[#c4c8be]/30 flex items-center justify-center shrink-0 text-[#384b32]">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-serif text-lg font-medium text-[#191d18] line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#555a50] line-clamp-2 mt-1">
                        {item.details}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#c4c8be]/30 flex items-center justify-between">
                  <div className="text-[10px] text-[#747870]">
                    {new Date(item.bookedAt).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>

                  <div className="text-right">
                    <div className="font-serif text-lg font-bold text-[#191d18]">
                      {dual.primary}
                    </div>
                    <div className="text-[10px] text-[#384b32] font-semibold">
                      ({dual.secondary})
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
