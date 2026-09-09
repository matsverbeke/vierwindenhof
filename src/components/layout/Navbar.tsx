import React, { useState } from "react";
import { Menu, X } from "lucide-react";

type NavbarProps = {
  activePage: "home" | "woningen" | "streek";
  onNavigateWoningen: () => void;
  onNavigateHome: () => void;
  onNavigateStreek: () => void;
  announcementVisible?: boolean;
};

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  onNavigateWoningen,
  onNavigateHome,
  onNavigateStreek,
  announcementVisible = false,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className={
        announcementVisible
          ? "absolute left-0 top-12 w-full z-50 bg-transparent transition-opacity duration-500 ease-out animate-rise-in"
          : "absolute top-0 left-0 w-full z-50 bg-transparent transition-opacity duration-500 ease-out animate-rise-in"
      }
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-24 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={onNavigateHome}
          className="flex items-center cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
          type="button"
        >
          <img
            src="/images/logo.webp"
            alt="4windenhof"
            width={434}
            height={109}
            className="min-h-12 sm:h-14 w-auto drop-shadow-md"
          />
        </button>

        {/* Desktop Links & Socials */}
        <div className="hidden md:flex items-center space-x-8">
          <button
            type="button"
            onClick={onNavigateHome}
            className={`font-medium text-base transition-colors duration-300 drop-shadow-sm cursor-pointer hover:-translate-y-0.5 ${
              activePage === "home"
                ? "text-white underline underline-offset-8 decoration-2 decoration-primary"
                : "text-white/90 hover:text-white"
            }`}
          >
            Home
          </button>
          <button
            type="button"
            onClick={onNavigateWoningen}
            className={`font-medium text-base transition-colors duration-300 drop-shadow-sm cursor-pointer hover:-translate-y-0.5 ${
              activePage === "woningen"
                ? "text-white underline underline-offset-8 decoration-2 decoration-primary"
                : "text-white/90 hover:text-white"
            }`}
          >
            Woningen
          </button>
          <button
            type="button"
            onClick={onNavigateStreek}
            className={`font-medium text-base transition-colors duration-300 drop-shadow-sm cursor-pointer hover:-translate-y-0.5 ${
              activePage === "streek"
                ? "text-white underline underline-offset-8 decoration-2 decoration-primary"
                : "text-white/90 hover:text-white"
            }`}
          >
            De streek
          </button>
        </div>

        {/* Mobile menu knop */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-xl text-white bg-black/25 backdrop-blur-md border border-white/20 shadow-lg transition-colors transition-transform duration-300 hover:bg-black/35 hover:scale-105 cursor-pointer"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
        >
          {mobileOpen ? (
            <X className="w-7 h-7" />
          ) : (
            <Menu className="w-7 h-7" />
          )}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        id="mobile-navigation"
        className={`md:hidden absolute left-0 right-0 top-full px-4 transition-all duration-300 ease-out origin-top ${
          mobileOpen
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
            : "opacity-0 -translate-y-3 scale-95 pointer-events-none"
        }`}
      >
        <div className="mt-3 rounded-3xl border border-[#e8decd] bg-[#fffdf8]/95 backdrop-blur-xl shadow-[0_20px_55px_rgba(17,24,39,0.16)] p-4 space-y-2">
          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              onNavigateHome();
            }}
            className={`w-full text-left rounded-2xl px-4 py-3 text-base font-medium transition-colors cursor-pointer ${
              activePage === "home"
                ? "bg-primary/12 text-primary"
                : "text-foreground hover:bg-[#f3ecde]"
            }`}
          >
            Home
          </button>
          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              onNavigateWoningen();
            }}
            className={`w-full text-left rounded-2xl px-4 py-3 text-base font-medium transition-colors cursor-pointer ${
              activePage === "woningen"
                ? "bg-primary/12 text-primary"
                : "text-foreground hover:bg-[#f3ecde]"
            }`}
          >
            Woningen
          </button>
          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              onNavigateStreek();
            }}
            className={`w-full text-left rounded-2xl px-4 py-3 text-base font-medium transition-colors cursor-pointer ${
              activePage === "streek"
                ? "bg-primary/12 text-primary"
                : "text-foreground hover:bg-[#f3ecde]"
            }`}
          >
            De streek
          </button>
        </div>
      </div>
    </header>
  );
};
