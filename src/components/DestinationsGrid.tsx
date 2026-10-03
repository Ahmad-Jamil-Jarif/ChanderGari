import React, { useState } from "react";
import { 
  Heart, 
  MapPin, 
  ArrowRight, 
  X, 
  Calendar, 
  DollarSign, 
  Building2, 
  Utensils, 
  Landmark, 
  CheckCircle2, 
  Info,
  Search,
  SlidersHorizontal,
  Compass,
  BedDouble,
  Home,
  Sparkles
} from "lucide-react";
import { DESTINATIONS, CITIES } from "../data/mockData";
import { getCityDetails } from "../data/cityDetailsData";
import { City, Destination, BookingRecord, StayCategory } from "../types";
import { formatDualPrice, USD_TO_BDT_RATE } from "../utils/currency";
import { WeatherWidget } from "./WeatherWidget";

interface DestinationsGridProps {
  savedDestinationIds: string[];
  onToggleSaveDestination: (id: string) => void;
  onSaveItinerary?: (booking: Omit<BookingRecord, "id" | "userId">) => void;
}

export const DestinationsGrid: React.FC<DestinationsGridProps> = ({
  savedDestinationIds,
  onToggleSaveDestination,
  onSaveItinerary,
}) => {
  const [activeFilter, setActiveFilter] = useState<"all" | "bangladesh" | "crossborder">("all");
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [cityTab, setCityTab] = useState<"overview" | "hotels" | "foods" | "history">("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [itinerarySaved, setItinerarySaved] = useState(false);

  // Filtered Destinations
  const filteredDestinations = DESTINATIONS.filter((dest) => {
    if (activeFilter === "bangladesh" && !dest.isDomestic) return false;
    if (activeFilter === "crossborder" && dest.isDomestic) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        dest.name.toLowerCase().includes(q) ||
        dest.region.toLowerCase().includes(q) ||
        dest.tagline.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Filtered Cities
  const filteredCities = CITIES.filter((city) => {
    if (activeFilter === "bangladesh" && !city.isDomestic) return false;
    if (activeFilter === "crossborder" && city.isDomestic) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        city.name.toLowerCase().includes(q) ||
        city.countryName.toLowerCase().includes(q) ||
        city.tagline.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const cityDetails = selectedCity ? getCityDetails(selectedCity) : null;

  const handleSaveCityItinerary = () => {
    if (selectedCity && onSaveItinerary) {
      const priceVal = selectedCity.avgPricePerNight ? selectedCity.avgPricePerNight * 3 : 9500;
      const dualPrice = formatDualPrice(priceVal, "BDT", "BDT");

      onSaveItinerary({
        type: "itinerary",
        title: `${selectedCity.name} Trip Itinerary`,
        price: priceVal,
        details: `${selectedCity.tagline} • Best time: ${selectedCity.bestTimeToVisit || "Year-round"} • Est. 3-day stay: ${dualPrice.full}`,
        bookedAt: new Date().toISOString(),
      });
      setItinerarySaved(true);
      setTimeout(() => setItinerarySaved(false), 3500);
    }
  };

  const getTierBadge = (cat?: StayCategory) => {
    switch (cat) {
      case "luxury_resort":
        return { label: "5-Star Luxury Resort", badgeClass: "bg-purple-100 text-purple-900 border-purple-300", icon: Sparkles };
      case "mid_motel":
        return { label: "Mid-Range Motel / Cottage", badgeClass: "bg-blue-100 text-blue-900 border-blue-300", icon: BedDouble };
      case "budget_guesthouse":
      default:
        return { label: "Budget Guest House / Lodge", badgeClass: "bg-emerald-100 text-emerald-900 border-emerald-300", icon: Home };
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Header & Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#c4c8be]/40 pb-6">
        <div className="space-y-2">
          <h1 className="font-serif text-3xl sm:text-4xl font-medium text-[#191d18]">
            Destinations & Cities
          </h1>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-[#747870] absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Nafakhum, Sajek, Darjeeling..."
              className="pl-9 pr-4 py-2 rounded-xl border border-[#c4c8be]/60 bg-white text-xs text-[#191d18] focus:outline-none focus:border-[#384b32] w-full sm:w-64"
            />
          </div>

          {/* Region Tabs */}
          <div className="flex bg-[#f2f5ed] p-1 rounded-xl border border-[#c4c8be]/40 shrink-0">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeFilter === "all"
                  ? "bg-[#384b32] text-white shadow-sm"
                  : "text-[#555a50] hover:text-[#191d18]"
              }`}
            >
              All Circuits
            </button>
            <button
              onClick={() => setActiveFilter("bangladesh")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeFilter === "bangladesh"
                  ? "bg-[#384b32] text-white shadow-sm"
                  : "text-[#555a50] hover:text-[#191d18]"
              }`}
            >
              🇧🇩 Bangladesh Domestic
            </button>
            <button
              onClick={() => setActiveFilter("crossborder")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeFilter === "crossborder"
                  ? "bg-[#384b32] text-white shadow-sm"
                  : "text-[#555a50] hover:text-[#191d18]"
              }`}
            >
              🇮🇳 Cross-Border (Meghalaya/Darjeeling/Sikkim)
            </button>
          </div>
        </div>
      </div>

      {/* Live Atmospheric Weather & Expedition Forecast Hub */}
      <WeatherWidget />

      {/* Section 1: Major Destination Collections */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl font-medium text-[#191d18]">
            Major Destination
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDestinations.map((dest) => {
            const isSaved = savedDestinationIds.includes(dest.id);
            return (
              <div
                key={dest.id}
                className="group bg-white border border-[#c4c8be]/40 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="relative h-56 overflow-hidden bg-[#191d18]">
                  <img
                    src={dest.imageUrl}
                    alt={dest.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-semibold text-white ${
                      dest.isDomestic ? "bg-emerald-700" : "bg-blue-700"
                    }`}>
                      {dest.isDomestic ? "🇧🇩 Bangladesh Domestic" : "🇮🇳 IN CB"}
                    </span>
                  </div>

                  <button
                    onClick={() => onToggleSaveDestination(dest.id)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/60 transition-colors cursor-pointer"
                    aria-label="Save destination"
                  >
                    <Heart className={`w-4 h-4 ${isSaved ? "fill-rose-500 text-rose-500" : "text-white"}`} />
                  </button>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="text-[11px] text-[#fdcb9b] uppercase tracking-wider font-semibold">
                      {dest.region}
                    </div>
                    <h3 className="font-serif text-xl font-medium">
                      {dest.name}
                    </h3>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <p className="text-xs text-[#555a50] leading-relaxed">
                    {dest.description}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-[#c4c8be]/30">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#747870]">
                      Key Highlights:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {dest.highlights.map((h, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 bg-[#f2f5ed] border border-[#c4c8be]/30 text-[#384b32] text-[11px] rounded-lg font-medium"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section 2: Explore City Cards with Stays, Foods & History */}
      <div className="space-y-6 pt-6 border-t border-[#c4c8be]/40">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-2xl font-medium text-[#191d18]">
              Explore City
            </h2>
          </div>
          <span className="text-xs text-[#747870]">
            {filteredCities.length} Locations
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredCities.map((city) => {
            const dualPrice = formatDualPrice(
              city.avgPricePerNight || 3200,
              "BDT",
              "BDT"
            );

            return (
              <div
                key={city.id}
                onClick={() => {
                  setSelectedCity(city);
                  setCityTab("overview");
                }}
                className="group bg-white border border-[#c4c8be]/40 rounded-2xl overflow-hidden shadow-sm hover:border-[#384b32] hover:shadow-md transition-all cursor-pointer flex flex-col"
              >
                <div className="relative h-44 overflow-hidden bg-[#191d18]">
                  <img
                    src={city.imageUrl}
                    alt={city.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  <div className="absolute top-2.5 left-2.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold text-white ${
                      city.isDomestic ? "bg-emerald-700" : "bg-blue-700"
                    }`}>
                      {city.isDomestic ? "🇧🇩 BD" : "🇮🇳 IN CB"}
                    </span>
                  </div>

                  <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                    <h3 className="font-serif text-lg font-medium leading-tight">
                      {city.name}
                    </h3>
                    <div className="text-[11px] text-[#fdcb9b] truncate">
                      {city.countryName} • {city.region}
                    </div>
                  </div>
                </div>

                <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2">
                  <p className="text-xs text-[#555a50] line-clamp-2 leading-relaxed">
                    {city.tagline}
                  </p>

                  <div className="pt-2 border-t border-[#c4c8be]/20 space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-[#747870]">Avg Stay:</span>
                      <span className="font-semibold text-[#191d18]">
                        {dualPrice.primary} <span className="text-[10px] text-[#384b32]">({dualPrice.secondary})</span>
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-[#747870] pt-1">
                      <span>{city.bestTimeToVisit ? `Best: ${city.bestTimeToVisit}` : "All Year"}</span>
                      <span className="font-semibold text-[#384b32] group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-0.5">
                        Details <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* City Detail Modal (Overview, Hotels/Motels/Guesthouses, Foods, History) */}
      {selectedCity && cityDetails && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-[#c4c8be]/40 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 relative animate-in fade-in zoom-in-95 duration-200 space-y-6">
            <button
              onClick={() => setSelectedCity(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-[#ecefe7] text-[#747870] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* City Header */}
            <div className="flex items-start gap-4">
              <img
                src={selectedCity.imageUrl}
                alt={selectedCity.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover shrink-0 border border-[#c4c8be]/30"
              />
              <div className="space-y-1 min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold text-white ${
                    selectedCity.isDomestic ? "bg-emerald-700" : "bg-blue-700"
                  }`}>
                    {selectedCity.isDomestic ? "🇧🇩 Bangladesh Domestic" : "🇮🇳 IN CB"}
                  </span>
                  <span className="text-xs text-[#747870]">{selectedCity.countryName}</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#191d18] truncate">
                  {selectedCity.name}
                </h2>
                <p className="text-xs text-[#555a50] line-clamp-2">
                  {selectedCity.tagline}
                </p>
              </div>
            </div>

            {/* Modal Navigation Tabs */}
            <div className="flex bg-[#f2f5ed] p-1 rounded-xl border border-[#c4c8be]/40 text-xs">
              <button
                onClick={() => setCityTab("overview")}
                className={`flex-1 py-2 rounded-lg font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  cityTab === "overview" ? "bg-[#384b32] text-white shadow-sm" : "text-[#555a50] hover:text-[#191d18]"
                }`}
              >
                <Info className="w-3.5 h-3.5" />
                <span>Overview</span>
              </button>
              <button
                onClick={() => setCityTab("hotels")}
                className={`flex-1 py-2 rounded-lg font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  cityTab === "hotels" ? "bg-[#384b32] text-white shadow-sm" : "text-[#555a50] hover:text-[#191d18]"
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Stays ({cityDetails.hotels.length})</span>
              </button>
              <button
                onClick={() => setCityTab("foods")}
                className={`flex-1 py-2 rounded-lg font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  cityTab === "foods" ? "bg-[#384b32] text-white shadow-sm" : "text-[#555a50] hover:text-[#191d18]"
                }`}
              >
                <Utensils className="w-3.5 h-3.5" />
                <span>Foods ({cityDetails.foods.length})</span>
              </button>
              <button
                onClick={() => setCityTab("history")}
                className={`flex-1 py-2 rounded-lg font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  cityTab === "history" ? "bg-[#384b32] text-white shadow-sm" : "text-[#555a50] hover:text-[#191d18]"
                }`}
              >
                <Landmark className="w-3.5 h-3.5" />
                <span>History</span>
              </button>
            </div>

            {/* TAB CONTENT: Overview */}
            {cityTab === "overview" && (
              <div className="space-y-4 text-xs">
                <p className="text-[#555a50] leading-relaxed text-sm">
                  {selectedCity.description}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-[#f9faf7] rounded-2xl border border-[#c4c8be]/30">
                  <div>
                    <span className="text-[#747870] block uppercase tracking-wider text-[10px]">Best Season</span>
                    <span className="font-semibold text-[#191d18] text-xs">{selectedCity.bestTimeToVisit || "Sep – Mar"}</span>
                  </div>
                  <div>
                    <span className="text-[#747870] block uppercase tracking-wider text-[10px]">Avg Stay Rate</span>
                    <span className="font-semibold text-[#384b32] text-xs">
                      {formatDualPrice(selectedCity.avgPricePerNight || 3200, "BDT", "BDT").full}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#747870] block uppercase tracking-wider text-[10px]">Region</span>
                    <span className="font-semibold text-[#191d18] text-xs">{selectedCity.region}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="font-semibold text-[#191d18] block">Key Highlights:</span>
                  <div className="flex flex-wrap gap-2">
                    {selectedCity.highlights.map((h, i) => (
                      <span key={i} className="px-3 py-1 bg-[#f2f5ed] border border-[#c4c8be]/40 rounded-lg text-[#384b32] font-medium">
                        ✓ {h}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Live Real-Time Weather for this City */}
                <div className="space-y-2 pt-2 border-t border-[#c4c8be]/30">
                  <span className="font-semibold text-[#191d18] block text-[11px] uppercase tracking-wider text-[#747870]">
                    Live Atmospheric Weather & Forecast:
                  </span>
                  <WeatherWidget initialDestinationId={selectedCity.id} compact={true} />
                </div>
              </div>
            )}

            {/* TAB CONTENT: Stays (Hotels, Motels & Budget Guest Houses) */}
            {cityTab === "hotels" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {cityDetails.hotels.map((hotel) => {
                    const dual = formatDualPrice(hotel.pricePerNight, "BDT", "BDT");
                    const tierMeta = getTierBadge(hotel.stayCategory);
                    const TierIcon = tierMeta.icon;

                    return (
                      <div
                        key={hotel.id}
                        className="border border-[#c4c8be]/40 rounded-2xl p-4 bg-[#f9faf7] space-y-3 flex flex-col justify-between"
                      >
                        <div className="space-y-2">
                          <img
                            src={hotel.imageUrl}
                            alt={hotel.name}
                            className="w-full h-36 rounded-xl object-cover"
                          />
                          <div className="flex items-center justify-between">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border flex items-center gap-1 ${tierMeta.badgeClass}`}>
                              <TierIcon className="w-3 h-3" />
                              <span>{tierMeta.label}</span>
                            </span>
                            <span className="text-xs font-bold text-amber-600">★ {hotel.rating}</span>
                          </div>
                          <h4 className="font-serif text-base font-medium text-[#191d18]">
                            {hotel.name}
                          </h4>
                          <p className="text-xs text-[#555a50] leading-relaxed">
                            {hotel.description}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-[#c4c8be]/20 flex items-center justify-between text-xs">
                          <span className="text-[#747870]">{hotel.location}</span>
                          <div className="text-right">
                            <span className="font-serif font-bold text-[#191d18]">
                              {dual.primary}
                            </span>
                            <span className="text-[10px] text-[#384b32] block">
                              ({dual.secondary}) / night
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB CONTENT: Foods */}
            {cityTab === "foods" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {cityDetails.foods.map((food) => (
                    <div
                      key={food.id}
                      className="border border-[#c4c8be]/40 rounded-2xl p-4 bg-[#f9faf7] space-y-3 flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <img
                          src={food.imageUrl}
                          alt={food.name}
                          className="w-full h-36 rounded-xl object-cover"
                        />
                        <span className="text-[11px] font-semibold text-[#384b32] block">
                          {food.category}
                        </span>
                        <h4 className="font-serif text-base font-medium text-[#191d18]">
                          {food.name}
                        </h4>
                        <p className="text-xs text-[#555a50] leading-relaxed">
                          {food.description}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-[#c4c8be]/20 space-y-1 text-xs">
                        <div className="text-[#747870]">
                          <strong className="text-[#191d18]">Best Where:</strong> {food.bestWhere}
                        </div>
                        <div className="font-semibold text-[#384b32]">
                          Est. Price: {food.priceEstimate}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT: History */}
            {cityTab === "history" && (
              <div className="space-y-4 text-xs">
                <div className="p-4 bg-[#f2f5ed] rounded-2xl border border-[#c4c8be]/30 space-y-2">
                  <div className="text-[11px] font-semibold text-[#384b32] uppercase tracking-wider">
                    Historic Period: {cityDetails.history.period}
                  </div>
                  <p className="text-[#555a50] text-xs leading-relaxed">
                    {cityDetails.history.summary}
                  </p>
                  <p className="text-[#384b32] text-xs font-medium pt-1">
                    <strong>Cultural Significance:</strong> {cityDetails.history.culturalSignificance}
                  </p>
                </div>

                <div className="space-y-3">
                  <span className="font-serif text-sm font-medium text-[#191d18] block">
                    Monumental Historical Sites:
                  </span>
                  <div className="space-y-2.5">
                    {cityDetails.history.historicalSites.map((site, idx) => (
                      <div key={idx} className="p-3 bg-[#f9faf7] rounded-xl border border-[#c4c8be]/30 space-y-1">
                        <div className="flex items-center justify-between">
                          <strong className="text-[#191d18] text-xs">{site.name}</strong>
                          <span className="text-[10px] text-[#747870]">{site.era}</span>
                        </div>
                        <p className="text-[#555a50] text-[11px] leading-relaxed">
                          {site.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Modal Actions */}
            <div className="pt-4 border-t border-[#c4c8be]/30 flex flex-col sm:flex-row items-center justify-between gap-3">
              {itinerarySaved ? (
                <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-semibold bg-emerald-100 px-4 py-2.5 rounded-xl">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{selectedCity.name} itinerary saved to My Trips!</span>
                </div>
              ) : (
                <button
                  onClick={handleSaveCityItinerary}
                  className="w-full sm:w-auto bg-[#384b32] text-white px-6 py-3 rounded-xl font-sans text-xs uppercase tracking-wider font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Save Itinerary</span>
                </button>
              )}

              <button
                onClick={() => setSelectedCity(null)}
                className="w-full sm:w-auto px-5 py-3 rounded-xl border border-[#c4c8be]/50 text-xs font-semibold hover:bg-[#ecefe7] transition-colors cursor-pointer"
              >
                Close City Guide
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
