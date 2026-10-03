import React from "react";
import { ArrowRight, Compass, ShieldCheck, Calculator, MapPin, Sparkles, Navigation, Mountain, Utensils, Hotel, Car } from "lucide-react";
import { DESTINATIONS, MYTHOS_STORY } from "../data/mockData";

interface HeroLandingProps {
  onNavigatePage: (page: string) => void;
  onOpenAuth?: () => void;
  isLoggedIn?: boolean;
}

export const HeroLanding: React.FC<HeroLandingProps> = ({ onNavigatePage, onOpenAuth, isLoggedIn }) => {
  const handleAction = (targetPage: string) => {
    if (!isLoggedIn && onOpenAuth) {
      onOpenAuth();
    } else {
      onNavigatePage(targetPage);
    }
  };

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. Hero Showcase */}
      <section className="relative min-h-[580px] sm:min-h-[640px] flex items-center justify-center overflow-hidden rounded-3xl mx-4 sm:mx-6 lg:mx-8 bg-[#191d18] text-white">
        {/* Background Image with Dark Vignette */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?auto=format&fit=crop&w=2000&q=80')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#191d18] via-[#191d18]/60 to-[#191d18]/40" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 py-16 space-y-6">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-tight">
            Journey Through Clouds, Rivers & Timeless Horizons
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-white/80 leading-relaxed font-light">
            Plan and budget scenic journeys across mountain ridges, coastlines, and cross-border circuits.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
            <button
              onClick={() => handleAction("destinations")}
              className="w-full sm:w-auto bg-[#384b32] text-white px-7 py-3.5 rounded-xl font-sans text-xs uppercase tracking-wider font-semibold hover:bg-[#486040] transition-all flex items-center justify-center gap-2 shadow-lg shadow-black/30 cursor-pointer"
            >
              <span>Explore Destinations</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => handleAction("budget")}
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-6 py-3.5 rounded-xl font-sans text-xs uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calculator className="w-4 h-4 text-[#fdcb9b]" />
              <span>Tour Budget Calculator</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. Distinct Pillars / Why Chandergari */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#191d18]">
            Everything You Need for a Seamless Tour
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Pillar 1 */}
          <div className="bg-white border border-[#c4c8be]/40 rounded-2xl p-6 shadow-sm space-y-3 hover:border-[#384b32] transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#384b32]/10 text-[#384b32] flex items-center justify-center">
              <Mountain className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-medium text-[#191d18]">
              Curated Destinations
            </h3>
            <p className="text-xs text-[#555a50] leading-relaxed">
              Explore Bangladesh's emerald tea hills, Sajek cloud valleys, and Cox's Bazar beaches alongside iconic wonders in Switzerland, Japan, and Italy.
            </p>
            <button
              onClick={() => handleAction("destinations")}
              className="text-xs font-semibold text-[#384b32] hover:underline inline-flex items-center gap-1 pt-1"
            >
              <span>View Destinations</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Pillar 2 */}
          <div className="bg-white border border-[#c4c8be]/40 rounded-2xl p-6 shadow-sm space-y-3 hover:border-[#384b32] transition-colors">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center">
              <Car className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-medium text-[#191d18]">
              Chander Gari & Transport
            </h3>
            <p className="text-xs text-[#555a50] leading-relaxed">
              Reserve traditional mountain safari jeeps, Scania VIP sleeper coaches, AC train cabins, luxury catamarans, and executive flights.
            </p>
            <button
              onClick={() => handleAction("transport")}
              className="text-xs font-semibold text-[#384b32] hover:underline inline-flex items-center gap-1 pt-1"
            >
              <span>Book Transport</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Pillar 3 */}
          <div className="bg-white border border-[#c4c8be]/40 rounded-2xl p-6 shadow-sm space-y-3 hover:border-[#384b32] transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-700 flex items-center justify-center">
              <Calculator className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-medium text-[#191d18]">
              Tour Budget Calculator
            </h3>
            <p className="text-xs text-[#555a50] leading-relaxed">
              Know your total costs in BDT (৳) or USD ($) broken down by transport, cottages, traditional food, activities, and emergency buffers.
            </p>
            <button
              onClick={() => handleAction("budget")}
              className="text-xs font-semibold text-[#384b32] hover:underline inline-flex items-center gap-1 pt-1"
            >
              <span>Calculate Budget</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Pillar 4 */}
          <div className="bg-white border border-[#c4c8be]/40 rounded-2xl p-6 shadow-sm space-y-3 hover:border-[#384b32] transition-colors">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-700 flex items-center justify-center">
              <Utensils className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-medium text-[#191d18]">
              Foods, Resorts & History
            </h3>
            <p className="text-xs text-[#555a50] leading-relaxed">
              Discover authentic regional dishes (Bamboo Chicken, Mezbani Beef, Shatkora), 5-star eco-resorts, and deep historical chronicles.
            </p>
            <button
              onClick={() => handleAction("discovery")}
              className="text-xs font-semibold text-[#384b32] hover:underline inline-flex items-center gap-1 pt-1"
            >
              <span>Explore Discovery</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. Featured Bangladesh & International Highlights Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#191d18]">
              Places to Visit
            </h2>
          </div>
          <button
            onClick={() => handleAction("destinations")}
            className="text-xs font-semibold uppercase tracking-wider text-[#384b32] hover:underline inline-flex items-center gap-1.5"
          >
            <span>View All Destinations</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DESTINATIONS.slice(0, 3).map((dest) => (
            <div
              key={dest.id}
              onClick={() => handleAction("destinations")}
              className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer shadow-sm border border-[#c4c8be]/40 bg-[#191d18]"
            >
              <img
                src={dest.imageUrl}
                alt={dest.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

              <div className="absolute top-4 left-4">
                <span className={`px-2.5 py-1 rounded-md text-[11px] font-semibold ${
                  dest.isDomestic ? "bg-emerald-800 text-emerald-100" : "bg-blue-800 text-blue-100"
                }`}>
                  {dest.isDomestic ? "🇧🇩 Bangladesh" : "✈️ International"}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white space-y-1.5">
                <div className="text-[11px] text-[#fdcb9b] uppercase tracking-wider font-semibold">
                  {dest.region}
                </div>
                <h3 className="font-serif text-xl font-medium group-hover:text-[#fdcb9b] transition-colors">
                  {dest.name}
                </h3>
                <p className="text-xs text-white/80 line-clamp-2">
                  {dest.tagline}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Chander Gari Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#f2f5ed] border border-[#c4c8be]/40 rounded-3xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#191d18]">
              The Chander Gari Mountain Experience
            </h2>

            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={() => handleAction("transport")}
                className="bg-[#384b32] text-white px-6 py-3 rounded-xl font-sans text-xs uppercase tracking-wider font-semibold hover:bg-[#486040] transition-colors flex items-center gap-2"
              >
                <span>Reserve A Chander Gari</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-md h-72 sm:h-80">
            <img
              src={MYTHOS_STORY.imageUrl}
              alt="Chander Gari in the Mountains"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
              <span className="text-white text-xs font-medium">
                Traditional Chander Gari navigating Sajek Valley hill ridges.
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
