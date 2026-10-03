import React, { useState } from "react";
import { Compass, User, LogIn, Menu, X, Calculator, ShieldCheck, MapPin, Sparkles, Flame } from "lucide-react";
import { UserProfile } from "../types";

interface HeaderProps {
  user: UserProfile | null;
  onOpenAuth: () => void;
  activePage: string;
  onNavigate: (page: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  onOpenAuth,
  activePage,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "destinations", label: "Destinations" },
    { id: "activities", label: "Activities" },
    { id: "smartguide", label: "Smart Guide" },
    { id: "transport", label: "Chander Gari" },
    { id: "budget", label: "Budget" },
    { id: "discovery", label: "Accommodations" },
    { id: "saved", label: "My Trips" },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#f7faf3]/95 backdrop-blur-md border-b border-[#c4c8be]/40 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Zone 1: Brand Title */}
          <div
            onClick={() => handleNavClick(user ? "destinations" : "home")}
            className="flex items-center gap-2.5 cursor-pointer group shrink-0"
          >
            <div className="w-9 h-9 rounded-xl bg-[#384b32] text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <Compass className="w-5 h-5 text-[#fdcb9b]" />
            </div>
            <span className="font-serif text-2xl font-bold tracking-tight text-[#191d18] whitespace-nowrap">
              Chandergari
            </span>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-1.5">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`font-sans text-xs uppercase tracking-wider font-semibold py-2 px-3 lg:px-3.5 rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  activePage === item.id
                    ? "bg-[#384b32] text-white shadow-sm"
                    : "text-[#555a50] hover:text-[#191d18] hover:bg-[#ecefe7]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Zone 3: Primary Action / User Profile */}
          <div className="flex items-center gap-3 shrink-0">
            {user ? (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-full bg-[#f2f5ed] border border-[#c4c8be]/50 hover:bg-[#ecefe7] transition-colors whitespace-nowrap cursor-pointer"
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="User Avatar"
                    className="w-7 h-7 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-[#384b32] text-white flex items-center justify-center text-xs font-bold">
                    {user.displayName?.[0] || "T"}
                  </div>
                )}
                <span className="hidden sm:inline font-sans text-xs font-medium text-[#191d18] max-w-[120px] truncate">
                  {user.displayName || "Traveler"}
                </span>
              </button>
            ) : (
              <button
                onClick={onOpenAuth}
                className="bg-[#384b32] text-white font-sans text-xs uppercase tracking-wider font-semibold py-2.5 px-4 rounded-xl hover:bg-[#486040] transition-colors flex items-center gap-2 shadow-sm whitespace-nowrap shrink-0 cursor-pointer"
              >
                <LogIn className="w-4 h-4 text-[#fdcb9b]" />
                <span>Sign In / Join</span>
              </button>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-[#555a50] hover:bg-[#ecefe7]"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#c4c8be]/40 bg-[#f7faf3] px-4 pt-3 pb-5 space-y-1 shadow-lg animate-in slide-in-from-top-2 duration-200">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left font-sans text-xs uppercase tracking-wider font-semibold py-3 px-4 rounded-xl transition-colors ${
                activePage === item.id
                  ? "bg-[#384b32] text-white"
                  : "text-[#555a50] hover:bg-[#ecefe7]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
