import React, { useState, useEffect } from "react";
import { 
  CloudSun, 
  Wind, 
  Droplets, 
  Thermometer, 
  MapPin, 
  RefreshCw, 
  Compass, 
  Sparkles,
  ChevronRight,
  Sun,
  CloudRain,
  CloudFog
} from "lucide-react";
import { RealTimeWeather } from "../types";
import { fetchRealTimeWeather, DESTINATION_COORDINATES, interpretWeatherCode } from "../utils/weather";

interface WeatherWidgetProps {
  initialDestinationId?: string;
  onSelectDestination?: (destId: string) => void;
  compact?: boolean;
}

export const WeatherWidget: React.FC<WeatherWidgetProps> = ({
  initialDestinationId = "sajek",
  onSelectDestination,
  compact = false,
}) => {
  const [selectedDestId, setSelectedDestId] = useState<string>(initialDestinationId);
  const [weather, setWeather] = useState<RealTimeWeather | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [unit, setUnit] = useState<"C" | "F">("C");
  const [filterMode, setFilterMode] = useState<"all" | "domestic" | "crossborder">("all");

  const destinationKeys = Object.keys(DESTINATION_COORDINATES).filter((k) => {
    if (filterMode === "domestic") return DESTINATION_COORDINATES[k].isDomestic;
    if (filterMode === "crossborder") return !DESTINATION_COORDINATES[k].isDomestic;
    return true;
  });

  useEffect(() => {
    loadWeather(selectedDestId);
  }, [selectedDestId]);

  const loadWeather = async (destId: string) => {
    setLoading(true);
    try {
      const data = await fetchRealTimeWeather(destId);
      setWeather(data);
    } catch (err) {
      console.error("Failed to load weather:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (destId: string) => {
    setSelectedDestId(destId);
    if (onSelectDestination) {
      onSelectDestination(destId);
    }
  };

  const currentMeta = DESTINATION_COORDINATES[selectedDestId] || DESTINATION_COORDINATES["sajek"];

  // Compact card view (for embedding inside destination cards or modals)
  if (compact) {
    if (loading || !weather) {
      return (
        <div className="p-3 bg-[#f2f5ed] border border-[#c4c8be]/40 rounded-xl flex items-center justify-between animate-pulse">
          <div className="flex items-center gap-2">
            <CloudSun className="w-4 h-4 text-[#384b32]" />
            <span className="text-xs text-[#555a50]">Fetching live weather...</span>
          </div>
        </div>
      );
    }

    const tempDisplay = unit === "C" ? `${weather.tempC}°C` : `${weather.tempF}°F`;
    const weatherIcon = interpretWeatherCode(weather.conditionCode, weather.isDay).icon;

    return (
      <div className="bg-[#f2f5ed] border border-[#c4c8be]/50 rounded-xl p-3 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">{weatherIcon}</span>
            <div>
              <div className="text-xs font-bold text-[#191d18] flex items-center gap-1">
                <span>{tempDisplay}</span>
                <span className="font-normal text-[#555a50] text-[11px]">({weather.condition})</span>
              </div>
              <div className="text-[10px] text-[#747870] flex items-center gap-1">
                <span>Humidity: {weather.humidity}%</span>
                <span>•</span>
                <span>Wind: {weather.windSpeedKmH} km/h</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setUnit(unit === "C" ? "F" : "C")}
            className="px-1.5 py-0.5 rounded bg-white text-[10px] font-bold border border-[#c4c8be]/60 text-[#384b32] hover:bg-[#ecefe7] cursor-pointer"
          >
            °{unit}
          </button>
        </div>

        {/* Mini 3-day forecast */}
        <div className="grid grid-cols-3 gap-1.5 pt-2 border-t border-[#c4c8be]/30">
          {weather.forecast.slice(1, 4).map((f, idx) => (
            <div key={idx} className="bg-white/70 rounded-lg p-1.5 text-center text-[10px]">
              <div className="font-semibold text-[#191d18]">{f.dayName}</div>
              <div className="text-[#384b32] font-bold">
                {unit === "C" ? `${f.maxTemp}°` : `${Math.round((f.maxTemp * 9) / 5 + 32)}°`}
              </div>
              <div className="text-[#747870] text-[9px] truncate">{f.condition}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Full Expanded Real-Time Weather Hub View
  return (
    <div className="bg-white border border-[#c4c8be]/50 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#c4c8be]/30 pb-5">
        <div className="space-y-1">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#191d18]">
            Live Atmospheric Conditions & Forecast
          </h2>
        </div>

        {/* Region filter and Temperature Unit Switcher */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <div className="flex bg-[#f2f5ed] p-1 rounded-xl border border-[#c4c8be]/40 text-xs">
            <button
              onClick={() => setFilterMode("all")}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                filterMode === "all" ? "bg-[#384b32] text-white shadow-sm" : "text-[#555a50]"
              }`}
            >
              All Spots
            </button>
            <button
              onClick={() => setFilterMode("domestic")}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                filterMode === "domestic" ? "bg-[#384b32] text-white shadow-sm" : "text-[#555a50]"
              }`}
            >
              🇧🇩 Bangladesh
            </button>
            <button
              onClick={() => setFilterMode("crossborder")}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                filterMode === "crossborder" ? "bg-[#384b32] text-white shadow-sm" : "text-[#555a50]"
              }`}
            >
              🇮🇳 Cross-Border
            </button>
          </div>

          <button
            onClick={() => setUnit(unit === "C" ? "F" : "C")}
            className="px-3 py-1.5 rounded-xl bg-[#f2f5ed] text-xs font-bold border border-[#c4c8be]/60 text-[#384b32] hover:bg-[#ecefe7] transition-colors cursor-pointer"
          >
            Unit: °{unit}
          </button>

          <button
            onClick={() => loadWeather(selectedDestId)}
            className="p-2 rounded-xl bg-[#f2f5ed] text-[#384b32] border border-[#c4c8be]/60 hover:bg-[#ecefe7] transition-colors cursor-pointer"
            title="Refresh Live Weather"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Destination Pills Horizontal Scroller */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {destinationKeys.map((destKey) => {
          const item = DESTINATION_COORDINATES[destKey];
          const isSelected = selectedDestId === destKey;

          return (
            <button
              key={destKey}
              onClick={() => handleSelect(destKey)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer shrink-0 border ${
                isSelected
                  ? "bg-[#384b32] text-white border-[#384b32] shadow-sm scale-102"
                  : "bg-[#f2f5ed] text-[#555a50] border-[#c4c8be]/40 hover:bg-[#ecefe7] hover:text-[#191d18]"
              }`}
            >
              <MapPin className="w-3 h-3" />
              <span>{item.name}</span>
            </button>
          );
        })}
      </div>

      {/* Main Weather Display */}
      {loading || !weather ? (
        <div className="py-16 text-center space-y-3 bg-[#f2f5ed] rounded-2xl animate-pulse">
          <CloudSun className="w-8 h-8 text-[#384b32] mx-auto animate-bounce" />
          <p className="text-xs text-[#555a50] font-medium">Contacting live meteorological satellite for {currentMeta.name}...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Hero Card: Current Live Temperature & Atmospheric Metrics */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#f2f5ed] to-[#e6ece0] border border-[#c4c8be]/60 rounded-2xl p-6 flex flex-col justify-between space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-xs text-[#384b32] font-semibold uppercase tracking-wider">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{currentMeta.region} ({currentMeta.isDomestic ? "Bangladesh" : "Cross-Border"})</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#191d18] mt-1">
                  {weather.locationName}
                </h3>
                <span className="text-[11px] text-[#747870] font-medium">
                  Elevation: {currentMeta.elevationM}m • Climate: {currentMeta.climateZone}
                </span>
              </div>

              <div className="text-4xl">
                {interpretWeatherCode(weather.conditionCode, weather.isDay).icon}
              </div>
            </div>

            {/* Big Temperature Gauge */}
            <div className="flex items-baseline gap-3">
              <span className="font-serif text-5xl sm:text-6xl font-bold text-[#191d18]">
                {unit === "C" ? `${weather.tempC}°C` : `${weather.tempF}°F`}
              </span>
              <div className="space-y-0.5">
                <span className="px-2.5 py-0.5 rounded-full bg-[#384b32] text-white text-xs font-semibold block">
                  {weather.condition}
                </span>
                <span className="text-[11px] text-[#747870] block">
                  Feels like {unit === "C" ? `${weather.feelsLikeC}°C` : `${Math.round((weather.feelsLikeC * 9) / 5 + 32)}°F`}
                </span>
              </div>
            </div>

            {/* Atmospheric Metrics Grid */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#c4c8be]/40 text-center">
              <div className="bg-white/80 rounded-xl p-2.5 border border-[#c4c8be]/30">
                <Droplets className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                <span className="text-[10px] uppercase font-semibold text-[#747870] block">Humidity</span>
                <span className="font-bold text-xs text-[#191d18]">{weather.humidity}%</span>
              </div>
              <div className="bg-white/80 rounded-xl p-2.5 border border-[#c4c8be]/30">
                <Wind className="w-4 h-4 text-teal-600 mx-auto mb-1" />
                <span className="text-[10px] uppercase font-semibold text-[#747870] block">Wind Speed</span>
                <span className="font-bold text-xs text-[#191d18]">{weather.windSpeedKmH} km/h</span>
              </div>
              <div className="bg-white/80 rounded-xl p-2.5 border border-[#c4c8be]/30">
                <Thermometer className="w-4 h-4 text-amber-600 mx-auto mb-1" />
                <span className="text-[10px] uppercase font-semibold text-[#747870] block">UV Index</span>
                <span className="font-bold text-xs text-[#191d18]">{weather.uvIndex} / 10</span>
              </div>
            </div>
          </div>

          {/* Right Section: 4-Day Forecast Cards & Expedition Advice */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            {/* 4-Day Forecast Cards */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-[#747870]">
                <span className="font-semibold uppercase tracking-wider">4-Day Meteorological Outlook</span>
                <span>Live Satellite Sync: {weather.lastUpdated}</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {weather.forecast.map((f, idx) => {
                  const maxDisplay = unit === "C" ? `${f.maxTemp}°C` : `${Math.round((f.maxTemp * 9) / 5 + 32)}°F`;
                  const minDisplay = unit === "C" ? `${f.minTemp}°C` : `${Math.round((f.minTemp * 9) / 5 + 32)}°F`;
                  const icon = interpretWeatherCode(f.conditionCode, true).icon;

                  return (
                    <div
                      key={idx}
                      className={`bg-[#f2f5ed] border rounded-2xl p-3.5 text-center flex flex-col justify-between space-y-2 ${
                        idx === 0 ? "border-[#384b32] bg-[#eef3e8]" : "border-[#c4c8be]/40"
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-[#191d18]">{f.dayName}</span>
                        <span className="text-base">{icon}</span>
                      </div>

                      <div className="space-y-0.5">
                        <span className="font-serif text-lg font-bold text-[#191d18] block">
                          {maxDisplay}
                        </span>
                        <span className="text-[11px] text-[#747870] block">
                          Low: {minDisplay}
                        </span>
                      </div>

                      <div className="pt-2 border-t border-[#c4c8be]/30 text-[10px] space-y-0.5">
                        <span className="text-[#384b32] font-semibold block truncate">
                          {f.condition}
                        </span>
                        <span className="text-[#747870] block">
                          Rain: {f.rainProbability}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Smart Expedition Advice Box */}
            <div className="bg-[#f7faf3] border border-[#c4c8be]/50 rounded-2xl p-4 flex items-start gap-3">
              <div className="p-2 rounded-xl bg-[#384b32]/10 text-[#384b32] shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="space-y-1 text-xs">
                <span className="font-semibold text-[#191d18] uppercase tracking-wider block">
                  Weather Advisory for {weather.locationName}:
                </span>
                <p className="text-[#555a50] leading-relaxed">
                  {currentMeta.expeditionAdvice}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
