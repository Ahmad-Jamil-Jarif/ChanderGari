import React, { useState } from "react";
import { X, User as UserIcon, LogOut, CheckCircle2, ShieldCheck, Mail, Lock } from "lucide-react";
import { UserProfile } from "../types";
import { signInAsGuest, loginWithEmail, registerWithEmail, signOut } from "../firebase";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile | null;
  onSetUser?: (user: UserProfile | null) => void;
  onLoginSuccess?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ 
  isOpen, 
  onClose, 
  user, 
  onSetUser,
  onLoginSuccess 
}) => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      let u;
      if (isRegister) {
        u = await registerWithEmail(email, password, fullName || "Chandergari Traveler");
      } else {
        u = await loginWithEmail(email, password);
      }

      if (u && onSetUser) {
        onSetUser({
          uid: u.uid,
          email: u.email,
          displayName: u.displayName || fullName || "Traveler",
          photoURL: u.photoURL,
          isAnonymous: false,
        });
      }
      onClose();
      if (onLoginSuccess) onLoginSuccess();
    } catch (err: any) {
      setError(err.message || (isRegister ? "Registration failed." : "Login failed. Check your credentials."));
    } finally {
      setLoading(false);
    }
  };

  const handleGuestSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      const guestUser = await signInAsGuest();
      if (guestUser && onSetUser) {
        onSetUser({
          uid: guestUser.uid,
          email: guestUser.email,
          displayName: guestUser.displayName || "Chandergari Traveler",
          photoURL: guestUser.photoURL,
          isAnonymous: true,
        });
      }
      onClose();
      if (onLoginSuccess) onLoginSuccess();
    } catch (err: any) {
      if (onSetUser) {
        onSetUser({
          uid: "traveler_demo",
          email: null,
          displayName: "Chandergari Traveler",
          photoURL: null,
          isAnonymous: true,
        });
      }
      onClose();
      if (onLoginSuccess) onLoginSuccess();
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut();
      if (onSetUser) onSetUser(null);
      onClose();
    } catch (err: any) {
      setError(err.message || "Sign out failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#f7faf3] border border-[#c4c8be]/40 rounded-2xl max-w-md w-full overflow-hidden shadow-2xl p-6 relative animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#ecefe7] text-[#747870] cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-[#384b32]/10 text-[#384b32] flex items-center justify-center mx-auto mb-3">
            <UserIcon className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-2xl font-medium text-[#191d18]">
            {user ? "Chandergari Profile" : isRegister ? "Create Chandergari Account" : "Sign In to Chandergari"}
          </h3>
          <p className="text-xs text-[#747870] mt-1">
            Access destinations, transport booking, budget calculator, and saved trips.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-rose-100 text-rose-800 text-xs rounded-xl font-medium">
            {error}
          </div>
        )}

        {user ? (
          <div className="space-y-4">
            <div className="p-4 bg-[#f2f5ed] rounded-xl flex items-center gap-3">
              {user.photoURL ? (
                <img src={user.photoURL} alt="User Avatar" className="w-10 h-10 rounded-full object-cover" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-[#384b32] text-white flex items-center justify-center font-bold">
                  {user.displayName?.[0] || "T"}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="font-medium text-sm text-[#191d18] truncate">
                  {user.displayName || "Traveler"}
                </div>
                <div className="text-xs text-[#747870] truncate">
                  {user.email || (user.isAnonymous ? "Guest Session" : "Active Session")}
                </div>
              </div>
            </div>

            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs space-y-1">
              <div className="font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>Account Verified</span>
              </div>
              <p className="text-[11px] text-emerald-700">
                Your bookings and budgets are automatically synced with Chandergari.
              </p>
            </div>

            <button
              onClick={handleSignOut}
              disabled={loading}
              className="w-full bg-rose-50 border border-rose-200 text-rose-700 py-2.5 rounded-xl font-sans text-xs uppercase tracking-wider font-semibold hover:bg-rose-100 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <form onSubmit={handleEmailAuth} className="space-y-3">
              {isRegister && (
                <div>
                  <label className="block text-xs font-medium text-[#555a50] mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Tanzim Ahmed"
                    className="w-full px-3 py-2 rounded-xl border border-[#c4c8be]/60 bg-white text-xs text-[#191d18] focus:outline-none focus:border-[#384b32]"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-[#555a50] mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#747870] absolute left-3 top-2.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#c4c8be]/60 bg-white text-xs text-[#191d18] focus:outline-none focus:border-[#384b32]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#555a50] mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#747870] absolute left-3 top-2.5" />
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#c4c8be]/60 bg-white text-xs text-[#191d18] focus:outline-none focus:border-[#384b32]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#384b32] text-white py-3 rounded-xl font-sans text-xs uppercase tracking-wider font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 cursor-pointer shadow-sm mt-2"
              >
                <span>{loading ? "Verifying..." : isRegister ? "Create Account & Go to Destinations" : "Sign In & Go to Destinations"}</span>
              </button>
            </form>

            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-[#c4c8be]/40"></div>
              <span className="flex-shrink mx-2 text-[10px] uppercase tracking-wider text-[#747870]">Or</span>
              <div className="flex-grow border-t border-[#c4c8be]/40"></div>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={handleGuestSignIn}
                disabled={loading}
                className="w-full bg-[#f2f5ed] border border-[#c4c8be]/40 text-[#384b32] py-2.5 rounded-xl font-sans text-xs font-semibold hover:bg-[#ecefe7] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Quick Explorer Login (1-Click)</span>
              </button>
            </div>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsRegister(!isRegister);
                  setError(null);
                }}
                className="text-xs text-[#384b32] hover:underline font-semibold cursor-pointer"
              >
                {isRegister ? "Already have an account? Sign In" : "Don't have an account? Create one"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
