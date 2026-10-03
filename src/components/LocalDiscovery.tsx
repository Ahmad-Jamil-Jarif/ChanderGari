import React, { useState } from "react";
import { 
  Building2, 
  Utensils, 
  Star, 
  MapPin, 
  CheckCircle2, 
  ArrowRight,
  Compass,
  Heart,
  Home,
  BedDouble,
  TreePine,
  Layers,
  Filter,
  Users,
  Maximize2,
  Eye,
  Check,
  X,
  ChevronDown,
  ChevronUp,
  Sparkles
} from "lucide-react";
import { FEATURED_HOTELS, FEATURED_RESTAURANTS } from "../data/mockData";
import { BookingRecord, HotelListing, RestaurantListing, RoomDetail, StayCategory } from "../types";
import { formatDualPrice, USD_TO_BDT_RATE } from "../utils/currency";

interface LocalDiscoveryProps {
  onSaveExperience: (booking: Omit<BookingRecord, "id" | "userId">) => void;
}

export const LocalDiscovery: React.FC<LocalDiscoveryProps> = ({ onSaveExperience }) => {
  const [regionFilter, setRegionFilter] = useState<"all" | "bangladesh" | "crossborder">("all");
  const [tierFilter, setTierFilter] = useState<"all" | StayCategory>("all");
  const [ratingFilter, setRatingFilter] = useState<"all" | "top" | "budget_value">("all");
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [selectedHotelForRooms, setSelectedHotelForRooms] = useState<HotelListing | null>(null);
  const [expandedHotelId, setExpandedHotelId] = useState<string | null>(null);

  const filteredHotels = FEATURED_HOTELS.filter((h) => {
    if (regionFilter === "bangladesh" && !h.isDomestic) return false;
    if (regionFilter === "crossborder" && h.isDomestic) return false;
    if (tierFilter !== "all" && h.stayCategory !== tierFilter) return false;
    if (ratingFilter === "top" && h.rating < 4.7) return false;
    if (ratingFilter === "budget_value" && h.rating >= 4.7) return false;
    return true;
  });

  const filteredRestaurants = FEATURED_RESTAURANTS.filter((r) => {
    if (regionFilter === "bangladesh" && !r.isDomestic) return false;
    if (regionFilter === "crossborder" && r.isDomestic) return false;
    return true;
  });

  const handleBookHotel = (hotel: HotelListing, room?: RoomDetail) => {
    const price = room ? room.pricePerNight : hotel.pricePerNight;
    const dual = formatDualPrice(price, "BDT", "BDT");
    const roomTitle = room ? `${room.name} at ${hotel.name}` : hotel.name;
    const roomDetails = room 
      ? `${hotel.location} • Room: ${room.name} (${room.bedType}, ${room.capacity}) • View: ${room.viewType} • Rate: ${dual.full}/night`
      : `${hotel.location} • ${hotel.tagline} • Rate: ${dual.full}/night`;

    onSaveExperience({
      type: "hotel",
      title: roomTitle,
      price: price,
      details: roomDetails,
      bookedAt: new Date().toISOString(),
    });
    setSuccessMsg(`Reserved Stay: ${roomTitle}`);
    if (selectedHotelForRooms) {
      setSelectedHotelForRooms(null);
    }
    setTimeout(() => setSuccessMsg(null), 3500);
  };

  const handleBookDining = (rest: RestaurantListing) => {
    const dual = formatDualPrice(rest.costPerPerson * 2, "BDT", "BDT");
    onSaveExperience({
      type: "itinerary",
      title: `Table Reservation at ${rest.name}`,
      price: rest.costPerPerson * 2,
      details: `${rest.location} • Signature: ${rest.signatureDish} • Est: ${dual.full}`,
      bookedAt: new Date().toISOString(),
    });
    setSuccessMsg(`Table Reserved: ${rest.name}`);
    setTimeout(() => setSuccessMsg(null), 3500);
  };

  const getTierBadge = (cat: StayCategory) => {
    switch (cat) {
      case "luxury_resort":
        return {
          label: "⭐ 5-Star Luxury Resort",
          badgeClass: "bg-purple-100 text-purple-900 border-purple-300",
          icon: Sparkles
        };
      case "mid_motel":
        return {
          label: "🏨 Mid-Range Motel",
          badgeClass: "bg-blue-100 text-blue-900 border-blue-300",
          icon: BedDouble
        };
      case "eco_cottage":
        return {
          label: "🛖 Rustic Hill/Beach Cottage",
          badgeClass: "bg-amber-100 text-amber-900 border-amber-300",
          icon: TreePine
        };
      case "serviced_apartment":
        return {
          label: "🏢 Serviced Holiday Condo",
          badgeClass: "bg-cyan-100 text-cyan-900 border-cyan-300",
          icon: Layers
        };
      case "budget_guesthouse":
        return {
          label: "🏡 Budget Guest House / Lodge",
          badgeClass: "bg-emerald-100 text-emerald-900 border-emerald-300",
          icon: Home
        };
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#c4c8be]/40 pb-6">
        <div className="space-y-2">
          <h1 className="font-serif text-3xl sm:text-4xl font-medium text-[#191d18]">
            Local Discovery & Accommodation
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
            All Regions
          </button>
          <button
            onClick={() => setRegionFilter("bangladesh")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              regionFilter === "bangladesh" ? "bg-[#384b32] text-white shadow-sm" : "text-[#555a50] hover:text-[#191d18]"
            }`}
          >
            🇧🇩 Bangladesh
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

      {/* Success Notification */}
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

      {/* SECTION 1: Accommodation */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-serif text-2xl font-medium text-[#191d18]">
              Accommodation
            </h2>
          </div>

          {/* Rating Filter Pill */}
          <div className="flex bg-[#f2f5ed] p-1 rounded-xl border border-[#c4c8be]/40 text-xs">
            <button
              onClick={() => setRatingFilter("all")}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                ratingFilter === "all" ? "bg-[#384b32] text-white" : "text-[#555a50]"
              }`}
            >
              All Ratings
            </button>
            <button
              onClick={() => setRatingFilter("top")}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                ratingFilter === "top" ? "bg-[#384b32] text-white" : "text-[#555a50]"
              }`}
            >
              ★ 4.8+ Top Rated
            </button>
            <button
              onClick={() => setRatingFilter("budget_value")}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                ratingFilter === "budget_value" ? "bg-[#384b32] text-white" : "text-[#555a50]"
              }`}
            >
              ★ 3.8 - 4.6 Budget Value
            </button>
          </div>
        </div>

        {/* Stay Category Selector */}
        <div className="flex flex-wrap gap-2 text-xs">
          <button
            onClick={() => setTierFilter("all")}
            className={`px-3 py-1.5 rounded-xl font-semibold border transition-all cursor-pointer ${
              tierFilter === "all"
                ? "bg-[#384b32] text-white border-[#384b32] shadow-sm"
                : "bg-white text-[#555a50] border-[#c4c8be]/60 hover:bg-[#ecefe7]"
            }`}
          >
            All Stay Types ({FEATURED_HOTELS.length})
          </button>
          <button
            onClick={() => setTierFilter("luxury_resort")}
            className={`px-3 py-1.5 rounded-xl font-semibold border transition-all cursor-pointer ${
              tierFilter === "luxury_resort"
                ? "bg-purple-800 text-white border-purple-800"
                : "bg-purple-50 text-purple-800 border-purple-200 hover:bg-purple-100"
            }`}
          >
            ⭐ 5-Star Luxury Resorts
          </button>
          <button
            onClick={() => setTierFilter("mid_motel")}
            className={`px-3 py-1.5 rounded-xl font-semibold border transition-all cursor-pointer ${
              tierFilter === "mid_motel"
                ? "bg-blue-800 text-white border-blue-800"
                : "bg-blue-50 text-blue-800 border-blue-200 hover:bg-blue-100"
            }`}
          >
            🏨 Mid-Range Motels
          </button>
          <button
            onClick={() => setTierFilter("eco_cottage")}
            className={`px-3 py-1.5 rounded-xl font-semibold border transition-all cursor-pointer ${
              tierFilter === "eco_cottage"
                ? "bg-amber-800 text-white border-amber-800"
                : "bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100"
            }`}
          >
            🛖 Rustic Eco-Cottages
          </button>
          <button
            onClick={() => setTierFilter("serviced_apartment")}
            className={`px-3 py-1.5 rounded-xl font-semibold border transition-all cursor-pointer ${
              tierFilter === "serviced_apartment"
                ? "bg-cyan-800 text-white border-cyan-800"
                : "bg-cyan-50 text-cyan-900 border-cyan-200 hover:bg-cyan-100"
            }`}
          >
            🏢 Serviced Apartments & Condos
          </button>
          <button
            onClick={() => setTierFilter("budget_guesthouse")}
            className={`px-3 py-1.5 rounded-xl font-semibold border transition-all cursor-pointer ${
              tierFilter === "budget_guesthouse"
                ? "bg-emerald-800 text-white border-emerald-800"
                : "bg-emerald-50 text-emerald-900 border-emerald-200 hover:bg-emerald-100"
            }`}
          >
            🏡 Budget Guest Houses (৳900 - ৳1,800)
          </button>
        </div>

        {/* Hotel Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHotels.map((hotel) => {
            const dualPrice = formatDualPrice(hotel.pricePerNight, "BDT", "BDT");
            const tierMeta = getTierBadge(hotel.stayCategory);
            const TierIcon = tierMeta.icon;
            const isExpanded = expandedHotelId === hotel.id;
            const availableRooms = hotel.rooms || [];

            return (
              <div
                key={hotel.id}
                className="bg-white border border-[#c4c8be]/40 rounded-2xl overflow-hidden shadow-sm hover:border-[#384b32] transition-all flex flex-col justify-between"
              >
                <div className="relative h-52 bg-[#191d18] overflow-hidden">
                  <img
                    src={hotel.imageUrl}
                    alt={hotel.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-semibold text-white ${
                      hotel.isDomestic ? "bg-emerald-700" : "bg-blue-700"
                    }`}>
                      {hotel.isDomestic ? "🇧🇩 Bangladesh" : "🇮🇳 Cross-Border"}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border flex items-center gap-1 ${tierMeta.badgeClass}`}>
                      <TierIcon className="w-3 h-3" />
                      <span>{tierMeta.label}</span>
                    </span>
                  </div>

                  <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md px-2 py-0.5 rounded text-white text-xs font-bold flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{hotel.rating}</span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="font-serif text-lg font-medium leading-snug">{hotel.name}</h3>
                    <div className="text-[11px] text-[#fdcb9b] truncate">{hotel.location}</div>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <p className="text-xs text-[#555a50] leading-relaxed">
                    {hotel.description}
                  </p>

                  {/* Room Overview Summary */}
                  {availableRooms.length > 0 && (
                    <div className="bg-[#f7faf3] p-3 rounded-xl border border-[#c4c8be]/30 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-[#191d18] flex items-center gap-1.5">
                          <BedDouble className="w-3.5 h-3.5 text-[#384b32]" />
                          <span>Available Room Types ({availableRooms.length})</span>
                        </span>
                        <button
                          onClick={() => setSelectedHotelForRooms(hotel)}
                          className="text-[#384b32] font-semibold hover:underline text-[11px] cursor-pointer"
                        >
                          View All Details & Rates →
                        </button>
                      </div>

                      <div className="space-y-1.5 pt-1">
                        {availableRooms.slice(0, 2).map((room) => {
                          const roomDual = formatDualPrice(room.pricePerNight, "BDT", "BDT");
                          return (
                            <div 
                              key={room.id}
                              className="flex items-center justify-between text-[11px] text-[#555a50] bg-white p-2 rounded-lg border border-[#c4c8be]/20"
                            >
                              <div className="truncate pr-2">
                                <span className="font-medium text-[#191d18] block truncate">{room.name}</span>
                                <span className="text-[10px] text-[#747870]">{room.bedType} • {room.capacity}</span>
                              </div>
                              <div className="text-right shrink-0">
                                <span className="font-bold text-[#191d18]">{roomDual.primary}</span>
                                <span className="text-[9px] text-[#747870] block">/night</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Included Hotel Amenities */}
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase font-semibold text-[#747870]">Property Amenities:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {hotel.amenities.map((a, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 bg-[#f2f5ed] border border-[#c4c8be]/30 text-[11px] rounded text-[#384b32] font-medium"
                        >
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#c4c8be]/30 flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] text-[#747870] uppercase block font-semibold">Starting From</span>
                      <span className="font-serif text-xl font-bold text-[#191d18]">
                        {dualPrice.primary}
                      </span>
                      <span className="text-[11px] font-semibold text-[#384b32] block">
                        ({dualPrice.secondary}) / night
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {availableRooms.length > 0 ? (
                        <button
                          onClick={() => setSelectedHotelForRooms(hotel)}
                          className="bg-[#384b32] text-white px-4 py-2.5 rounded-xl font-sans text-xs uppercase tracking-wider font-semibold hover:bg-[#486040] transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
                        >
                          <span>Room Details</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleBookHotel(hotel)}
                          className="bg-[#384b32] text-white px-4 py-2.5 rounded-xl font-sans text-xs uppercase tracking-wider font-semibold hover:opacity-90 transition-opacity cursor-pointer"
                        >
                          Reserve Stay
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: Authentic Dining */}
      <div className="space-y-6 pt-6 border-t border-[#c4c8be]/40">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-2xl font-medium text-[#191d18]">
              Regional Dining & Local Flavors
            </h2>
          </div>
          <span className="text-xs text-[#747870]">{filteredRestaurants.length} Venues</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredRestaurants.map((rest) => {
            const dualCost = formatDualPrice(rest.costPerPerson, "BDT", "BDT");

            return (
              <div
                key={rest.id}
                className="bg-white border border-[#c4c8be]/40 rounded-2xl p-5 shadow-sm space-y-4 hover:border-[#384b32] transition-all flex flex-col justify-between"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <img
                    src={rest.imageUrl}
                    alt={rest.name}
                    className="w-full sm:w-36 h-36 rounded-xl object-cover shrink-0"
                  />
                  <div className="space-y-1.5 min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold text-white ${
                        rest.isDomestic ? "bg-emerald-700" : "bg-blue-700"
                      }`}>
                        {rest.isDomestic ? "🇧🇩 Bangladeshi Cuisine" : "🇮🇳 Regional Cross-Border"}
                      </span>
                      <span className="text-xs font-bold text-amber-600">★ {rest.rating}</span>
                    </div>

                    <h3 className="font-serif text-xl font-medium text-[#191d18]">
                      {rest.name}
                    </h3>
                    <p className="text-[11px] text-[#747870] flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#384b32]" />
                      <span>{rest.location}</span>
                    </p>
                    <p className="text-xs text-[#555a50] line-clamp-2">
                      {rest.description}
                    </p>
                  </div>
                </div>

                {/* Signature Dish Pill */}
                <div className="p-3 bg-[#f2f5ed] rounded-xl border border-[#c4c8be]/30 space-y-1 text-xs">
                  <span className="text-[10px] uppercase font-semibold text-[#384b32] block">
                    Signature Dish:
                  </span>
                  <span className="font-medium text-[#191d18]">{rest.signatureDish}</span>
                </div>

                <div className="pt-2 border-t border-[#c4c8be]/30 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#747870] uppercase block font-semibold">Est. Cost Per Meal</span>
                    <span className="font-serif text-lg font-bold text-[#191d18]">
                      {dualCost.primary}
                    </span>
                    <span className="text-[11px] font-semibold text-[#384b32] block">
                      ({dualCost.secondary}) / person ({rest.priceRange})
                    </span>
                  </div>

                  <button
                    onClick={() => handleBookDining(rest)}
                    className="bg-[#384b32] text-white px-4 py-2 rounded-xl font-sans text-xs uppercase tracking-wider font-semibold hover:opacity-90 transition-opacity cursor-pointer"
                  >
                    Reserve Table
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* MODAL: Comprehensive Room Details & Rates */}
      {selectedHotelForRooms && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#c4c8be]/50 flex flex-col">
            {/* Modal Header */}
            <div className="p-6 border-b border-[#c4c8be]/40 flex items-start justify-between sticky top-0 bg-white z-10">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-semibold text-white ${
                    selectedHotelForRooms.isDomestic ? "bg-emerald-700" : "bg-blue-700"
                  }`}>
                    {selectedHotelForRooms.isDomestic ? "🇧🇩 Bangladesh" : "🇮🇳 Cross-Border"}
                  </span>
                  <span className="text-xs font-bold text-amber-600">★ {selectedHotelForRooms.rating}</span>
                </div>
                <h2 className="font-serif text-2xl font-bold text-[#191d18]">
                  {selectedHotelForRooms.name}
                </h2>
                <p className="text-xs text-[#747870] flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#384b32]" />
                  <span>{selectedHotelForRooms.location}</span>
                </p>
              </div>

              <button
                onClick={() => setSelectedHotelForRooms(null)}
                className="w-8 h-8 rounded-full bg-[#f2f5ed] hover:bg-[#ecefe7] flex items-center justify-center text-[#555a50] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body: Available Rooms List */}
            <div className="p-6 space-y-6">
              <div>
                <h3 className="font-serif text-lg font-medium text-[#191d18] mb-1">
                  Available Room Types & Pricing
                </h3>
                <p className="text-xs text-[#555a50]">
                  Select your preferred room configuration with instant live BDT (৳) and USD ($) rates.
                </p>
              </div>

              <div className="space-y-4">
                {(selectedHotelForRooms.rooms || []).map((room) => {
                  const roomPriceDual = formatDualPrice(room.pricePerNight, "BDT", "BDT");

                  return (
                    <div
                      key={room.id}
                      className="bg-[#f7faf3] border border-[#c4c8be]/40 rounded-2xl p-5 space-y-4 hover:border-[#384b32] transition-all"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="space-y-1.5 flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-serif text-lg font-bold text-[#191d18]">
                              {room.name}
                            </h4>
                            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-semibold">
                              Available
                            </span>
                          </div>

                          {/* Room Specs Badges */}
                          <div className="flex flex-wrap items-center gap-3 text-xs text-[#555a50] pt-1">
                            <span className="flex items-center gap-1 bg-white px-2.5 py-1 rounded-lg border border-[#c4c8be]/30">
                              <BedDouble className="w-3.5 h-3.5 text-[#384b32]" />
                              <span>{room.bedType}</span>
                            </span>
                            <span className="flex items-center gap-1 bg-white px-2.5 py-1 rounded-lg border border-[#c4c8be]/30">
                              <Users className="w-3.5 h-3.5 text-[#384b32]" />
                              <span>{room.capacity}</span>
                            </span>
                            <span className="flex items-center gap-1 bg-white px-2.5 py-1 rounded-lg border border-[#c4c8be]/30">
                              <Maximize2 className="w-3.5 h-3.5 text-[#384b32]" />
                              <span>{room.sizeSqFt} sq ft</span>
                            </span>
                          </div>

                          {/* View Info */}
                          <div className="flex items-center gap-1.5 text-xs text-[#384b32] font-medium pt-1">
                            <Eye className="w-3.5 h-3.5" />
                            <span>View: {room.viewType}</span>
                          </div>
                        </div>

                        {/* Price & Book Button */}
                        <div className="text-left sm:text-right shrink-0 space-y-2 border-t sm:border-t-0 pt-3 sm:pt-0 border-[#c4c8be]/30">
                          <div>
                            <span className="text-[10px] text-[#747870] uppercase font-semibold block">Per Night</span>
                            <span className="font-serif text-2xl font-bold text-[#191d18]">
                              {roomPriceDual.primary}
                            </span>
                            <span className="text-xs font-semibold text-[#384b32] block">
                              ({roomPriceDual.secondary}) / night
                            </span>
                          </div>

                          <button
                            onClick={() => handleBookHotel(selectedHotelForRooms, room)}
                            className="w-full sm:w-auto bg-[#384b32] text-white px-5 py-2.5 rounded-xl font-sans text-xs uppercase tracking-wider font-semibold hover:bg-[#486040] transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                          >
                            <span>Book This Room</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Room Amenities & Inclusions */}
                      <div className="pt-3 border-t border-[#c4c8be]/30 space-y-1.5">
                        <span className="text-[10px] uppercase font-semibold text-[#747870] block">
                          Room Amenities & Features:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {room.features.map((feat, idx) => (
                            <div key={idx} className="flex items-center gap-1.5 text-xs text-[#555a50]">
                              <Check className="w-3.5 h-3.5 text-[#384b32] shrink-0" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-[#f2f5ed] border-t border-[#c4c8be]/40 flex items-center justify-between text-xs text-[#747870] rounded-b-3xl">
              <span>All rates include local taxes and breakfast where specified.</span>
              <button
                onClick={() => setSelectedHotelForRooms(null)}
                className="px-4 py-2 bg-white border border-[#c4c8be]/60 rounded-xl text-[#191d18] font-semibold hover:bg-[#ecefe7] cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
