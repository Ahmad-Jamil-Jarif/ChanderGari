import React, { useState } from "react";
import { 
  Plane, 
  Car, 
  Ship, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles,
  Calculator,
  Compass,
  MapPin,
  Check
} from "lucide-react";
import { AIR_TICKETS, ROAD_OPTIONS, SEA_OPTION } from "../data/mockData";
import { BookingRecord, AirTicket, RoadOption } from "../types";
import { formatDualPrice, USD_TO_BDT_RATE } from "../utils/currency";

interface TransportOptionsProps {
  onSaveBooking: (booking: Omit<BookingRecord, "id" | "userId">) => void;
  onNavigateToBudget?: () => void;
}

export const TransportOptions: React.FC<TransportOptionsProps> = ({
  onSaveBooking,
  onNavigateToBudget,
}) => {
  const [activeTab, setActiveTab] = useState<"all" | "bangladesh" | "crossborder">("all");
  const [transportMode, setTransportMode] = useState<"road" | "air" | "sea">("road");
  const [selectedCabinIdx, setSelectedCabinIdx] = useState(0);
  const [bookingSuccessMsg, setBookingSuccessMsg] = useState<string | null>(null);

  const filteredRoad = ROAD_OPTIONS.filter((opt) => {
    if (activeTab === "bangladesh" && !opt.isDomestic) return false;
    if (activeTab === "crossborder" && opt.isDomestic) return false;
    return true;
  });

  const filteredAir = AIR_TICKETS.filter((opt) => {
    if (activeTab === "bangladesh" && !opt.isDomestic) return false;
    if (activeTab === "crossborder" && opt.isDomestic) return false;
    return true;
  });

  const handleBookRoad = (opt: RoadOption) => {
    const dual = formatDualPrice(opt.price, "BDT", "BDT");
    onSaveBooking({
      type: "road",
      title: opt.title,
      price: opt.price,
      details: `${opt.duration} • ${opt.capacityOrDetail} • Cost: ${dual.full}`,
      bookedAt: new Date().toISOString(),
    });
    setBookingSuccessMsg(`Reserved: ${opt.title}`);
    setTimeout(() => setBookingSuccessMsg(null), 4000);
  };

  const handleBookAir = (ticket: AirTicket) => {
    const dual = formatDualPrice(ticket.price, "BDT", "BDT");
    onSaveBooking({
      type: "flight",
      title: `${ticket.classType} (${ticket.departureCode} → ${ticket.arrivalCode})`,
      price: ticket.price,
      details: `${ticket.departureTime} - ${ticket.arrivalTime} • ${ticket.duration} (${ticket.stops}) • Fare: ${dual.full}`,
      bookedAt: new Date().toISOString(),
    });
    setBookingSuccessMsg(`Booked Flight: ${ticket.classType}`);
    setTimeout(() => setBookingSuccessMsg(null), 4000);
  };

  const handleBookSea = () => {
    const selectedCabin = SEA_OPTION.cabinTypes[selectedCabinIdx];
    const totalPrice = SEA_OPTION.startingPrice + selectedCabin.extraCost;
    const dual = formatDualPrice(totalPrice, "BDT", "BDT");

    onSaveBooking({
      type: "sea",
      title: `${SEA_OPTION.title} - ${selectedCabin.name}`,
      price: totalPrice,
      details: `${SEA_OPTION.departure} → ${SEA_OPTION.arrival} • ${selectedCabin.description} • Total: ${dual.full}`,
      bookedAt: new Date().toISOString(),
    });
    setBookingSuccessMsg(`Reserved Cruise: ${SEA_OPTION.title} (${selectedCabin.name})`);
    setTimeout(() => setBookingSuccessMsg(null), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#c4c8be]/40 pb-6">
        <div className="space-y-2">
          <h1 className="font-serif text-3xl sm:text-4xl font-medium text-[#191d18]">
            Transport & Chander Gari
          </h1>
        </div>

        {/* Region Filter Tabs */}
        <div className="flex bg-[#f2f5ed] p-1 rounded-xl border border-[#c4c8be]/40 shrink-0">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "all" ? "bg-[#384b32] text-white shadow-sm" : "text-[#555a50] hover:text-[#191d18]"
            }`}
          >
            All Circuits
          </button>
          <button
            onClick={() => setActiveTab("bangladesh")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "bangladesh" ? "bg-[#384b32] text-white shadow-sm" : "text-[#555a50] hover:text-[#191d18]"
            }`}
          >
            🇧🇩 Bangladesh Domestic
          </button>
          <button
            onClick={() => setActiveTab("crossborder")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "crossborder" ? "bg-[#384b32] text-white shadow-sm" : "text-[#555a50] hover:text-[#191d18]"
            }`}
          >
            🇮🇳 Cross-Border (India)
          </button>
        </div>
      </div>

      {/* Booking Toast */}
      {bookingSuccessMsg && (
        <div className="p-4 bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs rounded-2xl font-medium flex items-center justify-between shadow-sm animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            <span>✓ {bookingSuccessMsg} — Added to My Trips!</span>
          </div>
          <button onClick={() => setBookingSuccessMsg(null)} className="text-emerald-800 hover:underline cursor-pointer">
            Dismiss
          </button>
        </div>
      )}

      {/* Mode Selectors */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setTransportMode("road")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
            transportMode === "road"
              ? "bg-[#384b32] text-white shadow-sm"
              : "bg-white border border-[#c4c8be]/50 text-[#555a50] hover:bg-[#ecefe7]"
          }`}
        >
          <Car className="w-4 h-4" />
          <span>Chander Gari, Coach & Train ({filteredRoad.length})</span>
        </button>

        <button
          onClick={() => setTransportMode("air")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
            transportMode === "air"
              ? "bg-[#384b32] text-white shadow-sm"
              : "bg-white border border-[#c4c8be]/50 text-[#555a50] hover:bg-[#ecefe7]"
          }`}
        >
          <Plane className="w-4 h-4" />
          <span>Aviation & Flights ({filteredAir.length})</span>
        </button>

        <button
          onClick={() => setTransportMode("sea")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
            transportMode === "sea"
              ? "bg-[#384b32] text-white shadow-sm"
              : "bg-white border border-[#c4c8be]/50 text-[#555a50] hover:bg-[#ecefe7]"
          }`}
        >
          <Ship className="w-4 h-4" />
          <span>Bay & Sea Cruises (1)</span>
        </button>
      </div>

      {/* MODE 1: Road & Chander Gari Options */}
      {transportMode === "road" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRoad.map((opt) => {
            const dualPrice = formatDualPrice(opt.price, "BDT", "BDT");

            return (
              <div
                key={opt.id}
                className="bg-white border border-[#c4c8be]/40 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between hover:border-[#384b32] transition-all"
              >
                <div className="relative h-48 bg-[#191d18] overflow-hidden">
                  <img
                    src={opt.imageUrl}
                    alt={opt.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-semibold text-white ${
                      opt.isDomestic ? "bg-amber-800" : "bg-blue-800"
                    }`}>
                      {opt.isDomestic ? "🇧🇩 Chander Gari & Overland" : "🇮🇳 Cross-Border SUV"}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="font-serif text-lg font-medium leading-snug">{opt.title}</div>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <p className="text-xs text-[#555a50] leading-relaxed">
                    {opt.description}
                  </p>

                  <div className="p-3 bg-[#f2f5ed] rounded-xl border border-[#c4c8be]/30 text-xs text-[#384b32] font-medium">
                    {opt.capacityOrDetail}
                  </div>

                  <div className="pt-2 border-t border-[#c4c8be]/30 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-[#747870] uppercase block">Charter Fare</span>
                      <span className="font-serif text-xl font-bold text-[#191d18]">
                        {dualPrice.primary}
                      </span>
                      <span className="text-[11px] font-semibold text-[#384b32] block">
                        ({dualPrice.secondary}) / charter
                      </span>
                    </div>

                    <button
                      onClick={() => handleBookRoad(opt)}
                      className="bg-[#384b32] text-white px-4 py-2.5 rounded-xl font-sans text-xs uppercase tracking-wider font-semibold hover:opacity-90 transition-opacity cursor-pointer"
                    >
                      Reserve Now
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* MODE 2: Air Tickets */}
      {transportMode === "air" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredAir.map((ticket) => {
            const dualPrice = formatDualPrice(ticket.price, "BDT", "BDT");

            return (
              <div
                key={ticket.id}
                className="bg-white border border-[#c4c8be]/40 rounded-2xl p-6 shadow-sm space-y-5 hover:border-[#384b32] transition-all"
              >
                <div className="flex items-center justify-between border-b border-[#c4c8be]/30 pb-4">
                  <div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      ticket.isDomestic ? "bg-emerald-100 text-emerald-800" : "bg-blue-100 text-blue-800"
                    }`}>
                      {ticket.isDomestic ? "🇧🇩 Domestic Air" : "🇮🇳 Regional Cross-Border Air"}
                    </span>
                    <h3 className="font-serif text-xl font-medium text-[#191d18] mt-1">
                      {ticket.classType}
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="font-serif text-2xl font-bold text-[#191d18]">
                      {dualPrice.primary}
                    </span>
                    <span className="text-xs font-semibold text-[#384b32] block">
                      ({dualPrice.secondary}) / seat
                    </span>
                  </div>
                </div>

                {/* Route Display */}
                <div className="grid grid-cols-3 items-center text-center p-4 bg-[#f9faf7] rounded-xl border border-[#c4c8be]/30">
                  <div>
                    <div className="font-bold text-base text-[#191d18]">{ticket.departureTime}</div>
                    <div className="text-xs text-[#747870]">{ticket.departureCode}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[11px] font-medium text-[#384b32]">{ticket.duration}</div>
                    <div className="w-full h-0.5 bg-[#384b32]/30 relative flex items-center justify-center">
                      <Plane className="w-3.5 h-3.5 text-[#384b32] absolute" />
                    </div>
                    <div className="text-[10px] text-[#747870]">{ticket.stops}</div>
                  </div>
                  <div>
                    <div className="font-bold text-base text-[#191d18]">{ticket.arrivalTime}</div>
                    <div className="text-xs text-[#747870]">{ticket.arrivalCode}</div>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-1.5 text-xs">
                  {ticket.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-[#555a50]">
                      <Check className="w-3.5 h-3.5 text-[#384b32]" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => handleBookAir(ticket)}
                  className="w-full bg-[#384b32] text-white py-3 rounded-xl font-sans text-xs uppercase tracking-wider font-semibold hover:opacity-90 transition-opacity cursor-pointer"
                >
                  Book Air Ticket
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* MODE 3: Sea Cruise */}
      {transportMode === "sea" && (
        <div className="bg-white border border-[#c4c8be]/40 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#c4c8be]/30 pb-6">
            <div>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                🇧🇩 Flagship Bay of Bengal Luxury Cruiser
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#191d18] mt-1">
                {SEA_OPTION.title}
              </h2>
              <p className="text-xs text-[#555a50] mt-1">
                {SEA_OPTION.departure} • {SEA_OPTION.arrival}
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs text-[#747870] block">Starting from</span>
              <span className="font-serif text-3xl font-bold text-[#191d18]">
                {formatDualPrice(SEA_OPTION.startingPrice, "BDT", "BDT").primary}
              </span>
              <span className="text-xs font-semibold text-[#384b32] block">
                ({formatDualPrice(SEA_OPTION.startingPrice, "BDT", "BDT").secondary})
              </span>
            </div>
          </div>

          <p className="text-xs text-[#555a50] leading-relaxed">
            {SEA_OPTION.description}
          </p>

          {/* Cabin Selection */}
          <div className="space-y-3">
            <span className="font-semibold text-xs text-[#191d18] block uppercase tracking-wider">
              Select Cabin Tier:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SEA_OPTION.cabinTypes.map((cabin, idx) => {
                const totalCabin = SEA_OPTION.startingPrice + cabin.extraCost;
                const dualCabin = formatDualPrice(totalCabin, "BDT", "BDT");

                return (
                  <div
                    key={idx}
                    onClick={() => setSelectedCabinIdx(idx)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-2 ${
                      selectedCabinIdx === idx
                        ? "border-[#384b32] bg-[#f2f5ed] shadow-sm"
                        : "border-[#c4c8be]/40 bg-[#f9faf7] hover:border-[#384b32]/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-base font-medium text-[#191d18]">{cabin.name}</span>
                      <div className="text-right">
                        <span className="text-xs font-bold text-[#191d18]">
                          {dualCabin.primary}
                        </span>
                        <span className="text-[10px] text-[#384b32] block">
                          ({dualCabin.secondary})
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-[#555a50]">{cabin.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            onClick={handleBookSea}
            className="w-full bg-[#384b32] text-white py-3.5 rounded-xl font-sans text-xs uppercase tracking-wider font-semibold hover:opacity-90 transition-opacity cursor-pointer"
          >
            Reserve Sea Cruise Pass ({formatDualPrice(SEA_OPTION.startingPrice + SEA_OPTION.cabinTypes[selectedCabinIdx].extraCost, "BDT", "BDT").full})
          </button>
        </div>
      )}

      {/* Next Step Banner: Tour Budget Calculator */}
      <div className="bg-[#f2f5ed] border border-[#384b32]/20 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="font-serif text-2xl font-medium text-[#191d18]">
            Calculate Your Total Tour Budget
          </h3>
        </div>

        <button
          onClick={onNavigateToBudget}
          className="bg-[#384b32] text-white px-7 py-3.5 rounded-xl font-sans text-xs uppercase tracking-wider font-semibold hover:opacity-90 transition-opacity flex items-center gap-2 shrink-0 shadow-sm cursor-pointer"
        >
          <span>Open Budget Calculator</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
