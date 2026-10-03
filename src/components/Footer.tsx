import React from "react";
import { Compass, MapPin, Phone, Mail, ShieldCheck, Heart } from "lucide-react";

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#191d18] text-[#c4c8be] border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="space-y-4 md:col-span-1">
            <div
              onClick={() => onNavigate("home")}
              className="flex items-center gap-2 cursor-pointer group inline-flex"
            >
              <div className="w-8 h-8 rounded-xl bg-[#384b32] text-white flex items-center justify-center">
                <Compass className="w-4 h-4 text-[#fdcb9b]" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                Chandergari
              </span>
            </div>
            <p className="text-xs text-[#8e9289] leading-relaxed">
              Journey Through Clouds, Rivers & Timeless Horizons.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold text-white uppercase tracking-wider">
              Explore
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate("destinations")}
                  className="hover:text-white transition-colors"
                >
                  Destinations & City Guides
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("transport")}
                  className="hover:text-white transition-colors"
                >
                  Chander Gari & Transport Fleet
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("budget")}
                  className="hover:text-white transition-colors"
                >
                  Tour Budget Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("discovery")}
                  className="hover:text-white transition-colors"
                >
                  Local Discovery & Heritage
                </button>
              </li>
            </ul>
          </div>

          {/* Bangladeshi Highlights */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold text-white uppercase tracking-wider">
              Signature Routes
            </h4>
            <ul className="space-y-2 text-xs text-[#8e9289]">
              <li>Sajek Valley & Ruilui Para</li>
              <li>Bandarban & Nilgiri Peak</li>
              <li>Cox's Bazar & Marine Drive</li>
              <li>Saint Martin's Island & Chera Dwip</li>
              <li>Tanguar Haor & Sunamganj</li>
            </ul>
          </div>

          {/* Trust & Contact */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold text-white uppercase tracking-wider">
              Travel Assurance
            </h4>
            <div className="space-y-2 text-xs text-[#8e9289]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#384b32]" />
                <span>Verified Hill Escorts & Drivers</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#384b32]" />
                <span>Instant Offline & Cloud Sync</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#384b32]" />
                <span>Zero Hidden Fees & Real Pricing</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8e9289]">
          <p>© {new Date().getFullYear()} Chandergari Travel. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Crafted for explorers of Bengal & beyond</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
