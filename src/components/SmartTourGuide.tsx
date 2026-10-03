import React, { useState } from "react";
import { 
  Sparkles, 
  ShieldAlert, 
  Clock, 
  CloudSun, 
  CheckSquare, 
  BookOpen, 
  PhoneCall, 
  Check, 
  Compass, 
  MapPin, 
  Sun, 
  CloudRain, 
  ChevronRight,
  Info,
  Car,
  AlertTriangle
} from "lucide-react";

interface SmartTourGuideProps {
  onNavigateToDestinations?: () => void;
}

export const SmartTourGuide: React.FC<SmartTourGuideProps> = ({ onNavigateToDestinations }) => {
  const [activeTab, setActiveTab] = useState<"convoy" | "forecast" | "checklist" | "phrasebook" | "safety">("convoy");

  // Dynamic Packing Checklist State
  const [selectedExpeditionType, setSelectedExpeditionType] = useState<"canyon_trek" | "cloud_hill" | "coral_island" | "himalayan_pass">("canyon_trek");
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const PACKING_PRESETS = {
    canyon_trek: {
      title: "Bandarban Deep Canyon & Waterfall Trek (Nafakhum / Debotakhum)",
      items: [
        "Non-slip river plastic/rubber trekking sandals (e.g., Bata Pegan / local anti-slip)",
        "Waterproof 20L dry bag for phones, wallets, cameras, and power banks",
        "Leech guard socks / tobacco leaves & salt pouch for rainforest trails",
        "Fast-drying lightweight polyester trekking pants and long-sleeve shirts",
        "Oral rehydration saline (ORS), water purification tablets, and first aid kit",
        "High-lumen waterproof headlamp for cave sections and night treks",
        "Valid National ID (NID) / Passport copies (6 printed copies required for BGB checkposts)",
        "Cash in small denominations (৳100, ৳500 notes — no ATMs in Thanchi/Remakri)"
      ]
    },
    cloud_hill: {
      title: "Sajek Valley & Nilgiri Cloud Highland Safari",
      items: [
        "Light windbreaker jacket or fleece (temperatures drop to 14°C at dawn on ridges)",
        "Power banks & multi-plug extension (voltage fluctuations common in hill paras)",
        "Motion sickness tablets for steep Chander Gari hairpin switchbacks",
        "Sturdy walking sneakers for ascending Kanglak peak stone stairs",
        "High-SPF sunscreen & sunglasses (high UV index above cloud line)",
        "Insect repellent lotion (Odomos) for evening campfire walks",
        "Printed hotel/cottage booking vouchers for army checkpost registration"
      ]
    },
    coral_island: {
      title: "Saint Martin's Coral Reef & Chera Dwip",
      items: [
        "Snorkeling mask & silicone snorkel with dry top",
        "Reef-safe biodegradable sunscreen (protects fragile live coral polyps)",
        "Waterproof phone pouch with neck lanyard",
        "Wide-brim UV straw sunhat and polarized UV400 sunglasses",
        "Light cotton beachwear, rashguards, and quick-dry microfiber towel",
        "Personal mosquito repeller and basic stomach soothing medicines"
      ]
    },
    himalayan_pass: {
      title: "Meghalaya, Darjeeling & Sikkim High Pass Expedition",
      items: [
        "Heavy down jacket, thermal inner wear, and woolen beanie for Tiger Hill/Tsomgo (0°C)",
        "Original Passport + 4 passport-size photographs + Indian Visa for border crossing",
        "Protected Area Permit (PAP) application for Sikkim & Nathula Border Pass",
        "Diamox / Altitude sickness medication for ascending above 12,000 ft",
        "Universal international power adapter & thermal insulated water flask"
      ]
    }
  };

  const toggleCheck = (item: string) => {
    setCheckedItems(prev => ({ ...prev, [item]: !prev[item] }));
  };

  const currentItems = PACKING_PRESETS[selectedExpeditionType].items;
  const completedCount = currentItems.filter(i => checkedItems[i]).length;
  const progressPct = Math.round((completedCount / currentItems.length) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#c4c8be]/40 pb-6">
        <div className="space-y-2">
          <h1 className="font-serif text-3xl sm:text-4xl font-medium text-[#191d18]">
            Smart Tour Guide & Expedition Radar
          </h1>
        </div>

        {/* Navigation Tabs */}
        <div className="flex bg-[#f2f5ed] p-1 rounded-xl border border-[#c4c8be]/40 shrink-0 overflow-x-auto text-xs">
          {[
            { id: "convoy", label: "🎖️ Military Convoy Radar" },
            { id: "forecast", label: "☁️ Cloud & Haor Forecast" },
            { id: "checklist", label: "🎒 Smart Gear Checklist" },
            { id: "phrasebook", label: "🗣️ Indigenous Phrasebook" },
            { id: "safety", label: "🛡️ Safety & Hotlines" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? "bg-[#384b32] text-white shadow-sm"
                  : "text-[#555a50] hover:text-[#191d18]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* TAB 1: MILITARY CONVOY & CHECKPOST RADAR */}
      {activeTab === "convoy" && (
        <div className="space-y-6">
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3 text-xs text-amber-900">
            <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold block text-sm">Critical Hill Convoy Protocol:</strong>
              Civilian vehicles and Chander Gari jeeps traveling between Khagrachhari/Dighinala and Sajek Valley MUST travel inside the Bangladesh Army escorted convoy. Missing a convoy slot requires waiting for the next escort.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Sajek Convoy Schedule */}
            <div className="bg-white border border-[#c4c8be]/40 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-[#c4c8be]/30 pb-3">
                <div className="flex items-center gap-2">
                  <Car className="w-4 h-4 text-[#384b32]" />
                  <h3 className="font-serif text-lg font-medium text-[#191d18]">
                    Sajek Valley Convoy (Dighinala)
                  </h3>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  ACTIVE DAILY
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-[#f2f5ed] rounded-xl border border-[#c4c8be]/30 space-y-1">
                  <div className="font-semibold text-[#191d18]">Morning Slot (Up to Sajek):</div>
                  <div className="text-sm font-serif font-bold text-[#384b32]">10:30 AM Sharp</div>
                  <div className="text-[11px] text-[#747870]">Dighinala Army Camp Gate → Sajek Valley</div>
                </div>

                <div className="p-3 bg-[#f2f5ed] rounded-xl border border-[#c4c8be]/30 space-y-1">
                  <div className="font-semibold text-[#191d18]">Afternoon Slot (Up to Sajek):</div>
                  <div className="text-sm font-serif font-bold text-[#384b32]">03:30 PM Sharp</div>
                  <div className="text-[11px] text-[#747870]">Dighinala Army Camp Gate → Sajek Valley</div>
                </div>

                <div className="p-3 bg-[#f9faf7] rounded-xl border border-[#c4c8be]/30 space-y-1">
                  <div className="font-semibold text-[#191d18]">Return Slots (Sajek Down to Khagrachhari):</div>
                  <div className="text-xs font-bold text-[#191d18]">Slot 1: 10:00 AM • Slot 2: 03:00 PM</div>
                </div>
              </div>
            </div>

            {/* Thanchi & Nafakhum BGB Checkpost */}
            <div className="bg-white border border-[#c4c8be]/40 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-[#c4c8be]/30 pb-3">
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#384b32]" />
                  <h3 className="font-serif text-lg font-medium text-[#191d18]">
                    Thanchi & Remakri BGB Radar
                  </h3>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">
                  REGISTRATION MANDATORY
                </span>
              </div>

              <div className="space-y-3 text-xs text-[#555a50]">
                <p>
                  All travelers heading past Thanchi to Remakri, Nafakhum, or Amiakhum must submit <strong>photocopies of National ID (NID)</strong> and register with a certified indigenous hill guide at the Thanchi BGB Checkpost.
                </p>
                <div className="p-3 bg-[#f2f5ed] rounded-xl border border-[#c4c8be]/30 space-y-1 text-xs">
                  <div className="font-semibold text-[#191d18]">Boat Cut-off Time at Thanchi Ghat:</div>
                  <div className="text-sm font-serif font-bold text-rose-800">03:00 PM (No boats permitted after)</div>
                  <div className="text-[11px] text-[#747870]">Sangu River rapids are restricted at twilight for safety.</div>
                </div>
              </div>
            </div>

            {/* Tamabil / Dawki Cross-Border Radar */}
            <div className="bg-white border border-[#c4c8be]/40 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-[#c4c8be]/30 pb-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#384b32]" />
                  <h3 className="font-serif text-lg font-medium text-[#191d18]">
                    Tamabil / Dawki Border Gate
                  </h3>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800">
                  CROSS-BORDER
                </span>
              </div>

              <div className="space-y-3 text-xs text-[#555a50]">
                <div className="p-3 bg-[#f2f5ed] rounded-xl border border-[#c4c8be]/30 space-y-1">
                  <div className="font-semibold text-[#191d18]">Immigration Operational Hours:</div>
                  <div className="text-sm font-serif font-bold text-[#384b32]">09:00 AM – 05:00 PM Daily</div>
                  <div className="text-[11px] text-[#747870]">Ensure valid Indian Visa & Bangladesh travel tax paid.</div>
                </div>
                <div className="p-3 bg-[#f9faf7] rounded-xl border border-[#c4c8be]/30 text-xs">
                  <div className="font-semibold text-[#191d18]">Permits for Sikkim / Nathula:</div>
                  <div className="text-[11px] text-[#747870]">Requires Inner Line Permit (ILP) obtained via Siliguri/Gangtok Tourism Center.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CLOUD SEA & HAOR WATER FORECAST */}
      {activeTab === "forecast" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sajek Cloud Sea Index */}
          <div className="bg-white border border-[#c4c8be]/40 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#384b32]">
                Sajek Valley & Nilgiri Peak
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                OPTIMAL
              </span>
            </div>
            <h3 className="font-serif text-xl font-medium text-[#191d18]">
              Cloud Sea (মেঘের সাগর) Probability
            </h3>
            <div className="text-4xl font-serif font-bold text-[#384b32]">
              94%
            </div>
            <p className="text-xs text-[#555a50] leading-relaxed">
              High humidity following morning dew produces sweeping blankets of dense white clouds from <strong>5:30 AM to 8:30 AM</strong>. Optimal viewing from Helipad 1 and Kanglak Peak.
            </p>
          </div>

          {/* Tanguar Haor Water Depth Index */}
          <div className="bg-white border border-[#c4c8be]/40 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#384b32]">
                Tanguar Haor & Sunamganj
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">
                FULL WETLAND
              </span>
            </div>
            <h3 className="font-serif text-xl font-medium text-[#191d18]">
              Haor Navigability & Greenery
            </h3>
            <div className="text-4xl font-serif font-bold text-blue-800">
              9.2 / 10
            </div>
            <p className="text-xs text-[#555a50] leading-relaxed">
              High water levels allow luxury wooden houseboats to cruise deep into raw mangrove swamps (Hijal-Koroch groves) and anchor directly beside Niladri Lake.
            </p>
          </div>

          {/* Kanchenjunga Peak Visibility */}
          <div className="bg-white border border-[#c4c8be]/40 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#384b32]">
                Darjeeling & Tentulia Border
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800">
                HIGH CLARITY
              </span>
            </div>
            <h3 className="font-serif text-xl font-medium text-[#191d18]">
              Mt. Kanchenjunga Visibility Score
            </h3>
            <div className="text-4xl font-serif font-bold text-purple-900">
              88%
            </div>
            <p className="text-xs text-[#555a50] leading-relaxed">
              Crisp morning skies offer unhindered vistas of the third highest peak on earth glowing in golden dawn light from Tiger Hill (Darjeeling) and Tentulia (Bangladesh).
            </p>
          </div>
        </div>
      )}

      {/* TAB 3: SMART GEAR & PACKING CHECKLIST */}
      {activeTab === "checklist" && (
        <div className="bg-white border border-[#c4c8be]/40 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#c4c8be]/30 pb-6">
            <div>
              <h2 className="font-serif text-2xl font-medium text-[#191d18]">
                Expedition Packing Checklist Generator
              </h2>
              <p className="text-xs text-[#555a50] mt-1">
                Select your upcoming circuit type for tailored gear recommendations.
              </p>
            </div>

            {/* Circuit Selector */}
            <div className="flex flex-wrap gap-2 text-xs">
              {[
                { id: "canyon_trek", label: "🏞️ Canyon & Waterfall Trek" },
                { id: "cloud_hill", label: "☁️ Sajek & Nilgiri Hills" },
                { id: "coral_island", label: "🏝️ Saint Martin Coral" },
                { id: "himalayan_pass", label: "🏔️ Himalayan Cross-Border" },
              ].map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => setSelectedExpeditionType(btn.id as any)}
                  className={`px-3 py-1.5 rounded-xl font-semibold border transition-all cursor-pointer ${
                    selectedExpeditionType === btn.id
                      ? "bg-[#384b32] text-white border-[#384b32]"
                      : "bg-[#f9faf7] text-[#555a50] border-[#c4c8be]/40 hover:bg-[#ecefe7]"
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[#191d18]">
                {PACKING_PRESETS[selectedExpeditionType].title}
              </span>
              <span className="font-bold text-[#384b32]">
                {completedCount} / {currentItems.length} packed ({progressPct}%)
              </span>
            </div>
            <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                style={{ width: `${progressPct}%` }}
                className="h-full bg-[#384b32] transition-all duration-300 rounded-full"
              />
            </div>
          </div>

          {/* Checklist Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            {currentItems.map((item, idx) => {
              const isChecked = !!checkedItems[item];
              return (
                <div
                  key={idx}
                  onClick={() => toggleCheck(item)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                    isChecked
                      ? "bg-[#f2f5ed] border-[#384b32] text-[#191d18]"
                      : "bg-[#f9faf7] border-[#c4c8be]/40 text-[#555a50] hover:border-[#384b32]/50"
                  }`}
                >
                  <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    isChecked ? "bg-[#384b32] border-[#384b32] text-white" : "border-[#c4c8be] bg-white"
                  }`}>
                    {isChecked && <Check className="w-3.5 h-3.5" />}
                  </div>
                  <span className={`text-xs ${isChecked ? "line-through opacity-70" : "font-medium"}`}>
                    {item}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 4: INDIGENOUS PHRASEBOOK */}
      {activeTab === "phrasebook" && (
        <div className="space-y-6">
          <div className="text-xs text-[#555a50]">
            Use these respectful local words and phrases when interacting with indigenous Marma, Bawm, Chakma, and Sylheti communities in hill tracts and wetlands:
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Marma Dialect (Bandarban) */}
            <div className="bg-white border border-[#c4c8be]/40 rounded-2xl p-5 shadow-sm space-y-3 text-xs">
              <div className="flex items-center justify-between border-b border-[#c4c8be]/30 pb-2">
                <span className="font-serif text-base font-medium text-[#191d18]">Marma (Bandarban / Thanchi)</span>
                <span className="text-[10px] font-bold text-[#384b32] uppercase">Hill Language</span>
              </div>
              <div className="space-y-2">
                <div>
                  <span className="text-[#747870] block text-[10px]">Hello / Greeting:</span>
                  <strong className="text-[#191d18]">"Mingalaba" (မင်္ဂလာပါ)</strong>
                </div>
                <div>
                  <span className="text-[#747870] block text-[10px]">Thank you very much:</span>
                  <strong className="text-[#191d18]">"Cezuba" (ကျေးဇူးပါ)</strong>
                </div>
                <div>
                  <span className="text-[#747870] block text-[10px]">How much is the boat fare?</span>
                  <strong className="text-[#191d18]">"Long-ka bhalo le?"</strong>
                </div>
                <div>
                  <span className="text-[#747870] block text-[10px]">Drinking water:</span>
                  <strong className="text-[#191d18]">"Ye" (ရေ)</strong>
                </div>
              </div>
            </div>

            {/* Chakma Dialect (Rangamati & Sajek) */}
            <div className="bg-white border border-[#c4c8be]/40 rounded-2xl p-5 shadow-sm space-y-3 text-xs">
              <div className="flex items-center justify-between border-b border-[#c4c8be]/30 pb-2">
                <span className="font-serif text-base font-medium text-[#191d18]">Chakma (Rangamati / Sajek)</span>
                <span className="text-[10px] font-bold text-[#384b32] uppercase">Hill Language</span>
              </div>
              <div className="space-y-2">
                <div>
                  <span className="text-[#747870] block text-[10px]">Hello / Are you well?</span>
                  <strong className="text-[#191d18]">"Ju, komot aso?"</strong>
                </div>
                <div>
                  <span className="text-[#747870] block text-[10px]">Thank you:</span>
                  <strong className="text-[#191d18]">"Bhalo thakiben"</strong>
                </div>
                <div>
                  <span className="text-[#747870] block text-[10px]">Where is the village chief?</span>
                  <strong className="text-[#191d18]">"Karbari khane ason?"</strong>
                </div>
                <div>
                  <span className="text-[#747870] block text-[10px]">Delicious food:</span>
                  <strong className="text-[#191d18]">"Bhoro shwad bhat"</strong>
                </div>
              </div>
            </div>

            {/* Sylheti Dialect (Sylhet & Tanguar Haor) */}
            <div className="bg-white border border-[#c4c8be]/40 rounded-2xl p-5 shadow-sm space-y-3 text-xs">
              <div className="flex items-center justify-between border-b border-[#c4c8be]/30 pb-2">
                <span className="font-serif text-base font-medium text-[#191d18]">Sylheti (Haor & Tea Valleys)</span>
                <span className="text-[10px] font-bold text-[#384b32] uppercase">Wetland Dialect</span>
              </div>
              <div className="space-y-2">
                <div>
                  <span className="text-[#747870] block text-[10px]">How are you?</span>
                  <strong className="text-[#191d18]">"Bhalani asoin?" (ভালা আছইন?)</strong>
                </div>
                <div>
                  <span className="text-[#747870] block text-[10px]">Where is the boat going?</span>
                  <strong className="text-[#191d18]">"Nouka khane jayba?"</strong>
                </div>
                <div>
                  <span className="text-[#747870] block text-[10px]">Very good / sweet tea:</span>
                  <strong className="text-[#191d18]">"Khub bala cha"</strong>
                </div>
                <div>
                  <span className="text-[#747870] block text-[10px]">How much is this?</span>
                  <strong className="text-[#191d18]">"Koto toka loiba?"</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: SAFETY & 24/7 TOURIST HOTLINES */}
      {activeTab === "safety" && (
        <div className="bg-white border border-[#c4c8be]/40 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-[#c4c8be]/30 pb-4">
            <h2 className="font-serif text-2xl font-medium text-[#191d18]">
              Emergency Rescue & Tourist Police Hotline Registry
            </h2>
            <p className="text-xs text-[#555a50] mt-1">
              Official verified emergency support contacts for travel across Bangladesh and border hill states.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-[#f2f5ed] rounded-2xl border border-[#384b32]/20 space-y-1.5 text-xs">
              <span className="text-[10px] font-semibold text-[#384b32] uppercase block">National Emergency</span>
              <div className="font-serif text-2xl font-bold text-[#191d18]">999</div>
              <p className="text-[11px] text-[#747870]">Police, Ambulance, Fire & Hill Disaster Response</p>
            </div>

            <div className="p-4 bg-[#f2f5ed] rounded-2xl border border-[#384b32]/20 space-y-1.5 text-xs">
              <span className="text-[10px] font-semibold text-[#384b32] uppercase block">Sajek Tourist Police</span>
              <div className="font-serif text-base font-bold text-[#191d18]">+880 1320-179999</div>
              <p className="text-[11px] text-[#747870]">24/7 Convoy Security & Hill Aid</p>
            </div>

            <div className="p-4 bg-[#f2f5ed] rounded-2xl border border-[#384b32]/20 space-y-1.5 text-xs">
              <span className="text-[10px] font-semibold text-[#384b32] uppercase block">Cox's Bazar Beach Police</span>
              <div className="font-serif text-base font-bold text-[#191d18]">+880 1320-179998</div>
              <p className="text-[11px] text-[#747870]">Marine Drive & Beach Watch</p>
            </div>

            <div className="p-4 bg-[#f2f5ed] rounded-2xl border border-[#384b32]/20 space-y-1.5 text-xs">
              <span className="text-[10px] font-semibold text-[#384b32] uppercase block">Bandarban Hill Guide Desk</span>
              <div className="font-serif text-base font-bold text-[#191d18]">+880 1819-543210</div>
              <p className="text-[11px] text-[#747870]">Nafakhum & Debotakhum Certified Guides</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
