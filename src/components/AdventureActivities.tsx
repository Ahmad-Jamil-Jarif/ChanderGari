import React, { useState } from "react";
import { 
  Compass, 
  Sparkles, 
  Star, 
  MapPin, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  Flame, 
  Calendar, 
  ArrowRight,
  Filter,
  Check
} from "lucide-react";
import { TOUR_ACTIVITIES } from "../data/mockData";
import { TourActivity, BookingRecord } from "../types";
import { formatDualPrice, USD_TO_BDT_RATE } from "../utils/currency";

interface AdventureActivitiesProps {
  onSaveActivity: (booking: Omit<BookingRecord, "id" | "userId">) => void;
  onNavigateToBudget?: () => void;
}

export const AdventureActivities: React.FC<AdventureActivitiesProps> = ({
  onSaveActivity,
  onNavigateToBudget,
}) => {
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [regionFilter, setRegionFilter] = useState<"all" | "bangladesh" | "crossborder">("all");
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const filteredActivities = TOUR_ACTIVITIES.filter((act) => {
    if (regionFilter === "bangladesh" && !act.isDomestic) return false;
    if (regionFilter === "crossborder" && act.isDomestic) return false;
    if (categoryFilter !== "all" && act.category !== categoryFilter) return false;
    return true;
  });

  const handleBook = (act: TourActivity) => {
    const dual = formatDualPrice(act.priceBDT, "BDT", "BDT");
    onSaveActivity({
      type: "activity",
      title: `${act.title} (${act.category.toUpperCase()})`,
      price: act.priceBDT,
      details: `${act.location} • ${act.duration} • Difficulty: ${act.difficulty} • Fee: ${dual.full}`,
      bookedAt: new Date().toISOString(),
    });
    setSuccessMsg(`Reserved Activity: ${act.title}`);
    setTimeout(() => setSuccessMsg(null), 4000);
  };

  const getDifficultyBadge = (diff: TourActivity["difficulty"]) => {
    switch (diff) {
      case "Easy":
        return "bg-emerald-100 text-emerald-800 border-emerald-300";
      case "Moderate":
        return "bg-amber-100 text-amber-800 border-amber-300";
      case "Challenging":
        return "bg-orange-100 text-orange-800 border-orange-300";
      case "Extreme":
        return "bg-rose-100 text-rose-800 border-rose-300";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#c4c8be]/40 pb-6">
        <div className="space-y-2">
          <h1 className="font-serif text-3xl sm:text-4xl font-medium text-[#191d18]">
            Adventure Activities & Sports Guide
          </h1>
        </div>

        {/* Region Filter */}
        <div className="flex bg-[#f2f5ed] p-1 rounded-xl border border-[#c4c8be]/40 shrink-0">
          <button
            onClick={() => setRegionFilter("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              regionFilter === "all" ? "bg-[#384b32] text-white shadow-sm" : "text-[#555a50] hover:text-[#191d18]"
            }`}
          >
            All Circuits
          </button>
          <button
            onClick={() => setRegionFilter("bangladesh")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              regionFilter === "bangladesh" ? "bg-[#384b32] text-white shadow-sm" : "text-[#555a50] hover:text-[#191d18]"
            }`}
          >
            🇧🇩 Bangladesh Domestic
          </button>
          <button
            onClick={() => setRegionFilter("crossborder")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              regionFilter === "crossborder" ? "bg-[#384b32] text-white shadow-sm" : "text-[#555a50] hover:text-[#191d18]"
            }`}
          >
            🇮🇳 Cross-Border
          </button>
        </div>
      </div>

      {/* Booking Notification */}
      {successMsg && (
        <div className="p-4 bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs rounded-2xl font-medium flex items-center justify-between shadow-sm animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            <span>✓ {successMsg} — Added to My Trips!</span>
          </div>
          <button onClick={() => setSuccessMsg(null)} className="text-emerald-800 hover:underline cursor-pointer">
            Dismiss
          </button>
        </div>
      )}

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 text-xs">
        {[
          { id: "all", label: "All Activities" },
          { id: "adventure", label: "🪂 Paragliding, Zipline & Canyon" },
          { id: "camping", label: "🏕️ Cliffside & Lake Camping" },
          { id: "watersports", label: "🤿 Scuba Diving & Snorkeling" },
          { id: "trekking", label: "🥾 Alpine & Summit Treks" },
          { id: "caving", label: "🕳️ Root Bridges & Caving" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setCategoryFilter(tab.id)}
            className={`px-3.5 py-2 rounded-xl font-semibold border transition-all cursor-pointer ${
              categoryFilter === tab.id
                ? "bg-[#384b32] text-white border-[#384b32] shadow-sm"
                : "bg-white text-[#555a50] border-[#c4c8be]/50 hover:bg-[#ecefe7]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Activities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredActivities.map((act) => {
          const dualPrice = formatDualPrice(act.priceBDT, "BDT", "BDT");

          return (
            <div
              key={act.id}
              className="bg-white border border-[#c4c8be]/40 rounded-2xl overflow-hidden shadow-sm hover:border-[#384b32] transition-all flex flex-col justify-between"
            >
              <div className="relative h-56 bg-[#191d18] overflow-hidden">
                <img
                  src={act.imageUrl}
                  alt={act.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-semibold text-white ${
                    act.isDomestic ? "bg-emerald-700" : "bg-blue-700"
                  }`}>
                    {act.isDomestic ? "🇧🇩 Bangladesh" : "🇮🇳 Cross-Border"}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border uppercase tracking-wider ${getDifficultyBadge(act.difficulty)}`}>
                    Difficulty: {act.difficulty}
                  </span>
                </div>

                <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md px-2 py-0.5 rounded text-white text-xs font-bold flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{act.rating} ({act.reviewCount})</span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="text-[11px] text-[#fdcb9b] flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#fdcb9b]" />
                    <span className="truncate">{act.location}</span>
                  </div>
                  <h3 className="font-serif text-lg font-medium leading-snug">{act.title}</h3>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs text-[#555a50] leading-relaxed">
                  {act.description}
                </p>

                {/* Quick Info Matrix */}
                <div className="grid grid-cols-2 gap-2 p-3 bg-[#f2f5ed] rounded-xl border border-[#c4c8be]/30 text-xs">
                  <div>
                    <span className="text-[#747870] block text-[10px] uppercase font-semibold">Duration</span>
                    <span className="font-medium text-[#191d18] flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#384b32]" />
                      <span>{act.duration}</span>
                    </span>
                  </div>
                  <div>
                    <span className="text-[#747870] block text-[10px] uppercase font-semibold">Best Season</span>
                    <span className="font-medium text-[#191d18] flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#384b32]" />
                      <span>{act.bestSeason}</span>
                    </span>
                  </div>
                </div>

                {/* Safety Gear & Inclusions */}
                <div className="space-y-1.5 text-xs">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#384b32] block flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#384b32]" />
                    <span>Certified Safety Gear Included:</span>
                  </span>
                  <div className="grid grid-cols-1 gap-1 text-[11px] text-[#555a50]">
                    {act.safetyGearProvided.slice(0, 3).map((g, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <Check className="w-3 h-3 text-[#384b32] shrink-0" />
                        <span className="truncate">{g}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing & Booking */}
                <div className="pt-3 border-t border-[#c4c8be]/30 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#747870] uppercase block font-semibold">Activity Fee</span>
                    <span className="font-serif text-xl font-bold text-[#191d18]">
                      {dualPrice.primary}
                    </span>
                    <span className="text-[11px] font-semibold text-[#384b32] block">
                      ({dualPrice.secondary}) / person
                    </span>
                  </div>

                  <button
                    onClick={() => handleBook(act)}
                    className="bg-[#384b32] text-white px-4 py-2.5 rounded-xl font-sans text-xs uppercase tracking-wider font-semibold hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
                  >
                    Book Activity
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Callout to Budget Calculator */}
      <div className="bg-[#f2f5ed] border border-[#384b32]/20 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="font-serif text-2xl font-medium text-[#191d18]">
            Plan Activities with Your Total Tour Budget
          </h3>
        </div>

        <button
          onClick={onNavigateToBudget}
          className="bg-[#384b32] text-white px-7 py-3.5 rounded-xl font-sans text-xs uppercase tracking-wider font-semibold hover:opacity-90 transition-opacity flex items-center gap-2 shrink-0 shadow-sm cursor-pointer"
        >
          <span>Calculate Budget</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
