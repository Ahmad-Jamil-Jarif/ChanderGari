import React, { useState, useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, getUserBookings, saveBooking, deleteBooking } from "./firebase";
import { UserProfile, BookingRecord } from "./types";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { HeroLanding } from "./components/HeroLanding";
import { DestinationsGrid } from "./components/DestinationsGrid";
import { AdventureActivities } from "./components/AdventureActivities";
import { SmartTourGuide } from "./components/SmartTourGuide";
import { TransportOptions } from "./components/TransportOptions";
import { TourBudgetCalculator } from "./components/TourBudgetCalculator";
import { LocalDiscovery } from "./components/LocalDiscovery";
import { SavedTripsPage } from "./components/SavedTripsPage";
import { AuthModal } from "./components/AuthModal";
import { Lock, LogIn, Compass, ArrowRight } from "lucide-react";

export function App() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [activePage, setActivePage] = useState<string>("home");
  const [savedDestinationIds, setSavedDestinationIds] = useState<string[]>([]);
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [authLoading, setAuthLoading] = useState(true);

  // 1. Listen to Firebase Auth state or stored session
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const uProfile: UserProfile = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName || (firebaseUser.isAnonymous ? "Chandergari Traveler" : "Traveler"),
          photoURL: firebaseUser.photoURL,
          isAnonymous: firebaseUser.isAnonymous,
        };
        setUser(uProfile);
        loadUserBookings(uProfile.uid);
      } else {
        // Check session storage
        const stored = sessionStorage.getItem("chandergari_user_session");
        if (stored) {
          try {
            const parsed = JSON.parse(stored);
            setUser(parsed);
            loadUserBookings(parsed.uid);
          } catch {
            setUser(null);
          }
        } else {
          setUser(null);
          setBookings([]);
        }
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 2. Load User Bookings & Local Saved Trips
  const loadUserBookings = async (uid: string) => {
    try {
      const userBookings = await getUserBookings(uid);
      setBookings(userBookings);
    } catch (err) {
      console.warn("Could not load user bookings:", err);
    }
  };

  // 3. Navigation with Strict Login Gate
  const handleNavigate = (page: string) => {
    // If not logged in and trying to access internal content, open Auth Modal and block
    if (page !== "home" && !user) {
      setAuthModalOpen(true);
      return;
    }
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 4. Handle Login Success -> Directly Navigate to Destinations Page
  const handleLoginSuccess = () => {
    setActivePage("destinations");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 5. Save Destination Toggle
  const handleToggleSaveDestination = (id: string) => {
    if (!user) {
      setAuthModalOpen(true);
      return;
    }
    setSavedDestinationIds((prev) =>
      prev.includes(id) ? prev.filter((dId) => dId !== id) : [...prev, id]
    );
  };

  // 6. Booking Handler
  const handleSaveBooking = async (bookingData: Omit<BookingRecord, "id" | "userId">) => {
    if (!user) {
      setAuthModalOpen(true);
      return;
    }

    try {
      const record = await saveBooking({
        ...bookingData,
        userId: user.uid,
      });
      setBookings((prev) => [record, ...prev.filter((b) => b.id !== record.id)]);
    } catch (err) {
      console.error("Booking error:", err);
    }
  };

  // 7. Delete Booking Handler
  const handleDeleteBooking = async (id: string) => {
    try {
      await deleteBooking(id);
      setBookings((prev) => prev.filter((b) => b.id !== id && b.bookedAt !== id));
    } catch (err) {
      console.error("Delete booking error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7faf3] text-[#191d18] flex flex-col font-sans selection:bg-[#384b32] selection:text-white">
      {/* Universal Header */}
      <Header
        user={user}
        onOpenAuth={() => setAuthModalOpen(true)}
        activePage={activePage}
        onNavigate={handleNavigate}
      />

      {/* Main Content Area */}
      <main className="flex-1 pt-24 pb-12">
        {/* If user is NOT logged in and on Home: Display Dedicated Landing Page */}
        {activePage === "home" && (
          <HeroLanding
            onNavigatePage={handleNavigate}
            onOpenAuth={() => setAuthModalOpen(true)}
            isLoggedIn={!!user}
          />
        )}

        {/* STRICT AUTH GUARD FOR INNER CONTENT */}
        {!user && activePage !== "home" && (
          <div className="max-w-md mx-auto px-4 py-20 text-center space-y-6 animate-in fade-in">
            <div className="w-16 h-16 rounded-full bg-[#384b32]/10 text-[#384b32] flex items-center justify-center mx-auto">
              <Lock className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h2 className="font-serif text-2xl font-bold text-[#191d18]">
                Sign In Required
              </h2>
              <p className="text-xs text-[#555a50] leading-relaxed">
                To view internal destinations, book Chander Gari rovers, experience adventure sports, check live convoy radar, and calculate tour budgets, please sign in to your Chandergari account.
              </p>
            </div>
            <button
              onClick={() => setAuthModalOpen(true)}
              className="w-full bg-[#384b32] text-white font-sans text-xs uppercase tracking-wider font-semibold py-3.5 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              <LogIn className="w-4 h-4 text-[#fdcb9b]" />
              <span>Sign In & Go to Destinations</span>
            </button>
          </div>
        )}

        {/* LOGGED IN INNER PAGES */}
        {user && activePage === "destinations" && (
          <DestinationsGrid
            savedDestinationIds={savedDestinationIds}
            onToggleSaveDestination={handleToggleSaveDestination}
            onSaveItinerary={handleSaveBooking}
          />
        )}

        {user && activePage === "activities" && (
          <AdventureActivities
            onSaveActivity={handleSaveBooking}
            onNavigateToBudget={() => handleNavigate("budget")}
          />
        )}

        {user && activePage === "smartguide" && (
          <SmartTourGuide
            onNavigateToDestinations={() => handleNavigate("destinations")}
          />
        )}

        {user && activePage === "transport" && (
          <TransportOptions
            onSaveBooking={handleSaveBooking}
            onNavigateToBudget={() => handleNavigate("budget")}
          />
        )}

        {user && activePage === "budget" && (
          <TourBudgetCalculator
            onSaveBudget={handleSaveBooking}
            onNavigate={handleNavigate}
          />
        )}

        {user && activePage === "discovery" && (
          <LocalDiscovery onSaveExperience={handleSaveBooking} />
        )}

        {user && activePage === "saved" && (
          <SavedTripsPage
            bookings={bookings}
            onDeleteBooking={handleDeleteBooking}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Universal Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        user={user}
        onSetUser={(u) => {
          setUser(u);
          if (u) {
            loadUserBookings(u.uid);
          } else {
            setActivePage("home");
          }
        }}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}
export default App;
